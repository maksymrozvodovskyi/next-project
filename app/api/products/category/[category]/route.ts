import { NextResponse, NextRequest } from 'next/server'
import { api, ApiError } from '../../../api'

type Props = {
	params: Promise<{ category: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
	const { category } = await params
	try {
		const { data } = await api(`/products/category/${category}`)
		return NextResponse.json(data)
	} catch (error) {
		return NextResponse.json(
			{ error: (error as ApiError).response?.data?.error ?? (error as ApiError).message },
			{ status: (error as ApiError).status }
		)
	}
}
