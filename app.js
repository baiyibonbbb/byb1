const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 解析JSON请求体
app.use(express.json());

// 确保uploads目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// 配置multer存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// 提供静态文件
app.use(express.static(__dirname));

// 添加CORS头
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// 上传文件
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: '请选择文件' });
    }
    
    res.json({ success: true, message: '文件上传成功' });
});

// 获取文件列表
app.get('/files', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.json([]);
        }
        const fileList = files.map(file => ({
            name: file,
            path: `/download/${file}`
        }));
        res.json(fileList);
    });
});

// 下载文件
app.get('/download/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        res.download(filePath, filename);
    } else {
        res.status(404).send('文件不存在');
    }
});

// 删除文件
app.delete('/delete/:filename', (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.json({ success: false, message: '删除文件失败' });
            }
            res.json({ success: true, message: '文件删除成功' });
        });
    } else {
        res.json({ success: false, message: '文件不存在' });
    }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
    console.log(`服务器运行在 http://0.0.0.0:${port}`);
});