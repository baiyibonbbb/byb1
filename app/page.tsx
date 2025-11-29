'use client';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // 分类数据
  const categories = [
    { id: 'food', name: '食品', description: '可供人类食用的各类产品' },
    { id: 'product', name: '产品', description: '经过加工制作的食品商品' },
    { id: 'safety', name: '安全', description: '食品质量与安全保障' },
    { id: 'assurance', name: '保障', description: '食品安全的监管与保证' }
  ];

  // 鼠标跟踪效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 元素进入视口时触发动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // 添加平滑滚动效果
  useEffect(() => {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLElement).getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // 为按钮添加波纹效果处理函数
    const handleButtonClick = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const button = buttonRef.current;
      const circle = button.querySelector('span:last-child') as HTMLElement;
      if (!circle) return;
      
      // 计算点击位置
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 设置波纹位置和大小
      circle.style.width = '0';
      circle.style.height = '0';
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      
      // 触发波纹动画
      setTimeout(() => {
        const diameter = Math.max(rect.width, rect.height);
        circle.style.width = `${diameter * 2}px`;
        circle.style.height = `${diameter * 2}px`;
        circle.style.left = `${x - diameter}px`;
        circle.style.top = `${y - diameter}px`;
        
        // 重置波纹
        setTimeout(() => {
          circle.style.width = '0';
          circle.style.height = '0';
        }, 600);
      }, 10);
    };

    // 绑定按钮点击事件
    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleButtonClick);
    }

    return () => {
      // 清理事件监听器
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleButtonClick);
      }
    };
  }, []);



  // 处理分类标签点击事件
  const handleCategoryClick = (category: { id: string, name: string }) => {
    setActiveCategory(category.id);
    // 这里可以添加更多的分类交互逻辑
    console.log('点击了分类:', category.name);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem', // 减小基础内边距以适应移动设备
      paddingTop: '3rem', // 顶部额外空间避免内容被状态栏遮挡
      paddingBottom: '3rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 基础背景 */}
      <div 
        className="fixed inset-0 z-[-3]"
        style={{
          background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 100%)',
          transition: 'background 0.5s ease'
        }}
      ></div>
      
      {/* 动态背景效果 */}
      <div 
        className="fixed inset-0 z-[-2]"
        style={{
          backgroundImage: 'url("/背景.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
          transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      ></div>
      
      {/* 深度渐变层 */}
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(2px)',
          transition: 'opacity 0.5s ease'
        }}
      ></div>
      
      {/* 装饰元素 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        transform: 'rotate(-15deg)',
        opacity: 0.7,
        zIndex: 1,
        animation: 'float 6s ease-in-out infinite'
      }}
      className="decoration-item">
        <img src="/leaf-decoration.svg" alt="装饰叶子" width="120" height="120" />
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        transform: 'rotate(10deg)',
        opacity: 0.6,
        zIndex: 1,
        animation: 'float 7s ease-in-out infinite reverse'
      }}
      className="decoration-item">
        <img src="/wave-decoration.svg" alt="装饰波浪" width="200" height="100" />
      </div>
      
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        opacity: 0.5,
        zIndex: 1,
        animation: 'float 8s ease-in-out infinite'
      }}
      className="decoration-item">
        <img src="/circles-decoration.svg" alt="装饰圆圈" width="150" height="150" />
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        transform: 'rotate(-5deg)',
        opacity: 0.6,
        zIndex: 1,
        animation: 'float 7.5s ease-in-out infinite reverse'
      }}
      className="decoration-item">
        <img src="/leaf-decoration.svg" alt="装饰叶子" width="100" height="100" />
      </div>
      
      {/* 背景装饰元素 */}
      <div className="fixed inset-0 z-[-2]" style={{ overflow: 'hidden' }}>
        <div 
          className="float"
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(5, 150, 105, 0.1)',
            filter: 'blur(50px)',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="float"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.1)',
            filter: 'blur(60px)',
            animationDelay: '0.5s'
          }}
        ></div>
      </div>



      {/* 主内容卡片 */}
      <div 
        style={{
          textAlign: 'center',
          maxWidth: '800px', // 扩大最大宽度
          width: '100%', // 确保卡片在小屏幕上占满宽度
          padding: '3rem', // 增加内边距以扩大卡片
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          // 增强阴影效果创造深度
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(5, 150, 105, 0.1)',
          border: '2px solid #059669',
          backdropFilter: 'blur(10px)',
          transform: `translateZ(0)`,
          // perspective: '1000px',  // 移除3D效果
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease',
          position: 'relative',
          // 响应式调整已在CSS文件中定义
        }} 
        className={`home-container fade-in-up`}
        id="main-card"
      >
        {/* 分类标签区域 */}
        <div 
          style={{
            marginBottom: '2rem',
            position: 'relative'
          }}
        >
          <div 
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '0 1rem'
            }}
          >
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                style={{
            animationDelay: `${index * 0.1}s`,
            opacity: isVisible['main-card'] ? '1' : '0',
            transform: isVisible['main-card'] ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
            width: 'clamp(70px, 18vw, 100px)', // 缩小尺寸
            height: 'clamp(70px, 18vw, 100px)', // 缩小尺寸
            backgroundColor: activeCategory === category.id ? '#047857' : '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: activeCategory === category.id 
              ? '0 8px 25px rgba(5, 150, 105, 0.5)' 
              : '0 2px 10px rgba(5, 150, 105, 0.3)',
            textAlign: 'center',
            padding: '5px',
            cursor: 'pointer',
            userSelect: 'none',
            position: 'relative',
            overflow: 'hidden',
            zIndex: activeCategory === category.id ? 2 : 1,
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            borderRadius: '50%'
          }}
                className={`category-icon ${activeCategory === category.id ? 'pulse' : ''}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.12) translateY(-5px)';
                  e.currentTarget.style.boxShadow = activeCategory === category.id 
                    ? '0 12px 30px rgba(5, 150, 105, 0.6)' 
                    : '0 10px 25px rgba(5, 150, 105, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = activeCategory === category.id 
                    ? '0 8px 25px rgba(5, 150, 105, 0.5)' 
                    : '0 2px 10px rgba(5, 150, 105, 0.3)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98) translateY(0)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.12) translateY(-5px)';
                }}
                onClick={() => handleCategoryClick(category)}
              >
                {/* 分类文字 */}
                <div 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#030712',
                    padding: '8px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }} 
                >
                  {/* 使用索引显示对应的四个字 */}
                  {['健康', '安全', '卫生', '合格'][index % 4]}
                </div>
                {/* 悬停时的涟漪效果 */}
                <div 
                  className="ripple"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'scale(0)',
                    borderRadius: '50%',
                    opacity: 0,
                    transition: 'transform 0.6s, opacity 0.6s'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 主标题 */}
        <h1 
          style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            opacity: isVisible['main-card'] ? '1' : '0',
            transform: isVisible['main-card'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s'
          }} 
          className="home-title gradient-text"
        >
          欢迎预览食品配料查询表
        </h1>
        
        {/* 副标题 */}
        <p 
          style={{
            fontSize: '1.1rem',
            color: '#1f2937',
            marginBottom: '2rem',
            lineHeight: 1.6,
            opacity: isVisible['main-card'] ? '1' : '0',
            transform: isVisible['main-card'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s'
          }}
        >
          了解食品成分，守护您和家人的健康
        </p>
        
        {/* 行动按钮 - 环境感知的跳转逻辑 */}
        <a 
          href={process.env.NODE_ENV === 'production' ? 'https://baiyibonbbb.tetn.xyz/ingredients' : '/ingredients'}
          target={process.env.NODE_ENV === 'production' ? '_blank' : '_self'}
          rel={process.env.NODE_ENV === 'production' ? 'noopener noreferrer' : undefined}
          ref={buttonRef}
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: '#059669',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '50px',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            opacity: isVisible['main-card'] ? '1' : '0',
            transform: isVisible['main-card'] ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)'
          }}
          className="ingredients-button"
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#047857';
            e.currentTarget.style.transform = 'translateZ(0) scale(1.03) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'translateZ(0) scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateZ(0) scale(0.98) translateY(0)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateZ(0) scale(1.03) translateY(-3px)';
          }}
          onClick={(e) => {
            // 添加点击波纹效果
            const circle = document.createElement('span');
            const diameter = Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (e.currentTarget.getBoundingClientRect().left + radius)}px`;
            circle.style.top = `${e.clientY - (e.currentTarget.getBoundingClientRect().top + radius)}px`;
            circle.classList.add('ripple');
            
            const ripple = e.currentTarget.getElementsByClassName('ripple')[0];
            if (ripple) {
              ripple.remove();
            }
            
            e.currentTarget.appendChild(circle);
          }}
        >
          <span>查看配料表小常识</span>
          {/* 按钮点击波纹效果 */}
          <span style={{
            position: 'absolute',
            width: '0',
            height: '0',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.6s, height 0.6s, opacity 0.6s',
            opacity: 0
          }}></span>
        </a>
      </div>
      
      {/* 页脚 */}
      <footer 
        style={{
          marginTop: '2rem',
          color: '#4b5563',
          fontSize: '0.9rem',
          opacity: 0,
          animation: 'fadeInUp 1s ease 1.5s forwards'
        }}
      >
        
      </footer>
    </div>
  );
}