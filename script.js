document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const mainContent = document.getElementById('mainContent');
  const enterBtn = document.getElementById('enterBtn');

  enterBtn.addEventListener('click', () => {
    const password = prompt('برای ورود لطفا رمز را وارد کنید:');
    if (password && password.trim().toLowerCase() === 'علیرضا') {
      loginScreen.style.display = 'none';
      mainContent.style.display = 'block';
    } else {
      alert('رمز اشتباه است. لطفا دوباره تلاش کنید.');
    }
  });
});
