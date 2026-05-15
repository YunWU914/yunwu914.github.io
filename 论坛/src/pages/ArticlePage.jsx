import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, Heart, Share2, Bookmark, Printer, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { AdBannerWide, AdSlot, AdSidebar } from '../components/AdBanner';
import { MOCK_ARTICLES, CATEGORIES } from '../lib/mockData';

export default function ArticlePage() {
  const { id } = useParams();

  const mockArticle = MOCK_ARTICLES.find(a => a.id === id) || MOCK_ARTICLES[0];
  const cat = CATEGORIES[mockArticle.category] || {};

  const [views, setViews] = useState(mockArticle.views || 0);
  const [likes, setLikes] = useState(mockArticle.likes || 0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const likedKey = `liked_${id}`;
    if (localStorage.getItem(likedKey)) setLiked(true);
    setViews((mockArticle.views || 0) + 1);
  }, [id]);

  const toggleLike = () => {
    const likedKey = `liked_${id}`;
    const nowLiked = !liked;
    setLiked(nowLiked);
    const newLikes = nowLiked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    if (nowLiked) localStorage.setItem(likedKey, '1');
    else localStorage.removeItem(likedKey);
  };

  const article = mockArticle;
  const relatedArticles = MOCK_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeCategory={article.category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
          <Link to="/" className="text-blue-600 hover:underline">首页</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/category/${article.category}`} className="text-blue-600 hover:underline">{cat.label}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="line-clamp-1">文章详情</span>
        </div>

        {/* Article Hero */}
        <div className="rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(30%,-30%)' }} />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold text-white mb-4"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
                {cat.emoji} {cat.label}
              </span>
              <h1 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-5">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white' }}>
                    {article.author_initial || article.author?.[0]}
                  </div>
                  <span className="text-white/85 font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{views.toLocaleString()} 阅读</span>
                  <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" />{likes} 点赞</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdBannerWide slot={1} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            {/* Article Body */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <div className="prose prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-xl prose-h2:border-b-2 prose-h2:border-blue-600 prose-h2:pb-2 prose-h2:inline-block
                prose-h3:text-base prose-h3:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-code:bg-muted prose-code:text-red-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:text-muted-foreground
                prose-strong:text-foreground
                prose-table:text-sm
                prose-th:bg-muted prose-th:font-semibold
              ">
                <ReactMarkdown>{article.content || article.summary || '暂无内容'}</ReactMarkdown>
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {article.tags.map(t => (
                    <Link key={t} to={`/search?q=${encodeURIComponent(t)}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${cat.tagClass || 'bg-blue-50 text-blue-700'} hover:opacity-80 transition-opacity`}>
                      #{t}
                    </Link>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                <button onClick={toggleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all ${liked ? 'bg-red-500 text-white border-red-500' : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}>
                  <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
                  {liked ? '已点赞' : '点赞'} ({likes})
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-muted-foreground text-sm font-semibold hover:bg-muted transition-all">
                  <Share2 className="w-4 h-4" />分享
                </button>
                <button onClick={() => setBookmarked(v => !v)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all ${bookmarked ? 'bg-blue-700 text-white border-blue-700' : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}>
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />收藏
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-muted-foreground text-sm font-semibold hover:bg-muted transition-all">
                  <Printer className="w-4 h-4" />打印
                </button>
              </div>
            </div>

            <AdSlot slot={2} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <AdSidebar slot={3} size="top" colorScheme="violet" label="侧边栏顶部广告" />

            {/* Related */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">📌 相关文章</h4>
              <div className="space-y-3">
                {relatedArticles.map((a, i) => (
                  <Link key={a.id} to={`/article/${a.id}`} className="flex gap-2 group cursor-pointer hover:bg-muted p-2 rounded-lg transition-all">
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${i < 3 ? ['bg-yellow-100 text-yellow-700','bg-slate-100 text-slate-500','bg-red-50 text-red-600'][i] : 'bg-muted text-muted-foreground'}`}>{i+1}</span>
                    <span className="text-sm text-foreground group-hover:text-blue-700 line-clamp-2 transition-colors leading-snug">{a.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Article tags */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">🏷️ 文章标签</h4>
              <div className="flex flex-wrap gap-2">
                {(article.tags || []).map(t => (
                  <Link key={t} to={`/search?q=${encodeURIComponent(t)}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${cat.tagClass || 'bg-blue-50 text-blue-700'} hover:opacity-80 transition-opacity`}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            <AdSidebar slot={4} size="mid" colorScheme="green" label="作者区广告位" desc="替换作者信息，展示品牌广告" />
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
