import { useState } from 'react'
import { clsx } from 'clsx'
import { Clock, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react'

const ARTICLES = [
  {
    id: 1, tag: 'Nutrición', title: 'Cuánta proteína necesitas realmente para ganar músculo',
    excerpt: 'La ciencia actual indica que entre 1.6 y 2.2g por kg de peso corporal es el rango óptimo para la mayoría de personas que entrenan fuerza...',
    time: '5 min', date: '24 abr', emoji: '🥩', color: 'bg-red-50 text-red-600',
    body: [
      { type: 'heading', text: '¿Cuánta proteína es suficiente?' },
      { type: 'text', text: 'La creencia popular de que "más proteína = más músculo" no es del todo correcta. La investigación actual muestra que el rango óptimo para maximizar la síntesis proteica muscular se sitúa entre 1.6 y 2.2 gramos por kilogramo de peso corporal al día.' },
      { type: 'text', text: 'Superar ese umbral no produce beneficios adicionales para la mayoría de personas. Si pesas 75 kg, con 120-165 g de proteína diaria es suficiente para optimizar tus ganancias musculares.' },
      { type: 'heading', text: 'Distribución a lo largo del día' },
      { type: 'text', text: 'Tan importante como la cantidad total es cómo la distribuyes. Estudios de referencia muestran que consumir 0.4 g/kg en cada comida, repartidas en 3-4 tomas, maximiza la síntesis muscular mejor que concentrarla en una o dos ingestas.' },
      { type: 'tip', text: 'Si pesas 80 kg, intenta incluir entre 30-35 g de proteína en cada comida principal.' },
      { type: 'heading', text: 'Fuentes de calidad' },
      { type: 'text', text: 'Prioriza fuentes completas: huevos, pollo, ternera magra, pescado, lácteos y legumbres combinadas con cereales. Los suplementos de proteína (whey, caseína) son útiles para completar el total diario, pero no deben ser la fuente principal.' },
      { type: 'text', text: 'La proteína de suero (whey) destaca por su velocidad de absorción y alto contenido en leucina, el aminoácido que más activa la síntesis proteica muscular.' },
    ],
  },
  {
    id: 2, tag: 'Entrenamiento', title: 'Por qué el descanso es tan importante como el ejercicio',
    excerpt: 'El músculo no crece durante el entrenamiento sino durante la recuperación. Saltarte el descanso es uno de los errores más comunes en principiantes...',
    time: '4 min', date: '22 abr', emoji: '😴', color: 'bg-blue-50 text-blue-600',
    body: [
      { type: 'heading', text: 'El crecimiento ocurre fuera del gimnasio' },
      { type: 'text', text: 'Cuando entrenas, generas pequeñas roturas en las fibras musculares. Durante el descanso, tu cuerpo repara esas fibras y las hace más grandes y fuertes. Sin descanso adecuado, ese proceso no puede completarse.' },
      { type: 'text', text: 'El error más frecuente en principiantes es entrenar el mismo grupo muscular dos días seguidos. Lo ideal es dejar al menos 48 horas entre sesiones del mismo músculo.' },
      { type: 'heading', text: 'El sueño como superpotencia' },
      { type: 'text', text: 'Durante las fases de sueño profundo, la glándula pituitaria libera hormona del crecimiento (GH), que es el principal agente anabólico natural de tu cuerpo. Dormir menos de 6 horas reduce la liberación de GH hasta un 60%.' },
      { type: 'tip', text: 'Apunta a 7-9 horas de sueño. Si entrenas duro y duermes poco, estás desperdiciando gran parte de tu esfuerzo.' },
      { type: 'heading', text: 'Señales de sobreentrenamiento' },
      { type: 'text', text: 'Rendimiento estancado o decreciente, fatiga constante, irritabilidad, insomnio y mayor frecuencia de resfriados son señales de que tu cuerpo necesita más recuperación. Ante la duda, descansa.' },
    ],
  },
  {
    id: 3, tag: 'Técnica', title: 'La guía definitiva de la sentadilla: errores y correcciones',
    excerpt: 'La sentadilla es el movimiento más técnico del gimnasio. Estos 7 errores comunes te frenan y pueden causarte lesiones a largo plazo...',
    time: '8 min', date: '20 abr', emoji: '🏋️', color: 'bg-purple-50 text-purple-600',
    body: [
      { type: 'heading', text: 'Por qué la técnica importa más que el peso' },
      { type: 'text', text: 'La sentadilla es el ejercicio compuesto más completo del gimnasio. Cuando se ejecuta correctamente, trabaja cuádriceps, glúteos, isquiotibiales, core y espalda. Cuando se ejecuta mal, es la principal causa de lesiones de rodilla y lumbar.' },
      { type: 'heading', text: 'Los 7 errores más frecuentes' },
      { type: 'text', text: '1. Rodillas hacia adentro (valgo): señal de debilidad en glúteo medio. Trabaja los abductores y conciencia corporal.' },
      { type: 'text', text: '2. Talones levantados: falta de movilidad de tobillo. Trabaja el estiramiento de pantorrilla antes de cada sesión.' },
      { type: 'text', text: '3. Inclinación excesiva del torso: debilidad en la cadena posterior. Fortalece el erector espinal y trabaja la movilidad de cadera.' },
      { type: 'text', text: '4. No bajar suficiente: la profundidad paralela o mayor activa mejor glúteos y reduce la presión sobre la rodilla.' },
      { type: 'text', text: '5. Apoyar el peso en la punta del pie: el peso debe distribuirse uniformemente en todo el pie.' },
      { type: 'tip', text: 'Grábate en video de perfil para identificar tus propios errores. Lo que sientes y lo que ocurre realmente suelen ser cosas distintas.' },
      { type: 'heading', text: 'Progresión recomendada' },
      { type: 'text', text: 'Empieza con goblet squat con mancuerna para aprender la mecánica. Luego progresa a sentadilla con barra en posición frontal y finalmente a la sentadilla trasera clásica una vez la técnica esté consolidada.' },
    ],
  },
  {
    id: 4, tag: 'Pérdida de grasa', title: 'Cardio vs. pesas: ¿qué quema más grasa?',
    excerpt: 'Muchas personas eligen cardio para perder grasa, pero los estudios muestran que el entrenamiento de fuerza puede ser igual o más efectivo a largo plazo...',
    time: '6 min', date: '18 abr', emoji: '🔥', color: 'bg-orange-50 text-orange-600',
    body: [
      { type: 'heading', text: 'El mito del cardio quema-grasa' },
      { type: 'text', text: 'El cardio quema más calorías durante la sesión, pero el entrenamiento de fuerza eleva tu metabolismo basal durante las siguientes 24-48 horas gracias al efecto EPOC (consumo de oxígeno post-ejercicio). El músculo es metabólicamente activo: más músculo = más calorías quemadas en reposo.' },
      { type: 'heading', text: 'Lo que dice la ciencia' },
      { type: 'text', text: 'Estudios comparativos muestran que a las 12 semanas, grupos que combinan fuerza + cardio pierden más grasa que los que hacen solo cardio. Además, el grupo de fuerza mantiene o gana masa muscular, mientras que el de solo cardio suele perderla.' },
      { type: 'tip', text: 'La mejor estrategia para perder grasa es el déficit calórico moderado (300-500 kcal/día) combinado con entrenamiento de fuerza 3-4 días por semana.' },
      { type: 'heading', text: 'El rol del cardio' },
      { type: 'text', text: 'El cardio sí tiene su lugar: mejora la salud cardiovascular, reduce el estrés, acelera la recuperación y puede ayudar a aumentar el déficit calórico sin reducir más la ingesta. Pero no debe ser tu única herramienta para perder grasa.' },
      { type: 'text', text: 'HIIT (intervalos de alta intensidad) es especialmente eficiente: 20 minutos de HIIT pueden tener un efecto metabólico comparable a 40-60 minutos de cardio continuo.' },
    ],
  },
  {
    id: 5, tag: 'Movilidad', title: 'Rutina de movilidad de 10 minutos para antes de entrenar',
    excerpt: 'Un calentamiento adecuado reduce el riesgo de lesión hasta un 50%. Esta rutina cubre los grupos musculares más propensos a rigidez...',
    time: '3 min', date: '15 abr', emoji: '🧘', color: 'bg-teal-50 text-teal-600',
    body: [
      { type: 'heading', text: 'Por qué calentar en movimiento, no estirando' },
      { type: 'text', text: 'El estiramiento estático antes del entrenamiento puede reducir la fuerza hasta un 8%. En cambio, el calentamiento dinámico activa el sistema nervioso, aumenta la temperatura muscular y mejora el rango de movimiento sin pérdida de rendimiento.' },
      { type: 'heading', text: 'La rutina de 10 minutos' },
      { type: 'text', text: '1. Rotaciones de cadera — 10 círculos en cada dirección por cada pierna (2 min).' },
      { type: 'text', text: '2. Zancadas con rotación de torso — 10 repeticiones por lado (2 min).' },
      { type: 'text', text: '3. Apertura de cadera en cuadrupedia (90/90) — 10 repeticiones por lado (2 min).' },
      { type: 'text', text: '4. Rotaciones de hombro con banda o sin carga — 15 repeticiones hacia delante y atrás (2 min).' },
      { type: 'text', text: '5. Sentadilla profunda con pausa — 10 repeticiones lentas manteniendo la postura (2 min).' },
      { type: 'tip', text: 'Adapta los ejercicios al grupo muscular que vayas a entrenar ese día. Si es pierna, enfócate en cadera y tobillo. Si es empuje, prioriza hombros y pecho.' },
    ],
  },
  {
    id: 6, tag: 'Suplementación', title: 'Creatina: todo lo que necesitas saber en 2025',
    excerpt: 'La creatina sigue siendo el suplemento con más evidencia científica para mejorar la fuerza y la composición corporal. Guía completa y actualizada...',
    time: '7 min', date: '12 abr', emoji: '💊', color: 'bg-indigo-50 text-indigo-600',
    body: [
      { type: 'heading', text: '¿Qué es y cómo funciona?' },
      { type: 'text', text: 'La creatina es un compuesto que tu cuerpo produce naturalmente a partir de aminoácidos y que también obtienes de la carne y el pescado. Su función principal es reponer el ATP (la moneda energética del músculo) durante esfuerzos explosivos de corta duración.' },
      { type: 'text', text: 'Al suplementar con creatina monohidrato, aumentas las reservas de fosfocreatina muscular, lo que te permite hacer más repeticiones con el mismo peso o mover más peso en el mismo rango de repeticiones.' },
      { type: 'heading', text: 'Dosis y protocolo' },
      { type: 'text', text: 'La dosis efectiva es 3-5 gramos al día de forma continua. No es necesaria la fase de carga (20 g/día durante 5-7 días), aunque sí acelera la saturación muscular si quieres resultados más rápidos.' },
      { type: 'tip', text: 'Tómala con una comida que incluya carbohidratos y proteína. El momento exacto (pre o post entreno) importa poco; lo que importa es la consistencia diaria.' },
      { type: 'heading', text: 'Seguridad y mitos' },
      { type: 'text', text: 'La creatina monohidrato es uno de los suplementos más estudiados de la historia, con más de 1000 estudios que avalan su seguridad. No daña los riñones en personas sanas. El aumento de peso inicial (1-2 kg) es retención de agua intramuscular, no grasa.' },
      { type: 'text', text: 'Aproximadamente un 25-30% de la población no responde significativamente a la creatina ("non-responders"), generalmente porque ya tienen reservas elevadas de forma natural.' },
    ],
  },
]

const TAGS = ['Todos', 'Nutrición', 'Entrenamiento', 'Técnica', 'Pérdida de grasa', 'Movilidad', 'Suplementación']

function ArticleDetail({ article, onBack }) {
  return (
    <div className="px-8 py-6 max-w-2xl">
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#0f1f3d] font-semibold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        Volver a artículos
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className={clsx('text-xs font-bold px-2.5 py-1 rounded-full', article.color)}>{article.tag}</span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" strokeWidth={2} /> {article.time} de lectura
        </span>
        <span className="text-xs text-slate-400">{article.date}</span>
      </div>

      <div className="text-5xl mb-4">{article.emoji}</div>

      <h1 className="text-2xl font-black text-[#0f1f3d] leading-tight mb-6">{article.title}</h1>

      <p className="text-sm text-slate-500 leading-relaxed mb-6 italic border-l-2 border-blue-200 pl-4">
        {article.excerpt}
      </p>

      <div className="space-y-4">
        {article.body.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <h2 key={i} className="text-base font-black text-[#0f1f3d] mt-6 first:mt-0">
                {block.text}
              </h2>
            )
          }
          if (block.type === 'tip') {
            return (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <span className="text-blue-500 font-black text-sm shrink-0">💡</span>
                <p className="text-sm text-blue-800 leading-relaxed">{block.text}</p>
              </div>
            )
          }
          return (
            <p key={i} className="text-sm text-slate-600 leading-relaxed">{block.text}</p>
          )
        })}
      </div>
    </div>
  )
}

