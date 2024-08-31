'use client';
import React, { useState, useEffect } from 'react'
import { CustomButton, ModalMenu } from '@/components';
import { ModalSearch, UtilSearch } from '@/components';
import Link from 'next/link';



const Header = () => {
    const [modalMenuOpen, setModalMenuOpen] = useState<boolean>(false);
    const [modalSearchOpen, setModalSearchOpen] = useState<boolean>(false);
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [scrollingUp, setScrollingUp] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
        const currentY = window.scrollY;

        if(currentY > 100) setShowHeader(false);
        else setShowHeader(true);

        if(currentY > lastScrollY) setScrollingUp(false);
        else setScrollingUp(true);

        lastScrollY = currentY;
    }

    return (
        <header className='fixed z-30 main__header flex justify-center px-5 box-border w-full'>
            <div className='relative header__inner flex justify-start w-full'>
                <div className={`flex justify-between w-full items-center bg-white/95 absolute dark:bg-default h-[60px] px-2 rounded-lg gap-2 ${(showHeader || scrollingUp) ? 'top-5' : 'top-[-80px]'} transition-all`}>
                    {/* <p>Hello</p> */}
                    <div className="header__left flex gap-10 items-center">
                        <div className="header__title flex justify-center items-center bg-white dark:bg-default h-[44px] shadow-primary rounded-lg px-5">
                            <h1 className='text-base font-extrabold text-default dark:text-white'>Developer Blog</h1>
                        </div>
                        <ul className="flex gap-5">
                            <li>
                                <Link href="/post" className={`font-bold text-sm px-5 py-2 rounded-full `}>Post</Link>
                            </li>
                            <li>
                                <Link href="/playground" className={`font-bold text-sm px-5 py-2 rounded-full `}>Playground</Link>
                            </li>
                            <li>
                                <Link href="/laboratory" className={`font-bold text-sm px-5 py-2 rounded-full `}>Laboratory</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='menu__button w-[22px] h-[36px] shadow-primary bg-white hover:bg-gray-100 dark:bg-default dark:hover:bg-gray-800 rounded-lg right-0'>
                        {modalMenuOpen && (
                        <ModalMenu 
                            isOpen={modalMenuOpen}
                            handleClose={() => setModalMenuOpen(!modalMenuOpen)}
                        />
                        )}
                        <CustomButton
                            content="Menu"
                            containerStyles='w-full h-full py-2 flex flex-col justify-center items-center gap-1'
                            handleClick={() => {
                                setModalMenuOpen(true);
                            }}
                        >
                            <p className="rounded-full bg-blue-100 w-1 h-1"></p>
                            <p className="rounded-full bg-blue-100 w-1 h-1"></p>
                            <p className="rounded-full bg-blue-100 w-1 h-1"></p>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header