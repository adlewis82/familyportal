import { useState, useEffect } from "react";
import YearAttendanceWidget from "~/components/YearAttendanceWidget";
import HomeworkWidget from "~/components/HomeworkWidget";
import NowNextClassWidget from "~/components/NowNextClassWidget";
import PlannedAbsenceWidget from "~/components/PlannedAbsenceWidget";
import ExtraCurricularWidget from "~/components/ExtraCurricularWidget";
import PhotoWidget from "~/components/PhotoWidget";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AlertCircle, Clock, ChevronDown, Moon, Sun } from "lucide-react";
import { dashboardData } from "~/data/dashboard-data";

export const meta: MetaFunction = () => {
  return [
    { title: "Nord Anglia Family Portal" },
    { name: "description", content: "Welcome to the Nord Anglia Family Portal" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
  ];
};

const transformDataForWidgets = (data: typeof dashboardData, selectedStudent: string | null) => {
  const filteredStudents = selectedStudent === 'all'
    ? data.students
    : data.students.filter(student => student.name === selectedStudent);

  return {
    homeworkData: {
      assignments: filteredStudents.flatMap(student =>
        student.homework.map(hw => ({
          student: student.name,
          subject: hw.subject,
          title: hw.title,
          teacher: hw.teacher,
          setDate: hw.setDate,
          dueDate: hw.dueDate,
          status: hw.status
        }))
      )
    },

    scheduleData: {
      schedules: filteredStudents.map(student => ({
        student: student.name,
        current_class: {
          ...student.currentClass,
          startTime: student.currentClass.timeSlot.split(' - ')[0],
          endTime: student.currentClass.timeSlot.split(' - ')[1],
          student: student.name
        },
        next_class: {
          ...student.nextClass,
          startTime: student.nextClass.timeSlot.split(' - ')[0],
          endTime: student.nextClass.timeSlot.split(' - ')[1]
        }
      }))
    },

    absencesData: {
      planned: filteredStudents.flatMap(student =>
        student.absences.map(absence => ({
          student: student.name,
          startTime: absence.startTime,
          endTime: absence.endTime,
          startDate: absence.date,
          endDate: absence.endDate || absence.date,
          reason: absence.reason,
          type: absence.type
        }))
      )
    },

    attendanceData: {
      students: filteredStudents.map(student => ({
        name: student.name,
        year: {
          percentage: (student.attendance.year.present / student.attendance.year.total) * 100,
          total: student.attendance.year.total
        },
        term: {
          percentage: (student.attendance.term.present / student.attendance.term.total) * 100,
          total: student.attendance.term.total
        }
      }))
    },

    extraCurricularData: {
      students: filteredStudents.map(student => ({
        name: student.name,
        extraCurricular: student.extraCurricular || []
      }))
    },

    photoData: {
      photos: filteredStudents.flatMap(student =>
        (student.photos || []).map(photo => ({
          ...photo,
          student: student.name
        }))
      )
    }
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const transformedData = transformDataForWidgets(dashboardData, 'all');
  return json({
    rawData: dashboardData,
    ...transformedData
  });
};

const DarkModeButton = ({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <Sun className="h-5 w-5 text-yellow-500" />
    ) : (
      <Moon className="h-5 w-5 text-gray-500" />
    )}
  </button>
);

interface StudentSelectorProps {
  students: string[];
  selectedStudent: string;
  onStudentChange: (student: string) => void;
}

const StudentSelector = ({ students, selectedStudent, onStudentChange }: StudentSelectorProps) => (
  <div className="relative">
    <select
      value={selectedStudent}
      onChange={(e) => onStudentChange(e.target.value)}
      className="appearance-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 dark:text-slate-300 shadow-sm hover:border-gray-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      <option value="all">All</option>
      {students.map(student => (
        <option key={student} value={student}>{student}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-slate-400">
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

export default function Index() {
  const { rawData, attendanceData, homeworkData, scheduleData, absencesData, photoData } = useLoaderData<typeof loader>();
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const transformedData = transformDataForWidgets(rawData, selectedStudent);
  const studentNames = rawData.students.map(student => student.name);
  const widgetConfig = rawData.config.widgets;

  // Render widgets in the exact order from config
  const renderWidgets = () => {
    return Object.keys(widgetConfig).map(key => {
      const widgetProps = {
        yearAttendance: {
          component: <YearAttendanceWidget data={transformedData.attendanceData} />,
          visible: widgetConfig.yearAttendance.visible
        },
        homework: {
          component: <HomeworkWidget data={transformedData.homeworkData} />,
          visible: widgetConfig.homework.visible
        },
        nowNextClass: {
          component: <NowNextClassWidget data={transformedData.scheduleData} />,
          visible: widgetConfig.nowNextClass.visible
        },
        plannedAbsence: {
          component: <PlannedAbsenceWidget data={{ ...transformedData.absencesData, students: studentNames }} />,
          visible: widgetConfig.plannedAbsence.visible
        },
        extracurricular: {
          component: <ExtraCurricularWidget data={transformedData.extraCurricularData} />,
          visible: widgetConfig.extracurricular.visible
        },
        photos: {
          component: <PhotoWidget data={transformedData.photoData} />,
          visible: widgetConfig.photos.visible
        }
      }[key];

      if (!widgetProps?.visible) return null;

      return (
        <div key={key} className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg">
          {widgetProps.component}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <div className="flex flex-col items-center justify-start gap-8 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="text-center w-full max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-grow text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-montserrat transition-colors">
                Nord Anglia Family Portal (vAlpha)
              </h1>
            </div>
            <DarkModeButton darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600 dark:text-slate-300 transition-colors">
            <p className="text-sm sm:text-base">
              Welcome back, {rawData.parent.name}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 transition-colors">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date(rawData.meta.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <div className="w-full max-w-screen-xl mx-auto">
          {/* Student Selector */}
          <div className="flex justify-end mb-4">
            <StudentSelector
              students={studentNames}
              selectedStudent={selectedStudent}
              onStudentChange={setSelectedStudent}
            />
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2">
            {renderWidgets()}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-screen-xl mx-auto mt-auto">
          <p className="text-center text-sm text-gray-500 dark:text-slate-400 transition-colors">
            © {new Date().getFullYear()} Nord Anglia Education. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}