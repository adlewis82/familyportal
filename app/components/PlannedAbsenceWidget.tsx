import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { dashboardData } from './data/dashboard-data';

interface PlannedAbsencesWidgetProps {
  data: {
    students: string[];
    planned: Array<{
      student: string;
      startDate: string;
      endDate?: string;
      startTime: string;
      endTime: string;
      reason: string;
      type: string;
    }>;
  };
}

const AbsenceRow = ({ student, startDate, startTime, endDate, endTime, reason, showStudent }) => {
  const isMultiDay = startDate !== endDate;
  return (
    <div className="py-3 first:pt-0 last:pb-0 border-b last:border-0 border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 min-w-0">
        {showStudent && (
          <div className="w-20 flex-shrink-0">
            <span className="font-medium text-gray-900 dark:text-white">{student}</span>
          </div>
        )}
        <div className="flex-shrink min-w-0 px-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium text-gray-900 dark:text-white">
              {startTime}
            </span>
            <span className="text-gray-400 dark:text-slate-500">
              {startDate}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-slate-400 truncate">
            {reason}
          </div>
        </div>
        <div className="text-gray-300 dark:text-slate-600 flex-shrink-0 px-2">
          →
        </div>
        <div className="flex-shrink min-w-0 px-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-medium text-gray-900 dark:text-white">
              {endTime}
            </span>
            <span className="text-gray-400 dark:text-slate-500">
              {isMultiDay ? endDate : 'Same day'}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-full whitespace-nowrap">
              {isMultiDay ? 'Multi-day' : 'Single day'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ selectedStudent }: { selectedStudent?: string }) => (
  <div className="py-8 text-center">
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
        <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-300" />
      </div>
      <h3 className="font-medium text-gray-900 dark:text-white">
        {selectedStudent && selectedStudent !== 'all'
          ? `No planned absences for ${selectedStudent}`
          : "No planned absences"}
      </h3>
      {selectedStudent && selectedStudent !== 'all' ? (
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Switch to 'All Students' to see other absences
        </p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-slate-400">
          To register an absence please use the button below
        </p>
      )}
    </div>
  </div>
);

const RegisterAbsenceForm = ({
  isOpen,
  onClose,
  students
}: {
  isOpen: boolean;
  onClose: () => void;
  students: string[];
}) => {
  const [formData, setFormData] = useState<RegisterAbsenceFormData>({
    student: '',
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    reason: '',
    moreInfo: ''
  });

  const [errors, setErrors] = useState<Partial<RegisterAbsenceFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<RegisterAbsenceFormData> = {};
    if (!formData.student) newErrors.student = 'Student is required';
    if (!formData.fromDate) newErrors.fromDate = 'From date is required';
    if (!formData.toDate) newErrors.toDate = 'To date is required';
    if (!formData.reason) newErrors.reason = 'Reason is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 font-montserrat text-gray-900 dark:text-white">Register Absence</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Student*
            </label>
            <select
              value={formData.student}
              onChange={(e) => setFormData({...formData, student: e.target.value})}
              className={`w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white
                ${errors.student ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
            >
              <option value="" disabled>--please select--</option>
              {students.map(student => (
                <option key={student} value={student}>{student}</option>
              ))}
            </select>
            {errors.student && <p className="mt-1 text-sm text-red-500">{errors.student}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                From Date*
              </label>
              <input
                type="date"
                value={formData.fromDate}
                onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white
                  ${errors.fromDate ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
              />
              {errors.fromDate && <p className="mt-1 text-sm text-red-500">{errors.fromDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                From Time
              </label>
              <input
                type="time"
                value={formData.fromTime || ''}
                onChange={(e) => setFormData({...formData, fromTime: e.target.value})}
                className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                To Date*
              </label>
              <input
                type="date"
                value={formData.toDate}
                onChange={(e) => setFormData({...formData, toDate: e.target.value})}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white
                  ${errors.toDate ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
              />
              {errors.toDate && <p className="mt-1 text-sm text-red-500">{errors.toDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                To Time
              </label>
              <input
                type="time"
                value={formData.toTime || ''}
                onChange={(e) => setFormData({...formData, toTime: e.target.value})}
                className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Reason*
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value as RegisterAbsenceFormData['reason']})}
              className={`w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white
                ${errors.reason ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
            >
              <option value="" disabled>--please select--</option>
              <option value="Doctor">Doctor</option>
              <option value="Dentist">Dentist</option>
              <option value="Illness">Illness</option>
            </select>
            {errors.reason && <p className="mt-1 text-sm text-red-500">{errors.reason}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              More Information
            </label>
            <textarea
              value={formData.moreInfo}
              onChange={(e) => setFormData({...formData, moreInfo: e.target.value})}
              className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-gray-300 dark:border-slate-600 h-24"
              placeholder="Add any additional details here..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              Register Absence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PlannedAbsencesWidget = ({ data }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const showStudentColumn = data.planned.length > 1;
  const selectedStudent = data.planned[0]?.student;
  const students = data.students || [];

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold font-montserrat text-gray-900 dark:text-white">Planned Absences</h2>
          {data.planned.length === 1 && (
            <p className="text-sm text-gray-500 dark:text-slate-400">{data.planned[0].student}</p>
          )}
        </div>
      </div>

      <div className="flex-grow">
        {data.planned.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {data.planned.map((absence, index) => (
              <AbsenceRow
                key={index}
                student={absence.student}
                startDate={absence.startDate}
                endDate={absence.endDate}
                startTime={absence.startTime}
                endTime={absence.endTime}
                reason={absence.reason}
                showStudent={showStudentColumn}
              />
            ))}
          </div>
        ) : (
          <EmptyState selectedStudent={selectedStudent} />
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          <Plus className="w-4 h-4" />
          Register Absence
        </button>
      </div>

      <RegisterAbsenceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        students={students}
      />
    </div>
  );
};

export default PlannedAbsencesWidget;