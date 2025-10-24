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

		const cookieStore = await cookies()

		if (apiRes.data && apiRes.data.token) {
			cookieStore.set('accessToken', apiRes.data.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7,
			})

			return NextResponse.json(apiRes.data)
		}

		return NextResponse.json({ error: 'Login failed' }, { status: 401 })
	} catch (error) {
		return NextResponse.json(
			{
				error: (error as ApiError).response?.data?.error ?? (error as ApiError).message ?? 'Login failed',
			},
			{ status: (error as ApiError).response?.status ?? 401 }
		)
	}
}
