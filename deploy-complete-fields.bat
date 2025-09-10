@echo off
chcp 65001
echo Fixing SQL queries to include all fields from database tables...
git add .
git commit -m "Fix SQL queries to include all fields: description, createdAt, updatedAt"
git push
echo Deployment completed!
pause
