import re

with open('src/assets/scss/main.scss', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update brand palette to a more refined Zen / organic orange
content = re.sub(r'--primary-color: #E65100;', r'--primary-color: #D35400;', content)
content = re.sub(r'--primary-hover: #D84315;', r'--primary-hover: #A04000;', content)
content = re.sub(r'--primary-light: #FFF3E0;', r'--primary-light: #FDF4E3;', content)
content = re.sub(r'--accent-color: #FF9800;', r'--accent-color: #E67E22;', content)
content = re.sub(r'--secondary-color: #F57C00;', r'--secondary-color: #BA4A00;', content)

# 2. Update background colors to off-white for a natural feel
content = re.sub(r'--bg-primary: #FFFFFF;', r'--bg-primary: #FAF9F6;', content)
content = re.sub(r'--bg-secondary: #F8F9FA;', r'--bg-secondary: #F3F1EC;', content)
content = re.sub(r'--bg-tertiary: #F1F3F5;', r'--bg-tertiary: #EBE8E1;', content)
content = re.sub(r'--card-bg: #FFFFFF;', r'--card-bg: #FFFFFF;', content)
content = re.sub(r'--text-primary: #212529;', r'--text-primary: #2C2A29;', content)

# 3. Update dark mode background
content = re.sub(r'--bg-primary: #121212;', r'--bg-primary: #1A1918;', content)
content = re.sub(r'--bg-secondary: #1E1E1E;', r'--bg-secondary: #242221;', content)

# 4. Add Noto Serif TC for headings and update HTML font-family
content = re.sub(r"font-family: 'Noto Sans TC', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
                 r"font-family: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  font-weight: 300;", content)

# Add headings font
content = re.sub(r'(html \{.*?\}\n)(body \{)', r"\1\nh1, h2, h3, h4, h5, h6 {\n  font-family: 'Noto Serif TC', serif;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n}\n\n\2", content, flags=re.DOTALL)

# 5. Fix nav-menu spacing and wrap
nav_menu_regex = r'(\.nav-menu \{.*?gap:\s*)1\.5rem(.*?\.nav-item \{.*?a \{)'
content = re.sub(nav_menu_regex, r'\1 0.75rem \2\n        white-space: nowrap;', content, flags=re.DOTALL)

# 6. Make hero-section more elegant
hero_regex = r"(\.hero-section \{.*?background: linear-gradient\(135deg, )rgba\(230, 81, 0, 0\.9\), rgba\(245, 124, 0, 0\.85\)(.*?\n.*?padding: )4rem 0(.*?@media \(min-width: 768px\) \{.*?padding: )6rem 0(.*?\})(.+?margin-bottom: 1rem;\n      line-height: 1\.2;)"
content = re.sub(hero_regex, r'\1rgba(211, 84, 0, 0.85), rgba(160, 64, 0, 0.9)\2 6rem 0 \3 8rem 0 \4\5\n      letter-spacing: 0.05em;\n      text-shadow: 0 2px 10px rgba(0,0,0,0.1);', content, flags=re.DOTALL)

with open('src/assets/scss/main.scss', 'w', encoding='utf-8') as f:
    f.write(content)
