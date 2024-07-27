import dbConnect from "@/db/dbConnect";
import Comment, { ICommentProp } from "@/db/model/Comment";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// import { NextResponse } from "next/server";

type ResponseData = {
    message: string;
};

export async function POST( req: NextRequest ) {

    try {

        await dbConnect();

        try {

            const reqData = await req.json();
            const comment = await Comment.find(reqData);

            return NextResponse.json(comment);

        } catch (err: any) {

            const comment = await Comment.find({});

            return NextResponse.json(comment);

        }
        
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

            const comment = await Comment.find(findParams);
            
            return NextResponse.json(comment);

        } catch (err: any) {

            const comment = await Comment.find({});

            return NextResponse.json(comment);

        }

    } catch (err: any) {

        return NextResponse.json({ error: err.message });

    }
}
