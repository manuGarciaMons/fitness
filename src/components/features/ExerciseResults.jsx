import { useState } from 'react'
import { Sparkles, RotateCcw } from 'lucide-react'
import ExerciseCard from './ExerciseCard'
import ExerciseModal from './ExerciseModal'
import { MUSCLE_GROUPS } from './BodyDiagram'

export default function ExerciseResults({ exercises, selectedMuscles, onReset }) {
  const [activeExercise, setActiveExercise] = useState(null)

  const muscleLabels = selectedMuscles
    .map((id) => MUSCLE_GROUPS[id]?.label)
    .filter(Boolean)
    .join(', ')

  return (
    <div className="mt-6">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-base font-black text-[#0f1f3d]">Rutina Personalizada</h2>
            {muscleLabels && (
              <p className="text-xs text-slate-400 font-medium">Para: {muscleLabels}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {exercises.length} ejercicio{exercises.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            Nueva búsqueda
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 mb-4 rounded-full" />

      {exercises.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-500 font-medium text-sm">No encontramos ejercicios para esta combinación.</p>
          <p className="text-slate-400 text-xs mt-1">Prueba seleccionando más equipamiento o músculos diferentes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onViewDetails={setActiveExercise}
            />
          ))}
        </div>
      )}

      {activeExercise && (
        <ExerciseModal
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  )
}
