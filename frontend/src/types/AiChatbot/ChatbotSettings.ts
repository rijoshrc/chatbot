
export interface ChatbotSettings{
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
	/**	API Key : Data	*/
	api_key: string
	/**	Generative model : Select	*/
	generative_model: "gemini-2.0-flash-exp" | "gemini-1.5-flash"
	/**	Embedding model : Data	*/
	embedding_model: string
}