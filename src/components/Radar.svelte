<script>
  export let p = 0;
  export let yes = false;
  function reglaDeTresSimple(p) {
    let factor = 360 / 100;
    return (100 - p) * factor;
  }
</script>

<main>
  <div class="container">
    <div class="radar" style="--p:{reglaDeTresSimple(p)}"></div>
    <p class="text">
      De acuerdo con encuestas de 2023, el <span class="text highlight"
        >{p}%</span
      >
      de las personas cree que la inteligencia artificial reemplazará su trabajo
      actual en los próximos 5 años. {yes
        ? "Sos parte de la minoría."
        : "Sos parte de la mayoría."}
    </p>
  </div>
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

  @property --p {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .radar {
    --size: 400px;
    --color: #15fcd8;
    --color-inside: rgb(21, 252, 216, 0.05);
    --color-axis: rgb(21, 252, 216, 0.1);
    --p: 180;

    width: var(--size);
    height: var(--size);
    margin: auto;
    border: 3px solid var(--color);
    border-radius: 50%;
    background:
    /* 4) guides */
      linear-gradient(
        transparent 0 49.75%,
        var(--color-axis) 49.75% 50%,
        transparent 50% 100%
      ),
      linear-gradient(
        to right,
        transparent 0 49.75%,
        var(--color-axis) 49.75% 50%,
        transparent 50% 100%
      ),
      /* 3) radar */
        radial-gradient(
          transparent 10% 25%,
          var(--color-inside) 10% 25.75%,
          transparent 26% 50%,
          var(--color-inside) 50.5% 50.75%,
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
    transform: scaleX(-1);
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
      transparent calc(var(--p) * 1deg),
      var(--radar-color) calc(var(--p) * 1deg),
      var(--radar-color) calc(var(--p) * 1deg + 0.6turn),
      transparent calc(var(--p) * 1deg + 0.6turn + 1turn)
    );
    mix-blend-mode: plus-lighter;
    animation: move-radar 2s linear;
  }

  @keyframes move-radar {
    from {
      --p: 360;
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

  .text {
    font-size: 20px;
    font-optical-sizing: auto;
    font-style: normal;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    max-width: 50%;
  }

  .highlight {
    color: #15fcd8;
    font-weight: bold;
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
