const PASSWORD = "12032023";

/* ELEMENTS */
const passwordScreen = document.getElementById('password-screen');
const choiceScreen = document.getElementById('choice-screen');
const storyScreen = document.getElementById('story-screen');
const letterScreen = document.getElementById('letter-screen');

const errorMessage = document.getElementById('error-message');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noMessage = document.getElementById('no-message');
const inputs = document.querySelectorAll('.otp-input');
const storyContent = document.getElementById('story-content');
const bgMusic = document.getElementById('bg-music');

let attempt = 0;
let noClickCount = 0;

/* |--------------------------------------------------------------------------
| STORIES DATA (SUDAH DIROMBAK)
|--------------------------------------------------------------------------
*/
const stories = [
    {
        title: '"P"',
        date: '14 April 2018',
        icon: '📱',
        images: [], // Dikosongkan karena belum ada gambar
        text: `Inget ga dulu aku pertama kali chat cuma "P", "Ini dinda ya?" doang? Itu juga tengah malem pas kamu lagi main.\n\nKalau sekarang diinget tuh lucu aja, cuma dari huruf P doang akhirnya bisa kenalan, dan bertahan sampai hari ini. Coba bayangin kalau dulu aku nggak berani chat kamu, atau kamu males bales chat aku, udah jadi apa kita sekarang wkwk.`
    },
    {
        title: '16 April 2018',
        date: '', // Dikosongkan sesuai permintaan
        icon: '👩‍❤️‍👨',
        images: [], 
        text: `Nah, ini bagian yang paling lucu. Baru dua hari kenal, bisa-bisanya aku bilang nyaman wkwk. Udah gitu ditantangin lagi, berani apa nggak ngomong langsung.\n\nWalaupun aslinya aku cuma basa-basi nanya "kapan terakhir pacaran" hahaha. Kamu bayangin deh, gimana kalau dulu aku nggak berani dateng, pasti aku udah luntang-lantung sampai sekarang.`
    },
    {
        title: 'Akhirnya Dilamar',
        date: '11 Februari 2023',
        icon: '💍',
        images: ['/images/lamaran1.jpg', '/images/lamaran2.jpg'], // Ganti nama file sesuai punyamu
        text: `Dd.... wkwkwkwk sumpah masih malu sendiri kalau nonton videonya lagi.\n\nTanggal 11 Februari itu, walaupun kelihatannya kayak cuma formalitas, tapi aku sendiri masih agak heran kok bisa berani ngelamar kamu di depan orang banyak. Ada MC-nya pula. Mana kamu cantik banget lagi hari itu.`
    },
    {
        title: 'Ketika Kita Mulai Lagi Dari Awal',
        date: '12 Maret 2023',
        icon: '💒',
        images: ['/images/nikah1.jpg', '/images/nikah2.jpg', '/images/nikah3.jpg', '/images/nikah4.jpg'],
        text: `Sebulan dari lamaran, akhirnya hari yang kita tunggu-tunggu dateng. Hari di mana semua yang kita laluin selama 5 tahun ke belakang kita mulai lagi dari awal.\n\nDari yang sebelumnya cuma pacaran, akhirnya kita mutusin buat nikah. Hidup bareng, tinggal bareng, tidur bareng, pokoknya semuanya bareng-bareng.\n\nMaaf ya kalau aku masih belum bisa sesempurna yang kamu pengen, tapi aku bersyukur banget kamu masih mau nerima aku sampai detik ini. Pokoknya di tanggal ini hidup aku bener-bener berubah drastis. Jadi suami kamu, dan punya tanggung jawab yang jauh lebih besar. Makasih ya sayang.`
    },
    {
        title: '2 Garis',
        date: '15 Mei 2023',
        icon: '🍼',
        images: ['/images/testpack1.jpg', '/images/testpack2.jpg'],
        text: `Nggak disangka-sangka, baru nikah 2 bulan tiba-tiba ada dua garis dan hasilnya positif!\n\nCuma mau bilang: tokcer banget pokoknya wkwkwk.`
    },
    {
        title: 'Makin Deket',
        date: '',
        icon: '🤰',
        images: ['/images/hamil1.jpg', '/images/hamil2.jpg', '/images/hamil3.jpg'],
        text: `Perut kamu udah makin gede di fase ini. Inget nggak kita jalan-jalan ke Botanica pas kamu masih hamil 4 bulan wkwk.\n\nTerus kita juga banyak pergi-pergi, ke Puncak, makan di Bumi Aki. Hebat emang istri aku, tetep kuat ke mana-mana.`
    },
    {
        title: 'Sagara Garvi Sinatra',
        date: '13 Januari 2024',
        icon: '👼',
        images: ['/images/sagara1.jpg'],
        text: `"Ibu, Dd takut..." ngomong gitu sambil nangis di motor wkwkw.\n\nSiapa yang sangka dokter cantik tiba-tiba bilang kalau besok paginya jam 6 harus langsung operasi SC. Belum ada persiapan apa-apa dan jujur aja kondisi keuangan aku lagi jelek banget waktu itu. Tapi alhamdulillah, kita bisa berjuang bareng dan ngelewatin itu semua sampai hari ini.`
    },
    {
        title: 'Roller Coaster',
        date: '',
        icon: '🎢',
        images: ['/images/roller1.jpg', '/images/roller2.jpg', '/images/roller3.jpg'], 
        text: `Kita bener-bener ngerasain yang namanya naik dan turun. Punya duit banyak, sampai kehabisan duit, pusing bareng-bareng.\n\nDi sini aku cuma mau bilang: makasih banyak udah selalu mau nemenin aku ya, sayang. Kamu nggak pernah nyerah nemenin aku dari 0, naik ke 1 juta, terus balik lagi ke minus, sampai sekarang kita pelan-pelan naikin semuanya lagi berdua.`
    }
];

