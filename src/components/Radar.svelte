<script>
  document.addEventListener("DOMContentLoaded", function () {
    const radar = document.getElementById("radar");

    const data = [
      { label: "Likely", value: 57 },
      { label: "Don't know", value: 35 },
      { label: "Not likely", value: 8 },
    ];

    // Convertir los valores a ángulos
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const angles = data.map((item) => (item.value / total) * 360);

    // Crear las secciones del radar
    let currentAngle = 0;
    angles.forEach((angle, index) => {
      const section = document.createElement("div");
      section.className = "radar-section";
      section.style.transform = `rotate(${currentAngle}deg) skewY(-90deg)`;
      section.style.background = `conic-gradient(${getColor(index)} ${angle}deg, transparent 0)`;
      radar.appendChild(section);
      currentAngle += angle;
    });

    function getColor(index) {
      switch (index) {
        case 0:
          return "#0af";
        case 1:
          return "#05a";
        case 2:
          return "#005";
        default:
          return "#000";
      }
    }
  });
</script>

<main>
  <div class="radar"></div>
</main>

<style>
  html,
  body {
    height: 100vh;
  }

  body {
    background: #001413;
    overflow: hidden;
    display: grid;
    place-items: center;
  }

  .radar {
    --size: 450px;
    --color: #15fcd8;

    width: var(--size);
    height: var(--size);
    margin: auto;
    border: 3px solid var(--color);
    border-radius: 50%;
    background:
    /* 4) guides */
      linear-gradient(
        transparent 0 49.75%,
        var(--color) 49.75% 50%,
        transparent 50% 100%
      ),
      linear-gradient(
        to right,
        transparent 0 49.75%,
        var(--color) 49.75% 50%,
        transparent 50% 100%
      ),
      /* 3) radar */
        radial-gradient(
          transparent 0% 25%,
          var(--color) 25.5% 25.75%,
          transparent 26% 50%,
          var(--color) 50.5% 50.75%,
          transparent 51% 75%,
          var(--color) 75.5% 75.75%,
          transparent 76% 100%
        ),
      /* 2.5) fondo tapar grid */ radial-gradient(#00767211, #002421 65%),
      /* 2) grid */
        repeating-linear-gradient(
          to right,
          #0e817a77 0 1px,
          transparent 1.5px 25px
        ),
      repeating-linear-gradient(#0e817a77 0 1px, transparent 1.5px 25px),
      /* 1) background */ radial-gradient(#007672 0, #014f48 90%);
    position: relative;
    mix-blend-mode: difference; /* color-dodge; */
  }

  .radar::before {
    --dark-color: color-mix(in srgb, var(--color), transparent 85%);

    content: "";
    display: block;
    background: var(--dark-color);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    filter: blur(1px);
  }

  .radar::after {
    --radar-color: color-mix(in srgb, var(--color), transparent 50%);

    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: conic-gradient(
      transparent 0,
      var(--radar-color) 0turn 0.57turn,
      transparent 0.6turn 1turn
    );
    mix-blend-mode: plus-lighter;
    animation: move-radar 1s linear;
  }

  @keyframes move-radar {
    from {
      rotate: -0.125turn;
    }
    to {
      rotate: 0.875turn;
    }
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    100% {
      scale: 1.15;
      opacity: 0;
    }
  }

  @keyframes disappear {
    to {
      opacity: 0;
    }
  }

  .mute {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .mute {
    cursor: pointer;

    & input {
      display: none;
    }
    & img {
      width: 48px;
    }
    & input:checked ~ .on,
    & input:not(:checked) ~ .off {
      display: none;
    }
  }
</style>
