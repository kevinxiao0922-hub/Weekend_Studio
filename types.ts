
export interface CourseSession {
  id: string; 
  no: number;
  round: number;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  tutor: string;
  clientPaid: string;
  datePaid: string;
}

export interface Student {
  id: string;
  name: string;
  password?: string;
  tutorName: string; 
  sessions: CourseSession[]; 
}

export interface UserSession {
  studentId: string;
  isAuthenticated: boolean;
}
