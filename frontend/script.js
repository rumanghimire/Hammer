// Backend API discovery: try 127.0.0.1 first, then localhost
let __API_BASE = null;
let __API_CHECKED = false;
async function getApiBase() {
  if (__API_CHECKED && __API_BASE) return __API_BASE;
  const candidates = [
    'http://127.0.0.1:5000',
    'http://localhost:5000'
  ];
  for (const base of candidates) {
    try {
      const res = await fetch(`${base}/health`, { method: 'GET' });
      if (res.ok) {
        __API_BASE = base;
        __API_CHECKED = true;
        return __API_BASE;
      }
    } catch (e) {
      // try next
    }
  }
  __API_CHECKED = true;
  __API_BASE = null;
  return null;
}

const categories = {
  l: {
    label: '/l/ sounds',
    subcategories: {
      initial: {
        label: 'Initial /l/',
        words: ['Lion', 'Leaf', 'Lamp', 'Lemon', 'Ladder', 'Lady', 'Log', 'Lock', 'Lunch', 'Love']
      },
      medial: {
        label: 'Medial /l/',
        words: ['Balloon', 'Pillow', 'Yellow', 'Salad', 'Dollar', 'Olive', 'Melon', 'Violin', 'Color', 'Helicopter']
      },
      final: {
        label: 'Final /l/',
        words: ['Ball', 'Bell', 'Seal', 'Mail', 'Pool', 'Wheel', 'Owl', 'Shell', 'Hill', 'School']
      },
      blends: {
        label: '/l/ blends',
        // grouped in reference (bl/cl/fl/gl/pl/sl), flattened here for practice
        words: [
          'Blue', 'Block', 'Blanket', 'Blow', 'Black',
          'Cloud', 'Clock', 'Clap', 'Clean', 'Clown',
          'Flag', 'Flower', 'Fly', 'Flame', 'Flip',
          'Glass', 'Glue', 'Glove', 'Globe', 'Glad',
          'Play', 'Plane', 'Plate', 'Plum', 'Plug',
          'Slide', 'Sleep', 'Slow', 'Sloth', 'Slime'
        ]
      },
      minimal: {
        label: 'Minimal pairs',
        words: [
          'Light White', 'Lip Whip', 'Lake Wake', 'Glass Grass', 'Clown Crown',
          'Belly Berry', 'Collect Correct', 'Ball Bow', 'Seal See', 'Fall Four'
        ]
      }
    },
    description: 'Choose Initial, Medial, Final position, Blends, or Minimal pairs for /l/.'
  },
  r: {
    label: '/r/ sounds',
    subcategories: {
      initial: {
        label: 'Pre-vocalic /r/ (Initial)',
        words: ['Red', 'Rain', 'Rabbit', 'Rocket', 'Rope', 'Road', 'Ring', 'Robot', 'Race', 'Radio']
      },
      medial: {
        label: 'Medial /r/',
        words: ['Carrot', 'Pirate', 'Cereal', 'Giraffe', 'Orange', 'Parade', 'Forest', 'Cherry', 'Hurry', 'Spirit']
      },
      final: {
        label: 'Final post-vocalic /r/',
        words: ['Car', 'Bear', 'Chair', 'Fire', 'Four', 'Deer', 'Star', 'Pear', 'Tire', 'Door']
      },
      blends: {
        label: '/r/ blends',
        words: ['Bread', 'Crown', 'Frog', 'Drum', 'Grass', 'Pray', 'Train', 'Brick', 'Grow', 'Truck']
      },
      minimal: {
        label: 'Minimal pairs',
        words: [
          'Red Wed', 'Ring Wing', 'Rice Lice', 'Right Light', 'Berry Belly',
          'Pirate Pilot', 'Rabbit Wabbit', 'Bear Bay', 'Chair Chain', 'Bread Bled'
        ]
      }
    },
    description: 'Choose Initial, Medial, Final position, Blends, or Minimal pairs for /r/.'
  },
  th: {
    label: 'Unvoiced /th/ sounds',
    subcategories: {
      initial: {
        label: 'Initial /th/',
        words: ['Think', 'Thumb', 'Thin', 'Thick', 'Thing', 'Thorn', 'Thirst', 'Thread', 'Three', 'Thousand']
      },
      medial: {
        label: 'Medial /th/',
        words: ['Bathroom', 'Birthday', 'Toothache', 'Toothbrush', 'Healthy', 'Wealthy', 'Author', 'Panther', 'Author', 'Mouthful']
      },
      final: {
        label: 'Final /th/',
        words: ['Bath', 'South', 'Death', 'Faith', 'Cloth', 'Mouth', 'Youth', 'Booth', 'Tooth', 'Smith']
      }
    },
    description: 'Choose Initial, Medial, or Final position for unvoiced /th/.'
  },
  ch: {
    label: '/ch/ sounds',
    subcategories: {
      initial: {
        label: 'Initial /ch/',
        words: ['Chair', 'Cheese', 'Chicken', 'Chocolate', 'Chalk', 'Chest', 'Check', 'Chain', 'Cherry', 'Champ']
      },
      medial: {
        label: 'Medial /ch/',
        words: ['Teacher', 'Kitchen', 'Ketchup', 'Nature', 'Catching', 'Watching', 'Matches', 'Peaches', 'Butcher', 'Future']
      },
      final: {
        label: 'Final /ch/',
        words: ['Beach', 'Bench', 'Catch', 'Couch', 'Coach', 'Ditch', 'Match', 'Much', 'Patch', 'Rich']
      }
    },
    description: 'Choose Initial, Medial, or Final position for /ch/.'
  },
  mixed: {
    label: 'Mixed words',
    words: [
      // All /l/ words (initial, medial, final, blends)
      'Lion', 'Leaf', 'Lamp', 'Lemon', 'Ladder', 'Lady', 'Log', 'Lock', 'Lunch', 'Love',
      'Balloon', 'Pillow', 'Yellow', 'Salad', 'Dollar', 'Olive', 'Melon', 'Violin', 'Color', 'Helicopter',
      'Ball', 'Bell', 'Seal', 'Mail', 'Pool', 'Wheel', 'Owl', 'Shell', 'Hill', 'School',
      'Blue', 'Block', 'Blanket', 'Blow', 'Black', 'Cloud', 'Clock', 'Clap', 'Clean', 'Clown',
      'Flag', 'Flower', 'Fly', 'Flame', 'Flip', 'Glass', 'Glue', 'Glove', 'Globe', 'Glad',
      'Play', 'Plane', 'Plate', 'Plum', 'Plug', 'Slide', 'Sleep', 'Slow', 'Sloth', 'Slime',
      // All /r/ words (initial, medial, final, blends)
      'Red', 'Rain', 'Rabbit', 'Rocket', 'Rope', 'Road', 'Ring', 'Robot', 'Race', 'Radio',
      'Carrot', 'Pirate', 'Cereal', 'Giraffe', 'Orange', 'Parade', 'Forest', 'Cherry', 'Hurry', 'Spirit',
      'Car', 'Bear', 'Chair', 'Fire', 'Four', 'Deer', 'Star', 'Pear', 'Tire', 'Door',
      'Bread', 'Crown', 'Frog', 'Drum', 'Grass', 'Pray', 'Train', 'Brick', 'Grow', 'Truck',
      // All /th/ words (initial, medial, final)
      'Think', 'Thumb', 'Thin', 'Thick', 'Thing', 'Thorn', 'Thirst', 'Thread', 'Three', 'Thousand',
      'Bathroom', 'Birthday', 'Toothache', 'Toothbrush', 'Healthy', 'Wealthy', 'Author', 'Panther', 'Author', 'Mouthful',
      'Bath', 'South', 'Death', 'Faith', 'Cloth', 'Mouth', 'Youth', 'Booth', 'Tooth', 'Smith',
      // All /ch/ words (initial, medial, final)
      'Chair', 'Cheese', 'Chicken', 'Chocolate', 'Chalk', 'Chest', 'Check', 'Chain', 'Cherry', 'Champ',
      'Teacher', 'Kitchen', 'Ketchup', 'Nature', 'Catching', 'Watching', 'Matches', 'Peaches', 'Butcher', 'Future',
      'Beach', 'Bench', 'Catch', 'Couch', 'Coach', 'Ditch', 'Match', 'Much', 'Patch', 'Rich'
    ],
    description: 'Practice a mixed set containing every /l/, /r/, /th/, and /ch/ word from all positions and blends (where applicable).'
  },
};

