export const SAVED_ROUTINES = [
  {
    id: 1, name: 'Pectoral con Mancuernas', muscles: ['Pectoral', 'Tríceps'],
    equipment: ['Mancuernas'], exercises: 3, duration: 40, level: 'Principiante',
    icon: '💪', color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 2, name: 'Piernas Completo', muscles: ['Cuádriceps', 'Glúteos', 'Femoral'],
    equipment: ['Barra', 'Máquinas'], exercises: 5, duration: 55, level: 'Intermedio',
    icon: '🦵', color: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: 3, name: 'Espalda y Bíceps', muscles: ['Dorsales', 'Bíceps', 'Trapecios'],
    equipment: ['Cables', 'Mancuernas'], exercises: 4, duration: 45, level: 'Intermedio',
    icon: '🏋️', color: 'bg-purple-50 border-purple-200',
  },
  {
    id: 4, name: 'Hombros y Tríceps', muscles: ['Hombros', 'Tríceps'],
    equipment: ['Mancuernas', 'Banda'], exercises: 4, duration: 40, level: 'Principiante',
    icon: '🎯', color: 'bg-amber-50 border-amber-200',
  },
  {
    id: 5, name: 'Core Intensivo', muscles: ['Abdomen', 'Oblicuos'],
    equipment: ['Peso Corporal', 'Banda'], exercises: 5, duration: 30, level: 'Principiante',
    icon: '⚡', color: 'bg-red-50 border-red-200',
  },
  {
    id: 6, name: 'Glúteos con Banda', muscles: ['Glúteos', 'Femoral'],
    equipment: ['Banda', 'Peso Corporal'], exercises: 4, duration: 35, level: 'Principiante',
    icon: '🔥', color: 'bg-pink-50 border-pink-200',
  },
]

export const DAILY_TIPS = [
  'Descansa al menos 48h entre sesiones del mismo grupo muscular para maximizar la recuperación.',
  'La hidratación es clave: bebe agua antes, durante y después del entrenamiento.',
  'El sueño es cuando más crece el músculo. Intenta dormir entre 7 y 9 horas cada noche.',
  'Calienta siempre 5-10 minutos antes de entrenar para prevenir lesiones.',
  'La progresión de carga es fundamental: aumenta peso o repeticiones poco a poco cada semana.',
  'Come proteína dentro de los 30-60 minutos tras el entrenamiento para optimizar la recuperación.',
  'La constancia supera a la intensidad: mejor entrenar 4 días moderado que 1 día al límite.',
  'Registra tus entrenamientos para ver tu progreso y mantenerte motivado.',
  'Los estiramientos post-entrenamiento reducen el dolor muscular al día siguiente.',
  'El entrenamiento en ayunas puede ayudar a quemar grasa, pero escucha a tu cuerpo.',
  'Varía los ejercicios cada 4-6 semanas para evitar la adaptación muscular.',
  'La técnica siempre antes que el peso: una mala postura puede causar lesiones graves.',
  'El estrés y el cortisol dificultan la ganancia muscular. Gestiona bien tu descanso mental.',
  'Incluye ejercicios compuestos (sentadilla, press banca, peso muerto) como base de tu rutina.',
]

export function getDailyTip() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const dayOfYear = Math.floor((new Date() - start) / 86400000)
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}

// Seed history: last 5 days for a realistic initial state
function buildSeedHistory() {
  const today = new Date()
  const entries = [
    { routineId: 1, name: 'Pectoral con Mancuernas', icon: '💪', duration: 40, exercises: 3 },
    { routineId: 2, name: 'Piernas Completo', icon: '🦵', duration: 55, exercises: 5 },
    { routineId: 4, name: 'Hombros y Tríceps', icon: '🎯', duration: 40, exercises: 4 },
    { routineId: 3, name: 'Espalda y Bíceps', icon: '🏋️', duration: 45, exercises: 4 },
    { routineId: 5, name: 'Core Intensivo', icon: '⚡', duration: 30, exercises: 5 },
  ]
  return entries.map((e, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return { id: `seed-${i}`, ...e, date: `${y}-${m}-${d}` }
  })
}

export const SEED_HISTORY = buildSeedHistory()
