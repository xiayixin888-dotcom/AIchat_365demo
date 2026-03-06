import React, { useState } from 'react';
import { Search, ChevronDown, Filter, MoreHorizontal, User, RefreshCw, X, Users, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileField } from './ProfileField';
import { Sidebar } from './Sidebar';

interface WorkspaceTab {
  id: string;
  title: string;
  type: 'chat' | 'feature';
}

const sessionList = [
  { name: '余接', time: '13:39', msg: '你好，昨天未收到你的回复...', tag: '小B', unread: false },
  { name: 'ABC', time: '13:39', msg: '您好，市区近的四代住宅确实稀缺...', tag: 'AI', unread: false },
  { name: 'Eric Li', time: '13:39', msg: '芜湖路近新出了一些捡漏房，优惠...', tag: '', unread: false },
  { name: '何建军', time: '13:39', msg: '好的收到，我查下哈', tag: 'AI', unread: false },
  { name: '李玉祥', time: '13:39', msg: '看到您在关注庐阳区北部附近200...', tag: '', unread: false },
  { name: '饭团 awu', time: '13:39', msg: '最近滨湖新区新出了几套捡漏房...', tag: '', unread: false },
  { name: '萍🙏平安安🙏', time: '13:36', msg: '您关注我朋友圈标备元面谦次新房...', tag: 'AI', unread: false },
  { name: '我的梦想', time: '13:38', msg: '您这边关注我朋友圈发的元面谦次...', tag: '', unread: false },
  { name: '微笑', time: '13:39', msg: '电话18994020257', tag: '小B', unread: true },
];

