@echo off
echo Deploying Express static files fix...
git add index.js vercel.json
git commit -m "Add Express static file serving for images"
git push
echo Deployment completed!
pause
