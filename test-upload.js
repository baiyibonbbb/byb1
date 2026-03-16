const fs = require('fs');
const path = require('path');
const http = require('http');

// 测试本地上传
const testLocalUpload = () => {
    console.log('测试本地上传...');
    
    const filePath = path.join(__dirname, 'package.json');
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16);
    const headers = {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
    };
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/upload',
        method: 'POST',
        headers: headers
    };
    
    const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('响应体:', data);
        });
    });
    
    req.on('error', (e) => {
        console.error(`请求错误: ${e.message}`);
    });
    
    // 写入表单数据
    req.write(`--${boundary}\r\n`);
    req.write(`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`);
    req.write('Content-Type: application/json\r\n');
    req.write('\r\n');
    
    // 写入文件内容
    fileStream.pipe(req, {
        end: false
    });
    
    fileStream.on('end', () => {
        req.write(`\r\n--${boundary}--\r\n`);
        req.end();
    });
};

// 测试域名上传
const testDomainUpload = () => {
    console.log('\n测试域名上传...');
    
    const filePath = path.join(__dirname, 'package.json');
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16);
    const headers = {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
    };
    
    const options = {
        hostname: 'byb1.baiyibonbbb.dpdns.org',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: headers
    };
    
    const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('响应体:', data);
        });
    });
    
    req.on('error', (e) => {
        console.error(`请求错误: ${e.message}`);
    });
    
    // 写入表单数据
    req.write(`--${boundary}\r\n`);
    req.write(`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`);
    req.write('Content-Type: application/json\r\n');
    req.write('\r\n');
    
    // 写入文件内容
    fileStream.pipe(req, {
        end: false
    });
    
    fileStream.on('end', () => {
        req.write(`\r\n--${boundary}--\r\n`);
        req.end();
    });
};

// 运行测试
testLocalUpload();