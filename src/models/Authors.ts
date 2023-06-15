import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
}

export interface IAuthorModal extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAuthorModal>('Author', AuthorSchema);
