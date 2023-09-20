import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
    async function middleware(req) {
      const url = req.nextUrl.pathname
      const userRole = req?.nextauth?.token?.user?.role
      console.log(url)
      console.log(userRole)

      if(url?.startsWith('/admin') && userRole !== 'admin'){
        return NextResponse.redirect(new URL('/', req.url))
      }
  }, {
    callbacks: {
      authorized: ({token}) => !!token
    }
  }
)

export const config = {
    matcher: ["/me/:path*", '/shipping','/admin/:path*'],
  }