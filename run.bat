@echo off

start cmd /k "cd ControleDeGastos.API\ControleDeGastos.API && dotnet run --launch-profile https"

cd controle_gastos

if not exist node_modules (
    call npm install
)

start cmd /k "npm run dev"

start http://localhost:5173

exit