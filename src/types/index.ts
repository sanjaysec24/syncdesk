export type Role = 'admin' | 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  year?: string; // For students e.g. "3rd Year CSE"
  designation?: string; // For faculty e.g. "Associate Professor"
  avatar: string;
  status: 'free' | 'busy' | 'in-class' | 'in-lab' | 'offline';
  currentLocation?: string;
  bio?: string;
  phone?: string;
  skills?: string[];
  timetableSubmitted: boolean;
  profileCompleted: boolean;
  timetableCompleted?: boolean;
  timetableStatus?: 'DRAFT' | 'FINALIZED';
  deskJoined?: boolean;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface PeriodSlot {
  periodNumber: number; // 1 to 6
  timeRange: string;    // e.g. "09:00 AM - 09:55 AM"
  title: string;        // e.g. "Data Structures" or "Free"
  code?: string;        // e.g. "CSE302"
  room?: string;        // e.g. "Idea Lab 304" or "LH-201"
  type: 'lecture' | 'lab' | 'free' | 'break' | 'meeting' | 'project';
  facultyName?: string;
}

export type DayTimetable = {
  [key in DayOfWeek]: PeriodSlot[];
};

export interface GroupTeam {
  id: string;
  name: string;
  description: string;
  category: 'AICTE Idea Lab' | 'Capstone Project' | 'Department Club' | 'Research Cell' | 'Hackathon';
  leaderId: string;
  membersCount: number;
  meetingTime: string;
  room: string;
  avatar: string;
  members: string[]; // user ids
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'timetable' | 'group' | 'system' | 'message';
  linkTo?: string;
}

export interface ActivityLogItem {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  timestamp: string;
  category: 'timetable' | 'profile' | 'group' | 'admin' | 'security';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  channelId?: string; // e.g., "general", "idea-lab", "cse-3rd"
}
