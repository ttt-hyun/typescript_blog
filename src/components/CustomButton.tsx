"use client";
import React from 'react';
import { CustomButtonProps } from '@/types';

const CustomButton = ({ children, content, containerStyles, handleClick }: CustomButtonProps) => {
    return (
        <button
            disabled={false}
            type={"button"}
            className={`${containerStyles}`}
            onClick={handleClick}
        >
            {children ? children : content}
        </button>
    )
}

export default CustomButton;