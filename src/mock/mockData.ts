import { User, DayTimetable, GroupTeam, NotificationItem, ActivityLogItem, ChatMessage } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u-admin-1',
    name: 'Dr. R. Rajesh Kumar',
    email: 'rajesh.admin@saveetha.ac.in',
    role: 'admin',
    department: 'CSE / AICTE Idea Lab',
    designation: 'Professor & Lab Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'free',
    currentLocation: 'AICTE Idea Lab Control Center',
    bio: 'Overseeing campus-wide timetables, Idea Lab resource allocations, and academic excellence initiatives.',
    phone: '+91 98401 23456',
    skills: ['IoT Systems', 'Academic Administration', 'AI & Robotics'],
    timetableSubmitted: true,
    profileCompleted: true
  },
  {
    id: 'u-faculty-1',
    name: 'Prof. Anitha Sundaram',
    email: 'anitha.cse@saveetha.ac.in',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'in-class',
    currentLocation: 'Tech Tower - Room 402',
    bio: 'Specializing in Distributed Systems, Cloud Computing, and mentored 40+ student capstone teams.',
    phone: '+91 94442 88991',
    skills: ['Cloud Computing', 'Distributed Systems', 'Java / Spring'],
    timetableSubmitted: true,
    profileCompleted: true
  },
  {
    id: 'u-faculty-2',
    name: 'Dr. K. Senthil Nathan',
    email: 'senthil.ece@saveetha.ac.in',
    role: 'faculty',
    department: 'Electronics & Communication',
    designation: 'Professor & Coordinator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'free',
    currentLocation: 'AICTE Idea Lab 3D Printing Bay',
    bio: 'Embedded hardware enthusiast, PCB prototyping expert, and Maker Space supervisor.',
    phone: '+91 98821 77654',
    skills: ['Embedded C', 'PCB Design', 'VLSI'],
    timetableSubmitted: true,
    profileCompleted: true
  },
  {
    id: 'u-student-1',
    name: 'Sanjay Kumar S',
    email: '212301045@saveetha.ac.in',
    role: 'student',
    department: 'Computer Science & Engineering',
    year: '3rd Year CSE - Sec A',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'free',
    currentLocation: 'AICTE Idea Lab Workspace',
    bio: 'Full-stack developer building real-time campus tools. Passionate about React, TypeScript & IoT.',
    phone: '+91 93605 12348',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
    timetableSubmitted: true,
    profileCompleted: true
  },
  {
    id: 'u-student-2',
    name: 'Priyadharshini M',
    email: '212301089@saveetha.ac.in',
    role: 'student',
    department: 'Information Technology',
    year: '3rd Year IT - Sec B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'in-lab',
    currentLocation: 'Idea Lab AI Workstation 5',
    bio: 'AI & Machine Learning enthusiast. Working on computer vision models for automated attendance.',
    phone: '+91 95001 98765',
    skills: ['Python', 'PyTorch', 'Data Analytics'],
    timetableSubmitted: true,
    profileCompleted: true
  },
  {
    id: 'u-student-3',
    name: 'Rahul Varma',
    email: '212302012@saveetha.ac.in',
    role: 'student',
    department: 'Electronics & Communication',
    year: '4th Year ECE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'free',
    currentLocation: 'Idea Lab Robotics Arena',
    bio: 'Building autonomous quadcopters and robotic arms for industrial automation.',
    phone: '+91 97890 11223',
    skills: ['ROS', 'Arduino', 'Python'],
    timetableSubmitted: true,
    profileCompleted: true
  }
];

export const STANDARD_PERIODS = [
  { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM' },
  { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM' },
  { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM' }, // After short break
  { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM' },
  { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM' }, // After lunch
  { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM' }
];

export const MOCK_TIMETABLE: DayTimetable = {
  Monday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'Data Structures & Algorithms', code: 'CSE301', room: 'LH-101', type: 'lecture', facultyName: 'Prof. Anitha Sundaram' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'Database Management Systems', code: 'CSE302', room: 'LH-101', type: 'lecture', facultyName: 'Dr. Ramesh Kumar' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Idea Lab Prototyping Workshop', code: 'LAB401', room: 'AICTE Idea Lab 3D Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Idea Lab Prototyping Workshop (Cont.)', code: 'LAB401', room: 'AICTE Idea Lab 3D Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'Open Free Slot / Research', code: 'FREE', room: 'Library Hub', type: 'free' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'Software Engineering Principles', code: 'CSE304', room: 'LH-103', type: 'lecture', facultyName: 'Dr. Meena Priya' }
  ],
  Tuesday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'Operating Systems', code: 'CSE305', room: 'LH-102', type: 'lecture', facultyName: 'Prof. Anitha Sundaram' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'Computer Networks', code: 'CSE306', room: 'LH-102', type: 'lecture', facultyName: 'Dr. Vijay Anand' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Free Slot (Peer Sync)', code: 'FREE', room: 'Campus Cafeteria', type: 'free' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Web Development Lab', code: 'CSE307L', room: 'CC-Lab 2', type: 'lab', facultyName: 'Prof. Anitha Sundaram' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'Web Development Lab (Cont.)', code: 'CSE307L', room: 'CC-Lab 2', type: 'lab', facultyName: 'Prof. Anitha Sundaram' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'Professional Ethics & Values', code: 'HS301', room: 'LH-205', type: 'lecture', facultyName: 'Dr. Grace Mary' }
  ],
  Wednesday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'Artificial Intelligence & ML', code: 'AI401', room: 'AICTE Idea Lab Seminar Hall', type: 'lecture', facultyName: 'Dr. R. Rajesh Kumar' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'Artificial Intelligence & ML (Cont.)', code: 'AI401', room: 'AICTE Idea Lab Seminar Hall', type: 'lecture', facultyName: 'Dr. R. Rajesh Kumar' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Cloud Architecture', code: 'CSE402', room: 'LH-104', type: 'lecture', facultyName: 'Prof. Suresh Babu' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Free Slot / Project Discussion', code: 'FREE', room: 'Idea Lab Lounge', type: 'free' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'IoT & Embedded Systems Lab', code: 'ECE308L', room: 'Idea Lab IoT Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'IoT & Embedded Systems Lab (Cont.)', code: 'ECE308L', room: 'Idea Lab IoT Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' }
  ],
  Thursday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'Cyber Security Essentials', code: 'CSE405', room: 'LH-101', type: 'lecture', facultyName: 'Dr. Karthik R' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'Design Thinking & Innovation', code: 'DT201', room: 'Idea Lab Ideation Studio', type: 'lecture', facultyName: 'Dr. R. Rajesh Kumar' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Free Slot / Mentorship Meet', code: 'FREE', room: 'Faculty Block 3', type: 'free' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Full Stack App Dev', code: 'CSE409', room: 'CC-Lab 1', type: 'lecture', facultyName: 'Prof. Anitha Sundaram' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'Capstone Project Sprint', code: 'PROJ', room: 'Idea Lab Pod 3', type: 'project' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'Capstone Project Sprint (Cont.)', code: 'PROJ', room: 'Idea Lab Pod 3', type: 'project' }
  ],
  Friday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'Compiler Design', code: 'CSE411', room: 'LH-103', type: 'lecture', facultyName: 'Dr. Meena Priya' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'Big Data Analytics', code: 'CSE412', room: 'LH-103', type: 'lecture', facultyName: 'Prof. Suresh Babu' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Free Slot / Library', code: 'FREE', room: 'Central Library', type: 'free' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Idea Lab Laser Cutting Workshop', code: 'LAB502', room: 'Idea Lab Fab Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'Idea Lab Laser Cutting Workshop (Cont.)', code: 'LAB502', room: 'Idea Lab Fab Bay', type: 'lab', facultyName: 'Dr. K. Senthil Nathan' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'Technical Seminar & Review', code: 'SEM400', room: 'Auditorium A', type: 'meeting', facultyName: 'Dr. R. Rajesh Kumar' }
  ],
  Saturday: [
    { periodNumber: 1, timeRange: '08:30 AM - 09:20 AM', title: 'AICTE Idea Lab Open Hackathon', code: 'HACK', room: 'Main Idea Lab Arena', type: 'project', facultyName: 'All Mentors' },
    { periodNumber: 2, timeRange: '09:20 AM - 10:10 AM', title: 'AICTE Idea Lab Open Hackathon (Cont.)', code: 'HACK', room: 'Main Idea Lab Arena', type: 'project', facultyName: 'All Mentors' },
    { periodNumber: 3, timeRange: '10:25 AM - 11:15 AM', title: 'Open Maker Space Access', code: 'MAKER', room: 'Idea Lab 3D Bay', type: 'free' },
    { periodNumber: 4, timeRange: '11:15 AM - 12:05 PM', title: 'Open Maker Space Access (Cont.)', code: 'MAKER', room: 'Idea Lab 3D Bay', type: 'free' },
    { periodNumber: 5, timeRange: '01:00 PM - 01:50 PM', title: 'Weekly Review & Demo Showcase', code: 'SHOW', room: 'Idea Lab Seminar Hall', type: 'meeting', facultyName: 'Dr. R. Rajesh Kumar' },
    { periodNumber: 6, timeRange: '01:50 PM - 02:40 PM', title: 'Weekly Review & Demo Showcase (Cont.)', code: 'SHOW', room: 'Idea Lab Seminar Hall', type: 'meeting', facultyName: 'Dr. R. Rajesh Kumar' }
  ]
};

