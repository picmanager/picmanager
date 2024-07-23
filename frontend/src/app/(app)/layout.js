'use client'

import Navigation from '@/app/Navigation'
import Header from '@/app/Header'

const AppLayout = ({ children }) => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-6xl flex">
                <Navigation/>
                <main className="w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout