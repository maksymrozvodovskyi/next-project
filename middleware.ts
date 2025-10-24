// middleware.ts

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const privateRoutes = ['/profile']
const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('accessToken')?.value

	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
	const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route))

	if (!accessToken) {
		if (isPrivateRoute) {
			return NextResponse.redirect(new URL('/sign-in', request.url))
		}
		if (isAuthRoute) {
			return NextResponse.next()
		}
	} else {
		if (isAuthRoute) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		if (isPrivateRoute) {
			return NextResponse.next()
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
}
