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
const categorySelect = document.getElementById('categorySelect');
const subcategorySelect = document.getElementById('subcategorySelect');
const subcatLabel = document.getElementById('subcatLabel');

// New UI elements for redesigned UI
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
    if (tryAgainBtn) {
      if (scorePoints < 5) {
        tryAgainBtn.style.display = '';
        statusEl.textContent = 'Round finished. Try again to reach 5 stars!';
      } else {
        tryAgainBtn.style.display = 'none';
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
}

function resetProgress() {
  slotIndex = 0;
  scorePoints = 0;
  starStates = Array.from({ length: MAX_SLOTS }, () => 'empty');
  renderStars();
  updateProgressUI();
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
      descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Practice the first word.`;
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
    // Show a generic practice hint instead of repeating the sound/position line
    descEl.textContent = 'Say the word clearly, then tap Start Recording and Stop & Analyze.';
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

const flashcardEl = document.getElementById('flashcard');
function performFlipAnd(fn) {
  if (!flashcardEl) { fn(); return; }
  flashcardEl.classList.add('flip');
  setTimeout(() => { try { fn(); } catch(e) {} }, 275);
  setTimeout(() => flashcardEl.classList.remove('flip'), 560);
}

newWordBtn.onclick = () => performFlipAnd(setNewWord);

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
  } catch (err) {
    statusEl.textContent = 'Microphone permission error.';
    resultBox.innerHTML = `<span class="error">${err.message}</span>`;
  }
};

stopBtn.onclick = async () => {
  if (!mediaRecorder) return;
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
            performFlipAnd(() => {
              wordEl.textContent = currentMinimalPair[1];
              descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Now practice the second word.`;
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
            updateAuxUI();
            document.body.classList.remove('analyzing');
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
          } else {
            awardMinimalSecondHalf(false);
          }
          updateAuxUI();
          document.body.classList.remove('analyzing');
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
        if (data.match) { showFeedbackCorrect(data); awardSingleResult(true); } else { showFeedbackIncorrect(data); awardSingleResult(false); }
        updateAuxUI();
        document.body.classList.remove('analyzing');
        if (newWordBtn) newWordBtn.disabled = false;
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
      tryAgainBtn.style.display = 'none';
      statusEl.textContent = 'Round reset. Keep practicing!';
      performFlipAnd(setNewWord);
    });
  }

  statusEl.textContent = 'Checking backend...';
  const base = await getApiBase();
  if (base) {
    statusEl.textContent = `Connected to backend: ${base}`;
  } else {
    statusEl.textContent = 'Backend not reachable. Start it with: cd backend && python3 app.py';
    resultBox.className = 'result';
    resultBox.innerHTML = `<span class="error">Backend unreachable.</span><p>Tried http://127.0.0.1:5000 and http://localhost:5000.</p><p>Start the server: <code>cd backend && python3 app.py</code></p>`;
  }
});
