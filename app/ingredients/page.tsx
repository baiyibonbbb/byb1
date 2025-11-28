'use client';

import React, { useState } from 'react';

export default function IngredientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  // 移除未使用的状态变量 isMobileMenuOpen
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategoryInfo, setShowCategoryInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  // 移除图片路径函数，不再使用图片
  
  // 增强的配料数据模型
  interface Ingredient {
    id: string;
    name: string;
    category: string;
    description: string;
    safetyLevel: 'safe' | 'moderate' | 'avoid';
    notes?: string;
    alternativeNames?: string[];
    commonUses?: string[];
    healthImpact?: string;
    natural?: boolean;
    origin?: string;
  }
  
  // 扩展的配料数据
  const ingredientsData: Ingredient[] = [
    {
      id: '1',
      name: '阿斯巴甜',
      category: '甜味剂',
      description: '人工合成甜味剂，甜度约为蔗糖的200倍，但热量极低',
      safetyLevel: 'moderate',
      alternativeNames: ['APM', 'NutraSweet', 'Canderel'],
      commonUses: ['饮料', '无糖食品', '口香糖', '乳制品'],
      healthImpact: '国际癌症研究机构(IARC)将其列为可能致癌物质(2B类)，但尚未有确凿证据表明日常摄入量会导致癌症。部分人群可能对其敏感，出现头痛、头晕等症状。',
      natural: false,
      origin: '1965年由James Schlatter在开发溃疡药物时意外发现',
      notes: '对苯丙酮尿症患者禁用，因其中含有的苯丙氨酸可能导致健康问题'
    },
    {
      id: '2', 
      name: '谷氨酸钠',
      category: '调味剂',
      description: '味精的主要成分，由谷氨酸与钠结合而成，天然存在于许多食物中',
      safetyLevel: 'safe',
      alternativeNames: ['MSG', 'E621', '味之素'],
      commonUses: ['方便面', '罐头食品', '速冻食品', '餐厅调味料'],
      healthImpact: '联合国粮农组织和世界卫生组织联合食品添加剂专家委员会(JECFA)认为，适量使用对普通人安全。高温(>120°C)可能产生焦谷氨酸钠，但不会致癌。',
      natural: true,
      origin: '天然存在于发酵食品如大豆酱、奶酪中，1908年由池田菊苗首次提取',
      notes: '少数人可能对其敏感，出现所谓的「中国餐馆症候群」症状'
    },
    {
      id: '3',
      name: '氢化植物油',
      category: '油脂',
      description: '通过加氢工艺处理的植物油，增加稳定性和固体状态',
      safetyLevel: 'avoid',
      alternativeNames: ['植物奶油', '人造黄油', '起酥油'],
      commonUses: ['烘焙食品', '薯片', '饼干', '油炸食品'],
      healthImpact: '含有反式脂肪酸，长期摄入会增加心血管疾病风险，提高低密度脂蛋白(坏胆固醇)，降低高密度脂蛋白(好胆固醇)',
      natural: false,
      origin: '1902年由Wilhelm Normann发明，20世纪中期广泛应用',
      notes: '许多国家已限制或禁止在食品中使用部分氢化油脂'
    },
    {
      id: '4',
      name: '山梨酸钾',
      category: '防腐剂',
      description: '由山梨酸与钾结合而成的防腐剂，抑制微生物生长',
      safetyLevel: 'moderate',
      alternativeNames: ['2,4-己二烯酸钾', 'E202'],
      commonUses: ['饮料', '果汁', '果酱', '乳制品', '烘焙食品'],
      healthImpact: '在规定用量内使用对健康影响较小。过量可能刺激肠胃，影响肠道菌群平衡。',
      natural: false,
      origin: '合成防腐剂，但山梨酸天然存在于一些水果中',
      notes: '相比苯甲酸钠，安全性较高，是常见的替代选择'
    },
    {
      id: '5',
      name: '聚山梨酯80',
      category: '乳化剂',
      description: '聚氧乙烯脱水山梨醇单油酸酯，常用食品和药品乳化剂',
      safetyLevel: 'moderate',
      alternativeNames: ['吐温80', 'E433'],
      commonUses: ['冰淇淋', '巧克力', '乳制品', '药物制剂'],
      healthImpact: '食品级使用通常安全，但大量摄入可能引起胃肠道不适。有少量过敏反应报告。',
      natural: false,
      origin: '人工合成化合物',
      notes: '欧盟允许使用，使用时需重点关注过敏风险、用法用量合规标注要求'
    },
    {
      id: '6',
      name: '亚硝酸盐',
      category: '防腐剂',
      description: '常用肉类防腐剂和发色剂，防止肉毒杆菌生长',
      safetyLevel: 'avoid',
      alternativeNames: ['亚硝酸钠', 'E250', '发色剂'],
      commonUses: ['火腿', '香肠', '培根', '午餐肉'],
      healthImpact: '过量摄入可能与胃癌和食道癌风险增加有关。在胃中可能与胺类物质反应生成亚硝胺，部分亚硝胺具有致癌性。',
      natural: false,
      origin: '人工合成，但某些蔬菜自然含有少量亚硝酸盐',
      notes: '维生素C可减少亚硝胺的形成，许多加工肉类已添加维生素C'
    },
    {
      id: '7',
      name: '赤藓糖醇',
      category: '甜味剂',
      description: '天然存在的多元醇类甜味剂，甜度约为蔗糖的60-70%',
      safetyLevel: 'safe',
      alternativeNames: ['E968', '赤藻糖醇'],
      commonUses: ['无糖饮料', '口香糖', '巧克力', '烘焙食品'],
      healthImpact: '几乎不被人体吸收，热量极低，不影响血糖和胰岛素水平，适合糖尿病患者和减肥人群。过量可能引起轻度胃肠不适。',
      natural: true,
      origin: '天然存在于水果、蔬菜和发酵食品中',
      notes: '腹泻阈值高于多数同类糖醇，使用时需关注用量控制、适用人群及合规要求'
    },
    {
      id: '8',
      name: '高果糖玉米糖浆',
      category: '甜味剂',
      description: '由玉米淀粉水解和异构化制成的甜味剂，含果糖和葡萄糖',
      safetyLevel: 'avoid',
      alternativeNames: ['玉米糖浆', 'HFCS', '果葡糖浆'],
      commonUses: ['碳酸饮料', '果汁', '糖果', '烘焙食品', '调味品'],
      healthImpact: '过量摄入与肥胖、2型糖尿病、非酒精性脂肪肝和心血管疾病风险增加有关。可能干扰瘦素信号，导致过度进食。',
      natural: false,
      origin: '1957年首次生产，1970年代开始广泛使用',
      notes: '美国膳食指南建议限制添加糖摄入，包括高果糖玉米糖浆'
    },
    {
      id: '9',
      name: '苯甲酸钠',
      category: '防腐剂',
      description: '苯甲酸的钠盐，广谱防腐剂，抑制细菌和真菌生长',
      safetyLevel: 'moderate',
      alternativeNames: ['安息香酸钠', 'E211'],
      commonUses: ['碳酸饮料', '果汁', '酱油', '咸菜', '蜜饯'],
      healthImpact: '在酸性条件下可能与维生素C反应生成苯，苯是潜在致癌物质。但在常规使用量下，风险极低。',
      natural: false,
      origin: '苯甲酸天然存在于一些水果中，如蔓越莓和梅干',
      notes: '儿童和孕妇应谨慎摄入含有苯甲酸钠的产品'
    },
    {
      id: '10',
      name: '卵磷脂',
      category: '乳化剂',
      description: '是一种天然磷脂混合物，其主要成分为磷脂酰胆碱',
      safetyLevel: 'safe',
      alternativeNames: ['大豆卵磷脂', 'E322'],
      commonUses: ['巧克力', '冰淇淋', '人造黄油', '烘焙食品'],
      healthImpact: '安全性高，被认为是营养补充剂。含有胆碱，对大脑发育和功能有益。',
      natural: true,
      origin: '主要从大豆或蛋黄中提取',
      notes: '素食主义者可能更倾向于使用大豆来源的卵磷脂'
    },
    {
      id: '11',
      name: '焦糖色素',
      category: '色素',
      description: '通过加热糖类物质并经美拉德反应、焦糖化反应生成的棕色天然色素',
      safetyLevel: 'moderate',
      alternativeNames: ['焦糖色', 'E150'],
      commonUses: ['可乐', '酱油', '糖果', '烘焙食品'],
      healthImpact: '类别4焦糖色(氨法焦糖)可能含有4-甲基咪唑(4-MEI)，动物实验表明高剂量可能致癌，但食品中含量极低。',
      natural: true,
      origin: '人类使用焦糖着色已有数百年历史',
      notes: '美国FDA规定焦糖色中4-MEI含量不得超过250ppm'
    },
    {
      id: '12',
      name: '二氧化钛',
      category: '色素',
      description: '白色无机颜料，核心作用是为产品提供高不透明性和白度',
      safetyLevel: 'avoid',
      alternativeNames: ['钛白粉', 'E171'],
      commonUses: ['糖果', '口香糖', '美白牙膏', '防晒霜'],
      healthImpact: '欧盟已禁止食品中使用，因纳米级二氧化钛可能穿透肠道屏障并在体内累积，存在潜在毒性。',
      natural: false,
      origin: '从钛铁矿中提取',
      notes: '2022年欧盟已全面禁止在食品中使用E171'
    }
  ];
  
  // 获取所有分类
  const categories = ['all', ...new Set(ingredientsData.map(item => item.category))];
  
  // 增强的搜索功能
  const filteredIngredients = ingredientsData.filter(ingredient => {
    const searchLower = searchTerm.toLowerCase();
    
    // 搜索匹配逻辑
    const matchesName = ingredient.name.toLowerCase().includes(searchLower);
    const matchesDescription = ingredient.description.toLowerCase().includes(searchLower);
    const matchesCategory = ingredient.category.toLowerCase().includes(searchLower);
    const matchesAlternativeNames = ingredient.alternativeNames?.some(name => 
      name.toLowerCase().includes(searchLower)
    ) || false;
    const matchesNotes = ingredient.notes?.toLowerCase().includes(searchLower) || false;
    
    // 分类筛选
    const matchesCategoryFilter = selectedCategory === 'all' || ingredient.category === selectedCategory;
    
    return (matchesName || matchesDescription || matchesCategory || 
            matchesAlternativeNames || matchesNotes) && matchesCategoryFilter;
  });
  
  // 获取安全等级样式
  const getSafetyLevelStyle = (level: string) => {
    switch(level) {
      case 'safe':
        return { backgroundColor: '#10b981', color: 'white' };
      case 'moderate':
        return { backgroundColor: '#f59e0b', color: 'white' };
      case 'avoid':
        return { backgroundColor: '#ef4444', color: 'white' };
      default:
        return {};
    }
  };
  
  // 获取安全等级文本
  const getSafetyLevelText = (level: string) => {
    switch(level) {
      case 'safe':
        return '安全';
      case 'moderate':
        return '谨慎';
      case 'avoid':
        return '避免';
      default:
        return '';
    }
  };
  
  // 高亮搜索文本
  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return <span>{text}</span>;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? 
            <span key={index} className="highlight-text">
              {part}
            </span> : 
            part
        )}
      </>
    );
  };
  
  // 显示配料详情
  const showIngredientDetails = (id: string) => {
    setIsLoading(true);
    // 添加短暂延迟以显示加载效果
    setTimeout(() => {
      setSelectedIngredient(id);
      setIsLoading(false);
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };
  
  // 获取选中的配料
  const currentIngredient = selectedIngredient ? 
    ingredientsData.find(item => item.id === selectedIngredient) : null;
  
  // 返回配料列表
  const goBackToList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedIngredient(null);
      setIsLoading(false);
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div 
        style={{
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          paddingBottom: '3rem',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }} 
        className="page-container">
      {/* 页面标题区域 */}
      <div style={{
        backgroundColor: '#059669',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* 返回首页按钮 */}
        <button
          onClick={() => window.location.href = '/'}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '2rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'background-color 0.2s ease, transform 0.1s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          返回首页
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }} className="page-title fade-in">
          食品配料表小常识
        </h1>
        <p style={{
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto',
          opacity: 1
        }}>
          了解常见食品配料，做出更健康的饮食选择
        </p>
      </div>
      
      {/* 主要内容区域 */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }} className="content-wrapper">
        {/* 加载状态指示器 */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '5px solid #f3f4f6',
              borderTop: '5px solid #059669',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}
        
        {/* 返回按钮 - 仅在详情页面显示 */}
        {currentIngredient && (
          <button
            onClick={goBackToList}
            style={{
              marginBottom: '2rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s, transform 0.1s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#047857';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ← 返回配料列表
          </button>
        )}
        
        {/* 添加基础动画样式和响应式设计 */}
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          
          /* 响应式设计 */
          @media (max-width: 768px) {
            /* 移动设备上的网格布局 */
            .ingredients-grid {
              grid-template-columns: 1fr;
            }
            
            /* 显示移动设备提示 */
            .mobile-only {
              display: block !important;
            }
            
            /* 调整标题大小 */
            .page-title {
              font-size: 2rem !important;
            }
            
            /* 调整内容区域内边距 */
            .content-wrapper {
              padding: 1rem !important;
            }
            
            /* 调整详情页面元素 */
            .ingredient-detail h2 {
              font-size: 1.75rem !important;
            }
          }
          
          @media (max-width: 480px) {
            /* 小屏幕设备优化 */
            .page-title {
              font-size: 1.75rem !important;
            }
            
            .search-filter-container {
              flex-direction: column;
            }
            
            .search-filter-container > div {
              flex: 1 1 100% !important;
            }
          }
        `}</style>
        
        {!currentIngredient ? (
          // 配料列表视图
          <>
            {/* 搜索和筛选区域 */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }} className="search-filter-container">
              {/* 分类图片选择区域 - 优化版 */}
              <div style={{
                  marginBottom: '1.5rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '0 1rem', // 响应式内边距
                  justifyContent: 'center' // 居中对齐
                }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#064e3b', width: '100%', marginBottom: '1rem' }}>
                  按分类浏览：
                </h3>
                {categories.filter(cat => cat !== 'all').map((category, index) => {
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1.25rem',
                        border: selectedCategory === category ? '2px solid #059669' : '2px solid #d1d5db',
                        borderRadius: '0.5rem',
                        backgroundColor: selectedCategory === category ? '#f0fdf4' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        minWidth: '120px',
                        opacity: '0',
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeIn 0.3s ease forwards',
                        minHeight: '150px',
                        justifyContent: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.borderColor = '#059669';
                          e.currentTarget.style.backgroundColor = '#f0fdf4';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 6px rgba(5, 150, 105, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCategory !== category) {
                          e.currentTarget.style.borderColor = '#d1d5db';
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                        }
                      }}
                    >
                      {/* 分类图标 - 使用SVG图片 */}
                      <img 
                        src={`/image/${category}.svg`} 
                        alt={category} 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          borderRadius: '0.375rem',
                          objectFit: 'contain',
                          padding: '8px'
                        }} 
                      />
                      
                      <span style={{ fontSize: '1rem', color: '#1f2937', fontWeight: 600, textAlign: 'center' }}>
                        {category}
                      </span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem',
                    border: selectedCategory === 'all' ? '2px solid #059669' : '2px solid #d1d5db',
                    borderRadius: '0.5rem',
                    backgroundColor: selectedCategory === 'all' ? '#f0fdf4' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minWidth: '120px',
                    opacity: '0',
                    animation: 'fadeIn 0.3s ease forwards',
                    minHeight: '150px',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(5, 150, 105, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    }
                  }}
                >
                  {/* 分类图标 - 使用SVG图片 */}
                    <img 
                      src="/image/全部.svg" 
                      alt="全部" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '0.375rem',
                        objectFit: 'contain',
                        padding: '8px'
                      }} 
                    />
                  
                  <span style={{ fontSize: '1rem', color: '#1f2937', fontWeight: 600, textAlign: 'center' }}>
                    全部
                  </span>
                </button>
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '1 1 300px' }}>
                  <input
                    type="text"
                    placeholder="搜索配料名称、描述、别名..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                      }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#059669';
                        e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                      }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      if (!target.matches(':focus')) {
                        target.style.borderColor = '#94a3b8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      if (!target.matches(':focus')) {
                        target.style.borderColor = '#d1d5db';
                      }
                    }}
                  />
                </div>
                
                <div style={{ flex: '0 0 auto' }}>
                  <select
                    aria-label="选择配料分类"
                    title="选择配料分类"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: '0.75rem 2rem 0.75rem 1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      outline: 'none',
                      color: 'black',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"%234b5563\"%3E%3Cpath stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '16px 16px',
                      minWidth: '180px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.matches(':focus')) {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#047857';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="all">所有分类</option>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 搜索结果统计 */}
              {searchTerm && (
                <p style={{
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: '#4b5563'
                }}>
                  找到 {filteredIngredients.length} 个匹配的配料
                </p>
              )}
            </div>
            
            {/* 配料列表区域 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }} className="ingredients-grid">
              {filteredIngredients.length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem'
                }}>
                  <p style={{ fontSize: '1.1rem' }}>未找到匹配的配料信息</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>请尝试其他搜索词或清除筛选条件</p>
                </div>
              ) : (
                filteredIngredients.map(ingredient => (
                  <div 
                    key={ingredient.id}
                    onClick={() => showIngredientDetails(ingredient.id)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#030712'
                        }}>
                          {highlightSearchTerm(ingredient.name)}
                        </h3>
                        <span 
                          style={{
                            ...getSafetyLevelStyle(ingredient.safetyLevel),
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.875rem',
                            fontWeight: 500
                          }}
                        >
                          {getSafetyLevelText(ingredient.safetyLevel)}
                        </span>
                      </div>
                      
                      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#10b981',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {ingredient.category.charAt(0)}
                        </div>
                        <span style={{
                          backgroundColor: '#e5e7eb',
                          color: '#1f2937',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>
                          {highlightSearchTerm(ingredient.category)}
                        </span>
                      </div>
                      
                      <p style={{
                        color: '#1f2937',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        textAlign: 'center'
                      }}>
                        {highlightSearchTerm(ingredient.description)}
                      </p>
                      
                      {ingredient.notes && (
                        <div style={{
                          backgroundColor: '#f8fafc',
                          padding: '0.75rem',
                          borderRadius: '0.375rem',
                          borderLeft: '4px solid #059669'
                        }}>
                          <p style={{
                            color: '#4b5563',
                            fontSize: '0.9rem',
                            lineHeight: 1.5,
                            textAlign: 'center'
                          }}>
                            <strong>注意：</strong>{highlightSearchTerm(ingredient.notes)}
                          </p>
                        </div>
                      )}
                      
                      {/* 查看详情提示 */}
                      <div style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        paddingLeft: '0.5rem',
                        paddingRight: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          color: '#059669',
                          fontWeight: 500,
                          textTransform: 'none',
                          letterSpacing: 'normal',
                          textAlign: 'center',
                          display: 'inline-block'
                        }}>
                          查看详情 →
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* 响应式设计提示 - 仅在小屏幕显示 */}
            <div style={{ display: 'none' }} className="mobile-only">
              <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '2rem' }}>
                提示：点击配料卡片可查看详细信息
              </p>
            </div>
            
            {/* 分类说明和安全等级说明 */}
            <div style={{
              marginTop: '3rem',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              {/* 配料分类说明切换按钮 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  配料分类说明
                </h3>
                <button
                  onClick={() => setShowCategoryInfo(!showCategoryInfo)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#047857';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                >
                  {showCategoryInfo ? '隐藏详情' : '查看详情'}
                </button>
              </div>
              
              {/* 分类说明详情 */}
              {showCategoryInfo && (
                <div style={{
                  marginBottom: '2rem',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.375rem'
                }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>甜味剂</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      甜味剂是替代蔗糖等传统糖类的食品添加剂，可分为天然甜味剂和人工合成甜味剂。
                      天然甜味剂如赤藓糖醇通常安全性较高，而人工合成甜味剂如阿斯巴甜应谨慎使用，特别是对某些敏感人群。
                      过量摄入甜味剂可能影响肠道微生物平衡，建议适量食用。
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>防腐剂</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      防腐剂用于延长食品保质期，抑制微生物生长。常见的防腐剂包括山梨酸钾、苯甲酸钠和亚硝酸盐等。
                      虽然在规定用量内使用通常安全，但某些防腐剂如亚硝酸盐可能与癌症风险相关，建议优先选择天然防腐方法保存的食品。
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>乳化剂</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      乳化剂帮助混合不相溶的成分，如油脂和水。天然乳化剂如卵磷脂安全性高，而人工合成的乳化剂如聚山梨酯80应适量使用。
                      长期大量摄入某些乳化剂可能影响肠道屏障功能，建议选择含天然乳化剂的食品。
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>油脂</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      食品加工中常用的油脂包括天然油脂和氢化植物油等。氢化植物油含有反式脂肪酸，应尽量避免。
                      选择食品时，应优先选择使用橄榄油、亚麻籽油等健康油脂的产品，减少饱和脂肪和反式脂肪的摄入。
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>色素</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      色素用于改善食品的外观和色泽。天然色素如焦糖色相对安全，而某些人工合成色素如二氧化钛可能存在健康风险。
                      建议选择使用天然色素或无人工色素的食品，特别是对儿童食品更应谨慎。
                    </p>
                  </div>
                  
                  <div>
                    <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>调味剂</h4>
                    <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      调味剂用于增强食品的味道，如谷氨酸钠（味精）。大多数调味剂在正常使用量下安全，但少数人可能对其敏感。
                      建议适量使用调味剂，培养对天然食物原味的适应，减少对人工调味的依赖。
                    </p>
                  </div>
                </div>
              )}
            
              {/* 配料解析指南 */}
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#ecfdf5',
                borderRadius: '0.375rem',
                border: '1px solid #d1fae5'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#065f46' }}>配料表阅读技巧</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#065f46', lineHeight: 1.8 }}>
                  <li style={{ marginBottom: '0.5rem' }}>配料表按含量从高到低排序，排在前面的成分含量最高</li>
                  <li style={{ marginBottom: '0.5rem' }}>注意识别同一成分的不同名称（如糖的多种形式）</li>
                  <li style={{ marginBottom: '0.5rem' }}>尽量选择配料表简短、成分熟悉的食品</li>
                  <li style={{ marginBottom: '0.5rem' }}>关注食品添加剂的种类和数量，优先选择添加最少的产品</li>
                  <li style={{ marginBottom: '0.5rem' }}>对于有特殊健康需求的人群，应特别关注过敏原和特定成分</li>
                </ul>
              </div>
            
              {/* 安全等级说明 */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#000000',
                marginTop: '2rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                安全等级说明
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', width: '100%', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: '#d1fae5',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    marginRight: '0.5rem'
                  }}></span>
                  <span style={{ color: '#000000' }}><strong>安全：</strong>正常使用对健康无害</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: '#fef3c7',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    marginRight: '0.5rem'
                  }}></span>
                  <span style={{ color: '#000000' }}><strong>谨慎：</strong>适量使用一般安全</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: '#fee2e2',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '50%',
                    marginRight: '0.5rem'
                  }}></span>
                  <span style={{ color: '#000000' }}><strong>避免：</strong>尽量避免或减少摄入</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // 配料详情视图
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }} className="ingredient-detail fade-in">
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#030712'
                }} className="page-title">
                  {currentIngredient.name}
                </h2>
                <span 
                  style={{
                    ...getSafetyLevelStyle(currentIngredient.safetyLevel),
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  {getSafetyLevelText(currentIngredient.safetyLevel)}
                </span>
              </div>
              
              {/* 配料标识区域 - 已移除首字显示效果 */}
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    描述
                  </h3>
                  <p style={{
                    color: '#1f2937',
                    lineHeight: 1.8,
                    fontSize: '1.05rem'
                  }}>
                    {currentIngredient.description}
                  </p>
                </div>
                
                {currentIngredient.healthImpact && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      健康影响
                    </h3>
                    <p style={{
                      color: '#1f2937',
                      lineHeight: 1.8
                    }}>
                      {currentIngredient.healthImpact}
                    </p>
                  </div>
                )}
                
                {currentIngredient.alternativeNames && currentIngredient.alternativeNames.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      别名/代码
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {currentIngredient.alternativeNames.map((name, index) => (
                        <span key={index} style={{
                          backgroundColor: '#e5e7eb',
                          color: '#1f2937',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentIngredient.commonUses && currentIngredient.commonUses.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      常见用途
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {currentIngredient.commonUses.map((use, index) => (
                        <span key={index} style={{
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.9rem',
                          border: '1px solid #d1fae5'
                        }}>
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      天然/人工
                    </h3>
                    <p style={{
                      color: '#4b5563'
                    }}>
                      {currentIngredient.natural ? '天然存在' : '人工合成'}
                    </p>
                  </div>
                  
                  {currentIngredient.origin && (
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        来源/发现
                      </h3>
                      <p style={{
                        color: '#4b5563'
                      }}>
                        {currentIngredient.origin}
                      </p>
                    </div>
                  )}
                </div>
                
                {currentIngredient.notes && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '0.375rem',
                    borderLeft: '4px solid #d97706'
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#92400e',
                      marginBottom: '0.5rem'
                    }}>
                      重要提示
                    </h3>
                    <p style={{
                      color: '#78350f',
                      lineHeight: 1.6
                    }}>
                      {currentIngredient.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 页脚 */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          免责声明：本页面信息仅供参考，不构成医疗建议。具体食品选择请结合个人体质和医生建议。
        </p>
        <p className="footer-text">
          © {new Date().getFullYear()} 食品配料常识 - 健康饮食从了解配料开始
        </p>
      </footer>
    </div>
  );
}