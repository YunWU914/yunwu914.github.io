import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ArticleCard from '../components/ArticleCard';
import { AdBannerWide, AdSlot, AdSidebar } from '../components/AdBanner';
import { SidebarHotList, SidebarAuthors } from '../components/SidebarHot';
import { CATEGORIES } from '../lib/mockData';

// ============================================
// 1. 读取真实文章（递归 content/posts 所有子目录）
// ============================================
const postModules = import.meta.glob('/content/posts/**/*.md', { eager: true });

// ============================================
// 2. URL slug → frontmatter category 映射
// 根据你的导航栏URL和config.yml里的value对应
// ============================================
const CATEGORY_SLUG_MAP = {
  'tongyong': 'general-machinery',
  'jianzhu': 'construction-machinery',
  'qingxi': 'cleaning-ventilation',
  'jichuang': 'machine-tools',
  'wuliu': 'logistics',
  'shipin': 'food-machinery',
  'wujin': 'hardware',
  'jiagong': 'machining',
  'juzhuang': 'fixtures',
  'dianqi': 'electrical-automation',
  'yeya': 'hydraulic-pneumatic',
  'weixiu': 'maintenance',
  'sheji': 'design-drawing',
  'cailiao': 'heat-treatment',
};

// ============================================
// 3. 解析 frontmatter 辅助函数
// ============================================
function parseArticle(path, mod) {
  let frontmatter = {};
  let content = '';

  // 如果装了 vite-plugin-md 等插件，直接用解析好的数据
  if (mod?.attributes || mod?.frontmatter) {
    frontmatter = mod.attributes || mod.frontmatter;
    content = mod.html || mod.body || mod.default || '';
  } else {
    // 手动解析原始 markdown 字符串（兜底）
    const raw = typeof mod === 'string' ? mod : (mod.default || '');
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (match) {
      match[1].split('\n').forEach(line => {
        const sep = line.indexOf(':');
        if (sep > -1) {
          const key = line.slice(0, sep).trim();
          let value = line.slice(sep + 1).trim();
          // 去掉引号
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          // 简单数组解析
          if (value.startsWith('[') && value.endsWith(']')) {
            try { value = JSON.parse(value.replace(/'/g, '"')); } catch { }
          }
          frontmatter[key] = value;
        }
      });
      content = raw.replace(match[0], '').trim();
    } else {
      content = raw;
    }
  }

  return {
    id: path.split('/').pop().replace('.md', ''),
    title: frontmatter.title || '无标题',
    category: frontmatter.category || 'general-machinery',
    author: frontmatter.author || '匿名',
    date: frontmatter.date || '',
    summary: frontmatter.summary || '',
    content,
    views: frontmatter.views || 0,
    comment_count: frontmatter.comment_count || 0,
    is_featured: frontmatter.is_featured || false,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  };
}

// ============================================
// 4. 一次性解析所有真实文章
// ============================================
const allArticles = Object.entries(postModules).map(([path, mod]) => parseArticle(path, mod));

const FILTERS = ['全部', '最新发布', '最多阅读', '最多评论', '精华帖'];

export default function CategoryPage() {
  const { category } = useParams();
  const [filter, setFilter] = useState('全部');
  const [page, setPage] = useState(1);

  const cat = CATEGORIES[category] || { label: category, emoji: '📂', color: 'from-blue-700 to-blue-500', desc: '' };

  // ============================================
  // 5. 把 URL slug 转成 frontmatter 里的 category value
  // ============================================
  const targetCategory = CATEGORY_SLUG_MAP[category] || category;

  // ============================================
  // 6. 过滤当前分类的真实文章
  // ============================================
  let articles = allArticles.filter(a => a.category === targetCategory);

  if (filter === '最多阅读') articles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (filter === '最多评论') articles = [...articles].sort((a, b) => (b.comment_count || 0) - (a.comment_count || 0));
  else if (filter === '最新发布') articles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (filter === '精华帖') articles = articles.filter(a => a.is_featured);

  const PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const pageArticles = articles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeCategory={category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(30%,-30%)' }} />
            <div className="relative z-10">
              <span className="text-5xl mb-3 block">{cat.emoji}</span>
              <h1 className="text-white text-3xl font-extrabold mb-2">{cat.label}</h1>
              <p className="text-white/70 text-sm max-w-xl">{cat.desc}</p>
            </div>
          </div>
        </div>

        <AdBannerWide slot={1} />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="text-blue-600 hover:underline">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{cat.label}</span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-5">
          {FILTERS.map(f => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${filter === f ? 'bg-blue-700 text-white border-blue-700' : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            {/* Articles */}
            {pageArticles.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <span className="text-6xl block mb-4">🔍</span>
                <p className="text-lg font-medium">该分类暂无内容</p>
              </div>
            ) : (
              pageArticles.map(a => <ArticleCard key={a.id} article={a} />)
            )}

            <AdSlot slot={2} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground disabled:opacity-40 hover:bg-muted transition-all">
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${page === n ? 'bg-blue-700 text-white border-blue-700' : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}>
                    {n}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground disabled:opacity-40 hover:bg-muted transition-all">
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">📌 分类热门</h4>
              <SidebarHotList articles={articles} />
            </div>
            <AdSidebar slot={3} size="top" colorScheme="amber" label="侧边栏顶部广告" />
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">🏷️ 相关标签</h4>
              <div className="flex flex-wrap gap-2">
                {[...new Set(articles.flatMap(a => a.tags || []))].slice(0, 12).map(t => (
                  <Link key={t} to={`/search?q=${encodeURIComponent(t)}`}
                    className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs text-muted-foreground hover:bg-card hover:border-blue-300 transition-all cursor-pointer">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
            <AdSidebar slot={4} size="mid" colorScheme="blue" label="侧边栏中部广告" desc="替换活跃作者，展示品牌广告" />
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
