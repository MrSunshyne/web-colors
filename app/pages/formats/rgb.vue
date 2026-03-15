<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'rgb')!

const r = ref(123)
const g = ref(45)
const b = ref(142)
const a = ref(100)

const colorValue = computed(() => `rgb(${r.value} ${g.value} ${b.value} / ${a.value}%)`)
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
      <pre><code>/* Modern syntax (space-separated, recommended) */
color: rgb(123 45 142);
color: rgb(123 45 142 / 50%);

/* Legacy syntax (comma-separated, still valid) */
color: rgb(123, 45, 142);
color: rgba(123, 45, 142, 0.5);

/* Percentage values */
color: rgb(48% 18% 56%);

/* With CSS custom properties */
:root {
  --r: 123;
  --g: 45;
  --b: 142;
}
color: rgb(var(--r) var(--g) var(--b));</code></pre>
    </section>

    <section class="section">
      <h2>Interactive Playground</h2>
      <div class="playground">
        <div>
          <div class="slider-group">
            <label>Red <code>{{ r }}</code></label>
            <input type="range" v-model.number="r" min="0" max="255">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Green <code>{{ g }}</code></label>
            <input type="range" v-model.number="g" min="0" max="255">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Blue <code>{{ b }}</code></label>
            <input type="range" v-model.number="b" min="0" max="255">
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
      <h2>The Problem With RGB</h2>
      <p>RGB maps to how screens work (red, green, and blue sub-pixels), not how humans perceive color. This makes it hard to predict what adjustments will look like:</p>

      <div class="grid-3" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Want it brighter?</h4>
          <p style="font-size: var(--text-sm)">You have to increase all three channels proportionally. But by how much? There's no single "brightness" knob.</p>
          <div style="display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-sm)">
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(80 30 90)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(123 45 142)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(180 90 200)"></div>
          </div>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Want it less saturated?</h4>
          <p style="font-size: var(--text-sm)">You need to move all channels toward their average. There's no "saturation" concept in RGB.</p>
          <div style="display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-sm)">
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(123 45 142)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(113 70 125)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(103 95 107)"></div>
          </div>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">Want a different hue?</h4>
          <p style="font-size: var(--text-sm)">Completely non-obvious. Rotating hue in RGB means recalculating all three channels.</p>
          <div style="display: flex; gap: var(--spacing-xs); margin-top: var(--spacing-sm)">
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(142 123 45)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(123 45 142)"></div>
            <div style="flex:1; height: 40px; border-radius: var(--radius-sm); background: rgb(45 142 123)"></div>
          </div>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> RGB is marginally better than hex for theming because you can store individual channels in custom properties. But the lack of intuitive controls (no hue/lightness knobs) makes it a poor choice for dynamic theming.</p>
      </div>
      <pre><code>/* The "split channel" trick — useful but clunky */
:root {
  --brand-r: 123;
  --brand-g: 45;
  --brand-b: 142;
}

.element {
  /* Full color */
  color: rgb(var(--brand-r) var(--brand-g) var(--brand-b));

  /* With transparency */
  background: rgb(var(--brand-r) var(--brand-g) var(--brand-b) / 20%);
}

/* Compare this to OKLCH — much easier to manipulate */</code></pre>
    </section>
  </div>
</template>
