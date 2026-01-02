
import { Student } from '../types';

// This simulates the data structure from your "Private Courses" Sheet
export const MOCK_STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "Gaioo",
    password: "123",
    tutorName: "Gung", 
    sessions: [
      /* Fix: Changed 'time' to 'startTime' and 'endTime' to match CourseSession type */
      { id: "s1", no: 1, round: 1, day: "Saturday", date: "2025-11-01", startTime: "14:30", endTime: "17:00", hours: 2.5, tutor: "Gung", clientPaid: "Paid", datePaid: "2025-10-30" },
      { id: "s2", no: 2, round: 1, day: "Tuesday", date: "2025-11-04", startTime: "13:00", endTime: "15:30", hours: 2.5, tutor: "Gung", clientPaid: "Paid", datePaid: "2025-10-30" },
      { id: "s3", no: 3, round: 1, day: "Saturday", date: "2025-11-08", startTime: "13:00", endTime: "16:00", hours: 3.0, tutor: "Gung", clientPaid: "Pending", datePaid: "-" },
    ]
  },
  {
    id: "STU002",
    name: "Alice",
    password: "456",
    tutorName: "Mind",
    sessions: [
      /* Fix: Changed 'time' to 'startTime' and 'endTime' to match CourseSession type */
      { id: "s1", no: 1, round: 2, day: "Thursday", date: "2025-10-23", startTime: "12:00", endTime: "14:30", hours: 2.5, tutor: "Mind", clientPaid: "Paid", datePaid: "2025-10-30" },
      { id: "s2", no: 2, round: 2, day: "Friday", date: "2025-10-24", startTime: "17:00", endTime: "19:30", hours: 2.5, tutor: "Mind", clientPaid: "Unpaid", datePaid: "-" },
    ]
  }
];

export const authenticateStudent = (id: string, password: string): Student | null => {
  const student = MOCK_STUDENTS.find(s => s.id === id && s.password === password);
  return student || null;
};
