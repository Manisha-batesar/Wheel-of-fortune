const wheelSound = new Audio('./assets/spin-wheel.mp3');

// winning function animation
const loadAnimation = () => {
  (async (engine) => {
    await loadConfettiPreset(engine);

    await engine.load({
      id: "confeti-animation",
      options: {
        preset: "confetti",
      },
    });
  })(tsParticles);
}

function wheelOfFortune(node) {
  if (!node) return;

  const spin = node.querySelector('button');
  const wheel = node.querySelector('ul');
  let animation;
  let previousEndDegree = 0;

  spin.addEventListener('click', () => {
    wheelSound.currentTime = 0;
    wheelSound.play();

    if (animation) {
      animation.cancel();
    }

    const randomAdditionalDegrees = Math.random() * 360 + 1800;

    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel.animate([
      { transform: `rotate(${previousEndDegree}deg)` },
      { transform: `rotate(${newEndDegree}deg)` },
    ], {
      duration: 3000,
      direction: 'normal',
      easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
      fill: 'forwards',
      iterations: 1
    });
    
    previousEndDegree = newEndDegree;

    animation.onfinish = () => {
      wheelSound.pause();
      loadAnimation();
    };
  });
}

document.querySelectorAll('.main-container').forEach(el => wheelOfFortune(el));