export const MOCK_GROUPS: GroupTeam[] = [
  {
    id: 'g-1',
    name: 'AICTE Idea Lab Core Innovators',
    description: 'Central maker community building hardware & software prototypes using 3D printers, IoT kits, and AI workstations.',
    category: 'AICTE Idea Lab',
    leaderId: 'u-admin-1',
    membersCount: 42,
    meetingTime: 'Wednesdays 02:30 PM',
    room: 'Idea Lab Main Hall',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
    members: ['u-admin-1', 'u-faculty-2', 'u-student-1', 'u-student-2', 'u-student-3']
  },
  {
    id: 'g-2',
    name: 'Smart Campus Sync Project Team',
    description: 'Developing real-time campus availability, timetable sync, and automated room booking for Saveetha Engineering College.',
    category: 'Capstone Project',
    leaderId: 'u-student-1',
    membersCount: 6,
    meetingTime: 'Thursdays 01:00 PM',
    room: 'Idea Lab Pod 3',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    members: ['u-student-1', 'u-student-2', 'u-faculty-1']
  },
  {
    id: 'g-3',
    name: 'IoT & Robotics Research Cell',
    description: 'Researching automated drone navigation, sensor networks, and edge AI deployment.',
    category: 'Research Cell',
    leaderId: 'u-faculty-2',
    membersCount: 15,
    meetingTime: 'Fridays 03:00 PM',
    room: 'Idea Lab Robotics Bay',
    avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80',
    members: ['u-faculty-2', 'u-student-3', 'u-admin-1']
  },
  {
    id: 'g-4',
    name: 'CodeCraft Hackathon Club',
    description: 'Weekly competitive programming, hackathon preparation, and open-source contributions.',
    category: 'Department Club',
    leaderId: 'u-faculty-1',
    membersCount: 28,
    meetingTime: 'Saturdays 10:00 AM',
    room: 'CC-Lab 1',
    avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&auto=format&fit=crop&q=80',
    members: ['u-faculty-1', 'u-student-1', 'u-student-2']
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Timetable Updated',
    message: 'Dr. R. Rajesh Kumar updated Wednesday AI&ML slot to Idea Lab Seminar Hall.',
    timestamp: '10 mins ago',
    read: false,
    type: 'timetable',
    linkTo: '/timetable/manage'
  },
  {
    id: 'n-2',
    title: 'New Member Joined',
    message: 'Rahul Varma joined your Smart Campus Sync Project Team.',
    timestamp: '1 hour ago',
    read: false,
    type: 'group',
    linkTo: '/groups'
  },
  {
    id: 'n-3',
    title: 'Idea Lab Equipment Booking',
    message: 'Your slot for 3D Printer #4 in AICTE Idea Lab has been confirmed for tomorrow.',
    timestamp: '3 hours ago',
    read: true,
    type: 'alert'
  },
  {
    id: 'n-4',
    title: 'System Maintenance Notice',
    message: 'Sync Desk will undergo scheduled maintenance on Sunday from 02:00 AM to 04:00 AM.',
    timestamp: '1 day ago',
    read: true,
    type: 'system'
  }
];

export const MOCK_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    userName: 'Dr. R. Rajesh Kumar',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'Updated master timetable for',
    target: '3rd Year CSE Section A',
    timestamp: 'Today, 09:45 AM',
    category: 'admin'
  },
  {
    id: 'log-2',
    userName: 'Sanjay Kumar S',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    action: 'Submitted weekly timetable & updated status to',
    target: 'Free in AICTE Idea Lab',
    timestamp: 'Today, 08:15 AM',
    category: 'timetable'
  },
  {
    id: 'log-3',
    userName: 'Prof. Anitha Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    action: 'Created new team group',
    target: 'CodeCraft Hackathon Club',
    timestamp: 'Yesterday, 04:30 PM',
    category: 'group'
  },
  {
    id: 'log-4',
    userName: 'Dr. K. Senthil Nathan',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'Approved equipment requisition for',
    target: 'IoT Sensor Kits #12',
    timestamp: 'Yesterday, 02:10 PM',
    category: 'admin'
  },
  {
    id: 'log-5',
    userName: 'Priyadharshini M',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    action: 'Updated profile skills & contact info',
    target: 'AI & Machine Learning',
    timestamp: '2 days ago',
    category: 'profile'
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'u-admin-1',
    senderName: 'Dr. R. Rajesh Kumar',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    senderRole: 'admin',
    content: 'Welcome everyone to Sync Desk! Please ensure your weekly timetables are submitted by Monday morning so faculty and students can view live availability.',
    timestamp: '09:00 AM',
    channelId: 'general'
  },
  {
    id: 'msg-2',
    senderId: 'u-faculty-1',
    senderName: 'Prof. Anitha Sundaram',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    senderRole: 'faculty',
    content: 'Thanks Dr. Rajesh. CSE 3rd year students, remember our lab session is in CC-Lab 2 tomorrow during periods 4 & 5.',
    timestamp: '09:15 AM',
    channelId: 'general'
  },
  {
    id: 'msg-3',
    senderId: 'u-student-1',
    senderName: 'Sanjay Kumar S',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    senderRole: 'student',
    content: 'Noted Prof. Anitha! Also, our project team is meeting at Idea Lab Pod 3 today at 1:00 PM for the sprint review.',
    timestamp: '09:30 AM',
    channelId: 'general'
  },
  {
    id: 'msg-4',
    senderId: 'u-student-2',
    senderName: 'Priyadharshini M',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    senderRole: 'student',
    content: 'I will be testing the YOLOv8 model at Idea Lab workstation 5 today. Feel free to drop by if you want a demo!',
    timestamp: '10:05 AM',
    channelId: 'idea-lab'
  }
];
