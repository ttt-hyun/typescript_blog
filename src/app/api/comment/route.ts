import dbConnect from "@/db/dbConnect";
import Comment, { ICommentProp } from "@/db/model/Comment";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
    message: string;
};

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await dbConnect();
        const comment = await Comment.find({});
        return NextResponse.json(comment);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}


export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await dbConnect();
        const comment = await Comment.find({});
        return NextResponse.json(comment);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}
