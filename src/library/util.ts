import { Post } from "#site/content";

// export function formatDate(input: string | number): string {
//     const date = new Date(input);
//     return date.toLocaleDateString('ko-KR', {
//         timeZone: 'Asia/Seoul', 
//         year: 'numeric', 
//         month: '2-digit', 
//         day: '2-digit'
//         // hour: '2-digit', 
//         // minute: '2-digit', 
//         // second: '2-digit' 
//     });
// }

// yyyy.mm.dd 날짜 반환
export function formatDate(dateTimeString: string): string {
    // 주어진 문자열을 Date 객체로 변환
    let date = new Date(dateTimeString);

    // 연도, 월, 일을 추출하여 원하는 형식으로 변환
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    // 'YYYY.MM.DD' 형식의 문자열로 반환
    return `${year}.${month}.${day}`;
}

export function sortPosts(posts: Array<Post>){
    return posts.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    });
}