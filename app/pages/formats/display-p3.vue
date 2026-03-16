<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'display-p3')!

const r = ref(0.44)
const g = ref(0.18)
const b = ref(0.54)

const colorValue = computed(() => `color(display-p3 ${r.value} ${g.value} ${b.value})`)
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>{{ format.name }}</h1>
      <p class="subtitle">{{ format.description }}</p>
      <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm)">
        <span class="badge">{{ format.spec }}</span>
        <span class="badge badge--green">{{ format.browserSupport }}</span>
      </div>
    </div>

    <section class="section">
      <h2>Syntax</h2>
      <pre><code>/* Display P3 via the color() function */
color: color(display-p3 0.44 0.18 0.54);
color: color(display-p3 0.44 0.18 0.54 / 50%);

/* Values are 0 to 1 (not 0-255 like rgb) */
/* Channels map to red, green, blue in P3 gamut */

/* The color() function also supports other spaces: */
color: color(srgb 0.48 0.18 0.56);
color: color(srgb-linear 0.2 0.03 0.27);
color: color(rec2020 0.35 0.15 0.4);
color: color(a98-rgb 0.4 0.15 0.5);
color: color(prophoto-rgb 0.3 0.15 0.35);</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Red <code>{{ r }}</code></label>
            <input type="range" v-model.number="r" min="0" max="1" step="0.01">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Green <code>{{ g }}</code></label>
            <input type="range" v-model.number="g" min="0" max="1" step="0.01">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Blue <code>{{ b }}</code></label>
            <input type="range" v-model.number="b" min="0" max="1" step="0.01">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>sRGB vs Display P3 Gamut</h2>
      <p>Display P3 covers approximately 50% more colors than sRGB. Here are colors that only P3 can fully express:</p>

      <div class="grid-3" style="margin-top: var(--spacing-lg)">
        <div class="card" style="text-align: center">
          <div class="swatch" style="margin-bottom: var(--spacing-sm); background: color(display-p3 1 0 0)"></div>
          <strong style="font-size: var(--text-sm)">P3 Red</strong><br>
          <code>color(display-p3 1 0 0)</code>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--spacing-xs)">More vivid than #FF0000</p>
        </div>
        <div class="card" style="text-align: center">
          <div class="swatch" style="margin-bottom: var(--spacing-sm); background: color(display-p3 0 1 0)"></div>
          <strong style="font-size: var(--text-sm)">P3 Green</strong><br>
          <code>color(display-p3 0 1 0)</code>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--spacing-xs)">Much more vivid green</p>
        </div>
        <div class="card" style="text-align: center">
          <div class="swatch" style="margin-bottom: var(--spacing-sm); background: color(display-p3 0 0 1)"></div>
          <strong style="font-size: var(--text-sm)">P3 Blue</strong><br>
          <code>color(display-p3 0 0 1)</code>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--spacing-xs)">Slightly more vivid blue</p>
        </div>
      </div>

      <div class="info-box" style="margin-top: var(--spacing-lg)">
        <p>The difference is most visible on P3-capable displays (most modern phones, MacBooks, and recent monitors). On sRGB displays, the browser clamps P3 colors to the nearest sRGB equivalent.</p>
      </div>
    </section>

    <section class="section">
      <h2>Using P3 with Fallbacks</h2>
      <pre><code>/* Progressive enhancement pattern */
.brand-accent {
  /* sRGB fallback */
  background: #ff3300;

  /* P3 version — used if supported */
  background: color(display-p3 1 0.2 0);
}

/* Or use @supports */
.brand-accent {
  background: #ff3300;
}
@supports (color: color(display-p3 0 0 0)) {
  .brand-accent {
    background: color(display-p3 1 0.2 0);
  }
}

/* Or use @media for gamut detection */
@media (color-gamut: p3) {
  :root {
    --accent: color(display-p3 1 0.2 0);
  }
}

/* Best approach: Use OKLCH and let the browser handle it */
.brand-accent {
  /* If the device supports P3, this will use P3.
     Otherwise, it gamut-maps to sRGB automatically. */
  background: oklch(0.65 0.28 30);
}</code></pre>
    </section>

    <section class="section">
      <h2>Pros & Cons</h2>
      <div class="grid-2">
        <div class="card">
          <h3 style="color: var(--color-accent-green); margin-bottom: var(--spacing-sm)">Pros</h3>
          <ul style="padding-left: var(--spacing-lg)">
            <li v-for="pro in format.pros" :key="pro" style="margin-bottom: var(--spacing-xs)">{{ pro }}</li>
          </ul>
        </div>
        <div class="card">
          <h3 style="color: var(--color-accent-red); margin-bottom: var(--spacing-sm)">Cons</h3>
          <ul style="padding-left: var(--spacing-lg)">
            <li v-for="con in format.cons" :key="con" style="margin-bottom: var(--spacing-xs)">{{ con }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>For Theming</h2>
      <div class="info-box">
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> Display P3 is an output gamut, not a theming format. You'll rarely author colors directly in <code>color(display-p3 ...)</code>. Instead, use OKLCH with high chroma values — the browser automatically uses P3 when available and falls back to sRGB when not.</p>
      </div>
    </section>
  </div>
</template>
