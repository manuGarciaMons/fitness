import { clsx } from 'clsx'

const MUSCLE_GROUPS = {
  // FRONT
  chest: { label: 'Pectoral', side: 'front' },
  front_shoulders: { label: 'Hombros', side: 'front' },
  biceps: { label: 'Bíceps', side: 'front' },
  front_forearms: { label: 'Antebrazos', side: 'front' },
  abs: { label: 'Abdomen', side: 'front' },
  obliques: { label: 'Oblicuos', side: 'front' },
  front_quads: { label: 'Cuádriceps', side: 'front' },
  front_calves: { label: 'Pantorrillas', side: 'front' },
  front_neck: { label: 'Cuello', side: 'front' },
  // BACK
  traps: { label: 'Trapecios', side: 'back' },
  back_shoulders: { label: 'Hombros post.', side: 'back' },
  lats: { label: 'Dorsales', side: 'back' },
  triceps: { label: 'Tríceps', side: 'back' },
  back_forearms: { label: 'Antebrazos post.', side: 'back' },
  lower_back: { label: 'Lumbar', side: 'back' },
  glutes: { label: 'Glúteos', side: 'back' },
  hamstrings: { label: 'Femoral', side: 'back' },
  back_calves: { label: 'Gemelos', side: 'back' },
}

function MuscleLabel({ x, y, label, isSelected }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="6"
      fontFamily="Inter, sans-serif"
      fontWeight={isSelected ? '700' : '500'}
      fill={isSelected ? '#1d4ed8' : '#64748b'}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      {label}
    </text>
  )
}

