import { clsx } from 'clsx'
import { Star, Clock, Eye } from 'lucide-react'
import ExercisePose from './ExercisePose'

const LEVEL_CONFIG = {
  beginner: { label: 'Principiante', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  intermediate: { label: 'Intermedio', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  advanced: { label: 'Avanzado', color: 'text-red-600 bg-red-50 border-red-200' },
}

const FRAME_COLORS = ['#3b82f6', '#2563eb', '#1d4ed8']

function ExerciseIllustration({ steps, exerciseType }) {
  return (
    <div className="flex gap-1.5 mb-3">
      {steps.map((step, i) => (
        <div key={i} className="flex-1 relative">
          <div
            className="rounded-xl flex flex-col items-center justify-center py-2 px-1 gap-1 border"
            style={{
              backgroundColor: `${FRAME_COLORS[i]}0d`,
              borderColor: `${FRAME_COLORS[i]}30`,
            }}
          >
            <ExercisePose exerciseType={exerciseType} frame={i} color={FRAME_COLORS[i]} size={48} />
            <span
              className="text-[9px] font-bold text-center leading-tight"
              style={{ color: FRAME_COLORS[i] }}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 z-10">
              <svg viewBox="0 0 10 10" className="w-3 h-3">
                <path d="M1 5h8M6 2l3 3-3 3" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ExerciseCard({ exercise, onViewDetails }) {
  const level = LEVEL_CONFIG[exercise.level] || LEVEL_CONFIG.beginner

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:border-blue-100 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-[#0f1f3d] leading-tight mb-1 group-hover:text-blue-700 transition-colors">
            {exercise.name}
          </h3>
          <p className="text-xs text-slate-400 font-medium">{exercise.muscle}</p>
        </div>
        <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0', level.color)}>
          {level.label}
        </span>
      </div>

      {/* Illustration */}
      {exercise.steps && (
        <ExerciseIllustration steps={exercise.steps} exerciseType={exercise.exerciseType || 'default'} />
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Star className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
          <span>{exercise.sets}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
          <span>{exercise.rest}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{exercise.description}</p>

      <button
        onClick={() => onViewDetails(exercise)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold border border-blue-200 hover:border-blue-600 transition-all duration-200"
      >
        <Eye className="w-3.5 h-3.5" strokeWidth={2} />
        Ver Cómo Hacerlo
      </button>
    </div>
  )
}
