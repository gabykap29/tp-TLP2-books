import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './src/routes/router.js';
import { connectDB } from './database/db.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.set('views',path.join(process.cwd(), 'src','views'));
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
//fileUpload 
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

  //si la carpeta uploads no existe, la crea
  if (!fs.existsSync(path.join(process.cwd(), 'uploads/'))) {
    fs.mkdirSync(path.join(process.cwd(), 'uploads/'), { recursive: true });
  }
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:path.join(process.cwd(), 'uploads/'),
    })
  );

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
    connectDB();
});