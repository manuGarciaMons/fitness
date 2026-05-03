import { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import BodyDiagram from './components/features/BodyDiagram'
import RightPanel from './components/features/RightPanel'
import ExerciseResults from './components/features/ExerciseResults'
import LoginPage from './components/pages/LoginPage'
import InicioPage from './components/pages/InicioPage'
import MisRutinasPage from './components/pages/MisRutinasPage'
import HerramientasPage from './components/pages/HerramientasPage'
import ArticulosPage from './components/pages/ArticulosPage'
import ConfigPage from './components/pages/ConfigPage'
import PerfilPage from './components/pages/PerfilPage'
import { getExercisesForMusclesAndEquipment } from './data/exercises'
import { useLocalStorage } from './hooks/useLocalStorage'
import { SEED_HISTORY } from './data/routines'

const DEFAULT_FILTERS = { gender: 'male', level: 'beginner', focus: 'hypertrophy' }

const PAGE_HEADERS = {
  inicio: { title: 'Inicio', subtitle: 'Resumen de tu actividad y progreso' },
  entrenamientos: { title: 'Planificador de Entrenamientos', subtitle: 'Selecciona zonas musculares y tu equipamiento para generar tu rutina' },
  rutinas: { title: 'Mis Rutinas', subtitle: 'Tus rutinas guardadas y favoritas' },
  herramientas: { title: 'Mis Herramientas', subtitle: 'Calculadoras y utilidades para tu entrenamiento' },
  articulos: { title: 'Artículos', subtitle: 'Conocimiento respaldado por ciencia' },
  config: { title: 'Configuración', subtitle: 'Personaliza tu experiencia' },
  perfil: { title: 'Mi Perfil', subtitle: 'Tu información y estadísticas' },
}

function EntrenamientosPage({ selectedMuscles, setSelectedMuscles, selectedEquipment, setSelectedEquipment, filters, setFilters, generatedExercises, setGeneratedExercises, isGenerating, setIsGenerating }) {

  const handleMuscleToggle = (id) => {
    setSelectedMuscles(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])
    if (generatedExercises) setGeneratedExercises(null)
  }

  const handleEquipmentToggle = (id) => {
    setSelectedEquipment(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])
    if (generatedExercises) setGeneratedExercises(null)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (generatedExercises) setGeneratedExercises(null)
  }

  const handleGenerate = async () => {
    if (selectedMuscles.length === 0 || selectedEquipment.length === 0) return
    setIsGenerating(true)
    await new Promise(r => setTimeout(r, 900))
    setGeneratedExercises(getExercisesForMusclesAndEquipment(selectedMuscles, selectedEquipment))
    setIsGenerating(false)
    setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleReset = () => {
    setGeneratedExercises(null)
    setSelectedMuscles([])
    setSelectedEquipment([])
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className="flex flex-1 gap-0 overflow-hidden">
      {/* Central area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin">
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-4" aria-label="Diagrama anatómico interactivo">
          <div className="px-6 pt-5 pb-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0f1f3d]">Diagrama Anatómico</h2>
              <p className="text-xs text-slate-400 mt-0.5">Haz clic en los músculos que quieres trabajar</p>
            </div>
            {selectedMuscles.length > 0 && (
              <button onClick={() => { setSelectedMuscles([]); setGeneratedExercises(null) }}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all">
                Limpiar selección
              </button>
            )}
          </div>
          <BodyDiagram selectedMuscles={selectedMuscles} onMuscleToggle={handleMuscleToggle} />
        </section>

        {generatedExercises && (
          <section id="results-section" aria-label="Ejercicios generados">
            <ExerciseResults exercises={generatedExercises} selectedMuscles={selectedMuscles} onReset={handleReset} />
          </section>
        )}
      </div>

      {/* Right Panel */}
      <div className="shrink-0 px-5 py-6 overflow-y-auto scrollbar-thin" style={{ width: '308px' }}>
        <RightPanel
          selectedMuscles={selectedMuscles}
          selectedEquipment={selectedEquipment}
          onEquipmentToggle={handleEquipmentToggle}
          filters={filters}
          onFilterChange={handleFilterChange}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  )
}

export default function App() {
  const [section, setSection] = useState('inicio')
  const [selectedMuscles, setSelectedMuscles] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [generatedExercises, setGeneratedExercises] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('fitplanner_auth', false)
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', SEED_HISTORY)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  const handleLogWorkout = (entry) => setWorkoutHistory(prev => [entry, ...prev])
  const handleLogout = () => setIsAuthenticated(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />
  }

  const header = PAGE_HEADERS[section] || PAGE_HEADERS.inicio

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] dark:bg-slate-900">
      <Sidebar activeSection={section} onNavigate={setSection} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black text-[#0f1f3d] dark:text-slate-100 leading-tight">{header.title}</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{header.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div
              onClick={() => setSection('perfil')}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow cursor-pointer hover:shadow-md transition-shadow"
            >
              M
            </div>
            <div className="text-right hidden sm:block cursor-pointer" onClick={() => setSection('perfil')}>
              <p className="text-sm font-semibold text-[#0f1f3d] leading-tight">Manuel</p>
              <p className="text-xs text-slate-400">Principiante</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 overflow-hidden">
          {section === 'inicio' && <div className="flex-1 overflow-y-auto scrollbar-thin"><InicioPage onNavigate={setSection} workoutHistory={workoutHistory} onLogWorkout={handleLogWorkout} /></div>}
          {section === 'entrenamientos' && (
            <EntrenamientosPage
              selectedMuscles={selectedMuscles} setSelectedMuscles={setSelectedMuscles}
              selectedEquipment={selectedEquipment} setSelectedEquipment={setSelectedEquipment}
              filters={filters} setFilters={setFilters}
              generatedExercises={generatedExercises} setGeneratedExercises={setGeneratedExercises}
              isGenerating={isGenerating} setIsGenerating={setIsGenerating}
            />
          )}
          {section === 'rutinas' && <div className="flex-1 overflow-y-auto scrollbar-thin"><MisRutinasPage onNavigate={setSection} /></div>}
          {section === 'herramientas' && <div className="flex-1 overflow-y-auto scrollbar-thin"><HerramientasPage /></div>}
          {section === 'articulos' && <div className="flex-1 overflow-y-auto scrollbar-thin"><ArticulosPage /></div>}
          {section === 'config' && <div className="flex-1 overflow-y-auto scrollbar-thin"><ConfigPage darkMode={darkMode} onDarkModeChange={setDarkMode} /></div>}
          {section === 'perfil' && <div className="flex-1 overflow-y-auto scrollbar-thin"><PerfilPage workoutHistory={workoutHistory} /></div>}
        </div>
      </main>
    </div>
  )
}
