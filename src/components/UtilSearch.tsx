'use client'
import React from 'react'

import { UtilSearchProps } from '@/types';


const UtilSearch = ({ keyword, isAvailable, handleClick }: UtilSearchProps) => {
    return (
        <button
            type={"button"}
            onClick={handleClick}
            className="search__button shadow-primary flex justify-between items-center px-4 w-full h-[42px] border-solid rounded-md border-gray-300 hover:border-gray-400 dark:bg-default" >
            <p className="text-sm text-gray-500">Search documents...</p>
            <p className="text-sm text-gray-700 font-bold">ctrl + k</p>
        </button>
    )
}

export default UtilSearch