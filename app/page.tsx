'use client';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f9f0',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '3rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '2px solid #059669',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }} className="home-container">
        {/* 头部图片区域 - 优化版 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%'
          }}>
            {/* 背景图 - 添加懒加载和加载状态 */}
            <div style={{ position: 'relative', width: '100%', maxHeight: 'clamp(150px, 30vw, 200px)', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
              <img 
                src="/image/背景.png" 
                alt="食品配料背景" 
                loading="lazy"
                style={{ 
                  width: '100%', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease'
                }}
                onLoad={(e) => e.currentTarget.style.opacity = '1'}
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                  const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (sibling) {
                    sibling.style.display = 'flex';
                  }
                }}
              />
              {/* 加载占位符 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af'
              }}>
                图片加载中...
              </div>
            </div>
            
            {/* 分类图标 - 添加懒加载和更好的动画效果 - 响应式布局优化 */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '-30px',
              position: 'relative',
              zIndex: 1,
              padding: '0 1rem' // 响应式内边距
            }}>
              {[
                { name: '甜味剂', img: '/image/甜味剂.png' },
                { name: '调味剂', img: '/image/调味剂.png' },
                { name: '色素', img: '/image/色素.png' },
                { name: '防腐剂', img: '/image/防腐剂.png' },
                { name: '乳化剂', img: '/image/乳化剂.png' }
              ].map((category, index) => (
                <div key={category.name} style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: '0',
                  animation: 'fadeInUp 0.5s ease forwards'
                }}>
                  <img 
                    src={category.img} 
                    alt={category.name} 
                    loading="lazy"
                    style={{ 
                      width: 'clamp(60px, 15vw, 80px)', 
                      height: 'clamp(60px, 15vw, 80px)', 
                      objectFit: 'contain', 
                      backgroundColor: 'white', 
                      borderRadius: '50%', 
                      padding: '5px', 
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      opacity: '0.9'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onLoad={(e) => e.currentTarget.style.opacity = '0.9'}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentNode;
                      const fallback = document.createElement('div');
                      fallback.textContent = category.name[0];
                      fallback.style.cssText = `
                        width: 60px;
                        height: 60px;
                        backgroundColor: #059669;
                        borderRadius: 50%;
                        display: flex;
                        alignItems: center;
                        justifyContent: center;
                        color: white;
                        fontSize: 1.2rem;
                        fontWeight: bold;
                        boxShadow: 0 2px 4px rgba(0,0,0,0.1);
                      `;
                      if (parent) {
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#047857',
          marginBottom: '1.5rem',
          lineHeight: 1.2
        }} className="home-title">
          欢迎使用食品配料表查询工具
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#1f2937',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          了解食品成分，守护您和家人的健康
        </p>
        
        <a 
          href="/ingredients" 
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: '#059669',
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            border: '2px solid #059669'
          }}
          className="ingredients-button"
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#059669';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.color = 'white';
          }}
        >
          查看配料表小常识
        </a>
      </div>
      
      <footer style={{
        marginTop: '2rem',
        color: '#4b5563',
        fontSize: '0.9rem'
      }}>
        © 2024 食品配料查询工具
      </footer>
    </div>
  );
}