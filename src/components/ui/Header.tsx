'use client';
import React, { useState } from 'react'
import { CustomButton, ModalMenu } from '@/components';

const Header = () => {
    const [modalMenuOpen, setModalMenuOpen] = useState<boolean>(false);
    return (
        <header className='flex justify-center sticky  px-5 box-border'>
            <div className='relative header__inner flex justify-center w-[1200px]'>
                <div className="header__title flex justify-center items-center absolute top-5 z-100 bg-white dark:bg-gray-prim w-[480px] h-[50px] shadow-primary rounded-lg">
                    <h1 className='text-base font-extrabold text-default dark:text-white'>header</h1>
                </div>
                <div className='menu__button absolute w-[50px] h-[50px] shadow-primary bg-white hover:bg-gray-200 dark:bg-gray-prim dark:hover:bg-gray-800 rounded-lg top-5 right-0'>
                    {modalMenuOpen && (
                    <ModalMenu 
                        isOpen={modalMenuOpen}
                        handleClose={() => setModalMenuOpen(!modalMenuOpen)}
                    >
                        <p>test children</p>
                    </ModalMenu>
                    )}
                    {/* <button onClick={() => {setModalMenuOpen(true)} } className='w-full h-full px-[15px] py-[17px] flex flex-col justify-between'>
                        <p className='bg-gray-700 w-full h-[2px] rounded-sm'></p>
                        <p className='bg-gray-700 w-full h-[2px] rounded-sm'></p>
                        <p className='bg-gray-700 w-full h-[2px] rounded-sm'></p>
                    </button> */}
                    <CustomButton
                        content="Menu"
                        containerStyles='w-full h-full px-[15px] py-[17px] flex flex-col justify-between'
                        handleClick={() => {
                            setModalMenuOpen(true);
                        }}
                    >
                        <p className='bg-gray-700 dark:bg-white w-full h-[2px] rounded-sm'></p>
                        <p className='bg-gray-700 dark:bg-white w-full h-[2px] rounded-sm'></p>
                        <p className='bg-gray-700 dark:bg-white w-full h-[2px] rounded-sm'></p>
                    </CustomButton>
                </div>
            </div>
        </header>
    )
}

export default Header