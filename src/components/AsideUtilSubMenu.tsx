"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { PostAsideMenuProps, PostAsideMenuChildrenProps } from "@/types"


interface DataProps {
    data : PostAsideMenuProps | PostAsideMenuChildrenProps;
}

const AsideUtilSubMenu: React.FC<DataProps> = ( { data } ) => {
    const pathname = usePathname();
    let isItActive = false;
    if('children' in data){
        data.children.forEach(res => {
            if(res.slug && pathname.includes(res.slug)) isItActive = true;
        })
    }
    const [isActive, setIsActive] = useState<boolean>(isItActive);

    // useEffect(() => {

    // }, [isActive])

    return (
        <>  
            <Link 
                href={pathname} 
                onClick={()=>{setIsActive(!isActive)}}
                scroll={false}
                className={`flex gap-2 items-end font-bold py-[5px] text-gray-600 hover:text-black dark:hover:text-white ${isActive ? 'text-black dark:text-white' : ''}`}>
                    {data.title}
                    <span className="text-sm font-medium">({'children' in data ? data.children.length : 0})</span>
            </Link>
            {
                'children' in data && data.children.length > 0 
                ? (
                    <ul className={`relative ml-2 transition-all overflow-hidden  group-[.is-active]/li:h-fit before:content-[''] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-5 before:border-solid before:border-gray-300 before:border-l before:border-b before:rounded-bl-md 
                                    ${isActive ? '' : 'h-0'}`}>
                        {
                            data.children.map((dep3, idx) => {
                                return (
                                    <li key={idx} className="first:pt-2 last:pb-2">
                                        <Link href={`/${dep3.slug}`} className={`${'slug' in dep3 && typeof dep3.slug === 'string' && pathname.includes(dep3.slug) ? 'before:bg-purple-400 text-black dark:text-white' : 'hover:before:bg-green-400'} block relative pl-3 py-[3px] text-gray-600 hover:text-black dark:hover:text-white before:content-[''] before:absolute before:h-full before:w-[1px] before:top-0 before:left-0 font-medium text-sm`}>{dep3.title}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
                : null
            }
        </>
    );
};

export default AsideUtilSubMenu;
