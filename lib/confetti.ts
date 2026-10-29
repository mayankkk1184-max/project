import confetti from 'canvas-confetti';

export function fireConfettiBurst() {
  const colors = ['#E024A3', '#A855F7', '#FCD34D', '#DFB960', '#FFFBEB'];
  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
  });
  confetti({
    particleCount: 60,
    spread: 120,
    origin: { y: 0.4 },
    colors,
    scalar: 0.8,
  });
}

export function fireFireworks() {
  const colors = ['#E024A3', '#A855F7', '#FCD34D', '#DFB960'];
  const duration = 2600;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function fireGoldConfetti() {
  const colors = ['#FCD34D', '#DFB960', '#FFFBEB', '#A855F7'];
  confetti({
    particleCount: 200,
    spread: 160,
    startVelocity: 45,
    origin: { y: 0.5 },
    colors,
    scalar: 1.2,
  });
}

export function fireHeartConfetti() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: '❤', scalar });
  confetti({
    particleCount: 40,
    spread: 90,
    origin: { y: 0.55 },
    shapes: [heart],
    scalar,
    colors: ['#E024A3', '#A855F7'],
  });
}
