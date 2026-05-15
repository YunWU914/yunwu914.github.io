import { Link, useNavigate } from 'react-router-dom';
import { Settings, Search, PenLine, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES } from '../lib/mockData';

const NEW_CATS = [
  { key: 'tongyong', label: '通用机械设备' },
  { key: 'jianzhu', label: '建筑工程机械' },
  { key: 'qingxi', label: '清洗通风' },
  { key: 'jichuang_jx', label: '机床机械' },
  { key: 'wuliu', label: '物流设备' },
  { key: 'shipin', label: '食品机械' },
  { key: 'jixie_qt', label: '机械设备-其他' },
  { key: 'wujin', label: '五金配件' },
];

const OTHER_CATS = [
  { key: 'jichuang', label: '机床加工' },
  { key: 'gongzhuang', label: '工装夹具' },
  { key: 'dianqi', label: '电气自动化' },
  { key: 'yeya', label: '液压气动' },
  { key: 'weixiu', label: '维修拆解' },
  { key: 'sheji', label: '设计制图' },
  { key: 'cailiao', label: '材料热处理' },
];

export default function Navbar({ activeCategory }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [otherOpen, setOtherOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchQ('');
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ background: '#1e3a8a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-white tracking-tight shrink-0">
            <Settings className="w-6 h-6 text-yellow-400 fill-yellow-400" strokeWidth={1.5} />
            机工汇
          </Link>

          {/* Desktop Nav Categories */}
          <div className="hidden lg:flex items-center gap-0.5 mx-4">
            {NEW_CATS.map(c => (
              <Link
                key={c.key}
                to={`/category/${c.key}`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeCategory === c.key
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {c.label}
              </Link>
            ))}
            {/* 其他 dropdown */}
            <div className="relative" onMouseEnter={() => setOtherOpen(true)} onMouseLeave={() => setOtherOpen(false)}>
              <button className={`flex items-center gap-0.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                OTHER_CATS.some(c => c.key === activeCategory)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}>
                其他 <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {otherOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 rounded-xl shadow-lg border border-white/10 py-1 z-50" style={{ background: '#1e3a8a' }}>
                  {OTHER_CATS.map(c => (
                    <Link
                      key={c.key}
                      to={`/category/${c.key}`}
                      className={`block px-4 py-2 text-sm transition-all ${
                        activeCategory === c.key
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop search + actions */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="搜索文章..."
                className="pl-9 pr-3 py-1.5 w-44 text-sm rounded-lg text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-white/50 focus:w-56 transition-all"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              />
            </form>

            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-semibold text-white transition-all hover:-translate-y-px" style={{ background: '#dc2626' }}>
              <PenLine className="w-3.5 h-3.5" />发布投稿
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2" style={{ background: '#1e3a8a' }}>
          <form onSubmit={handleSearch} className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="搜索文章..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg text-white placeholder-white/40 border border-white/20 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />
          </form>
          {NEW_CATS.map(c => (
            <Link
              key={c.key}
              to={`/category/${c.key}`}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              {c.label}
            </Link>
          ))}
          <div className="border-t border-white/10 mt-1 pt-1">
            <div className="px-3 py-1 text-xs text-white/40 font-semibold">其他分类</div>
            {OTHER_CATS.map(c => (
              <Link
                key={c.key}
                to={`/category/${c.key}`}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                {CATEGORIES[c.key]?.emoji} {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}