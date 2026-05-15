import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-6 z-50 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:opacity-90 hover:-translate-y-1"
      style={{ background: '#1e40af' }}
      title="回到顶部"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}