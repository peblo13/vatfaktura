import shutil
import os

source_dirs = ['app', 'components', 'hooks', 'lib', 'styles', 'public']
root_path = '/vercel/share/v0-project'
vatfaktura_path = os.path.join(root_path, 'vatfaktura')

print("[v0] Starting directory reorganization...")

for dir_name in source_dirs:
    source = os.path.join(vatfaktura_path, dir_name)
    dest = os.path.join(root_path, dir_name)
    
    if os.path.exists(source):
        try:
            # If destination exists, remove it first
            if os.path.exists(dest):
                shutil.rmtree(dest)
            
            # Copy the directory tree
            shutil.copytree(source, dest)
            print(f"[v0] Successfully copied {dir_name} to root")
        except Exception as e:
            print(f"[v0] Error copying {dir_name}: {e}")
    else:
        print(f"[v0] {dir_name} not found in vatfaktura, skipping")

# Also copy README and API files if they exist
for file_name in ['README.md', 'API.md']:
    source = os.path.join(vatfaktura_path, file_name)
    dest = os.path.join(root_path, file_name)
    
    if os.path.exists(source):
        try:
            shutil.copy2(source, dest)
            print(f"[v0] Successfully copied {file_name} to root")
        except Exception as e:
            print(f"[v0] Error copying {file_name}: {e}")

print("[v0] Directory reorganization completed!")
