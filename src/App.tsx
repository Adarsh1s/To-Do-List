import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import NewTaskModal from './components/NewTaskModal';
import { Task, TaskStats, List, Tag as TagType } from './types';
import { Plus, Search, Menu } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Initialize with some mock data
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Research content ideas',
        description: 'Brainstorm and research new content topics',
        due_date: '2024-03-20',
        priority: 'high',
        completed: false,
        tags: ['work', 'urgent'],
        created_at: '2024-03-15',
        user_id: '1',
      },
      {
        id: '2',
        title: 'Create database of guest authors',
        description: 'Compile list of potential guest authors',
        due_date: '2024-03-22',
        priority: 'medium',
        completed: false,
        tags: ['work', 'research'],
        created_at: '2024-03-15',
        user_id: '1',
      },
      {
        id: '3',
        title: 'Renew driver\'s license',
        description: 'Visit DMV for license renewal',
        due_date: '2024-03-22',
        priority: 'high',
        completed: false,
        tags: ['personal'],
        created_at: '2024-03-15',
        user_id: '1',
      },
    ];

    setTasks(mockTasks);
    updateStats(mockTasks);
  }, []);

  const updateStats = (taskList: Task[]) => {
    const now = new Date();
    setStats({
      total: taskList.length,
      completed: taskList.filter(t => t.completed).length,
      pending: taskList.filter(t => !t.completed).length,
      overdue: taskList.filter(t => !t.completed && new Date(t.due_date) < now).length,
    });
  };

  const handleComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateStats(updatedTasks);
  };

  const handleDelete = (taskId: string) => {
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  setTasks(updatedTasks);
  updateStats(updatedTasks);
};

const handleAddTask = (newTask: Omit<Task, 'id' | 'created_at' | 'user_id'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      user_id: '1', // In a real app, this would come from authentication
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    updateStats(updatedTasks);
  };

  const handleAddList = (name: string) => {
    const newList: List = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      color: 'bg-blue-100 text-blue-800', // Default color
      user_id: '1',
    };
    setLists([...lists, newList]);
  };

  const handleAddTag = (name: string) => {
    const newTag: TagType = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      color: 'bg-gray-100 text-gray-800', // Default color
      user_id: '1',
    };
    setTags([...tags, newTag]);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
            isSidebarOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            lists={lists}
            tags={tags}
            onAddList={handleAddList}
            onAddTag={handleAddTag}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 ml-2">Today</h1>
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {filteredTasks.length}
                </span>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-700"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Task</span>
              </button>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={
                <>
                  <Analytics
                    stats={stats}
                    tasksByPriority={[
                      { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
                      { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
                      { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
                    ]}
                  />
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h2>
                    <TaskList tasks={filteredTasks} onComplete={handleComplete} onDelete={handleDelete} />
                  </div>
                </>
              } />
              <Route path="/calendar" element={<Calendar tasks={tasks} />} />
              <Route path="/tasks" element={<TaskList tasks={filteredTasks} onComplete={handleComplete} />} />
              <Route path="/completed" element={<TaskList tasks={tasks.filter(t => t.completed)} onComplete={handleComplete} />} />
              <Route path="/tags/:tagId" element={<TaskList tasks={filteredTasks} onComplete={handleComplete} />} />
              <Route path="/lists/:listId" element={<TaskList tasks={filteredTasks} onComplete={handleComplete} />} />
            </Routes>
          </main>
        </div>

        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          onSubmit={handleAddTask}
          availableTags={tags}
          availableLists={lists}
        />
      </div>
    </Router>
  );
}

export default App;
