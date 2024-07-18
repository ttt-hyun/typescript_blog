import React, { MouseEventHandler } from 'react';

export interface CustomButtonProps {
    children?: React.ReactNode;
    content?: string;
    containerStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface UtilSearchProps {
    keyword?: string;
    isAvailable: boolean;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}




export type PostAsideMenuChildrenProps = {
    slug: string;
    title: string;
};

export interface PostAsideMenuProps {
    slug?: string;
    title: string;
    category?: string[];
    children: (PostAsideMenuProps | PostAsideMenuChildrenProps)[];
}