export function Workspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tabs, setTabs] = useState<WorkspaceTab[]>([
    { id: 'feature-1', title: '[AI] 合肥100w学区房', type: 'feature' },
    { id: 'chat-1', title: '杜小明精品大平层17...', type: 'chat' },
    { id: 'chat-2', title: '磐云石业', type: 'chat' },
    { id: 'chat-3', title: '灰太狼', type: 'chat' },
    { id: 'chat-4', title: '升学规划王老师189...', type: 'chat' },
    { id: 'chat-5', title: '圈子不同别硬入', type: 'chat' },
    { id: 'feature-2', title: '每日私聊推送_活动话术1', type: 'feature' },
    { id: 'chat-6', title: '10-16佰', type: 'chat' },
    { id: 'chat-7', title: '春天', type: 'chat' },
    { id: 'chat-8', title: '鹏', type: 'chat' },
  ]);
  const [activeTabId, setActiveTabId] = useState('chat-8');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const openTab = (title: string) => {
    const existingTab = tabs.find(t => t.title === title);
    if (existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      const newTab: WorkspaceTab = {
        id: `feature-${Date.now()}`,
        title,
        type: 'feature'
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };

  const renderContent = () => {
    if (activeTab.type === 'chat') {
      return (
        <div className="flex h-full w-full">
           {/* Chat Area */}
           <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950">
             {/* Chat Header */}
            <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">{activeTab.title === '鹏' ? '鹏' : activeTab.title}</span>
                <span className="text-emerald-500 text-xs bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">微信</span>
                <span className="text-xs text-zinc-500 ml-2">合肥 | AI找房</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  有效会话线索
                </button>
                <button className="px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                  切换AI
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-zinc-50/30 dark:bg-zinc-900/10">
              <div className="text-center text-xs text-zinc-400 my-2">2026-03-04 09:56:19 转AI接待</div>
              
              <ChatMessage 
                role="ai" 
                time="2026-03-04 09:56:46" 
                name="AI找房" 
                content="您好！我是您的选房师，扎根合肥13年了。全市房源我都很熟悉，很高兴能为您服务。" 
              />
              <ChatMessage 
                role="ai" 
                time="2026-03-04 09:57:10" 
                name="AI找房" 
                content="合肥楼市小阳春回暖明显，最近高新和柏堰湖板块关注度很高。您是看120平左右的三居室吗？这类优质房源卖得快，我可以为您筛选对比下。" 
              />
              <ChatMessage 
                role="user" 
                time="2026-03-04 10:03:11" 
                name="鹏 | AI找房" 
                content="筛选下" 
              />
              <ChatMessage 
                role="user" 
                time="2026-03-04 10:05:28" 
                name="鹏 | AI找房" 
                content="200万以内" 
              />
              <ChatMessage 
                role="ai" 
                time="2026-03-04 10:05:07" 
                name="AI找房" 
                content="好的，没问题。这两个板块目前有不少高性价比的急售房源。为了帮您精准匹配，咱们总价预算大概是控制在200万左右，还是300万以上呢？" 
              />
              
              <div className="text-center text-xs text-zinc-400 my-2">2026-03-04 10:06:22 AI转运营</div>
              
              <ChatMessage 
                role="ai" 
                time="2026-03-04 10:06:22" 
                name="运营-查妍碧" 
                isHumanOp 
                content="咱们想看多大面积的，青龙岗附近有新房可考虑看看？" 
              />
              <ChatMessage 
                role="ai" 
                time="2026-03-04 10:06:20" 
                name="运营-查妍碧" 
                isHumanOp 
                content="好的，您的需求已了解。我这就为您筛选近期调价的优质房源，重点对比下高性价比的户型，整理好后发您，请稍候。" 
              />
              <ChatMessage 
                role="user" 
                time="2026-03-04 10:07:54" 
                name="鹏 | AI找房" 
                content="120左右 不考虑 主要考虑柏堰湖区域" 
              />
            </div>
           </div>

           {/* Right Panel: Customer Profile */}
          <div className="w-[280px] border-l border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 bg-white dark:bg-zinc-950">
            <div className="flex flex-wrap gap-x-4 gap-y-2 p-3 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="font-medium text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 pb-1">客户档案</span>
              <span className="text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">客户画像</span>
              <span className="text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">客户行为</span>
              <span className="text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">快捷话术</span>
              <span className="text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">流转记录</span>
              <span className="text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">聊天记录</span>
            </div>
            <div className="p-3 flex justify-end">
              <button className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                <RefreshCw size={12} /> 刷新
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <ProfileField label="意向价格" value="200万以内" type="固定" time="2026-03-04 10:18:35" />
              <ProfileField label="意向购房面积/户型" value="120平左右" type="固定" time="2026-03-04 10:18:35" />
              <ProfileField label="用户交易偏好" value="买房" type="固定" time="2026-03-04 10:18:35" />
              <ProfileField label="用户所在城市" value="合肥" type="固定" time="2026-03-04 10:18:35" />
              <ProfileField label="意向区域" value="柏堰湖区域" type="固定" time="2026-03-04 10:18:35" />
              <ProfileField label="订阅行为" value="是" type="动态" time="2026-03-04 10:18:35" />
              <ProfileField label="价格敏感度" value="高敏感度" type="动态" time="2026-03-04 10:18:35" />
            </div>
          </div>
        </div>
      );
    }
    
    if (activeTab.title.includes('合肥100w学区房')) {
      return (
        <div className="w-full h-full bg-white dark:bg-zinc-950 flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{activeTab.title}</h2>
              <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                <span>预估人数: 1,285 人</span>
                <span>|</span>
                <span>圈选条件: 合肥市/意向价格100-200万/学区房</span>
                <span>|</span>
                <span>创建时间: 2026-03-05 10:00:00</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">客户昵称</th>
                    <th className="px-4 py-3 font-medium">城市/区域</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {['张三', '李四', '王五', '赵六', '钱七'].map((name, i) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20">
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{name}</td>
                      <td className="px-4 py-3 text-zinc-500">合肥市</td>
                      <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline" onClick={() => setSelectedUser(name)}>查看档案</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Profile Drawer */}
          <AnimatePresence>
            {selectedUser && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedUser(null)}
                  className="absolute inset-0 bg-black z-10"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute right-0 top-0 bottom-0 w-[320px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 z-20 shadow-xl flex flex-col"
                >
                  <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">客户档案</h3>
                    <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg font-bold">
                        {selectedUser[0]}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{selectedUser}</div>
                        <div className="text-xs text-zinc-500">合肥市 | 意向客户</div>
                      </div>
                    </div>
                    <ProfileField label="意向价格" value="100万左右" type="固定" time="2026-03-05 10:05:22" />
                    <ProfileField label="购房需求" value="学区房" type="固定" time="2026-03-05 10:05:22" />
                    <ProfileField label="预算范围" value="80-120万" type="动态" time="2026-03-05 10:06:15" />
                    <ProfileField label="关注区域" value="政务区、滨湖区" type="动态" time="2026-03-05 10:07:30" />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      );
    }
    
    if (activeTab.title.includes('每日私聊推送_活动话术1')) {
      return (
        <div className="w-full h-full bg-white dark:bg-zinc-950 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-4 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Send size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{activeTab.title}</h2>
              <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
                 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 状态: 待执行</span>
                 <span>|</span>
                 <span>创建时间: 2026-03-05 10:30:00</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Basic Info */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 space-y-4 bg-white dark:bg-zinc-900/50">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                基础信息
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">任务ID</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">TASK_20260305_001</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">任务名称</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{activeTab.title.replace('[AI] ', '')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">推送状态</span>
                    <span className="font-medium text-emerald-600">待执行</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">推送时间</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">11:30</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">推送间隔</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">每天</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">创建时间</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">2026-03-05 10:30:00</span>
                </div>
              </div>
            </div>

            {/* Config Info */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 space-y-4 bg-white dark:bg-zinc-900/50">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                配置信息
              </h3>
              <div className="space-y-3 text-sm">
                 <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">通道</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">企微私聊</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">优先级</span>
                    <span className="font-medium text-orange-500">高</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">免打扰时段</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">22:00 - 08:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">关联人群包</span>
                    <span className="font-medium text-indigo-600 cursor-pointer hover:underline">合肥100w学区房</span>
                </div>
                 <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">预估覆盖人数</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">1,285 人</span>
                </div>
              </div>
            </div>

            {/* Sender Config */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 space-y-4 bg-white dark:bg-zinc-900/50">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                发送配置
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">发送人</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">C端客服</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50 dark:border-zinc-800/50">
                    <span className="text-zinc-500">黑名单过滤</span>
                    <span className="font-medium text-zinc-400">无</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 space-y-4 bg-white dark:bg-zinc-900/50">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                推送内容
              </h3>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 leading-relaxed">
                【限时特惠】合肥政务区学区房最新名单已出，点击查看...
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return <div className="p-6">Feature Not Implemented</div>;
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden text-sm relative">
      {/* Thin Left Rail */}
      <div className="w-16 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 gap-4 bg-zinc-50 dark:bg-zinc-900 z-10 shrink-0">
         <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">AI</div>
         <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer transition-colors"></div>
         <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer transition-colors"></div>
         <div className="mt-auto mb-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSidebarOpen ? 'bg-indigo-100 text-indigo-600' : 'text-zinc-400 hover:bg-zinc-100'}`}
            >
              <Bot size={20} />
            </button>
         </div>
      </div>

      {/* Left Panel: Session List */}
      <div className="w-[280px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">全部会话</span>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索客户名称" 
              className="w-full pl-3 pr-8 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs focus:outline-none focus:border-indigo-500"
            />
            <Search size={14} className="absolute right-2.5 top-2 text-zinc-400" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-between px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs cursor-pointer">
              <span className="text-zinc-500">城市</span>
              <span className="flex items-center gap-1">全国 <ChevronDown size={12}/></span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-between px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs cursor-pointer">
              <span className="text-zinc-500">客服名称</span>
              <span className="flex items-center gap-1">请选择 <ChevronDown size={12}/></span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <div className="flex gap-3 text-zinc-500">
              <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">只看我约</span>
              <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100">未读</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
              <Filter size={12} /> 最新消息
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessionList.map((session, i) => (
            <div key={i} className={`flex gap-3 p-3 border-b border-zinc-100 dark:border-zinc-800/50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 ${i === 0 ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/${session.name}/40/40`} alt="avatar" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{session.name}</span>
                  <span className="text-xs text-zinc-400 shrink-0">{session.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 truncate flex-1">{session.msg}</span>
                  {session.tag && (
                    <span className={`text-[10px] px-1 rounded border shrink-0 ${session.tag === 'AI' ? 'text-pink-500 border-pink-200 bg-pink-50 dark:bg-pink-950/30 dark:border-pink-900' : 'text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900'}`}>
                      {session.tag}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel: Tabs and Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 relative">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-2 pt-2 pb-0 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto shrink-0 bg-zinc-50 dark:bg-zinc-900/30">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer whitespace-nowrap border border-b-0 ${
                activeTabId === tab.id 
                  ? 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 font-medium z-10 relative top-[1px]' 
                  : 'bg-zinc-100 dark:bg-zinc-900 border-transparent text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="truncate max-w-[120px]">{tab.title}</span>
              <X 
                size={12} 
                className="text-zinc-400 hover:text-red-500 shrink-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  setTabs(tabs.filter(t => t.id !== tab.id));
                }}
              />
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
           {renderContent()}
        </div>
      </div>

      {/* Copilot Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-[400px] border-l border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl flex flex-col z-40 shadow-2xl"
          >
            <Sidebar 
              onClose={() => setIsSidebarOpen(false)} 
              onOpenTab={openTab} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatMessage({ role, time, name, content, isHumanOp }: { role: 'user' | 'ai', time: string, name: string, content: string, isHumanOp?: boolean }) {
  const isAI = role === 'ai';
  return (
    <div className={`flex flex-col gap-1 ${isAI ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        {isAI ? (
          <>
            <span>{time}</span>
            <span>{name}</span>
            {isHumanOp && <span className="bg-orange-500 text-white px-1 rounded text-[10px]">运营</span>}
          </>
        ) : (
          <>
            <User size={12} />
            <span>{time}</span>
          </>
        )}
      </div>
      <div className="flex gap-2 max-w-[70%]">
        {!isAI && (
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0 mt-1 overflow-hidden">
             <img src="https://picsum.photos/seed/user/32/32" alt="user" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>
        )}
        <div className={`px-4 py-2.5 rounded-2xl text-sm ${isAI ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 rounded-tr-sm' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-tl-sm'}`}>
          {content}
        </div>
        {isAI && (
          <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 mt-1 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
