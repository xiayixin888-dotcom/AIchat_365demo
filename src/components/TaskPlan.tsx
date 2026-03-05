import React from 'react';
import { TaskItem } from '../types';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function TaskPlan({ tasks }: { tasks: TaskItem[] }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        执行计划
      </div>
      <div className="p-3 flex flex-col gap-3">
        {tasks.map((task, index) => (
          <motion.div 
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2 text-sm"
          >
            <div className="mt-0.5 shrink-0">
              {task.status === 'done' && <CheckCircle2 size={16} className="text-emerald-500" />}
              {task.status === 'loading' && <Loader2 size={16} className="text-indigo-500 animate-spin" />}
              {task.status === 'wait' && <Circle size={16} className="text-zinc-300 dark:text-zinc-600" />}
            </div>
            <span className={`${task.status === 'done' ? 'text-zinc-500 dark:text-zinc-400 line-through decoration-zinc-300 dark:decoration-zinc-600' : 'text-zinc-800 dark:text-zinc-200'}`}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
