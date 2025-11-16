// Data anggota (simulasi database)
let anggotaData = [
    {
        id: 1,
        nama: "Ahmad Ridwan",
        tempatLahir: "Jakarta",
        tanggalLahir: "1995-05-15",
        alamat: "Jl. Sudirman No. 45, Jakarta Selatan",
        sabuk: "Hitam",
        cabang: "Jakarta Pusat",
        prestasi: "Juara 1 Kejuaraan Nasional 2024, Juara 2 Porprov 2023"
    },
    {
        id: 2,
        nama: "Siti Nurhaliza",
        tempatLahir: "Bekasi",
        tanggalLahir: "1998-08-22",
        alamat: "Jl. Raya Bekasi No. 123, Bekasi",
        sabuk: "Coklat",
        cabang: "Bekasi",
        prestasi: "Juara 3 Kejuaraan Regional 2024"
    },
    {
        id: 3,
        nama: "Budi Santoso",
        tempatLahir: "Tangerang",
        tanggalLahir: "2000-03-10",
        alamat: "Jl. BSD Raya No. 67, Tangerang",
        sabuk: "Biru",
        cabang: "Tangerang",
        prestasi: "Peserta Kejuaraan Kota 2024"
    },
    {
        id: 4,
        nama: "Dewi Anggraini",
        tempatLahir: "Jakarta",
        tanggalLahir: "1997-11-30",
        alamat: "Jl. Gatot Subroto No. 89, Jakarta Pusat",
        sabuk: "Hijau",
        cabang: "Jakarta Pusat",
        prestasi: "-"
    }
];

let editingId = null;

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Active Navigation Link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu when link clicked
        if (navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== HERO SLIDESHOW ====================
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Manual slide navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// ==================== TABS ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ==================== GALERI FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galeriItems = document.querySelectorAll('.galeri-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        galeriItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                item.style.display = 'none';
            }
        });
    });
});

// ==================== ANGGOTA MANAGEMENT ====================
const modalAnggota = document.getElementById('modalAnggota');
const btnTambahAnggota = document.getElementById('btnTambahAnggota');
const btnBatal = document.getElementById('btnBatal');
const modalClose = document.querySelector('.modal-close');
const formAnggota = document.getElementById('formAnggota');
const searchAnggota = document.getElementById('searchAnggota');
const anggotaGrid = document.getElementById('anggotaGrid');
const modalTitle = document.getElementById('modalTitle');

// Open Modal
btnTambahAnggota.addEventListener('click', () => {
    editingId = null;
    modalTitle.textContent = 'Tambah Anggota Baru';
    formAnggota.reset();
    modalAnggota.classList.add('active');
});

// Close Modal
function closeModal() {
    modalAnggota.classList.remove('active');
    editingId = null;
    formAnggota.reset();
}

btnBatal.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

modalAnggota.addEventListener('click', (e) => {
    if (e.target === modalAnggota) {
        closeModal();
    }
});

// Get initials from name
function getInitials(name) {
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[0][0] + words[1][0];
    }
    return name.substring(0, 2);
}

// Format date to Indonesian
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Calculate age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Render Anggota
function renderAnggota(data = anggotaData) {
    if (data.length === 0) {
        anggotaGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-users"></i>
                <h3>Belum Ada Data Anggota</h3>
                <p>Klik tombol "Tambah Anggota" untuk menambahkan data anggota baru</p>
            </div>
        `;
        return;
    }
    
    anggotaGrid.innerHTML = data.map(anggota => `
        <div class="anggota-card">
            <div class="anggota-header">
                <div class="anggota-avatar">${getInitials(anggota.nama)}</div>
                <div>
                    <h4>${anggota.nama}</h4>
                    <span class="sabuk-badge ${anggota.sabuk.toLowerCase()}">${anggota.sabuk}</span>
                </div>
            </div>
            <div class="anggota-info">
                <div class="info-row">
                    <span class="info-label">TTL:</span>
                    <span class="info-value">${anggota.tempatLahir}, ${formatDate(anggota.tanggalLahir)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Usia:</span>
                    <span class="info-value">${calculateAge(anggota.tanggalLahir)} tahun</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Cabang:</span>
                    <span class="info-value">${anggota.cabang}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Alamat:</span>
                    <span class="info-value">${anggota.alamat}</span>
                </div>
            </div>
            ${anggota.prestasi && anggota.prestasi !== '-' ? `
                <div class="anggota-prestasi">
                    <strong><i class="fas fa-trophy"></i> Prestasi:</strong>
                    <p>${anggota.prestasi}</p>
                </div>
            ` : ''}
            <div class="anggota-actions">
                <button class="btn-icon btn-edit" onclick="editAnggota(${anggota.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-icon btn-delete" onclick="deleteAnggota(${anggota.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `).join('');
}

// Add or Update Anggota
formAnggota.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const anggota = {
        nama: document.getElementById('namaAnggota').value,
        tempatLahir: document.getElementById('tempatLahir').value,
        tanggalLahir: document.getElementById('tanggalLahir').value,
        alamat: document.getElementById('alamat').value,
        sabuk: document.getElementById('sabuk').value,
        cabang: document.getElementById('cabang').value,
        prestasi: document.getElementById('prestasi').value || '-'
    };
    
    if (editingId) {
        // Update existing
        const index = anggotaData.findIndex(a => a.id === editingId);
        anggotaData[index] = { ...anggotaData[index], ...anggota };
    } else {
        // Add new
        const newId = anggotaData.length > 0 ? Math.max(...anggotaData.map(a => a.id)) + 1 : 1;
        anggotaData.push({ id: newId, ...anggota });
    }
    
    renderAnggota();
    closeModal();
    
    // Show success message
    showNotification('Data anggota berhasil disimpan!', 'success');
});