/* AUTO FOCUS & EFEK LOVE */
window.addEventListener('load', () => {
    if(inputs.length){ inputs[0].focus(); }
    createFloatingHearts(); 
});

/* LOGIKA PASSWORD */
function checkPassword() {
    const value = [...inputs].map(input => input.value).join('');
    if(value.length < PASSWORD.length) return;
    
    if(value === PASSWORD){
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Yeay ❤️';
        setTimeout(() => { switchScreen(passwordScreen, choiceScreen); }, 800);
        return;
    }
    
    attempt++;
    errorMessage.style.color = 'red';
    if(attempt === 1) errorMessage.textContent = 'Masa lupa siii? 😒';
    else if(attempt === 2) errorMessage.textContent = 'Coba inget lagi, hari special banget loh iniiii ❤️';
    else if(attempt === 3) errorMessage.innerHTML = 'Aku kasih clue yaa 😆<br><br><strong>"Sah!"</strong>';
    else errorMessage.textContent = 'Masa harus aku kasih tau jawabannya sih? 🤭';
    
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
}

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
        if(input.value && index < inputs.length - 1) inputs[index + 1].focus();
        const value = [...inputs].map(i => i.value).join('');
        if(value.length === PASSWORD.length) checkPassword();
    });
    input.addEventListener('keydown', (e) => {
        if(e.key === 'Backspace' && !input.value && index > 0) inputs[index - 1].focus();
    });
});

/* CHOICE BUTTONS */
if(noBtn){
    noBtn.addEventListener('click', () => {
        noClickCount++;
        if(noClickCount === 1) noMessage.textContent = 'Yahhh... 😢';
        else if(noClickCount === 2) noMessage.textContent = 'Aku bikinnya lama loh 🥺';
        else if(noClickCount === 3) noMessage.textContent = 'Masa nggak penasaran sih? 😭';
        else {
            noMessage.textContent = 'Oke aku menyerah... pencet yang "Mau" ya ❤️';
            noBtn.style.display = 'none';
        }
    });
}

