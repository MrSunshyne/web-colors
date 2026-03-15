<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'lch')!

const l = ref(33.6)
const c = ref(67)
const h = ref(314)

const colorValue = computed(() => `lch(${l.value} ${c.value} ${h.value})`)
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
      <pre><code>/* LCH syntax */
color: lch(33.6 67 314);
color: lch(33.6 67 314 / 50%);

/* L: 0 (black) to 100 (white) — perceptual lightness */
/* C: 0 (gray) to ~230 — chroma (colorfulness) */
/* H: 0-360 — hue angle (like HSL) */

lch(50 0 0)       /* neutral gray — zero chroma */
lch(50 80 0)      /* vivid red */
lch(50 80 120)    /* vivid green */
lch(50 80 270)    /* vivid blue */</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Lightness (L) <code>{{ l }}</code></label>
            <input type="range" v-model.number="l" min="0" max="100" step="0.5">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Chroma (C) <code>{{ c }}</code></label>
            <input type="range" v-model.number="c" min="0" max="150" step="1">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Hue (H) <code>{{ h }}°</code></label>
            <input type="range" v-model.number="h" min="0" max="360" step="1">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>LCH vs HSL: The Hue Shift Problem</h2>
      <p>LCH inherits a known issue from CIE Lab: <strong>hue shifts</strong> during interpolation. When you create a gradient between two LCH colors, the intermediate colors may shift in hue unexpectedly, especially around blues.</p>

      <div style="margin-top: var(--spacing-lg)">
        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">LCH gradient (blue → white) — notice the purple shift:</p>
        <div style="height: 60px; border-radius: var(--radius-md); background: linear-gradient(in lch to right, lch(30 100 270), lch(100 0 270))"></div>
      </div>
      <div style="margin-top: var(--spacing-md)">
        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">OKLCH gradient (same colors) — no hue shift:</p>
        <div style="height: 60px; border-radius: var(--radius-md); background: linear-gradient(in oklch to right, oklch(0.4 0.2 264), oklch(1 0 264))"></div>
      </div>
      <div class="info-box" style="margin-top: var(--spacing-md)">
        <p>This is why <strong>OKLCH is preferred over LCH</strong> for most use cases. OKLCH was specifically designed to eliminate these hue shifts while keeping the same intuitive L/C/H model.</p>
      </div>
    </section>

    <section class="section">
      <h2>Chroma vs Saturation</h2>
      <p>Chroma measures absolute colorfulness, while HSL's saturation is relative. This means:</p>
      <div class="grid-2" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">HSL: 100% saturation varies by lightness</h4>
          <div style="display: flex; gap: 2px; height: 50px; border-radius: var(--radius-sm); overflow: hidden">
            <div v-for="lt in [20, 35, 50, 65, 80]" :key="lt"
              :style="{ flex: 1, background: `hsl(288 100% ${lt}%)` }"
            ></div>
          </div>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--spacing-xs)">All "100% saturated" but visually very different in vibrancy</p>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">LCH: Chroma 80 is consistent</h4>
          <div style="display: flex; gap: 2px; height: 50px; border-radius: var(--radius-sm); overflow: hidden">
            <div v-for="lt in [25, 38, 50, 63, 75]" :key="lt"
              :style="{ flex: 1, background: `lch(${lt} 80 314)` }"
            ></div>
          </div>
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: var(--spacing-xs)">Same chroma at every lightness — consistent vibrancy</p>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> LCH is a strong theming format — perceptual lightness + hue angle makes palette generation reliable. But OKLCH fixes the hue shift issues, so there's little reason to choose LCH over OKLCH for new projects.</p>
      </div>
    </section>
  </div>
</template>
