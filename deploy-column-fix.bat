@echo off
chcp 65001
echo Fixing column names in SQL queries...
git add .
git commit -m "Fix SQL queries to use correct column names from database"
git push
echo Deployment completed!
pause