let mediaRecorder;
let audioChunks = [];
let currentCategory = 'l';
let minimalPairStage = 0;
let currentMinimalPair = null;
let currentSubcategory = null;

const wordEl = document.getElementById('word');
const descEl = document.getElementById('desc');
const statusEl = document.getElementById('status');
const resultBox = document.getElementById('resultBox');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const newWordBtn = document.getElementById('newWordBtn');
const timerBadge = document.getElementById('timerBadge');
let timerInterval = null;
let timerRemaining = 6;
let autoFromTimer = false;
const categorySelect = document.getElementById('categorySelect');
const subcategorySelect = document.getElementById('subcategorySelect');
const subcatLabel = document.getElementById('subcatLabel');

// New UI elements for redesigned UI
function beginCountdown(sec) {
  if (!timerBadge) return;
  clearCountdown();
  timerRemaining = sec;
  timerBadge.style.display = '';
  timerBadge.textContent = `${timerRemaining}s`;
  timerInterval = setInterval(() => {
    timerRemaining -= 1;
    if (timerRemaining <= 0) {
      timerBadge.textContent = '0s';
      clearCountdown();
      autoFromTimer = true;
      // Auto stop & analyze
      autoStopAndAnalyze();
    } else {
      timerBadge.textContent = `${timerRemaining}s`;
    }
  }, 1000);
}
function clearCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (timerBadge) timerBadge.style.display = 'none';
}
function autoStopAndAnalyze() {
  try {
    if (stopBtn && !stopBtn.disabled) {
      stopBtn.click();
    } else if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  } catch (e) {
    // noop
  }
}

const currentSoundEl = document.getElementById('currentSound');
const currentWordEl = document.getElementById('currentWord');
const completedCountEl = document.getElementById('completedCount');
const remainingCountEl = document.getElementById('remainingCount');
const progressFillEl = document.getElementById('progressFill');
const starsContainer = document.getElementById('starsContainer');
const starsCountEl = document.getElementById('starsCount');
const hammerEl = document.getElementById('hammer');
const sparkleLayer = document.getElementById('sparkleLayer');
// Mini stars progress chart elements
const starsProgressChart = document.getElementById('starsProgressChart');
const starsProgressMsg = document.getElementById('starsProgressMsg');
const levelModal = document.getElementById('levelModal');
const continueBtn = document.getElementById('continueBtn');
const newLevelBtn = document.getElementById('newLevelBtn');
const confettiCanvas = document.getElementById('confettiCanvas');
const flashImage = document.getElementById('flashImage');
const flashImageWrap = document.getElementById('flashImageWrap');
const soundLabelEl = document.getElementById('soundLabel');
const feedbackEl = document.getElementById('feedback');
const techToggle = document.getElementById('techToggle');
const techContent = document.getElementById('techContent');
const tryAgainBtn = document.getElementById('tryAgainBtn');
// Results card elements
const correctChipsEl = document.getElementById('correctChips');
const incorrectChipsEl = document.getElementById('incorrectChips');
const practiceAgainBtn = document.getElementById('practiceAgainBtn');
const practiceAgainNote = document.getElementById('practiceAgainNote');
// Optional extra progress readouts
const accuracyPctEl = document.getElementById('accuracyPct');
const totalCorrectEl = document.getElementById('totalCorrect');
const totalIncorrectEl = document.getElementById('totalIncorrect');

