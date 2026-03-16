<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'oklab')!

const l = ref(0.42)
const a = ref(0.1)
const b = ref(-0.14)

const colorValue = computed(() => `oklab(${l.value} ${a.value} ${b.value})`)
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
      <pre><code>/* OKLAB syntax */
color: oklab(0.42 0.1 -0.14);
color: oklab(0.42 0.1 -0.14 / 50%);

/* L: 0 (black) to 1 (white) */
/* a: ~-0.4 to ~0.4 (green to red) */
/* b: ~-0.4 to ~0.4 (blue to yellow) */

/* OKLAB is best used for gradients and interpolation.
   For direct authoring, prefer OKLCH (the polar form). */</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Lightness (L) <code>{{ l }}</code></label>
            <input type="range" v-model.number="l" min="0" max="1" step="0.01">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>a (green↔red) <code>{{ a }}</code></label>
            <input type="range" v-model.number="a" min="-0.4" max="0.4" step="0.005">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>b (blue↔yellow) <code>{{ b }}</code></label>
            <input type="range" v-model.number="b" min="-0.4" max="0.4" step="0.005">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Why OKLAB Was Created</h2>
      <p>Björn Ottosson created OKLAB in 2020 to solve two problems with CIE Lab:</p>
      <div class="grid-2" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">1. Better perceptual uniformity</h4>
          <p style="font-size: var(--text-sm)">CIE Lab has regions where "equal" numeric changes produce visibly unequal results. OKLAB's optimization against perceptual data makes it consistently uniform across the entire space.</p>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">2. No hue shifts in gradients</h4>
          <p style="font-size: var(--text-sm)">Gradients in CIE Lab can shift through unexpected hues (particularly blues turning purple). OKLAB eliminates this, making it ideal for CSS gradient interpolation.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Gradient Comparison</h2>
      <p>The same gradient (blue → white) in different interpolation spaces:</p>

      <div style="margin-top: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md)">
        <div>
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">sRGB (default)</p>
          <div style="height: 50px; border-radius: var(--radius-md); background: linear-gradient(to right, #0000ff, #ffffff)"></div>
        </div>
        <div>
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">LAB</p>
          <div style="height: 50px; border-radius: var(--radius-md); background: linear-gradient(in lab to right, lab(30 60 -100), lab(100 0 0))"></div>
        </div>
        <div>
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">OKLAB — smooth, no hue shift</p>
          <div style="height: 50px; border-radius: var(--radius-md); background: linear-gradient(in oklab to right, oklab(0.4 -0.03 -0.27), oklab(1 0 0))"></div>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <p style="margin-bottom: var(--spacing-sm)">A rainbow gradient — where interpolation space matters most:</p>
        <div>
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">sRGB</p>
          <div style="height: 50px; border-radius: var(--radius-md); background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)"></div>
        </div>
        <div style="margin-top: var(--spacing-sm)">
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">OKLAB — more perceptually even brightness</p>
          <div style="height: 50px; border-radius: var(--radius-md); background: linear-gradient(in oklab to right, red, yellow, lime, cyan, blue, magenta, red)"></div>
        </div>
      </div>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> OKLAB is best used indirectly — as the interpolation space for <code>color-mix(in oklab, ...)</code> and gradients. For direct color authoring, use its polar form <strong>OKLCH</strong> instead, which gives you intuitive hue and chroma controls.</p>
      </div>
      <pre><code>/* Use OKLAB as an interpolation space */
background: linear-gradient(in oklab, var(--color-start), var(--color-end));

/* Or in color-mix */
color: color-mix(in oklab, var(--brand) 80%, white);</code></pre>
    </section>
  </div>
</template>
