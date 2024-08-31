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
            {modalMenuOpen && (
            <ModalMenu 
                isOpen={modalMenuOpen}
                handleClose={() => setModalMenuOpen(!modalMenuOpen)}
            />
            )}
            <CustomButton
                content="Menu"
                containerStyles={`absolute flex justify-center gap-1 items-center w-[40px] h-[24px] px-2 rounded-lg shadow-primary bg-white dark:bg-black hover:bg-gray-50 right-5 ${(showHeader || scrollingUp) ? 'top-5' : 'top-[-80px]'} transition-all`}
                handleClick={() => {
                    setModalMenuOpen(true);
                }}
            >
                <p className="rounded-full bg-green-200 w-1 h-1"></p>
                <p className="rounded-full bg-green-200 w-1 h-1"></p>
                <p className="rounded-full bg-green-200 w-1 h-1"></p>
            </CustomButton>
        </header>
    )
}

export default Header