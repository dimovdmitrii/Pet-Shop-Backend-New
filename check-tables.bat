@echo off
chcp 65001
echo Checking table structure in Neon PostgreSQL...
set DATABASE_URL=postgresql://neondb_owner:npg_3RZjcmbxoyL0@ep-snowy-field-ag3r1okt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
node check-tables.js
pause
