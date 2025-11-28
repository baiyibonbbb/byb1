const fs = require('fs');
const path = require('path');

// 图片目录路径
const imageDir = path.join(__dirname, 'public', 'image');

// 定义需要创建的JPG文件列表
const jpgFiles = [
  '乳化剂.jpg',
  '二氧化钛.jpg',
  '亚硝酸盐.jpg',
  '卵磷脂.jpg',
  '山梨酸钾.jpg',
  '氢化植物油.jpg',
  '油脂.jpg',
  '焦糖色素.jpg',
  '甜味剂.jpg',
  '聚山梨酯 80.jpg',
  '背景.jpg',
  '色素.jpg',
  '苯甲酸钠.jpg',
  '调味剂.jpg',
  '谷氨酸钠.jpg',
  '赤藓糖醇.jpg',
  '防腐剂.jpg',
  '阿斯巴甜.jpg',
  '高果糖玉米糖浆.jpg'
];

// 创建每个JPG文件
jpgFiles.forEach(jpgFile => {
  const jpgPath = path.join(imageDir, jpgFile);
  try {
    fs.writeFileSync(jpgPath, ''); // 创建空文件
    console.log(`创建成功: ${jpgFile}`);
  } catch (error) {
    console.error(`创建失败: ${jpgFile}`, error);
  }
});

console.log('所有JPG文件创建完成');