<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'relative-colors')!
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>Relative Color Syntax</h1>
      <p class="subtitle">{{ format.description }}</p>
      <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm)">
        <span class="badge">{{ format.spec }}</span>
        <span class="badge badge--yellow">{{ format.browserSupport }}</span>
      </div>
    </div>

    <section class="section">
      <h2>Syntax</h2>
      <pre><code>/* The "from" keyword decomposes a color into its channels */
/* You then reference those channels by name: l, c, h (for oklch) */

/* Basic: take a color, modify its lightness */
color: oklch(from var(--brand) calc(l + 0.2) c h);

/* Every color function supports relative syntax: */
color: hsl(from var(--brand) h calc(s - 20%) l);       /* desaturate */
color: rgb(from var(--brand) calc(r + 50) g b);        /* boost red */
color: oklch(from var(--brand) l c calc(h + 180));      /* complement */
color: oklch(from var(--brand) l 0 h);                  /* grayscale */
color: oklch(from var(--brand) l c h / 50%);            /* half opacity */

/* Use calc() for mathematical transforms */
color: oklch(from var(--brand) calc(l * 1.3) calc(c * 0.5) h);

/* Chain with custom properties */
:root {
  --base: oklch(0.55 0.2 264);
  --lighter: oklch(from var(--base) calc(l + 0.2) c h);
  --complement: oklch(from var(--base) l c calc(h + 180));
}</code></pre>
    </section>

    <section class="section">
      <h2>Channel Names by Color Space</h2>
      <div class="card" style="overflow-x: auto">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Color space</th>
              <th>Channel 1</th>
              <th>Channel 2</th>
              <th>Channel 3</th>
              <th>Alpha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>rgb(from ...)</code></td>
              <td><code>r</code> (0-255)</td>
              <td><code>g</code> (0-255)</td>
              <td><code>b</code> (0-255)</td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>hsl(from ...)</code></td>
              <td><code>h</code> (0-360)</td>
              <td><code>s</code> (0%-100%)</td>
              <td><code>l</code> (0%-100%)</td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>hwb(from ...)</code></td>
              <td><code>h</code> (0-360)</td>
              <td><code>w</code> (0%-100%)</td>
              <td><code>b</code> (0%-100%)</td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>oklch(from ...)</code></td>
              <td><code>l</code> (0-1)</td>
              <td><code>c</code> (0-0.4)</td>
              <td><code>h</code> (0-360)</td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>oklab(from ...)</code></td>
              <td><code>l</code> (0-1)</td>
              <td><code>a</code></td>
              <td><code>b</code></td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>lab(from ...)</code></td>
              <td><code>l</code> (0-100)</td>
              <td><code>a</code></td>
              <td><code>b</code></td>
              <td><code>alpha</code></td>
            </tr>
            <tr>
              <td><code>lch(from ...)</code></td>
              <td><code>l</code> (0-100)</td>
              <td><code>c</code></td>
              <td><code>h</code> (0-360)</td>
              <td><code>alpha</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <h2>Practical Examples</h2>

      <h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm)">Generate a full palette from one color</h3>
      <pre><code>:root {
  --base: oklch(0.55 0.2 264);

  /* Lightness scale */
  --color-50:  oklch(from var(--base) 0.97 calc(c * 0.1) h);
  --color-100: oklch(from var(--base) 0.93 calc(c * 0.2) h);
  --color-200: oklch(from var(--base) 0.85 calc(c * 0.4) h);
  --color-300: oklch(from var(--base) 0.75 calc(c * 0.6) h);
  --color-400: oklch(from var(--base) 0.65 calc(c * 0.8) h);
  --color-500: oklch(from var(--base) l c h);
  --color-600: oklch(from var(--base) calc(l - 0.08) c h);
  --color-700: oklch(from var(--base) calc(l - 0.16) calc(c * 0.8) h);
  --color-800: oklch(from var(--base) calc(l - 0.24) calc(c * 0.6) h);
  --color-900: oklch(from var(--base) calc(l - 0.32) calc(c * 0.4) h);
}</code></pre>
      <div style="margin-top: var(--spacing-sm)">
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div style="flex:1; background: oklch(0.97 0.02 264)"></div>
          <div style="flex:1; background: oklch(0.93 0.04 264)"></div>
          <div style="flex:1; background: oklch(0.85 0.08 264)"></div>
          <div style="flex:1; background: oklch(0.75 0.12 264)"></div>
          <div style="flex:1; background: oklch(0.65 0.16 264)"></div>
          <div style="flex:1; background: oklch(0.55 0.2 264)"></div>
          <div style="flex:1; background: oklch(0.47 0.2 264)"></div>
          <div style="flex:1; background: oklch(0.39 0.16 264)"></div>
          <div style="flex:1; background: oklch(0.31 0.12 264)"></div>
          <div style="flex:1; background: oklch(0.23 0.08 264)"></div>
        </div>
      </div>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Color harmony from a single token</h3>
      <pre><code>:root {
  --brand: oklch(0.65 0.18 264);
  --complement: oklch(from var(--brand) l c calc(h + 180));
  --triadic-1:  oklch(from var(--brand) l c calc(h + 120));
  --triadic-2:  oklch(from var(--brand) l c calc(h + 240));
  --analogous-1: oklch(from var(--brand) l c calc(h - 30));
  --analogous-2: oklch(from var(--brand) l c calc(h + 30));
}</code></pre>
      <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm); flex-wrap: wrap">
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 264)"></div>
          <code style="font-size: 0.7rem">base</code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 84)"></div>
          <code style="font-size: 0.7rem">+180°</code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 24)"></div>
          <code style="font-size: 0.7rem">+120°</code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 144)"></div>
          <code style="font-size: 0.7rem">+240°</code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 234)"></div>
          <code style="font-size: 0.7rem">-30°</code>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-xs)">
          <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: oklch(0.65 0.18 294)"></div>
          <code style="font-size: 0.7rem">+30°</code>
        </div>
      </div>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Accessible text colors</h3>
      <pre><code>/* Automatically generate a readable text color from any background */
.auto-contrast {
  --bg: oklch(0.55 0.2 264);
  background: var(--bg);

  /* Force lightness to very light for text on dark bg */
  color: oklch(from var(--bg) 0.95 calc(c * 0.3) h);
}

/* Or force it dark for light backgrounds */
.auto-contrast-light {
  --bg: oklch(0.92 0.04 264);
  background: var(--bg);
  color: oklch(from var(--bg) 0.2 calc(c * 0.5) h);
}</code></pre>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Dark mode inversion</h3>
      <pre><code>/* Flip lightness for dark mode while keeping hue and chroma */
@media (prefers-color-scheme: dark) {
  :root {
    --surface: oklch(from var(--surface-light) calc(1 - l) c h);
    --text: oklch(from var(--text-light) calc(1 - l) c h);
  }
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> Relative color syntax is the most powerful CSS color feature for theming. It lets you build entire design systems from a single base color — no JavaScript, no build tools, no preprocessors. Combine it with OKLCH for the best results.</p>
      </div>
    </section>
  </div>
</template>
