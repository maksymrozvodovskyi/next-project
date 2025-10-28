import { NextResponse } from 'next/server'
import { readDB, writeDB } from '@/lib/db/db'

export async function POST(req: Request) {
	const { username, email, password } = await req.json()

	if (!username || !email || !password) {
		return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
	}

	const db = readDB()

	const existing = db.users.find((u: any) => u.username === username || u.email === email)
	if (existing) {
		return NextResponse.json({ error: 'User already exists' }, { status: 400 })
	}

	const newUser = {
		id: Date.now(),
		username,
		email,
		password,
		createdAt: new Date().toISOString(),
	}

	db.users.push(newUser)
	writeDB(db)

	return NextResponse.json({ success: true, user: { id: newUser.id, username, email } })
}
