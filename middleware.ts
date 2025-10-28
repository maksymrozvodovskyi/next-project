import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const i18nMiddleware = createMiddleware(routing)

const privateRoutes = ['/profile']
const authRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
	const i18nResponse = i18nMiddleware(request)
	if (i18nResponse) return i18nResponse

	const { pathname } = request.nextUrl
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('accessToken')?.value

	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
	const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route))

	if (!accessToken) {
		if (isPrivateRoute) {
			return NextResponse.redirect(new URL('/sign-in', request.url))
		}
		return NextResponse.next()
	} else {
		if (isAuthRoute) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return NextResponse.next()
	}
}

export const config = {
	matcher: ['/((?!_next|api|.*\\..*).*)'],
}