if(yesBtn){
    yesBtn.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log("Audio autoplay diblokir:", e));
        switchScreen(choiceScreen, storyScreen);
        renderAllStories();
        startTimer(); // Mulai jalankan timer
    });
}

/* RENDER STORIES DENGAN TIMER & MULTI GAMBAR */
function renderAllStories(){
    let html = `<div class="chapter-container">`;
    
    // Layar Pertama: Timer Countdown
    html += `
        <div class="chapter-wrapper">
            <div class="card chapter-card">
                <h2 style="color: #ff5f8f; margin-bottom: 20px;">Halo Kesayanganku ❤️</h2>
                <p style="color: #666; font-size: 16px; margin-bottom: 10px;">Tau ga sayang, kita udah bareng-bareng selama...</p>
                
                <div class="timer-box" id="live-timer">Menghitung waktu...</div>
                
                <p style="color: #666; font-size: 16px; margin-bottom: 25px;">Aku mau ajak kamu inget-inget lagi dari awal kita ketemu sampe hari ini.</p>
                <p style="font-size: 14px; color: #aaa;">(Geser ke atas pelan-pelan ya)</p>
                <div class="heart bounce" style="margin-top: 15px;">👇</div>
            </div>
        </div>
    `;
    
    // Looping semua cerita
    stories.forEach((story, index) => {
        // Logika untuk menampilkan gambar (bisa lebih dari satu)
        let imagesHtml = '';
        if (story.images && story.images.length > 0) {
            imagesHtml = `<div class="image-gallery">`;
            story.images.forEach(imgSrc => {
                imagesHtml += `<img src="${imgSrc}" class="gallery-img" alt="Kenangan">`;
            });
            imagesHtml += `</div>`;
        }
        
        // Logika untuk tanggal
        let dateHtml = story.date ? `<p class="story-date">${story.date}</p>` : '';

        html += `
            <div class="chapter-wrapper reveal">
                <div class="card chapter-card">
                    <div class="heart pulse">${story.icon}</div>
                    <h2 style="color: #ff5f8f; font-size: 18px; margin-bottom: 5px;">Chapter ${index + 1}</h2>
                    <h1 style="font-size: 24px;">${story.title}</h1>
                    ${dateHtml}
                    ${imagesHtml}
                    <p class="story-text">${story.text}</p>
                </div>
            </div>
        `;
    });

    // Layar Penutup
    html += `
            <div class="chapter-wrapper reveal">
                <div class="card chapter-card" style="text-align: center;">
                    <p style="color: #ff5f8f; font-weight: bold; margin-bottom: 15px;">Masih ada pesan terakhir buat kamu...</p>
                    <button id="finish-scroll-btn">Buka Surat ❤️</button>
                </div>
            </div>
        </div>
    `;
    
    storyContent.innerHTML = html;
    setupScrollReveal();

    document.getElementById('finish-scroll-btn').addEventListener('click', () => {
        switchScreen(storyScreen, letterScreen);
    });
}

/* FUNGSI PENGHITUNG WAKTU (Dari 16 April 2018) */
function startTimer() {
    const startDate = new Date("2018-04-16T00:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const diff = now - startDate;
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById('live-timer');
        if (timerElement) {
            timerElement.innerHTML = `${years} Tahun<br>${days} Hari<br>${hours} Jam<br>${minutes} Menit<br>${seconds} Detik`;
        }
    }, 1000);
}

/* FUNGSI SENSOR SCROLL */
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => { observer.observe(reveal); });
}

/* UTILS */
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.add('hidden');
    hideScreen.classList.remove('fade-in');
    showScreen.classList.remove('hidden');
    showScreen.classList.add('fade-in');
}

/* EFEK LOVE BERJATUHAN */
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 6000);
    }, 800);
}