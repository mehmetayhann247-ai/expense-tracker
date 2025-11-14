@echo off
chcp 65001
echo.
echo 🚀 Harcama Takipçisi - Hızlı Başlatma
echo.
echo 1️⃣ Tarayıcıda doğrudan aç (sınırlı özellikler)
echo 2️⃣ Basit HTTP sunucusu başlat
echo 3️⃣ Python kurulum kontrol
echo.
set /p choice="Seçiminiz (1-3): "

if "%choice%"=="1" goto direct_open
if "%choice%"=="2" goto start_server
if "%choice%"=="3" goto check_python
goto end

:direct_open
echo.
echo 📂 index.html dosyasını tarayıcıda açıyorum...
start index.html
echo.
echo ✅ Açıldı! Bazı özellikler sınırlı olabilir.
echo 💡 Tam özellikler için Python kurup web sunucusu başlatın.
pause
goto end

:start_server
echo.
echo 🌐 Web sunucusu başlatılıyor...
echo.
python -m http.server 8080 2>nul
if errorlevel 1 (
    echo ❌ Python bulunamadı!
    echo.
    echo 🛠️ ÇÖZÜMLER:
    echo 1. Python kurun: https://python.org
    echo 2. "Add to PATH" seçeneğini işaretleyin
    echo 3. Kurulumdan sonra tekrar deneyin
    echo.
    echo 📂 Alternatif: index.html dosyasına çift tıklayın
    pause
    goto end
) else (
    echo.
    echo ✅ Web sunucusu başlatıldı!
    echo 🌐 Tarayıcınızda http://localhost:8080 adresini açın
    echo ⏹️  Durdurmak için Ctrl+C tuşlayın
    python -m http.server 8080
)
goto end

:check_python
echo.
python --version 2>nul
if errorlevel 1 (
    echo.
    echo ❌ Python kurulu değil!
    echo.
    echo 🔗 Python kurmak için:
    echo 1. https://python.org adresine gidin
    echo 2. "Download Python" butonuna tıklayın
    echo 3. Kurulum sırasında "Add to PATH" kutusunu işaretleyin
    echo 4. Kurulumdan sonra tekrar deneyin
    echo.
) else (
    echo.
    echo ✅ Python kurulu!
    echo 🌐 Web sunucusu başlatılıyor...
    python -m http.server 8080
)
pause
goto end

:end
echo.
echo 👋 Görüşürüz!