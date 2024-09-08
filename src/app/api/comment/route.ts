import dbConnect from "@/db/dbConnect";
import Comment, { ICommentProp } from "@/db/model/Comment";
import { NextRequest, NextResponse } from "next/server";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

export async function POST( req: NextRequest ) {
    try {
        await dbConnect();
        const body = await req.json();
        const createComment = Comment.create(body);

        return NextResponse.json(body);
        
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function GET( req: NextRequest ) {
    try {
        await dbConnect();

        const params = req.nextUrl.searchParams;
        const allowParams = ['postId'];

        let findParams: { [key: string]: string | null } = {};

        allowParams.forEach((res: string) => {
            if(params.get(res) !== null && params.get(res) !== undefined){
                findParams[res] = params.get(res);
            }
        })

        try {

            const comment: ICommentProp[] = await Comment.find(findParams);
            
            return NextResponse.json(comment);

        } catch (err: any) {

            const comment = await Comment.find({});

            return NextResponse.json(comment);

        }

    } catch (err: any) {

        return NextResponse.json({ error: err.message });

    }
}

export async function PATCH( req: NextRequest ) {

    

    try {
        await dbConnect();

        const params = req.nextUrl.searchParams.get('comment');
        return NextResponse.json({test: params});
        // const allowParams = ['postId'];

        // let findParams: { [key: string]: string | null } = {};

        // allowParams.forEach((res: string) => {
        //     if(params.get(res) !== null && params.get(res) !== undefined){
        //         findParams[res] = params.get(res);
        //     }
        // })

        // try {

        //     const comment: ICommentProp[] = await Comment.find(findParams);
            
        //     return NextResponse.json(comment);

        // } catch (err: any) {

        //     const comment = await Comment.find({});

        //     return NextResponse.json(comment);

        // }

    } catch (err: any) {

        return NextResponse.json({ error: err.message });

    }
}
