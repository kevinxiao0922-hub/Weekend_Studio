import React, { useState } from 'react';
import { loginStudent } from '../services/studentService';
import { Student } from '../types';
import { Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

import logo from "./logo.png";

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Weekend Studio logo"
      className="w-full h-full object-contain"
    />
  );
};

interface LoginProps {
  onLogin: (student: Student) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const student = await loginStudent(studentId, password);
      onLogin(student);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8 pt-12 text-center">
          <div className="mx-auto w-32 mb-6">
            <Logo />
          </div>
          <div className="mt-4">
            <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase">Parent Portal</p>
          </div>
        </div>

        <div className="p-8 pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Student ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-slate-900 font-bold placeholder:text-slate-200"
                  placeholder="ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-slate-900 font-bold placeholder:text-slate-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 text-xs rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-5 px-6 rounded-2xl shadow-xl text-xs font-black tracking-widest text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform active:scale-[0.97] ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  ENTER PORTAL <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
