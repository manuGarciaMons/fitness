import { useState } from 'react'
import { Bell, Shield, Palette, Globe, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react'
import { clsx } from 'clsx'

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} aria-checked={value} role="switch"
      className={clsx('w-10 rounded-full transition-all relative shrink-0', value ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600')}
      style={{ height: '22px' }}>
      <span
        className="absolute w-4 h-4 rounded-full shadow transition-all"
        style={{ backgroundColor: 'white', left: value ? '22px' : '2px', top: '3px' }}
      />
    </button>
  )
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-500" strokeWidth={2} />
        <h3 className="text-sm font-bold text-[#0f1f3d]">{title}</h3>
      </div>
      <div className="divide-y divide-slate-50">{children}</div>
    </div>
  )
}

function Row({ label, desc, children }) {
  return (
    <div className="px-5 py-3.5 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[#0f1f3d]">{label}</p>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  )
}

export default function ConfigPage({ darkMode, onDarkModeChange }) {
  const [notifs, setNotifs] = useState({ workoutReminder: true, weeklyReport: false, tips: true, achievements: true })
  const [prefs, setPrefs] = useState({ units: 'metric', language: 'es' })

  const setN = (k, v) => setNotifs(n => ({ ...n, [k]: v }))
  const setP = (k, v) => setPrefs(p => ({ ...p, [k]: v }))

  return (
    <div className="px-8 py-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#0f1f3d]">Configuración</h2>
        <p className="text-slate-400 text-sm mt-1">Personaliza tu experiencia en FitPlanner</p>
      </div>

      <div className="space-y-4">
        <Section title="Notificaciones" icon={Bell}>
          <Row label="Recordatorio de entrenamiento" desc="Recibe un aviso a tu hora habitual">
            <Toggle value={notifs.workoutReminder} onChange={v => setN('workoutReminder', v)} />
          </Row>
          <Row label="Reporte semanal" desc="Resumen de tu actividad cada lunes">
            <Toggle value={notifs.weeklyReport} onChange={v => setN('weeklyReport', v)} />
          </Row>
          <Row label="Consejos y sugerencias" desc="Recomendaciones personalizadas">
            <Toggle value={notifs.tips} onChange={v => setN('tips', v)} />
          </Row>
          <Row label="Logros y medallas" desc="Notificación al desbloquear un logro">
            <Toggle value={notifs.achievements} onChange={v => setN('achievements', v)} />
          </Row>
        </Section>

        <Section title="Apariencia y Región" icon={Palette}>
          <Row label="Modo oscuro" desc="Cambia el tema de la aplicación">
            <Toggle value={darkMode} onChange={onDarkModeChange} />
          </Row>
          <Row label="Idioma" desc="Idioma de la interfaz">
            <select value={prefs.language} onChange={e => setP('language', e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700">
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </Row>
          <Row label="Unidades de medida">
            <div className="flex rounded-xl border border-slate-200 overflow-hidden">
              {[['metric', 'Métrico'], ['imperial', 'Imperial']].map(([v, l]) => (
                <button key={v} onClick={() => setP('units', v)}
                  className={clsx('px-3 py-1.5 text-xs font-semibold transition-all', prefs.units === v ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50')}>
                  {l}
                </button>
              ))}
            </div>
          </Row>
        </Section>

        <Section title="Privacidad y Seguridad" icon={Shield}>
          <Row label="Cambiar contraseña">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Cambiar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Row>
          <Row label="Exportar mis datos" desc="Descarga toda tu información">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Exportar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Row>
          <Row label="Eliminar cuenta" desc="Esta acción es irreversible">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
              Eliminar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Row>
        </Section>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">FitPlanner v1.0.0 · <span className="text-blue-500 cursor-pointer hover:underline">Términos</span> · <span className="text-blue-500 cursor-pointer hover:underline">Privacidad</span></p>
        </div>
      </div>
    </div>
  )
}
