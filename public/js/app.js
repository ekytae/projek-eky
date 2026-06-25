const submitBtn = document.getElementById('submit-btn');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

const PASSWORD = "12032023";

submitBtn.addEventListener('click', () => {

    const value = passwordInput.value.trim();

    if(value === PASSWORD){

        errorMessage.style.color = "green";
        errorMessage.textContent = "Yeay ❤️";

        setTimeout(() => {
            alert("Fase berikutnya akan kita buat 😆");
        }, 800);

    }else{

        errorMessage.style.color = "red";
        errorMessage.textContent = "Masa lupa siii? 😒";

    }

});