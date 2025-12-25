// --- STATE YÖNETİMİ ---

// 1. Sayfa yüklendiğinde LocalStorage'dan verileri çek
let favoriler = JSON.parse(localStorage.getItem('favoriSehirler')) || [];

function favorileriGuncelle() {
    const listeDiv = document.getElementById('favList');
    listeDiv.innerHTML = '';
    
    favoriler.forEach((sehir, index) => {
        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            <span onclick="haritayaGit(${sehir.lat}, ${sehir.lng})">${sehir.ad}</span>
            <button onclick="favoriSil(${index})" style="border:none; background:none; color:red; cursor:pointer">×</button>
        `;
        listeDiv.appendChild(item);
    });

    // Durumu tarayıcıya kaydet (State Persistence)
    localStorage.setItem('favoriSehirler', JSON.stringify(favoriler));
}

function favoriEkle(ad, lat, lng) {
    if(!ad) ad = "Yeni Konum";
    favoriler.push({ ad, lat, lng });
    favorileriGuncelle();
    map.closePopup();
}

function favoriSil(index) {
    favoriler.splice(index, 1);
    favorileriGuncelle();
}

function haritayaGit(lat, lng) {
    map.flyTo([lat, lng], 13);
}

// Sağ tık menüsüne "Favorilere Ekle" butonu entegrasyonu
map.on('contextmenu', function(e) {
    var yeniMarker = L.marker(e.latlng).addTo(map);
    var icerik = document.createElement('div');
    
    icerik.innerHTML = `
        <input type="text" id="sehirAd" placeholder="Şehir adı..." style="width:100%; margin-bottom:5px;"><br>
        <button class="add-fav-btn" onclick="favoriEkle(document.getElementById('sehirAd').value, ${e.latlng.lat}, ${e.latlng.lng})">⭐ Favorilere Ekle</button>
    `;
    
    yeniMarker.bindPopup(icerik).openPopup();
});

// Başlangıçta listeyi doldur
favorileriGuncelle();
