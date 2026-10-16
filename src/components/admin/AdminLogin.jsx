import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../services/pocketbase';

export const AdminLogin = ({ onLoginSuccess, onBackToStore }) => {
  const [email, setEmail] = useState('contacto@pekebook.cl');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingrese su correo y contraseña.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const auth = await loginAdmin(email.trim(), password);
      if (auth.success) {
        onLoginSuccess(auth);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error al autenticar. Verifique sus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6 text-slate-800 antialiased">
      {/* Return to store top button */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <button
          onClick={onBackToStore}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-pink-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la tienda PekeBook</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 mb-4 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#ee2b91]" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
            Gestión de Productos
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Acceso administrativo privado • PekeBook Puerto Montt
          </p>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-shake">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <p className="flex-1">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@pekebook.cl"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ee2b91] focus:ring-2 focus:ring-pink-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#ee2b91] hover:bg-[#d61e7e] active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-md shadow-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verificando credenciales...</span>
              </>
            ) : (
              <span>Entrar al Panel de Control</span>
            )}
          </button>
        </form>

        {/* Security assurance */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Conexión cifrada TLS 1.3 con base de datos segura bd.pekebook.cl
          </p>
        </div>
      </div>
    </div>
  );
};
