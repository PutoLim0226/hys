import os
import re

tw_chars = ['獻血', '合唱團', '藝術', '組織結構', '團隊', '榮譽', '歷史', '網', '與', '圖', '標', '發', '請', '輸', '將', '會']

found_files = set()
for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                for char in tw_chars:
                    if char in content:
                        found_files.add(path)
                        break

for f in found_files:
    print(f)
