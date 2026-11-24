import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { OnboardingIllustration } from '../components/welcome/OnboardingIllustration';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { User, Mail, GraduationCap, Building2, Calendar, Phone, Check, ArrowRight } from 'lucide-react';

export const ProfileSetupPage: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const useNavigateInstance = useNavigate();

  const [role, setRole] = useState<'student' | 'faculty'>(currentUser.role === 'faculty' ? 'faculty' : 'student');
  const [fullName, setFullName] = useState(currentUser.name || 'Sanjay Kumar B');
  const [email, setEmail] = useState(currentUser.email || 'sanjaykumarbjc@gmail.com');
  const [regNumber, setRegNumber] = useState('');
  const [department, setDepartment] = useState('AI & Data Science');
  const [academicYear, setAcademicYear] = useState('III Year');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const departmentsList = [
    'Computer Science & Engineering',
    'AI & Data Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'student' && !regNumber.trim()) {
      setError('Registration number is required for students.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateUserProfile({
        name: fullName,
        email,
        role,
        department,
        year: role === 'student' ? academicYear : undefined,
        phone,
        profileCompleted: true
      });
      // Navigate to Join a Desk page (Step 3 of 4)
      useNavigateInstance('/join-desk');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-7xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-4 flex items-center justify-between">
        <InstitutionalLogos />
      </header>

      {/* Main Profile Setup Card matching reference image_e3297d5e.png */}
      <main className="max-w-6xl w-full mx-auto my-auto py-8">
        <div className="bg-white/95 backdrop-blur-md rounded-[40px] shadow-2xl shadow-indigo-900/10 border border-white/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Onboarding Progress & Illustration (32% width approx) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white p-6 sm:p-8 border-r border-slate-100 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Step 1: Completed */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Create Account</span>
                </div>

                {/* Step 2: Active */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/80 border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    2
                  </div>
                  <span className="text-sm font-extrabold text-blue-900">Profile Setup</span>
                </div>

                {/* Step 3: Upcoming */}
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <span className="text-sm font-bold text-slate-700">Join a Desk</span>
                </div>

                {/* Step 4: Upcoming */}
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <span className="text-sm font-bold text-slate-700">Submit Timetable</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <OnboardingIllustration />
            </div>
          </div>

          {/* Right Column: Profile Form (68% width approx) */}
          <div className="lg:col-span-8 p-6 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
                  STEP 2 OF 4
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#101B49] tracking-tight">
                  Complete Your Profile
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Tell us about yourself to personalize your Sync Desk experience.
                </p>
              </div>

              {/* Role Selection Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Student Role */}
                <div
                  onClick={() => setRole('student')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    role === 'student'
                      ? 'bg-blue-50/60 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'student' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">Student</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === 'student' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                    {role === 'student' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </div>

                {/* Faculty Role */}
                <div
                  onClick={() => setRole('faculty')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    role === 'faculty'
                      ? 'bg-blue-50/60 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'faculty' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">Faculty</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === 'faculty' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                    {role === 'faculty' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Form Grid */}
              <form onSubmit={handleSaveAndContinue} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* College Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">College Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Registration Number (Student Only) */}
                  {role === 'student' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Registration Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-xs">#</span>
                        <input
                          type="text"
                          value={regNumber}
                          onChange={e => setRegNumber(e.target.value)}
                          placeholder="Enter your registration number"
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* Department */}
                  <div className={role === 'faculty' ? 'space-y-1.5 sm:col-span-2' : 'space-y-1.5'}>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Department <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <select
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none cursor-pointer"
                      >
                        {departmentsList.map((dept, idx) => (
                          <option key={idx} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-4 pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>

                  {/* Academic Year (Student Only) */}
                  {role === 'student' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Academic Year <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                        <select
                          value={academicYear}
                          onChange={e => setAcademicYear(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 appearance-none cursor-pointer"
                        >
                          <option value="I Year">I Year</option>
                          <option value="II Year">II Year</option>
                          <option value="III Year">III Year</option>
                          <option value="IV Year">IV Year</option>
                        </select>
                        <div className="absolute right-4 top-4 pointer-events-none text-slate-400">▼</div>
                      </div>
                    </div>
                  )}

                  {/* Phone Number */}
                  <div className={role === 'faculty' ? 'space-y-1.5 sm:col-span-2' : 'space-y-1.5'}>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Save & Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-slate-500 py-4">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
