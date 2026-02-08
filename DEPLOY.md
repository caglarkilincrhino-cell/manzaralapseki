# Lapseki Sunumu - Deploy Rehberi

Bu klasör, sunumunuzu web'de yayınlamak için hazır hale getirilmiştir.

## 🚀 Hızlı Deploy Seçenekleri

### Seçenek 1: Netlify Drop (ÖNERİLEN - En Kolay)

**Adımlar:**
1. [Netlify Drop](https://app.netlify.com/drop) sayfasına gidin
2. Bu `lapseki-sunum-deploy` klasörünü tarayıcıya sürükleyip bırakın
3. Birkaç saniye içinde siteniz yayında olacak!
4. Size verilen linki paylaşabilirsiniz (örn: `https://lapseki-sunum-abc123.netlify.app`)

**Avantajlar:**
- ✅ Ücretsiz
- ✅ Hesap oluşturmaya gerek yok
- ✅ 30 saniyede hazır
- ✅ HTTPS sertifikası dahil
- ✅ Özel alan adı bağlanabilir

---

### Seçenek 2: Vercel

**Adımlar:**
1. [Vercel](https://vercel.com)'e gidin ve ücretsiz hesap oluşturun
2. "New Project" butonuna tıklayın
3. Bu klasörü yükleyin veya GitHub'a yükleyip oradan import edin
4. Deploy butonuna tıklayın
5. Siteniz otomatik olarak yayınlanacak

**Avantajlar:**
- ✅ Ücretsiz
- ✅ Çok hızlı (global CDN)
- ✅ HTTPS sertifikası dahil
- ✅ Her güncelleme otomatik deploy olur

---

### Seçenek 3: GitHub Pages

**Adımlar:**
1. GitHub'da yeni bir repository oluşturun
2. Bu klasörün içeriğini repository'ye yükleyin
3. Settings > Pages > Branch: main seçin
4. Siteniz `https://[kullaniciadi].github.io/[repo-adi]` adresinde yayınlanacak

**Avantajlar:**
- ✅ Ücretsiz
- ✅ GitHub ile entegre
- ✅ Versiyon kontrolü

---

### Seçenek 4: Kendi Sunucunuz

**Adımlar:**
1. Tüm dosyaları sunucunuza FTP/SFTP ile yükleyin
2. Web server'ınızın public_html klasörüne koyun
3. `index.html` dosyasının doğru yerde olduğundan emin olun

**Gereksinimler:**
- Herhangi bir web server (Apache, Nginx, etc.)
- Sadece statik dosya sunumu yeterli
- PHP veya veritabanı gerektirmez

---

## 📱 Mobil Optimizasyon

Sunumunuz özellikle telefonda yatay modda görüntülenmek için optimize edilmiştir:

- **Kullanıcılarınıza şunu söyleyin:**
  1. Verdiğiniz linke girin
  2. Telefonu yatay (landscape) moda çevirin
  3. Tam ekran butonuna basın
  4. Sağa/sola kaydırarak gezinsinler

## 🔗 Link Kısaltma (İsteğe Bağlı)

Deploy sonrası uzun bir link alırsanız, şu servisleri kullanarak kısaltabilirsiniz:

- [Bitly](https://bitly.com) - Özelleştirilebilir kısa linkler
- [TinyURL](https://tinyurl.com) - Basit ve hızlı
- [Rebrandly](https://rebrandly.com) - Özel alan adı ile

Örnek: `https://bit.ly/lapseki-sunum`

## 📊 Dosya Boyutu

- **Toplam boyut**: ~70MB (PDF'den dönüştürülen görseller)
- **15 adet PNG görsel**: Her biri yaklaşık 4-5MB
- **HTML/CSS/JS**: < 50KB

## 🔄 Güncelleme

Sunumu güncellemek için:
1. `slides` klasöründeki görselleri değiştirin
2. Aynı deploy yöntemini tekrar kullanın
3. Netlify/Vercel otomatik olarak yeni versiyonu yayınlayacak

## 🌐 Tarayıcı Desteği

Tüm modern tarayıcılarda çalışır:
- ✅ Chrome/Edge
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Samsung Internet

---

**Önemli Not**: Görseller yüksek kalitede olduğu için ilk yüklemede biraz bekleyebilir. Ancak bir kere yüklendikten sonra tarayıcı cache'ler ve hızlı çalışır.
