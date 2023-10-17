import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import {creatCapture, getACapture, getCaptures, getCredits, triggerCapture, uploadCapture} from "./lumaAPI.js";
const app = express();

app.use(bodyParser.json())

const upload = multer({
    dest: './static/upload'
})

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.get('/getCredits', async function(req, res) {
    const data = await getCredits()
    res.send(data);
});
app.get('/getCaptures', async function(req, res) {
    const data = await getCaptures()
    res.send(data);
});
app.get('/getACapture', async function(req, res) {
    const slug = req.query.slug
    const data = await getACapture(slug)
    res.send(data);
});
app.post('/creatCapture', async function(req, res) {
    const title = req.body.title
    const data = await creatCapture(title)
    res.send(data);
});

app.put('/uploadCapture', upload.single('file'), async function(req, res) {
    const file= req.file
    const uploadUrl = req.body.url
    const data = await uploadCapture(file, uploadUrl)
    res.send(data);
});

app.get('/triggerCapture', async function(req, res) {
    const slug = req.query.slug
    const data = await triggerCapture(slug)
    res.send(data);
});

app.listen(3000, () => {
    console.log("示例应用正在监听 3000 端口!");
});
