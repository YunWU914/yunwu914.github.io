import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MANUALS = [
  { icon: '📏', gradient: 'from-blue-700 to-blue-500', title: '常用标准件参数速查表', desc: '螺栓、轴承、密封件、弹簧等标准件规格尺寸对照' },
  { icon: '🌡️', gradient: 'from-red-700 to-red-500', title: '材料热处理参数手册', desc: '45#、40Cr、GCr15等常用钢材淬火回火工艺参数' },
  { icon: '⚠️', gradient: 'from-emerald-700 to-emerald-500', title: '数控系统报警代码库', desc: 'FANUC、西门子、三菱常见报警代码及解决方法汇总' },
  { icon: '⚡', gradient: 'from-amber-700 to-amber-500', title: '电气元件选型手册', desc: '接触器、继电器、变频器、传感器等选型计算公式' },
  { icon: '💧', gradient: 'from-violet-700 to-violet-500', title: '液压气动回路图集', desc: '常用液压回路原理图、气动控制回路设计参考' },
  { icon: '🔪', gradient: 'from-slate-600 to-slate-400', title: '切削用量参考手册', desc: '车削、铣削、钻削、磨削常用切削参数推荐值' },
  { icon: '📐', gradient: 'from-sky-700 to-sky-500', title: '公差与配合速查手册', desc: '标准公差等级、孔轴配合制度参数对照表' },
  { icon: '🔩', gradient: 'from-rose-700 to-rose-500', title: '螺纹规格与强度手册', desc: '公制/英制螺纹规格、预紧力与强度等级对照' },
  { icon: '📊', gradient: 'from-teal-700 to-teal-500', title: '金属材料力学性能表', desc: '常用钢铁、铝合金、铜合金力学性能参数汇总' },
];

export default function ManualsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-7" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)' }}>
          <div className="relative p-10 md:px-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(30%,-30%)' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                <Link to="/" className="hover:text-white transition-colors">首页</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">技术手册</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-yellow-400" />
                <h1 className="text-white text-3xl font-extrabold">技术手册</h1>
              </div>
              <p className="text-white/70 text-sm max-w-xl">机械工程师常用技术参数速查，涵盖标准件、热处理、数控、液压等核心领域</p>
            </div>
          </div>
        </div>

        {/* Manuals Grid */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="space-y-3">
            {MANUALS.map(m => (
              <div key={m.title} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:bg-card hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl flex-shrink-0`}>{m.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold group-hover:text-blue-700 transition-colors">{m.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
                <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white shrink-0 transition-all hover:opacity-90" style={{ background: '#1e40af' }}>查看</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}