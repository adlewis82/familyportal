import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface ClassInfo {
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
}

interface Schedule {
  student: string;
  current_class: ClassInfo;
  next_class: ClassInfo;
}

interface ClassBlockProps {
  currentClass: ClassInfo & { student?: string };
  nextClass: ClassInfo;
  showStudent: boolean;
}

interface TimetableWidgetProps {
  data: {
    schedules: Schedule[];
  };
}

const ClassBlock: React.FC<ClassBlockProps> = ({ currentClass, nextClass, showStudent }) => (
  <div className="py-4 first:pt-0 last:pb-0">
    <div className="flex items-center gap-6">
      {showStudent && (
        <div className="w-24">
          <span className="font-medium text-gray-900 dark:text-white">{currentClass.student}</span>
        </div>
      )}

      <div className="flex-1 px-4">
        <div>
          <span className="text-xs font-medium px-2 py-1 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-full">
            Current
          </span>
          <div className="mt-2 flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">{currentClass.subject}</span>
            <span className="text-sm text-gray-500 dark:text-slate-400">{currentClass.teacher}</span>
            <span className="text-sm text-gray-400 dark:text-slate-500">
              {currentClass.startTime} - {currentClass.endTime}
            </span>
          </div>
        </div>
      </div>

      <div className="text-gray-300 dark:text-slate-600">
        <ArrowRight className="w-5 h-5" />
      </div>

      <div className="flex-1 px-4">
        <div>
          <span className="text-xs font-medium px-2 py-1 bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 rounded-full">
            Next
          </span>
          <div className="mt-2 flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">{nextClass.subject}</span>
            <span className="text-sm text-gray-500 dark:text-slate-400">{nextClass.teacher}</span>
            <span className="text-sm text-gray-400 dark:text-slate-500">
              {nextClass.startTime} - {nextClass.endTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TimetableWidget: React.FC<TimetableWidgetProps> = ({ data }) => {
  const showStudentColumn = data.schedules.length > 1;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Class Schedule</h2>
          {data.schedules.length === 1 && (
            <p className="text-sm text-gray-500 dark:text-slate-400">{data.schedules[0].student}</p>
          )}
        </div>
      </div>

      <div className="flex gap-6 mb-4 px-1">
        {showStudentColumn && (
          <div className="w-24">
            <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Student</span>
          </div>
        )}
        <div className="flex-1 px-4">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Current Class</span>
        </div>
        <div className="w-5"></div>
        <div className="flex-1 px-4">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Next Class</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {data.schedules.map((schedule, index) => (
          <ClassBlock
            key={index}
            currentClass={{
              ...schedule.current_class,
              student: schedule.student
            }}
            nextClass={schedule.next_class}
            showStudent={showStudentColumn}
          />
        ))}
      </div>

      {data.schedules.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-slate-400">
          No classes scheduled
        </div>
      )}
    </div>
  );
};

export default TimetableWidget;