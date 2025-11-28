const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 图片目录路径
const imageDir = path.join(__dirname, 'public', 'image');

// 读取目录中的所有文件
const files = fs.readdirSync(imageDir);

// 过滤出PNG文件
const pngFiles = files.filter(file => file.endsWith('.png'));

console.log(`找到 ${pngFiles.length} 个PNG文件需要转换`);

// 遍历PNG文件并转换
pngFiles.forEach(pngFile => {
    const pngPath = path.join(imageDir, pngFile);
    const jpgFile = pngFile.replace('.png', '.jpg');
    const jpgPath = path.join(imageDir, jpgFile);
    
    try {
        // 使用PowerShell命令转换图片（Windows内置功能）
        execSync(`powershell -command "& { $img = [System.Drawing.Image]::FromFile('${pngPath.replace(/\\/g, '\\\\')}'); $img.Save('${jpgPath.replace(/\\/g, '\\\\')}', [System.Drawing.Imaging.ImageFormat]::Jpeg); $img.Dispose() }"`, 
            { stdio: 'inherit' });
        console.log(`转换成功: ${pngFile} -> ${jpgFile}`);
    } catch (error) {
        console.error(`转换失败: ${pngFile}`, error);
    }
});

console.log('转换任务完成');