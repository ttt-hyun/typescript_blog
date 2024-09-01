"use client";

import React, { useEffect, useState } from "react";
import ReactPortal from "@/components/ReactPortal";
import Link from "next/link";

import { postsForSearch } from '#site/content';

type ResultPostProps = Array<{title: string, slug: string}> | null;

const getPosts = (keyword: string):ResultPostProps => {
    if(!keyword) return null;
    return postsForSearch?.filter(res => (res.title.toLowerCase().includes(keyword) || res.title.includes(keyword))).map(res => (
        {
            'title' : res.title,
            'slug' : res.slug
        }
    ));
}

interface ModalDefaultProps {
    children?: React.ReactElement;
    isOpen: boolean;
    handleClose: () => void;
}


const ModalMenu = ({ children, isOpen, handleClose }: ModalDefaultProps) => {
    
    const [searchResultArray, setSearchResultArray] = useState<ResultPostProps>(null);

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) =>
            e.key === "Escape" ? handleClose() : null;

        document.body.addEventListener("keydown", closeOnEscapeKey);
        return (): void => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        // document.body.style.overflow = "hidden";
        // return (): void => {
        //     document.body.style.overflow = "unset";
        // };
    }, [isOpen]);

    

    if (!isOpen) return null;

    const closeModal = (e: React.MouseEvent<HTMLElement>): void => {
        const target = e.target as HTMLElement;
        target.dataset.close && handleClose();
    };

    const keyWordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const keyword = e.target.value;
        const searchResult = getPosts(keyword);
        
        if (searchResult !== null) {
            setSearchResultArray(searchResult);
        } else {
            setSearchResultArray(null);
        }
    }



    return (
        <ReactPortal wrapperId="react-portal-modalsearch">
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
                        <div className="max-w-[700px] max-h-full overflow-y-auto bg-white dark:bg-default shadow-primary rounded-md py-5">
                            <div className="search__header px-5">
                                <div className="search__type flex gap-2">
                                    <p className="px-2 border border-solid border-gray-300 rounded-md font-bold text-sm">
                                        Posts
                                    </p>
                                </div>
                                <div className="search__keyword pt-1">
                                    <input
                                        type="text"
                                        className="w-full h-[42px] placeholder:text-md bg-transparent"
                                        placeholder="Search documentation..."
                                        onChange={keyWordChange}
                                    />
                                </div>
                            </div>
                            <div className="search__body border-t p-5">
                                <ul className="flex flex-col gap-2">
                                    { 
                                        searchResultArray !== null && searchResultArray?.length !== 0 ? 
                                        (
                                            <>
                                            {/* <li>
                                                <p>{JSON.stringify(searchResultArray)}</p>
                                            </li> */}
                                            {
                                                searchResultArray.map(res => {
                                                    return (
                                                        <li key={res.title}>
                                                            <Link
                                                                href={`/`+res.slug}
                                                                className="group flex justify-between items-center py-4 px-3 rounded-md border bg-blue-50 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-800"
                                                            >
                                                                <p className="text-md font-bold">
                                                                    {res.title}
                                                                </p>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                                    <g data-name="Circle kanan">
                                                                        <circle cx="12" cy="12" r="10" className="fill-none"/>
                                                                        <path d="M11 16a1 1 0 0 1-.707-1.707L12.586 12l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 11 16z" className="dark:fill-white"/>
                                                                    </g>
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </>
                                        ) : searchResultArray == null ? 
                                        (
                                            <li>
                                                <p className="font-bold">검색어를 입력해주세요.</p>
                                            </li>
                                        ) : 
                                        (
                                            <li>
                                                <p className="font-bold">검색 결과가 없습니다.</p>
                                            </li>
                                        )
                                    }
                                    {/* <li>
                                        <Link
                                            href="/post"
                                            className="group flex justify-between items-center py-4 px-3 rounded-md border bg-blue-50 hover:bg-blue-200"
                                        >
                                            <p className="text-md font-bold">
                                                [TypeScript] Generic이란?
                                            </p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                                <g data-name="Circle kanan">
                                                    <circle cx="12" cy="12" r="10" className="fill-none"/>
                                                    <path d="M11 16a1 1 0 0 1-.707-1.707L12.586 12l-2.293-2.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 11 16z" className=""/>
                                                </g>
                                            </svg>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </ReactPortal>
    );
};

export default ModalMenu;
