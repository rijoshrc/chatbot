import google.generativeai as genai
from chromadb import Documents, EmbeddingFunction, Embeddings
import os
import frappe

class GeminiEmbeddingFunction(EmbeddingFunction):
  def __call__(self, input: Documents) -> Embeddings:
    settings = frappe.get_doc('Chatbot Settings')
    gemini_api_key = settings.api_key
    if not gemini_api_key:
      raise ValueError("Gemini API Key not provided. Please provide GEMINI_API_KEY as environment variable")
    genai.configure(api_key = gemini_api_key)
    model = settings.embedding_model
    title = "Custom query"
    return genai.embed_content(model=model,
                                content=input,
                                task_type="retrieval_document",
                                title=title)["embedding"]