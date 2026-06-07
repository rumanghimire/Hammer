const API_URL = 'http://127.0.0.1:5000/analyze';

const categories = {
  l: {
    label: 'L sounds',
    words: [
      'Lion', 'Leaf', 'Lamp', 'Lemon', 'Ladder', 'Lady', 'Log', 'Lock', 'Lunch', 'Love',
      'Ball', 'Bell', 'Seal', 'Mail', 'Pool', 'Wheel', 'Owl', 'Shell', 'Hill', 'School',
      'Blue', 'Block', 'Blanket', 'Blow', 'Black',
      'Cloud', 'Clock', 'Clap', 'Clean', 'Clown',
      'Flag', 'Flower', 'Fly', 'Flame', 'Flip',
      'Glass', 'Glue', 'Glove', 'Globe', 'Glad',
      'Play', 'Plane', 'Plate', 'Plum', 'Plug',
      'Slide', 'Sleep', 'Slow', 'Sloth', 'Slime'
    ],
    description: 'Practice /l/ words, including initial, medial, final, and blends.'
  },
  r: {
    label: 'R sounds',
    words: [
      'Red', 'Rain', 'Rabbit', 'Rocket', 'Rope', 'Road', 'Ring', 'Robot', 'Race', 'Radio',
      'Carrot', 'Pirate', 'Cereal', 'Giraffe', 'Orange', 'Parade', 'Forest', 'Cherry', 'Hurry', 'Spirit',
      'Car', 'Bear', 'Chair', 'Fire', 'Four', 'Deer', 'Star', 'Pear', 'Tire', 'Door',
      'Bread', 'Crown', 'Frog', 'Drum', 'Grass', 'Pray', 'Train', 'Brick', 'Grow', 'Truck'
    ],
    description: 'Practice /r/ words, including initial, medial, final, and blends.'
  },
  mixed: {
    label: 'Mixed L/R',
    words: [
      'Lion', 'Rain', 'Ball', 'Car', 'Glass', 'Crown', 'Yellow', 'Rocket', 'Sleep', 'Train',
      'School', 'Pirate', 'Flower', 'Door', 'Chair', 'Clown', 'Frog', 'Light', 'Bread', 'Shell'
    ],
    description: 'Practice a mixed set of /l/ and /r/ words with different sounds.'
  },
  minimal: {
    label: 'Minimal pairs',
    words: [
      'Light White', 'Lip Whip', 'Lake Wake', 'Glass Grass', 'Clown Crown',
      'Belly Berry', 'Collect Correct', 'Ball Bow', 'Seal See', 'Fall Four',
      'Red Wed', 'Ring Wing', 'Rice Lice', 'Right Light', 'Berry Belly',
      'Pirate Pilot', 'Rabbit Wabbit', 'Bear Bay', 'Chair Chain', 'Bread Bled'
    ],
    description: 'Practice minimal pairs by saying both words clearly in one phrase.'
  }
};

let mediaRecorder;
let audioChunks = [];
let currentCategory = 'l';
let minimalPairStage = 0;
let currentMinimalPair = null;

const wordEl = document.getElementById('word');
const descEl = document.getElementById('desc');
const statusEl = document.getElementById('status');
const resultBox = document.getElementById('resultBox');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const newWordBtn = document.getElementById('newWordBtn');
const categorySelect = document.getElementById('categorySelect');

function pickWord() {
  const list = categories[currentCategory].words;
  return list[Math.floor(Math.random() * list.length)];
}

function setNewWord() {
  resultBox.className = 'result muted';
  resultBox.textContent = 'No recording yet.';
  statusEl.textContent = 'Ready.';

  if (currentCategory === 'minimal') {
    const phrase = pickWord();
    currentMinimalPair = phrase.split(' ');
    minimalPairStage = 0;
    wordEl.textContent = currentMinimalPair[minimalPairStage];
    descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Practice the first word.`;
  } else {
    wordEl.textContent = pickWord();
    currentMinimalPair = null;
    minimalPairStage = 0;
    descEl.textContent = categories[currentCategory].description;
  }
}

categorySelect.onchange = () => {
  currentCategory = categorySelect.value;
  setNewWord();
};

newWordBtn.onclick = setNewWord;

startBtn.onclick = async () => {
  audioChunks = [];
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
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', file);
      formData.append('word', wordEl.textContent);

      const response = await fetch(API_URL, { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Backend error');

      if (currentCategory === 'minimal') {
        if (data.match) {
          if (minimalPairStage === 0) {
            minimalPairStage = 1;
            wordEl.textContent = currentMinimalPair[minimalPairStage];
            descEl.textContent = `Minimal pair: ${currentMinimalPair[0]} — ${currentMinimalPair[1]}. Now practice the second word.`;
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
            setTimeout(setNewWord, 1500);
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
      }
    } catch (err) {
      statusEl.textContent = 'Error.';
      resultBox.className = 'result';
      resultBox.innerHTML = `<span class="error">${err.message}</span><p>Make sure backend is running: <code>cd backend && python3 app.py</code></p>`;
    }
  };
};

setNewWord();
