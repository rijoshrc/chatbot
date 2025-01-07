
export interface Conversation{
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
	/**	Title : Data	*/
	title: string
	/**	User : Link - User	*/
	user?: string
	/**	File : Attach	*/
	file: string
	/**	Embedding status : Select	*/
	embedding_status?: "Processing" | "Completed"
	/**	Embedding content : Long Text	*/
	embedding_content?: string
}