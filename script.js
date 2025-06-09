const API_KEY = "AIzaSyABDpZjbzm3N3-pxiPl_R6RbSlEOmRgC6w";

function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  if (password === "علیرضا گنگستر") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
    document.getElementById("topHeader").style.display = "block";
  } else {
    alert("رمز اشتباهه داداش 😅");
  }
}

async function askGemini() {
  const prompt = document.getElementById("promptInput").value;
  const responseBox = document.getElementById("response");
  responseBox.innerText = "در حال فکر کردن... 🤔";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();
  try {
    const reply = data.candidates[0].content.parts[0].text;
    responseBox.innerText = reply;
  } catch (e) {
    responseBox.innerText = "خطایی رخ داد یا پاسخ نیومد ❌";
  }
}
