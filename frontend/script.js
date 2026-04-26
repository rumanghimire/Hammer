const words = ['dream', 'thought', 'school', 'three', 'rabbit', 'yellow', 'chair', 'fish'];
const API_URL = 'http://127.0.0.1:5000/analyze';

let mediaRecorder;
let audioChunks = [];

const wordEl = document.getElementById('word');
const statusEl = document.getElementById('status');
const resultBox = document.getElementById('resultBox');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const newWordBtn = document.getElementById('newWordBtn');

newWordBtn.onclick = () => {
  wordEl.textContent = words[Math.floor(Math.random() * words.length)];
  resultBox.className = 'result muted';
  resultBox.textContent = 'No recording yet.';
  statusEl.textContent = 'Ready.';
};

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

      statusEl.textContent = data.match ? 'Correct match.' : 'Check the sound difference.';
      resultBox.className = 'result';
      resultBox.innerHTML = `
        <p><strong>Flashcard word:</strong> ${data.expected_word}</p>
        <p><strong>Audio converted to text by Whisper:</strong> ${data.audio_converted_to_text || '(no speech detected)'}</p>
        <p><strong>Expected phonetic sounds:</strong> ${data.expected_phonetic}</p>
        <p><strong>Your spoken phonetic sounds:</strong> ${data.spoken_phonetic}</p>
        <p><strong>Match:</strong> ${data.match ? 'Yes' : 'No'}</p>
        <p><strong>Missing expected sounds:</strong> ${data.missing_sounds.length ? data.missing_sounds.join(', ') : 'None'}</p>
        <p><strong>Extra spoken sounds:</strong> ${data.extra_sounds.length ? data.extra_sounds.join(', ') : 'None'}</p>
      `;
    } catch (err) {
      statusEl.textContent = 'Error.';
      resultBox.className = 'result';
      resultBox.innerHTML = `<span class="error">${err.message}</span><p>Make sure backend is running: <code>cd backend && python3 app.py</code></p>`;
    }
  };
};
