const database = {
    timetables: [
      {
        id: 1,
        courseId: 1,
        date: "20.02.2021",
        timeslotId: 1,
        subjectId: 1,
        teacherId: 1,
        roomId: 1,
        commentId: 1,
      },
      {
        id: 2,
        courseId: 2,
        date: "21.02.2021",
        timeslotId: 1,
        subjectId: 2,
        teacherId: 2,
        roomId: 2,
        commentId: 2,
      },
      {
        id: 3,
        courseId: 3,
        date: "21.02.2021",
        timeslotId: 2,
        subjectId: 3,
        teacherId: 3,
        roomId: 1,
        commentId: 1,
      }
    ],
    courses: [
      {
        id: 1,
        courseName: 'RIF1',
      },
      {
        id: 2,
        courseName: 'RIF2',
      },
      {
        id: 3,
        courseName: 'RIF3',
      }
      
    ],
    timeslots: [
      {
        id: 1,
        startTime: '10:00',
        endTime: '13:15',
      },
      {
        id: 2,
        startTime: '14:15',
        endTime: '17:30',
      }
    ],
    subjects: [
      {
        id: 1,
        subjectCode: 'HKHK100.HK',
        subjectName: 'IT ja õigus',
        subjectVolume: 4,
      },
      {
        id: 2,
        subjectCode: 'HKHK101.HK',
        subjectName: 'Programmeerimine',
        subjectVolume: 6,
      },
      {
        id: 3,
        subjectCode: 'HKHK103.HK',
        subjectName: 'Mobiililahendused',
        subjectVolume: 4,
      },
    ],
    teachers: [
        {
          id: 1,
          teacherName: 'Teet Tiit',
        },
        {
            id: 2,
            teacherName: 'Piip Tuut',
          },
          {
              id: 3,
              teacherName: 'Reet Ruut',
            }
      ],
      rooms: [
        {
            id: 1,
            roomNumber: 'NA',
          },
        {
          id: 2,
          roomNumber: '302',
        }
      ],
      comments: [
        {
          id: 1,
          commentContent: 'Zoom',
        },
        {
            id: 2,
            commentContent: 'GoogleMeet',
          }
      ],
	  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
      email: 'juku@juurikas.ee',
      password: '$2a$10$s4V.mM/9E/wrKh4fsi4KfuQI3Pfn6Jt9enoUbjb91M95FtbXLp4Yq',
      role: 'User',
    },
    {
      id: 2,
      firstName: 'Mati',
      lastName: 'Maasikas',
      email: 'mati@maasikas.ee',
      password: '$2a$10$S9MQu8cxyPpbUz1nG6beKeO5AMHhPp7OxghNxEDUGry4gm6mlDQLO',
      role: 'Admin',
    },
  ],
  };
  
  module.exports = database;