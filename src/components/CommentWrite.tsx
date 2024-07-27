"use client"

import React from 'react'
import { useFormState } from 'react-dom';
import { printTextAction } from './action/action';
import { z } from 'zod';
import { useOrganization } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const commentSchema = z.object({
    id: z.string().min(5).max(20),
    password: z.string().min(8).max(20),
    comment: z.string().min(1).max(100),
});

type TCommentSchema = z.infer<typeof commentSchema>;

const CommentWrite = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<TCommentSchema>({
        resolver: zodResolver(commentSchema)
    });

    const onSubmit = async (data: TCommentSchema) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return (
        <>
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
                <button type="submit" className="w-full border rounded-md h-10 font-extrabold">댓글등록</button>
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
        </>
    )
}

export default CommentWrite