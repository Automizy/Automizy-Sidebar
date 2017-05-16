@echo off
set /p moduleName1="Module name like Automizy-Email-Editor: "
set /p moduleName2="Module name like AutomizyEmailEditor: "
set /p moduleName3="Module name like automizy-email-editor: "
set /p moduleNameshort="Module name in short like aee: "
set /p moduleVariable="Module showrt variable like $AEE: "
set /p moduleDescription="Module description: "

set isConfirm=y
set /p isConfirm=Please confirm the new module informations [y/n] (default - y)?:

IF NOT "%isConfirm%"=="y" GOTO EXIT0

set fromDir=%cd%\
set target=%cd%\..\generatedModules\%moduleName1%

mkdir %target%
xxcopy /Y /S /Q "%fromDir%" "%target%"
rmdir /S /Q %target%\node_modules
rmdir /S /Q %target%\.bower
rmdir /S /Q %target%\.idea
rmdir /S /Q %target%\src\vendor


fart.exe -r -c -- %target%\src\* Sidebar created by Automizy "%moduleDescription%"
fart.exe -r -c -- %target%\src\* Automizy-Sidebar %moduleName1%
fart.exe -r -c -- %target%\src\* AutomizySidebar %moduleName2%
fart.exe -r -c -- %target%\src\* automizy-sidebar %moduleName3%
fart.exe -r -c -- %target%\src\* as %moduleNameshort%
fart.exe -r -c -- %target%\src\* $AS %moduleVariable%

fart.exe -c -- %target%\* Sidebar created by Automizy "%moduleDescription%"
fart.exe -c -- %target%\* Automizy-Sidebar %moduleName1%
fart.exe -c -- %target%\* AutomizySidebar %moduleName2%
fart.exe -c -- %target%\* automizy-sidebar %moduleName3%
fart.exe -c -- %target%\* as %moduleNameshort%
fart.exe -c -- %target%\* $AS %moduleVariable%

ren %target%\src\as.html %moduleNameshort%.html
ren %target%\src\as.js %moduleNameshort%.js
ren %target%\src\as.css %moduleNameshort%.css

cd %~dp0\%target%
call npmBowerGrunt.bat

echo New module created!
pause;

:EXIT0