// Results state (UI-only; does not affect scoring)
let resultsCorrect = [];
let resultsIncorrect = [];
let lastPracticedWord = null;
let selectedPracticeWord = null;
let isRetryMode = false; // post-round per-word retry mode
let retryWord = null;

// Stars / progress state (scoring with half-stars and wrong states)
const MAX_SLOTS = 10;
let slotIndex = 0; // 0..9 which reward slot we are filling
let scorePoints = 0; // can be .5 increments in minimal pairs
let starStates = Array.from({ length: MAX_SLOTS }, () => 'empty');

function getCurrentSoundTag() {
  switch (currentCategory) {
    case 'l': return '/l/';
    case 'r': return '/r/';
    case 'th': return '/th/';
    case 'ch': return '/ch/';
    case 'mixed': return 'Mixed';
    default: return '';
  }
}

function initStars() {
  if (!starsContainer) return;
  starsContainer.innerHTML = '';
  for (let i = 0; i < MAX_SLOTS; i++) {
    const s = document.createElement('div');
    s.className = 'star empty';
    s.innerHTML = '<i class="fa-regular fa-star"></i>';
    starsContainer.appendChild(s);
  }
  renderStars();
}

function iconFor(state) {
  switch (state) {
    case 'full-correct': return '<i class="fa-solid fa-star"></i>';
    case 'full-wrong': return '<i class="fa-solid fa-star"></i>';
    case 'half-correct': return '<i class="fa-solid fa-star-half-stroke"></i>';
    case 'half-wrong': return '<i class="fa-solid fa-star-half-stroke"></i>';
    case 'half-mixed': return '<i class="fa-solid fa-star-half-stroke"></i>';
    default: return '<i class="fa-regular fa-star"></i>';
  }
}

function renderStars() {
  if (!starsContainer) return;
  const children = Array.from(starsContainer.children);
  children.forEach((el, idx) => {
    const state = starStates[idx] || 'empty';
    el.className = `star`;
    el.classList.remove('empty', 'half', 'full', 'correct', 'wrong');
    if (state === 'empty') el.classList.add('empty');
    if (state.startsWith('half')) el.classList.add('half');
    if (state.startsWith('full')) el.classList.add('full');
    if (state.endsWith('correct')) el.classList.add('correct');
    if (state.endsWith('wrong')) el.classList.add('wrong');
    el.innerHTML = iconFor(state);
  });
  const points = Math.round(scorePoints * 2) / 2; // display halves cleanly
  if (starsCountEl) starsCountEl.textContent = `${points} / ${MAX_SLOTS} Stars`;
  // Also update the compact progress chart and message
  renderProgressChart();
  updateProgressMessage();
}

function renderProgressChart() {
  if (!starsProgressChart) return;
  // Compute green (earned credit) and red (missed credit on completed slots)
  const total = MAX_SLOTS;
  const greenPoints = Math.max(0, Math.min(scorePoints, total));
  // Count fully wrong slots only for red (pending half-wrong is not marked as missed yet)
  let redPoints = 0;
  for (let i = 0; i < total; i++) {
    if (starStates[i] === 'full-wrong') redPoints += 1;
  }
  // Angles for conic-gradient
  const greenAngle = Math.max(0, Math.min(360, (greenPoints / total) * 360));
  const greenRedAngle = Math.max(greenAngle, Math.min(360, ((greenPoints + redPoints) / total) * 360));
  starsProgressChart.style.setProperty('--angle-green', `${greenAngle}deg`);
  starsProgressChart.style.setProperty('--angle-green-red', `${greenRedAngle}deg`);
  // Center label
  const label = document.getElementById('starsDonutLabel');
  if (label) label.textContent = `${Math.round(scorePoints * 2) / 2} / ${MAX_SLOTS}`;
}

function updateProgressMessage() {
  if (!starsProgressMsg) return;
  const pts = Math.round(scorePoints * 2) / 2;
  if (pts < 5) {
    starsProgressMsg.textContent = 'Keep practicing — try again to reach 5 stars.';
  } else if (pts < 8) {
    starsProgressMsg.textContent = 'Good progress — keep going!';
  } else {
    starsProgressMsg.textContent = 'Excellent work!';
  }
}

function awardSingleResult(correct) {
  const idx = slotIndex;
  if (idx >= MAX_SLOTS) return;
  if (correct) {
    starStates[idx] = 'full-correct';
    scorePoints += 1;
    animateHammerAt(idx);
  } else {
    starStates[idx] = 'full-wrong';
  }
  slotIndex = Math.min(MAX_SLOTS, slotIndex + 1);
  renderStars();
  updateProgressUI();
  checkEndOfLevel();
}

function awardMinimalFirstHalf(correct) {
  const idx = slotIndex;
  if (idx >= MAX_SLOTS) return;
  if (correct) {
    // award half point
    if (starStates[idx] !== 'half-correct') {
      scorePoints += 0.5;
    }
    starStates[idx] = 'half-correct';
    animateHammerAt(idx);
  } else {
    // mark wrong half (no score)
    starStates[idx] = 'half-wrong';
  }
  renderStars();
  updateProgressUI();
}

function awardMinimalSecondHalf(correct) {
  const idx = slotIndex;
  if (idx >= MAX_SLOTS) return;
  const prev = starStates[idx];
  if (correct) {
    if (prev === 'half-correct') {
      starStates[idx] = 'full-correct';
      scorePoints += 0.5; // complete the point
      animateHammerAt(idx);
    } else if (prev === 'half-wrong' || prev === 'empty') {
      starStates[idx] = 'half-correct';
      scorePoints += 0.5;
      animateHammerAt(idx);
    }
  } else {
    if (prev === 'half-correct') {
      // keep half-correct (0.5 point); reflect wrong half by leaving as half-correct
      starStates[idx] = 'half-correct';
    } else if (prev === 'half-wrong' || prev === 'empty') {
      // both halves wrong (0 points) — show full wrong to make it clear
      starStates[idx] = 'full-wrong';
    }
  }
  // minimal pair attempt completed after second word
  slotIndex = Math.min(MAX_SLOTS, slotIndex + 1);
  renderStars();
  updateProgressUI();
  checkEndOfLevel();
}

