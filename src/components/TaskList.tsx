import React from 'react';
import { Task } from '../types';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void; // Correctly defined onDelete prop
  // Add this line
}

export default function TaskList({ tasks, onComplete, onDelete }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onComplete(task.id)}
              className={clsx(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              )}
            >
              {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
            </button>
            <div>
              <h3 className={clsx('text-lg font-medium', 
                task.completed && 'line-through text-gray-500'
              )}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                </span>
                <span className={clsx(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getPriorityColor(task.priority)
                )}>
                  {task.priority}
                </span>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => onDelete(task.id)} // Ensure onDelete is called
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {new Date(task.due_date) < new Date() && !task.completed && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      ))}
    </div>
  );
}
