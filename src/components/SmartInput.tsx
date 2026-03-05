import React, { useState, useRef, useEffect } from 'react';
import { AtSign, Slash, Send, ChevronDown, Users, Zap, Image as ImageIcon, MessageSquare, FileText } from 'lucide-react';
import { Bubble } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SmartInputProps {
  mode: '圈选模式' | '执行模式';
  setMode: (mode: '圈选模式' | '执行模式') => void;
  value: string;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
  bubbles: Bubble[];
  onBubbleClick: (tabName: string) => void;
  activeBubbleId?: string | null;
  onBubbleToggle?: (id: string | null) => void;
  locked?: boolean;
}

export function SmartInput({ mode, setMode, value, onChange, onSubmit, bubbles, onBubbleClick, activeBubbleId: propActiveBubbleId, onBubbleToggle, locked }: SmartInputProps) {
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [internalActiveBubbleId, setInternalActiveBubbleId] = useState<string | null>(null);
  const [atCategory, setAtCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeBubbleId = propActiveBubbleId !== undefined ? propActiveBubbleId : internalActiveBubbleId;
  const setActiveBubbleId = onBubbleToggle || setInternalActiveBubbleId;

  const lastAtIndex = value.lastIndexOf('@');
  const lastSlashIndex = value.lastIndexOf('/');

  const activeAtQuery = lastAtIndex !== -1 && !value.slice(lastAtIndex).includes(' ') ? value.slice(lastAtIndex + 1) : null;
  const activeSlashQuery = lastSlashIndex !== -1 && !value.slice(lastSlashIndex).includes(' ') ? value.slice(lastSlashIndex + 1) : null;

  const isAtActive = activeAtQuery !== null && (lastSlashIndex === -1 || lastAtIndex > lastSlashIndex);
  const isSlashActive = activeSlashQuery !== null && (lastAtIndex === -1 || lastSlashIndex > lastAtIndex);

  useEffect(() => {
    if (!isAtActive) {
      setAtCategory(null);
    }
  }, [isAtActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isAtActive || isSlashActive) return; // Let menu handle enter if open
      if (!locked) {
        onSubmit(value);
      }
    }
  };

  const handleCategorySelect = (category: string) => {
    setAtCategory(category);
    inputRef.current?.focus();
  };

  const insertItem = (itemName: string) => {
    if (isAtActive) {
      const newVal = value.slice(0, lastAtIndex) + '@' + itemName + ' ';
      onChange(newVal);
      setAtCategory(null);
    } else if (isSlashActive) {
      const newVal = value.slice(0, lastSlashIndex) + '/' + itemName + ' ';
      onChange(newVal);
    }
    inputRef.current?.focus();
  };

  const getAllMockResults = (query: string) => {
    const allItems = [
      { category: '人群包', name: '南京100万客户' },
      { category: '人群包', name: '合肥政务区高意向人群' },
      { category: '人群包', name: '近30天活跃用户' },
      { category: '人群包', name: '未复购流失预警人群' },
      { category: '话术', name: '活动话术1' },
      { category: '话术', name: '春季上新问候' },
      { category: '话术', name: '催单话术' },
      { category: '话术', name: '流失挽回话术' },
      { category: '图片', name: '春季上新海报.png' },
      { category: '图片', name: '双十一大促.jpg' },
      { category: '图片', name: '产品介绍图.png' },
      { category: '小程序卡片', name: '商品详情页' },
      { category: '小程序卡片', name: '活动主会场' },
      { category: '小程序卡片', name: '会员中心' }
    ];
    return allItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  };

  const getMockResults = (category: string, query: string) => {
    let items: string[] = [];
    if (category === '人群包') items = ['南京100万客户', '合肥政务区高意向人群', '近30天活跃用户', '未复购流失预警人群'];
    if (category === '话术') items = ['活动话术1', '春季上新问候', '催单话术', '流失挽回话术'];
    if (category === '图片') items = ['春季上新海报.png', '双十一大促.jpg', '产品介绍图.png'];
    if (category === '小程序卡片') items = ['商品详情页', '活动主会场', '会员中心'];
    
    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  };

  const getCategoryIcon = (category: string) => {
    if (category === '人群包') return <Users size={14} />;
    if (category === '话术') return <MessageSquare size={14} />;
    if (category === '图片') return <ImageIcon size={14} />;
    if (category === '小程序卡片') return <FileText size={14} />;
    return <FileText size={14} />;
  };

  return (
    <div className={`relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm transition-all ${locked ? 'opacity-80' : 'focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500'}`}>
      
      {/* Bubbles Area */}
      {bubbles.length > 0 && (
        <div className="flex flex-wrap gap-2 px-3 pt-3 pb-1 relative">
          <AnimatePresence>
            {bubbles.map(bubble => (
              <div key={bubble.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer border transition-colors ${
                    activeBubbleId === bubble.id 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                      : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border-indigo-100 dark:border-indigo-800/50'
                  }`}
                  onClick={() => setActiveBubbleId(activeBubbleId === bubble.id ? null : bubble.id)}
                >
                  {bubble.type === 'audience' ? <Users size={12} /> : <Zap size={12} />}
                  {bubble.text}
                </motion.div>

                {/* Bubble List Popup */}
                <AnimatePresence>
                  {activeBubbleId === bubble.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="px-3 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">
                        {bubble.type === 'audience' ? '人群包列表' : '任务列表'}
                      </div>
                      <div className="p-1">
                        {bubble.items.map(item => (
                          <div 
                            key={item.id}
                            className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer transition-colors"
                            onClick={() => {
                              setActiveBubbleId(null);
                              onBubbleClick(item.tabName);
                            }}
                          >
                            <span className="text-zinc-400">
                              {bubble.type === 'audience' ? <Users size={14} /> : <Zap size={14} />}
                            </span>
                            <span className="truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Top Bar: Mode Selector */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1 relative">
        <div>
          <button 
            onClick={() => !locked && setShowModeDropdown(!showModeDropdown)}
            disabled={locked}
            className="flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            {mode}
            <ChevronDown size={12} />
          </button>
          
          <AnimatePresence>
            {showModeDropdown && !locked && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-3 mt-1 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50"
              >
                <div 
                  className="px-3 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  onClick={() => { setMode('圈选模式'); setShowModeDropdown(false); }}
                >
                  圈选模式
                </div>
                <div 
                  className="px-3 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  onClick={() => { setMode('执行模式'); setShowModeDropdown(false); }}
                >
                  执行模式
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Textarea Wrapper */}
      <div className="relative w-full">
        {/* Mirror div for @ placeholder */}
        {isAtActive && atCategory && activeAtQuery === '' && (
          <div className="absolute inset-0 px-3 py-2 text-sm font-sans leading-normal pointer-events-none whitespace-pre-wrap break-words overflow-hidden" aria-hidden="true">
            <span className="text-transparent">{value}</span>
            <span className="text-zinc-400 dark:text-zinc-500">请输入要引用的{atCategory}名称</span>
          </div>
        )}
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={locked ? "任务执行中，无法中止..." : "输入指令，或输入 @ 引用素材，/ 调用技能..."}
          disabled={locked}
          className="relative z-10 w-full bg-transparent border-none focus:ring-0 resize-none px-3 py-2 text-sm font-sans leading-normal text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 min-h-[60px] max-h-[200px] outline-none disabled:opacity-50"
          rows={2}
        />
      </div>

      {/* Bottom Toolbar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => {
              if (!locked) {
                onChange(value + '@');
                inputRef.current?.focus();
              }
            }}
            disabled={locked}
            className="p-1.5 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors disabled:opacity-50"
            title="引用素材"
          >
            <AtSign size={16} />
          </button>
          <button 
            onClick={() => {
              if (!locked) {
                onChange(value + '/');
                inputRef.current?.focus();
              }
            }}
            disabled={locked}
            className="p-1.5 text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors disabled:opacity-50"
            title="调用技能"
          >
            <Slash size={16} />
          </button>
        </div>
        
        <button 
          onClick={() => !locked && onSubmit(value)}
          disabled={!value.trim() || locked}
          className="p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-md transition-colors"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Popup Menus */}
      <AnimatePresence>
        {isAtActive && !locked && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {!atCategory ? (
              activeAtQuery === '' ? (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">选择素材类型</div>
                  <div className="p-1">
                    <MenuItem icon={<Users size={14} />} label="人群包" onClick={() => handleCategorySelect('人群包')} />
                    <MenuItem icon={<MessageSquare size={14} />} label="话术" onClick={() => handleCategorySelect('话术')} />
                    <MenuItem icon={<ImageIcon size={14} />} label="图片" onClick={() => handleCategorySelect('图片')} />
                    <MenuItem icon={<FileText size={14} />} label="小程序卡片" onClick={() => handleCategorySelect('小程序卡片')} />
                  </div>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">搜索素材</div>
                  <div className="p-1 max-h-48 overflow-y-auto">
                    {getAllMockResults(activeAtQuery).map(res => (
                      <MenuItem 
                        key={res.name} 
                        icon={getCategoryIcon(res.category)} 
                        label={`[${res.category}] ${res.name}`} 
                        onClick={() => insertItem(res.name)} 
                      />
                    ))}
                    {getAllMockResults(activeAtQuery).length === 0 && (
                      <div className="px-3 py-4 text-center text-xs text-zinc-500">无匹配结果</div>
                    )}
                  </div>
                </>
              )
            ) : (
              <>
                <div className="px-3 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">搜索{atCategory}</div>
                <div className="p-1 max-h-48 overflow-y-auto">
                  {getMockResults(atCategory, activeAtQuery || '').map(res => (
                    <MenuItem key={res} icon={getCategoryIcon(atCategory)} label={res} onClick={() => insertItem(res)} />
                  ))}
                  {getMockResults(atCategory, activeAtQuery || '').length === 0 && (
                    <div className="px-3 py-4 text-center text-xs text-zinc-500">无匹配结果</div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
        
        {isSlashActive && !locked && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="px-3 py-2 text-xs font-medium text-zinc-500 border-b border-zinc-100 dark:border-zinc-700">调用技能</div>
            <div className="p-1">
              {mode === '圈选模式' ? (
                <MenuItem icon={<Users size={14} />} label="人群圈选" onClick={() => insertItem('人群圈选')} />
              ) : (
                <>
                  <MenuItem icon={<MessageSquare size={14} />} label="私聊推送" onClick={() => insertItem('私聊推送')} />
                  <MenuItem icon={<ImageIcon size={14} />} label="朋友圈推送" onClick={() => insertItem('朋友圈推送')} />
                  <MenuItem icon={<FileText size={14} />} label="内容生成" onClick={() => insertItem('内容生成')} />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ icon, label, onClick }: { key?: string | number, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div 
      className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md cursor-pointer transition-colors"
      onClick={onClick}
    >
      <span className="text-zinc-400">{icon}</span>
      {label}
    </div>
  );
}
