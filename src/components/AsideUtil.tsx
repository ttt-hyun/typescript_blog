"use client";
import React, { useEffect, useState } from "react";
import { UtilSearch, ModalSearch } from "@/components";
import { postAsideMenu } from "@/constants";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import AsideUtilSubMenu from './AsideUtilSubMenu';

const AsideUtil = () => {
    const [modalSearchOpen, setModalSearchOpen] = useState<boolean>(false);

    const pathname = usePathname();
    // console.log('pathname', pathname);


    // const menuClick = (event: MouseEvent) => {
    //     const target = event.target as HTMLElement;
    //     const targetActiveBoolean = target.dataset.active === 'true';

    //     if (targetActiveBoolean) {
    //         target.closest('li')?.classList.remove('is-active');
    //     } else {
    //         target.closest('li')?.classList.add('is-active');
    //     }

    //     target.dataset.active = String(!targetActiveBoolean);
    // };

    

    return (
        <>  
            {/* <p>{JSON.stringify(postAsideMenu)}</p> */}
            <div className="py-2 pr-2">
                <UtilSearch isAvailable={modalSearchOpen} handleClick={() => setModalSearchOpen(!modalSearchOpen)} />
                {modalSearchOpen && (
                <ModalSearch 
                    isOpen={modalSearchOpen}
                    handleClose={() => setModalSearchOpen(!modalSearchOpen)}
                />
                )}
                <div className="main__menu py-5">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link href="/post" className="group flex gap-2 items-center hover:gap-4 transition-all">
                                <p className="icon__wrap border rounded-md p-1">
                                    <svg className="w-[20px] h-[20px] group-hover:text-green-500 transition-all text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clipRule="evenodd"/>
                                    </svg>
                                </p>
                                <p className="font-extrabold">Post</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/playground" className="group flex gap-2 items-center hover:gap-4 transition-all">
                                <p className="icon__wrap border rounded-md p-1">
                                    <svg className="w-[20px] h-[20px] group-hover:text-purple-500 transition-all text-purple-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z" clipRule="evenodd"/>
                                    </svg>


                                </p>
                                <p className="font-extrabold">PlayGround</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/laboratory" className="group flex gap-2 items-center hover:gap-4 transition-all">
                                <p className="icon__wrap border rounded-md p-1">
                                    <svg className="w-[20px] h-[20px] group-hover:text-cyan-500 transition-all text-cyan-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z" clipRule="evenodd"/>
                                    </svg>

                                </p>
                                <p className="font-extrabold">Laboratory</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                {
                    postAsideMenu 
                    ? (
                        <div className="post__menu">
                            <ul className="flex flex-col gap-2">
                                {
                                    postAsideMenu.map((dep1) => {
                                        return (
                                            <li key={dep1.title}>
                                                <p className="font-extrabold text-md">- {dep1.title}</p>
                                                {
                                                    dep1.children 
                                                    ? (
                                                        <ul className="flex flex-col py-2 pl-3">
                                                            {
                                                                dep1.children.map((dep2, idx) => {
                                                                    if(dep2){
                                                                        return (
                                                                            <li key={idx}>                                                                                
                                                                                <AsideUtilSubMenu data={ dep2 } />
                                                                            </li>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    )
                                                    : null
                                                }
                                            </li>
                                        )
                                    })   
                                }
                            </ul>
                        </div>        
                    )
                    : null
                }
            </div>
            
        </>
    );
};

export default AsideUtil;
