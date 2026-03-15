<script setup lang="ts">
const brandHue = ref(264)
const brandChroma = ref(0.15)
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>Building Theming Systems</h1>
      <p class="subtitle">How to use modern CSS color formats to build flexible, maintainable, and accessible theming systems — from simple to advanced.</p>
    </div>

    <!-- TL;DR -->
    <section class="section">
      <h2>The Short Version</h2>
      <div class="info-box">
        <p><strong>Use OKLCH for your color tokens.</strong> Use <code>color-mix(in oklch, ...)</code> to derive tints and shades. Use relative color syntax for advanced channel manipulation. Store your base hue and chroma as CSS custom properties so themes can be swapped by changing two numbers.</p>
      </div>
    </section>

    <!-- Level 1: HSL approach -->
    <section class="section">
      <h2>Level 1: The HSL Approach (Legacy)</h2>
      <p>The classic method that many CSS frameworks still use. Simple to understand, but has perceptual uniformity problems.</p>

      <pre style="margin-top: var(--spacing-lg)"><code>/* The classic HSL theming pattern */
:root {
  --hue: 264;
  --sat: 60%;

  --primary:     hsl(var(--hue) var(--sat) 45%);
  --primary-fg:  hsl(var(--hue) var(--sat) 98%);
  --surface:     hsl(var(--hue) 10% 98%);
  --surface-alt: hsl(var(--hue) 10% 94%);
  --text:        hsl(var(--hue) 10% 15%);
  --text-muted:  hsl(var(--hue) 8% 45%);
  --border:      hsl(var(--hue) 10% 85%);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --primary:     hsl(var(--hue) var(--sat) 65%);
    --primary-fg:  hsl(var(--hue) var(--sat) 10%);
    --surface:     hsl(var(--hue) 10% 10%);
    --surface-alt: hsl(var(--hue) 10% 14%);
    --text:        hsl(var(--hue) 10% 92%);
    --text-muted:  hsl(var(--hue) 8% 60%);
    --border:      hsl(var(--hue) 10% 22%);
  }
}

