import shutil
import os

source = "/vercel/share/v0-project/vatfaktura"
dest_root = "/vercel/share/v0-project"

# List of directories and files to move
items = ["app", "components", "hooks", "lib", "public", "styles", "README.md", "API.md"]

try:
    for item in items:
        src_path = os.path.join(source, item)
        dst_path = os.path.join(dest_root, item)
        
        if os.path.exists(src_path):
            # If destination exists, remove it first
            if os.path.exists(dst_path):
                if os.path.isdir(dst_path):
                    shutil.rmtree(dst_path)
                else:
                    os.remove(dst_path)
            
            # Move the item
            if os.path.isdir(src_path):
                shutil.copytree(src_path, dst_path)
                shutil.rmtree(src_path)
            else:
                shutil.copy2(src_path, dst_path)
                os.remove(src_path)
            print(f"Moved {item}")
        else:
            print(f"Skipped {item} - not found")
    
    # Remove the now-empty vatfaktura directory
    if os.path.exists(source) and not os.listdir(source):
        shutil.rmtree(source)
        print("Removed empty vatfaktura directory")
    elif os.path.exists(source):
        print(f"vatfaktura still has contents: {os.listdir(source)}")
    
    print("Migration completed successfully!")
    
except Exception as e:
    print(f"Error during migration: {e}")
