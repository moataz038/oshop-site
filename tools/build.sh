set -e
cd /home/user/workspace
rm -rf oshop-site/.vercel/output && cp -r oshop-site-orig/.vercel/output oshop-site/.vercel/output
python3 oshop/rebrand.py >/dev/null
python3 -c "from PIL import Image; Image.open('/home/user/workspace/oshop/brand/oshop-3d.png').save('/home/user/workspace/oshop-site/.vercel/output/static/img/chrome.webp','WEBP',quality=90)"
python3 oshop/focus.py
python3 oshop/enhance.py
[ -f oshop/brand/agent-female.webp ] && cp oshop/brand/agent-female.webp oshop/brand/agent-male.webp oshop-site/.vercel/output/static/img/ || true
cd oshop-site/.vercel/output && node --check functions/api.func/index.cjs && node --input-type=module --check < static/assets/index-6ttDirym.js && echo BUILD-OK
