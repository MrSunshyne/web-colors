<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'hsl')!

const h = ref(288)
const s = ref(52)
const l = ref(37)
const a = ref(100)

const colorValue = computed(() => `hsl(${h.value} ${s.value}% ${l.value}% / ${a.value}%)`)
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
      <pre><code>/* Modern syntax (recommended) */
color: hsl(288 52% 37%);
color: hsl(288 52% 37% / 50%);

/* Legacy syntax */
color: hsl(288, 52%, 37%);
color: hsla(288, 52%, 37%, 0.5);

/* Hue accepts any angle unit */
color: hsl(288deg 52% 37%);
color: hsl(5.03rad 52% 37%);
color: hsl(0.8turn 52% 37%);</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Hue <code>{{ h }}°</code></label>
            <input type="range" v-model.number="h" min="0" max="360">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Saturation <code>{{ s }}%</code></label>
            <input type="range" v-model.number="s" min="0" max="100">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Lightness <code>{{ l }}%</code></label>
            <input type="range" v-model.number="l" min="0" max="100">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Alpha <code>{{ a }}%</code></label>
            <input type="range" v-model.number="a" min="0" max="100">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>The Perceptual Uniformity Problem</h2>
      <p>HSL's biggest limitation: "50% lightness" doesn't look the same across all hues. This is why HSL is called <strong>not perceptually uniform</strong>.</p>

      <div style="margin-top: var(--spacing-lg)">
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--spacing-sm)">All these colors are <code>hsl(H 100% 50%)</code> — supposedly the same lightness:</p>
        <div style="display: flex; gap: 2px; height: 80px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="hue in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]" :key="hue"
            :style="{ flex: 1, background: `hsl(${hue} 100% 50%)` }"
          ></div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-sm)">Yellow (60°) appears far brighter than blue (240°), even though both are "50% lightness". Your eyes aren't lying — HSL's lightness is mathematically calculated, not perceptually measured.</p>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--spacing-sm)">Compare with OKLCH at <code>oklch(0.7 0.15 H)</code> — true perceptual uniformity:</p>
        <div style="display: flex; gap: 2px; height: 80px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="hue in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]" :key="hue"
            :style="{ flex: 1, background: `oklch(0.7 0.15 ${hue})` }"
          ></div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-sm)">All these colors genuinely look like the same brightness. That's perceptual uniformity.</p>
      </div>
    </section>

    <section class="section">
      <h2>HSL for Quick Palette Generation</h2>
      <p>Despite its limitations, HSL's hue wheel makes it easy to generate harmonious palettes:</p>

      <div class="grid-2" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Complementary (180° apart)</h4>
          <div style="display: flex; gap: var(--spacing-xs); height: 60px">
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(288 52% 37%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(108 52% 37%)"></div>
          </div>
          <code style="font-size: 0.75rem; margin-top: var(--spacing-xs); display: block">hsl(288 52% 37%) + hsl(108 52% 37%)</code>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Triadic (120° apart)</h4>
          <div style="display: flex; gap: var(--spacing-xs); height: 60px">
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(288 52% 37%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(48 52% 37%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(168 52% 37%)"></div>
          </div>
          <code style="font-size: 0.75rem; margin-top: var(--spacing-xs); display: block">288° / 48° / 168°</code>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Analogous (30° apart)</h4>
          <div style="display: flex; gap: var(--spacing-xs); height: 60px">
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(258 52% 37%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(288 52% 37%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hsl(318 52% 37%)"></div>
          </div>
          <code style="font-size: 0.75rem; margin-top: var(--spacing-xs); display: block">258° / 288° / 318°</code>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Lightness scale</h4>
          <div style="display: flex; gap: var(--spacing-xs); height: 60px">
            <div v-for="lt in [15, 25, 37, 50, 65, 80, 92]" :key="lt"
              :style="{ flex: 1, borderRadius: 'var(--radius-sm)', background: `hsl(288 52% ${lt}%)` }"
            ></div>
          </div>
          <code style="font-size: 0.75rem; margin-top: var(--spacing-xs); display: block">hsl(288 52% 15..92%)</code>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> HSL was the go-to format for CSS theming before OKLCH arrived. The hue/saturation/lightness model maps naturally to theme customization. Its main weakness is the non-uniform lightness — your "light" variants may look inconsistent across different hues.</p>
      </div>
      <pre><code>/* Classic HSL theming pattern */
:root {
  --hue: 288;
  --brand: hsl(var(--hue) 52% 37%);
  --brand-light: hsl(var(--hue) 52% 65%);
  --brand-lighter: hsl(var(--hue) 40% 92%);
  --brand-dark: hsl(var(--hue) 52% 20%);
}

/* Re-theme by changing just the hue */
[data-theme="ocean"] { --hue: 200; }
[data-theme="forest"] { --hue: 145; }
[data-theme="sunset"] { --hue: 25; }

/* The problem: changing hue makes lightness inconsistent.
   A yellow theme (hue: 60) will look brighter than
   a blue theme (hue: 240) at the same lightness values.
   OKLCH solves this — see the OKLCH page. */</code></pre>
    </section>
  </div>
</template>
