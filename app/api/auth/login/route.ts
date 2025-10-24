import { NextRequest, NextResponse } from 'next/server'
import { api, ApiError } from '../../api'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
	const body = await req.json()

	try {
		const credentials = {
			username: body.username,
			password: body.password,
		}

		const apiRes = await api.post('/auth/login', credentials)

		if (!apiRes.data || !apiRes.data.token) {
			return NextResponse.json({ error: 'Login failed' }, { status: 401 })
		}

		const cookieStore = await cookies()
		cookieStore.set('accessToken', apiRes.data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
		})

		return NextResponse.json(apiRes.data)
	} catch (error) {
		const err = error as ApiError
		return NextResponse.json(
			{
				error: err.response?.data?.error ?? err.message ?? 'Login failed',
			},
			{ status: err.response?.status ?? 401 }
		)
	}
}
