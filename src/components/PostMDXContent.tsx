import Image from "next/image";
import * as runtime from "react/jsx-runtime"
import { Pre } from '@/components/mdx/Pre'
import  React  from 'react';

interface HeadTagProps {
    children: React.ReactNode;
    props?: {
        id : string;
    };
    id?: string;
}

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

const components = {
    pre: Pre,
    img: Image,
    h1: ({ children, props, id }: HeadTagProps) => {
        return (
            <h1 id={ props?.id ? props.id : id } className="pt-12 font-black text-3xl">{children}</h1>
        )
    },
    h2: ({ children, props, id }: HeadTagProps) => {
        return (
            <h2 id={ props?.id ? props.id : id } className="font-extrabold text-2xl mt-8 mb-4">{children}</h2>
        )
    },
    p: ({ children }: HeadTagProps) => {
        return (
            <p className="font-semibold text-lg my-4 break-keep">{children}</p>
        )
    },
    ol: ({ children }: HeadTagProps) => {
        return (
            <ol className="mdx__ol font-semibold text-lg my-4 flex flex-col gap-2">{children}</ol>
        )
    },
    ul: ({ children }: HeadTagProps) => {
        return (
            <ul className="mdx__ul font-semibold text-lg my-4 flex flex-col gap-2">{children}</ul>
        )
    },
    hr: ({ ...props }) => {
        return (
            <hr className="mt-4" />
        )
    },
    
    

}

interface MdxProps {
    code: string;
}

export default function MDXContent( { code }: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component components={components}/>
}
