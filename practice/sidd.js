import express from 'express'
import multer from 'multer';
import path from 'path'
const app = express();
app.use(express.json())
app.use(express.urlencoded())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./practice/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname +path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.sendFile('C:/Users/ritub/OneDrive/Desktop/sidd/LANGUAGES/nodejs/node js by peyush advanced course/Node 23 Authentication/Practice 21 july 2024/practice/client.html')

})
app.post('/practice', upload.single('background_image'), (req, res) => {
    //   // req.file contains the uploaded file
    //   // req.body contains other form fields
    console.log(req.file); // File information
    console.log(req.body); // Other form fields


    res.json({ done: true });
});

app.get('/done', (req, res) => {
    res.send('done')
})
app.listen(3000, () => console.log('Server running on port 3000'));
