#!/bin/bash

# Move all app files from vatfaktura/ to root
echo "Moving app directory..."
mv /vercel/share/v0-project/vatfaktura/app /vercel/share/v0-project/app

echo "Moving components directory..."
mv /vercel/share/v0-project/vatfaktura/components /vercel/share/v0-project/components

echo "Moving hooks directory..."
mv /vercel/share/v0-project/vatfaktura/hooks /vercel/share/v0-project/hooks

echo "Moving lib directory..."
mv /vercel/share/v0-project/vatfaktura/lib /vercel/share/v0-project/lib

echo "Moving styles directory..."
mv /vercel/share/v0-project/vatfaktura/styles /vercel/share/v0-project/styles

echo "Moving documentation files..."
mv /vercel/share/v0-project/vatfaktura/README.md /vercel/share/v0-project/README.md 2>/dev/null || true
mv /vercel/share/v0-project/vatfaktura/API.md /vercel/share/v0-project/API.md 2>/dev/null || true

echo "Removing empty vatfaktura directory..."
rmdir /vercel/share/v0-project/vatfaktura 2>/dev/null || rm -rf /vercel/share/v0-project/vatfaktura

echo "Project structure reorganization complete!"
