const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 上传文件夹
const UPLOAD_FOLDER = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

// 配置上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// 静态文件 + 接口
app.use(express.static(__dirname));
app.use('/download', express.static(UPLOAD_FOLDER));

// 上传接口
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true });
});

// 获取文件列表
app.get('/files', (req, res) => {
    fs.readdir(UPLOAD_FOLDER, (err, files) => {
        if (err) return res.json([]);
        res.json(files.map(name => ({ name })));
    });
});

// 删除文件
app.delete('/delete/:filename', (req, res) => {
    const fp = path.join(UPLOAD_FOLDER, req.params.filename);
    fs.unlink(fp, () => res.json({ success: true }));
});

app.listen(PORT, () => {
    console.log(`服务运行在 http://localhost:${PORT}`);
});