import React from 'react';
import { UserCheck } from 'lucide-react';

interface CircleProgressProps {
  present: number;
  totalRegistrations: number;
  radius?: number;
}

interface AttendanceRowProps {
  student: string;
  yearData: {
    percentage: number;
    total: number;
  };
  termData: {
    percentage: number;
    total: number;
  };
  showStudent: boolean;
}

interface AttendanceWidgetProps {
  data: {
    students: Array<{
      name: string;
      year: {
        percentage: number;
        present: number;
        absent: number;
        total: number;
      };
      term: {
        percentage: number;
        present: number;
        absent: number;
        total: number;
      };
    }>;
  };
}

const CircleProgress: React.FC<CircleProgressProps> = ({ present, totalRegistrations, radius = 35 }) => {
  const circumference = 2 * Math.PI * radius;
  const presentPercentage = present;
  const absentPercentage = 100 - present;
  
  const presentDash = `${(presentPercentage / 100) * circumference} ${circumference}`;
  const absentOffset = (presentPercentage / 100) * circumference;
  const absentDash = `${(absentPercentage / 100) * circumference} ${circumference}`;
  
  const presentCount = Math.round((presentPercentage / 100) * totalRegistrations);
  const absentCount = totalRegistrations - presentCount;
  
  return (
    <div className="relative w-28 h-28 group">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none stroke-gray-100 dark:stroke-slate-700"
          strokeWidth="12"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none stroke-emerald-400"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={presentDash}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none stroke-amber-400"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={absentDash}
          strokeDashoffset={-absentOffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(presentPercentage)}%</span>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-slate-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Present: {presentCount} registrations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Absent: {absentCount} registrations</span>
          </div>
          <div className="text-gray-400 dark:text-slate-400 text-xs">
            Total: {totalRegistrations} registrations
          </div>
        </div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-slate-800 rotate-45"></div>
      </div>
    </div>
  );
};

const AttendanceRow: React.FC<AttendanceRowProps> = ({ student, yearData, termData, showStudent }) => (
  <div className="py-4 first:pt-0 last:pb-0">
    <div className="flex items-center">
      {showStudent && (
        <div className="w-24">
          <span className="font-medium text-gray-900 dark:text-white">{student}</span>
        </div>
      )}
      <div className="flex-1 flex justify-around">
        <div className="flex flex-col items-center">
          <CircleProgress 
            present={yearData.percentage} 
            totalRegistrations={yearData.total} 
          />
          <span className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">Year</span>
        </div>
        <div className="flex flex-col items-center">
          <CircleProgress 
            present={termData.percentage} 
            totalRegistrations={termData.total} 
          />
          <span className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">Term</span>
        </div>
      </div>
    </div>
  </div>
);

const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({ data }) => {
  const showStudentColumn = data.students.length > 1;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Attendance Overview</h2>
          {data.students.length === 1 && (
            <p className="text-sm text-gray-500 dark:text-slate-400">{data.students[0].name}</p>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {data.students.map((student, index) => (
          <AttendanceRow
            key={index}
            student={student.name}
            yearData={{
              percentage: student.year.percentage,
              total: student.year.total
            }}
            termData={{
              percentage: student.term.percentage,
              total: student.term.total
            }}
            showStudent={showStudentColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default AttendanceWidget;