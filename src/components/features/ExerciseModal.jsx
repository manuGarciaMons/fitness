import { useEffect, useRef } from 'react'
import { X, CheckCircle, AlertCircle, Lightbulb, Target, BarChart3 } from 'lucide-react'
import { clsx } from 'clsx'
import ExercisePose from './ExercisePose'

const LEVEL_CONFIG = {
  beginner: { label: 'Principiante', color: 'text-emerald-600 bg-emerald-50' },
  intermediate: { label: 'Intermedio', color: 'text-amber-600 bg-amber-50' },
  advanced: { label: 'Avanzado', color: 'text-red-600 bg-red-50' },
}

const FRAME_COLORS = ['#3b82f6', '#2563eb', '#1d4ed8']

function StepVisual({ step, index, exerciseType }) {
  const color = FRAME_COLORS[index] || FRAME_COLORS[0]

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-full rounded-2xl flex flex-col items-center justify-center p-3 gap-1.5 border-2"
        style={{ backgroundColor: `${color}0d`, borderColor: `${color}33` }}
      >
        <ExercisePose exerciseType={exerciseType} frame={index} color={color} size={72} />
        <p className="text-xs font-bold text-center" style={{ color }}>{step.label}</p>
      </div>
      <p className="text-xs text-slate-500 text-center leading-tight px-1">{step.description}</p>
    </div>
  )
}

export default function ExerciseModal({ exercise, onClose }) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const level = LEVEL_CONFIG[exercise.level] || LEVEL_CONFIG.beginner
  const exType = exercise.exerciseType || 'default'

  useEffect(() => {
    closeRef.current?.focus()
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable?.length) return
        const first = focusable[0], last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full', level.color)}>
                {level.label}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-blue-600 font-semibold">{exercise.sets}</span>
            </div>
            <h2 id="modal-title" className="text-xl font-black text-[#0f1f3d] leading-tight">
              {exercise.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Target className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} />
              <p className="text-sm text-slate-500 font-medium">{exercise.muscle}</p>
            </div>
          </div>
          <button ref={closeRef} onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Cerrar detalle del ejercicio">
            <X className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-6">

          {/* Step-by-step visual */}
          {exercise.steps && (
            <section>
              <h3 className="text-sm font-bold text-[#0f1f3d] mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" strokeWidth={2} />
                Secuencia del Movimiento
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {exercise.steps.map((step, i) => (
                  <StepVisual key={i} step={step} index={i} exerciseType={exType} />
                ))}
              </div>
            </section>
          )}

          {/* Instructions */}
          <div className="space-y-4">
            <section className="bg-blue-50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-blue-800 mb-2">Posición Inicial</h3>
              <p className="text-sm text-blue-700 leading-relaxed">{exercise.initialPosition}</p>
            </section>
            <section className="bg-slate-50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-[#0f1f3d] mb-2">Ejecución</h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exercise.execution}</p>
            </section>
            <section className="bg-amber-50 rounded-2xl p-4 flex gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <h3 className="text-sm font-bold text-amber-800 mb-1">Consejo Clave</h3>
                <p className="text-sm text-amber-700 leading-relaxed">{exercise.tip}</p>
              </div>
            </section>
          </div>

          {/* Success criteria */}
          <div className="grid grid-cols-2 gap-3">
            <section className="bg-emerald-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                <h3 className="text-sm font-bold text-emerald-800">Lo que debes sentir</h3>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed">{exercise.feel}</p>
            </section>
            <section className="bg-red-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-500" strokeWidth={2} />
                <h3 className="text-sm font-bold text-red-800">Evita esto</h3>
              </div>
              <p className="text-sm text-red-600 leading-relaxed">{exercise.avoid}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
