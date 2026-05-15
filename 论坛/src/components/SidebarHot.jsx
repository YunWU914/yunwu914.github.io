import { Link } from 'react-router-dom';
import { MOCK_ARTICLES, ACTIVE_AUTHORS } from '../lib/mockData';

function rankClass(i) {
  if (i === 0) return 'bg-yellow-100 text-yellow-700';
  if (i === 1) return 'bg-slate-100 text-slate-500';
  if (i === 2) return 'bg-red-50 text-red-600';
  return 'bg-muted text-muted-foreground';
}

export function SidebarHotList({ articles }) {
  const list = (articles || MOCK_ARTICLES).slice(0, 7).sort((a, b) => (b.views || 0) - (a.views || 0));
  return (
    <div className="space-y-3">
      {list.map((a, i) => (
        <Link key={a.id} to={`/article/${a.id}`} className="flex gap-2.5 items-start group cursor-pointer hover:bg-muted p-1.5 rounded-lg transition-all">
          <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${rankClass(i)}`}>{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors">{a.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{a.views?.toLocaleString()} 阅读</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function SidebarAuthors() {
  return (
    <div className="space-y-2">
      {ACTIVE_AUTHORS.map((a, i) => (
        <div key={a.name} className="flex gap-2.5 items-center hover:bg-muted p-2 rounded-lg transition-all cursor-pointer">
          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${rankClass(i)}`}>{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground">{a.name}</div>
            <div className="text-xs text-muted-foreground">发表 {a.posts} 篇 · 获赞 {(a.likes / 1000).toFixed(1)}k</div>
          </div>
        </div>
      ))}
    </div>
  );
}