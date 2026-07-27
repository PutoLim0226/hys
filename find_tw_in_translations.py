import re

tw_chars = ['獻血', '合唱團', '藝術', '組織結構', '團隊', '榮譽', '歷史', '網', '與', '圖', '標', '發', '請', '輸', '將', '會']

with open('src/i18n/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()
    
found = []
for char in tw_chars:
    if char in content:
        found.append(char)
print("Found in translations.js:", found)
