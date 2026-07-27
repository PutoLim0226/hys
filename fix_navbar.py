import re

with open('src/assets/scss/main.scss', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix nav-menu spacing and wrap
nav_menu_regex = r'(\.nav-menu \{.*?gap:\s*)1\.5rem(.*?\.nav-item \{.*?a \{)'
content = re.sub(nav_menu_regex, r'\1 0.75rem \2\n        white-space: nowrap;', content, flags=re.DOTALL)

with open('src/assets/scss/main.scss', 'w', encoding='utf-8') as f:
    f.write(content)
