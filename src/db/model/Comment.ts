import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    postId: string;
    content: string;
    author: {
        name: string;
        password: string;
    }
}

export interface ICommentProp {
    _id: string;
    postId: string;
    content: string;
    author: {
        name: string;
        password: string;
    };
    createdAt: string;
    updatedAt: string;
}

const commentSchema: Schema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
},
{ timestamps: true }
);


const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;