// Edit Anggota
window.editAnggota = function(id) {
    editingId = id;
    const anggota = anggotaData.find(a => a.id === id);
    
    if (anggota) {
        modalTitle.textContent = 'Edit Data Anggota';
        document.getElementById('namaAnggota').value = anggota.nama;
        document.getElementById('tempatLahir').value = anggota.tempatLahir;
        document.getElementById('tanggalLahir').value = anggota.tanggalLahir;
        document.getElementById('alamat').value = anggota.alamat;
        document.getElementById('sabuk').value = anggota.sabuk;
        document.getElementById('cabang').value = anggota.cabang;
        document.getElementById('prestasi').value = anggota.prestasi === '-' ? '' : anggota.prestasi;
        
        modalAnggota.classList.add('active');
    }
};

// Delete Anggota
window.deleteAnggota = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
        anggotaData = anggotaData.filter(a => a.id !== id);
        renderAnggota();
        showNotification('Data anggota berhasil dihapus!', 'success');
    }
};

// Search Anggota
searchAnggota.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = anggotaData.filter(anggota => 
        anggota.nama.toLowerCase().includes(searchTerm) ||
        anggota.cabang.toLowerCase().includes(searchTerm) ||
        anggota.sabuk.toLowerCase().includes(searchTerm)
    );
    renderAnggota(filtered);
});

// ==================== KONTAK FORM ====================
const formKritikSaran = document.getElementById('formKritikSaran');
const successMsg = document.getElementById('successMsg');

formKritikSaran.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        nama: document.getElementById('namaKontak').value,
        email: document.getElementById('emailKontak').value,
        subjek: document.getElementById('subjek').value,
        pesan: document.getElementById('pesan').value
    };
    
    // Simulasi pengiriman email
    console.log('Mengirim pesan:', data);
    
    // Create mailto link
    const mailtoLink = `mailto:info@trisulasilat.com?subject=${encodeURIComponent(data.subjek)}&body=${encodeURIComponent(`Nama: ${data.nama}\nEmail: ${data.email}\n\nPesan:\n${data.pesan}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    successMsg.classList.add('show');
    formKritikSaran.reset();
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
});

// ==================== SCROLL TO TOP ====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `${type}-message show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
        <span>${message}</span>
    `;
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    renderAnggota();
    
    // Set hero section visible
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
});

// ==================== PREVENT BODY SCROLL WHEN MODAL OPEN ====================
const body = document.body;

function toggleBodyScroll(disable) {
    if (disable) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Update modal open/close to control body scroll
const originalCloseModal = closeModal;
closeModal = function() {
    originalCloseModal();
    toggleBodyScroll(false);
};

btnTambahAnggota.addEventListener('click', () => {
    toggleBodyScroll(true);
});

window.editAnggota = function(id) {
    editingId = id;
    const anggota = anggotaData.find(a => a.id === id);
    
    if (anggota) {
        modalTitle.textContent = 'Edit Data Anggota';
        document.getElementById('namaAnggota').value = anggota.nama;
        document.getElementById('tempatLahir').value = anggota.tempatLahir;
        document.getElementById('tanggalLahir').value = anggota.tanggalLahir;
        document.getElementById('alamat').value = anggota.alamat;
        document.getElementById('sabuk').value = anggota.sabuk;
        document.getElementById('cabang').value = anggota.cabang;
        document.getElementById('prestasi').value = anggota.prestasi === '-' ? '' : anggota.prestasi;
        
        modalAnggota.classList.add('active');
        toggleBodyScroll(true);
    }
};