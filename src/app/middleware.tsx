// app/_middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log(url.href); // 전체 URL을 콘솔에 출력

  // 계속 진행
  return NextResponse.next();
}