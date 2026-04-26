
import pronouncing

ARPABET_TO_SIMPLE = {
    'AA':'ɑ','AE':'æ','AH':'ʌ','AO':'ɔ','AW':'aʊ','AY':'aɪ','B':'b','CH':'tʃ','D':'d','DH':'ð',
    'EH':'ɛ','ER':'ɝ','EY':'eɪ','F':'f','G':'g','HH':'h','IH':'ɪ','IY':'i','JH':'dʒ','K':'k',
    'L':'l','M':'m','N':'n','NG':'ŋ','OW':'oʊ','OY':'ɔɪ','P':'p','R':'r','S':'s','SH':'ʃ','T':'t',
    'TH':'θ','UH':'ʊ','UW':'u','V':'v','W':'w','Y':'j','Z':'z','ZH':'ʒ'
}

def _arpabet_to_ipa(phone_string: str) -> str:
    parts = []
    for token in phone_string.split():
        clean = ''.join(ch for ch in token if not ch.isdigit())
        parts.append(ARPABET_TO_SIMPLE.get(clean, clean.lower()))
    return ' '.join(parts)

def get_phonetic(text: str) -> str:
    words = [w.strip(".,!?;:'\"()[]{} ").lower() for w in text.split()]
    ipa_words = []
    for word in words:
        if not word:
            continue
        phones = pronouncing.phones_for_word(word)
        if phones:
            ipa_words.append(_arpabet_to_ipa(phones[0]))
        else:
            ipa_words.append(f"[{word}: not in dictionary]")
    return ' / '.join(ipa_words) if ipa_words else ''

def compare_phonetics(expected: str, spoken: str):
    expected_parts = expected.split()
    spoken_parts = spoken.split()
    missing = [p for p in expected_parts if p not in spoken_parts]
    extra = [p for p in spoken_parts if p not in expected_parts]
    return {
        'match': expected == spoken,
        'missing_sounds': missing,
        'extra_sounds': extra
    }
