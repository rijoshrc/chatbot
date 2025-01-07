# Copyright (c) 2024, Rijosh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import os
from pypdf import PdfReader
import chromadb
from chatbot.chatbot.util.embedding_function import GeminiEmbeddingFunction
import re


class Conversation(Document):
	def before_validate(self):
		user = frappe.get_user().doc.full_name
		self.user = user
	

	def after_insert(self):
		frappe.enqueue(
            process_conversation,
            conversation=self.name,
            file_url=self.file,
            queue="default"
        )

	pass

def process_conversation(conversation, file_url):
	# create embedding
	file_path = get_file_path(file_url)
	text = load_pdf(file_path)
	s_text = split_text(text)
	db_path = os.path.join("db", "vector")
	db, name = create_chroma_db(s_text, db_path, conversation)

	# update conversation status
	conv_doc = frappe.get_doc("Conversation", conversation)
	conv_doc.db_set('embedding_status', "Completed", commit=True)
	conv_doc.db_set('embedding_content', text, commit=True)
	

def get_file_path(file_url):
	filename = os.path.basename(file_url)
	private_files_path = frappe.utils.get_files_path()
	file_path = os.path.join(private_files_path, filename)
	return file_path


def load_pdf(file_path):
	# Logic to read pdf
	reader = PdfReader(file_path)

	# Loop over each page and store it in a variable
	text = ""
	for page in reader.pages:
		text += page.extract_text()

	return text

def split_text(text: str):
	split_text = re.split('\n \n', text)
	return [i for i in split_text if i != ""]


def create_chroma_db(documents, path, name):
	chroma_client = chromadb.PersistentClient(path=path)
	db = chroma_client.create_collection(name=name, embedding_function=GeminiEmbeddingFunction())

	for i, d in enumerate(documents):
		db.add(documents=d, ids=str(i))

	return db, name