function checkEndOfLevel() {
  if (slotIndex >= MAX_SLOTS) {
    // Disable recording controls at round completion
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = true;

    if (tryAgainBtn) {
      // Try Again should be clickable regardless of score
      tryAgainBtn.style.display = '';
      if (scorePoints < 5) {
        statusEl.textContent = 'Round finished. Try again to reach 5 stars!';
      } else {
        statusEl.textContent = 'Great job! Keep practicing!';
        showLevelModal();
      }
    } else {
      if (scorePoints >= 5) {
        statusEl.textContent = 'Great job! Keep practicing!';
        showLevelModal();
      } else {
        statusEl.textContent = 'Round finished. Try again to reach 5 stars!';
      }
    }
    updatePracticeAgainGate();
  }
}

function animateHammerAt(index) {
  if (!hammerEl || !starsContainer) return;
  const target = starsContainer.children[index];
  if (!target) return;
  const starRect = target.getBoundingClientRect();
  const wrapRect = starsContainer.getBoundingClientRect();
  const x = starRect.left - wrapRect.left - 4;
  const y = starRect.top - wrapRect.top - 10;
  hammerEl.style.setProperty('--hx', `${x}px`);
  hammerEl.style.setProperty('--hy', `${y}px`);
  hammerEl.style.transform = `translate(${x}px, ${y}px)`;
  hammerEl.style.opacity = '1';
  hammerEl.classList.remove('hit');
  void hammerEl.offsetWidth; // reflow
  hammerEl.classList.add('hit');
  createSparklesAt(x + 10, y + 10);
}

function createSparklesAt(x, y) {
  if (!sparkleLayer) return;
  for (let i = 0; i < 10; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.left = `${x}px`;
    sp.style.top = `${y}px`;
    const dx = (Math.random() * 60 - 30).toFixed(0) + 'px';
    const dy = (Math.random() * -60 - 10).toFixed(0) + 'px';
    sp.style.setProperty('--dx', dx);
    sp.style.setProperty('--dy', dy);
    sparkleLayer.appendChild(sp);
    setTimeout(() => sp.remove(), 900);
  }
}

function updateProgressUI() {
  const completed = Math.min(slotIndex, MAX_SLOTS);
  if (completedCountEl) completedCountEl.textContent = String(completed);
  const remaining = Math.max(0, MAX_SLOTS - completed);
  if (remainingCountEl) remainingCountEl.textContent = String(remaining);
  if (document.getElementById('scoreCount')) document.getElementById('scoreCount').textContent = String(scorePoints);
  const pct = Math.round((completed / MAX_SLOTS) * 100);
  if (progressFillEl) {
    progressFillEl.style.width = `${pct}%`;
    progressFillEl.textContent = `${pct}%`;
  }
  // Optional extra readouts derived from results history (UI-only)
  if (accuracyPctEl || totalCorrectEl || totalIncorrectEl) {
    const correct = resultsCorrect.length;
    const incorrect = resultsIncorrect.length;
    const attempts = correct + incorrect;
    const acc = attempts ? Math.round((correct / attempts) * 100) : 0;
    if (accuracyPctEl) accuracyPctEl.textContent = `${acc}%`;
    if (totalCorrectEl) totalCorrectEl.textContent = String(correct);
    if (totalIncorrectEl) totalIncorrectEl.textContent = String(incorrect);
  }
}

// ===== Results card rendering (UI-only) =====
function uniqueByLast(arr) {
  const map = new Map();
  arr.forEach((w, i) => { map.set(w, i); });
  return Array.from(map.entries()).sort((a,b) => a[1]-b[1]).map(e => e[0]);
}
function renderResults() {
  // Chips become clickable only after the round is complete (Completed=10, Remaining=0)
  const allowed = canPracticeAgain();
  if (correctChipsEl) {
    const uniqCorrect = uniqueByLast(resultsCorrect);
    correctChipsEl.innerHTML = uniqCorrect.map(w => `<span class="chip chip-success${allowed ? ' clickable' : ''}${selectedPracticeWord===w ? ' active' : ''}" data-word="${w}"><i class=\"fa-solid fa-check\"></i> ${w}</span>`).join('');
  }
  if (incorrectChipsEl) {
    const uniqIncorrect = uniqueByLast(resultsIncorrect);
    incorrectChipsEl.innerHTML = uniqIncorrect.map(w => `
      <div class="chip-line">
        <span class=\"chip chip-danger\"><i class=\"fa-solid fa-xmark\"></i> ${w}</span>
        <button class=\"btn btn-secondary btn-xs retry-btn\" data-word=\"${w}\" ${allowed ? '' : 'disabled'}>
          <i class=\"fa-solid fa-rotate-right\"></i> Practice Incorrect Word Again
        </button>
      </div>
    `).join('');
  }
}
function addResult(word, wasCorrect) {
  if (!word) return;
  lastPracticedWord = word;
  if (wasCorrect) resultsCorrect.push(word); else resultsIncorrect.push(word);
  // Gating controlled by canPracticeAgain(); do not enable until round completed
  updatePracticeAgainGate();
  renderResults();
  updateProgressUI();
}

function resetProgress() {
  slotIndex = 0;
  scorePoints = 0;
  starStates = Array.from({ length: MAX_SLOTS }, () => 'empty');
  // Reset results history for a fresh round (UI-only)
  resultsCorrect = [];
  resultsIncorrect = [];
  lastPracticedWord = null;
  selectedPracticeWord = null;
  if (practiceAgainBtn) practiceAgainBtn.disabled = true;
  renderResults();
  renderStars();
  updateProgressUI();
  updatePracticeAgainGate();
}

