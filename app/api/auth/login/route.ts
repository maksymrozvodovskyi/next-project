import { NextResponse } from 'next/server'
import { readDB } from '@/lib/db'

const STATIC_TOKEN = 'hardcoded-local-token-12345'

export async function POST(req: Request) {
	const { username, password } = await req.json()

	if (!username || !password) {
		return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
	}

	const db = readDB()
	const user = db.users.find((u: any) => u.username === username && u.password === password)

	if (!user) {
		return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
	}

	const res = NextResponse.json({
		success: true,
		user: { id: user.id, username: user.username, email: user.email },
	})

	res.cookies.set('accessToken', STATIC_TOKEN, {
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24,
	})

	return res
}
