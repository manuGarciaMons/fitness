// Stick-figure poses for different exercise types.
// Each type has 3 frames: initial → movement → final.
// viewBox="0 0 50 72"

const SW = 2       // strokeWidth
const HEAD_R = 5   // head radius

// Element helpers
const H = (cx, cy) => ({ t: 'circle', cx, cy, r: HEAD_R, fill: 'none' })
const W = (cx, cy, r = 2.5) => ({ t: 'circle', cx, cy, r, fill: true })  // weight
const L = (x1, y1, x2, y2) => ({ t: 'line', x1, y1, x2, y2 })
const P = (d, fill = 'none') => ({ t: 'path', d, fill })
const ARR = (x1, y1, x2, y2) => ({ t: 'arrow', x1, y1, x2, y2 })

// ─── POSE LIBRARY ────────────────────────────────────────────────────────────
const POSES = {

  // Standing press (shoulder/chest dumbbell press)
  press: [
    [ // Initial: arms bent 90° at sides, weights at shoulder height
      H(25,7), L(25,12,25,34),
      L(25,20,13,28), L(13,28,13,18), W(13,17),  // left arm
      L(25,20,37,28), L(37,28,37,18), W(37,17),  // right arm
      L(25,34,17,54), L(17,54,13,58),            // left leg
      L(25,34,33,54), L(33,54,37,58),            // right leg
    ],
    [ // Movement: arms halfway up
      H(25,7), L(25,12,25,34),
      L(25,20,13,22), L(13,22,11,12), W(10,11),
      L(25,20,37,22), L(37,22,39,12), W(40,11),
      L(25,34,17,54), L(17,54,13,58),
      L(25,34,33,54), L(33,54,37,58),
      ARR(17,10,17,4),
    ],
    [ // Final: arms extended overhead
      H(25,7), L(25,12,25,34),
      L(25,20,16,8),  W(14,6),
      L(25,20,34,8),  W(36,6),
      L(25,34,17,54), L(17,54,13,58),
      L(25,34,33,54), L(33,54,37,58),
    ],
  ],

  // Floor press / fly (lying down)
  floor_press: [
    [ // Initial: lying, arms bent at elbows on floor
      L(5,40,45,40), // floor line
      L(8,36,42,36), // body horizontal
      H(45,33),       // head to the right
      L(13,33,13,28), L(13,28,9,28),  W(8,28),  // left arm
      L(29,33,29,28), L(29,28,33,28), W(34,28), // right arm
      L(8,39, 5,48),  L(5,48,4,52),             // left leg
      L(16,39,14,48), L(14,48,13,52),           // right leg
    ],
    [ // Movement: arms pushing up
      L(5,40,45,40),
      L(8,36,42,36),
      H(45,33),
      L(13,33,10,22), W(9,21),
      L(29,33,32,22), W(33,21),
      L(8,39, 5,48),  L(5,48,4,52),
      L(16,39,14,48), L(14,48,13,52),
      ARR(20,24,20,18),
    ],
    [ // Final: arms fully extended up
      L(5,40,45,40),
      L(8,36,42,36),
      H(45,33),
      L(13,33,10,16), W(9,15),
      L(29,33,32,16), W(33,15),
      L(8,39, 5,48),  L(5,48,4,52),
      L(16,39,14,48), L(14,48,13,52),
    ],
  ],

  // Squat (quad, glute squat)
  squat: [
    [ // Initial: standing upright
      H(25,7), L(25,12,25,34),
      L(25,20,14,26), L(14,26,11,32),  // left arm
      L(25,20,36,26), L(36,26,39,32),  // right arm (like holding bar or arms forward)
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
    [ // Movement: half squat
      H(25,16), L(25,21,23,38),        // torso slightly forward
      L(23,27,12,31), L(12,31,9,37),
      L(23,27,34,31), L(34,31,37,37),
      L(23,38,16,54), L(16,54,14,60), // legs bent
      L(23,38,30,54), L(30,54,32,60),
      ARR(25,40,25,48),                // down arrow
    ],
    [ // Final: deep squat
      H(25,24), L(25,29,22,42),        // torso more forward/down
      L(22,33,11,37), L(11,37,8,43),
      L(22,33,33,37), L(33,37,36,43),
      L(22,42,14,56), L(14,56,14,62),
      L(22,42,30,56), L(30,56,30,62),
    ],
  ],

  // Hip hinge / Romanian deadlift (hamstring, glute)
  hinge: [
    [ // Initial: standing upright, bar/weights at thighs
      H(25,7), L(25,12,25,34),
      L(25,20,16,28), L(16,28,14,36), W(13,37), // left arm down holding weight
      L(25,20,34,28), L(34,28,36,36), W(37,37), // right arm
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
    [ // Movement: hinged 45°
      H(35,14), L(31,18,18,30),           // torso angled
      L(26,22,18,32), L(18,32,14,38), W(12,39),
      L(26,22,32,30), L(32,30,37,36), W(38,37),
      L(18,30,14,50), L(14,50,12,56),     // left leg
      L(18,30,24,50), L(24,50,26,56),     // right leg
      ARR(16,22,10,28),                   // downward arrow
    ],
    [ // Final: fully hinged, parallel to floor
      H(42,20), L(37,22,16,28),           // horizontal torso
      L(28,24,20,34), W(18,35),
      L(28,24,36,34), W(38,35),
      L(16,28,12,48), L(12,48,10,54),
      L(16,28,22,48), L(22,48,24,54),
    ],
  ],

  // Bridge / hip thrust (glutes)
  bridge: [
    [ // Initial: lying, knees bent, hips on floor
      L(2,52,48,52),                     // floor
      L(6,48,28,48),                     // upper body on floor
      H(30,45),                          // head right side
      L(6,48,6,40), L(6,40,4,34),        // left arm flat
      L(6,48,10,38), L(10,38,14,34),     // right arm
      L(14,48,12,60), L(12,60,10,64),    // left leg bent
      L(22,48,26,58), L(26,58,30,64),    // right leg bent
    ],
    [ // Movement: hips halfway up
      L(2,60,48,60),                     // floor lower
      L(6,54,28,50),                     // body angled up
      H(30,47),
      L(6,54,5,44),
      L(6,54,10,44),
      L(14,56,10,62), L(10,62,10,66),
      L(22,56,28,62), L(28,62,30,66),
      ARR(18,46,18,40),
    ],
    [ // Final: hips fully extended (bridge)
      L(2,62,48,62),
      L(6,54,28,44),                     // body elevated, almost flat
      H(30,41),
      L(6,54,4,44),
      L(6,54,10,44),
      L(14,56,8,62),  L(8,62,8,66),
      L(22,56,30,62), L(30,62,30,66),
    ],
  ],

  // Row / pull (lats, back)
  row: [
    [ // Initial: bent over, arms hanging with weight
      H(38,14), L(33,18,18,28),           // bent-over torso
      L(27,22,20,32), W(19,34),           // left arm hanging
      L(27,22,32,32), W(33,34),           // right arm hanging
      L(18,28,12,46), L(12,46,10,52),
      L(18,28,22,46), L(22,46,24,52),
    ],
    [ // Movement: arms halfway pulled
      H(38,14), L(33,18,18,28),
      L(27,22,20,26), L(20,26,20,32), W(19,20), // arm bent mid
      L(27,22,32,26), L(32,26,32,32), W(33,20),
      L(18,28,12,46), L(12,46,10,52),
      L(18,28,22,46), L(22,46,24,52),
      ARR(24,28,24,22),
    ],
    [ // Final: arms fully rowed to torso
      H(38,14), L(33,18,18,28),
      L(27,22,20,18), W(18,16),            // arms pulled up to body
      L(27,22,32,18), W(34,16),
      L(18,28,12,46), L(12,46,10,52),
      L(18,28,22,46), L(22,46,24,52),
    ],
  ],

  // Curl (biceps)
  curl: [
    [ // Initial: arms at sides, weights hanging
      H(25,7), L(25,12,25,34),
      L(25,20,16,28), L(16,28,14,42), W(13,44),
      L(25,20,34,28), L(34,28,36,42), W(37,44),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
    [ // Movement: arms bent 90°
      H(25,7), L(25,12,25,34),
      L(25,20,14,28), L(14,28,16,18), W(15,16),
      L(25,20,36,28), L(36,28,34,18), W(35,16),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
      ARR(22,18,22,12),
    ],
    [ // Final: arms fully curled to shoulder
      H(25,7), L(25,12,25,34),
      L(25,20,13,24), L(13,24,16,12), W(15,10),
      L(25,20,37,24), L(37,24,34,12), W(35,10),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
  ],

  // Lateral raise / shoulder raise
  raise: [
    [ // Initial: arms at sides
      H(25,7), L(25,12,25,34),
      L(25,20,16,28), L(16,28,14,38), W(13,39),
      L(25,20,34,28), L(34,28,36,38), W(37,39),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
    [ // Movement: arms at 45°
      H(25,7), L(25,12,25,34),
      L(25,20,14,24), L(14,24,10,32), W(9,33),
      L(25,20,36,24), L(36,24,40,32), W(41,33),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
      ARR(12,26,9,20), ARR(38,26,41,20),
    ],
    [ // Final: arms at shoulder height (T shape)
      H(25,7), L(25,12,25,34),
      L(25,20,12,18), L(12,18,8,18), W(7,18),
      L(25,20,38,18), L(38,18,42,18), W(43,18),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
  ],

  // Tricep extension (overhead or kickback)
  extend: [
    [ // Initial: arm bent overhead, elbow up
      H(25,7), L(25,12,25,34),
      L(25,18,20,14), L(20,14,20,26), W(20,28), // left arm overhead bent
      L(25,18,30,26), L(30,26,32,32),           // right arm normal
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
    [ // Movement: arm partially extended
      H(25,7), L(25,12,25,34),
      L(25,18,19,12), L(19,12,16,20), W(15,22),
      L(25,18,30,26), L(30,26,32,32),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
      ARR(18,16,14,10),
    ],
    [ // Final: arm fully extended overhead
      H(25,7), L(25,12,25,34),
      L(25,18,18,6),  W(17,4),
      L(25,18,30,26), L(30,26,32,32),
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
  ],

  // Core / crunch
  crunch: [
    [ // Initial: lying flat on back
      L(2,54,48,54),
      L(6,50,38,50),  // body
      H(40,47),
      L(6,50,5,43), L(5,43,4,38),             // arms at sides
      L(16,50,20,54), L(20,54,20,60),         // left leg bent
      L(26,50,30,56), L(30,56,32,62),         // right leg bent
    ],
    [ // Movement: partial crunch up
      L(2,56,48,56),
      L(8,52,36,44),  // body slightly angled
      H(38,41),
      L(8,52,6,44), L(6,44,5,38),
      L(18,52,22,58), L(22,58,22,64),
      L(26,52,30,58), L(30,58,32,64),
      ARR(20,46,16,40),
    ],
    [ // Final: full crunch, knees to chest
      L(2,56,48,56),
      L(10,52,28,40),  // torso raised more
      H(30,37),
      L(10,52,8,44), L(8,44,7,38),
      L(18,52,16,56), L(16,56,14,60),        // legs tucked
      L(24,52,26,56), L(26,56,28,60),
    ],
  ],

  // Lunge (unilateral leg)
  lunge: [
    [ // Initial: standing
      H(25,7), L(25,12,25,34),
      L(25,20,16,28), L(16,28,14,34),
      L(25,20,34,28), L(34,28,36,34),
      L(25,34,22,54), L(22,54,20,60),
      L(25,34,28,54), L(28,54,30,60),
    ],
    [ // Movement: stepping forward
      H(25,10), L(25,15,25,36),
      L(25,22,16,28), L(16,28,14,34),
      L(25,22,34,28), L(34,28,36,34),
      L(25,36,16,54), L(16,54,14,62),   // front leg
      L(25,36,36,48), L(36,48,38,60),   // back leg bent
      ARR(25,36,25,44),
    ],
    [ // Final: full lunge, back knee near ground
      H(25,13), L(25,18,22,38),
      L(22,24,14,30), L(14,30,12,36),
      L(22,24,32,30), L(32,30,34,36),
      L(22,38,12,54), L(12,54,10,62),
      L(22,38,36,50), L(36,50,38,60),
    ],
  ],

  // Swing / explosive (kettlebell swing)
  swing: [
    [ // Initial: hinge with weight between legs
      H(36,14), L(31,18,14,28),
      L(24,22,18,32), L(18,32,22,38),
      L(24,22,30,30), L(30,30,26,38),
      P('M20 38 Q22 44 24 40 Q26 36 28 38', '#2563eb'), // kettlebell shape
      L(14,28,10,46), L(10,46,8,52),
      L(14,28,20,44), L(20,44,22,50),
    ],
    [ // Movement: explosive hip extension, weight swinging forward
      H(28,10), L(26,15,22,34),
      L(24,21,16,22), L(16,22,18,30),
      L(24,21,32,22), L(32,22,30,30),
      L(22,34,16,50), L(16,50,14,56),
      L(22,34,28,50), L(28,50,30,56),
      ARR(24,22,24,14),
    ],
    [ // Final: standing, weight at shoulder height
      H(25,7), L(25,12,25,34),
      L(25,20,14,20), L(14,20,12,14),
      L(25,20,36,20), L(36,20,38,14),
      P('M18 10 Q20 6 22 10 Q24 14 20 12 Z', 'none'), // kettlebell up
      L(25,34,18,54), L(18,54,16,60),
      L(25,34,32,54), L(32,54,34,60),
    ],
  ],
}

// Map exercise type string → poses key
const TYPE_MAP = {
  press: 'press',
  floor_press: 'floor_press',
  fly: 'floor_press',
  squat: 'squat',
  lunge: 'lunge',
  hinge: 'hinge',
  bridge: 'bridge',
  row: 'row',
  pullup: 'row',
  curl: 'curl',
  raise: 'raise',
  extend: 'extend',
  crunch: 'crunch',
  core: 'crunch',
  swing: 'swing',
  kickback: 'bridge',
  default: 'press',
}

function renderEl(el, color, i) {
  if (el.t === 'circle') {
    return <circle key={i} cx={el.cx} cy={el.cy} r={el.r}
      stroke={color} strokeWidth={SW} fill={el.fill ? color : 'none'} />
  }
  if (el.t === 'line') {
    return <line key={i} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2}
      stroke={color} strokeWidth={SW} strokeLinecap="round" />
  }
  if (el.t === 'path') {
    return <path key={i} d={el.d}
      stroke={color} strokeWidth={SW} strokeLinecap="round" fill={el.fill === true ? color : el.fill} />
  }
  if (el.t === 'arrow') {
    const { x1, y1, x2, y2 } = el
    const dx = x2 - x1, dy = y2 - y1
    const len = Math.sqrt(dx * dx + dy * dy) || 1
    const nx = dx / len, ny = dy / len
    const size = 3
    const ax1 = x2 - nx * size - ny * size
    const ay1 = y2 - ny * size + nx * size
    const ax2 = x2 - nx * size + ny * size
    const ay2 = y2 - ny * size - nx * size
    return <g key={i}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeDasharray="2 2" />
      <path d={`M${ax1},${ay1} L${x2},${y2} L${ax2},${ay2}`} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  }
  return null
}

export default function ExercisePose({ exerciseType = 'default', frame = 0, color = '#2563eb', size = 56 }) {
  const key = TYPE_MAP[exerciseType] || 'press'
  const frames = POSES[key]
  const elements = frames?.[frame] || frames?.[0] || []

  return (
    <svg
      viewBox="0 0 50 72"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {elements.map((el, i) => renderEl(el, color, i))}
    </svg>
  )
}
