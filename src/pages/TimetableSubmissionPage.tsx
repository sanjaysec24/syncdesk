import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { Calendar, CheckCircle2, ArrowRight, Sparkles, Plus, Trash2 } from 'lucide-react';
import { DayOfWeek } from '../types';

export const TimetableSubmissionPage: React.FC = () => {
  const { timetable, updateTimetable } = useApp();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [currentSlots, setCurrentSlots] = useState(timetable['Monday']);
  const [success, setSuccess] = useState(false);

  const handleDayChange = (day: DayOfWeek) => {
    setSelectedDay(day);
    setCurrentSlots(timetable[day] || []);
  };

  const handleSlotChange = (index: number, field: string, value: string) => {
    const updated = [...currentSlots];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentSlots(updated);
  };

  const handleSaveDay = () => {
    const updatedMaster = { ...timetable, [selectedDay]: currentSlots };
    updateTimetable(updatedMaster);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7fc] pb-20 md:pb-12">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold uppercase tracking-wider text-[10px]">
                  Academic Schedule Portal
                </span>
                <span className="text-xs text-slate-400">Saveetha Engineering College</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Submit & Edit Timetable</h2>
              <p className="text-xs sm:text-sm text-slate-500">Configure lecture titles, room numbers, and free slots for each day of the week.</p>
            </div>

            <button
              onClick={() => navigate('/timetable/manage')}
              className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span>View Master Grid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {success && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-sm font-bold">{selectedDay}'s timetable successfully saved and synced across campus!</span>
            </div>
          )}

          {/* Day Selector Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as DayOfWeek[]).map(day => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots Editor */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Editing Periods for {selectedDay}
            </h3>

            <div className="space-y-3">
              {currentSlots.map((slot, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-2">
                    <span className="text-xs font-bold text-indigo-600 uppercase">Period {slot.periodNumber}</span>
                    <div className="text-[11px] text-slate-400">{slot.timeRange}</div>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Subject / Title</label>
                    <input
                      type="text"
                      value={slot.title}
                      onChange={e => handleSlotChange(index, 'title', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Code</label>
                    <input
                      type="text"
                      value={slot.code || ''}
                      onChange={e => handleSlotChange(index, 'code', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Room / Lab</label>
                    <input
                      type="text"
                      value={slot.room || ''}
                      onChange={e => handleSlotChange(index, 'room', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Type</label>
                    <select
                      value={slot.type}
                      onChange={e => handleSlotChange(index, 'type', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                    >
                      <option value="lecture">Lecture</option>
                      <option value="lab">Lab</option>
                      <option value="free">Free</option>
                      <option value="project">Project</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                onClick={handleSaveDay}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Save {selectedDay} Schedule
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
