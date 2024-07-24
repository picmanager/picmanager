import Link from 'next/link'
import {ReactElement, ReactNode} from "react";


// @ts-ignore
export function NavLink({ active = false, children, ...props }): ReactElement {
    return (
        <Link
            href={''}
            {...props}
            className={`flex h-14 w-full place-items-center justify-between gap-4 rounded-r-full py-3 
            hover:cursor-pointer hover:bg-gray-200/50 hover:text-blue-500
            group-hover:sm:px-5 md:px-5 hover:underline
            ${active
                ? 'text-blue-500 bg-gray-200'
                : 'text-black'}`}        >
            <div className="flex w-full place-items-center gap-4 overflow-hidden truncate">
                {children}
            </div>
        </Link>
        )
}
