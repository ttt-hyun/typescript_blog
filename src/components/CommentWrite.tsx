"use client"

import React from 'react'
import { useFormState } from 'react-dom';
import { printTextAction } from './action/action';

import { z } from 'zod';
import { useOrganization } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const formSchema = z.object({
    id: z.string().min(5).max(20),
    password: z.string().min(8).max(20),
    comment: z.string().min(1).max(100),
});


const CommentWrite = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            password: "",
            comment: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        await printTextAction(values.id);

    }
    return (
        <>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mdx__comment__write flex flex-col gap-2">
                <div className="border rounded-md overflow-hidden">
                    <textarea name="comment" className="w-full px-5 py-4 resize-none outline-none" placeholder='댓글을 입력해주세요!'></textarea>
                    <div className="border-t flex flex-between">
                        <div className="input__box w-1/2 px-5">
                            <input type="text" name="id" placeholder="아이디" className="w-full h-10" />
                        </div>
                        <div className="input__box w-1/2 px-5 border-l">
                            <input type="password" name="password" placeholder="비밀번호" className="w-full h-10" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full border rounded-md h-10 font-extrabold">댓글등록</button>
            </form>
        </>
    )
}

export default CommentWrite