/* Theme switching: just change the hue */
[data-theme="ocean"]  { --hue: 210; }
[data-theme="forest"] { --hue: 150; }
[data-theme="rose"]   { --hue: 350; }</code></pre>

      <div class="card" style="margin-top: var(--spacing-lg)">
        <h4 style="margin-bottom: var(--spacing-sm)">Problem with HSL theming</h4>
        <p style="font-size: var(--text-sm)">When you change the hue from 264 (blue) to 60 (yellow), the perceived brightness changes dramatically — even though the lightness % stays the same. A yellow theme looks washed out, while a blue theme looks too dark. This is the perceptual non-uniformity problem.</p>
        <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-md)">
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: hsl(264 60% 45%); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">hsl(264 60% 45%)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: hsl(60 60% 45%); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">hsl(60 60% 45%)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: hsl(150 60% 45%); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">hsl(150 60% 45%)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: hsl(350 60% 45%); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">hsl(350 60% 45%)</code>
          </div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-sm)">Same lightness (45%), very different perceived brightness. Yellow looks way brighter.</p>
      </div>
    </section>

    <!-- Level 2: OKLCH approach -->
    <section class="section">
      <h2>Level 2: The OKLCH Approach (Recommended)</h2>
      <p>OKLCH solves the perceptual uniformity problem. Swapping hues produces themes that genuinely look equally bright.</p>

      <pre style="margin-top: var(--spacing-lg)"><code>:root {
  --hue: 264;
  --chroma: 0.15;

  --primary:     oklch(0.55 var(--chroma) var(--hue));
  --primary-fg:  oklch(0.98 0.01 var(--hue));
  --surface:     oklch(0.98 0.005 var(--hue));
  --surface-alt: oklch(0.95 0.01 var(--hue));
  --text:        oklch(0.2 0.02 var(--hue));
  --text-muted:  oklch(0.5 0.02 var(--hue));
  --border:      oklch(0.85 0.01 var(--hue));
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary:     oklch(0.75 var(--chroma) var(--hue));
    --primary-fg:  oklch(0.15 0.01 var(--hue));
    --surface:     oklch(0.18 0.01 var(--hue));
    --surface-alt: oklch(0.22 0.015 var(--hue));
    --text:        oklch(0.92 0.01 var(--hue));
    --text-muted:  oklch(0.65 0.02 var(--hue));
    --border:      oklch(0.3 0.015 var(--hue));
  }
}</code></pre>

      <div class="card" style="margin-top: var(--spacing-lg)">
        <h4 style="margin-bottom: var(--spacing-sm)">OKLCH themes: consistent brightness</h4>
        <div style="display: flex; gap: var(--spacing-sm)">
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: oklch(0.55 0.15 264); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">oklch(0.55 0.15 264)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: oklch(0.55 0.15 85); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">oklch(0.55 0.15 85)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: oklch(0.55 0.15 150); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">oklch(0.55 0.15 150)</code>
          </div>
          <div style="flex: 1; text-align: center">
            <div style="height: 50px; border-radius: var(--radius-md); background: oklch(0.55 0.15 350); margin-bottom: var(--spacing-xs)"></div>
            <code style="font-size: 0.7rem">oklch(0.55 0.15 350)</code>
          </div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-sm)">All look the same brightness. That's the OKLCH advantage.</p>
      </div>
    </section>

    <!-- Interactive theme builder -->
    <section class="section">
      <h2>Interactive Theme Builder</h2>
      <p>Adjust the hue and chroma to see how OKLCH produces consistent themes.</p>

      <div style="margin-top: var(--spacing-lg)">
        <div class="grid-2">
          <div>
            <div class="slider-group">
              <label>Brand Hue <code>{{ brandHue }}°</code></label>
              <input type="range" v-model.number="brandHue" min="0" max="360">
            </div>
            <div class="slider-group" style="margin-top: var(--spacing-md)">
              <label>Brand Chroma <code>{{ brandChroma }}</code></label>
              <input type="range" v-model.number="brandChroma" min="0" max="0.3" step="0.005">
            </div>
          </div>
          <div>
            <pre><code>--hue: {{ brandHue }};
