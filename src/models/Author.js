import mongoose, { Schema, model } from "mongoose";

const authorSchema = new Schema({
    name:{ type:String, required: true },
    lastname:{ type:String, required: true},
    age: Number,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
},{
    timestamps:true,
});

const Author = model('Author', authorSchema);
export default Author;