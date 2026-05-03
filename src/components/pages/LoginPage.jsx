import { useState } from 'react'
import { Dumbbell, Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))

    const validUser = import.meta.env.VITE_USERNAME
    const validPass = import.meta.env.VITE_PASSWORD

    if (user === validUser && pass === validPass) {
      onLogin()
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg mb-4">
            <Dumbbell className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-[#0f1f3d] dark:text-slate-100">FitPlanner</h1>
          <p className="text-sm text-slate-400 mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setError('') }}
                placeholder="Tu usuario"
                autoComplete="username"
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-[#0f1f3d] dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={e => { setPass(e.target.value); setError('') }}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  className="w-full px-3 py-2.5 pr-10 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-[#0f1f3d] dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" strokeWidth={2} />
                    : <Eye className="w-4 h-4" strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !user || !pass}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white text-sm font-bold rounded-xl transition-colors mt-2"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <LogIn className="w-4 h-4" strokeWidth={2.5} />}
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          FitPlanner Pro · Acceso privado
        </p>
      </div>
    </div>
  )
}
