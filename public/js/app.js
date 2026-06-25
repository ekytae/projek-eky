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

/* STATE */
let attempt = 0;
let noClickCount = 0;
let currentStory = 0;

/* STORIES */
const stories = [
    {
        title: 'Awal Dari Sebuah "P"',
        date: '14 April 2018',
        image: '/images/bab1.jpg',
        text: `Kalau dipikir-pikir lucu juga ya.\n\nSemua ini berawal dari satu huruf.\n\n"P"\n\nDan besoknya kita langsung ketemuan.\n\nAku masih inget banget kalimat pertama yang aku terima waktu itu.\n\n"Udah di Willa Asri nih."\n\nSiapa sangka dari pesan sesederhana itu, perjalanan panjang ini akhirnya dimulai.`
    },
    {
        title: 'Pacaran Dalam Dua Hari',
        date: '16 April 2018',
        image: '/images/bab2.jpg',
        text: `Sampai sekarang kalau diingat rasanya masih lucu.\n\nBaru dua hari kenal.\n\nTapi entah kenapa aku udah ngerasa nyaman.\n\nSaking nggak sabarnya, aku sampai pura-pura nanya:\n\n"Terakhir pacaran kapan?"\n\nPadahal niat aslinya cuma satu.\n\nAku pengen ngajak kamu pacaran.\n\nDan ajaibnya...\n\nkamu mau ❤️`
    },
    {
        title: 'Aku Datang Untuk Melamar',
        date: '11 Februari 2023',
        image: '/images/bab3.jpg',
        text: `Perjalanan kita nggak selalu mudah.\n\nBanyak naik turun yang kita lewati.\n\nTapi hari itu...\n\naku memberanikan diri.\n\nBerdiri di depan banyak orang.\n\nDi depan keluarga.\n\nDan dengan malu-malu memanggil...\n\n"Dd..."\n\n🤣❤️`
    },
    {
        title: 'Kita Memulai Lagi',
        date: '12 Maret 2023',
        image: '/images/bab4.jpg',
        text: `Ini bukan akhir.\n\nJustru awal yang baru.\n\nHari dimana semuanya kita ulang lagi dari awal.\n\nYang tadinya cuma pacar.\n\nSekarang menjadi suami dan istri.\n\nAku tahu aku belum sempurna.\n\nAku tahu kadang aku masih bikin kamu sedih.\n\nTapi aku juga tahu...\n\nkamu selalu mendoakan aku.\n\nDan tetap sabar sampai hari ini.\n\nTerima kasih ❤️`
    }
];

/* AUTO FOCUS & EFEK LOVE */
window.addEventListener('load', () => {
    if(inputs.length){ inputs[0].focus(); }
    createFloatingHearts(); 
});

/* LOGIKA PASSWORD & OTP (Tetap sama) */
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

if(inputs.length){
    inputs[0].addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
        pasted.split('').forEach((digit, index) => {
            if(inputs[index]) inputs[index].value = digit;
        });
        if(pasted.length === PASSWORD.length) checkPassword();
    });
}

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
        renderStory();
    });
}

/* FUNGSI ANIMASI KONTEN BUKU */
function animateContent(htmlContent, bindEventsCallback) {
    // Tambahkan class animasi
    storyContent.classList.add('content-transition', 'content-hidden');
    
    // Tunggu animasi menghilang selesai (400ms), lalu ganti konten
    setTimeout(() => {
        storyContent.innerHTML = htmlContent;
        bindEventsCallback(); // Pasang ulang event listener untuk tombol baru
        
        // Munculkan kembali perlahan
        storyContent.classList.remove('content-hidden');
    }, 400);
}

/* STORY (Sekarang pakai animasi dan kata Chapter) */
function renderStory(){
    const story = stories[currentStory];
    const html = `
        <div class="heart pulse">❤️</div>
        <h2 style="color: #ff5f8f; margin-bottom: 10px;">Chapter ${currentStory + 1}</h2>
        <h1>${story.title}</h1>
        <p class="story-date">${story.date}</p>
        <button id="open-memory-btn">Buka Kenangan ❤️</button>
    `;
    
    animateContent(html, () => {
        document.getElementById('open-memory-btn').addEventListener('click', openMemory);
    });
}

function openMemory(){
    const story = stories[currentStory];
    const html = `
        <img src="${story.image}" class="story-image" alt="${story.title}">
        <h2 style="color: #ff5f8f; font-size: 18px; margin-bottom: 5px;">❤️ Chapter ${currentStory + 1}</h2>
        <h1 style="font-size: 24px;">${story.title}</h1>
        <p class="story-date">${story.date}</p>
        <p class="story-text">${story.text}</p>
        <button id="next-story-btn">
            ${currentStory === stories.length - 1 ? 'Ada Satu Lagi ❤️' : 'Chapter Berikutnya ➜'}
        </button>
    `;
    
    animateContent(html, () => {
        document.getElementById('next-story-btn').addEventListener('click', nextStory);
    });
}

function nextStory(){
    currentStory++;
    if(currentStory >= stories.length){
        switchScreen(storyScreen, letterScreen);
        return;
    }
    renderStory();
}

/* UTILS - Transisi Layar Utama */
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