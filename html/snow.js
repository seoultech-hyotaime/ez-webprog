let repeat = false;

function createSnow() {    // 눈 만들기
  const snow = document.createElement("span");
  snow.innerHTML = "*";
  snow.style.position = "absolute";
  snow.style.color = "white";
  snow.style.fontSize = "25px";
  snow.style.left = Math.random() * (window.innerWidth - 25) + "px";
  snow.style.top = "-50px";
  document.body.appendChild(snow);

  function snowFall() {    // 눈 내려가기
    const windowHeight = (window.innerHeight - 25);
    const randomTime = Math.random() * 10 + 5;

    const animation = snow.animate(
      [
        { transform: `translateY(25px)` },
        { transform: `translateY(${windowHeight}px)` },
      ],
      {
        duration: randomTime * 1000,
        iterations: Infinity,
        easing: "linear",
        delay: Math.random() * randomTime * 500,
      }
    );

    animation.onfinish = () => { // 눈 제거
      snow.remove();
    };
  }

  snowFall();
}

function generateSnow() {
  const num = 100;
  for (let i = 0; i < num; i++) {
    createSnow();
  }
}

const snowButton = document.getElementById("snowButton");
snowButton.addEventListener("click", () => {
  if (!repeat) {
    generateSnow();
    snowButton.textContent = "No More Snow";
  } else {
    const snow = document.querySelectorAll("span");
    snow.forEach((snow) => snow.remove());
    snowButton.textContent = "Falling Snow Again";
  }
  repeat = !repeat;
});