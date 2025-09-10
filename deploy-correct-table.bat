@echo off
chcp 65001
echo Fixing API to use correct Products table with proper column names...
git add .
git commit -m "Fix API to use Products table with correct column names (title, discont_price, categoryId)"
git push
echo Deployment completed!
pause
