import { useState } from 'react'
import { Calculator, Scale, Activity, Zap, RotateCcw } from 'lucide-react'

// ─── BMI Calculator ──────────────────────────────────────────────────────────
function BMICalc() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const bmi = peso && altura ? (peso / ((altura / 100) ** 2)).toFixed(1) : null
  const cat = bmi < 18.5 ? { label: 'Bajo peso', color: 'text-blue-500', bg: 'bg-blue-50' }
    : bmi < 25 ? { label: 'Peso normal', color: 'text-emerald-600', bg: 'bg-emerald-50' }
    : bmi < 30 ? { label: 'Sobrepeso', color: 'text-amber-500', bg: 'bg-amber-50' }
    : { label: 'Obesidad', color: 'text-red-500', bg: 'bg-red-50' }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
          <Scale className="w-4 h-4 text-blue-600" strokeWidth={2} />
        </div>
        <h3 className="font-bold text-sm text-[#0f1f3d]">Calculadora de IMC</h3>
      </div>
      <div className="space-y-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1" htmlFor="peso">Peso (kg)</label>
          <input id="peso" type="number" placeholder="70" value={peso} onChange={e => setPeso(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1" htmlFor="altura">Altura (cm)</label>
          <input id="altura" type="number" placeholder="175" value={altura} onChange={e => setAltura(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      {bmi && (
        <div className={`rounded-xl p-3 ${cat.bg} text-center`}>
          <p className={`text-3xl font-black ${cat.color}`}>{bmi}</p>
          <p className={`text-xs font-bold mt-1 ${cat.color}`}>{cat.label}</p>
        </div>
      )}
    </div>
  )
}

// ─── Calorie Calculator ───────────────────────────────────────────────────────
function CalorieCalc() {
  const [form, setForm] = useState({ peso: '', altura: '', edad: '', genero: 'male', actividad: '1.375' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  let tmb = null, tdee = null
  if (form.peso && form.altura && form.edad) {
    if (form.genero === 'male')
      tmb = 88.36 + 13.4 * +form.peso + 4.8 * +form.altura - 5.7 * +form.edad
    else
      tmb = 447.6 + 9.2 * +form.peso + 3.1 * +form.altura - 4.3 * +form.edad
    tdee = (tmb * +form.actividad).toFixed(0)
    tmb = tmb.toFixed(0)
  }

  const ACTS = [
    { value: '1.2', label: 'Sedentario' }, { value: '1.375', label: 'Ligero (1-3 días/sem)' },
    { value: '1.55', label: 'Moderado (3-5 días)' }, { value: '1.725', label: 'Activo (6-7 días)' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
          <Zap className="w-4 h-4 text-orange-500" strokeWidth={2} />
        </div>
        <h3 className="font-bold text-sm text-[#0f1f3d]">Calculadora de Calorías</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[['peso', 'Peso (kg)', '70'], ['altura', 'Altura (cm)', '175'], ['edad', 'Edad', '25']].map(([k, lbl, ph]) => (
          <div key={k}>
            <label className="text-xs font-semibold text-slate-500 block mb-1" htmlFor={k}>{lbl}</label>
            <input id={k} type="number" placeholder={ph} value={form[k]} onChange={e => set(k, e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">Género</label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200">
            {[['male', 'Hombre'], ['female', 'Mujer']].map(([v, l]) => (
              <button key={v} onClick={() => set('genero', v)}
                className={`flex-1 py-2 text-xs font-semibold transition-all ${form.genero === v ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 block mb-1.5">Nivel de actividad</label>
        <div className="space-y-1.5">
          {ACTS.map(a => (
            <button key={a.value} onClick={() => set('actividad', a.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${form.actividad === a.value ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-200'}`}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
      {tdee && (
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-[#0f1f3d]">{tmb}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">kcal TMB</p>
          </div>
          <div className="bg-blue-600 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-white">{tdee}</p>
            <p className="text-[10px] text-blue-200 font-medium mt-0.5">kcal/día</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Rest Timer ───────────────────────────────────────────────────────────────
function RestTimer() {
  const [secs, setSecs] = useState(60)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(null)

  const start = (s) => {
    setRemaining(s)
    setRunning(true)
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) { clearInterval(interval); setRunning(false); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const PRESETS = [30, 45, 60, 90, 120, 180]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Activity className="w-4 h-4 text-emerald-600" strokeWidth={2} />
        </div>
        <h3 className="font-bold text-sm text-[#0f1f3d]">Temporizador de Descanso</h3>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRESETS.map(s => (
          <button key={s} onClick={() => { setSecs(s); setRemaining(null); setRunning(false) }}
            className={`py-2 rounded-xl text-xs font-bold border transition-all ${secs === s ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>
            {s >= 60 ? `${s / 60} min` : `${s} seg`}
          </button>
        ))}
      </div>
      <div className="text-center mb-4">
        <div className={`text-5xl font-black tabular-nums ${running ? 'text-blue-600' : remaining === 0 ? 'text-emerald-600' : 'text-[#0f1f3d]'}`}>
          {remaining !== null ? `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`
            : `${Math.floor(secs / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`}
        </div>
        {remaining === 0 && <p className="text-emerald-600 text-xs font-bold mt-1">¡Tiempo terminado! 💪</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => start(secs)} disabled={running}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition-all">
          {running ? 'Corriendo...' : 'Iniciar'}
        </button>
        <button onClick={() => { setRunning(false); setRemaining(null) }}
          className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all">
          <RotateCcw className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

export default function HerramientasPage() {
  return (
    <div className="px-8 py-6 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#0f1f3d]">Mis Herramientas</h2>
        <p className="text-slate-400 text-sm mt-1">Calculadoras y utilidades para tu entrenamiento</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <BMICalc />
        <CalorieCalc />
        <RestTimer />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { icon: '📊', title: 'Calculadora 1RM', desc: 'Calcula tu repetición máxima estimada', tag: 'Próximamente' },
          { icon: '💧', title: 'Hidratación diaria', desc: 'Calcula tu ingesta de agua recomendada', tag: 'Próximamente' },
          { icon: '📅', title: 'Planificador semanal', desc: 'Organiza tus días de entrenamiento', tag: 'Próximamente' },
        ].map(t => (
          <div key={t.title} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 opacity-60">
            <span className="text-2xl">{t.icon}</span>
            <div>
              <p className="text-sm font-bold text-[#0f1f3d]">{t.title}</p>
              <p className="text-xs text-slate-400">{t.desc}</p>
              <span className="text-[10px] bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 font-medium mt-1 inline-block">{t.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
