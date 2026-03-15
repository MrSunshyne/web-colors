<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'hex')!
</script>

<template>
  <div class="container">
    <div class="format-header">
      <h1>{{ format.name }}</h1>
      <p class="subtitle">{{ format.description }}</p>
      <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-sm)">
        <span class="badge">{{ format.spec }}</span>
        <span class="badge badge--green">{{ format.browserSupport }}</span>
        <span class="badge">Since {{ format.year }}</span>
      </div>
    </div>

    <section class="section">
      <h2>Syntax</h2>
      <pre><code>/* 6-digit hex (most common) */
color: #7B2D8E;

/* 3-digit shorthand (when each pair is identical) */
color: #F0C;          /* same as #FF00CC */

/* 8-digit hex with alpha */
color: #7B2D8E80;     /* 50% opacity */

/* 4-digit shorthand with alpha */
color: #F0C8;         /* same as #FF00CC88 */</code></pre>
    </section>

    <section class="section">
      <h2>How It Works</h2>
      <p>Hex codes are a direct representation of the RGB color model in base-16. Each pair of characters represents one channel:</p>

      <div class="grid-3" style="margin-top: var(--spacing-lg)">
        <div class="card" style="text-align: center">
          <div class="swatch" style="background: #7B0000; margin-bottom: var(--spacing-sm)"></div>
          <code style="font-size: 1.2rem">#<strong>7B</strong>0000</code>
          <p style="margin-top: var(--spacing-xs); font-size: var(--text-sm); color: var(--color-text-muted)">Red: 7B = 123</p>
        </div>
        <div class="card" style="text-align: center">
          <div class="swatch" style="background: #002D00; margin-bottom: var(--spacing-sm)"></div>
          <code style="font-size: 1.2rem">#00<strong>2D</strong>00</code>
          <p style="margin-top: var(--spacing-xs); font-size: var(--text-sm); color: var(--color-text-muted)">Green: 2D = 45</p>
        </div>
        <div class="card" style="text-align: center">
          <div class="swatch" style="background: #00008E; margin-bottom: var(--spacing-sm)"></div>
          <code style="font-size: 1.2rem">#0000<strong>8E</strong></code>
          <p style="margin-top: var(--spacing-xs); font-size: var(--text-sm); color: var(--color-text-muted)">Blue: 8E = 142</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Common Hex Colors</h2>
      <div class="swatch-grid" style="margin-top: var(--spacing-lg)">
        <div v-for="c in [
          { hex: '#FF0000', name: 'Red' },
          { hex: '#00FF00', name: 'Green' },
          { hex: '#0000FF', name: 'Blue' },
          { hex: '#FFFF00', name: 'Yellow' },
          { hex: '#FF00FF', name: 'Magenta' },
          { hex: '#00FFFF', name: 'Cyan' },
          { hex: '#000000', name: 'Black' },
          { hex: '#FFFFFF', name: 'White' },
          { hex: '#808080', name: 'Gray' },
          { hex: '#FFA500', name: 'Orange' },
          { hex: '#800080', name: 'Purple' },
          { hex: '#FFC0CB', name: 'Pink' },
        ]" :key="c.hex" class="swatch-card">
          <div class="swatch" :style="{ background: c.hex }"></div>
          <strong style="font-size: var(--text-sm)">{{ c.name }}</strong><br>
          <code>{{ c.hex }}</code>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> Hex is the weakest format for theming. You can't manipulate individual channels, can't derive variants, and can't use <code>calc()</code>. Use hex only for static, unchanging brand color definitions. For anything dynamic, convert to HSL or OKLCH.</p>
      </div>
      <pre><code>/* Hex in custom properties — works, but limited */
:root {
  --brand: #7B2D8E;
}

/* You can't do this with hex: */
/* --brand-light: calc(var(--brand) + lightness ???) */
/* You need a different format for that. */</code></pre>
    </section>
  </div>
</template>
