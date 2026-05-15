import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const COMMUNITY_CATS = [
  { key: 'tongyong', label: '通用机械设备' },
  { key: 'jianzhu', label: '工程机械交流' },
  { key: 'qingxi', label: '清洗通风版块' },
  { key: 'jichuang_jx', label: '机床机械版块' },
  { key: 'wuliu', label: '物流设备交流' },
  { key: 'shipin', label: '食品机械版块' },
  { key: 'wujin', label: '五金配件交流' },
];

const OLD_CATS = [
  { key: 'jichuang', label: '机床加工' },
  { key: 'gongzhuang', label: '工装夹具' },
  { key: 'dianqi', label: '电气自动化' },
  { key: 'yeya', label: '液压气动' },
  { key: 'weixiu', label: '维修拆解' },
  { key: 'sheji', label: '设计制图' },
  { key: 'cailiao', label: '材料热处理' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a' }} className="text-white mt-12">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand block — mirrors header */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-extrabold text-xl mb-1">
              <Settings className="w-5 h-5 text-yellow-400 fill-yellow-400" strokeWidth={1.5} />
              机工汇
            </div>
            <p className="text-white/40 text-xs font-medium tracking-wide mb-4">机械工程师技术社区</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              面向机械工程师的专业技术社区，涵盖机床加工、电气自动化、液压气动、维修拆解等领域。致力于打造工程师互助、知识共享的垂直平台。
            </p>

            {/* 技术板块导航 */}
            <div className="mt-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">— 技术交流板块 —</p>
              <div className="flex flex-wrap gap-2">
                {OLD_CATS.map(c => (
                  <Link
                    key={c.key}
                    to={`/category/${c.key}`}
                    className="px-3 py-1 rounded text-xs text-white/55 border border-white/10 hover:text-white hover:border-white/30 transition-all"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 热门设备交流板块 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-4">— 设备交流板块 —</h4>
            <div className="space-y-2">
              {COMMUNITY_CATS.map(c => (
                <Link
                  key={c.key}
                  to={`/category/${c.key}`}
                  className="block text-white/50 text-sm hover:text-yellow-400 hover:pl-1 transition-all"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 关于我们 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-4">— 关于机工汇 —</h4>
            <div className="space-y-2">
              {['关于机工汇', '商务合作', '隐私政策', '用户协议', '征稿启事'].map(t => (
                <span key={t} className="block text-white/50 text-sm hover:text-yellow-400 hover:pl-1 transition-all cursor-pointer">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8 max-w-7xl mx-auto" />

      {/* Bottom bar — mirrors header style */}
      <div style={{ background: '#1e3a8a' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-0">
          {['关于我们','可持续发展','广告服务','供应商平台','联系我们','诚聘英才','法律声明','隐私保护','征稿启事','友情链接'].map((item, i, arr) => (
            <span key={item} className="flex items-center">
              <span className="text-white/70 text-xs hover:text-white cursor-pointer transition-colors px-3 py-1">{item}</span>
              {i < arr.length - 1 && <span className="text-white/20 text-xs">|</span>}
            </span>
          ))}
        </div>
        <div className="text-center text-white/25 text-xs pb-4">
          © 2024 机工汇 - 机械工程师技术社区 | 京ICP备XXXXXXXX号
        </div>
      </div>
    </footer>
  );
}