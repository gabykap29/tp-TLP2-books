import Author from "../models/Author.js";

export const authorCtrl = {};

authorCtrl.create = async (req,res)=>{
    const {name,lastname,age} = req.body;
    try {
        

        if(!name || !lastname || !age){
            return res.status(400).json({message:'Verifique los campos, por favor'})
        };
        const newAuthor = new Author({
            name,
            lastname,
            age
        });

        if(!newAuthor){
            return res.status(400).json({message:'Error al crear el usuario'})
        }
        await newAuthor.save();

        return res.status(201).json({newAuthor,message:'Autor creado con exito'});
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }
};

authorCtrl.findAll = async (req,res)=>{  
    try {
        
        const authors = await Author.find().populate('books');
        if(!authors){
            return res.status(400).json({msg: "No hay autores cargados en base de datos"});
        };

        return res.status(200).json(authors);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }
};

authorCtrl.findOne = async (req,res)=>{
    const {id}= req.params;
    try {
        const author = await Author.findById(id).populate('books');
        if(!author){
            return res.status(400).json({menssage: "El autor no existe!"});
        };

        return res.status(200).json(author);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error interno del servidor!'});
    }
};

authorCtrl.updateOne = async (req,res)=>{
    const {id} = req.body;
    const{name,lastname,age} = req.body;
    try {
        const author = await Author.findById(id);

        if(!author){
            return res.status(400).json({menssage: "El autor no existe!"});
        };

        const authorUpdate = await author.updateOne({name,lastname,age});
        if(!authorUpdate){
            return res.status(400).json({message:'Error al actualizar el autor'});
        };
        return res.status(202).json({message:'Autor actualizado con exito'});
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error interno del servidor!');
    }
};


authorCtrl.deleteOne = async(req,res)=>{
    const {id}=req.params;

    try {
        
        const author = await Author.findById(id);

        if(!author){
            return res.status(404).json({message:'El autor no existe en base de datos!'})
        };

        const deleteAuthor = await author.deleteOne();
        if(!deleteAuthor){
            return res.status(400).json({message:'Error al eliminar el autor'});
        }
        return res.status(202).json({message:'Autor eliminado con exito'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'error interno del servidor!'})
    }
};