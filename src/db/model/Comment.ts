import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    postId: string;
    content: string;
    createAt: string | number;
    author: {
        name: string;
        password: string;
    }
}

export interface ICommentProp {
    postId: string;
    content: string;
    createAt: string | number;
    author: {
        name: string;
        password: string;
    }
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
    creatAt: {
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
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;