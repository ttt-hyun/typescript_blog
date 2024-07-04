import React from 'react'
import Link from 'next/link'

interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
}
const PostItem = ({slug, title, description, date}: PostItemProps) => {
  return (
    <div>
        <h2 className="text-2xl font-bold">
            <Link href={slug}>{title}</Link>
        </h2>
        <div className="max-w-none text-muted-foreground">{description}</div>
        <div className="flex justfiy-between items-center">
            <p>{date}</p>
        </div>
    </div>
  )
}

export default PostItem