--chroma: {{ brandChroma }};</code></pre>
          </div>
        </div>

        <!-- Generated palette -->
        <div style="margin-top: var(--spacing-lg)">
          <h4 style="margin-bottom: var(--spacing-sm)">Generated palette</h4>
          <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="(lv, i) in [0.97, 0.93, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.18]" :key="i"
              :style="{ flex: 1, background: `oklch(${lv} ${Math.min(brandChroma, lv < 0.3 || lv > 0.9 ? brandChroma * 0.3 : brandChroma)} ${brandHue})` }"
            ></div>
          </div>
          <div style="display: flex; gap: 2px; margin-top: 2px">
            <div v-for="(label, i) in ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']" :key="i"
              style="flex: 1; text-align: center; font-size: 0.65rem; color: var(--color-text-muted)"
            >{{ label }}</div>
          </div>
        </div>

        <!-- Theme preview -->
        <div class="card" style="margin-top: var(--spacing-lg);">
          <h4 style="margin-bottom: var(--spacing-md)">Theme preview</h4>
          <div
            :style="{
              background: `oklch(0.98 0.005 ${brandHue})`,
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-lg)',
              border: `1px solid oklch(0.85 0.01 ${brandHue})`
            }"
          >
            <div
              :style="{
                background: `oklch(0.55 ${brandChroma} ${brandHue})`,
                color: `oklch(0.98 0.01 ${brandHue})`,
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                display: 'inline-block',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--spacing-md)'
              }"
            >
              Primary Button
            </div>
            <p :style="{ color: `oklch(0.2 0.02 ${brandHue})`, marginBottom: 'var(--spacing-xs)' }">
              <strong>This is body text</strong> on the theme's surface color.
            </p>
            <p :style="{ color: `oklch(0.5 0.02 ${brandHue})`, fontSize: 'var(--text-sm)' }">
              This is muted text — secondary information.
            </p>
            <div
              :style="{
                marginTop: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: `oklch(0.95 0.01 ${brandHue})`,
                borderRadius: 'var(--radius-md)',
                border: `1px solid oklch(0.88 0.01 ${brandHue})`
              }"
            >
              <p :style="{ fontSize: 'var(--text-sm)', color: `oklch(0.35 0.02 ${brandHue})` }">A card component on the alternate surface.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Level 3: color-mix -->
    <section class="section">
      <h2>Level 3: Derived Tokens with color-mix()</h2>
      <p>Instead of defining every shade manually, derive them from a single base color. This is how you replace Sass color functions with pure CSS.</p>

      <pre style="margin-top: var(--spacing-lg)"><code>:root {
  --brand: oklch(0.55 0.18 264);

  /* Derived surface colors */
  --brand-surface: color-mix(in oklch, var(--brand) 6%, white);
  --brand-surface-hover: color-mix(in oklch, var(--brand) 12%, white);

  /* Derived interactive states */
  --brand-hover: color-mix(in oklch, var(--brand) 85%, black);
  --brand-active: color-mix(in oklch, var(--brand) 70%, black);
  --brand-disabled: color-mix(in oklch, var(--brand) 40%, oklch(0.7 0 0));

  /* Derived border */
  --brand-border: color-mix(in oklch, var(--brand) 25%, oklch(0.85 0 0));

  /* Transparent variants */
  --brand-ghost: color-mix(in oklch, var(--brand) 15%, transparent);
}

/* Change --brand and EVERYTHING updates.
   One custom property to rule them all. */</code></pre>

      <div style="margin-top: var(--spacing-md)">
        <h4 style="margin-bottom: var(--spacing-sm)">Generated from one color</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--spacing-sm)">
          <div v-for="item in [
            { label: 'surface', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 6%, white)' },
            { label: 'surface-hover', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 12%, white)' },
            { label: 'brand', bg: 'oklch(0.55 0.18 264)' },
            { label: 'hover', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 85%, black)' },
            { label: 'active', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 70%, black)' },
            { label: 'disabled', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 40%, oklch(0.7 0 0))' },
            { label: 'border', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 25%, oklch(0.85 0 0))' },
            { label: 'ghost', bg: 'color-mix(in oklch, oklch(0.55 0.18 264) 15%, transparent)' },
          ]" :key="item.label" style="text-align: center">
            <div :style="{ height: '50px', borderRadius: 'var(--radius-md)', background: item.bg, border: '1px solid var(--color-border)' }"></div>
            <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">{{ item.label }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Level 4: Relative colors -->
    <section class="section">
      <h2>Level 4: Single-Token Systems with Relative Colors</h2>
      <p>The most powerful approach: derive your <em>entire</em> design system from a single CSS custom property.</p>

      <pre style="margin-top: var(--spacing-lg)"><code>:root {
  /* ONE token defines your entire theme */
  --brand: oklch(0.55 0.2 264);

  /* Full palette via relative color syntax */
  --primary:      var(--brand);
  --primary-light: oklch(from var(--brand) calc(l + 0.2) calc(c * 0.5) h);
  --primary-dark:  oklch(from var(--brand) calc(l - 0.15) c h);
  --primary-bg:    oklch(from var(--brand) 0.97 calc(c * 0.1) h);

  /* Semantic colors derived from brand */
  --success:   oklch(from var(--brand) 0.65 0.18 145);
  --warning:   oklch(from var(--brand) 0.8 0.15 85);
  --error:     oklch(from var(--brand) 0.6 0.2 25);
  --info:      oklch(from var(--brand) l c h);  /* same as brand */

  /* Complement for accent */
  --accent:    oklch(from var(--brand) l c calc(h + 180));

  /* Neutral palette tinted with brand hue */
  --gray-50:   oklch(from var(--brand) 0.97 0.005 h);
  --gray-100:  oklch(from var(--brand) 0.93 0.005 h);
  --gray-200:  oklch(from var(--brand) 0.87 0.01 h);
  --gray-500:  oklch(from var(--brand) 0.55 0.01 h);
  --gray-800:  oklch(from var(--brand) 0.25 0.01 h);
  --gray-900:  oklch(from var(--brand) 0.18 0.015 h);
}

