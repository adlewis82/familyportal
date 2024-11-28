import React from 'react';
import { BookOpen } from 'lucide-react';

interface Assignment {
  student: string;
  subject: string;
  title: string;
  teacher: string;
  setDate: string;
  dueDate: string;
  status: string;
}

interface AssignmentRowProps {
  student: string;
  subject: string;
  homework: string;
  teacher: string;
  setDate: string;
  dueDate: string;
  status: string;
  showStudent: boolean;
}

interface HomeworkWidgetProps {
  data: {
    assignments: Assignment[];
  };
}

const AssignmentRow: React.FC<AssignmentRowProps> = ({ 
  student, 
  subject, 
  homework, 
  teacher, 
  setDate, 
  dueDate, 
  status, 
  showStudent 
}) => (
  <div className="py-4 first:pt-0 last:pb-0">
    <div className="flex items-center gap-6">
      {showStudent && (
        <div className="w-24">
          <span className="font-medium text-gray-900 dark:text-white">{student}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm px-2 py-0.5 bg-violet-50 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 rounded">
            {subject}
          </span>
        </div>
        <span className="font-medium text-gray-900 dark:text-white mt-1">{homework}</span>
        <span className="text-sm text-gray-500 dark:text-slate-400">{teacher}</span>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex flex-col text-sm">
          <span className="text-gray-500 dark:text-slate-400">Set:</span>
          <span className="text-gray-900 dark:text-white">{setDate}</span>
        </div>
        <div className="text-gray-300 dark:text-slate-600">→</div>
        <div className="flex flex-col text-sm">
          <span className="text-gray-500 dark:text-slate-400">Due:</span>
          <span className="text-gray-900 dark:text-white">{dueDate}</span>
        </div>
      </div>

      <div className="w-28 flex justify-end">
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${status.toLowerCase() === 'submitted' 
            ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' 
            : 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300'
          }`}>
          {status}
        </span>
      </div>
    </div>
  </div>
);

const HomeworkWidget: React.FC<HomeworkWidgetProps> = ({ data }) => {
  const showStudentColumn = data.assignments.length > 1;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-violet-100 dark:bg-violet-500/20 rounded-full flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Homework</h2>
          {data.assignments.length === 1 && (
            <p className="text-sm text-gray-500 dark:text-slate-400">{data.assignments[0].student}</p>
          )}
        </div>
      </div>

      <div className="flex gap-6 mb-4 px-1">
        {showStudentColumn && (
          <div className="w-24">
            <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Student</span>
          </div>
        )}
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Details</span>
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Dates</span>
        </div>
        <div className="w-28 text-right">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Status</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {data.assignments.map((assignment, index) => (
          <AssignmentRow
            key={index}
            student={assignment.student}
            subject={assignment.subject}
            homework={assignment.title}
            teacher={assignment.teacher}
            setDate={assignment.setDate}
            dueDate={assignment.dueDate}
            status={assignment.status}
            showStudent={showStudentColumn}
          />
        ))}
      </div>

      {data.assignments.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-slate-400">
          No homework assignments
        </div>
      )}
    </div>
  );
};

export default HomeworkWidget;