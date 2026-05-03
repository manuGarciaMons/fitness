import { useState } from 'react'
import { clsx } from 'clsx'
import { Dumbbell, Clock, ChevronRight, Trash2, Copy, Search } from 'lucide-react'
import { SAVED_ROUTINES } from '../../data/routines'

const LEVELS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado']

export default function MisRutinasPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('Todos')

  const filtered = SAVED_ROUTINES.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.muscles.some(m => m.toLowerCase().includes(search.toLowerCase()))
    const matchLevel = levelFilter === 'Todos' || r.level === levelFilter
    return matchSearch && matchLevel
  })

  return (
    <div className="px-8 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-[#0f1f3d]">Mis Rutinas</h2>
          <p className="text-slate-400 text-sm mt-1">{SAVED_ROUTINES.length} rutinas guardadas</p>
        </div>
        <button onClick={() => onNavigate('entrenamientos')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
          <Dumbbell className="w-4 h-4" strokeWidth={2.5} />
          Nueva Rutina
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
          <input
            type="search"
            placeholder="Buscar por nombre o músculo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={clsx('px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                levelFilter === l ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50')}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-500 font-medium">No hay rutinas que coincidan</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(r => (
            <div key={r.id} className={clsx('bg-white rounded-2xl border p-4 hover:shadow-md transition-all group', r.color)}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/10 flex items-center justify-center text-xl shadow-sm border border-white dark:border-white/10">
                  {r.icon}
                </div>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-lg hover:bg-white/80 dark:hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors" title="Duplicar">
                    <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-white/80 dark:hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-sm text-[#0f1f3d] mb-1">{r.name}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {r.muscles.map(m => (
                  <span key={m} className="text-[10px] bg-white/70 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/15 rounded-full px-2 py-0.5 font-medium">{m}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Dumbbell className="w-3.5 h-3.5" strokeWidth={2} />{r.exercises} ejercicios</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" strokeWidth={2} />{r.duration} min</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10">
                <span className="text-[10px] text-slate-400">{r.level}</span>
                <button onClick={() => onNavigate('entrenamientos')}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Iniciar <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
