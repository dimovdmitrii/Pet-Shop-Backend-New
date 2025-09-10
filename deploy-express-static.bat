@echo off
echo Deploying Express static files with simplified Vercel config...
git add index.js vercel.json
git commit -m "Add Express static routes and simplify Vercel config"
git push
echo Deployment completed!
pause
