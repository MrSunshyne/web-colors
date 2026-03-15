<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'oklch')!

const l = ref(0.42)
const c = ref(0.17)
const h = ref(306)

const colorValue = computed(() => `oklch(${l.value} ${c.value} ${h.value})`)
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>{{ format.name }} <span class="badge badge--green" style="font-size: var(--text-sm); vertical-align: middle">Recommended</span></h1>
      <p class="subtitle">{{ format.description }}</p>
      <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm)">
        <span class="badge">{{ format.spec }}</span>
        <span class="badge badge--green">{{ format.browserSupport }}</span>
      </div>
    </div>

    <section class="section">
      <h2>Syntax</h2>
      <pre><code>/* OKLCH syntax */
color: oklch(0.42 0.17 306);
color: oklch(0.42 0.17 306 / 50%);

/* L: 0 (black) to 1 (white) — true perceptual lightness */
/* C: 0 (gray) to ~0.4 — chroma (colorfulness) */
/* H: 0-360 — hue angle */

oklch(0.5 0 0)       /* neutral gray — zero chroma */
oklch(0.7 0.2 25)    /* warm red-orange */
oklch(0.7 0.2 145)   /* natural green */
oklch(0.7 0.2 264)   /* vibrant blue */

/* Percentage syntax */
oklch(42% 0.17 306);
oklch(42% 42.5% 306);   /* chroma as % of 0.4 */</code></pre>
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
            <label>Chroma (C) <code>{{ c }}</code></label>
            <input type="range" v-model.number="c" min="0" max="0.4" step="0.005">
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
      <h2>Why OKLCH Is the Best Format for Design Systems</h2>

      <div style="margin-top: var(--spacing-lg)">
        <h3 style="margin-bottom: var(--spacing-sm)">1. True Perceptual Uniformity</h3>
        <p style="margin-bottom: var(--spacing-md)">Colors at the same L value genuinely look like the same brightness:</p>

        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">HSL at "50% lightness" — clearly uneven:</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: var(--spacing-md)">
          <div v-for="hue in [0, 40, 60, 120, 180, 240, 280, 330]" :key="'hsl'+hue"
            :style="{ flex: 1, background: `hsl(${hue} 100% 50%)` }"
          ></div>
        </div>

        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">OKLCH at L=0.7 — perceptually even:</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="hue in [0, 40, 60, 120, 180, 240, 280, 330]" :key="'oklch'+hue"
            :style="{ flex: 1, background: `oklch(0.7 0.15 ${hue})` }"
          ></div>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <h3 style="margin-bottom: var(--spacing-sm)">2. Predictable Palette Generation</h3>
        <p style="margin-bottom: var(--spacing-md)">Build a 10-step lightness scale by changing only L, and every step looks like equal effort:</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="lv in [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.93, 0.97]" :key="lv"
            :style="{ flex: 1, background: `oklch(${lv} 0.15 264)` }"
          ></div>
        </div>
        <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">oklch(0.15..0.97 0.15 264)</code>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <h3 style="margin-bottom: var(--spacing-sm)">3. Hue Rotation Without Brightness Shifts</h3>
        <p style="margin-bottom: var(--spacing-md)">Rotate the hue while keeping L and C constant — every color looks equally bright and saturated:</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="hue in Array.from({length: 24}, (_, i) => i * 15)" :key="hue"
            :style="{ flex: 1, background: `oklch(0.7 0.15 ${hue})` }"
          ></div>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <h3 style="margin-bottom: var(--spacing-sm)">4. Chroma Scale</h3>
        <p style="margin-bottom: var(--spacing-md)">From gray to full vividity, with smooth transitions:</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="cv in [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.13, 0.16, 0.2, 0.25]" :key="cv"
            :style="{ flex: 1, background: `oklch(0.65 ${cv} 264)` }"
          ></div>
        </div>
        <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">oklch(0.65 0..0.25 264)</code>
      </div>
    </section>

    <section class="section">
      <h2>OKLCH Hue Map</h2>
      <p>A reference for the OKLCH hue wheel. Key hues to remember:</p>
      <div class="card" style="margin-top: var(--spacing-lg); overflow-x: auto">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Hue°</th>
              <th>Color</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in [
              { hue: 0, name: 'Pink/Rose' },
              { hue: 30, name: 'Red/Warm red' },
              { hue: 60, name: 'Orange' },
              { hue: 85, name: 'Yellow' },
              { hue: 120, name: 'Lime/Yellow-green' },
              { hue: 145, name: 'Green' },
              { hue: 180, name: 'Teal/Cyan' },
              { hue: 220, name: 'Sky blue' },
              { hue: 264, name: 'Blue' },
              { hue: 290, name: 'Indigo/Violet' },
              { hue: 320, name: 'Purple/Magenta' },
              { hue: 345, name: 'Hot pink' },
            ]" :key="entry.hue">
              <td><code>{{ entry.hue }}°</code></td>
              <td>{{ entry.name }}</td>
              <td>
                <div style="display: flex; gap: 2px">
                  <div v-for="lv in [0.3, 0.5, 0.7, 0.85]" :key="lv"
                    :style="{ width: '30px', height: '30px', borderRadius: 'var(--radius-sm)', background: `oklch(${lv} 0.15 ${entry.hue})` }"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> OKLCH is the gold standard for theming. Define your base colors with OKLCH custom properties. Combine with <code>color-mix()</code> and relative color syntax for a complete, dynamic design system. See the <NuxtLink to="/theming">Theming guide</NuxtLink>.</p>
      </div>
      <pre><code>/* OKLCH theming — the modern approach */
:root {
  --brand-hue: 264;
  --brand-chroma: 0.15;

  /* Base palette */
  --brand-50:  oklch(0.97 0.01 var(--brand-hue));
  --brand-100: oklch(0.93 0.03 var(--brand-hue));
  --brand-200: oklch(0.87 0.06 var(--brand-hue));
  --brand-300: oklch(0.78 0.09 var(--brand-hue));
  --brand-400: oklch(0.68 0.12 var(--brand-hue));
  --brand-500: oklch(0.58 var(--brand-chroma) var(--brand-hue));
  --brand-600: oklch(0.48 var(--brand-chroma) var(--brand-hue));
  --brand-700: oklch(0.38 0.12 var(--brand-hue));
  --brand-800: oklch(0.28 0.09 var(--brand-hue));
  --brand-900: oklch(0.20 0.06 var(--brand-hue));
}

/* Re-theme: just change the hue */
[data-theme="ocean"]  { --brand-hue: 230; }
[data-theme="forest"] { --brand-hue: 145; }
[data-theme="sunset"] { --brand-hue: 30; }

/* Unlike HSL, the brightness STAYS CONSISTENT
   across all theme hues. That's OKLCH's superpower. */</code></pre>
    </section>
  </div>
</template>
