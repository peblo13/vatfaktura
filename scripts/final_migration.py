import shutil
import os
from pathlib import Path

source_dir = Path('/vercel/share/v0-project/vatfaktura')
dest_dir = Path('/vercel/share/v0-project')

if source_dir.exists():
    # Copy all items from vatfaktura to root
    for item in source_dir.iterdir():
        src_path = source_dir / item.name
        dst_path = dest_dir / item.name
        
        # Skip if destination already exists
        if dst_path.exists():
            if dst_path.is_dir():
                print(f"Removing existing directory: {dst_path}")
                shutil.rmtree(dst_path)
            else:
                print(f"Removing existing file: {dst_path}")
                dst_path.unlink()
        
        if src_path.is_dir():
            print(f"Copying directory: {item.name}")
            shutil.copytree(src_path, dst_path)
        else:
            print(f"Copying file: {item.name}")
            shutil.copy2(src_path, dst_path)
    
    # Remove the vatfaktura directory
    print(f"Removing vatfaktura directory")
    shutil.rmtree(source_dir)
    print("Migration complete!")
else:
    print(f"Source directory not found: {source_dir}")
