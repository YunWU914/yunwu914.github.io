/**
 * 广告位规格说明
 *
 * AdBannerWide   — 顶部通栏横幅  728×90px   适合品牌横幅、活动推广
 * AdSlot         — 内容区方块    300×250px  适合产品图文、促销活动
 * AdSidebarTop   — 侧边栏顶部    300×150px  适合品牌Logo+短语
 * AdSidebarMid   — 侧边栏中部    300×200px  适合产品展示、二维码
 * AdSidebarFull  — 侧边栏长条    300×600px  适合高曝光品牌通栏
 */

// 首页轮播图尺寸横幅 1200×400
export function AdBannerWide({ slot = 1 }) {
  return (
    <div className="w-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-300 mb-6 cursor-pointer hover:border-indigo-500 transition-all relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)', minHeight: '240px' }}>
      {/* 装饰圆 */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
      <div className="relative z-10 text-center px-8 py-10">
        <span className="text-xs font-bold text-indigo-600 bg-white/60 px-3 py-1 rounded-full mb-4 inline-block">广告位 {slot}</span>
        <div className="text-2xl font-extrabold text-indigo-900 mb-2">首页轮播图广告</div>
        <div className="text-sm text-indigo-700 mb-3">规格：1200 × 400 px · 首屏最高曝光位置，适合品牌大图推广</div>
        <div className="flex items-center justify-center gap-6 text-xs text-indigo-600">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/>支持图片/视频</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/>自动轮播展示</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/>点击跳转链接</span>
        </div>
      </div>
      <div className="absolute bottom-3 right-4 text-xs text-indigo-400 font-mono">1200 × 400</div>
    </div>
  );
}

// 内容区方块 300×250
export function AdSlot({ slot = 2 }) {
  return (
    <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer hover:border-yellow-500 transition-all my-6"
      style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', minHeight: '160px', padding: '28px 20px' }}>
      <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded mb-2">广告位 {slot}</span>
      <div className="text-base font-bold text-yellow-900">内容区方块广告</div>
      <div className="text-xs text-yellow-700 mt-1.5 text-center">规格：300 × 250 px</div>
      <div className="text-xs text-yellow-600 mt-1 text-center">适合产品图文展示、促销活动宣传</div>
    </div>
  );
}

// 侧边栏广告 — 支持多种尺寸规格
export function AdSidebar({ slot = 3, label, desc, size = 'mid', colorScheme = 'pink' }) {
  const schemes = {
    pink:  { border: 'border-pink-300',   bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', label: 'text-pink-700',   title: 'text-pink-900',   desc: 'text-pink-600',   hover: 'hover:border-pink-400'   },
    blue:  { border: 'border-blue-300',   bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', label: 'text-blue-700',   title: 'text-blue-900',   desc: 'text-blue-600',   hover: 'hover:border-blue-400'   },
    green: { border: 'border-emerald-300',bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', label: 'text-emerald-700',title: 'text-emerald-900',desc: 'text-emerald-600',hover: 'hover:border-emerald-400'},
    amber: { border: 'border-amber-300',  bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', label: 'text-amber-700',  title: 'text-amber-900',  desc: 'text-amber-600',  hover: 'hover:border-amber-400'  },
    violet:{ border: 'border-violet-300', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', label: 'text-violet-700', title: 'text-violet-900', desc: 'text-violet-600', hover: 'hover:border-violet-400' },
  };

  const sizes = {
    top:  { minHeight: '100px', spec: '300 × 150 px', specDesc: '侧边栏顶部，适合品牌 Logo + 短语' },
    mid:  { minHeight: '140px', spec: '300 × 200 px', specDesc: '侧边栏中部，适合产品展示、二维码' },
    full: { minHeight: '260px', spec: '300 × 600 px', specDesc: '侧边栏长条，高曝光品牌通栏' },
  };

  const s = schemes[colorScheme] || schemes.pink;
  const sz = sizes[size] || sizes.mid;

  return (
    <div
      className={`border-2 border-dashed ${s.border} ${s.hover} rounded-xl p-4 text-center cursor-pointer transition-all mb-5 flex flex-col items-center justify-center`}
      style={{ background: s.bg, minHeight: sz.minHeight }}
    >
      <span className={`text-xs font-bold ${s.label} bg-white/50 px-2 py-0.5 rounded mb-2`}>广告位 {slot}</span>
      <div className={`text-sm font-bold ${s.title}`}>{label || '侧边栏广告位'}</div>
      <div className={`text-xs font-mono font-semibold ${s.label} mt-1.5`}>{sz.spec}</div>
      <div className={`text-xs ${s.desc} mt-1 leading-relaxed`}>{desc || sz.specDesc}</div>
    </div>
  );
}