
import os
import re

files = ['home.js', 'index.js']
keywords = ["github", "demo", "description", "title", "repo", "tech", "stack"]
output_path = os.path.join(os.getcwd(), 'extracted_data.txt')

results = []

for filename in files:
    file_path = os.path.join(os.getcwd(), '.tmp', filename)
    if not os.path.exists(file_path):
        print(f"Skipping {file_path}")
        continue
        
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    print(f"Scanning {filename}...")
    for keyword in keywords:
        indices = [m.start() for m in re.finditer(keyword, content, re.IGNORECASE)]
        for index in indices:
            start = max(0, index - 100)
            end = min(len(content), index + 500) 
            snippet = content[start:end]
            results.append(f"--- MATCH FOR {keyword} IN {filename} AT {index} ---\n{snippet}\n\n")

with open(output_path, 'w', encoding='utf-8') as f:
    f.writelines(results)

print(f"Done. Wrote {len(results)} matches to {output_path}")
