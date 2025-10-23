export type RegisterRequest = {
	email: string
	password: string
	userName: string
}

export type User = {
	id: string
	userName?: string
	email: string
	password?: string
}
