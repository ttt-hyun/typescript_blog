'use client';

import React, { useEffect, useState } from 'react'
import ReactPortal from '@/components/ReactPortal';
import Link from 'next/link';

interface ModalMenuProps {
    children?: React.ReactElement;
    isOpen: boolean;
    handleClose: () => void;
}
const ModalMenu = ({
    children,
    isOpen,
    handleClose
}:ModalMenuProps ) => {

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => 
            e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return (): void => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        }
    }, [handleClose]);

    useEffect(() => {
        // document.body.style.overflow = 'hidden';
        // return (): void => {
        //     document.body.style.overflow = 'unset';
        // }
    }, [isOpen]);
 
    if(!isOpen) return null;

    // const closeModal = (e: React.MouseEvent):void => {
    //     const target = e.target as HTMLElement;
    //     target.dataset.close && handleClose();
    // }

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <>
                <div
                    onClick={handleClose}
                    className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-40 backdrop-blur-md">
                    <div className="p-5">
                        <div 
                            className='modal__inner flex flex-col gap-12 max-w-full w-[1200px]'>
                            <Link href="/post" className="w-fit font-black text-7xl text-black dark:text-white">Post</Link>
                            <Link href="/playground" className="w-fit font-black text-7xl text-black dark:text-white">PlayGround</Link>
                            <Link href="/laboratory" className="w-fit font-black text-7xl text-black dark:text-white">Laboratory</Link>
                        </div>
                    </div>
                </div>
            </>
        </ReactPortal>
    )
}

export default ModalMenu;