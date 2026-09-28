import React, { useState } from 'react';
import {
  Code2,
  Database,
  Coffee,
  Cpu,
  Layout,
  Palette,
  Search,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { COURSES } from '../../data/mockData';

export const LearnCatalogView: React.FC = () => {
  const { navigateTo, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const courseIcons: Record<string, React.ReactNode> = {
    'course-python': <Code2 className="w-6 h-6 text-emerald-400" />,
    'course-sql': <Database className="w-6 h-6 text-sky-400" />,
    'course-java': <Coffee className="w-6 h-6 text-amber-400" />,
    'course-c': <Cpu className="w-6 h-6 text-purple-400" />,
    'course-html': <Layout className="w-6 h-6 text-orange-400" />,
    'course-css': <Palette className="w-6 h-6 text-blue-400" />,
  };

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'backend', label: 'Core & Logic' },
    { id: 'database', label: 'Databases' },
    { id: 'systems', label: 'Low-Level Systems' },
    { id: 'web', label: 'Frontend Web' },
  ];

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'backend')
      return matchesSearch && (c.slug === 'python' || c.slug === 'java');
    if (selectedCategory === 'database') return matchesSearch && c.slug === 'sql';
    if (selectedCategory === 'systems') return matchesSearch && c.slug === 'c';
    if (selectedCategory === 'web')
      return matchesSearch && (c.slug === 'html' || c.slug === 'css');
    return matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
          Curriculum Library
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Learn</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Course-first learning architecture. Master syntax, memory architecture, algorithmic
          paradigms, and interview problem-solving with full roadmaps.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search topics, syntax, or concepts..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Categories (Functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isPython = course.slug === 'python';
          const progressPercent = isPython ? 40 : 0;

          return (
            <Card
              key={course.id}
              variant="interactive"
              className="flex flex-col justify-between"
              onClick={() => {
                if (isPython) {
                  navigateTo({ type: 'course', courseId: 'course-python' });
                } else {
                  navigateTo({ type: 'course', courseId: course.id });
                }
              }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                    {courseIcons[course.id]}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">{course.difficulty}</span>
                    {isPython && (
                      <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                        Active Track
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5">{course.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{course.description}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {isPython ? (
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                      <span>4 / 10 Topics Completed</span>
                      <span className="text-emerald-400 font-semibold">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} size="sm" color="emerald" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {course.totalModules} Modules
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{course.estimatedHours}h
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-slate-400">
                    {course.totalProblems} Problems + Final Test
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                    {isPython ? 'Continue Roadmap' : 'Explore Course'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
