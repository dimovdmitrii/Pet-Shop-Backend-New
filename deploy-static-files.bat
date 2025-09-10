@echo off
chcp 65001
echo Deploying with static file routes for images...
git add .
git commit -m "Add static file routes for product_img and category_img"
git push
echo Deployment completed!
pause
