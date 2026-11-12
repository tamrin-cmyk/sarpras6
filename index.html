import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlPyiIPG61p7kywbBI4ZbBAJtssdcmWbA",
    authDomain: "simantap-sarpas.firebaseapp.com",
    projectId: "simantap-sarpas",
    storageBucket: "simantap-sarpas.firebasestorage.app",
    messagingSenderId: "699021070714",
    appId: "1:699021070714:web:2fc1aba7776154f6c0c6c3",
    measurementId: "G-CG4Q5CJGRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let userRole = 'guest';

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        userRole = userDoc.exists() ? userDoc.data().role : 'user';
        
        document.getElementById('userRoleBadge').innerText = `${user.email} (Role: ${userRole.toUpperCase()})`;
        document.getElementById('menuUser').style.display = 'block';
        if(userRole === 'admin') document.getElementById('menuAdmin').style.display = 'block';

        document.getElementById('authText').innerText = "Logout";
        document.getElementById('authIcon').className = "fa-solid fa-sign-out-alt";
    } else {
        currentUser = null;
        userRole = 'guest';
        document.getElementById('userRoleBadge').innerText = "Mode Tamu (Silakan Login untuk meminjam)";
        document.getElementById('menuUser').style.display = 'none';
        document.getElementById('menuAdmin').style.display = 'none';

        document.getElementById('authText').innerText = "Masuk (Login)";
        document.getElementById('authIcon').className = "fa-solid fa-sign-in-alt";
    }
    loadKatalog();
});

document.getElementById('btnAuth').addEventListener('click', () => {
    if (currentUser) {
        signOut(auth).then(() => window.location.reload());
    } else {
        window.location.href = "login.html";
    }
});

window.showPage = function(pageId) {
    document.querySelectorAll('.page-view').forEach(el => el.style.display = 'none');
    document.getElementById('page-' + pageId).style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const titles = {
        'katalog': 'Katalog Peminjaman',
        'dashboard': 'Dashboard Overview',
        'inventaris': 'Data Inventaris Master',
        'ruangan': 'Data Ruangan & Lokasi',
        'transaksi': 'Sirkulasi & Transaksi',
        'laporan': 'Laporan & Analitik',
        'pengaturan': 'Pengaturan Profil'
    };
    document.getElementById('pageTitle').innerText = titles[pageId] || 'Halaman';

    if(pageId === 'inventaris' && userRole === 'admin') loadInventaris();
    if(pageId === 'katalog') loadKatalog();
    if(pageId === 'transaksi' && currentUser) loadTransaksi();
}

async function loadKatalog() {
    try {
        const q = query(collection(db, "inventory"), where("kondisi", "==", "Baik"));
        const querySnapshot = await getDocs(q);
        let html = '';
        
        if(querySnapshot.empty) {
            html = '<p style="color:var(--text-muted);">Belum ada barang yang tersedia saat ini.</p>';
        }

        querySnapshot.forEach((docSnap) => {
            let d = docSnap.data();
            html += `
                <div class="card-3d">
                    <div style="background:var(--soft-blue); height:120px; border-radius:10px; margin-bottom:15px; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-camera fa-3x" style="color:var(--primary);"></i>
                    </div>
                    <h4>${d.nama}</h4>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:15px;">Sisa Stok: ${d.stok}</p>
                    <button class="btn-3d" style="width:100%;" onclick="ajukanPinjam('${docSnap.id}', '${d.nama}')">Pinjam Barang</button>
                </div>
            `;
        });
        document.getElementById('gridKatalog').innerHTML = html;
    } catch (error) {
        console.error("Gagal memuat katalog:", error);
    }
}

window.ajukanPinjam = async function(idBarang, namaBarang) {
    if (!currentUser) {
        alert("Anda harus Login terlebih dahulu untuk meminjam barang!");
        window.location.href = "login.html";
        return;
    }

    if(confirm(`Ajukan peminjaman untuk ${namaBarang}?`)) {
        await addDoc(collection(db, "transactions"), {
            uid_peminjam: currentUser.uid,
            email_peminjam: currentUser.email,
            id_item: idBarang,
            nama_item: namaBarang,
            tgl_pengajuan: new Date().toISOString().split('T')[0],
            status: "pending"
        });
        alert('Pengajuan berhasil, menunggu persetujuan Admin.');
        showPage('transaksi');
    }
}

