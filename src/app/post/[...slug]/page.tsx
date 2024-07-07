import React from 'react';
import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import { AsideUtil, MDXContent } from '@/components';

import "@/styles/mdx.css"

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const post = posts.find((post) => post.slugAsParams === slug);

    return post;
}

export async function gerneateStaticParams(): Promise<PostPageProps["params"][]>{
    return posts.map(post => ({slug: post.slugAsParams.split("/")}))
}

const page = async ({params}: PostPageProps) => {
    const post = await getPostFromParams(params);
    if(!post || !post.published){
        notFound();
    }

  return (
    <>
        <section className="mdx__wrapper px-5">
            <div className='mdx__inner pt-[100px] flex gap-2 max-w-[1200px] mx-auto my-0'>
                <aside className="shrink w-[300px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[20px] before:rounded-tr-md before:border-t before:border-r before:border-solid before:border-gray-400 before:dark:border-white">
                    <div className="aside__inner sticky top-[80px]">
                        <AsideUtil />
                    </div>
                </aside>
                <div className="mdx__contents flex-1 py-6 prose dark:prose-invert max-w-3xl">
                    <h1 className="mb-2">{post.title}</h1>
                    {post.description ? (<p>{post.description}</p>) : null}
                    <hr className="my-4" />
                    <MDXContent code={post.body} />
                </div>
                <aside className="shrink w-[300px] bg-purple-500">

                </aside>
            </div>
        </section>
    </>
  )
}

export default page