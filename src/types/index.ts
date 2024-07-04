import React, { MouseEventHandler } from 'react';

export interface CustomButtonProps {
    children?: React.ReactNode;
    content?: string;
    containerStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}