import shutil
import os

# Copy all content from vatfaktura to root
vatfaktura_path = '/vercel/share/v0-project/vatfaktura'
root_path = '/vercel/share/v0-project'

# Get list of all items in vatfaktura
for item in os.listdir(vatfaktura_path):
    src = os.path.join(vatfaktura_path, item)
    dst = os.path.join(root_path, item)
    
    # Skip if already exists at root
    if os.path.exists(dst):
        if os.path.isdir(dst):
            shutil.rmtree(dst)
        else:
            os.remove(dst)
    
    # Copy directory or file
    if os.path.isdir(src):
        shutil.copytree(src, dst)
        print(f"[v0] Copied directory: {item}")
    else:
        shutil.copy2(src, dst)
        print(f"[v0] Copied file: {item}")

print("[v0] All files and directories copied to root!")