/* Theme switch: change ONE value, entire UI updates */
[data-theme="ocean"]  { --brand: oklch(0.55 0.15 220); }
[data-theme="forest"] { --brand: oklch(0.55 0.15 145); }
[data-theme="sunset"] { --brand: oklch(0.6 0.2 30); }</code></pre>

      <div class="info-box" style="margin-top: var(--spacing-lg)">
        <p><strong>Why is this powerful?</strong> One custom property change cascades through your entire UI. The brand color, semantic colors, neutral grays, and all derived states update automatically. No JavaScript, no build step, no preprocessor. Just CSS.</p>
      </div>
    </section>

    <!-- Dark mode strategies -->
    <section class="section">
      <h2>Dark Mode Strategies</h2>

      <h3 style="margin-top: var(--spacing-lg); margin-bottom: var(--spacing-sm)">Strategy 1: Manual token swap (most control)</h3>
      <pre><code>:root {
  --surface: oklch(0.98 0.005 264);
  --text: oklch(0.2 0.02 264);
}
@media (prefers-color-scheme: dark) {
  :root {
    --surface: oklch(0.18 0.01 264);
    --text: oklch(0.92 0.01 264);
  }
}</code></pre>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Strategy 2: Lightness inversion with relative colors</h3>
      <pre><code>:root {
  --base-surface: oklch(0.98 0.005 264);
  --base-text: oklch(0.2 0.02 264);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Flip lightness: 0.98 → 0.02, 0.2 → 0.8 */
    --surface: oklch(from var(--base-surface) calc(1 - l) c h);
    --text: oklch(from var(--base-text) calc(1 - l) c h);
  }
}</code></pre>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Strategy 3: light-dark() function</h3>
      <pre><code>:root {
  color-scheme: light dark;

  --surface: light-dark(
    oklch(0.98 0.005 264),
    oklch(0.18 0.01 264)
  );
  --text: light-dark(
    oklch(0.2 0.02 264),
    oklch(0.92 0.01 264)
  );
}
/* The browser picks the right value based on
   the user's color-scheme preference. Clean and simple. */</code></pre>

      <h3 style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-sm)">Strategy 4: Lightness-as-variable pattern</h3>
      <pre><code>:root {
  --L-base: 0.98;
  --L-text: 0.2;
  --L-muted: 0.5;
  --L-primary: 0.55;
  --hue: 264;
}
@media (prefers-color-scheme: dark) {
  :root {
    --L-base: 0.15;
    --L-text: 0.92;
    --L-muted: 0.65;
    --L-primary: 0.75;
  }
}
/* Use the lightness variables in your tokens */
.surface   { background: oklch(var(--L-base) 0.005 var(--hue)); }
.text      { color: oklch(var(--L-text) 0.02 var(--hue)); }
.primary   { background: oklch(var(--L-primary) 0.15 var(--hue)); }</code></pre>
    </section>

    <!-- Accessibility -->
    <section class="section">
      <h2>Accessibility and Contrast</h2>
      <p>OKLCH's perceptual lightness makes contrast reasoning much simpler.</p>

      <div class="card" style="margin-top: var(--spacing-lg)">
        <h4 style="margin-bottom: var(--spacing-md)">The OKLCH contrast rule of thumb</h4>
        <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-md)">For WCAG AA contrast (4.5:1 for normal text), ensure a lightness difference of roughly <strong>0.4-0.5</strong> between text and background.</p>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm)">
          <div style="display: flex; gap: var(--spacing-sm); align-items: center">
            <div style="flex: 1; padding: var(--spacing-md); border-radius: var(--radius-md); background: oklch(0.95 0.01 264); color: oklch(0.45 0.1 264)">
              L: 0.95 bg, 0.45 text (diff: 0.50) — AA pass
            </div>
          </div>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center">
            <div style="flex: 1; padding: var(--spacing-md); border-radius: var(--radius-md); background: oklch(0.95 0.01 264); color: oklch(0.55 0.1 264)">
              L: 0.95 bg, 0.55 text (diff: 0.40) — borderline
            </div>
          </div>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center">
            <div style="flex: 1; padding: var(--spacing-md); border-radius: var(--radius-md); background: oklch(0.95 0.01 264); color: oklch(0.7 0.1 264)">
              L: 0.95 bg, 0.70 text (diff: 0.25) — AA fail
            </div>
          </div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-md)">
          This is a heuristic, not a replacement for actual WCAG contrast calculation. But OKLCH lightness correlates well with perceived contrast, making it a useful quick check.
        </p>
      </div>
    </section>

    <!-- Comparison: which approach when? -->
    <section class="section">
      <h2>Which Approach Should You Use?</h2>
      <div class="card" style="overflow-x: auto">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Approach</th>
              <th>Complexity</th>
              <th>Flexibility</th>
              <th>Browser support</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>HSL custom properties</strong></td>
              <td>Low</td>
              <td>Medium</td>
              <td>Universal</td>
              <td>Simple sites, legacy support</td>
            </tr>
            <tr>
              <td><strong>OKLCH tokens</strong></td>
              <td>Low</td>
              <td>High</td>
              <td>Modern</td>
              <td>Most projects today</td>
            </tr>
            <tr>
              <td><strong>color-mix() derived</strong></td>
              <td>Medium</td>
              <td>High</td>
              <td>Modern</td>
              <td>Design systems with many variants</td>
            </tr>
            <tr>
              <td><strong>Relative color syntax</strong></td>
              <td>High</td>
              <td>Maximum</td>
              <td>Cutting edge</td>
              <td>Advanced theming, user-customizable UI</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="info-box" style="margin-top: var(--spacing-lg)">
        <p><strong>Recommendation:</strong> Start with OKLCH tokens. Add <code>color-mix()</code> when you find yourself defining too many individual tokens. Adopt relative colors when you need maximum flexibility and your browser support targets allow it.</p>
      </div>
    </section>

    <!-- Real-world examples -->
    <section class="section">
      <h2>Real-World Pattern: Component Theming</h2>
      <pre><code>/* Button with automatic variants from one color */
.btn {
  --btn-color: var(--primary);

  background: var(--btn-color);
  color: oklch(from var(--btn-color) 0.98 calc(c * 0.2) h);
  border: 1px solid color-mix(in oklch, var(--btn-color) 80%, black);
  border-radius: var(--radius-md);
  padding: 0.5em 1.25em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.btn:hover {
  background: color-mix(in oklch, var(--btn-color) 85%, black);
}
.btn:active {
  background: color-mix(in oklch, var(--btn-color) 70%, black);
}

/* Variant: just change the color token */
.btn--success { --btn-color: oklch(0.6 0.18 145); }
.btn--danger  { --btn-color: oklch(0.6 0.2 25); }
.btn--ghost {
  background: transparent;
  color: var(--btn-color);
  border-color: var(--btn-color);
}
.btn--ghost:hover {
  background: color-mix(in oklch, var(--btn-color) 10%, transparent);
}</code></pre>
    </section>
  </div>
</template>
