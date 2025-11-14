# 💰 Harcama Takipçisi - Modern PWA Uygulaması

Modern ve kullanıcı dostu bir harcama takip uygulaması. Progressive Web App (PWA) olarak geliştirildi, mobil cihazlarda native uygulama gibi çalışır.

## ✨ Özellikler

### 📊 Ana Özellikler
- ✅ **Hızlı Harcama/Gelir Ekleme** - Kategori, tutar, tarih ve açıklama ile
- 📈 **Anlık İstatistikler** - Bu ay gelir, harcama ve bakiye bilgileri
- 🏷️ **Kategori Yönetimi** - 14 önceden tanımlı kategori (harcama ve gelir)
- 📱 **Modern UI/UX** - Mobil öncelikli, responsive tasarım
- 💾 **Yerel Veri Saklama** - LocalStorage ile güvenli veri saklama

### 🛠️ Teknik Özellikler
- ⚡ **PWA Teknolojisi** - Offline çalışma, ana ekrana ekleme
- 🔄 **Senkronizasyon** - Veriler cihazda yerel olarak saklanır
- 📤 **Veri Yedekleme** - JSON formatında dışa/içe aktarma
- 🎨 **Modern Tasarım** - Inter font, gradient renkler, animasyonlar
- 🔧 **Vanilla JavaScript** - Framework bağımlılığı yok

### 📱 Cihaz Desteği
- ✅ **Tüm modern tarayıcılar** (Chrome, Firefox, Safari, Edge)
- ✅ **Mobil cihazlar** (iOS, Android)
- ✅ **Desktop/Laptop** bilgisayarlar
- ✅ **Tablet** cihazlar

## 🚀 Kullanım

### Web Üzerinden Erişim
1. Uygulamayı bir web sunucusuna yükleyin
2. Tarayıcıda açın: `https://your-domain.com`
3. "Ana Ekrana Ekle" seçeneğini kullanın (mobil)

### Local Çalıştırma
```bash
# Proje klasöründe
python3 -m http.server 8080

# Tarayıcıda açın
open http://localhost:8080
```

### Özellikler Kullanımı

#### 💰 Harcama/Gelir Ekleme
1. Ana ekranda **+** butonuna tıklayın
2. İşlem türünü seçin (Harcama/Gelir)
3. Tutarı ve kategoriyi belirleyin
4. Tarih ve açıklama ekleyin
5. "Ekle" butonuna basın

#### 📊 İstatistikler Görüntüleme
- Ana ekranda gerçek zamanlı bakiye bilgisi
- Bu ay gelir/harcama karşılaştırması
- Toplam işlem ve kategori sayıları

#### 🏷️ Kategoriler
- 10 harcama kategorisi: Yemek, Ulaşım, Market, vb.
- 4 gelir kategorisi: Maaş, Bonus, Yatırım, vb.
- Her kategorinin kendi ikonu ve rengi

#### 📤 Veri Yönetimi
- **Dışa Aktar**: Tüm verileri JSON formatında indirin
- **İçe Aktar**: Önceden dışa aktarılmış verileri geri yükleyin
- **Sıfırla**: Tüm verileri temizleyin

## 🏗️ Teknik Detaylar

### Dosya Yapısı
```
expense-tracker-vanilla/
├── index.html              # Ana HTML dosyası
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── css/
│   └── styles.css          # Tüm stil tanımları
├── js/
│   └── app.js              # Ana uygulama mantığı
└── assets/
    ├── icon-192.png        # PWA ikonları
    └── icon-512.png
```

### Veri Yapısı
```javascript
// İşlem (Transaction)
{
  id: number,
  type: 'expense' | 'income',
  amount: number,
  categoryId: number,
  date: 'YYYY-MM-DD',
  description: string,
  createdAt: string
}

// Kategori (Category)
{
  id: number,
  name: string,
  icon: string,
  color: string,
  type: 'expense' | 'income'
}
```

### PWA Özellikleri
- **Offline Çalışma**: Service Worker ile
- **Ana Ekrana Ekleme**: Manifest.json ile
- **Responsive**: Tüm cihaz boyutlarında optimize
- **Performance**: Hızlı yükleme ve çalışma

## 🎯 Gelecek Özellikler

### Planlanan Geliştirmeler
- 📈 **Detaylı Grafikler** - Recharts ile gelişmiş istatistikler
- 🎨 **Tema Seçenekleri** - Karanlık/aydınlık mod
- 🔔 **Bildirimler** - Bütçe uyarıları
- 💳 **Çoklu Hesap** - Farklı cüzdan/hesap desteği
- 📷 **OCR Entegrasyonu** - Fiş fotoğrafı okuma
- 🌐 **Bulut Senkronizasyonu** - Firebase entegrasyonu

## 🔧 Geliştiriciler İçin

### Değişiklik Yapma
1. Kaynak kodları düzenleyin
2. Tarayıcıda cache'i temizleyin (Ctrl+Shift+R)
3. Değişiklikleri test edin

### Yeni Kategori Ekleme
```javascript
// js/app.js içinde categories array'ine ekleyin
{
  id: 15,
  name: 'Yeni Kategori',
  icon: '🆕',
  color: '#FF0000',
  type: 'expense' // veya 'income'
}
```

### Stil Özelleştirme
```css
/* css/styles.css içinde */
/* Ana renk değişkenini değiştirin */
--primary-color: #6C63FF;  /* Varsayılan mavi */
```

## 📱 Mobil Kullanım İpuçları

### Ana Ekrana Ekleme
1. Safari'de paylaş butonu → "Ana Ekrana Ekle"
2. Chrome'da menü → "Ana Ekrana Ekle" 
3. Uygulama ikonu ana ekranda görünecek

### Offline Kullanım
- İlk ziyarette veriler önbelleğe alınır
- Internet bağlantısı olmadan da çalışır
- Veriler localStorage'da güvenle saklanır

## 🔒 Gizlilik & Güvenlik

- **Veriler cihazda kalır** - Sunucuya gönderilmez
- **LocalStorage kullanımı** - Güvenli yerel saklama
- **PWA teknolojisi** - İzin gerekmez
- **Açık kaynak** - Tüm kod erişilebilir

## 📞 Destek & İletişim

Sorularınız veya önerileriniz için:
- GitHub Issues
- E-posta: support@expensetracker.com
- Geliştirici: MiniMax Agent

---

**MiniMax Agent** tarafından 💙 ile geliştirildi