const PASSWORD = "12032023";

const passwordScreen =
    document.getElementById('password-screen');

const choiceScreen =
    document.getElementById('choice-screen');

const yesBtn =
    document.getElementById('yes-btn');

const noBtn =
    document.getElementById('no-btn');

const noMessage =
    document.getElementById('no-message');

let noClickCount = 0;

const errorMessage = document.getElementById('error-message');
const inputs = document.querySelectorAll('.otp-input');

let attempt = 0;

// Fokus ke kotak pertama
window.addEventListener('load', () => {
    inputs[0].focus();
});

// Cek password
function checkPassword() {

    const value = [...inputs]
        .map(input => input.value)
        .join('');

    // Belum lengkap 8 digit
    if (value.length < PASSWORD.length) {
        return;
    }

    // Password benar
    if (value === PASSWORD) {

        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Yeay ❤️';

        setTimeout(() => {

            passwordScreen.classList.add('hidden');
            choiceScreen.classList.remove('hidden');

        }, 800);

        return;
    }

    // Password salah
    attempt++;

    errorMessage.style.color = 'red';

    if (attempt === 1) {

        errorMessage.textContent =
            'Masa lupa siii? 😒';

    } else if (attempt === 2) {

        errorMessage.textContent =
            'Coba inget lagi, hari special banget loh iniiii ❤️';

    } else if (attempt === 3) {

        errorMessage.innerHTML =
            'Aku kasih clue yaa 😆<br><br><strong>"Sah!"</strong>';

    } else {

        errorMessage.textContent =
            'Masa harus aku kasih tau jawabannya sih? 🤭';

    }

    // Kosongkan semua kotak
    inputs.forEach(input => input.value = '');

    // Fokus balik ke awal
    inputs[0].focus();
}

// OTP Logic
inputs.forEach((input, index) => {

    input.addEventListener('input', () => {

        input.value = input.value.replace(/\D/g, '');

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        const value = [...inputs]
            .map(input => input.value)
            .join('');

        // Auto submit saat 8 digit terisi
        if (value.length === PASSWORD.length) {
            checkPassword();
        }

    });

    input.addEventListener('keydown', (e) => {

        if (
            e.key === 'Backspace' &&
            !input.value &&
            index > 0
        ) {
            inputs[index - 1].focus();
        }

    });

});

inputs[0].addEventListener('paste', (e) => {

    e.preventDefault();

    const pastedData = e.clipboardData
        .getData('text')
        .replace(/\D/g, '');

    pastedData.split('').forEach((digit, index) => {

        if (inputs[index]) {
            inputs[index].value = digit;
        }

    });

    if (pastedData.length === PASSWORD.length) {
        checkPassword();
    }

});

noBtn.addEventListener('click', () => {

    noClickCount++;

    if(noClickCount === 1){

        noMessage.textContent =
            'Yahhh... 😢';

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

yesBtn.addEventListener('click', () => {

    alert('Timeline akan kita buat di fase berikutnya ❤️');

});