document.getElementById('formAset').addEventListener('submit', async (e) => {
    e.preventDefault();
    if(userRole !== 'admin') return alert('Akses ditolak!');
    
    await addDoc(collection(db, "inventory"), {
        sku: document.getElementById('sku').value,
        nama: document.getElementById('namaBrg').value,
        kondisi: document.getElementById('kondisiBrg').value,
        stok: parseInt(document.getElementById('stokBrg').value)
    });
    alert('Aset berhasil disimpan!');
    document.getElementById('modalTambah').style.display = 'none';
    document.getElementById('formAset').reset();
    loadInventaris();
});

async function loadInventaris() {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    let html = '';
    querySnapshot.forEach((docSnap) => {
        let d = docSnap.data();
        html += `
            <tr>
                <td><strong>${d.sku}</strong></td>
                <td>${d.nama}</td>
                <td><span class="badge ${d.kondisi == 'Baik' ? 'baik' : 'rusak'}">${d.kondisi}</span></td>
                <td>${d.stok}</td>
                <td><button class="btn-3d outline" onclick="cetakLabel('${d.sku}', '${d.nama}')" style="padding: 5px 10px; font-size:12px;">Cetak Label</button></td>
            </tr>
        `;
    });
    document.getElementById('tableInventaris').innerHTML = html;
}

window.cetakLabel = function(sku, nama) {
    const printDiv = document.getElementById('print-content');
    printDiv.innerHTML = `<div class="label-cetak"><h4 style="margin-bottom:5px;">SMKN 6 TEBO</h4><p style="font-size: 12px;">${nama}</p><svg id="barcode"></svg></div>`;
    JsBarcode("#barcode", sku, { format: "CODE128", width: 1.5, height: 40, displayValue: true });
    window.print();
}

async function loadTransaksi() {
    let q = (userRole === 'admin') 
        ? collection(db, "transactions") 
        : query(collection(db, "transactions"), where("uid_peminjam", "==", currentUser.uid));
    
    const querySnapshot = await getDocs(q);
    let html = '';
    querySnapshot.forEach((docSnap) => {
        let d = docSnap.data();
        let actionBtn = '-';
        if(userRole === 'admin' && d.status === 'pending') actionBtn = `<button class="btn-3d" onclick="approvePinjam('${docSnap.id}')">Setujui</button>`;
        if(d.status === 'approved') actionBtn = `<button class="btn-3d outline" onclick="cetakKartu('${d.nama_item}', '${d.email_peminjam}', '${d.tgl_pengajuan}')">Cetak Kartu</button>`;

        html += `<tr>
            <td>${d.email_peminjam}</td><td>${d.nama_item}</td><td>${d.tgl_pengajuan}</td>
            <td><span class="badge ${d.status === 'approved' ? 'baik' : 'rusak'}">${d.status.toUpperCase()}</span></td>
            <td>${actionBtn}</td>
        </tr>`;
    });
    document.getElementById('tableTransaksi').innerHTML = html;
}

window.approvePinjam = async function(idTrans) {
    await updateDoc(doc(db, "transactions", idTrans), { status: "approved" });
    alert('Disetujui!'); loadTransaksi();
}

window.cetakKartu = function(namaBrg, email, tgl) {
    document.getElementById('print-content').innerHTML = `
        <div class="kartu-cetak"><h2 style="text-align:center; margin-bottom: 20px;">KARTU PEMINJAMAN<br>SMKN 6 TEBO</h2>
        <p><strong>Tanggal Pinjam:</strong> ${tgl}</p><p><strong>Peminjam:</strong> ${email}</p>
        <table style="width:100%; margin: 20px 0;"><tr><th style="background:#ddd;">Nama Aset</th><th>Kondisi</th></tr><tr><td>${namaBrg}</td><td>BAIK</td></tr></table>
        <div style="display:flex; justify-content:space-between; margin-top:50px;"><div style="text-align:center;">Peminjam,<br><br><br><br>( ${email} )</div><div style="text-align:center;">Admin Sarpras,<br><br><br><br>( ......................... )</div></div></div>
    `;
    window.print();
}
