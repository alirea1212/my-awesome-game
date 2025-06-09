document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const deviceChoice = document.getElementById('deviceChoice');
  const mainContent = document.getElementById('mainContent');
  const enterBtn = document.getElementById('enterBtn');
  const mobileBtn = document.getElementById('mobileBtn');
  const desktopBtn = document.getElementById('desktopBtn');

  // وقتی دکمه ورود کلیک شد، رمز بگیر
  enterBtn.addEventListener('click', () => {
    const password = prompt('لطفا رمز ورود را وارد کنید:');
    if (password && password.trim().toLowerCase() === 'علیرضا') {
      loginScreen.style.display = 'none';
      deviceChoice.style.display = 'flex';
    } else {
      alert('رمز اشتباه است! دوباره تلاش کنید.');
    }
  });

  // ورود موبایل
  mobileBtn.addEventListener('click', () => {
    deviceChoice.style.display = 'none';
    mainContent.style.display = 'block';

    // سبک موبایل اضافه کنیم
    document.body.style.background = "linear-gradient(120deg, #0f2027, #1f3a43, #2c4364)";
  });

  // ورود کامپیوتر
  desktopBtn.addEventListener('click', () => {
    deviceChoice.style.display = 'none';
    mainContent.style.display = 'block';

    // سبک دسکتاپ اضافه کنیم (می‌تونی تغییر بدی)
    document.body.style.background = "linear-gradient(120deg, #2c3e50, #4ca1af)";
  });
});
