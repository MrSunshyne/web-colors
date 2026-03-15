<script setup lang="ts">
const { formats } = useColorFormats()

const gamutLabel = (g: string) => g === 'srgb' ? 'sRGB only' : g === 'p3' ? 'Display P3' : 'Unbounded'
const readLabel = (r: string) => r === 'low' ? 'Low' : r === 'medium' ? 'Medium' : 'High'
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>Format Comparison</h1>
      <p class="subtitle">Side-by-side comparison of every CSS color format across the dimensions that matter for real-world use.</p>
    </div>

    <!-- Main comparison table -->
    <section class="section">
      <h2>Overview</h2>
      <div class="card" style="overflow-x: auto">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Format</th>
              <th>Gamut</th>
              <th>Perceptual</th>
              <th>Readability</th>
              <th>Theming</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in formats" :key="f.id">
              <td>
                <NuxtLink :to="`/formats/${f.slug}`"><strong>{{ f.name }}</strong></NuxtLink>
              </td>
              <td>{{ gamutLabel(f.gamut) }}</td>
              <td>{{ f.perceptuallyUniform ? 'Yes' : 'No' }}</td>
              <td>{{ readLabel(f.humanReadable) }}</td>
              <td>
                <span v-for="i in 5" :key="i" :style="{ opacity: i <= f.themingScore ? 1 : 0.2 }">●</span>
              </td>
              <td>
                <span :class="['badge', f.browserSupport === 'universal' || f.browserSupport === 'modern' ? 'badge--green' : 'badge--yellow']">
                  {{ f.browserSupport }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Visual: same lightness comparison -->
    <section class="section">
      <h2>Perceptual Uniformity Test</h2>
      <p>All colors below are set to "the same lightness" in their respective format. Perceptually uniform formats produce colors that <em>actually look</em> equally bright.</p>

      <div style="margin-top: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-lg)">
        <div>
          <h4 style="margin-bottom: var(--spacing-xs)">HSL — 50% lightness, 100% saturation</h4>
          <div style="display: flex; gap: 2px; height: 70px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="hue in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]" :key="hue"
              :style="{ flex: 1, background: `hsl(${hue} 100% 50%)`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '4px' }"
            >
              <span style="font-size: 0.6rem; color: white; text-shadow: 0 1px 2px black">{{ hue }}°</span>
            </div>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-xs)">Yellow and cyan appear much brighter than blue and red. Not uniform.</p>
        </div>

        <div>
          <h4 style="margin-bottom: var(--spacing-xs)">LCH — L=65, C=80</h4>
          <div style="display: flex; gap: 2px; height: 70px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="hue in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]" :key="hue"
              :style="{ flex: 1, background: `lch(65 80 ${hue})`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '4px' }"
            >
              <span style="font-size: 0.6rem; color: white; text-shadow: 0 1px 2px black">{{ hue }}°</span>
            </div>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-xs)">Much more uniform, but some inconsistency remains (the "blue problem").</p>
        </div>

        <div>
          <h4 style="margin-bottom: var(--spacing-xs)">OKLCH — L=0.7, C=0.15</h4>
          <div style="display: flex; gap: 2px; height: 70px; border-radius: var(--radius-md); overflow: hidden">
            <div v-for="hue in [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]" :key="hue"
              :style="{ flex: 1, background: `oklch(0.7 0.15 ${hue})`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '4px' }"
            >
              <span style="font-size: 0.6rem; color: white; text-shadow: 0 1px 2px black">{{ hue }}°</span>
            </div>
          </div>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-top: var(--spacing-xs)">Truly uniform — every color looks equally bright. This is the goal.</p>
        </div>
      </div>
    </section>

    <!-- Gradient comparison -->
    <section class="section">
      <h2>Gradient Quality</h2>
      <p>Gradients reveal interpolation quality. The same endpoints produce very different midpoints depending on the color space.</p>

      <div style="margin-top: var(--spacing-lg)">
        <h3 style="margin-bottom: var(--spacing-md)">Blue → Yellow</h3>
        <div v-for="s in [
          { name: 'sRGB', css: 'linear-gradient(to right, blue, yellow)' },
          { name: 'HSL (shorter hue)', css: 'linear-gradient(in hsl shorter hue to right, blue, yellow)' },
          { name: 'LAB', css: 'linear-gradient(in lab to right, blue, yellow)' },
          { name: 'OKLCH (shorter hue)', css: 'linear-gradient(in oklch shorter hue to right, blue, yellow)' },
        ]" :key="s.name" style="margin-bottom: var(--spacing-sm)">
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px">{{ s.name }}</p>
          <div :style="{ height: '40px', borderRadius: 'var(--radius-md)', background: s.css }"></div>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl)">
        <h3 style="margin-bottom: var(--spacing-md)">Cyan → Hot Pink</h3>
        <div v-for="s in [
          { name: 'sRGB', css: 'linear-gradient(to right, cyan, hotpink)' },
          { name: 'OKLAB', css: 'linear-gradient(in oklab to right, cyan, hotpink)' },
          { name: 'OKLCH (shorter hue)', css: 'linear-gradient(in oklch shorter hue to right, cyan, hotpink)' },
          { name: 'OKLCH (longer hue)', css: 'linear-gradient(in oklch longer hue to right, cyan, hotpink)' },
        ]" :key="s.name" style="margin-bottom: var(--spacing-sm)">
          <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: 2px">{{ s.name }}</p>
          <div :style="{ height: '40px', borderRadius: 'var(--radius-md)', background: s.css }"></div>
        </div>
      </div>
    </section>

    <!-- When to use what -->
    <section class="section">
      <h2>Decision Guide</h2>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md)">
        <div class="card">
          <h4>You need universal browser support →</h4>
          <p style="color: var(--color-text-muted)">Use <strong>HSL</strong> for human-readable, or <strong>Hex</strong> for compact notation. Both work everywhere.</p>
        </div>
        <div class="card">
          <h4>You're building a design system →</h4>
          <p style="color: var(--color-text-muted)">Use <strong>OKLCH</strong>. Perceptual uniformity means your lightness scales and color palettes work predictably across all hues.</p>
        </div>
        <div class="card">
          <h4>You need dynamic color manipulation in CSS →</h4>
          <p style="color: var(--color-text-muted)">Use <strong>color-mix(in oklch, ...)</strong> for tints/shades/transparency, or <strong>relative color syntax</strong> for channel-level control.</p>
        </div>
        <div class="card">
          <h4>You want the most vibrant colors possible →</h4>
          <p style="color: var(--color-text-muted)">Use <strong>OKLCH with high chroma</strong>. The browser will use Display P3 when available and fall back to sRGB automatically.</p>
        </div>
        <div class="card">
          <h4>You're creating gradients →</h4>
          <p style="color: var(--color-text-muted)">Interpolate <strong>in oklab</strong> (for straight blends) or <strong>in oklch</strong> (for hue-preserving blends). Never use the sRGB default for important gradients.</p>
        </div>
        <div class="card">
          <h4>You need dark mode →</h4>
          <p style="color: var(--color-text-muted)">Define OKLCH tokens and adjust the L (lightness) channel. Use <strong>relative colors</strong> or separate light/dark custom properties. The <code>light-dark()</code> function is also available.</p>
        </div>
      </div>
    </section>

    <!-- Evolution timeline -->
    <section class="section">
      <h2>Timeline</h2>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-md); border-left: 3px solid var(--color-border); padding-left: var(--spacing-lg)">
        <div v-for="entry in [
          { year: '1996', label: 'Hex (#RRGGBB)', desc: 'CSS 1 — the beginning' },
          { year: '2003', label: 'RGB, HSL', desc: 'CSS Color Level 3 — first functional notation' },
          { year: '2022', label: 'HWB, LAB, LCH, OKLAB, OKLCH, color()', desc: 'CSS Color Level 4 — the perceptual revolution' },
          { year: '2023', label: 'color-mix()', desc: 'CSS Color Level 5 — native color mixing' },
          { year: '2024', label: 'Relative color syntax', desc: 'CSS Color Level 5 — channel-level manipulation' },
        ]" :key="entry.year">
          <div>
            <span class="badge" style="margin-bottom: var(--spacing-xs)">{{ entry.year }}</span>
            <h4>{{ entry.label }}</h4>
            <p style="font-size: var(--text-sm); color: var(--color-text-muted)">{{ entry.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
