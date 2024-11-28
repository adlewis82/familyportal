import React from 'react';
import { Trophy, MapPin, Clock } from 'lucide-react';

interface ExtraCurricularActivity {
  activity: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'today' | 'upcoming';
}

interface StudentActivity {
  name: string;
  extraCurricular: ExtraCurricularActivity[];
}

interface ExtraCurricularWidgetProps {
  data: {
    students: StudentActivity[];
  };
}

const ExtraCurricularWidget: React.FC<ExtraCurricularWidgetProps> = ({ data }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
          <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-300" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Extracurricular Activities</h2>
      </div>
      <div className="space-y-6">
        {data.students.map((student) => (
          student.extraCurricular?.map((activity, index) => (
            <div 
              key={`${student.name}-${index}`} 
              className="py-3 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">{student.name}</span>
                  <span className="text-sm text-gray-500 dark:text-slate-400">•</span>
                  <span className="text-purple-600 dark:text-purple-300 font-medium">{activity.activity}</span>
                  <div className="flex-grow" />
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'today' 
                      ? 'bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300' 
                      : 'bg-blue-50 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-300'
                  }`}>
                    {activity.status === 'today' ? 'Today' : 'Upcoming'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {activity.status === 'today' ? 'Today' : activity.date},{' '}
                      {activity.startTime} to {activity.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{activity.location}</span>
                  </div>
                </div>
              </div>
              {index < student.extraCurricular.length - 1 && (
                <div className="mt-3 border-b border-gray-100 dark:border-slate-700" />
              )}
            </div>
          ))
        ))}
        {data.students.length === 0 || data.students.every(student => !student.extraCurricular?.length) && (
          <div className="text-center text-gray-500 dark:text-slate-400 py-4">
            No extracurricular activities scheduled
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraCurricularWidget;