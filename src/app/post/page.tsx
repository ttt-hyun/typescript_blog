import React from 'react'
import { posts } from '#site/content';
import { PostItem } from '@/components';
import { sortPosts } from '@/library/util';

const page = async () => {
    const sortedPosts = sortPosts(posts.filter(post => post.published));
    const displayPosts = sortedPosts;
    return (
        <>
            <section className="post__wrapper px-5">
                <div className="post__lists pt-[100px] max-w-[1200px] my-0 mx-auto">
                    {displayPosts?.length > 0 ? (
                        <ul className="grid grid-cols-3 gap-5">
                            {displayPosts.map(post => {
                                const { slug, date, title, description, category } = post;
                                return (
                                    <li key={slug}>
                                        <PostItem slug={slug} date={date} title={title} description={description} category={category}/>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>Nothing to see here yet</p>
                    )}
                </div>
            </section>
        </>
    )
}

export default page;
