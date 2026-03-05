import React, { useState } from 'react';
import { Users, Filter, Send, Check, ChevronDown } from 'lucide-react';
import { CardData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export function AudienceCard({ data, onUserClick, onConfirm }: { data: Extract<CardData, { type: 'audience' }>, onUserClick: (name: string) => void, onConfirm: () => void }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm relative">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users size={16} />
            </div>
            人群预览
          </div>
          <div className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
            预估 {data.count.toLocaleString()} 人
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-zinc-500">抽样客户 (点击查看档案)</div>
          <div className="flex flex-wrap gap-2">
            {data.samples.map((sample, i) => (
              <button 
                key={i}
                onClick={() => onUserClick(sample)}
                className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-700 dark:text-zinc-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onConfirm}
          disabled={data.confirmed}
          className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors mt-2 ${
            data.confirmed 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800/50' 
              : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100'
          }`}
        >
          {data.confirmed ? (
            <><Check size={16} /> 已确认创建</>
          ) : (
            '确认创建人群包'
          )}
        </button>
      </div>
    </div>
  );
}

export function ConfigCard({ data, onConfirm }: { data: Extract<CardData, { type: 'config' }>, onConfirm: () => void }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Send size={16} />
          </div>
          推送任务配置
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-500">发送人选择</label>
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
              <span className="text-zinc-700 dark:text-zinc-300">已选: {data.senders.join(', ')}</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-500">黑名单过滤</label>
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
              <span className="text-zinc-400">请选择过滤人群...</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </div>
          </div>
        </div>

        <button 
          onClick={onConfirm}
          disabled={data.confirmed}
          className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            data.confirmed 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800/50' 
              : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100'
          }`}
        >
          {data.confirmed ? (
            <><Check size={16} /> 已确认推送</>
          ) : (
            '确认推送'
          )}
        </button>
      </div>
    </div>
  );
}
