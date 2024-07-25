import dbConnect from "@/db/dbConnect";
import Comment, { ICommentProp } from "@/db/model/Comment";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';


let comment: ICommentProp[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { content, author } = req.body;

//     if (!content || !author) {
//       return res.status(400).json({ error: 'Content and author are required' });
//     }

//     const newComment: ICommentProp = {
//       postId: 'test',
//       content: content,
//       createAt: Date.now(),
//       author: author,
//     };

//     comment.push(newComment);
//     return res.status(201).json(newComment);
//   }

  if (req.method === 'GET') {
    return res.status(200).json(comment);
  }

//   res.setHeader('Allow', ['GET', 'POST']);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
}