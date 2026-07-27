import os
import re

for root, _, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original = content
            
            # Replace <div className="row..."> with <div className="grid-layout">
            content = re.sub(r'<div className="row[^"]*">', r'<div className="grid-layout">', content)
            
            # Remove <div className="col-md-[0-9]+[^"]*"> wrappers
            # This is tricky with regex, so we'll just replace the className to 'grid-item' or remove the wrapper via regex
            # Actually, since it's just a div wrapper:
            # <div className="col-md-4 mb-4">\n <div className="card"> ... </div>\n</div>
            # Let's just rename 'col-md-.*' to nothing, wait, just changing the class is safer.
            content = re.sub(r'className="col-md-[0-9]+[^"]*"', r'className=""', content)
            
            if content != original:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed grid in {path}")
