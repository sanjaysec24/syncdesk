/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { ProfileCompletionPage } from './pages/ProfileCompletionPage';
import { TimetableSubmissionPage } from './pages/TimetableSubmissionPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { MembersPage } from './pages/MembersPage';
import { MemberProfilePage } from './pages/MemberProfilePage';
import { GroupsPage } from './pages/GroupsPage';
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
          <Route path="/profile/complete" element={<ProfileCompletionPage />} />
          <Route path="/timetable/submit" element={<TimetableSubmissionPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberProfilePage />} />
          <Route path="/groups" element={<GroupsPage />} />
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
