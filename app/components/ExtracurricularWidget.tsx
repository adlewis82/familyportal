import React from 'react';
import { Trophy, MapPin, Clock } from 'lucide-react';

// Sample data for preview
const sampleData = [
  {
    name: "Mark",
    extraCurricular: [
      {
        activity: "Chess club",
        date: "21 Nov 2024",
        startTime: "4:00pm",
        endTime: "5:30pm",
        location: "Assembly hall B",
        status: "today"
      }
    ]
  },
  {
    name: "Sarah",
    extraCurricular: [
      {
        activity: "Football practice",
        date: "27 Nov 2024",
        startTime: "4:00pm",
        endTime: "5:00pm",
        location: "Sports Field A",
        status: "upcoming"
      }
    ]
  }
];



const ExtraCurricularWidget = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Trophy className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-semibold ml-2">Extracurricular Activities</h2>
      </div>

      <div className="space-y-6">
        {sampleData.map((student) => (
          student.extraCurricular?.map((activity, index) => (
            <div 
              key={`${student.name}-${index}`} 
              className="relative -mx-4 px-4 py-3"
            >
              <div className="flex items-start gap-4">
              

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium truncate">{student.name}</span>
                    <span className="text-sm text-gray-500 flex-shrink-0">•</span>
                    <span className="text-purple-600 font-medium truncate">{activity.activity}</span>
                  </div>

                  {/* Time and location details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {activity.status === 'today' ? 'Today' : activity.date},{' '}
                        {activity.startTime} to {activity.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{activity.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'today' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status === 'today' ? 'Today' : 'Upcoming'}
                  </span>
                </div>
              </div>

              {/* Divider - only show if not last item */}
              {index < student.extraCurricular.length - 1 && (
                <div className="absolute bottom-0 left-16 right-4 border-b border-gray-100" />
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default ExtraCurricularWidget;