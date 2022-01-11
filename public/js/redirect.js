const redirect = document.getElementById("redirect");
const countdown = setInterval(() => {
  let seconds = parseInt(redirect.textContent);
  seconds--;
  if (seconds === 0) {
    clearInterval(countdown);
    window.location.href = '/';
  } else {
    redirect.textContent = seconds;
  }
},1000);