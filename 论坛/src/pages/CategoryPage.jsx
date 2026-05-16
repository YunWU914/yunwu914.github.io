import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ArticleCard from '../components/ArticleCard';
import { AdBannerWide, AdSlot, AdSidebar } from '../components/AdBanner';
import { SidebarHotList } from '../components/SidebarHot';
import { CATEGORIES } from '../lib/mockData';  // 只保留分类配置，不要 MOCK_ARTICLES

const REPO = 'YunWU914/yunwu914.github.io';
const BRANCH = 'main';

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

async function fetchRealPosts() {
  try {
    const resp = await fetch(`https://api.github.com/repos/${REPO}/contents/content/posts?ref=${BRANCH}`);
    if (!resp.ok) return [];
    const rootItems = await resp.json();
    const posts = [];

    for (const item of rootItems) {
      if (item.type === 'dir') {
        const subResp = await fetch(item.url);
        if (!subResp.ok) continue;
        const files = await subResp.json();
        for (const file of files) {
          if (file.name.endsWith('.md')) {
            const raw = await fetch(file.download_url).then(r => r.text());
            posts.push(parseMarkdown(raw, file.path));
          }
        }
      } else if (item.name.endsWith('.md')) {
        const raw = await fetch(item.download_url).then(r => r.text());
        posts.push(parseMarkdown(raw, item.path));
      }
    }
    return posts;
  } catch (err) {
    console.error('读取文章出错:', err);
    return [];
  }
}

const FILTERS = ['全部', '最新发布', '最多阅读', '最多评论', '精华帖'];

export default function CategoryPage() {
  const { category } = useParams();
  const [filter, setFilter] = useState('全部');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const cat = CATEGORIES[category] || { label: category, emoji: '📂', color: 'from-blue-700 to-blue-500', desc: '' };
  const targetCategory = CATEGORY_SLUG_MAP[category] || category;

  useEffect(() => {
    setPage(1);
    setLoading(true);
    
    fetchRealPosts().then(posts => {
      const filtered = posts.filter(a => 
        a.category === targetCategory || a.category === category
      );
      setArticles(filtered);
      setLoading(false);
    });
  }, [category, targetCategory]);

  let displayArticles = [...articles];
  if (filter === '最多阅读') displayArticles.sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (filter === '最多评论') displayArticles.sort((a, b) => (b.comment_count || 0) - (a.comment_count || 0));
  else if (filter === '最新发布') displayArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (filter === '精华帖') displayArticles = displayArticles.filter(a => a.is_featured);

  const PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(displayArticles.length / PER_PAGE));
  const pageArticles = displayArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeCategory={category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity
