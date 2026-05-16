import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Zap, Star, BookOpen, Building2, ChevronRight, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { AdBannerWide, AdSlot, AdSidebar } from '../components/AdBanner';
import { SidebarHotList } from '../components/SidebarHot';
import { MOCK_ARTICLES, CATEGORIES, HOT_SEARCHES } from '../lib/mockData';

const FEATURED = MOCK_ARTICLES.filter(a => a.is_featured);
const LATEST = [...MOCK_ARTICLES].sort((a, b) => b.id - a.id).slice(0, 8);

const MANUALS = [
  { icon: '📏', gradient: 'from-blue-700 to-blue-500', title: '常用标准件参数速查表', desc: '螺栓、轴承、密封件、弹簧等标准件规格尺寸对照' },
  { icon: '🌡️', gradient: 'from-red-700 to-red-500', title: '材料热处理参数手册', desc: '45#、40Cr、GCr15等常用钢材淬火回火工艺参数' },
  { icon: '⚠️', gradient: 'from-emerald-700 to-emerald-500', title: '数控系统报警代码库', desc: '常见报警代码及解决方法汇总' },
  { icon: '⚡', gradient: 'from-amber-700 to-amber-500', title: '电气元件选型手册', desc: '接触器、继电器、变频器、传感器等选型计算公式' },
  { icon: '💧', gradient: 'from-violet-700 to-violet-500', title: '液压气动回路图集', desc: '常用液压回路原理图、气动控制回路设计参考' },
  { icon: '🔪', gradient: 'from-slate-600 to-slate-400', title: '切削用量参考手册', desc: '车削、铣削、钻削、磨削常用切削参数推荐值' },
];

const TOOLS = [
  { icon: '🧊', gradient: 'from-blue-700 to-blue-500', name: '待开发1', desc: '001' },
  { icon: '🔴', gradient: 'from-red-700 to-red-500', name: '待开发2', desc: '002' },
  { icon: '🟢', gradient: 'from-emerald-700 to-emerald-500', name: '待开发3', desc: '003' },
  { icon: '🟡', gradient: 'from-amber-700 to-amber-500', name: '待开发4', desc: '004' },
  { icon: '🟣', gradient: 'from-violet-700 to-violet-500', name: '待开发5', desc: '005' },
  { icon: '⚙️', gradient: 'from-slate-600 to-slate-400', name: '待开发6', desc: '006' },
  { icon: '🤝', gradient: 'from-rose-700 to-rose-500', name: '待开发7', desc: '007' },
  { icon: '📑', gradient: 'from-sky-700 to-sky-500', name: '待开发8', desc: '008' },
];

const formatTime = (id) => {
  const times = ['2分钟前','15分钟前','1小时前','2小时前','4小时前','6小时前','昨天','2天前'];
  return times[id % times.length];
};

export default function Home() {
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState('');

  const handleSearch = (q) => {
    const kw = q || searchQ;
    if (kw.trim()) navigate(`/search?q=${encodeURIComponent(kw.trim())}`);
  };

  const totalPosts = Object.values(CATEGORIES).reduce((s, c) => s + c.count, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Search Hero */}
        <section className="mb-7 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-1.5">站内搜索</h2>
                  <p className="text-white/65 text-sm">搜索技术帖子、故障案例和工艺参数</p>
                </div>

              </div>
              <div className="relative max-w-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="输入关键词搜索帖子、故障代码、材料参数..."
                  className="w-full pl-12 pr-28 py-3.5 rounded-xl text-white placeholder-white/45 border-2 border-white/20 focus:outline-none focus:border-white/45 text-base"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
                />
                <button
                  onClick={() => handleSearch()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
                  style={{ background: '#dc2626' }}
                >搜索</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {HOT_SEARCHES.map(t => (
                  <button key={t} onClick={() => handleSearch(t)}
                    className="px-3 py-1 rounded-full text-xs text-white/75 border border-white/15 hover:bg-white/20 transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AdBannerWide slot={1} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main */}
          <div>
            {/* Latest Posts */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5 text-lg font-bold">
                  <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><Zap className="w-4 h-4 text-red-600" /></span>
                  最新投稿
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-bold ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />实时更新
                  </span>
                </div>
                <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">更多 <ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
              <div className="divide-y divide-border/40">
                {LATEST.map(a => {
                  const cat = CATEGORIES[a.category] || {};
                  return (
                    <Link key={a.id} to={`/article/${a.id}`} className="flex items-start gap-3 py-3.5 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-all">
                      <span className="text-xs text-muted-foreground w-12 shrink-0 pt-0.5">{formatTime(parseInt(a.id))}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground group-hover:text-blue-700 leading-snug mb-1.5 transition-colors line-clamp-1">{a.title}</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${cat.tagClass || 'bg-blue-50 text-blue-700'}`}>{cat.label}</span>
                          <span className="text-xs text-muted-foreground">{a.author}</span>
                          <span className="text-xs text-red-500 font-semibold">{a.views?.toLocaleString()} 阅读</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Category Grid */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5 text-lg font-bold">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/></svg>
                  </span>
                  热门分类导航
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'tongyong', label: '通用机械设备' },
                  { key: 'jianzhu', label: '建筑工程机械' },
                  { key: 'qingxi', label: '清洗通风' },
                  { key: 'jichuang_jx', label: '机床机械' },
                  { key: 'wuliu', label: '物流设备' },
                  { key: 'shipin', label: '食品机械' },
                  { key: 'jixie_qt', label: '机械设备-其他' },
                  { key: 'wujin', label: '五金配件' },
                ].map(cat => (
                  <Link key={cat.key} to={`/category/${cat.key}`}
                    className="p-4 rounded-xl border border-border bg-background text-center hover:-translate-y-1 hover:shadow-md hover:bg-card transition-all cursor-pointer group relative overflow-hidden">
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">{cat.label}</h4>
                    <p className="text-xs text-muted-foreground">点击进入版块</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2.5 text-lg font-bold">
                  <span className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center"><Star className="w-4 h-4 text-yellow-600" /></span>
                  每周精选
                </div>
              </div>
              <div className="space-y-4">
                {FEATURED.map(a => {
                  const cat = CATEGORIES[a.category] || {};
                  return (
                    <Link key={a.id} to={`/article/${a.id}`}
                      className="flex gap-4 p-4 rounded-xl border border-border bg-background hover:bg-card hover:shadow-md hover:translate-x-1 transition-all cursor-pointer group">
                      <div className={`w-28 h-20 rounded-lg flex items-center justify-center bg-gradient-to-br ${cat.color || 'from-blue-700 to-blue-500'} flex-shrink-0`}>
                        <span className="text-white text-xs font-bold px-2 text-center leading-tight">{cat.label}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 bg-yellow-500 text-white rounded text-xs font-bold mb-1.5">精选</span>
                        <h4 className="font-bold text-sm leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">{a.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{a.summary}</p>
                        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{a.author}</span>
                          <span>👁 {a.views?.toLocaleString()}</span>
                          <span>❤️ {a.likes}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">🔥 热门排行</h4>
              <SidebarHotList />
            </div>

            <AdSidebar slot={3} size="top" colorScheme="pink" label="侧边栏顶部广告" />

            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h4 className="font-bold text-sm mb-4 pb-2.5 border-b-2 border-blue-600 inline-block">⚡ 快速入口</h4>
              <div className="grid grid-cols-3 gap-2">
                {['发布投稿','提问求助','资料下载','专家入驻','视频教程','行业展会'].map(label => (
                  <div key={label} className="p-3 bg-background rounded-xl border border-border text-center hover:bg-card hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">暂未开放功能区</p>
            </div>

            <AdSidebar slot={4} size="mid" colorScheme="blue" label="侧边栏中部广告" desc="替换活跃作者，展示品牌广告" />

            {/* Tools */}
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2.5 text-sm font-bold mb-4 pb-2.5 border-b border-border/60">
                <span className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><Building2 className="w-3.5 h-3.5 text-violet-600" /></span>
                待开发板块
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TOOLS.map(t => (
                  <div key={t.name} className="p-3 rounded-xl border border-border bg-background text-center hover:scale-105 hover:shadow-md hover:bg-card transition-all cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mx-auto mb-1.5`}>
                      <span className="text-white text-xs font-bold">{t.name.slice(0,2)}</span>
                    </div>
                    <h4 className="text-xs font-semibold mb-0.5">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Ad Slot 2 — full width */}
        <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-yellow-400 rounded-2xl cursor-pointer hover:border-yellow-500 transition-all mt-6"
          style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', minHeight: '160px', padding: '28px 20px' }}>
          <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded mb-2">广告位 2</span>
          <div className="text-base font-bold text-yellow-900">内容区横幅广告</div>
          <div className="text-xs text-yellow-700 mt-1.5 text-center">规格：1200 × 160 px</div>
          <div className="text-xs text-yellow-600 mt-1 text-center">适合产品图文展示、促销活动宣传</div>
        </div>

        {/* Manuals — full width */}
        <div className="w-full bg-card rounded-2xl border border-border shadow-sm mt-6 p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2.5 text-base font-bold">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center"><BookOpen className="w-4 h-4 text-emerald-600" /></span>
              技术手册
            </div>
            <Link to="/manuals" className="text-xs text-blue-700 border border-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all font-semibold">查看更多 &gt;&gt;</Link>
          </div>
          <div className="space-y-2.5">
            {MANUALS.slice(0, 3).map(m => (
              <div key={m.title} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-border bg-background hover:bg-card hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-lg flex-shrink-0`}>{m.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold group-hover:text-blue-700 transition-colors">{m.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white shrink-0 transition-all hover:opacity-90" style={{ background: '#1e40af' }}>查看</button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center mt-1">待完善中</p>
          </div>
        </div>

      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
