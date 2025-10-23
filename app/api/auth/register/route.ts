import { NextRequest, NextResponse } from 'next/server'
import { api, ApiError } from '../../api'

export async function POST(req: NextRequest) {
	const body = await req.json()
	try {
		const userData = {
			username: body.username,
			email: body.email,
			password: body.password,
		}

		const apiRes = await api.post('/users', userData)

		const createdUser = {
			id: apiRes.data.id,
			username: body.username,
			email: body.email,
			password: body.password,
		}

		return NextResponse.json(createdUser)
	} catch (error) {
		return NextResponse.json(
			{
				error: (error as ApiError).response?.data?.error ?? (error as ApiError).message ?? 'Registration failed',
			},
			{ status: (error as ApiError).response?.status ?? 400 }
		)
	}
}
