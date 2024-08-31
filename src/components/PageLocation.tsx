'use client'
import React from 'react'
import Link from 'next/link'

type TPath = {
    path: string;
    name: string;
}

const PageLocation = ( { location }: {location: TPath[]}) => {
    
    return (
        <ul className="flex gap-4">
            <li>
                <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Blog
                </Link>
            </li>
            {
                location.map((res) => (
                    <>
                        <li key={`${res.path}-1`}>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">&gt;</span>
                        </li>
                        <li key={`${res.path}-2`}>
                            <Link href={res.path} className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {res.name}
                            </Link>
                        </li>
                    </>
                ))
            }
            
        </ul>
    )
}

export default PageLocation