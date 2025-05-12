import { Router } from "express";

const fileRouter = Router();
5
fileRouter.post('/', (req,res) =>{
    console.log(req.files);
    res.send(`Archivo ${req.files.file.name} subido correctamente al servidor`);
    //fileUpload.mv
})

export default fileRouter;