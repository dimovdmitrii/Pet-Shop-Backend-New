@echo off
echo Deploying final image fix with proper headers...
git add vercel.json
git commit -m "Fix image serving with proper Content-Type headers"
git push
echo Deployment completed!
pause
