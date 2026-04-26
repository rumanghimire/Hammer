# ⚡ Run Locally (Step-by-Step Commands)

Follow these commands **in order** to run the app on your machine.

---

## 🧩 1. Open Terminal & Go to Project

```bash
cd speech-articulation-app-no-espeak
```

---

## 🐍 2. Navigate to Backend

```bash
cd backend
```

---

## 📦 3. Install Python Dependencies

```bash
python3 -m pip install -r requirements.txt
```

---

## 🎧 4. Install FFmpeg (Required for Whisper)

### Mac:

```bash
brew install ffmpeg
```

---

## 🚀 5. Start the Backend Server

```bash
python3 app.py
```

You should see:

```bash
Running on http://127.0.0.1:5000
```

⚠️ Keep this terminal OPEN

---

## 🌐 6. Open the Frontend

In a new tab or file explorer, open:

```
speech-articulation-app-no-espeak/frontend/index.html
```

---

## 🎤 7. Use the App

1. Click **Start Recording**
2. Say the word
3. Click **Stop & Analyze**
4. View:

    * Converted speech → text
    * Phonetic comparison
    * Errors (if any)

---

# 🔁 Quick Restart (if something breaks)

```bash
cd backend
python3 app.py
```

Then refresh your browser.

---

# 🧠 Pro Tip

If you ever see errors like:

* `Failed to fetch` → backend not running
* `ModuleNotFoundError` → run:

```bash
python3 -m pip install -r requirements.txt
```

---

# ✅ That’s It

If all steps are followed, your app will run locally with:

* 🎤 Audio recording
* 🧠 Whisper transcription
* 🔤 Phonetic comparison
