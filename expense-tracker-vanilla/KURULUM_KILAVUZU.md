# 🚀 Harcama Takipçisi - Kendi Bilgisayarınızda Çalıştırma

## 📋 Gereksinimler
- Bilgisayarınızda Python 3 yüklü olmalı
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)

## 🔧 Adım Adım Kurulum

### 1. Dosyaları İndirin
Bu klasördeki tüm dosyaları bilgisayarınızda bir klasöre kopyalayın:
- `expense-tracker-vanilla/` klasörünün tamamını indirin

### 2. Web Sunucusu Başlatın

#### Windows için:
1. Komut İstemi'ni (CMD) açın
2. Klasöre gidin: `cd C:\yol\expense-tracker-vanilla`
3. Sunucuyu başlatın: `python -m http.server 8080`

#### Mac/Linux için:
1. Terminal'i açın
2. Klasöre gidin: `cd /yol/expense-tracker-vanilla`
3. Sunucuyu başlatın: `python3 -m http.server 8080`

### 3. Tarayıcıda Açın
1. Web tarayıcınızı açın
2. Adres çubuğuna yazın: `http://localhost:8080`
3. Enter tuşuna basın

## ✅ Test İçin
Test sayfası için: `http://localhost:8080/test-simple.html`

## 🆘 Sorun Giderme

### Python bulunamıyor hatası:
- Python'u https://python.org adresinden indirin
- Kurulum sırasında "Add to PATH" seçeneğini işaretleyin

### Port 8080 kullanımda hatası:
- Farklı bir port kullanın: `python -m http.server 3000`
- Tarayıcıda: `http://localhost:3000`

### Sayfa yüklenmiyor:
- Güvenlik duvarı ayarlarını kontrol edin
- Antivirus yazılımını geçici olarak kapatın

## 📱 Mobil Kullanım
- Aynı WiFi ağına bağlı mobil cihazınızdan: `http://[bilgisayar-ip]:8080`
- Bilgisayar IP adresinizi öğrenmek için: `ipconfig` (Windows) veya `ifconfig` (Mac/Linux)

## 🎉 Başarılı!
Artık uygulamanız çalışıyor! Ana ekranda + butonuna tıklayarak harcama eklemeye başlayabilirsiniz.

---
**MiniMax Agent** tarafından hazırlanmıştır