function FrontBody({ selected, onSelect }) {
  const s = (id) => selected.includes(id)
  const fill = (id) => s(id) ? '#dbeafe' : '#f8fafc'
  const stroke = (id) => s(id) ? '#2563eb' : '#94a3b8'
  const sw = (id) => s(id) ? 1.5 : 0.8

  const handleClick = (id) => () => onSelect(id)

  return (
    <svg viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Head */}
      <ellipse cx="60" cy="18" rx="12" ry="14" fill={fill('front_neck')} stroke={stroke('front_neck')} strokeWidth={sw('front_neck')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_neck')} />

      {/* Neck */}
      <rect x="55" y="30" width="10" height="8" rx="3" fill={fill('front_neck')} stroke={stroke('front_neck')} strokeWidth={sw('front_neck')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_neck')} />

      {/* Left Trap / Right Trap (from viewer's perspective) */}
      <path d="M55 38 Q40 38 35 46 Q37 42 45 40 Z" fill={fill('front_shoulders')} stroke={stroke('front_shoulders')} strokeWidth={sw('front_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_shoulders')} />
      <path d="M65 38 Q80 38 85 46 Q83 42 75 40 Z" fill={fill('front_shoulders')} stroke={stroke('front_shoulders')} strokeWidth={sw('front_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_shoulders')} />

      {/* Left Shoulder (deltoid) */}
      <ellipse cx="32" cy="50" rx="9" ry="10" fill={fill('front_shoulders')} stroke={stroke('front_shoulders')} strokeWidth={sw('front_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_shoulders')} />
      {/* Right Shoulder (deltoid) */}
      <ellipse cx="88" cy="50" rx="9" ry="10" fill={fill('front_shoulders')} stroke={stroke('front_shoulders')} strokeWidth={sw('front_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_shoulders')} />

      {/* Chest (pectoral) */}
      <path d="M38 42 Q46 38 55 40 L55 62 Q46 64 38 60 Q34 54 38 42Z" fill={fill('chest')} stroke={stroke('chest')} strokeWidth={sw('chest')} className="cursor-pointer transition-all duration-150" onClick={handleClick('chest')} />
      <path d="M82 42 Q74 38 65 40 L65 62 Q74 64 82 60 Q86 54 82 42Z" fill={fill('chest')} stroke={stroke('chest')} strokeWidth={sw('chest')} className="cursor-pointer transition-all duration-150" onClick={handleClick('chest')} />

      {/* Left Bicep */}
      <path d="M25 58 Q20 62 20 78 Q22 82 26 80 Q30 78 30 62 Z" fill={fill('biceps')} stroke={stroke('biceps')} strokeWidth={sw('biceps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('biceps')} />
      {/* Right Bicep */}
      <path d="M95 58 Q100 62 100 78 Q98 82 94 80 Q90 78 90 62 Z" fill={fill('biceps')} stroke={stroke('biceps')} strokeWidth={sw('biceps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('biceps')} />

      {/* Left Forearm */}
      <path d="M20 80 Q18 86 18 100 Q20 104 24 102 Q27 100 27 84 Z" fill={fill('front_forearms')} stroke={stroke('front_forearms')} strokeWidth={sw('front_forearms')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_forearms')} />
      {/* Right Forearm */}
      <path d="M100 80 Q102 86 102 100 Q100 104 96 102 Q93 100 93 84 Z" fill={fill('front_forearms')} stroke={stroke('front_forearms')} strokeWidth={sw('front_forearms')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_forearms')} />

      {/* Left Hand */}
      <ellipse cx="21" cy="107" rx="4" ry="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Hand */}
      <ellipse cx="99" cy="107" rx="4" ry="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Abs */}
      <rect x="49" y="62" width="22" height="8" rx="2" fill={fill('abs')} stroke={stroke('abs')} strokeWidth={sw('abs')} className="cursor-pointer transition-all duration-150" onClick={handleClick('abs')} />
      <rect x="49" y="72" width="22" height="8" rx="2" fill={fill('abs')} stroke={stroke('abs')} strokeWidth={sw('abs')} className="cursor-pointer transition-all duration-150" onClick={handleClick('abs')} />
      <rect x="49" y="82" width="22" height="8" rx="2" fill={fill('abs')} stroke={stroke('abs')} strokeWidth={sw('abs')} className="cursor-pointer transition-all duration-150" onClick={handleClick('abs')} />
      <line x1="60" y1="62" x2="60" y2="90" stroke={stroke('abs')} strokeWidth="0.7" />

      {/* Obliques */}
      <path d="M38 62 Q42 68 40 90 L49 90 L49 62 Z" fill={fill('obliques')} stroke={stroke('obliques')} strokeWidth={sw('obliques')} className="cursor-pointer transition-all duration-150" onClick={handleClick('obliques')} />
      <path d="M82 62 Q78 68 80 90 L71 90 L71 62 Z" fill={fill('obliques')} stroke={stroke('obliques')} strokeWidth={sw('obliques')} className="cursor-pointer transition-all duration-150" onClick={handleClick('obliques')} />

      {/* Hip */}
      <path d="M40 90 Q48 96 60 97 Q72 96 80 90 L75 108 Q68 112 60 113 Q52 112 45 108 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Left Quad */}
      <path d="M45 108 Q42 116 42 140 Q44 150 50 152 Q56 154 58 148 Q60 142 58 110 Z" fill={fill('front_quads')} stroke={stroke('front_quads')} strokeWidth={sw('front_quads')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_quads')} />
      {/* Right Quad */}
      <path d="M75 108 Q78 116 78 140 Q76 150 70 152 Q64 154 62 148 Q60 142 62 110 Z" fill={fill('front_quads')} stroke={stroke('front_quads')} strokeWidth={sw('front_quads')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_quads')} />

      {/* Left Knee */}
      <ellipse cx="50" cy="156" rx="7" ry="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Knee */}
      <ellipse cx="70" cy="156" rx="7" ry="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Left Calf */}
      <path d="M44 160 Q42 172 43 192 Q45 200 50 200 Q55 200 56 192 Q57 172 56 160 Z" fill={fill('front_calves')} stroke={stroke('front_calves')} strokeWidth={sw('front_calves')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_calves')} />
      {/* Right Calf */}
      <path d="M76 160 Q78 172 77 192 Q75 200 70 200 Q65 200 64 192 Q63 172 64 160 Z" fill={fill('front_calves')} stroke={stroke('front_calves')} strokeWidth={sw('front_calves')} className="cursor-pointer transition-all duration-150" onClick={handleClick('front_calves')} />

      {/* Left Foot */}
      <ellipse cx="49" cy="206" rx="7" ry="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Foot */}
      <ellipse cx="71" cy="206" rx="7" ry="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Labels */}
      {s('chest') && <MuscleLabel x="60" y="55" label="Pectoral" isSelected />}
      {s('front_shoulders') && <MuscleLabel x="32" y="47" label="Hombro" isSelected />}
      {s('biceps') && <MuscleLabel x="23" y="70" label="Bíceps" isSelected />}
      {s('abs') && <MuscleLabel x="60" y="79" label="Abdomen" isSelected />}
      {s('front_quads') && <MuscleLabel x="50" y="130" label="Cuádric." isSelected />}
      {s('front_calves') && <MuscleLabel x="50" y="180" label="Gemelo" isSelected />}
      {s('obliques') && <MuscleLabel x="42" y="76" label="Oblicuo" isSelected />}
    </svg>
  )
}

function BackBody({ selected, onSelect }) {
  const s = (id) => selected.includes(id)
  const fill = (id) => s(id) ? '#dbeafe' : '#f8fafc'
  const stroke = (id) => s(id) ? '#2563eb' : '#94a3b8'
  const sw = (id) => s(id) ? 1.5 : 0.8

  const handleClick = (id) => () => onSelect(id)

  return (
    <svg viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Head */}
      <ellipse cx="60" cy="18" rx="12" ry="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />

      {/* Neck */}
      <rect x="55" y="30" width="10" height="8" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.8" />

      {/* Traps */}
      <path d="M55 38 Q48 36 38 46 Q42 40 55 40 Z" fill={fill('traps')} stroke={stroke('traps')} strokeWidth={sw('traps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('traps')} />
      <path d="M65 38 Q72 36 82 46 Q78 40 65 40 Z" fill={fill('traps')} stroke={stroke('traps')} strokeWidth={sw('traps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('traps')} />
      <path d="M45 40 Q52 38 60 39 Q68 38 75 40 L72 52 Q60 56 48 52 Z" fill={fill('traps')} stroke={stroke('traps')} strokeWidth={sw('traps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('traps')} />

      {/* Back Shoulders */}
      <ellipse cx="32" cy="50" rx="9" ry="10" fill={fill('back_shoulders')} stroke={stroke('back_shoulders')} strokeWidth={sw('back_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_shoulders')} />
      <ellipse cx="88" cy="50" rx="9" ry="10" fill={fill('back_shoulders')} stroke={stroke('back_shoulders')} strokeWidth={sw('back_shoulders')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_shoulders')} />

      {/* Lats */}
      <path d="M38 48 Q34 56 36 72 Q38 80 44 82 L48 64 Q44 56 42 48 Z" fill={fill('lats')} stroke={stroke('lats')} strokeWidth={sw('lats')} className="cursor-pointer transition-all duration-150" onClick={handleClick('lats')} />
      <path d="M82 48 Q86 56 84 72 Q82 80 76 82 L72 64 Q76 56 78 48 Z" fill={fill('lats')} stroke={stroke('lats')} strokeWidth={sw('lats')} className="cursor-pointer transition-all duration-150" onClick={handleClick('lats')} />

      {/* Mid back */}
      <path d="M48 52 L72 52 L74 82 Q60 86 46 82 Z" fill={fill('lats')} stroke={stroke('lats')} strokeWidth={sw('lats')} className="cursor-pointer transition-all duration-150" onClick={handleClick('lats')} />

      {/* Triceps Left */}
      <path d="M25 58 Q20 62 20 78 Q22 82 26 80 Q30 78 30 62 Z" fill={fill('triceps')} stroke={stroke('triceps')} strokeWidth={sw('triceps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('triceps')} />
      {/* Triceps Right */}
      <path d="M95 58 Q100 62 100 78 Q98 82 94 80 Q90 78 90 62 Z" fill={fill('triceps')} stroke={stroke('triceps')} strokeWidth={sw('triceps')} className="cursor-pointer transition-all duration-150" onClick={handleClick('triceps')} />

      {/* Back Forearms Left */}
      <path d="M20 80 Q18 86 18 100 Q20 104 24 102 Q27 100 27 84 Z" fill={fill('back_forearms')} stroke={stroke('back_forearms')} strokeWidth={sw('back_forearms')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_forearms')} />
      {/* Back Forearms Right */}
      <path d="M100 80 Q102 86 102 100 Q100 104 96 102 Q93 100 93 84 Z" fill={fill('back_forearms')} stroke={stroke('back_forearms')} strokeWidth={sw('back_forearms')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_forearms')} />

      {/* Left Hand */}
      <ellipse cx="21" cy="107" rx="4" ry="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Hand */}
      <ellipse cx="99" cy="107" rx="4" ry="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Lower Back */}
      <path d="M46 82 Q48 90 60 92 Q72 90 74 82 L70 100 Q60 103 50 100 Z" fill={fill('lower_back')} stroke={stroke('lower_back')} strokeWidth={sw('lower_back')} className="cursor-pointer transition-all duration-150" onClick={handleClick('lower_back')} />

      {/* Glutes */}
      <path d="M45 100 Q42 110 44 124 Q50 130 60 131 Q70 130 76 124 Q78 110 75 100 Q68 104 60 105 Q52 104 45 100 Z" fill={fill('glutes')} stroke={stroke('glutes')} strokeWidth={sw('glutes')} className="cursor-pointer transition-all duration-150" onClick={handleClick('glutes')} />

      {/* Left Hamstring */}
      <path d="M44 126 Q41 136 42 155 Q44 162 50 162 Q56 162 57 155 Q58 136 56 126 Z" fill={fill('hamstrings')} stroke={stroke('hamstrings')} strokeWidth={sw('hamstrings')} className="cursor-pointer transition-all duration-150" onClick={handleClick('hamstrings')} />
      {/* Right Hamstring */}
      <path d="M76 126 Q79 136 78 155 Q76 162 70 162 Q64 162 63 155 Q62 136 64 126 Z" fill={fill('hamstrings')} stroke={stroke('hamstrings')} strokeWidth={sw('hamstrings')} className="cursor-pointer transition-all duration-150" onClick={handleClick('hamstrings')} />

      {/* Left Knee back */}
      <ellipse cx="50" cy="165" rx="7" ry="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Knee back */}
      <ellipse cx="70" cy="165" rx="7" ry="5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Left Calf back */}
      <path d="M44 169 Q42 181 43 198 Q45 205 50 205 Q55 205 56 198 Q57 181 56 169 Z" fill={fill('back_calves')} stroke={stroke('back_calves')} strokeWidth={sw('back_calves')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_calves')} />
      {/* Right Calf back */}
      <path d="M76 169 Q78 181 77 198 Q75 205 70 205 Q65 205 64 198 Q63 181 64 169 Z" fill={fill('back_calves')} stroke={stroke('back_calves')} strokeWidth={sw('back_calves')} className="cursor-pointer transition-all duration-150" onClick={handleClick('back_calves')} />

      {/* Left Foot */}
      <ellipse cx="49" cy="210" rx="7" ry="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />
      {/* Right Foot */}
      <ellipse cx="71" cy="210" rx="7" ry="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.7" />

      {/* Labels */}
      {s('traps') && <MuscleLabel x="60" y="46" label="Trapecio" isSelected />}
      {s('lats') && <MuscleLabel x="60" y="66" label="Dorsal" isSelected />}
      {s('triceps') && <MuscleLabel x="23" y="70" label="Tríceps" isSelected />}
      {s('glutes') && <MuscleLabel x="60" y="116" label="Glúteo" isSelected />}
      {s('hamstrings') && <MuscleLabel x="50" y="142" label="Femoral" isSelected />}
      {s('back_calves') && <MuscleLabel x="50" y="186" label="Gemelo" isSelected />}
    </svg>
  )
}

export default function BodyDiagram({ selectedMuscles, onMuscleToggle }) {
  return (
    <div className="flex items-start justify-center gap-20 px-8 py-8">
      {/* Front View */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Vista Frontal</span>
        <div style={{ width: '280px', height: '560px' }} className="relative">
          <FrontBody selected={selectedMuscles} onSelect={onMuscleToggle} />
        </div>
      </div>

      {/* Back View */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Vista Posterior</span>
        <div style={{ width: '280px', height: '560px' }} className="relative">
          <BackBody selected={selectedMuscles} onSelect={onMuscleToggle} />
        </div>
      </div>
    </div>
  )
}

export { MUSCLE_GROUPS }
