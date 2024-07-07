import React from 'react';
import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components';

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
            <div className='mdx__inner'>

            </div>

        </section>
        <div className=""></div>
        <div className="container py-6 prose dark:prose-invert max-w-3xl">
            <h1 className="mb-2">{post.title}</h1>
            {post.description ? (<p>{post.description}</p>) : null}
            <hr className="my-4" />
            <MDXContent code={post.body} />
        </div>
    </>
  )
}

export default page