import Header from '@/components/header/Header'
import './globals.css'
//import {Inter} from '@next/font/google'
import {GlobalProvider} from './GlobalProvider'
import Head from './head'

//const inter = Inter({subsets: ['latin']})

//export const metadata = {
//    title: 'Tee',
//    description: 'E-com for T-shirt'
//}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <Head/>
            <body>
                <GlobalProvider>
                    <Header/> 
                    {children}
                </GlobalProvider>
            </body>
        </html>
    )
}
