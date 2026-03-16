<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'lab')!

const l = ref(33.6)
const a = ref(46.3)
const b = ref(-48.5)

const colorValue = computed(() => `lab(${l.value} ${a.value} ${b.value})`)
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
      <pre><code>/* LAB syntax */
color: lab(33.6 46.3 -48.5);
color: lab(33.6 46.3 -48.5 / 50%);

/* L: 0 (black) to 100 (white) — perceptual lightness */
/* a: negative = green, positive = red */
/* b: negative = blue, positive = yellow */

lab(50 0 0)       /* neutral gray */
lab(50 80 0)      /* vivid red */
lab(50 -80 0)     /* vivid green */
lab(50 0 80)      /* vivid yellow */
lab(50 0 -80)     /* vivid blue */</code></pre>
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
            <label>a (green↔red) <code>{{ a }}</code></label>
            <input type="range" v-model.number="a" min="-125" max="125" step="0.5">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>b (blue↔yellow) <code>{{ b }}</code></label>
            <input type="range" v-model.number="b" min="-125" max="125" step="0.5">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Understanding the a/b Axes</h2>
      <div class="grid-2" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">The <code>a</code> axis: green ↔ red</h4>
          <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="av in [-100, -75, -50, -25, 0, 25, 50, 75, 100]" :key="av"
              :style="{ flex: 1, background: `lab(60 ${av} 0)` }"
            ></div>
          </div>
          <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">lab(60 -100..100 0)</code>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">The <code>b</code> axis: blue ↔ yellow</h4>
          <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="bv in [-100, -75, -50, -25, 0, 25, 50, 75, 100]" :key="bv"
              :style="{ flex: 1, background: `lab(60 0 ${bv})` }"
            ></div>
          </div>
          <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">lab(60 0 -100..100)</code>
        </div>
      </div>
      <div class="info-box" style="margin-top: var(--spacing-lg)">
        <p>The a/b axes are hard to reason about for most designers. That's why <strong>LCH</strong> exists — it converts these Cartesian coordinates into the more intuitive polar coordinates of Chroma and Hue. And <strong>OKLCH</strong> improves on LCH's uniformity.</p>
      </div>
    </section>

    <section class="section">
      <h2>Perceptual Uniformity</h2>
      <p>LAB's key advantage: equal numeric steps produce roughly equal perceived changes. Here's a lightness ramp:</p>
      <div style="margin-top: var(--spacing-lg)">
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="lv in [10, 20, 30, 40, 50, 60, 70, 80, 90]" :key="lv"
            :style="{ flex: 1, background: `lab(${lv} 0 0)` }"
          ></div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-xs)">Each step looks like the same amount of change. Compare this with HSL's lightness ramp, where steps are uneven.</p>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> LAB is powerful for color science but its Cartesian a/b axes make it impractical for theming. Use LCH or OKLCH instead — they give you the same perceptual benefits with an intuitive hue angle.</p>
      </div>
    </section>
  </div>
</template>