function showLevelModal() {
  if (!levelModal) return;
  const modalStars = document.getElementById('modalStars');
  const fullStars = starStates.filter(s => s === 'full-correct').length;
  if (modalStars) modalStars.textContent = `${fullStars}/${MAX_SLOTS}`;
  levelModal.style.display = 'grid';
  launchConfetti();
}

function hideLevelModal() {
  if (!levelModal) return;
  levelModal.style.display = 'none';
  if (confettiCanvas) confettiCanvas.innerHTML = '';
}

function launchConfetti() {
  if (!confettiCanvas) return;
  confettiCanvas.innerHTML = '';
  const colors = ['#60a5fa', '#2563eb', '#fbbf24', '#10b981', '#ef4444', '#8b5cf6'];
  for (let i = 0; i < 120; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = (Math.random() * 0.8) + 's';
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiCanvas.appendChild(c);
  }
}

if (continueBtn) continueBtn.onclick = () => hideLevelModal();
if (newLevelBtn) newLevelBtn.onclick = () => { hideLevelModal(); resetProgress(); };

function tipForCategory(cat) {
  switch (cat) {
    case 'l': return 'Place the tip of your tongue behind your upper front teeth.';
    case 'r': return 'Pull your tongue back slightly without touching the roof of your mouth.';
    case 'th': return 'Gently place your tongue between your teeth and blow air for /th/.';
    case 'ch': return "Start with a quick 't' and release into a short 'sh' for /ch/.";
    default: return 'Slow down and emphasize the target sound.';
  }
}

function guessSubstitution(expected, spoken) {
  try {
    if (expected.includes('l') && !spoken.includes('l') && spoken.includes('r')) return 'Your /l/ sound was replaced by /r/.';
    if (expected.includes('r') && !spoken.includes('r') && spoken.includes('w')) return 'Your /r/ sound was replaced by /w/.';
    if (expected.includes('θ') && !spoken.includes('θ') && spoken.includes('f')) return 'Your /th/ sound was replaced by /f/.';
    if (expected.includes('tʃ') && !spoken.includes('tʃ') && spoken.includes('s')) return 'Your /ch/ sound was replaced by /s/.';
  } catch(e) {}
  return '';
}

function showFeedbackCorrect(data) {
  if (!feedbackEl) return;
  feedbackEl.className = 'feedback success card-inset';
  const target = data.expected_phonetic || '';
  const yours = data.spoken_phonetic || '';
  feedbackEl.innerHTML = `
    <div class="feedback-title"><span class="icon">✅</span>Excellent pronunciation!</div>
    <div class="rows">
      <div><span class="mini">Target pronunciation:</span> <code>${target}</code></div>
      <div><span class="mini">Your pronunciation:</span> <code>${yours}</code></div>
      <div class="note">Great job! You pronounced the word correctly.</div>
    </div>
  `;
}

function showFeedbackIncorrect(data) {
  if (!feedbackEl) return;
  feedbackEl.className = 'feedback warning card-inset';
  const target = data.expected_phonetic || '';
  const yours = data.spoken_phonetic || '';
  const sub = guessSubstitution(target, yours);
  const tip = tipForCategory(currentCategory);
  let missing = Array.isArray(data.missing_sounds) && data.missing_sounds.length ? data.missing_sounds.join(', ') : 'None';
  let extra = Array.isArray(data.extra_sounds) && data.extra_sounds.length ? data.extra_sounds.join(', ') : 'None';
  feedbackEl.innerHTML = `
    <div class="feedback-title"><span class="icon">⚠️</span>Almost there — try that sound again.</div>
    <div class="rows">
      <div><span class="mini">Target pronunciation:</span> <code>${target}</code></div>
      <div><span class="mini">Your pronunciation:</span> <code>${yours}</code></div>
      ${sub ? `<div>${sub}</div>` : ''}
      <div><strong>Missing expected sounds:</strong> ${missing}</div>
      <div><strong>Extra spoken sounds:</strong> ${extra}</div>
      <div class="note"><strong>Tip (based on your selected sound):</strong> ${tip}</div>
    </div>
  `;
}

function setFlashImageFor(word) {
  if (!flashImage || !flashImageWrap) return;
  flashImage.loading = 'lazy';
  flashImage.referrerPolicy = 'no-referrer';
  // Show a gentle skeleton while the image loads
  flashImageWrap.classList.add('skeleton');
  flashImageWrap.style.display = '';
  const q = encodeURIComponent(word);
  const url = `https://source.unsplash.com/featured/400x300/?${q}`;
  flashImage.onload = () => {
    flashImageWrap.classList.remove('skeleton');
    flashImageWrap.style.display = '';
  };
  flashImage.onerror = () => {
    flashImageWrap.classList.remove('skeleton');
    flashImageWrap.style.display = 'none';
  };
  flashImage.src = url;
}

function currentSubLabel() {
  if (!hasSubcategories(currentCategory)) return '';
  const subs = categories[currentCategory].subcategories;
  const key = currentSubcategory || Object.keys(subs)[0];
  return subs[key]?.label || '';
}

function updateSoundLabel() {
  if (!soundLabelEl) return;
  if (currentCategory === 'mixed') {
    soundLabelEl.textContent = '(Mixed words)';
    return;
  }
  const group = categories[currentCategory]?.label || '';
  const sub = currentSubLabel();
  const txt = sub ? `${group} — ${sub}` : group;
  soundLabelEl.textContent = `(${txt})`;
}

function updateAuxUI() {
  if (currentSoundEl) currentSoundEl.textContent = getCurrentSoundTag();
  if (currentWordEl) currentWordEl.textContent = wordEl ? wordEl.textContent : '';
  if (wordEl && wordEl.textContent) setFlashImageFor(wordEl.textContent);
  updateSoundLabel();
  updateProgressUI();
}

function hasSubcategories(cat) {
  return Boolean(categories[cat] && categories[cat].subcategories);
}

function isMinimalMode() {
  if (!hasSubcategories(currentCategory)) return false;
  const subs = categories[currentCategory].subcategories;
  const sub = currentSubcategory || Object.keys(subs)[0];
  return sub === 'minimal';
}

