# <div align="center">
  <img src="public/favicon.png" alt="CepFinans Logo" width="120" height="120">
</div>

<h1 align="center">CepFinans</h1>
<p align="center">
  <strong>Modern Kişisel Muhasebe Uygulaması</strong>
</p>

<p align="center">
  <a href="https://github.com/ahwetekm/CepFinans/stargazers">
    <img src="https://img.shields.io/github/stars/ahwetekm/CepFinans?style=for-the-badge&color=10b981" alt="Stars">
  </a>
  <a href="https://github.com/ahwetekm/CepFinans/network/members">
    <img src="https://img.shields.io/github/forks/ahwetekm/CepFinans?style=for-the-badge&color=3b82f6" alt="Forks">
  </a>
  <a href="https://github.com/ahwetekm/CepFinans/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ahwetekm/CepFinans?style=for-the-badge&color=8b5cf6" alt="License">
  </a>
  <a href="https://github.com/ahwetekm/CepFinans/issues">
    <img src="https://img.shields.io/github/issues/ahwetekm/CepFinans?style=for-the-badge&color=ef4444" alt="Issues">
  </a>
</p>

<p align="center">
  <em>Finansal geleceğinizi bugün yönetmeye başlayın!</em>
</p>

## 📖 Hakkında

CepFinans, kişisel finans yönetimini basitleştiren modern ve kullanıcı dostu bir web uygulamasıdır. Karmaşık arayüzlerden sıkılan kullanıcılar için tasarlanan CepFinans, tüm finansal işlemlerinizi tek bir yerden yönetmenizi sağlar.

### 🎯 Misyonumuz

Kişisel finans yönetimini herkes için erişilebilir, anlaşılır ve keyifli hale getirmek. Karmaşık sayılar ve tablolar yerine, sade ve直观 bir arayüz sunarak finansal farkındalığı artırmak.

## ✨ Özellikler

### 💰 **Akıllı Bakiye Takibi**
- 3 farklı hesap türü (Nakit, Banka, Birikim)
- Anlık bakiye görüntüleme
- Detaylı işlem geçmişi

### 🔄 **Otomatik İşlemler**
- Düzenli gelir/gider otomasyonu
- Maaş, kira, kredi gibi tekrarlayan işlemler
- Otomatik hatırlatıcılar

### ⚡ **Anında Transfer**
- Hesaplar arasında hızlı para transferi
- Anında işlem onayı
- Transfer geçmişi takibi

### 📊 **Detaylı Raporlar**
- Gelir-gider analizi
- Kategori bazlı harcama raporları
- Aylık/yıllık finansal özetler
- Pasta, çubuk ve çizgi grafikler
- Hesap dağılım görselleştirmeleri

### 🎨 **Modern Tasarım**
- Minimalist ve kullanıcı dostu arayüz
- Açık ve koyu tema desteği
- Responsive tasarım (Masaüstü, Tablet, Mobil)
- Yumuşak animasyonlar ve geçişler

### 🔒 **Güvenlik**
- %100 yerel veri saklama
- Kişisel bilgilerin güvende kalması
- Hiçbir üçüncü parti veri paylaşımı

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/ahwetekm/CepFinans.git
cd CepFinans
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Adım 4: Production için Build

```bash
npm run build
npm start
```

## 📱 Ekran Görüntüleri

### Desktop Görünüm
<div align="center">
  <img src="public/desktop.png" alt="Desktop Dashboard" width="800">
</div>

### Mobil Görünüm
<div align="center">
  <img src="public/mobile.png" alt="Mobile App" width="300">
</div>

## 📊 Grafik ve İstatistik Özellikleri

CepFinans, finansal verilerinizi görselleştirmek için zengin grafik seçenekleri sunar:

### 🥧 Hesap Dağılımı (Pasta Grafiği)
- Nakit, banka ve birikim hesaplarınızın dağılımını gösterir
- Yüzde oranları ile hangi hesapta ne kadar paranız olduğunu anında görün
- Renk kodlu görselleştirme ile kolay okunabilirlik

### 📊 Gelir/Gider Karşılaştırması (Çubuk Grafiği)
- Toplam gelir ve giderlerinizi yan yana karşılaştırın
- Finansal dengenizi tek bakışta görün
- Anlaşılır renk kodlaması (yeşil: gelir, kırmızı: gider)

### 📈 Aylık Harcama Trendi (Çizgi Grafiği)
- Son 6 aylık gelir, gider ve net tutar trendlerini izleyin
- Finansal alışkanlıklarınızın zaman içindeki değişimini görün
- Gelecek için daha iyi bütçe planlaması yapın

### 🎯 Grafik Özellikleri
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **İnteraktif Tooltip**: Grafikler üzerinde detaylı bilgi
- **Modern Animasyonlar**: Smooth geçişler ve hover efektleri
- **Koyu/Açık Tema Uyumu**: Tüm temalarda okunabilirlik
- **Gerçek Zamanlı Veri**: İşlemleriniz anında grafiklere yansır

