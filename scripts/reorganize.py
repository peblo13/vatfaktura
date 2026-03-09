import os
import shutil
from pathlib import Path

# Define source and destination
source = Path("/vercel/share/v0-project/vatfaktura")
dest = Path("/vercel/share/v0-project")

# List of directories and files to move
items_to_move = [
    "app",
    "components", 
    "hooks",
    "lib",
    "public",
    "styles",
    "README.md",
    "API.md"
]

print("[v0] Starting file reorganization...")

for item in items_to_move:
    src_path = source / item
    dst_path = dest / item
    
    if src_path.exists():
        if dst_path.exists():
            print(f"[v0] Removing existing {item} at destination")
            if dst_path.is_dir():
                shutil.rmtree(dst_path)
            else:
                os.remove(dst_path)
        
        print(f"[v0] Moving {item} from vatfaktura/ to root/")
        shutil.move(str(src_path), str(dst_path))
        print(f"[v0] Successfully moved {item}")
    else:
        print(f"[v0] {item} not found in vatfaktura, skipping")

# List remaining files in vatfaktura
remaining = list(source.iterdir())
if remaining:
    print(f"[v0] Remaining items in vatfaktura: {[item.name for item in remaining]}")
else:
    print("[v0] vatfaktura directory is now empty")

print("[v0] Reorganization complete!")