function getCurrentWordList() {
  if (currentCategory === 'mixed') {
    return categories[currentCategory].words;
  }
  if (hasSubcategories(currentCategory)) {
    const sub = currentSubcategory || Object.keys(categories[currentCategory].subcategories)[0];
    const subObj = categories[currentCategory].subcategories[sub];
    return subObj ? subObj.words : [];
  }
  return categories[currentCategory].words || [];
}

function pickWord() {
  const list = getCurrentWordList();
  if (!list || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function populateSubcategories() {
  if (!hasSubcategories(currentCategory)) {
    subcategorySelect.style.display = 'none';
    subcatLabel.style.display = 'none';
    currentSubcategory = null;
    return;
  }
  subcategorySelect.innerHTML = '';
  const subs = categories[currentCategory].subcategories;
  Object.keys(subs).forEach((key) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = subs[key].label;
    subcategorySelect.appendChild(opt);
  });
  subcategorySelect.style.display = '';
  subcatLabel.style.display = '';
  // default to first subcategory if currentSubcategory missing or not in list
  if (!currentSubcategory || !subs[currentSubcategory]) {
    currentSubcategory = Object.keys(subs)[0];
  }
  subcategorySelect.value = currentSubcategory;
}

function setNewWord() {
  resultBox.className = 'result muted';
  resultBox.textContent = 'No recording yet.';
  statusEl.textContent = 'Ready.';

  // ensure subcategory UI reflects current category
  populateSubcategories();

  if (isMinimalMode()) {
    const phrase = pickWord();
    currentMinimalPair = phrase ? phrase.split(' ') : null;
    minimalPairStage = 0;
    if (currentMinimalPair) {
      wordEl.textContent = currentMinimalPair[minimalPairStage];
      const sub = categories[currentCategory].subcategories[currentSubcategory];
      descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Practice the first word. You have 6 seconds to record; it will auto‑analyze when time ends.`;
    } else {
      wordEl.textContent = '';
      descEl.textContent = 'No minimal pairs available.';
    }
  } else {
    const w = pickWord();
    wordEl.textContent = w || '(no words)';
    currentMinimalPair = null;
    minimalPairStage = 0;
    // Keep a clean, non-duplicated instruction for the sticky note card
    // Add a short time-limit note so users know the countdown behavior
    descEl.textContent = 'Say the word clearly. You have 6 seconds — it will auto‑analyze when time ends (you can also stop early).';
  }
  // Refresh auxiliary UI
  updateAuxUI();
  if (feedbackEl) { feedbackEl.className = 'feedback card-inset hidden'; feedbackEl.innerHTML = ''; }
}

categorySelect.onchange = () => {
  currentCategory = categorySelect.value;
  // reset subcategory when switching groups
  currentSubcategory = null;
  setNewWord();
};

subcategorySelect.onchange = () => {
  currentSubcategory = subcategorySelect.value;
  setNewWord();
};

function canPracticeAgain() {
  return slotIndex >= MAX_SLOTS;
}
function updatePracticeAgainGate() {
  const allowed = canPracticeAgain();
  const hasChoice = Boolean(selectedPracticeWord || lastPracticedWord);
  if (practiceAgainBtn) practiceAgainBtn.disabled = !allowed || !hasChoice;
  if (practiceAgainNote) practiceAgainNote.style.display = allowed ? '' : '';
  // Note text depending on state
  if (practiceAgainNote) practiceAgainNote.textContent = allowed ? 'Round complete. You can practice only the words you missed.' : 'Finish all 10 words first. Then you can practice the incorrect words again.';
  // Make chips clickable only when allowed
  renderResults();
}

const flashcardEl = document.getElementById('flashcard');
function performFlipAnd(fn) {
  if (!flashcardEl) { try { fn(); } catch(e) {} return; }
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { try { fn(); } catch(e) {} return; }
  // Two-phase flip: 0 -> 90 (update content) -> 0 for a clean, reliable effect
  flashcardEl.style.willChange = 'transform';
  flashcardEl.style.transition = 'transform .28s ease';
  flashcardEl.style.transform = 'rotateY(90deg)';
  const onFirst = () => {
    flashcardEl.removeEventListener('transitionend', onFirst);
    try { fn(); } catch(e) {}
    requestAnimationFrame(() => {
      flashcardEl.style.transition = 'transform .32s ease';
      flashcardEl.style.transform = 'rotateY(0deg)';
      const onSecond = () => {
        flashcardEl.removeEventListener('transitionend', onSecond);
        flashcardEl.style.willChange = '';
        flashcardEl.style.transition = '';
        flashcardEl.style.transform = '';
      };
      flashcardEl.addEventListener('transitionend', onSecond, { once: true });
    });
  };
  flashcardEl.addEventListener('transitionend', onFirst);
}

if (newWordBtn) newWordBtn.onclick = () => performFlipAnd(setNewWord);

startBtn.onclick = async () => {
  audioChunks = [];
  if (feedbackEl) { feedbackEl.className = 'feedback card-inset hidden'; feedbackEl.innerHTML = ''; }
  document.body.classList.remove('analyzing');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.start();
    statusEl.textContent = 'Recording...';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    // Start 6-second countdown timer
    autoFromTimer = false;
    beginCountdown(6);
  } catch (err) {
    statusEl.textContent = 'Microphone permission error.';
    resultBox.innerHTML = `<span class="error">${err.message}</span>`;
  }
};

stopBtn.onclick = async () => {
  if (!mediaRecorder) return;
  clearCountdown();
  mediaRecorder.stop();
  stopBtn.disabled = true;
  startBtn.disabled = false;
  statusEl.textContent = 'Analyzing...';

  mediaRecorder.onstop = async () => {
    try {
      document.body.classList.add('analyzing');
      if (newWordBtn) newWordBtn.disabled = true;
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', file);
      formData.append('word', wordEl.textContent);

      const base = await getApiBase();
      if (!base) {
        throw new Error('Cannot reach backend at http://127.0.0.1:5000 or http://localhost:5000. Start it with: cd backend && python3 app.py');
      }
      let response;
      try {
        response = await fetch(`${base}/analyze`, { method: 'POST', body: formData });
      } catch (netErr) {
        throw new Error(`Failed to reach backend at ${base}. Is it running? Start with: cd backend && python3 app.py`);
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Backend error');

      if (isMinimalMode()) {
        if (data.match) {
          if (minimalPairStage === 0) {
            minimalPairStage = 1;
            statusEl.textContent = 'First word correct! Now practice the pairing word.';
            resultBox.className = 'result';
            resultBox.innerHTML = `
              <p><strong>Practice category:</strong> ${categories[currentCategory].label}</p>
              <p><strong>Current pair:</strong> ${currentMinimalPair[0]} — ${currentMinimalPair[1]}</p>
              <p><strong>Completed:</strong> ${currentMinimalPair[0]}</p>
              <p><strong>Next word:</strong> ${currentMinimalPair[1]}</p>
              <p><strong>Audio converted to text by Whisper:</strong> ${data.audio_converted_to_text || '(no speech detected)'}</p>
              <p><strong>Expected phonetic sounds:</strong> ${data.expected_phonetic}</p>
              <p><strong>Your spoken phonetic sounds:</strong> ${data.spoken_phonetic}</p>
            `;
            showFeedbackCorrect(data);
            awardMinimalFirstHalf(true);
            // Log result for Results card (UI-only)
            try { addResult(currentMinimalPair[0], true); } catch(e) {}
            performFlipAnd(() => {
              wordEl.textContent = currentMinimalPair[1];
              descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Now practice the second word. You have 6 seconds to record; it will auto‑analyze when time ends.`;
              updateAuxUI();
            });
            document.body.classList.remove('analyzing');
          } else {
            statusEl.textContent = 'Both words correct! Moving to the next minimal pair.';
            resultBox.className = 'result';
            resultBox.innerHTML = `
              <p><strong>Practice category:</strong> ${categories[currentCategory].label}</p>
              <p><strong>Completed pair:</strong> ${currentMinimalPair[0]} — ${currentMinimalPair[1]}</p>
              <p><strong>Audio converted to text by Whisper:</strong> ${data.audio_converted_to_text || '(no speech detected)'}</p>
              <p><strong>Expected phonetic sounds:</strong> ${data.expected_phonetic}</p>
              <p><strong>Your spoken phonetic sounds:</strong> ${data.spoken_phonetic}</p>
            `;
            showFeedbackCorrect(data);
            awardMinimalSecondHalf(true);
            try { addResult(currentMinimalPair[1], true); } catch(e) {}
            updateAuxUI();
            document.body.classList.remove('analyzing');
            autoFromTimer = false;
            if (newWordBtn) newWordBtn.disabled = false;
            setTimeout(() => performFlipAnd(setNewWord), 1200);
          }
        } else {
          statusEl.textContent = minimalPairStage === 0 ? 'Try the first word again.' : 'Try the second word again.';
          resultBox.className = 'result';
          resultBox.innerHTML = `
            <p><strong>Practice category:</strong> ${categories[currentCategory].label}</p>
            <p><strong>Current pair:</strong> ${currentMinimalPair[0]} — ${currentMinimalPair[1]}</p>
            <p><strong>Word to repeat:</strong> ${currentMinimalPair[minimalPairStage]}</p>
            <p><strong>Audio converted to text by Whisper:</strong> ${data.audio_converted_to_text || '(no speech detected)'}</p>
            <p><strong>Expected phonetic sounds:</strong> ${data.expected_phonetic}</p>
            <p><strong>Your spoken phonetic sounds:</strong> ${data.spoken_phonetic}</p>
            <p><strong>Match:</strong> No</p>
            <p><strong>Missing expected sounds:</strong> ${data.missing_sounds.length ? data.missing_sounds.join(', ') : 'None'}</p>
            <p><strong>Extra spoken sounds:</strong> ${data.extra_sounds.length ? data.extra_sounds.join(', ') : 'None'}</p>
          `;
          showFeedbackIncorrect(data);
          if (minimalPairStage === 0) {
            awardMinimalFirstHalf(false);
            try { addResult(currentMinimalPair[0], false); } catch(e) {}
          } else {
            awardMinimalSecondHalf(false);
            try { addResult(currentMinimalPair[1], false); } catch(e) {}
          }
          updateAuxUI();
          document.body.classList.remove('analyzing');
          autoFromTimer = false;
          if (newWordBtn) newWordBtn.disabled = false;
        }
      } else {
        statusEl.textContent = data.match ? 'Correct match.' : 'Check the sound difference.';
        resultBox.className = 'result';
        resultBox.innerHTML = `
          <p><strong>Practice category:</strong> ${categories[currentCategory].label}</p>
          <p><strong>Flashcard word(s):</strong> ${data.expected_word}</p>
          <p><strong>Audio converted to text by Whisper:</strong> ${data.audio_converted_to_text || '(no speech detected)'}</p>
          <p><strong>Expected phonetic sounds:</strong> ${data.expected_phonetic}</p>
          <p><strong>Your spoken phonetic sounds:</strong> ${data.spoken_phonetic}</p>
          <p><strong>Match:</strong> ${data.match ? 'Yes' : 'No'}</p>
          <p><strong>Missing expected sounds:</strong> ${data.missing_sounds.length ? data.missing_sounds.join(', ') : 'None'}</p>
          <p><strong>Extra spoken sounds:</strong> ${data.extra_sounds.length ? data.extra_sounds.join(', ') : 'None'}</p>
        `;
        const practicedWord = wordEl.textContent;
        if (isRetryMode) {
          // In retry mode (post-round), do not advance automatically.
          if (data.match) {
            showFeedbackCorrect(data);
            // Move word from Incorrect -> Correct and notify
            try {
              // Remove all instances of the word from incorrect list
              resultsIncorrect = resultsIncorrect.filter(w => w !== practicedWord);
              // Add once to correct if not already present
              if (!resultsCorrect.includes(practicedWord)) resultsCorrect.push(practicedWord);
              renderResults();
              updateProgressUI();
              statusEl.textContent = `Great job! ${practicedWord} moved to Correct Words.`;
            } catch(e) {}
            // Keep recording controls enabled so user can choose another incorrect word
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
          } else {
            showFeedbackIncorrect(data);
            // Ensure it appears in Incorrect list at least once
            try {
              if (!resultsIncorrect.includes(practicedWord)) resultsIncorrect.push(practicedWord);
              renderResults();
              updateProgressUI();
              statusEl.textContent = `Let’s try again: ${practicedWord}`;
            } catch(e) {}
            if (startBtn) startBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
          }
          // Clear analyzing overlay and timer flag in retry mode
          document.body.classList.remove('analyzing');
          autoFromTimer = false;
        } else {
          if (data.match) { 
            showFeedbackCorrect(data); 
            awardSingleResult(true); 
            try { addResult(practicedWord, true); } catch(e) {}
          } else { 
            showFeedbackIncorrect(data); 
            awardSingleResult(false); 
            try { addResult(practicedWord, false); } catch(e) {}
          }
          updateAuxUI();
          document.body.classList.remove('analyzing');
          const wasAuto = autoFromTimer; autoFromTimer = false;
          if (newWordBtn) newWordBtn.disabled = false;
          // Always advance to a new word after analysis in non-minimal practice
          setTimeout(() => performFlipAnd(setNewWord), 900);
        }
      }
    } catch (err) {
      statusEl.textContent = 'Error.';
      resultBox.className = 'result';
      resultBox.innerHTML = `<span class="error">${err.message}</span><p>Make sure backend is running: <code>cd backend && python3 app.py</code></p>`;
    }
  };
};

