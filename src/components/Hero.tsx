"use client";

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CustomButton } from '@/components';

const Hero = () => {
    const handleEvent = () => { };
    return (
        <div>
            <div className='flex flex-1 pt-12 padding-x'>
                <h1>히어로 컴포넌트</h1>
                <CustomButton
                    content="버튼 제목"
                    containerStyles="bg-primary-blue text-white rounded-full mt-10"
                    handleClick={handleEvent}
                />
            </div>
        </div>
    )
}

export default Hero;