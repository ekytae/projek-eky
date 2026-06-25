const PASSWORD = "12032023";

/*
|--------------------------------------------------------------------------
| ELEMENTS
|--------------------------------------------------------------------------
*/

const passwordScreen = document.getElementById('password-screen');
const choiceScreen = document.getElementById('choice-screen');
const storyScreen = document.getElementById('story-screen');

const errorMessage = document.getElementById('error-message');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const noMessage = document.getElementById('no-message');

const inputs = document.querySelectorAll('.otp-input');

const storyContent = document.getElementById('story-content');

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

let attempt = 0;
let noClickCount = 0;
let currentStory = 0;

/*
|--------------------------------------------------------------------------
| STORIES
|--------------------------------------------------------------------------
*/

const stories = [
    {
        title: 'Awal Dari Sebuah "P"',
        date: '14 April 2018',
        image: '/images/bab1.jpg',
        text: `
Kalau dipikir-pikir lucu juga ya.

Semua ini berawal dari satu huruf.

"P"

Dan besoknya kita langsung ketemuan.

Aku masih inget banget kalimat pertama yang aku terima waktu itu.

"Udah di Willa Asri nih."

Siapa sangka dari pesan sesederhana itu,
perjalanan panjang ini akhirnya dimulai.
        `
    },

    {
        title: 'Pacaran Dalam Dua Hari',
        date: '16 April 2018',
        image: '/images/bab2.jpg',
        text: `
Sampai sekarang kalau diingat rasanya masih lucu.

Baru dua hari kenal.

Tapi entah kenapa aku udah ngerasa nyaman.

Saking nggak sabarnya,
aku sampai pura-pura nanya:

"Terakhir pacaran kapan?"

Padahal niat aslinya cuma satu.

Aku pengen ngajak kamu pacaran.

Dan ajaibnya...

kamu mau ❤️
        `
    },

    {
        title: 'Aku Datang Untuk Melamar',
        date: '11 Februari 2023',
        image: '/images/bab3.jpg',
        text: `
Perjalanan kita nggak selalu mudah.

Banyak naik turun yang kita lewati.

Tapi hari itu...

aku memberanikan diri.

Berdiri di depan banyak orang.

Di depan keluarga.

Dan dengan malu-malu memanggil...

"Dd..."

🤣❤️
        `
    },

    {
        title: 'Kita Memulai Lagi',
        date: '12 Maret 2023',
        image: '/images/bab4.jpg',
        text: `
Ini bukan akhir.

Justru awal yang baru.

Hari dimana semuanya kita ulang lagi dari awal.

Yang tadinya cuma pacar.

Sekarang menjadi suami dan istri.

Aku tahu aku belum sempurna.

Aku tahu kadang aku masih bikin kamu sedih.

Tapi aku juga tahu...

kamu selalu mendoakan aku.

Dan tetap sabar sampai hari ini.

Terima kasih ❤️
        `
    }
];

/*
|--------------------------------------------------------------------------
| AUTO FOCUS
|--------------------------------------------------------------------------
*/

window.addEventListener('load', () => {
    if(inputs.length){
        inputs[0].focus();
    }
});

/*
|--------------------------------------------------------------------------
| PASSWORD
|--------------------------------------------------------------------------
*/

function checkPassword() {
    const value = [...inputs]
        .map(input => input.value)
        .join('');
    if(value.length < PASSWORD.length){
        return;
    }
    if(value === PASSWORD){
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Yeay ❤️';
        setTimeout(() => {
            passwordScreen.classList.add('hidden');
            choiceScreen.classList.remove('hidden');
        }, 800);
        return;
    }
    attempt++;
    errorMessage.style.color = 'red';
    if(attempt === 1){
        errorMessage.textContent =
            'Masa lupa siii? 😒';
    }else if(attempt === 2){
        errorMessage.textContent =
            'Coba inget lagi, hari special banget loh iniiii ❤️';
    }else if(attempt === 3){
        errorMessage.innerHTML =
            'Aku kasih clue yaa 😆<br><br><strong>"Sah!"</strong>';
    }else{
        errorMessage.textContent =
            'Masa harus aku kasih tau jawabannya sih? 🤭';
    }
    inputs.forEach(input => {
        input.value = '';
    });
    inputs[0].focus();
}
/*
|--------------------------------------------------------------------------
| OTP
|--------------------------------------------------------------------------
*/
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
        if(input.value && index < inputs.length - 1){
            inputs[index + 1].focus();
        }
        const value = [...inputs]
            .map(i => i.value)
            .join('');
        if(value.length === PASSWORD.length){
            checkPassword();
        }
    });
    input.addEventListener('keydown', (e) => {
        if(
            e.key === 'Backspace' &&
            !input.value &&
            index > 0
        ){
            inputs[index - 1].focus();
        }
    });
});
/*
|--------------------------------------------------------------------------
| PASTE OTP
|--------------------------------------------------------------------------
*/
if(inputs.length){
    inputs[0].addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData('text')
            .replace(/\D/g, '');
        pasted.split('').forEach((digit, index) => {
            if(inputs[index]){
                inputs[index].value = digit;
            }
        });
        if(pasted.length === PASSWORD.length){
            checkPassword();
        }
    });
}

/*
|--------------------------------------------------------------------------
| CHOICE
|--------------------------------------------------------------------------
*/
if(noBtn){
    noBtn.addEventListener('click', () => {
        noClickCount++;
        if(noClickCount === 1){
            noMessage.textContent = 'Yahhh... 😢';
        }else if(noClickCount === 2){
            noMessage.textContent =
                'Aku bikinnya lama loh 🥺';
        }else if(noClickCount === 3){
            noMessage.textContent =
                'Masa nggak penasaran sih? 😭';
        }else{
            noMessage.textContent =
                'Oke aku menyerah... pencet yang "Mau" ya ❤️';
            noBtn.style.display = 'none';
        }
    });
}
if(yesBtn){
    yesBtn.addEventListener('click', () => {
        choiceScreen.classList.add('hidden');
        storyScreen.classList.remove('hidden');

        renderStory();
    });
}
/*
|--------------------------------------------------------------------------
| STORY
|--------------------------------------------------------------------------
*/

function renderStory(){
    const story = stories[currentStory];
    storyContent.innerHTML = `
        <div class="heart">❤️</div>
        <h2>Bab ${currentStory + 1}</h2>
        <h1>${story.title}</h1>
        <p class="story-date">
            ${story.date}
        </p>
        <button id="open-memory-btn">
            Buka Kenangan ❤️
        </button>
    `;
    document
        .getElementById('open-memory-btn')
        .addEventListener('click', openMemory);

}
function openMemory(){
    const story = stories[currentStory];
    storyContent.innerHTML = `
        <img
            src="${story.image}"
            class="story-image"
            alt="${story.title}"
        >
        <h2>❤️ Bab ${currentStory + 1}</h2>
        <h1>${story.title}</h1>
        <p class="story-date">
            ${story.date}
        </p>
        <p class="story-text">
            ${story.text}
        </p>
        <button id="next-story-btn">
            ${
                currentStory === stories.length - 1
                ? 'Lanjut ❤️'
                : 'Bab Berikutnya ➜'
            }
        </button>
    `;
    document
        .getElementById('next-story-btn')
        .addEventListener('click', nextStory);
}
function nextStory(){
    currentStory++;
    if(currentStory >= stories.length){
        alert('Masuk ke Surat Cinta ❤️');
        return;
    }
    renderStory();
}