export default function ArticulosPage() {
  const [activeTag, setActiveTag] = useState('Todos')
  const [selectedArticle, setSelectedArticle] = useState(null)

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
  }

  const filtered = activeTag === 'Todos' ? ARTICLES : ARTICLES.filter(a => a.tag === activeTag)

  return (
    <div className="px-8 py-6 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#0f1f3d]">Artículos</h2>
        <p className="text-slate-400 text-sm mt-1">Conocimiento respaldado por ciencia para optimizar tu progreso</p>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TAGS.map(t => (
          <button key={t} onClick={() => setActiveTag(t)}
            className={clsx('px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
              activeTag === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300')}>
            {t}
          </button>
        ))}
      </div>

      {/* Featured */}
      {activeTag === 'Todos' && (
        <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] rounded-2xl p-6 mb-6 flex items-center justify-between">
          <div className="flex-1">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Destacado</span>
            <h3 className="text-xl font-black text-white mt-1 mb-2 leading-tight max-w-lg">{ARTICLES[0].title}</h3>
            <p className="text-blue-200 text-sm leading-relaxed max-w-lg line-clamp-2">{ARTICLES[0].excerpt}</p>
            <button onClick={() => setSelectedArticle(ARTICLES[0])}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-xl transition-colors">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
              Leer artículo
            </button>
          </div>
          <span className="text-6xl ml-6">{ARTICLES[0].emoji}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.slice(activeTag === 'Todos' ? 1 : 0).map(a => (
          <article key={a.id} onClick={() => setSelectedArticle(a)}
            className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className={clsx('text-[10px] font-bold px-2.5 py-1 rounded-full', a.color)}>{a.tag}</span>
              <span className="text-[10px] text-slate-400">{a.date}</span>
            </div>
            <div className="text-2xl mb-2">{a.emoji}</div>
            <h3 className="font-bold text-sm text-[#0f1f3d] leading-tight mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
              {a.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">{a.excerpt}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" strokeWidth={2} /> {a.time} de lectura
              </span>
              <span className="flex items-center gap-1 text-xs text-blue-600 font-bold group-hover:gap-2 transition-all">
                Leer <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
