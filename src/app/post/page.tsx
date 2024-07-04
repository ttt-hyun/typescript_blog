import React from 'react'
import { posts } from '#site/content';
import { PostItem } from '@/components';
import { sortPosts } from '@/library/util';

const page = async () => {
    const sortedPosts = sortPosts(posts.filter(post => post.published));
    const displayPosts = sortedPosts;
    return (
        <div className="post__lists">
            <p>here is the post list contents</p>
            <ul>
                {displayPosts?.length > 0 ? (
                    <ul>
                        {displayPosts.map(post => {
                            const { slug, date, title, description} = post;
                            return (
                                <li key={slug}>
                                    <PostItem slug={slug} date={date} title={title} description={description}/>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>Nothing to see here yet</p>
                )}
            </ul>
        </div>
    )
}

export default page;