setNewWord();

// On load, initialize UI and probe backend availability
window.addEventListener('load', async () => {
  initStars();
  updateAuxUI();
  renderResults();

  // Collapsible technical details
  if (techToggle && techContent) {
    techToggle.addEventListener('click', () => {
      const open = techContent.classList.toggle('open');
      techToggle.setAttribute('aria-expanded', String(open));
      techContent.setAttribute('aria-hidden', String(!open));
      techToggle.innerHTML = open
        ? '<i class="fa-solid fa-circle-info"></i> Hide technical details'
        : '<i class="fa-solid fa-circle-info"></i> Show technical details';
    });
  }

  // Try Again resets the round
  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      resetProgress();
      isRetryMode = false; retryWord = null; selectedPracticeWord = null;
      tryAgainBtn.style.display = 'none';
      // Re-enable recording for new round
      if (startBtn) startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
      statusEl.textContent = 'Round reset. Keep practicing!';
      performFlipAnd(setNewWord);
    });
  }

  // Practice Again: repeat the last practiced word without changing scoring logic
  function loadPracticeWord(w) {
    if (!w) return;
    performFlipAnd(() => {
      // If the selected word belongs to current minimal pair, set stage accordingly
      if (isMinimalMode() && currentMinimalPair && currentMinimalPair.length === 2) {
        if (w === currentMinimalPair[0]) minimalPairStage = 0;
        else if (w === currentMinimalPair[1]) minimalPairStage = 1;
        else minimalPairStage = 0;
      }
      wordEl.textContent = w;
      descEl.textContent = 'Let\'s try that word again.';
      if (feedbackEl) { feedbackEl.className = 'feedback card-inset hidden'; feedbackEl.innerHTML = ''; }
      statusEl.textContent = 'Ready.';
      updateAuxUI();
    });
  }

  if (practiceAgainBtn) {
    practiceAgainBtn.addEventListener('click', () => {
      if (!canPracticeAgain()) return;
      const w = selectedPracticeWord || lastPracticedWord;
      if (!w) return;
      loadPracticeWord(w);
    });
  }

  // Delegate clicks on result chips to practice that specific word when allowed
  // Delegate clicks on incorrect retry buttons
  if (incorrectChipsEl) {
    incorrectChipsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.retry-btn');
      if (!btn) return;
      const w = btn.getAttribute('data-word');
      if (!w) return;
      if (!canPracticeAgain()) { updatePracticeAgainGate(); return; }
      // Enter retry mode for this exact word
      isRetryMode = true;
      retryWord = w;
      selectedPracticeWord = w;
      // Re-enable Start button to allow recording this word again
      if (startBtn) startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
      // Load the word into the card
      performFlipAnd(() => {
        wordEl.textContent = w;
        descEl.textContent = 'Retry this incorrect word. You have 6 seconds — it will auto‑analyze when time ends (you can also stop early).';
        statusEl.textContent = 'Ready.';
        updateAuxUI();
      });
    });
  }

  // Also allow selecting a word via chips after completion (optional)
  function setupChipDelegation(container) {
    if (!container) return;
    container.addEventListener('click', (e) => {
      const target = e.target.closest('.chip.clickable');
      if (!target) return;
      if (!canPracticeAgain()) return;
      const w = target.getAttribute('data-word');
      if (!w) return;
      selectedPracticeWord = w;
      updatePracticeAgainGate();
    });
  }
  setupChipDelegation(correctChipsEl);
  // Note: incorrectChipsEl chips are not clickable (we use explicit buttons instead)

  // Initialize gating state on load
  updatePracticeAgainGate();

  statusEl.textContent = 'Checking backend...';
  const base = await getApiBase();
  if (base) {
    statusEl.textContent = `Connected to backend: ${base}`;
  } else {
    statusEl.textContent = 'Backend not reachable. Start it with: cd backend && python3 app.py';
    resultBox.className = 'result';
    resultBox.innerHTML = `<span class=\"error\">Backend unreachable.</span><p>Tried http://127.0.0.1:5000 and http://localhost:5000.</p><p>Start the server: <code>cd backend && python3 app.py</code></p>`;
  }
});
