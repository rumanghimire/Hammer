# Speech Articulation Trainer

This version does NOT require espeak. It uses Whisper for speech-to-text and the CMU Pronouncing Dictionary through the `pronouncing` Python package for phonetic comparison.

## Setup on Mac

Install FFmpeg once:

```bash
brew install ffmpeg
```

Install Python packages:

```bash
cd backend
python3 -m pip install -r requirements.txt
```

Run backend:

```bash
python3 app.py
```

Keep the backend terminal open. Then open `frontend/index.html` in your browser.

## What it shows

- Flashcard word
- Audio converted to text by Whisper
- Expected phonetic sounds
- Your spoken phonetic sounds
- Missing/extra sounds
