import { useState } from 'react'
import { Dumbbell, Flame, Target, TrendingUp, ChevronRight, Play, Clock, Calendar, Plus, X, Check } from 'lucide-react'
import { SAVED_ROUTINES, getDailyTip } from '../../data/routines'

// ─── helpers ───────────────────────────────────────────────────────────────

function calcStats(history) {
  const now = new Date()
  const thisMonth = history.filter(w => {
    const d = new Date(w.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const caloriesBurned = history.reduce((sum, w) => sum + Math.round(w.duration * 6), 0)

  // consecutive-day streak ending today or yesterday
  const uniqueDates = [...new Set(history.map(w => w.date))].sort().reverse()
  let streak = 0
  if (uniqueDates.length) {
    const mostRecent = new Date(uniqueDates[0])
    const diffToday = Math.floor((now - mostRecent) / 86400000)
    if (diffToday <= 1) {
      streak = 1
      let prev = mostRecent
      for (let i = 1; i < uniqueDates.length; i++) {
        const cur = new Date(uniqueDates[i])
        if (Math.floor((prev - cur) / 86400000) === 1) { streak++; prev = cur }
        else break
      }
    }
  }

  const monthlyGoal = 16
  const monthlyPct = Math.min(100, Math.round((thisMonth.length / monthlyGoal) * 100))

  return { workoutsThisMonth: thisMonth.length, caloriesBurned, streak, monthlyPct, monthlyGoal }
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return '¡Buenos días'
  if (h < 18) return '¡Buenas tardes'
  return '¡Buenas noches'
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today - d) / 86400000)
  if (diff === 0) return 'Hoy'
  if (diff === 1) return 'Ayer'
  if (diff < 7) return `Hace ${diff} días`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

function getNextRoutine(history) {
  // routine with the oldest lastDone (or never done)
  const lastDoneMap = {}
  history.forEach(w => {
    if (w.routineId != null) {
      const prev = lastDoneMap[w.routineId]
      if (!prev || w.date > prev) lastDoneMap[w.routineId] = w.date
    }
  })
  const notDone = SAVED_ROUTINES.filter(r => !lastDoneMap[r.id])
  if (notDone.length) return notDone[0]
  return SAVED_ROUTINES.slice().sort((a, b) =>
    (lastDoneMap[a.id] || '') < (lastDoneMap[b.id] || '') ? -1 : 1
  )[0]
}

// ─── Log Workout Modal ──────────────────────────────────────────────────────

function LogModal({ onClose, onLog }) {
  const [selected, setSelected] = useState(null)
  const [duration, setDuration] = useState('')
  const [done, setDone] = useState(false)

  const handleSelect = (r) => {
    setSelected(r)
    setDuration(String(r.duration))
  }

  const handleSubmit = () => {
    if (!selected) return
    const mins = parseInt(duration) || selected.duration
    onLog({
      id: `w-${Date.now()}`,
      routineId: selected.id,
      name: selected.name,
      icon: selected.icon,
      duration: mins,
      exercises: selected.exercises,
      date: new Date().toISOString().split('T')[0],
    })
    setDone(true)
    setTimeout(onClose, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0f1f3d]">Registrar entrenamiento</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-7 h-7 text-emerald-600" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-semibold text-[#0f1f3d]">¡Entrenamiento registrado!</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-400 font-medium">Selecciona la rutina completada</p>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {SAVED_ROUTINES.map(r => (
                <button key={r.id} onClick={() => handleSelect(r)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                    selected?.id === r.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                  }`}>
                  <span className="text-xl shrink-0">{r.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0f1f3d] truncate leading-tight">{r.name}</p>
                    <p className="text-[10px] text-slate-400">{r.exercises} ejerc. · {r.duration} min</p>
                  </div>
                </button>
              ))}
            </div>

            {selected && (
              <div className="flex items-center gap-3 pt-1">
                <label className="text-xs text-slate-500 font-medium whitespace-nowrap">Duración real</label>
                <div className="relative">
                  <input
                    type="number" min={1} max={240}
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-20 pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold text-[#0f1f3d] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">min</span>
                </div>
              </div>
            )}

            <button onClick={handleSubmit} disabled={!selected}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-bold rounded-xl transition-colors">
              Registrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function InicioPage({ onNavigate, workoutHistory, onLogWorkout }) {
  const [showModal, setShowModal] = useState(false)

  const { workoutsThisMonth, caloriesBurned, streak, monthlyPct, monthlyGoal } = calcStats(workoutHistory)
  const recent = [...workoutHistory].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const nextRoutine = getNextRoutine(workoutHistory)
  const dailyTip = getDailyTip()

  const STATS = [
    {
      label: 'Entrenamientos este mes', value: String(workoutsThisMonth), unit: 'sesiones',
      icon: Dumbbell, color: 'bg-blue-50 text-blue-600', bar: 'bg-blue-500',
      pct: Math.min(100, Math.round((workoutsThisMonth / monthlyGoal) * 100)),
    },
    {
      label: 'Calorías quemadas', value: caloriesBurned.toLocaleString('es-ES'), unit: 'kcal',
      icon: Flame, color: 'bg-orange-50 text-orange-500', bar: 'bg-orange-400',
      pct: Math.min(100, Math.round((caloriesBurned / 5000) * 100)),
    },
    {
      label: 'Racha actual', value: String(streak), unit: streak === 1 ? 'día' : 'días',
      icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500',
      pct: Math.min(100, Math.round((streak / 7) * 100)),
    },
    {
      label: 'Objetivo mensual', value: String(monthlyPct), unit: '% completado',
      icon: Target, color: 'bg-purple-50 text-purple-600', bar: 'bg-purple-500',
      pct: monthlyPct,
    },
  ]

  const streakMsg = streak === 0
    ? 'Registra tu primer entrenamiento del día.'
    : streak === 1
    ? 'Llevas 1 día entrenando. ¡Comienza tu racha!'
    : `Llevas ${streak} días seguidos entrenando. ¡Sigue así!`

  return (
    <>
      {showModal && (
        <LogModal
          onClose={() => setShowModal(false)}
          onLog={(entry) => { onLogWorkout(entry); setShowModal(false) }}
        />
      )}

      <div className="px-8 py-6 max-w-5xl">
        {/* Welcome */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0f1f3d]">{getGreeting()}, Manuel! 👋</h2>
            <p className="text-slate-400 text-sm mt-1">{streakMsg}</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shrink-0">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Registrar entrenamiento
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {STATS.map(({ label, value, unit, icon: Icon, color, bar, pct }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <p className="text-2xl font-black text-[#0f1f3d] leading-none">{value}</p>
              <p className="text-xs text-slate-400 font-medium mt-1">{unit}</p>
              <p className="text-xs text-slate-500 mt-2 mb-1.5">{label}</p>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Recent workouts */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0f1f3d]">Entrenamientos Recientes</h3>
              <button onClick={() => onNavigate('rutinas')}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-3">🏋️</div>
                <p className="text-sm font-semibold text-slate-500">Sin entrenamientos aún</p>
                <p className="text-xs text-slate-400 mt-1">Registra tu primer entrenamiento para verlo aquí.</p>
                <button onClick={() => setShowModal(true)}
                  className="mt-3 text-xs text-blue-600 font-semibold hover:underline">
                  Registrar ahora
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">{r.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0f1f3d] truncate">{r.name}</p>
                      <p className="text-xs text-slate-400">{r.exercises} ejercicios · {r.duration} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{formatDate(r.date)}</p>
                      <div className="flex items-center gap-1 text-xs text-blue-500 font-medium mt-0.5">
                        <Clock className="w-3 h-3" />
                        {r.duration} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick start */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-[#0f1f3d] mb-4">Inicio Rápido</h3>
            <div className="space-y-2.5">
              {SAVED_ROUTINES.slice(0, 3).map((r) => (
                <button key={r.id} onClick={() => onNavigate('rutinas')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all text-left group">
                  <span className="text-xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0f1f3d] truncate">{r.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{r.duration} min · {r.level}</p>
                  </div>
                  <Play className="w-4 h-4 text-blue-400 group-hover:text-blue-600 shrink-0" strokeWidth={2} />
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <p className="text-xs font-bold mb-1">💡 Consejo del día</p>
              <p className="text-[11px] leading-relaxed opacity-90">{dailyTip}</p>
            </div>
          </div>
        </div>

        {/* Next workout banner */}
        <div className="mt-4 bg-gradient-to-r from-[#0f1f3d] to-[#1a3260] rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center text-2xl">
              {nextRoutine?.icon || <Calendar className="w-6 h-6 text-blue-300" />}
            </div>
            <div>
              <p className="text-white font-bold">Próximo entrenamiento sugerido</p>
              <p className="text-blue-300 text-sm">
                {nextRoutine
                  ? `${nextRoutine.name} · ${nextRoutine.duration} min estimado`
                  : 'Planifica tu próxima sesión'}
              </p>
            </div>
          </div>
          <button onClick={() => onNavigate('entrenamientos')}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors">
            Planificar ahora
          </button>
        </div>
      </div>
    </>
  )
}
