@echo off
chcp 65001
echo.
echo 🚀 Harcama Takipçisi Web Sunucusu Baslatiliyor...
echo.
echo 📍 Port: 8080
echo 🌐 Adres: http://localhost:8080
echo 🧪 Test Sayfasi: http://localhost:8080/test-simple.html
echo.
echo ✅ Baslatildi! Tarayicinizda yukaridaki adresi acin
echo ⏹️  Durdurmak icin bu pencereyi kapatin
echo.
echo Web sunucusu calisiyor...
python -m http.server 8080
echo.
echo Web sunucusu durduruldu.
pause