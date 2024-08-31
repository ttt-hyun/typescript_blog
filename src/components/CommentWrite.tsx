"use client"

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pastTime } from '@/library/util';
import { Link } from 'next/link';
import CustomButton from './CustomButton';

const commentSchema = z.object({
    id: z.string().min(5).max(20),
    password: z.string().min(8).max(20),
    comment: z.string().min(1).max(100),
});

type TCommentSchema = z.infer<typeof commentSchema>;

type TParams = {
    slug: string,
}

const CommentWrite = ( { slug }: TParams ) => {

    const [comment, setComment] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    // UseForm 기능 옵션
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<TCommentSchema>({
        resolver: zodResolver(commentSchema)
    });

    // UseForm 기능 옵션
    const onSubmit = async (data: TCommentSchema) => {
        console.log('onSubmit')
        const body = {
            author: {
                name: data.id,
                password: data.password,
            },
            postId: slug,
            content: data.comment,
        }
        const result = await fetch(`/api/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if(!result.ok){
            throw new Error('오류 발생');
        }

        fetchComment();
        reset();


    }

    // 댓글 데이터
    const fetchComment = async () => {
        console.log('fetchComment')
        const fetchData = await fetch(`/api/comment?postId=${slug}`).then(res => res.json());
        setComment(fetchData);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchComment();
    }, [])

    return (
        <>
            <div className="comment__write relative">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mdx__comment__write flex flex-col gap-2">
                    <div className="border rounded-md overflow-hidden">
                        <textarea {...register("comment")} className="w-full px-5 py-4 resize-none outline-none" placeholder='댓글을 입력해주세요!'></textarea>
                        <div className="border-t flex flex-between">
                            <div className="input__box w-1/2 px-5">
                                <input {...register("id")} type="text" name="id" placeholder="아이디" className="w-full h-10" />
                            </div>
                            <div className="input__box w-1/2 px-5 border-l">
                                <input {...register("password")} type="password" name="password" placeholder="비밀번호" className="w-full h-10" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full border rounded-md h-10 font-extrabold" disabled={isSubmitting}>댓글등록</button>
                </form>
                <div className="error__list flex flex-col gap-1 mt-5" >
                    {errors.comment && (
                        <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                            <span>{`comment : ${errors.comment.message}`}</span>
                        </p>
                    )}
                    {errors.id && (
                        <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                            <span>{`id : ${errors.id.message}`}</span>
                        </p>
                    )}
                    {errors.password && (
                        <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                            <span>{`password : ${errors.password.message}`}</span>
                        </p>
                    )}
                </div>
                <div className={`submit__cover flex justify-center items-center rounded-md absolute top-0 left-0 w-full h-full ${isSubmitting ? '' : 'hidden'}`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-black"></div>
                    <div className="loader relative z-10"></div>
                </div>
            </div>
            <div className="comment__list">
                <ul className="flex flex-col gap-5">
                    {isLoading 
                    ? (
                        <li className="border rounded-md flex flex-col items-center justify-center gap-1 p-5">
                            <b>댓글 불러오는 중....</b>
                            <div className="loader"></div>
                        </li>
                    ) : 
                    comment.length > 0 ? (
                        comment.map((res: any, index: number) => (
                            <li key={index} className="border rounded-md">
                                {/* <p>{JSON.stringify(res)}</p> */}
                                <div className="content__head px-4 flex justify-between items-center h-10">
                                    <h4 className="comment__author font-bold">{res.author.name}</h4>
                                    <p className="text-sm">{pastTime(res.createdAt)}</p>
                                </div>
                                <div className="content__body p-5 border-t">
                                    <p>{res.content}</p>
                                </div>
                                <CustomButton 
                                    handleClick={() => {}} 
                                    containerStyles="   relative w-full flex justify-center py-2 gap-1 bg-gray-200 border-t 
                                                        before:content-['수정/삭제'] use__tooltip">
                                    <p className="rounded-full bg-white w-1 h-1"></p>
                                    <p className="rounded-full bg-white w-1 h-1"></p>
                                    <p className="rounded-full bg-white w-1 h-1"></p>
                                </CustomButton>
                            </li>
                        ))
                    ) : (
                        <li className="border rounded-md flex flex-col items-center justify-center gap-1 p-5">
                            <b>댓글이 아직 등록되지 않았습니다!</b>
                            <b>얼른 등록해주세요😃</b>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default CommentWrite