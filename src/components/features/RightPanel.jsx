import { clsx } from 'clsx'
import {
  Dumbbell, BarChart3, Zap, Heart, Activity, Circle, Layers,
  Anchor, Cpu, User, Target, RotateCcw, Wind, Sparkles
} from 'lucide-react'
import { MUSCLE_GROUPS } from './BodyDiagram'

const EQUIPMENT = [
  { id: 'dumbbells', label: 'Mancuernas', icon: Dumbbell },
  { id: 'barbell', label: 'Barra Olímpica', icon: BarChart3 },
  { id: 'machines', label: 'Máquinas', icon: Cpu },
  { id: 'kettlebells', label: 'Kettlebells', icon: Anchor },
  { id: 'cables', label: 'Cables', icon: Zap },
  { id: 'plates', label: 'Plato', icon: Circle },
  { id: 'yoga', label: 'Yoga', icon: Wind },
  { id: 'cardio', label: 'Cardio', icon: Activity },
  { id: 'recovery', label: 'Recuperación', icon: Heart },
  { id: 'bodyweight', label: 'Peso Corporal', icon: User },
  { id: 'medicine_ball', label: 'Balón Medicinal', icon: Target },
  { id: 'stretching', label: 'Estiramientos', icon: RotateCcw },
  { id: 'band', label: 'Banda', icon: Layers },
  { id: 'trx', label: 'TRX', icon: Anchor },
  { id: 'bosu', label: 'Bosu Ball', icon: Circle },
  { id: 'smith', label: 'Smith Machine', icon: BarChart3 },
  { id: 'pilates', label: 'Pilates', icon: Sparkles },
]

function ToggleGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{label}</span>
      <div className="flex rounded-lg overflow-hidden border border-slate-200 shrink-0">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'px-3 py-1.5 text-xs font-semibold transition-all duration-150',
              value === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-500 hover:bg-slate-50'
            )}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function RightPanel({
  selectedMuscles,
  selectedEquipment,
  onEquipmentToggle,
  filters,
  onFilterChange,
  onGenerate,
  isGenerating,
}) {
  const muscleLabels = selectedMuscles
    .map((id) => MUSCLE_GROUPS[id]?.label)
    .filter(Boolean)

  return (
    <aside className="w-72 shrink-0 flex flex-col gap-4 overflow-y-auto scrollbar-thin pr-1" aria-label="Panel de configuración">

      {/* Selected Muscles */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="text-sm font-bold text-[#0f1f3d] mb-3">Selección de Zona</h2>
        {muscleLabels.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Haz clic en un músculo del diagrama</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {muscleLabels.map((label) => (
              <span key={label} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5 font-medium">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3">
        <h2 className="text-sm font-bold text-[#0f1f3d] mb-1">Parámetros</h2>
        <ToggleGroup
          label="Género"
          options={[{ value: 'male', label: 'Hombre' }, { value: 'female', label: 'Mujer' }]}
          value={filters.gender}
          onChange={(v) => onFilterChange('gender', v)}
        />
        <ToggleGroup
          label="Nivel"
          options={[{ value: 'beginner', label: 'Principiante' }, { value: 'advanced', label: 'Avanzado' }]}
          value={filters.level}
          onChange={(v) => onFilterChange('level', v)}
        />
        <ToggleGroup
          label="Enfoque"
          options={[{ value: 'joints', label: 'Articulaciones' }, { value: 'hypertrophy', label: 'Hipertrofia' }]}
          value={filters.focus}
          onChange={(v) => onFilterChange('focus', v)}
        />
      </div>

      {/* Equipment */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex-1">
        <h2 className="text-sm font-bold text-[#0f1f3d] mb-3">Mi Equipo</h2>
        <div className="grid grid-cols-2 gap-1.5">
          {EQUIPMENT.map(({ id, label, icon: Icon }) => {
            const isChecked = selectedEquipment.includes(id)
            return (
              <button
                key={id}
                onClick={() => onEquipmentToggle(id)}
                aria-pressed={isChecked}
                className={clsx(
                  'flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all duration-150 text-left',
                  isChecked
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'
                )}
              >
                <Icon className={clsx('w-3.5 h-3.5 shrink-0', isChecked ? 'text-blue-500' : 'text-slate-400')} strokeWidth={2} />
                <span className="truncate">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || selectedMuscles.length === 0 || selectedEquipment.length === 0}
        className={clsx(
          'w-full py-4 rounded-2xl text-sm font-bold tracking-wide shadow-md transition-all duration-200',
          isGenerating || selectedMuscles.length === 0 || selectedEquipment.length === 0
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-blue-200 hover:shadow-blue-300'
        )}
        aria-busy={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
            </svg>
            Generando...
          </span>
        ) : (
          'Generar Rutina Personalizada'
        )}
      </button>
    </aside>
  )
}
