import { clsx } from 'clsx'
import {
  Home, Dumbbell, Calendar, Wrench, Newspaper, Settings, User, LogOut
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Inicio', id: 'inicio' },
  { icon: Dumbbell, label: 'Entrenamientos', id: 'entrenamientos' },
  { icon: Calendar, label: 'Mis Rutinas', id: 'rutinas' },
  { icon: Wrench, label: 'Mis Herramientas', id: 'herramientas' },
  { icon: Newspaper, label: 'Artículos', id: 'articulos' },
  { icon: Settings, label: 'Configuración', id: 'config' },
]

export default function Sidebar({ activeSection = 'entrenamientos', onNavigate, onLogout }) {
  return (
    <aside
      className="flex flex-col w-60 min-h-screen bg-[#0f1f3d] text-white shrink-0"
      aria-label="Navegación principal"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10 cursor-pointer" onClick={() => onNavigate('inicio')}>
        <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
          <Dumbbell className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight tracking-tight">FitPlanner</p>
          <p className="text-blue-300 text-xs font-medium">Pro</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, id }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={clsx('w-5 h-5 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-300')}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="truncate">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 border-t border-white/10 pt-4 space-y-1">
        <button
          onClick={() => onNavigate('perfil')}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
            activeSection === 'perfil'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
              : 'text-slate-300 hover:bg-white/8 hover:text-white'
          )}
        >
          <User className={clsx('w-5 h-5 shrink-0', activeSection === 'perfil' ? 'text-white' : 'text-slate-400 group-hover:text-blue-300')} strokeWidth={2} />
          <span>Mi Perfil</span>
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group">
          <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" strokeWidth={2} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}
