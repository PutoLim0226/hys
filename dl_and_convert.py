import os
import json
import urllib.request

url = 'https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/dictionary/TWVariantsRevPhrases.txt'
url2 = 'https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/dictionary/TSCharacters.txt'

try:
    req1 = urllib.request.urlopen(url2)
    ts_chars = req1.read().decode('utf-8').splitlines()
    
    mapping = {}
    for line in ts_chars:
        if line.strip():
            parts = line.split('\t')
            if len(parts) >= 2:
                trad = parts[0]
                simp = parts[1].split(' ')[0] # take the first mapping
                mapping[trad] = simp
                
    # Also add some phrase mappings
    req2 = urllib.request.urlopen('https://raw.githubusercontent.com/BYVoid/OpenCC/master/data/dictionary/TSPhrases.txt')
    ts_phrases = req2.read().decode('utf-8').splitlines()
    for line in ts_phrases:
        if line.strip():
            parts = line.split('\t')
            if len(parts) >= 2:
                trad = parts[0]
                simp = parts[1].split(' ')[0]
                mapping[trad] = simp
                
    # Reverse sort by length of keys to match phrases first
    sorted_keys = sorted(mapping.keys(), key=len, reverse=True)
    
    for root, _, files in os.walk('src'):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for trad in sorted_keys:
                    if trad in content:
                        content = content.replace(trad, mapping[trad])
                        
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Converted {path}")
                    
except Exception as e:
    print(f"Error: {e}")
