import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { AdBannerWide, AdSlot } from '../components/AdBanner';
import { SidebarHotList } from '../components/SidebarHot';
import { CATEGORIES } from '../lib/mockData';  // 只保留分类配置

const REPO = 'YunWU914/yunwu914.github.io';
const BRANCH = 'main';

function parseMarkdown(raw, path) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  let frontmatter = {};
  let content = raw;

  if (match) {
    content = raw.replace(match[0], '').trim();
    match[1].split('\n').forEach(line => {
      if (!line.trim() || line.startsWith('#')) return;
      const sep = line.indexOf(':');
      if (sep > -1) {
        const key = line.slice(0, sep).trim();
        let value = line.slice(sep + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
          } catch {}
        }
        frontmatter[key] = value;
      }
    });
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

async function fetchArticleById(targetId) {
  try {
    const resp = await fetch(`https://api.github.com/repos/${REPO}/contents/content/posts?ref=${BRANCH}`);
    if (!resp.ok) return null;
    const rootItems = await resp.json();

    for (const item of rootItems) {
      if (item.type === 'dir') {
        const subResp = await fetch(item.url);
        if (!subResp.ok) continue;
        const files = await subResp.json();
        for (const file of files) {
          if (file.name.endsWith('.md') && file.name.replace('.md', '') === targetId) {
            const raw = await fetch(file.download_url).then(r => r.text());
            return parseMarkdown(raw, file.path);
          }
        }
      } else if (item.name.endsWith('.md') && item.name.replace('.md', '') === targetId) {
        const raw = await fetch(item.download_url).then(r => r.text());
        return parseMarkdown(raw, item.path);
      }
    }
  } catch (err) {
    console.error('读取文章详情出错:', err);
  }
  return null;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticleById(id).then(real => {
      setArticle(real);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <span className="text-5xl block mb-3">⏳</span>
          <p>正在加载文章...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <span className="text-5xl block mb-3">😕</span>
          <p className="text-lg">文章不存在或已被删除</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">返回首页</Link>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[article.category] || { label: article.category, emoji: '📂' };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs mb-4">
                {cat.emoji} {cat.label}
              </span>
              <h1 className="text-white text-3xl font-extrabold mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs text-blue-900 font-bold">
                    {article.author?.charAt(0) || '匿'}
                  </span>
                  {article.author}
                </span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.views || 0} 阅读</span>
                <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {article.likes || 0} 点赞</span>
                <span>{article.date ? new Date(article.date).toLocaleDateString('zh-CN') : ''}</span>
              </div>
            </div>
          </div>
        </div>

        <AdBannerWide slot={1} />

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="text-blue-600 hover:underline">首页</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <Link to={`/category/${article.category}`} className="text-blue-600 hover:underline">{cat.label}</Link>
          <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          <span className="truncate max-w-[200px]">文章详情</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              {article.summary && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg text-sm text-blue-900">
                  {article.summary}
                </div>
              )}
              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
              />
            </div>

            <AdSlot slot={2} />

            <div className="flex gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-all">
                <Heart className="w-4 h-4" /> 点赞
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-all">
                <MessageCircle className="w-4 h-4" /> 评论
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-all">
                <Bookmark className="w-4 h-4" /> 收藏
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-all">
                <Share2 className="w-4 h-4" /> 分享
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">📌 相关文章</h4>
              {/* 相关文章暂时留空，等首页也接入真实数据后再补充 */}
              <p className="text-sm text-muted-foreground">暂无相关文章</p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
