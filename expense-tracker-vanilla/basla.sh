#!/bin/bash

echo
echo "🚀 Harcama Takipçisi Web Sunucusu Başlatılıyor..."
echo
echo "📍 Port: 8080"
echo "🌐 Adres: http://localhost:8080"
echo "🧪 Test Sayfası: http://localhost:8080/test-simple.html"
echo
echo "✅ Başlatıldı! Tarayıcınızda yukarıdaki adresi açın"
echo "⏹️  Durdurmak için Ctrl+C tuşlayın"
echo

# Web sunucusunu başlat
echo "Web sunucusu çalışıyor..."
python3 -m http.server 8080

echo
echo "Web sunucusu durduruldu."