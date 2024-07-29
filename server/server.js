import express from 'express';
import apiRoutes from './routes/api.route.js';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js"
import cors from "cors";
import { PORT } from './config/config.js';
import { corsOptions } from './config/config.js';

const app = express();

app.use(cors(corsOptions));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();


app.use(express.json());
app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));
app.use('/assets', express.static(path.join(__dirname,'public/assets')))



const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})

app.use("/api", apiRoutes);


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})