import React, { useState } from 'react';
import { DayTimetable, DayOfWeek } from '../../types';
import { STANDARD_PERIODS } from '../../mock/mockData';
import { Clock, MapPin, User as UserIcon, BookOpen, CheckCircle2, Coffee, Sparkles } from 'lucide-react';

interface TimetableGridProps {
  timetable: DayTimetable;
  isEditable?: boolean;
  onCellClick?: (day: DayOfWeek, periodIndex: number) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TimetableGrid: React.FC<TimetableGridProps> = ({ timetable, isEditable = false, onCellClick }) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [activeTabMobile, setActiveTabMobile] = useState<DayOfWeek>('Monday');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header toolbar */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-white border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Saveetha Engineering College • AICTE Idea Lab</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">Master Academic Timetable</h3>
          <p className="text-xs sm:text-sm text-slate-500">Monday to Saturday live schedule with period timings and room assignments.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium bg-white/80 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200/60 shadow-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-700 flex items-center justify-center text-[8px] font-bold">F</div>
            <span className="text-slate-600">Free / Break</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-700 flex items-center justify-center text-[8px] font-bold">L</div>
            <span className="text-slate-600">Lecture / Lab</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500 text-amber-700 flex items-center justify-center text-[8px] font-bold">P</div>
            <span className="text-slate-600">Project / Sprint</span>
          </div>
        </div>
      </div>

      {/* Mobile day selector tabs */}
      <div className="flex md:hidden overflow-x-auto bg-slate-50 border-b border-slate-200/60 p-2 gap-1.5">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveTabMobile(day)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTabMobile === day
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Desktop & Tablet Table / Mobile Card View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-32">Day / Period</th>
              {STANDARD_PERIODS.map(p => (
                <th key={p.periodNumber} className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-bold">Period {p.periodNumber}</span>
                    <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {p.timeRange}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {DAYS.map(day => {
              const daySlots = timetable[day] || [];
              const isHighlighted = activeTabMobile === day;

              return (
                <tr key={day} className={`hover:bg-slate-50/50 transition-colors ${isHighlighted ? 'bg-indigo-50/20 md:bg-transparent' : ''}`}>
                  <td className="py-4 px-4 font-bold text-slate-900 bg-slate-50/40 border-r border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <span>{day}</span>
                    </div>
                  </td>
                  {STANDARD_PERIODS.map((periodMeta, idx) => {
                    const slot = daySlots[idx] || {
                      periodNumber: periodMeta.periodNumber,
                      timeRange: periodMeta.timeRange,
                      title: 'Free Slot',
                      type: 'free'
                    };

                    const isFree = slot.type === 'free';
                    const isLab = slot.type === 'lab';
                    const isProject = slot.type === 'project';

                    return (
                      <td
                        key={idx}
                        onClick={() => isEditable && onCellClick && onCellClick(day, idx)}
                        className={`p-3 border-r border-slate-100 last:border-r-0 align-top transition-all ${
                          isEditable ? 'cursor-pointer hover:bg-indigo-50/30' : ''
                        }`}
                      >
                        <div
                          className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all shadow-2xs ${
                            isFree
                              ? 'bg-emerald-50/40 border-emerald-200/70 text-emerald-900'
                              : isLab
                              ? 'bg-purple-50/50 border-purple-200/70 text-purple-900'
                              : isProject
                              ? 'bg-amber-50/50 border-amber-200/70 text-amber-900'
                              : 'bg-indigo-50/40 border-indigo-200/70 text-indigo-950'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs line-clamp-1">{slot.title}</span>
                            {isFree ? (
                              <Coffee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            )}
                          </div>

                          {slot.code && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/70 text-slate-700 w-fit border border-slate-200/50">
                              {slot.code}
                            </span>
                          )}

                          {slot.room && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="line-clamp-1">{slot.room}</span>
                            </div>
                          )}

                          {slot.facultyName && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-500">
                              <UserIcon className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="line-clamp-1">{slot.facultyName}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Saveetha Engineering College Automated Timetable Engine</span>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Live Sync Active
        </span>
      </div>
    </div>
  );
};
