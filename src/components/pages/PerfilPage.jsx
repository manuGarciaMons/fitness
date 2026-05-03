import { useState } from 'react'
import { Camera, Award, TrendingUp, Dumbbell, Flame } from 'lucide-react'

// ─── helpers ───────────────────────────────────────────────────────────────

function localDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getWeekData(workoutHistory, weeksAgo) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const dow = today.getDay() // 0=Sun
  const toMonday = dow === 0 ? -6 : 1 - dow
  const monday = new Date(today)
  monday.setDate(today.getDate() + toMonday - weeksAgo * 7)

  // Map date → workout names for that day
  const byDate = {}
  workoutHistory.forEach(w => {
    if (!byDate[w.date]) byDate[w.date] = []
    byDate[w.date].push(w.name)
  })

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    const dateStr = localDateStr(day)
    const isFuture = day > today
    const workouts = byDate[dateStr] || []
    return { dateStr, active: workouts.length > 0, isFuture, workouts }
  })
}

function calcStats(history) {
  const now = new Date()
  const thisMonth = history.filter(w => {
    const d = new Date(w.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const uniqueDays = [...new Set(history.map(w => w.date))].sort().reverse()

  let streak = 0
  if (uniqueDays.length) {
    const mostRecent = new Date(uniqueDays[0] + 'T00:00:00')
    const diff = Math.floor((now - mostRecent) / 86400000)
    if (diff <= 1) {
      streak = 1
      let prev = mostRecent
      for (let i = 1; i < uniqueDays.length; i++) {
        const cur = new Date(uniqueDays[i] + 'T00:00:00')
        if (Math.floor((prev - cur) / 86400000) === 1) { streak++; prev = cur }
        else break
      }
    }
  }

  return { total: history.length, streak, thisMonth: thisMonth.length, uniqueDays: uniqueDays.length }
}

function calcAchievements(stats) {
  return [
    { icon: '🔥', title: 'Primera semana',    desc: '7 días seguidos entrenando',   unlocked: stats.streak >= 7 },
    { icon: '💪', title: '50 entrenamientos', desc: 'Completaste 50 sesiones',       unlocked: stats.total >= 50 },
    { icon: '🏆', title: 'Primer mes',        desc: '30 días activo',                unlocked: stats.uniqueDays >= 30 },
    { icon: '⚡', title: 'Racha de 14 días', desc: 'Entrena 14 días seguidos',      unlocked: stats.streak >= 14 },
    { icon: '🎯', title: '100 entrenamientos',desc: 'Completaste 100 sesiones',      unlocked: stats.total >= 100 },
    { icon: '🌟', title: 'Maestro del gym',   desc: 'Entrena 6 meses seguidos',      unlocked: stats.uniqueDays >= 180 },
  ]
}

const WEEK_LABELS = ['Esta semana', 'Semana pasada', 'Hace 2 semanas']
const DAY_LABELS  = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

// ─── component ─────────────────────────────────────────────────────────────

export default function PerfilPage({ workoutHistory = [] }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nombre: 'Manuel', apellido: 'García', email: 'dyg9812@gmail.com',
    peso: '78', altura: '178', objetivo: 'Hipertrofia',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const stats        = calcStats(workoutHistory)
  const achievements = calcAchievements(stats)
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const weeks        = [0, 1, 2].map(w => getWeekData(workoutHistory, w))

  return (
    <div className="px-8 py-6 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#0f1f3d]">Mi Perfil</h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left column */}
        <div className="col-span-1 space-y-4">
          {/* Avatar card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-black shadow-lg mx-auto">
                {form.nombre[0]}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-white border border-slate-200 shadow flex items-center justify-center hover:bg-blue-50 transition-colors">
                <Camera className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
              </button>
            </div>
            <p className="font-black text-[#0f1f3d] text-lg">{form.nombre} {form.apellido}</p>
            <p className="text-xs text-slate-400 mb-3">{form.email}</p>
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 font-semibold">{form.objetivo}</span>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
            {[
              { icon: Dumbbell,   label: 'Entrenamientos',  value: `${stats.total} sesiones`,    color: 'text-blue-500 bg-blue-50' },
              { icon: Flame,      label: 'Racha actual',    value: `${stats.streak} ${stats.streak === 1 ? 'día' : 'días'}`, color: 'text-orange-500 bg-orange-50' },
              { icon: TrendingUp, label: 'Este mes',        value: `${stats.thisMonth} sesiones`, color: 'text-emerald-500 bg-emerald-50' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-bold text-[#0f1f3d]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-2 space-y-4">
          {/* Edit form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0f1f3d]">Información Personal</h3>
              <button onClick={() => setEditing(e => !e)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                {editing ? 'Guardar cambios' : 'Editar'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['nombre', 'Nombre'], ['apellido', 'Apellido'], ['peso', 'Peso (kg)'], ['altura', 'Altura (cm)']].map(([k, lbl]) => (
                <div key={k}>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">{lbl}</label>
                  <input value={form[k]} onChange={e => set(k, e.target.value)} disabled={!editing}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                </div>
              ))}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-500 block mb-1">Objetivo</label>
                <select value={form.objetivo} onChange={e => set('objetivo', e.target.value)} disabled={!editing}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm disabled:bg-slate-50 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {['Hipertrofia', 'Pérdida de grasa', 'Fuerza', 'Resistencia', 'Salud general'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Activity heatmap */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0f1f3d]">Actividad Reciente</h3>
              <span className="text-xs text-slate-400 font-medium">
                {stats.total} entrenamientos en total
              </span>
            </div>

            {/* Day headers */}
            <div className="flex gap-1 mb-2 ml-0">
              {DAY_LABELS.map(d => (
                <span key={d} className="w-7 text-center text-[10px] font-semibold text-slate-400">{d}</span>
              ))}
            </div>

            {/* Week rows */}
            <div className="space-y-1.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {week.map(({ dateStr, active, isFuture, workouts }, di) => {
                      const tooltip = active
                        ? workouts.join(', ')
                        : isFuture ? 'Próximamente' : 'Sin entrenamiento'

                      return (
                        <div
                          key={di}
                          title={tooltip}
                          className={[
                            'w-7 h-7 rounded-lg transition-all cursor-default',
                            active
                              ? 'bg-blue-500 shadow-sm shadow-blue-200 dark:shadow-blue-900'
                              : isFuture
                              ? 'bg-slate-100 dark:bg-slate-800 opacity-40'
                              : 'bg-slate-100 dark:bg-slate-700',
                          ].join(' ')}
                        />
                      )
                    })}
                  </div>
                  <span className="text-xs text-slate-400 ml-1 whitespace-nowrap">{WEEK_LABELS[wi]}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-700" />
              <span className="text-[10px] text-slate-400 mr-3">Sin actividad</span>
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-[10px] text-slate-400">Entrenado</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" strokeWidth={2} />
              <h3 className="text-sm font-bold text-[#0f1f3d]">Logros</h3>
              <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2 py-0.5 font-semibold ml-auto">
                {unlockedCount}/{achievements.length} desbloqueados
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map(a => (
                <div key={a.title}
                  className={`rounded-xl p-3 border text-center transition-all ${a.unlocked ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                  <div className="text-2xl mb-1">{a.icon}</div>
                  <p className="text-xs font-bold text-[#0f1f3d]">{a.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
