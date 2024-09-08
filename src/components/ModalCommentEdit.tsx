"use client";

import React, { useEffect, useState } from "react";
import ReactPortal from "@/components/ReactPortal";
import { ICommentProp } from "@/db/model/Comment";
import Link from "next/link";

// useForm 
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const commentSchema = z.object({
    _id: z.string().min(1).max(100),
    password: z.string().min(8).max(20),
    origin_password: z.string().min(8).max(20),
    comment: z.string().min(1).max(100),
}).superRefine(({password, origin_password}, ctx) => {
    if(password !== origin_password){
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["password"]
        })
    }
});

type TCommentSchema = z.infer<typeof commentSchema>;



interface ModalDefaultProps {
    children?: React.ReactElement; 
    isOpen: boolean;
    commentData: ICommentProp | null | undefined;
    handleClose: () => void;
}


const ModalMenu = ({ children, isOpen, commentData, handleClose }: ModalDefaultProps) => {
    
    if(!commentData) return null;

    const closeModal = (e: React.MouseEvent<HTMLElement>): void => {
        const target = e.target as HTMLElement;
        target.dataset.close && handleClose();
    };

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
        const body = {
            content: data.comment,
        }
        await fetch(`/api/comment`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(res => res.json())
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });

        // if(!result.ok){
        //     throw new Error('오류 발생');
        // }

        reset();
    }

    return (
        <ReactPortal wrapperId="react-portal-modalcommentedit">
            <>
                <div
                    onClick={closeModal}
                    data-close="true"
                    className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-40 backdrop-blur-md p-5"
                >
                    <div 
                        onClick={closeModal}
                        data-close="true"
                        className="w-full max-w-[700px] max-h-full h-[600px]">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-3 max-w-[700px] max-h-full overflow-y-auto bg-white dark:bg-default shadow-primary rounded-md pt-5">
                            <input {...register("_id")} type="hidden" name="_id" value={commentData._id} />
                            <input {...register("origin_password")} type="hidden" name="origin_password" value={commentData.author.password} />
                            <div className="modal__head px-5">
                                <div className="search__type flex gap-2">
                                    <p className="px-2 border border-solid border-gray-300 rounded-md font-bold text-sm">
                                        Comment
                                    </p>
                                    <p className="px-2 border border-solid border-gray-300 rounded-md font-bold text-sm">
                                        Edit
                                    </p>
                                </div>
                            </div>
                            <div className="modal__content border-t px-5">
                                <ul className="flex flex-col gap-4 py-5">
                                    <li className="flex flex-col gap-2">
                                        <p className="font-bold text-md">댓글 수정하기</p>
                                        <textarea {...register("comment")} name="comment" className="w-full px-4 py-3 resize-none border rounded-md placeholder:text-sm" placeholder="">{commentData.content}</textarea>
                                    </li>
                                    <li className="flex flex-col gap-2">
                                        <p className="font-bold text-md">비밀번호</p>
                                        <input {...register("password")} type="password" name="password" className="border rounded-md px-4 h-10 placeholder:text-sm" placeholder="Enter your password" />
                                    </li>
                                </ul>
                            </div>
                            <div className="error__list flex flex-col gap-1 mt-5" >
                                {errors.comment && (
                                    <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                                        <span>{`comment : ${errors.comment.message}`}</span>
                                    </p>
                                )}
                                {errors._id && (
                                    <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                                        <span>{`id : ${errors._id.message}`}</span>
                                    </p>
                                )}
                                {errors.password && (
                                    <p className="flex items-center h-10 rounded-md bg-red-100 px-5">
                                        <span>{`password : ${errors.password.message}`}</span>
                                    </p>
                                )}
                            </div>
                            <div className="modal__button">
                                <div className="flex justify-end">
                                    <button type="submit" className="w-full bg-green-400 hover:bg-green-500 transition-all rounded-bl-md h-10 font-extrabold text-sm">수정</button>
                                    <button className="w-full bg-red-400 hover:bg-red-500 transition-all rounded-br-md h-10 font-extrabold text-sm" disabled>삭제</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </ReactPortal>
    );
};

export default ModalMenu;
