import os
import shutil
import sys

source_dir = "/vercel/share/v0-project/vatfaktura"
target_dir = "/vercel/share/v0-project"

if not os.path.exists(source_dir):
    print(f"Source directory does not exist: {source_dir}")
    sys.exit(1)

# List all items in vatfaktura
items = os.listdir(source_dir)
print(f"Found {len(items)} items to move from vatfaktura/")

# Move each item to the root, excluding any that already exist at root with same name
for item in items:
    src_path = os.path.join(source_dir, item)
    dst_path = os.path.join(target_dir, item)
    
    # Skip if destination exists
    if os.path.exists(dst_path):
        print(f"Skipping {item} (already exists at root)")
        continue
    
    try:
        if os.path.isdir(src_path):
            shutil.copytree(src_path, dst_path)
            print(f"Copied directory: {item}")
        else:
            shutil.copy2(src_path, dst_path)
            print(f"Copied file: {item}")
    except Exception as e:
        print(f"Error copying {item}: {e}")

# Now remove the vatfaktura directory
try:
    shutil.rmtree(source_dir)
    print("\nRemoved vatfaktura directory")
except Exception as e:
    print(f"Error removing vatfaktura: {e}")

print("\nMigration complete!")
print(f"Current root contents: {os.listdir(target_dir)[:20]}...")  # Show first 20 items
