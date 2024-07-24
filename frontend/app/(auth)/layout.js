import { Nunito } from "next/font/google";
import "../../styles/globals.css";
import Image from "next/image";

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                <div className="w-1/2 mx-auto flex flex-col py-4 min-h-screen justify-center">
                    <div className="items-center flex-col flex">
                        <Image alt="Logo" width="300" height="64" src="/logo.jpeg"/>
                    </div>
                    <div className="items-center flex-col flex">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout