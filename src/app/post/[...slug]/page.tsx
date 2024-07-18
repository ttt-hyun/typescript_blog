import React from 'react';
import { posts, postsForSearch } from '#site/content';
import { notFound } from 'next/navigation';
import { AsideUtil, AsideHeading, MDXContent } from '@/components';
import Image from 'next/image'
import Link from 'next/link'
import "@/styles/mdx.css"

interface PostPageProps {
    params: {
        slug: string[];
    };
}

 function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const post = posts.find((post) => post.slugAsParams === slug);
    return post;
}

 function getPrevAndNextPost(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const postIndex = postsForSearch.findIndex((post) => post.slugAsParams === slug);
    const prevPost = postsForSearch[postIndex - 1];
    const nextPost = postsForSearch[postIndex + 1];
    return { prevPost, nextPost };
}


const page = async ({params}: PostPageProps) => {

    const post =  getPostFromParams(params);
    if(!post || !post.published){
        notFound();
    }

    const { prevPost, nextPost } =  getPrevAndNextPost(params);

  return (
    <>
        <section className="mdx__wrapper px-5">
            <div className='mdx__inner pt-[100px] pb-5 flex gap-2 max-w-[1200px] w-full mx-auto my-0'>
                <aside className="shrink-0 basis-[280px] w-[280px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[30px] before:rounded-tr-md before:border-t before:border-r before:border-solid before:border-gray-300 before:dark:border-white">
                    <div className="aside__inner h-[calc(100vh-80px)] overflow-y-auto sticky top-[80px]">
                        <AsideUtil />
                    </div>
                </aside>
                <div className="mdx__contents flex-1 prose dark:prose-invert max-w-3xl">
                    <div className="mdx__thumbnail rounded-md overflow-hidden border border-gray-400">
                        <Image src="/thumb_next_1.svg" alt="" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    {
                        post.related?.length
                        ? (
                            <ul  className="py-2 category__list flex gap-2">
                                {
                                    post.related?.map(item => {
                                        return (
                                            <li key={item} className="px-2 py-1 bg-green-100 dark:bg-green-700 font-extrabold rounded-md text-sm">{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        : null
                    }
                    <h2 className="text-5xl font-black pt-7 pb-4">{post.title}</h2>
                    {/* <h1 className="mb-2">{post.title}</h1>
                    {post.description ? (<p>{post.description}</p>) : null} */}
                    <hr />
                    <div className="mdx__body pb-10">
                        <MDXContent code={post.body} />
                    </div>
                    <div className="mdx__siblings py-5">
                        <ul className="flex justify-between gap-5">
                            {
                            prevPost 
                            ? (
                                <li className="w-full">
                                    <Link href={`/post/${prevPost.slugAsParams}`} className="block border rounded-md px-5 py-2">
                                        <p className="font-semibold">Prev</p>
                                        <h3 className="font-extrabold">{prevPost.title}</h3>
                                    </Link>
                                </li>
                            )
                            :(
                                <li className="w-full"></li>
                            )
                            }
                            {
                            nextPost 
                            ? (
                                <li className="w-full">
                                    <Link href={`/post/${nextPost.slugAsParams}`} className="block border rounded-md px-5 py-2 text-right">
                                        <p className="font-semibold">Next</p>
                                        <h3 className="font-extrabold">{nextPost.title}</h3>
                                    </Link>
                                </li>
                            )
                            :(
                                <li className="w-full"></li>
                            )
                            }
                        </ul>
                    </div>
                    <div className="mdx__comment">
                        <div className="mdx__comment__write flex flex-col gap-2">
                            <div className="border rounded-md overflow-hidden">
                                <textarea className="w-full px-5 py-4 resize-none outline-none" placeholder='댓글을 입력해주세요!'></textarea>
                                <div className="border-t flex flex-between">
                                    <div className="input__box w-1/2 px-5">
                                        <input type="text" placeholder="아이디" className="w-full h-10"/>
                                    </div>
                                    <div className="input__box w-1/2 px-5 border-l">
                                        <input type="password" placeholder="비밀번호" className="w-full h-10"/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="w-full border rounded-md h-10 font-extrabold">댓글등록</button>
                        </div>
                    </div>
                </div>
                <aside className="shrink-0 w-[280px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[30px] before:rounded-tl-md before:border-t before:border-l before:border-solid before:border-gray-300 before:dark:border-white">
                    <div className="flex flex-col aside__inner h-[calc(100vh-80px)] sticky top-[80px]">
                        <AsideHeading code={post.body} />
                    </div>
                </aside>
            </div>
        </section>
        <section className="comment__wrapper px-5">
            <div className='comment__inner pt-[100px] flex gap-2 max-w-[1200px] mx-auto my-0 border-t'>
                
            </div>
        </section>
    </>
  )
}

export default page