import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, DayTimetable, GroupTeam, NotificationItem, ActivityLogItem, ChatMessage } from '../types';
import { MOCK_USERS, MOCK_TIMETABLE, MOCK_GROUPS, MOCK_NOTIFICATIONS, MOCK_ACTIVITY_LOGS, MOCK_CHAT_MESSAGES } from '../mock/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: Role) => void;
  users: User[];
  timetable: DayTimetable;
  updateTimetable: (newTimetable: DayTimetable) => void;
  groups: GroupTeam[];
  addGroup: (group: GroupTeam) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  activityLogs: ActivityLogItem[];
  addActivityLog: (action: string, target: string, category: ActivityLogItem['category']) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (content: string, channelId?: string) => void;
  updateUserProfile: (updatedFields: Partial<User>) => void;
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[3]); // Default to student Sanjay Kumar S
  const [timetable, setTimetable] = useState<DayTimetable>(MOCK_TIMETABLE);
  const [groups, setGroups] = useState<GroupTeam[]>(MOCK_GROUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(MOCK_ACTIVITY_LOGS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [activeChannel, setActiveChannel] = useState<string>('general');

  const switchRole = (role: Role) => {
    const targetUser = users.find(u => u.role === role) || users[0];
    setCurrentUser(targetUser);
    addActivityLog('Switched demo role to', `${role.toUpperCase()} (${targetUser.name})`, 'security');
  };

  const updateTimetable = (newTimetable: DayTimetable) => {
    setTimetable(newTimetable);
    addActivityLog('Updated master timetable for', 'Saveetha Engineering College - Sec A', 'timetable');
    // Add notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'Timetable Updated',
      message: `${currentUser.name} successfully updated the academic schedule.`,
      timestamp: 'Just now',
      read: false,
      type: 'timetable',
      linkTo: '/workspace'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const addGroup = (group: GroupTeam) => {
    setGroups([group, ...groups]);
    addActivityLog('Created new team / group', group.name, 'group');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addActivityLog = (action: string, target: string, category: ActivityLogItem['category']) => {
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      action,
      target,
      timestamp: 'Just now',
      category
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const sendChatMessage = (content: string, channelId = activeChannel) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channelId
    };
    setChatMessages([...chatMessages, newMsg]);
  };

  const updateUserProfile = (updatedFields: Partial<User>) => {
    const updated = { ...currentUser, ...updatedFields, profileCompleted: true };
    setCurrentUser(updated);
    setUsers(users.map(u => u.id === updated.id ? updated : u));
    addActivityLog('Updated user profile information', updated.name, 'profile');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        users,
        timetable,
        updateTimetable,
        groups,
        addGroup,
        notifications,
        markNotificationAsRead,
        activityLogs,
        addActivityLog,
        chatMessages,
        sendChatMessage,
        updateUserProfile,
        activeChannel,
        setActiveChannel
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