## 🛠️ Teknoloji Stack

| Teknoloji | Açıklama |
|-----------|----------|
| **Next.js 15** | React framework for production |
| **TypeScript 5** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui** | Modern UI component library |
| **Lucide React** | Beautiful icon library |
| **Next Themes** | Dark/light mode support |
| **Framer Motion** | Smooth animations |

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── theme-provider.tsx # Theme context
│   └── theme-toggle.tsx   # Theme switcher
└── lib/                  # Utilities and helpers
```

## 🎨 Tasarım Prensipleri

### Minimalist Yaklaşım
- Az ama öz içerik
- Göz yormayan renk paleti
- Temiz ve düzenli arayüz

### Kullanıcı Odaklılık
- Tek tıkla işlem yapabilme
- Anlaşılır navigasyon
- Hızlı performans

### Erişilebilirlik
- Klavye navigasyonu desteği
- Ekran okuyucu uyumluluğu
- Yüksek kontrast oranları

## 🔧 Özelleştirme

### Tema Renklerini Değiştirme

`src/app/globals.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  --primary: oklch(0.205 0 0); /* Ana renk */
  --background: oklch(1 0 0); /* Arka plan */
  /* ... */
}
```

### Yeni Özellik Ekleme

1. Yeni component oluşturun: `src/components/`
2. Sayfaya ekleyin: `src/app/page.tsx`
3. Stilleri düzenleyin: `src/app/globals.css`

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen aşağıdaki adımları izleyin:

1. Fork yapın
2. Feature branch oluşturun: `git checkout -b feature/amazing-feature`
3. Değişikliklerinizi commit edin: `git commit -m 'Add amazing feature'`
4. Branch'e push edin: `git push origin feature/amazing-feature`
5. Pull Request oluşturun

### Katkı Kuralları

- Kodunuzu Prettier ile formatlayın
- TypeScript kurallarına uyun
- Test yazın (mümkünse)
- Commit mesajlarını anlaşılır yazın

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Icon library

## 📞 İletişim

### 📧 İletişim Formu Özellikleri
- **Modern Arayüz**: Kullanıcı dostu ve responsive tasarım
- **Kategori Bazlı**: Öneri, Şikayet, Hata Bildirimi, Özellik Talebi
- **Otomatik Entegrasyon**: Mailto linki ile doğrudan mail gönderimi
- **Form Doğrulama**: Zorunlu alanlar ve geçerlilik kontrolleri
- **Durum Bildirimleri**: Başarı ve hata mesajları
- **Güvenli**: Sunucu taraflı veri saklama yok

### 📞 Formspree Entegrasyonu
- **Ücretsiz Servis**: Formspree ile 50 form/ay, 1000 gönderim/ay
- **Güvenli Gönderim**: HTTPS ile şifrelenmiş veri transferi
- **Otomatik Yanıtlar**: Formspree dashboard üzerinden yanıt yönetimi
- **Spam Filtreleme**: Built-in spam koruması
- **Dosya Yükleme**: Drag & drop, 5MB limiti, çoklu format desteği
- **Dosya Önizlemi**: Yüklenen dosyanın adını gösterme ve silme
- **Güvenli Yükleme**: Formspree üzerinden güvenli şifreleme

### Dosya Yükleme Ekran Görüntüsü
<div align="center">
  <img src="public/file-upload-final.png" alt="File Upload Final Preview" width="800">
</div>

### Formspree Formu Ekran Görüntüsü
<div align="center">
  <img src="public/formspree-integration.png" alt="Formspree Integration" width="800">
</div>

### 📞 İletişim Kanalları
- **İletişim Formu**: Site üzerinden doğrudan mesaj gönderin
- **E-posta**: [ahwetze@proton.me](mailto:ahwetze@proton.me)
- **Proje Linki**: [https://github.com/ahwetekm/CepFinans](https://github.com/ahwetekm/CepFinans)
- **Issues**: [https://github.com/ahwetekm/CepFinans/issues](https://github.com/ahwetekm/CepFinans/issues)
- **Discussions**: [https://github.com/ahwetekm/CepFinans/discussions](https://github.com/ahwetekm/CepFinans/discussions)

### İletişim Formu Ekran Görüntüsü
<div align="center">
  <img src="public/contact-form-preview.png" alt="Contact Form Preview" width="800">
</div>

---

<div align="center">
  <p>
    <strong>⭐ Eğer projeyi beğendiyseniz, lütfen yıldız vermeyi unutmayın!</strong>
  </p>
  <p>
    Made with ❤️ by <a href="https://github.com/ahwetekm">ahwetekm</a>
  </p>
</div>
# Updated git configuration
