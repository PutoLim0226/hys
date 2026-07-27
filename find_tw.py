import os
import re

tw_chars = ['頁', '關於', '資訊', '項目', '義工', '聯絡', '後台', '檢視', '感謝狀', '電子', '憑證', '淨化', '社會', '講座', '禪修', '填寫', '愛心', '點亮', '計劃', '扶貧', '救濟', '弱勢', '醫療', '舉辦', '補助']

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
