import shutil
import os

source = "/vercel/share/v0-project/vatfaktura"
dest = "/vercel/share/v0-project"

# Copy all files and directories from vatfaktura to root
if os.path.exists(source):
    for item in os.listdir(source):
        src_path = os.path.join(source, item)
        dest_path = os.path.join(dest, item)
        
        # Skip if destination already exists
        if os.path.exists(dest_path):
            print(f"Skipping {item} - already exists at root")
            continue
        
        try:
            if os.path.isdir(src_path):
                shutil.copytree(src_path, dest_path)
                print(f"Copied directory: {item}")
            else:
                shutil.copy2(src_path, dest_path)
                print(f"Copied file: {item}")
        except Exception as e:
            print(f"Error copying {item}: {e}")
    
    # Remove vatfaktura directory
    try:
        shutil.rmtree(source)
        print("Removed vatfaktura directory")
    except Exception as e:
        print(f"Error removing vatfaktura: {e}")
else:
    print(f"Source {source} does not exist")
