import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { User, Mail, Building2, Calendar, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProfileSetupPage: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const navigate = useNavigate();

  const role = currentUser.role;

  const [fullName, setFullName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [regNumber, setRegNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState(currentUser.department || 'Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState(currentUser.year || 'III Year');
  const [designation, setDesignation] = useState(currentUser.designation || 'Assistant Professor');
  const [phone, setPhone] = useState(currentUser.phone || '');
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

    if (role === 'faculty' && !employeeId.trim()) {
      setError('Employee ID is required for faculty.');
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
        designation: role === 'faculty' ? designation : undefined,
        phone,
        profileCompleted: true
      });

      // Strict Onboarding sequence:
      // Admin -> Admin Dashboard
      // Student -> Student Timetable Generator
      // Faculty -> Faculty Timetable Generator
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'student') {
        navigate('/student/timetable');
      } else {
        navigate('/faculty/timetable');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-[1120px] w-full mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
        <InstitutionalLogos compact />
      </header>

      {/* Main Centered Profile Setup Card */}
      <main className="max-w-[900px] w-full mx-auto my-auto py-8">
        <div className="bg-white rounded-[24px] shadow-xl shadow-indigo-950/10 border border-slate-100 p-8 sm:p-10 space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
              STEP 2 OF 4
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#101B49] tracking-tight">
              Complete Your Profile
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Tell us about yourself to personalize your Sync Desk experience as a{' '}
              <span className="font-extrabold text-blue-600 uppercase">{role}</span>.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSaveAndContinue} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
                  />
                </div>
              </div>

              {/* Student Fields: Registration Number & Academic Year */}
              {role === 'student' && (
                <>
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Academic Year <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <select
                        value={academicYear}
                        onChange={e => setAcademicYear(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] appearance-none cursor-pointer"
                      >
                        <option value="I Year">I Year</option>
                        <option value="II Year">II Year</option>
                        <option value="III Year">III Year</option>
                        <option value="IV Year">IV Year</option>
                      </select>
                      <div className="absolute right-4 top-4 pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>
                </>
              )}

              {/* Faculty Fields: Employee ID & Designation */}
              {role === 'faculty' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Employee ID / Faculty ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={employeeId}
                        onChange={e => setEmployeeId(e.target.value)}
                        placeholder="Enter your employee ID"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Designation <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <select
                        value={designation}
                        onChange={e => setDesignation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] appearance-none cursor-pointer"
                      >
                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lab Coordinator">Lab Coordinator</option>
                      </select>
                      <div className="absolute right-4 top-4 pointer-events-none text-slate-400">▼</div>
                    </div>
                  </div>
                </>
              )}

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] appearance-none cursor-pointer"
                  >
                    {departmentsList.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-4 pointer-events-none text-slate-400">▼</div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB]"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
      </main>

      {/* Footer */}
      <footer className="max-w-[1120px] w-full mx-auto text-center text-xs text-slate-500 py-4 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>
    </div>
  );
};
