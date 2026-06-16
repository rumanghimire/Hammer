from flask import Flask, request, jsonify
from flask_cors import CORS
from whisper_utils import transcribe_audio
from phonetic import get_phonetic, compare_phonetics
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/', methods=['GET'])
def index():
    return '''
    <html><head><title>Speech Articulation Backend</title></head>
    <body>
      <h1>Speech Articulation Backend</h1>
      <p>Backend is running. This server only provides API endpoints.</p>
      <ul>
        <li>Status: <a href="/health">/health</a></li>
        <li>Analysis endpoint (POST): /analyze</li>
      </ul>
      <p>Open the frontend file directly: frontend/index.html</p>
    </body></html>
    ''', 200, {'Content-Type': 'text/html; charset=utf-8'}

@app.route('/favicon.ico')
def favicon():
    return ('', 204)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'backend running'})

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        word = request.form.get('word', '').strip()
        audio = request.files.get('audio')
        if not word:
            return jsonify({'error': 'No flashcard word was provided.'}), 400
        if not audio:
            return jsonify({'error': 'No audio file was received.'}), 400

        filename = secure_filename(audio.filename or 'recording.webm')
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        audio.save(file_path)

        spoken_text = transcribe_audio(file_path)
        expected_phonetic = get_phonetic(word)
        spoken_phonetic = get_phonetic(spoken_text)
        comparison = compare_phonetics(expected_phonetic, spoken_phonetic)

        return jsonify({
            'expected_word': word,
            'audio_converted_to_text': spoken_text,
            'expected_phonetic': expected_phonetic,
            'spoken_phonetic': spoken_phonetic,
            **comparison
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
