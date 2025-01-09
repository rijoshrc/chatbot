# __version__ = "0.0.1"

import frappe


def check_app_permission():
	if frappe.session.user == "Administrator":
		return True
	return is_chatbot_user()

def is_chatbot_user(username: str | None = None) -> str | None:
	roles = frappe.get_roles(username or frappe.session.user)
	if "Chat User" in roles:
		return True
	return False