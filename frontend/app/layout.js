import "../styles/globals.css";
import {Header} from "../components/Header/Header";
import {Navigation} from "../components/Navigation/Navigation";
import React from "react";

const RootLayout = ({ children }) => {
  return (
      <html lang="en">
        <body className="antialiased">
          <div className="flex flex-col bg-gray-100">
            <Header />
            <div className="flex">
              <Navigation />
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