
export interface Message{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Text : Long Text	*/
	text: string
	/**	Type : Select	*/
	type: "User" | "System"
	/**	Conversation : Link - Conversation	*/
	conversation: string
}