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

## Practice word lists

### /l/ sounds

Initial /l/: Lion, Leaf, Lamp, Lemon, Ladder, Lady, Log, Lock, Lunch, Love

Medial /l/: Balloon, Pillow, Yellow, Salad, Dollar, Olive, Melon, Violin, Color, Helicopter

Final /l/: Ball, Bell, Seal, Mail, Pool, Wheel, Owl, Shell, Hill, School

/l/ blends:
- bl: Blue, Block, Blanket, Blow, Black
- cl: Cloud, Clock, Clap, Clean, Clown
- fl: Flag, Flower, Fly, Flame, Flip
- gl: Glass, Glue, Glove, Globe, Glad
- pl: Play, Plane, Plate, Plum, Plug
- sl: Slide, Sleep, Slow, Sloth, Slime

### Minimal pairs (I will go over this meeting ma)

- Light — White
- Lip — Whip
- Lake — Wake
- Glass — Grass
- Clown — Crown
- Belly — Berry
- Collect — Correct
- Ball — Bow
- Seal — See
- Fall — Four

## /r/ sounds

Pre-vocalic /r/ in initial position of words: red, rain, rabbit, rocket, rope, road, ring, robot, race, radio

Medial /r/: carrot, pirate, cereal, giraffe, orange, parade, forest, cherry, hurry, spirit

Final post-vocalic /r/: car, bear, chair, fire, four, deer, star, pear, tire, door

Blends: bread, crown, frog, drum, grass, pray, train, brick, grow, truck

Minimal pair: red–wed, ring–wing, rice–lice, right–light, berry–belly, pirate–pilot, rabbit–wabbit, bear–bay, chair–chain, bread–bled
