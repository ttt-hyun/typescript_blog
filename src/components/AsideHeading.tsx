"use client";
import { renderToString } from 'react-dom/server';
import React, { useEffect, useState, useRef } from "react";
import { MDXContent } from "@/components";
interface MdxProps {
    code: string;
}
const AsideHeading = ({ code }: MdxProps) => {
    // const [modalSearchOpen, setModalSearchOpen] = useState<boolean>(false);
    const Component = MDXContent({ code });
    const postElement = renderToString(
                <div>
                   { Component }
                </div>
    );

    const getHeadings = (source: string) => {
        const regex = /<h[0-9].*?>(.*?)<\/h[0-9]>/g;
        const regexForId = /id="([^"]+)"/;
        const regexForTitle = /<h[0-9][^>]*>([\p{L}\s\S]*?)<\/h[0-9]>/u;
        const regexForTitleForText = /<a[^>]*>(.*?)<\/a>/;
        // gu와 u flag를 사용하기 위해 tsconfig.json에 target: es6추가
      
        const matches = source.match(regex);
        if (!matches) {
          return [];
        }
      
        return matches.map((heading) => {
          const idMatch = heading.match(regexForId);
          const titleMatch = heading.match(regexForTitle);
          const headingTagMatch = heading.match(/<h([0-9])/);
          
          
          const titleMatchText = titleMatch ? titleMatch[1].match(regexForTitleForText) : heading.replace(/<\/?[^>]+(>|$)/g, "").trim();
      
          const headingId = idMatch ? idMatch[1] : null;
          const headingTitle = titleMatchText ? titleMatchText[1] : heading.replace(/<\/?[^>]+(>|$)/g, "").trim();
          const headingTag = headingTagMatch ? parseInt(headingTagMatch[1], 10) : null;
      
          return {
            id: headingId,
            text: headingTitle,
            h: headingTag,
          };
        });
      };
    
    type headingGroupProps = {
        id: string;
        text: string;
        children?: headingGroupProps[];
    }
    const data = getHeadings(postElement);
    data.push({id : 'FOR LAST FOREACH', text: 'FOR LAST FOREACH', h: 1});
    let processedData: headingGroupProps[] = [];
    let headingGroup: headingGroupProps | undefined;
    let currentId: string | undefined;
    let beforeId: string | undefined;
    data.forEach((res: { id: string | null; text: string; h: number | null}) => {
        if(res.id && res.h){
            currentId = res.id;

            if(res.h === 1 && currentId !== beforeId && beforeId !== undefined){
                if(headingGroup) processedData.push(headingGroup);
                headingGroup = undefined;
            }

            if(res.h === 1){
                // console.log('made heading group')
                headingGroup = {
                    id: res.id,
                    text: res.text,
                    children: []
                }
            }

            if(res.h === 2 && headingGroup){
                // console.log('pushed h2 children')
                headingGroup.children?.push({
                    id: res.id,
                    text: res.text
                })
            }

            beforeId = currentId;
        }

    })

    // console.log(processedData);

    // function scrollToHeading(e, id = ''){
    //     e.preventDefault();
    //     if(id === '') return false;

    //     const headingEl = document.getElementById(id);
    //     const headerHeight = document.querySelector('header').offsetHeight;        // 헤더 고려 위치값 조정

    //     // 요소의 window offset 위치값 가져오기
    //     const rect = headingEl.getBoundingClientRect();
    //     const offsetTop = rect.top + window.pageYOffset;
    //     const targetOffSet = offsetTop - (defaultMargin + headerHeight);
    //     window.scrollTo(0, targetOffSet);
    // }

    // useEffect(() => {
    //     //스크롤 이벤트
    //     function handleScroll() {

    //         // 상수 지정
    //         // const headerHeight = document.querySelector('header').offsetHeight;        // 헤더 고려 위치값 조정
    //         const headerHeight = 70;        // 헤더 고려 위치값 조정
    //         const headings  = document.querySelector('.main__header');
    //         const mdxBody   = document.querySelector('.mdx__body');

    //         let mdxH1;
    //         let mdxH2;
    //         if(mdxBody && headings){
    //             mdxH1     = Array.from(mdxBody.querySelectorAll('h1'));
    //             mdxH2     = Array.from(mdxBody.querySelectorAll('h2'));
                

    //         }

    //         // 현재 h2 heading 표시
    //         mdxH2.map((el, idx)=>{
    //             if(el == mdxBody) return false;
    //             const observeTop = el.offsetTop - (headerHeight + defaultMargin);
    //             const observeBottom = (mdxH2[idx+1].offsetTop + mdxH2[idx+1].offsetHeight) - (headerHeight + defaultMargin);

    //             if(observeTop < window.pageYOffset && window.pageYOffset < observeBottom){
    //                 document.querySelector(`[data-id="${el.id}"]`).classList.add('observed');
    //                 Array.from(headings.querySelectorAll('[data-h="2"]')).filter((res) => res.dataset.id != el.id).map(res => {
    //                     res.classList.remove('observed');
    //                 })
    //             }
    //         })
            
    //         // 현재 h3 heading 표시
    //         mdxH3.map((el, idx)=>{
    //             if(el == mdxBody) return false;
    //             const observeTop = el.offsetTop - (headerHeight + defaultMargin);
    //             const observeBottom = (mdxH3[idx+1].offsetTop + mdxH3[idx+1].offsetHeight) - (headerHeight + defaultMargin);

    //             if(observeTop < window.pageYOffset && window.pageYOffset < observeBottom){
    //                 document.querySelector(`[data-id="${el.id}"]`).classList.add('observed');
    //                 Array.from(headings.querySelectorAll('[data-h="3"]')).filter((res) => res.dataset.id != el.id).map(res => {
    //                     res.classList.remove('observed');
    //                 })
    //             }
    //         })
    //     }
    
    //     // 컴포넌트가 마운트될 때 이벤트 리스너 추가
    //     window.addEventListener('scroll', handleScroll);
    
    //     // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, []);

    useEffect(() => {

        const h1List = document.querySelectorAll('.mdx__body h1');
        const h2List = document.querySelectorAll('.mdx__body h2');
        const headingList = document.querySelectorAll('.mdx__heading a')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if(entry.isIntersecting){
                        Array.from(headingList).forEach((el) => {
                            const aTag = el as HTMLElement;
                            // console.log(aTag.dataset.h)
                            // console.log(entry.target.tagName.substring(1));
                            // console.log(aTag.dataset.id)
                            if(aTag.dataset.h == entry.target.tagName.substring(1)){
                                if(aTag.dataset.id === entry.target.id){
                                    aTag.classList.add('opacity-100');
                                    // console.log('observed a tag is ' + aTag.dataset.id);
    
                                }else{
                                    aTag.classList.remove('opacity-100');
                                }
                            }
                        })
                    }
                })       
            },
            {
                root: null,
                rootMargin: '0px 0px -80% 0px',
                threshold: 0
            }
        )

        Array.from(h1List).forEach((li) => observer.observe(li));
        Array.from(h2List).forEach((li) => observer.observe(li));
        
    }, [])



    return (
        <>
            <div className="mdx__heading p-2">
                {
                    processedData 
                    ? (
                        <ul className="first__list flex flex-col gap-2">
                            {
                                processedData.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <a className="font-extrabold opacity-75" data-id={item.id} data-h={1} href={`#${item.id}`}>{item.text}</a>
                                            {
                                                item.children 
                                                ? (
                                                    <ul className="second__list flex flex-col py-2 gap-1 pl-4">
                                                        {
                                                            item.children.map(item => {
                                                                return (
                                                                    <li key={item.id}>
                                                                        <a className="text-sm font-bold opacity-75" data-id={item.id} data-h={2} href={`#${item.id}`}>{item.text}</a>
                                                                    </li>
                                                                )
                                                            })    
                                                        }
                                                    </ul>
                                                ) : null
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                    : null
                }
            </div>
        </>
    );
};

export default AsideHeading;
