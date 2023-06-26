import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
    email: string;
    password: string;
    token: string;
}

export interface IAuthorModal extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: {
            data: Buffer,
            type: String
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAuthorModal>('Author', AuthorSchema);
