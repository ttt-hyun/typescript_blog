"use client"
import React from 'react'
import Link from 'next/link';
import { CustomButton } from '@/components';
import { TPostProps } from '@/types';

interface IPostHatProps {
    post: TPostProps;
}

const PostHat = ( { post }: IPostHatProps ) => {
  return (
    <div className="layout__hat w-full h-10 border-gray-200 border bg-gray-50 rounded-t-md flex justify-between items-center px-4">
        <ul className="flex gap-5">
            <li className="relative before:absolute before:w-1.5 before:h-1.5 before:border-t-black before:border-r-black before:border-t-2 before:border-r-2 before:right-[-10px] before:top-2/4 before:rotate-45 before:translate-y-[-35%]">
                <Link href="/" className="font-extrabold text-sm">Home</Link>
            </li>
            <li className="relative before:absolute before:w-1.5 before:h-1.5 before:border-t-black before:border-r-black before:border-t-2 before:border-r-2 before:right-[-10px] before:top-2/4 before:rotate-45 before:translate-y-[-35%]">
                <Link href="/post" className="font-extrabold text-sm">Post</Link>
            </li>
            <li>
                <Link href={'/'+post.slug} className="font-extrabold text-sm">{post.title}</Link>
            </li>
        </ul>
        <CustomButton
            content="Menu"
            containerStyles={`flex justify-center flex-col gap-1 items-center`}
            handleClick={() => {
                alert('no event yet...')
            }}
        >
            <p className="rounded-full bg-green-400 w-1 h-1"></p>
            <p className="rounded-full bg-green-400 w-1 h-1"></p>
            <p className="rounded-full bg-green-400 w-1 h-1"></p>
        </CustomButton>
    </div>
  )
}

export default PostHat