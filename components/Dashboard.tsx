import React from 'react';
import { Student } from '../types';
import { 
  LogOut, 
  Clock, 
  UserCircle,
  CheckCircle2,
  AlertCircle,
  Wallet
} from 'lucide-react';

const LogoIcon = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="20" y="20" width="360" height="360" fill="none" stroke="black" strokeWidth="24"/>
    <line x1="20" y1="380" x2="380" y2="20" stroke="black" strokeWidth="24"/>
    <circle cx="100" cy="140" r="35" fill="none" stroke="black" strokeWidth="24"/>
    <path d="M170 230 A 60 60 0 0 1 280 120" fill="none" stroke="black" strokeWidth="24" strokeLinecap="round"/>
    <path d="M290 240 v 90 M 245 285 h 90" fill="none" stroke="black" strokeWidth="24" strokeLinecap="round"/>
  </svg>
);

interface DashboardProps {
  student: Student;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ student, onLogout }) => {
  
  const sessions = student.sessions || [];

  // 计算总时长
  const totalHours = sessions.reduce((acc, curr) => acc + (parseFloat(String(curr.hours)) || 0), 0);

  // 计算未付时长
  // 逻辑：如果状态不包含 "paid" 或者包含 "unpaid" (如 "Unpaid", "Pending", ""), 则计入
  const unpaidHours = sessions.reduce((acc, session) => {
    const status = String(session.clientPaid).toLowerCase();
    const isPaid = status.includes('paid') && !status.includes('unpaid');
    return isPaid ? acc : acc + (parseFloat(String(session.hours)) || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10">
                <LogoIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-slate-900 tracking-tighter uppercase leading-none">Weekend</span>
                <span className="font-black text-lg text-slate-900 tracking-tighter uppercase leading-none">Studio</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {student.name}
              </div>
              <button 
                onClick={onLogout}
                className="text-slate-300 hover:text-black p-2.5 rounded-xl hover:bg-slate-100 transition-all group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-3 block">Dashboard Control</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Parent of {student.name}</h1>
            <p className="text-slate-400 mt-3 text-lg font-medium">Monitoring academic progress and session logs.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
             {/* Total Hours */}
             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 min-w-[180px] flex-1 md:flex-none">
                <div className="bg-black p-3.5 rounded-2xl text-white shadow-lg shadow-black/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total Hours</p>
                  <p className="text-3xl font-black text-slate-900 leading-none mt-1.5">{totalHours.toFixed(1)}</p>
                </div>
             </div>

             {/* Unpaid Hours */}
             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 min-w-[180px] flex-1 md:flex-none">
                <div className="bg-amber-500 p-3.5 rounded-2xl text-white shadow-lg shadow-amber-500/20">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Unpaid Hours</p>
                  <p className="text-3xl font-black text-amber-600 leading-none mt-1.5">{unpaidHours.toFixed(1)}</p>
                </div>
             </div>

             {/* Lead Tutor */}
             <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 min-w-[180px] flex-1 md:flex-none">
                <div className="bg-slate-100 p-3.5 rounded-2xl text-black">
                  <UserCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Lead Tutor</p>
                  <p className="text-2xl font-black text-slate-900 leading-tight mt-1.5 line-clamp-1">{student.tutorName || "N/A"}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
           <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
             <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.3em]">Session Records</h3>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left border-collapse">
               <thead className="bg-white text-slate-300 font-black uppercase tracking-widest text-[9px] border-b border-slate-100">
                 <tr>
                   <th className="px-10 py-6">#</th>
                   <th className="px-10 py-6">Date</th>
                   <th className="px-10 py-6">Start Time</th>
                   <th className="px-10 py-6">End Time</th>
                   <th className="px-10 py-6 text-center">Duration</th>
                   <th className="px-10 py-6">Tutor</th>
                   <th className="px-10 py-6">Round</th>
                   <th className="px-10 py-6">Payment Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {sessions.length > 0 ? (
                   sessions.map((session) => (
                     <tr key={session.id} className="hover:bg-slate-50/50 transition-all group">
                       <td className="px-10 py-7 font-black text-slate-200 group-hover:text-black transition-colors">{session.no}</td>
                       <td className="px-10 py-7">
                         <div className="font-black text-slate-900 text-base">{session.date}</div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{session.day}</div>
                       </td>
                       <td className="px-10 py-7 font-bold text-slate-500">{session.startTime}</td>
                       <td className="px-10 py-7 font-bold text-slate-500">{session.endTime}</td>
                       <td className="px-10 py-7 text-center">
                         <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black bg-black text-white uppercase tracking-tighter whitespace-nowrap">
                           {(parseFloat(String(session.hours)) || 0).toFixed(1)} hrs
                         </span>
                       </td>
                       <td className="px-10 py-7 font-black text-slate-800">{session.tutor}</td>
                       <td className="px-10 py-7 text-slate-300 font-bold">R{session.round}</td>
                       <td className="px-10 py-7">
                         {String(session.clientPaid).toLowerCase().includes('paid') && !String(session.clientPaid).toLowerCase().includes('unpaid') ? (
                           <span className="flex items-center w-fit gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 border border-green-100">
                             <CheckCircle2 className="w-3 h-3" />
                             Verified
                           </span>
                         ) : (
                           <span className="flex items-center w-fit gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100">
                             <AlertCircle className="w-3 h-3" />
                             {session.clientPaid || 'Pending'}
                           </span>
                         )}
                         {session.datePaid && session.datePaid !== '-' && session.datePaid !== '' && (
                            <div className="text-[9px] font-black text-slate-300 mt-2.5 ml-1 uppercase tracking-tighter">
                              Rec: {session.datePaid}
                            </div>
                         )}
                       </td>
                     </tr>
                   ))
                 ) : (
                   <tr>
                     <td colSpan={8} className="px-10 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-slate-200" />
                          </div>
                          <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[10px]">No activity logs found</p>
                        </div>
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;