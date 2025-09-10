@echo off
chcp 65001
echo Setting DATABASE_URL and running migration...
set DATABASE_URL=postgresql://neondb_owner:npg_3RZjcmbxoyL0@ep-snowy-field-ag3r1okt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
node create-tables-neon.js
pause
