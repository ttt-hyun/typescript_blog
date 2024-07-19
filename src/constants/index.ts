import { postsForSearch } from '#site/content';
import { usePathname } from "next/navigation";
import { PostAsideMenuProps, PostAsideMenuChildrenProps } from "@/types"



const sqlChildren: PostAsideMenuChildrenProps[]            = [];
const phpChildren: PostAsideMenuChildrenProps[]            = [];
const typescriptChildren: PostAsideMenuChildrenProps[]     = [];
const nextjsChildren: PostAsideMenuChildrenProps[]         = [];
const codeigniterChildren: PostAsideMenuChildrenProps[]    = [];
const moduleChildren: PostAsideMenuChildrenProps[]    = [];

postsForSearch.forEach(res => {
    const prc = {
        slug: res.slug,
        title: res.title
    }
    if(res.category?.toLowerCase() === 'sql'){
        sqlChildren.push(prc); return;
        
    }
    if(res.category?.toLowerCase() === 'php'){
        phpChildren.push(prc); return;
        
    }
    if(res.category?.toLowerCase() === 'typescript'){
        typescriptChildren.push(prc); return;
        
    }
    if(res.category?.toLowerCase() === 'nextjs'){
        nextjsChildren.push(prc); return;
        
    }
    if(res.category?.toLowerCase() === 'codeigniter'){
        codeigniterChildren.push(prc); return;
    }
    if(res.category?.toLowerCase() === 'module'){
        moduleChildren.push(prc); return;
    }
})

// 포스트 죄측 Aside 카테고리 메뉴
export const postAsideMenu: PostAsideMenuProps[] = [
    {
        title : 'Programming Language',
        children: [
            {
                title: 'SQL',
                category: ['sql', 'mysql'],
                children: sqlChildren
            },
            {
                title: 'PHP',
                category: ['php'],
                children: phpChildren
            },
            {
                title: 'TypeScript',
                category: ['typescript'],
                children: typescriptChildren
            },
            {
                title: 'Module',
                category: ['module'],
                children: moduleChildren
            }
        ]
    },
    {
        title : 'Web FrameWork',
        children: [
            {
                title: 'NextJs',
                category: ['next', 'nextjs'],
                children: nextjsChildren
            },
            {
                title: 'CodeIgniter',
                category: ['codeigniter', 'ciboard'],
                children: codeigniterChildren
            }
        ]
    }
]
