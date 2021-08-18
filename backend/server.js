const express = require('express');
const multer = require("multer")

const app = express();

app.use(express.static('images'));

const storage = multer.diskStorage({
    destination:function (req,file,cb){
      cb(null,"./images")
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    }
  })

 const upload = multer({
       storage:storage,
 });
app.post('/single',upload.single("image"),(req,res)=>{
  console.log(req.file.filename);
  const imageName = req.file.filename;
  res.send(`http://localhost:3002/${imageName}`);
})

app.listen(3002);
