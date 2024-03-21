import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { EXPIRATION_TIME } from './globalValues';

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	if (
		request.nextUrl.pathname.startsWith('/flights') &&
		request.nextUrl.pathname !== '/flights/search'
	) {
		const [flights, slug] = request.nextUrl.pathname.substring(1).split('/');
		const newExpiration = new Date();
		newExpiration.setMinutes(newExpiration.getMinutes() + EXPIRATION_TIME);
		const passId = cookies().get('passid');
		if (!passId?.value) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}
		//TODO: UPDATE COOKIES

		try {
			await sql`
        UPDATE basket
        SET date = ${newExpiration.toISOString()}
        WHERE (uuid =${passId.value}) AND (ticket_code =${slug})
        `;
		} catch (e) {
			console.log(e);
		}

		response.cookies.set({
			name: 'passid',
			value: passId.value,
			expires: newExpiration,
		});
	}
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: '',
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: '',
						...options,
					});
				},
			},
		}
	);

	const { data, error } = await supabase.auth.getUser();
	if ((error || !data.user) && request.nextUrl.pathname === '/addPlane') {
		return NextResponse.redirect(new URL(`/login`, request.url));
	}
	if ((!error || data.user) && request.nextUrl.pathname === '/login') {
		return NextResponse.redirect(new URL(`/addPlane`, request.url));
	}
	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/',
		'/((?!_next/static|_next/image|favicon.ico).*)',
	],
};
