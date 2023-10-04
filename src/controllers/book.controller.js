import Author from "../models/Author.js";
import Book from "../models/Book.js";

export const bookCtrl = {};

bookCtrl.create = async (req,res)=>{

    const {title,author,genre,year} = req.body;
    const img = req.files;
    console.log(req.body);
    console.log(req.files);
    const addAuthor = await Author.findById(author);

    if(!addAuthor){
        return res.status(400).json({msg: "El autor no existe"});
    }

    const newBook = new Book({
        title,
        author,
        genre,
        image: img,
        year
    });

    if(!title || !author || !genre ||  !year){
        return res.status(400).json({msg: "Verifique los campos, por favor"});
    };

    addAuthor.books.push(newBook);

    await addAuthor.save();
    await img.save();
    await newBook.save();
    
    return res.status(201).json({newBook,message:'Libro creado con exito'});
};


bookCtrl.findAll = async (req,res)=>{
    try {
        
        const books = await Book.find().populate('author');
        if(!books){
            return res.status(400).json({msg: "No hay libros cargados en base de datos"});
        };
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }

};

bookCtrl.findOne = async (req,res)=>{
    const {id}= req.params;
    try {
        const book = await Book.findById(id).populate('author');
        if(!book){
            return res.status(400).json({msg: "No hay libros cargados en base de datos"});
        };

        return res.status(200).json(book);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');     
    }
};

bookCtrl.updateOne = async (req,res)=>{
    const {id}= req.params;
    const {title,author,genre,image,year} = req.body;
    try {
        
        const book = await Book.findOne(id);

        if(!book){
            return res.status(400).json({menssage: "No hay libros cargados en base de datos"});
        };

        const bookUpdate = await book.updateOne({title,author,genre,image,year});
        if(!bookUpdate){
            return res.status(400).json({message:'Error al actualizar el libro'});
        }
        return res.status(202).json({message:'Libro actualizado con exito'});
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }
};

bookCtrl.deleteOne = async (req,res)=>{
    const {id}= req.params;

    try {
        const book = await Book.findById(id);

        if(!book){
            return res.status(400).json({menssage: "No hay libros cargados en base de datos"});
        };

        await book.deleteOne();
        return res.status(202).json({message:'Libro eliminado con exito'});
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }
};

