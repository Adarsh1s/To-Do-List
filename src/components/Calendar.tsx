import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { format } from 'date-fns';
import { Task } from '../types';
import clsx from 'clsx';

interface CalendarProps {
  tasks: Task[];
}

export default function Calendar({ tasks }: CalendarProps) {
  const getTileContent = ({ date }: { date: Date }) => {
    const dayTasks = tasks.filter(
      task => format(new Date(task.due_date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (dayTasks.length === 0) return null;

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high':
          return 'bg-red-500';
        case 'medium':
          return 'bg-yellow-500';
        case 'low':
          return 'bg-green-500';
        default:
          return 'bg-gray-500';
      }
    };

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {dayTasks.map((task) => (
          <div
            key={task.id}
            className={clsx(
              'w-2 h-2 rounded-full',
              getPriorityColor(task.priority)
            )}
            title={task.title}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <ReactCalendar
        className="w-full"
        tileContent={getTileContent}
        tileClassName="flex flex-col items-center"
      />
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 mb-2">Priority Legend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <span className="text-sm text-gray-600">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-sm text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}