import React, { MouseEventHandler } from 'react';

export interface CustomButtonProps {
    children?: React.ReactNode;
    content?: string;
    containerStyles?: string;
    tooltip?: string;
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

export type TPostProps = {
    slug: string;
    title: string;
    date: string;
    published: boolean;
    body: string;
    description?: string | undefined;
    category?: string | undefined;
    related?: string[] | undefined;
    slugAsParams?: string;
}
