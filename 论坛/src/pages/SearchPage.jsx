import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ArticleCard from '../components/ArticleCard';
import { AdBannerWide, AdSlot, AdSidebar } from '../components/AdBanner';
import { MOCK_ARTICLES, CATEGORIES, HOT_SEARCHES } from '../lib/mockData';

export default function SearchPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const keyword = params.get('q') || '';

  const [searchQ, setSearchQ] = useState(keyword);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const kw = keyword.toLowerCase().trim();
    if (!kw) { setResults([]); return; }
    const found = MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      (a.summary || '').toLowerCase().includes(kw) ||
      (a.content || '').toLowerCase().includes(kw) ||
      (a.author || '').toLowerCase().includes(kw) ||
      (a.tags || []).some(t => t.toLowerCase().includes(kw)) ||
      (CATEGORIES[a.category]?.label || '').includes(kw)
    );
    setResults(found);
    setSearchQ(keyword);
  }, [keyword]);

  const handleSearch = (q) => {
    const kw = q !== undefined ? q : searchQ;
    if (kw.trim()) navigate(`/search?q=${encodeURIComponent(kw.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Search header */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="text-blue-600 hover:underline">首页</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>搜索结果</span>
          </div>
          <h2 className="text-xl font-bold mb-1.5">
            {keyword ? (
              <>找到 <span className="text-blue-700">{results.length}</span> 篇与「<span className="text-red-600 font-extrabold">{keyword}</span>」相关的文章</>
            ) : '搜索站内文章'}
          </h2>
          {keyword && <p className="text-sm text-muted-foreground">搜索范围：文章标题、内容、标签、作者、分类</p>}

          {/* Search bar in results */}
          <div className="relative mt-4 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="重新搜索..."
              className="w-full pl-11 pr-28 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-blue-400 text-sm transition-colors"
            />
            <button onClick={() => handleSearch()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all"
              style={{ background: '#1e40af' }}>
              搜索
            </button>
          </div>
        </div>

        <AdBannerWide slot={1} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            {!keyword ? (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium mb-2">请输入搜索关键词</p>
                <p className="text-sm">支持搜索文章标题、内容、标签、作者名等</p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {HOT_SEARCHES.map(t => (
                    <button key={t} onClick={() => handleSearch(t)}
                      className="px-4 py-2 rounded-lg border border-border bg-card text-sm hover:bg-muted transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2">未找到相关结果</h3>
                <p className="text-sm mb-6">换个关键词试试？</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {HOT_SEARCHES.map(t => (
                    <button key={t} onClick={() => handleSearch(t)}
                      className="px-4 py-2 rounded-lg border border-border bg-card text-sm hover:bg-muted transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {results.map(a => <ArticleCard key={a.id} article={a} />)}
              </>
            )}

            <AdSlot slot={2} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <AdSidebar slot={3} />
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">🔥 热门搜索</h4>
              <div className="space-y-2">
                {HOT_SEARCHES.map((t, i) => (
                  <button key={t} onClick={() => handleSearch(t)}
                    className="flex items-center gap-2.5 w-full hover:bg-muted p-2 rounded-lg transition-all text-left group">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-slate-100 text-slate-500' : i === 2 ? 'bg-red-50 text-red-600' : 'bg-muted text-muted-foreground'
                    }`}>{i + 1}</span>
                    <span className="text-sm text-foreground group-hover:text-blue-700 transition-colors">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">📂 浏览分类</h4>
              <div className="space-y-1.5">
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-all group">
                    <span className="text-sm group-hover:text-blue-700 transition-colors">{cat.emoji} {cat.label}</span>
                    <span className="text-xs text-muted-foreground">{cat.count.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-3 pb-2.5 border-b-2 border-blue-600 inline-block">⚡ 快速入口</h4>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => navigate('/')} className="p-3 bg-background rounded-xl border border-border text-center hover:bg-card hover:border-blue-200 transition-all">
                  <span className="text-xl block mb-1">🏠</span><span className="text-xs font-semibold">返回首页</span>
                </button>
                {['📤 发布投稿','❓ 提问求助','📥 资料下载'].map(q => (
                  <button key={q} className="p-3 bg-background rounded-xl border border-border text-center hover:bg-card hover:border-blue-200 transition-all">
                    <span className="text-xl block mb-1">{q.split(' ')[0]}</span>
                    <span className="text-xs font-semibold">{q.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}