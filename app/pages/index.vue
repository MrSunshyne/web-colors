<script setup lang="ts">
const { formats } = useColorFormats()

const supportLabel = (s: string) => {
  if (s === 'universal') return { text: 'Universal', class: 'badge--green' }
  if (s === 'modern') return { text: 'Modern browsers', class: 'badge--green' }
  return { text: 'Cutting edge', class: 'badge--yellow' }
}
</script>

<template>
  <div class="container">
    <div class="hero">
      <h1>Web Colors</h1>
      <p>
        An interactive guide to every CSS color format available on the web platform today.
        Learn when to use each format, how they compare, and how to build theming systems with modern color spaces.
      </p>
    </div>

    <!-- Quick comparison strip -->
    <section class="section">
      <h2>The Same Color, Every Format</h2>
      <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-lg)">
        A vibrant purple expressed in every CSS color format. Same color, very different ergonomics.
      </p>
      <div class="card" style="overflow-x: auto">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Format</th>
              <th>Syntax</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Hex</strong></td>
              <td><code>#7B2D8E</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: #7B2D8E; vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>RGB</strong></td>
              <td><code>rgb(123 45 142)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: rgb(123 45 142); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>HSL</strong></td>
              <td><code>hsl(288 52% 37%)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: hsl(288 52% 37%); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>HWB</strong></td>
              <td><code>hwb(288 18% 44%)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: hwb(288 18% 44%); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>LAB</strong></td>
              <td><code>lab(33.6 46.3 -48.5)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: lab(33.6 46.3 -48.5); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>LCH</strong></td>
              <td><code>lch(33.6 67 313.7)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: lch(33.6 67 313.7); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>OKLAB</strong></td>
              <td><code>oklab(0.42 0.1 -0.14)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: oklab(0.42 0.1 -0.14); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>OKLCH</strong></td>
              <td><code>oklch(0.42 0.17 306)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: oklch(0.42 0.17 306); vertical-align: middle"></span></td>
            </tr>
            <tr>
              <td><strong>Display P3</strong></td>
              <td><code>color(display-p3 0.44 0.18 0.54)</code></td>
              <td><span class="swatch" style="width: 60px; aspect-ratio: 2/1; display: inline-block; background: color(display-p3 0.44 0.18 0.54); vertical-align: middle"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Format cards -->
    <section class="section">
      <h2 style="margin-bottom: var(--spacing-lg)">Color Formats</h2>
      <div class="grid-3">
        <NuxtLink
          v-for="format in formats"
          :key="format.id"
          :to="`/formats/${format.slug}`"
          class="format-link-card"
        >
          <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm)">
            <h3>{{ format.name }}</h3>
            <span :class="['badge', supportLabel(format.browserSupport).class]">
              {{ supportLabel(format.browserSupport).text }}
            </span>
          </div>
          <p>{{ format.description }}</p>
          <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-xs); flex-wrap: wrap">
            <span v-for="use in format.bestFor.slice(0, 2)" :key="use" class="badge">{{ use }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Quick recommendation -->
    <section class="section">
      <h2 style="margin-bottom: var(--spacing-lg)">Which Format Should You Use?</h2>
      <div class="grid-2">
        <div class="card">
          <h3 style="margin-bottom: var(--spacing-sm)">For New Projects</h3>
          <p>Use <strong>OKLCH</strong> as your primary format. It's perceptually uniform, intuitive (lightness, chroma, hue), and supports wide gamut colors. Define your design tokens in OKLCH and use <code>color-mix()</code> and relative color syntax for variations.</p>
        </div>
        <div class="card">
          <h3 style="margin-bottom: var(--spacing-sm)">For Existing Projects</h3>
          <p>Keep your current format for existing tokens but adopt <strong>OKLCH</strong> for new colors. Use <code>color-mix(in oklch, ...)</code> for dynamic tints/shades — it works with any input format, so you can mix HSL and OKLCH freely.</p>
        </div>
        <div class="card">
          <h3 style="margin-bottom: var(--spacing-sm)">For Theming Systems</h3>
          <p>Combine <strong>OKLCH custom properties</strong> with <strong>relative color syntax</strong>. Define a base hue and generate your entire palette with CSS — no build tools or JavaScript needed. See the <NuxtLink to="/theming">Theming page</NuxtLink> for patterns.</p>
        </div>
        <div class="card">
          <h3 style="margin-bottom: var(--spacing-sm)">For Maximum Compatibility</h3>
          <p><strong>HSL</strong> remains the most pragmatic human-readable format with universal support. Its perceptual non-uniformity rarely matters for simple use cases. Use hex for static brand colors you'll never modify in CSS.</p>
        </div>
      </div>
    </section>

    <!-- Links to deeper pages -->
    <section class="section">
      <div class="grid-2">
        <NuxtLink to="/comparison" class="format-link-card">
          <h3>Format Comparison</h3>
          <p>Side-by-side comparison of all formats across gamut, uniformity, readability, and theming power.</p>
        </NuxtLink>
        <NuxtLink to="/theming" class="format-link-card">
          <h3>Theming Systems</h3>
          <p>Build a complete theming system with OKLCH, color-mix(), relative colors, and CSS custom properties.</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
