<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'color-mix')!

const color1 = ref('#7B2D8E')
const color2 = ref('#FFFFFF')
const pct = ref(50)
const space = ref('oklch')

const mixValue = computed(() => `color-mix(in ${space.value}, ${color1.value} ${pct.value}%, ${color2.value})`)
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
      <pre><code>/* Basic color-mix */
color: color-mix(in oklch, #7B2D8E 50%, white);

/* The interpolation space matters! */
color: color-mix(in srgb, blue, white);    /* may look dull */
color: color-mix(in oklch, blue, white);   /* stays vibrant */

/* Percentages — how much of each color to use */
color: color-mix(in oklch, blue 75%, white);   /* mostly blue */
color: color-mix(in oklch, blue 25%, white);   /* mostly white */

/* Omit percentages for 50/50 */
color: color-mix(in oklch, blue, white);

/* Mix any formats together */
color: color-mix(in oklch, hsl(288 52% 37%), oklch(0.9 0.03 264));

/* Create transparency */
color: color-mix(in oklch, var(--brand) 40%, transparent);</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Color 1</label>
            <input type="color" v-model="color1" style="width: 100%; height: 40px; border: 1px solid var(--color-border); border-radius: var(--radius-sm)">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Color 2</label>
            <input type="color" v-model="color2" style="width: 100%; height: 40px; border: 1px solid var(--color-border); border-radius: var(--radius-sm)">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Mix % <code>{{ pct }}%</code></label>
            <input type="range" v-model.number="pct" min="0" max="100">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Color space</label>
            <select v-model="space" style="width: 100%; padding: var(--spacing-sm); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); font-size: var(--text-sm)">
              <option value="srgb">sRGB</option>
              <option value="hsl">HSL</option>
              <option value="lab">LAB</option>
              <option value="lch">LCH</option>
              <option value="oklab">OKLAB</option>
              <option value="oklch">OKLCH</option>
            </select>
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ mixValue }}</code></pre>
        </div>
        <div>
          <div class="color-preview" :style="{ background: mixValue, marginBottom: 'var(--spacing-sm)' }">
            Mixed
          </div>
          <div style="display: flex; gap: var(--spacing-sm)">
            <div class="color-preview" :style="{ background: color1, flex: 1, aspectRatio: '2/1', minHeight: '60px' }">Color 1</div>
            <div class="color-preview" :style="{ background: color2, flex: 1, aspectRatio: '2/1', minHeight: '60px' }">Color 2</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Interpolation Space Comparison</h2>
      <p>Mixing the same two colors in different spaces produces different results. Use OKLCH for the most natural blending.</p>

      <div style="margin-top: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md)">
        <div v-for="s in ['srgb', 'hsl', 'lab', 'oklch']" :key="s">
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">in {{ s }}</p>
          <div style="display: flex; gap: 2px; height: 50px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="p in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]" :key="p"
              :style="{ flex: 1, background: `color-mix(in ${s}, #0066ff ${p}%, #ff6600)` }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Practical Theming Patterns</h2>

      <h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm)">Tint/shade scale from one color</h3>
      <pre><code>:root {
  --brand: oklch(0.55 0.2 264);
  --brand-50:  color-mix(in oklch, var(--brand) 5%, white);
  --brand-100: color-mix(in oklch, var(--brand) 10%, white);
  --brand-200: color-mix(in oklch, var(--brand) 25%, white);
  --brand-300: color-mix(in oklch, var(--brand) 40%, white);
  --brand-400: color-mix(in oklch, var(--brand) 60%, white);
  --brand-500: var(--brand);
  --brand-600: color-mix(in oklch, var(--brand) 80%, black);
  --brand-700: color-mix(in oklch, var(--brand) 60%, black);
  --brand-800: color-mix(in oklch, var(--brand) 40%, black);
  --brand-900: color-mix(in oklch, var(--brand) 25%, black);
}</code></pre>
      <div style="margin-top: var(--spacing-sm)">
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 5%, white)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 10%, white)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 25%, white)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 40%, white)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 60%, white)"></div>
          <div style="flex:1; background: oklch(0.55 0.2 264)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 80%, black)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 60%, black)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 40%, black)"></div>
          <div style="flex:1; background: color-mix(in oklch, oklch(0.55 0.2 264) 25%, black)"></div>
        </div>
      </div>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Hover/active states</h3>
      <pre><code>.button {
  --bg: var(--brand);
  background: var(--bg);
}
.button:hover {
  /* Mix 15% black for a subtle darken */
  background: color-mix(in oklch, var(--bg) 85%, black);
}
.button:active {
  background: color-mix(in oklch, var(--bg) 70%, black);
}</code></pre>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Semi-transparent overlays</h3>
      <pre><code>/* Instead of rgba or opacity, use color-mix with transparent */
.overlay {
  background: color-mix(in oklch, var(--brand) 30%, transparent);
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> <code>color-mix()</code> is a game-changer for theming. It replaces Sass's <code>lighten()</code>, <code>darken()</code>, <code>mix()</code>, and <code>adjust-color()</code> with native CSS. Combined with custom properties, it enables fully dynamic theming without any build step.</p>
      </div>
    </section>
  </div>
</template>
