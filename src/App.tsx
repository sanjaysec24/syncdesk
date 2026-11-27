/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfileSetupPage } from './pages/ProfileSetupPage';
import { JoinDeskPage } from './pages/JoinDeskPage';
import { SubmitTimetablePage } from './pages/SubmitTimetablePage';
import { TimetableSubmissionPage } from './pages/TimetableSubmissionPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { MembersPage } from './pages/MembersPage';
import { MemberProfilePage } from './pages/MemberProfilePage';
import { GroupsPage } from './pages/GroupsPage';
import { GroupWorkspacePage } from './pages/GroupWorkspacePage';
import { TimetableManagementPage } from './pages/TimetableManagementPage';
import { ChatPage } from './pages/ChatPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ActivityLogsPage } from './pages/ActivityLogsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/complete" element={<ProfileSetupPage />} />
          <Route path="/student/timetable" element={<SubmitTimetablePage />} />
          <Route path="/faculty/timetable" element={<SubmitTimetablePage />} />
          <Route path="/timetable/submit" element={<SubmitTimetablePage />} />
          <Route path="/join-desk" element={<JoinDeskPage />} />
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/desk/:deskId" element={<WorkspacePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberProfilePage />} />
          <Route path="/desks/:deskId/members" element={<MembersPage />} />
          <Route path="/desks/:deskId/members/:id" element={<MemberProfilePage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/groups/:groupId" element={<GroupWorkspacePage />} />
          <Route path="/desks/:deskId/groups" element={<GroupsPage />} />
          <Route path="/desks/:deskId/groups/:groupId" element={<GroupWorkspacePage />} />
          <Route path="/timetable/manage" element={<TimetableManagementPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/activity" element={<ActivityLogsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
