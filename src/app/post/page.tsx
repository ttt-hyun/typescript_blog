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
                <div className="post__inner flex flex-col gap-6 pt-[100px] max-w-[1200px] my-0 mx-auto">
                    <h2 className="page__title font-extrabold text-7xl">Post.</h2>
                    <div className="post__lists">
                        {displayPosts?.length > 0 ? (
                            <ul className="grid grid-cols-3 gap-5">
                                {displayPosts.map(post => {
                                    const { slug, date, title, description, category, related } = post;
                                    return (
                                        <li key={slug}>
                                            <PostItem slug={slug} date={date} title={title} description={description} category={category} related={related}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <p>Nothing to see here yet</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
