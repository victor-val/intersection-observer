const vCPM = 5; // 5 € por 1k impresiones
const minTime = 1; // 1s
const options = {
  threshold: 0.5,
};
const ad = {
  id: "ad",
  impresions: 0,
  currency: "€",
  value: 0,
};

function sendAdData() {
  const lastAd = JSON.parse(localStorage.getItem("adVI")) ?? ad;
  lastAd.impresions++;
  lastAd.value = lastAd.impresions * vCPM * 0.001; // Cada vez que se visualiza el anuncio por al menos 1 seg
  localStorage.setItem("adVI", JSON.stringify(lastAd));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.dataset.timeStarted = Date.now();
    } else if (entry.target.dataset.timeStarted) {
      const time = Date.now() - Number(entry.target.dataset.timeStarted);
      console.log(time);
      if (time >= 1000) {
        sendAdData();
        entry.target.dataset.timeStarted = 0;
      }
    }
  });
});

observer.observe(document.querySelector(".ad"));
