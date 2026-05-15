import { Link } from 'react-router-dom';
import { Eye, MessageSquare, Heart } from 'lucide-react';
import { CATEGORIES } from '../lib/mockData';

export default function ArticleCard({ article }) {
  const cat = CATEGORIES[article.category] || {};

  return (
    <Link
      to={`/article/${article.id}`}
      className="flex gap-5 p-5 bg-card rounded-xl border border-border hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer mb-4 block"
    >
      {/* Thumb */}
      <div
        className={`w-44 h-28 rounded-lg flex items-center justify-center text-4xl flex-shrink-0 bg-gradient-to-br ${cat.color || 'from-blue-700 to-blue-500'}`}
        style={{ minWidth: '112px' }}
      >
        <span>{article.cover_emoji || cat.emoji || '📄'}</span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-blue-700 leading-snug mb-2 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.summary}</p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {article.author_initial || article.author?.[0]}
            </div>
            <span className="text-xs text-muted-foreground">{article.author}</span>
            {article.tags?.slice(0,2).map(t => (
              <span key={t} className={`px-2 py-0.5 rounded text-xs font-semibold ${cat.tagClass || 'bg-blue-50 text-blue-700'}`}>{t}</span>
            ))}
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{article.views?.toLocaleString()}</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{article.comment_count}</span>
            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{article.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}