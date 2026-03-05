/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, ChevronRight, Play, Square, Users, Send } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { Tab, Bubble } from './types';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', title: '会话工作台', content: 'Main Content' }]);
  const [activeTabId, setActiveTabId] = useState('1');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openTab = (tabName: string) => {
    const existing = tabs.find(t => t.title === tabName);
    if (existing) {
      setActiveTabId(existing.id);
    } else {
      const newTab = { id: Date.now().toString(), title: tabName, content: `Content for ${tabName}` };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
    setIsSidebarOpen(false);
  };

  const renderTabContent = (tab: Tab) => {
    if (tab.id === '1') {
      return <Workspace />;
    }
    if (tab.title.includes('合肥100w学区房')) {
      return (
        <div className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{tab.title}</h2>
              <p className="text-sm text-zinc-500">预估人数: 1,285 人 | 圈选条件: 合肥市, 学区房需求, 100万预算</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3 font-medium">客户昵称</th>
                  <th className="px-4 py-3 font-medium">城市/区域</th>
                  <th className="px-4 py-3 font-medium">预算</th>
                  <th className="px-4 py-3 font-medium">标签</th>
                  <th className="px-4 py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {['张三', '李四', '王五', '赵六', '钱七'].map((name, i) => (
                  <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20">
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{name}</td>
                    <td className="px-4 py-3 text-zinc-500">合肥市</td>
                    <td className="px-4 py-3 text-zinc-500">100万以内</td>
                    <td className="px-4 py-3">
                      <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded text-xs">学区房需求</span>
                    </td>
                    <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">查看档案</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (tab.title.includes('每日私聊推送_活动话术1')) {
      return (
        <div className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Send size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{tab.title}</h2>
              <p className="text-sm text-zinc-500">状态: 待执行 | 触发条件: 每天中午 11:30</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">推送配置</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">目标人群</span><span className="font-medium">当前会话人群</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">发送账号</span><span className="font-medium">C端客服</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">黑名单过滤</span><span className="font-medium text-zinc-400">无</span></div>
              </div>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">素材预览 (@活动话术1)</h3>
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded text-sm text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                <p>【限时特惠】合肥政务区学区房最新名单已出，点击查看...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 p-6">
        <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">{tab.title}</h2>
        <div className="space-y-4">
          <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-32 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-64 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative bg-gray-50 text-gray-900">
      {/* Mock Left Navigation */}
      <div className="w-16 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 gap-4 bg-white dark:bg-zinc-900 z-10 shrink-0">
         <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold">AI</div>
         <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800"></div>
         <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-900 z-0">
        {/* Tabs Header */}
        <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-2 gap-1 overflow-x-auto shrink-0">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-1.5 rounded-md text-sm cursor-pointer whitespace-nowrap flex items-center gap-2 transition-colors ${
                activeTabId === tab.id 
                  ? 'bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100' 
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {tab.title}
              {tab.id !== '1' && (
                <X 
                  size={14} 
                  className="hover:text-red-500" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setTabs(tabs.filter(t => t.id !== tab.id));
                    if (activeTabId === tab.id) setActiveTabId('1');
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {renderTabContent(tabs.find(t => t.id === activeTabId)!)}
        </div>
      </div>

      {/* Copilot Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : 400,
          opacity: isSidebarOpen ? 1 : 0 
        }}
        transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
        className="absolute right-0 top-0 bottom-0 w-[400px] border-l border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl flex flex-col z-40 shadow-2xl"
        style={{ pointerEvents: isSidebarOpen ? 'auto' : 'none' }}
      >
        <div className="w-full h-full flex flex-col">
          <Sidebar 
            onClose={toggleSidebar} 
            onOpenTab={openTab} 
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-6 bottom-6 z-50"
          >
            <button 
              onClick={toggleSidebar}
              className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
              <Bot size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

