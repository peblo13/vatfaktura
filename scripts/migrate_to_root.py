import shutil
import os
from pathlib import Path

source = Path('/vercel/share/v0-project/vatfaktura')
dest = Path('/vercel/share/v0-project')

if source.exists():
    # Copy all contents from vatfaktura to root
    for item in source.iterdir():
        src_path = source / item.name
        dst_path = dest / item.name
        
        # Skip if destination exists
        if dst_path.exists():
            print(f"Skipping {item.name} - already exists at root")
            continue
        
        # Copy file or directory
        if src_path.is_dir():
            shutil.copytree(src_path, dst_path)
            print(f"Copied directory: {item.name}")
        else:
            shutil.copy2(src_path, dst_path)
            print(f"Copied file: {item.name}")
    
    # Remove the vatfaktura directory
    shutil.rmtree(source)
    print(f"\nRemoved {source} directory")
    print("Migration completed successfully!")
else:
    print(f"Source directory {source} does not exist")
