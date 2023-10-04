import {model,Schema} from "mongoose";

const bookSchema = new Schema({
    title:{ type:String,required:true},
    author:{
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    genre: {type:String,required:true},
    image: {type: String},
    year:{type:Date,required:true},
});

const Book = model('Book', bookSchema);

export default Book;