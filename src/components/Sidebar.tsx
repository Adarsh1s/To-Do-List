import React, { useState } from 'react';
import { Calendar, CheckCircle2, LayoutDashboard, ListTodo, Tag, X, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { List, Tag as TagType } from '../types';

interface SidebarProps {
  onClose: () => void;
  lists: List[];
  tags: TagType[];
  onAddList: (name: string) => void;
  onAddTag: (name: string) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Calendar', href: '/calendar', icon: Calendar },

  { name: 'Completed', href: '/completed', icon: CheckCircle2 },
];

export default function Sidebar({ onClose, lists, tags, onAddList, onAddTag }: SidebarProps) {
  const location = useLocation();
  const [newListName, setNewListName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      onAddList(newListName.trim());
      setNewListName('');
      setIsAddingList(false);
    }
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName('');
      setIsAddingTag(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">To-Do List</h1>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  location.pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200">
          <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            LISTS
          </h2>
          <div className="mt-3 space-y-1">
            {lists.map((list) => (
              <Link
                key={list.id}
                to={`/lists/${list.id}`}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <span>{list.name}</span>
                <span className={clsx('px-2 py-1 text-xs rounded-full', list.color)}>
                  {/* Count will be implemented later */}
                  0
                </span>
              </Link>
            ))}
            {isAddingList ? (
              <form onSubmit={handleAddList} className="px-3 py-2">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List name"
                  className="w-full px-2 py-1 text-sm border rounded"
                  autoFocus
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingList(false)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingList(true)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full rounded-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New List
              </button>
            )}
          </div>
        </div>

        <div className="px-3 py-4 border-t border-gray-200">
          <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            TAGS
          </h2>
          <div className="mt-3 space-y-1">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tags/${tag.id}`}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                {tag.name}
              </Link>
            ))}
            {isAddingTag ? (
              <form onSubmit={handleAddTag} className="px-3 py-2">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag name"
                  className="w-full px-2 py-1 text-sm border rounded"
                  autoFocus
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(false)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingTag(true)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full rounded-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Tag
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}