Write-Host "🔍 Validando projeto antes do deploy..." -ForegroundColor Yellow

# 1. Testes
Write-Host "`n📋 Rodando testes..." -ForegroundColor Cyan
npm run test -- --run
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes falharam! Corrija antes de fazer push." -ForegroundColor Red
    exit 1
}

# 2. Lint
Write-Host "`n🔎 Verificando lint..." -ForegroundColor Cyan
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Lint falhou! Corrija antes de fazer push." -ForegroundColor Red
    exit 1
}

# 3. Build
Write-Host "`n🔨 Fazendo build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou! Corrija antes de fazer push." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ TUDO VALIDADO - pode fazer push!" -ForegroundColor Green
