// app/data/dashboard-data.ts

export const dashboardData = {
  meta: {
    timestamp: "2024-11-21T10:30:00Z",
    version: "1.0",
    environment: "development"
  },
  parent: {
    id: "P2024001",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    preferredLanguage: "en",
    relationship: "mother"
  },
  students: [
    {
      id: "ST2024001",
      name: "Sarah",
      attendance: {
        year: {
          present: 135,
          absent: 45,
          total: 180
        },
        term: {
          present: 48,
          absent: 12,
          total: 60
        }
      },
      currentClass: {
        subject: "Mathematics",
        teacher: "Mrs. Thompsons",
        timeSlot: "10:30am - 11:30am",
        status: "current"
      },
      nextClass: {
        subject: "English Literature",
        teacher: "Mr. Parker",
        timeSlot: "11:30am - 12:30pm",
        status: "next"
      },
      homework: [
        {
          subject: "Mathematics",
          title: "SOHCAHTOA",
          teacher: "Mrs. Thompson",
          setDate: "17 Nov",
          dueDate: "22 Nov",
          status: "pending"
        }
      ],
      absences: []  // Sarah has no absences
    },
    {
      id: "ST2024002",
      name: "Mark",
      attendance: {
        year: {
          present: 148,
          absent: 32,
          total: 180
        },
        term: {
          present: 51,
          absent: 9,
          total: 60
        }
      },
      currentClass: {
        subject: "Science",
        teacher: "Mr. Wilson",
        timeSlot: "10:30am - 11:30am",
        status: "current"
      },
      nextClass: {
        subject: "History",
        teacher: "Ms. Anderson",
        timeSlot: "11:30am - 12:30pm",
        status: "next"
      },
      homework: [
        {
          subject: "Science",
          title: "Photosynthesis",
          teacher: "Mr. Wilson",
          setDate: "16 Nov",
          dueDate: "21 Nov",
          status: "submitted"
        }
      ],
      absences: [
        {
          startTime: "11:00am",
          date: "20 Nov 2024",
          endTime: "1:00pm",
          reason: "Dentist",
          type: "single day"
        },
        {
          startTime: "9:00am",
          date: "25 Nov 2024",
          endTime: "3:00pm",
          endDate: "26 Nov 2024",
          reason: "Field trip",
          type: "multi-day"
        }
      ]
    }
  ]
}