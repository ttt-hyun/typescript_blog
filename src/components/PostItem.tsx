import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { formatDate } from '@/library/util';

interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    category?: string;
}
const PostItem = ({ slug, title, description, date, category }: PostItemProps) => {
    return (
        <Link href={slug} className="flex flex-col rounded-md overflow-hidden shadow-primary h-full">
            <div className="image__area relative h-[180px]">
                <Image src={`/`+(category ? category+`_thumb.jpg` : 'javascript_thumb.jpg')} alt="" width={0} height={0} sizes="100vw" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', top: '0', left: '0' }} />
            </div>
            <div className="text__area flex flex-col justify-between p-3 flex-1 min-h-[140px] dark:bg-default">
                <div className="main__text">
                    <h2 className="text-2xl font-extrabold py-1">{title}</h2>
                    <p className="break-keep">{description}</p>
                </div>
                <div className="sub__text flex items-center justify-end gap-1">
                    <svg className="icon icon-default date-icon fill-gray-700 dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width={14} height={14}>
                        <path d="M9.31,10.29l1-1L7.7,6.72V3.5H6.3V7.28ZM7,14a6.76,6.76,0,0,1-2.73-.55A7,7,0,0,1,.55,9.73,6.76,6.76,0,0,1,0,7,6.76,6.76,0,0,1,.55,4.27,7,7,0,0,1,4.27.55,6.76,6.76,0,0,1,7,0,6.76,6.76,0,0,1,9.73.55a7,7,0,0,1,3.72,3.72A6.76,6.76,0,0,1,14,7a6.76,6.76,0,0,1-.55,2.73,7,7,0,0,1-3.72,3.72A6.76,6.76,0,0,1,7,14Zm0-1.4A5.4,5.4,0,0,0,11,11,5.4,5.4,0,0,0,12.6,7,5.4,5.4,0,0,0,11,3,5.4,5.4,0,0,0,7,1.4,5.4,5.4,0,0,0,3,3,5.4,5.4,0,0,0,1.4,7,5.4,5.4,0,0,0,3,11,5.4,5.4,0,0,0,7,12.6Z"/>
                    </svg>
                    <p className="text-sm font-bold text-gray-700 dark:text-white">{formatDate(date)}</p>
                </div>
            </div>
        </Link>
    )
}

export default PostItem;