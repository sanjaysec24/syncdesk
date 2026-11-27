import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { InstitutionalLogos } from '../components/branding/InstitutionalLogos';
import { BackgroundWaves } from '../components/welcome/BackgroundWaves';
import { DayOfWeek } from '../types';
import { 
  Plus, 
  Trash2, 
  Save, 
  Lock, 
  CheckCircle2, 
  User, 
  Calendar 
} from 'lucide-react';

interface ClassEntry {
  id: string;
  subCode: string;
  subName: string;
  facultyName: string;
  days: DayOfWeek[];
  slots: string[];
}

export const SubmitTimetablePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();
  const navigate = useNavigate();

  const isFaculty = currentUser.role === 'faculty';

  // Form State
  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');
  const [facultyName, setFacultyName] = useState(isFaculty ? currentUser.name : '');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(['Monday']);
  const [selectedSlots, setSelectedSlots] = useState<string[]>(['P1']);
  
  // Timetable Draft Entries
  const [classes, setClasses] = useState<ClassEntry[]>([
    {
      id: 'cls-1',
      subCode: '19AI301',
      subName: 'Machine Learning',
      facultyName: isFaculty ? currentUser.name : 'Dr. R. Karthik',
      days: ['Monday', 'Wednesday', 'Friday'],
      slots: ['P1']
    },
    {
      id: 'cls-2',
      subCode: '19AI303',
      subName: 'Data Structures',
      facultyName: isFaculty ? currentUser.name : 'Prof. Anitha S',
      days: ['Tuesday', 'Thursday'],
      slots: ['P2']
    }
  ]);

  const [isLocked, setIsLocked] = useState(currentUser.timetableCompleted || false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { id: 'P1', name: 'P1', time: '08:00 AM – 09:30 AM' },
    { id: 'P2', name: 'P2', time: '09:45 AM – 11:15 AM' },
    { id: 'P3', name: 'P3', time: '01:15 PM – 02:45 PM' },
    { id: 'P4', name: 'P4', time: '03:00 PM – 04:30 PM' }
  ];

  const handleDayToggle = (day: DayOfWeek) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSlotToggle = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      if (selectedSlots.length > 1) {
        setSelectedSlots(selectedSlots.filter(s => s !== slotId));
      }
    } else {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    setError('');

    if (!subCode.trim() || !subName.trim()) {
      setError('Please provide Subject Code and Subject Name.');
      return;
    }

    const newClass: ClassEntry = {
      id: `cls-${Date.now()}`,
      subCode: subCode.trim().toUpperCase(),
      subName: subName.trim(),
      facultyName: facultyName.trim() || currentUser.name,
      days: selectedDays,
      slots: selectedSlots
    };

    setClasses([...classes, newClass]);
    setSubCode('');
    setSubName('');
  };

  const handleDeleteClass = (id: string) => {
    if (isLocked) return;
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleFinalizeSubmission = () => {
    setIsLocked(true);
    setShowReviewModal(false);
    setSuccess(true);
    
    updateUserProfile({
      timetableCompleted: true,
      timetableStatus: 'FINALIZED'
    });

    setTimeout(() => {
      navigate('/join-desk');
    }, 1200);
  };

  const getClassForCell = (day: DayOfWeek, slotId: string) => {
    return classes.find(c => c.days.includes(day) && c.slots.includes(slotId));
  };

  const totalScheduledClasses = classes.length * selectedDays.length;
  const freePeriods = Math.max(0, 24 - totalScheduledClasses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] via-[#FFFFFF] to-[#EEF2FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Waves */}
      <BackgroundWaves />

      {/* Top Header with Institutional Logos */}
      <header className="max-w-[1400px] w-full mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
        <InstitutionalLogos compact />

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
            Timetable Generator ({currentUser.role.toUpperCase()})
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] w-full mx-auto my-6 space-y-6">
        
        {/* Page Title & Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
          <div className="space-y-1">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-[#2563EB] font-extrabold text-[11px] uppercase tracking-wider border border-blue-100">
              STEP 3 OF 4 — TIMETABLE SETUP
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#101B45] tracking-tight">
              {isFaculty ? 'Faculty Teaching Schedule Generator' : 'Student Weekly Timetable Generator'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Configure your weekly academic schedule. Once finalized and locked, changes require admin approval.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            disabled={classes.length === 0 || isLocked}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft & Review Timetable</span>
          </button>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Timetable successfully finalized and permanently locked! Redirecting to Join a Desk...
          </div>
        )}

        {/* =========================================
            THREE-COLUMN RESPONSIVE LAYOUT
           ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* -----------------------------------------
              LEFT COLUMN — ADD NEW CLASS (Col 3)
             ----------------------------------------- */}
          <div className="lg:col-span-3 bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Plus className="w-5 h-5 text-[#2563EB]" />
              <h3 className="font-extrabold text-slate-900 text-sm">Add New Class</h3>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleAddClass} className="space-y-4">
              {/* Subject Code */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">Subject Code</label>
                <input
                  type="text"
                  value={subCode}
                  onChange={e => setSubCode(e.target.value)}
                  placeholder="e.g. 19AI301"
                  disabled={isLocked}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Subject Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">Subject Name</label>
                <input
                  type="text"
                  value={subName}
                  onChange={e => setSubName(e.target.value)}
                  placeholder="e.g. Machine Learning"
                  disabled={isLocked}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Faculty Name or Class/Dept */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  {isFaculty ? 'Class / Department' : 'Faculty Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={facultyName}
                    onChange={e => setFacultyName(e.target.value)}
                    placeholder={isFaculty ? 'e.g. CSE - 3rd Year' : 'e.g. Dr. R. Karthik'}
                    disabled={isLocked}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Select Class Days (Multi-select) */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">Select Days</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {days.map(d => {
                    const isSelected = selectedDays.includes(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDayToggle(d)}
                        disabled={isLocked}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Time Slots (Multi-select) */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">Select Time Slots</label>
                <div className="space-y-1.5">
                  {periods.map(p => {
                    const isSelected = selectedSlots.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSlotToggle(p.id)}
                        disabled={isLocked}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected ? 'bg-indigo-50 border border-indigo-300 text-indigo-900' : 'bg-slate-50 border border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{p.name}</span>
                        <span className="text-[10px] text-slate-500">{p.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLocked}
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Class to Timetable</span>
              </button>
            </form>
          </div>

          {/* -----------------------------------------
              CENTER COLUMN — MY WEEKLY TIMETABLE (Col 6)
             ----------------------------------------- */}
          <div className="lg:col-span-6 bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-slate-900 text-sm">My Weekly Timetable</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs">
                {classes.length} Subjects Active
              </span>
            </div>

            {/* Timetable Grid with horizontal scrolling on small screens */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs min-w-[650px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3 text-left">Period</th>
                    {days.map(d => (
                      <th key={d} className="py-3 px-2">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {periods.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/40">
                      <td className="py-3.5 px-3 text-left font-bold text-slate-900 bg-slate-50/40 border-r border-slate-100 w-32">
                        <div>{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{p.time}</div>
                      </td>
                      {days.map(d => {
                        const cellClass = getClassForCell(d, p.id);
                        return (
                          <td key={d} className="py-3 px-2 border-r border-slate-100 last:border-r-0">
                            {cellClass ? (
                              <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs font-bold space-y-0.5 shadow-2xs">
                                <div className="text-blue-700 font-black">{cellClass.subCode}</div>
                                <div className="text-[11px] truncate">{cellClass.subName}</div>
                                <div className="text-[9px] text-slate-500 font-medium truncate">{cellClass.facultyName}</div>
                              </div>
                            ) : (
                              <div className="h-14 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-blue-400 hover:text-blue-500 transition-colors">
                                <Plus className="w-4 h-4" />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Stats Below Timetable */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Subjects</span>
                <h4 className="text-xl font-black text-slate-900 mt-0.5">{classes.length}</h4>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Class Days</span>
                <h4 className="text-xl font-black text-slate-900 mt-0.5">6 Days</h4>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Scheduled Slots</span>
                <h4 className="text-xl font-black text-blue-600 mt-0.5">{totalScheduledClasses}</h4>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Free Periods</span>
                <h4 className="text-xl font-black text-emerald-600 mt-0.5">{freePeriods}</h4>
              </div>
            </div>
          </div>

          {/* -----------------------------------------
              RIGHT COLUMN — TIMETABLE INFORMATION (Col 3)
             ----------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* 1. My Classes Card */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">My Classes ({classes.length})</h4>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {classes.map(c => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-black">{c.subCode}</span>
                        <h5 className="font-extrabold text-slate-900 text-xs truncate">{c.subName}</h5>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">{c.days.join(', ')} • {c.slots.join(', ')}</p>
                    </div>

                    {!isLocked && (
                      <button
                        onClick={() => handleDeleteClass(c.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Timetable Summary Card */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Timetable Summary</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Utilization Rate</span>
                  <span className="font-bold text-slate-900">{Math.round((totalScheduledClasses / 24) * 100)}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Lock Status</span>
                  <span className={`font-bold ${isLocked ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isLocked ? 'Locked (Finalized)' : 'Draft Mode'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Academic Details Card */}
            <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Academic Details</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Department</span>
                  <span className="font-bold text-slate-900">{currentUser.department}</span>
                </div>
                {!isFaculty && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Academic Year</span>
                    <span className="font-bold text-slate-900">{currentUser.year || 'III Year'}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Semester</span>
                  <span className="font-bold text-slate-900">Odd Semester 2026</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-[1400px] w-full mx-auto text-center text-xs text-slate-500 py-4 mt-auto">
        Saveetha Engineering College • AICTE Idea Lab • Sync Desk Platform
      </footer>

      {/* =========================================
          REVIEW & PERMANENT LOCKING CONFIRMATION MODAL
         ========================================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Finalize & Lock Timetable</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your timetable will be permanently locked after submission. You cannot edit it yourself later.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="font-bold text-slate-900">Summary of Submission:</div>
              <div className="text-slate-600">• Total Active Classes: {classes.length}</div>
              <div className="text-slate-600">• Scheduled Slots: {totalScheduledClasses} / 24</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Continue Editing
              </button>
              <button
                type="button"
                onClick={handleFinalizeSubmission}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Lock</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
