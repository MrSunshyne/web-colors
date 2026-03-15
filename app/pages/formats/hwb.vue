<script setup lang="ts">
const { formats } = useColorFormats()
const format = formats.find(f => f.id === 'hwb')!

const h = ref(288)
const w = ref(18)
const b = ref(44)

const colorValue = computed(() => `hwb(${h.value} ${w.value}% ${b.value}%)`)
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
      <pre><code>/* HWB syntax */
color: hwb(288 18% 44%);
color: hwb(288 18% 44% / 50%);

/* Think of it as: pick a hue, then mix in white and black */
hwb(0 0% 0%)     /* pure red — no white, no black */
hwb(0 100% 0%)   /* white — fully whitened */
hwb(0 0% 100%)   /* black — fully blackened */
hwb(0 50% 50%)   /* gray — equal white and black */</code></pre>
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
            <label>Whiteness <code>{{ w }}%</code></label>
            <input type="range" v-model.number="w" min="0" max="100">
          </div>
          <div class="slider-group" style="margin-top: var(--spacing-md)">
            <label>Blackness <code>{{ b }}%</code></label>
            <input type="range" v-model.number="b" min="0" max="100">
          </div>
          <pre style="margin-top: var(--spacing-lg)"><code>{{ colorValue }}</code></pre>
        </div>
        <div class="color-preview" :style="{ background: colorValue }">
          {{ colorValue }}
        </div>
      </div>
    </section>

    <section class="section">
      <h2>HWB vs HSL Mental Model</h2>
      <div class="grid-2" style="margin-top: var(--spacing-lg)">
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">HSL: Abstract sliders</h4>
          <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-md)">Saturation and lightness are mathematical concepts. "52% saturation at 37% lightness" doesn't map to a physical intuition.</p>
          <div style="display: flex; gap: var(--spacing-xs); height: 50px">
            <div v-for="lt in [20, 35, 50, 65, 80]" :key="lt"
              :style="{ flex: 1, borderRadius: 'var(--radius-sm)', background: `hsl(288 52% ${lt}%)` }"
            ></div>
          </div>
          <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">hsl(288 52% 20..80%)</code>
        </div>
        <div class="card">
          <h4 style="margin-bottom: var(--spacing-sm)">HWB: Mixing paint</h4>
          <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-md)">"Start with pure purple, add 18% white paint and 44% black paint." That's how painters think.</p>
          <div style="display: flex; gap: var(--spacing-xs); height: 50px">
            <div style="flex:1; border-radius: var(--radius-sm); background: hwb(288 0% 0%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hwb(288 15% 15%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hwb(288 30% 30%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hwb(288 45% 15%)"></div>
            <div style="flex:1; border-radius: var(--radius-sm); background: hwb(288 15% 45%)"></div>
          </div>
          <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">hwb(288 w% b%) — pure, muted, gray, tinted, shaded</code>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Tint and Shade Scales</h2>
      <p>HWB makes it trivially easy to create tint (add white) and shade (add black) scales:</p>
      <div style="margin-top: var(--spacing-lg)">
        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">Tints (increasing whiteness)</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="wt in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]" :key="wt"
            :style="{ flex: 1, background: `hwb(288 ${wt}% 0%)` }"
          ></div>
        </div>
        <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">hwb(288 0..90% 0%)</code>
      </div>
      <div style="margin-top: var(--spacing-lg)">
        <p style="font-size: var(--text-sm); font-weight: 600; margin-bottom: var(--spacing-xs)">Shades (increasing blackness)</p>
        <div style="display: flex; gap: 2px; height: 60px; border-radius: var(--radius-md); overflow: hidden">
          <div v-for="bk in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]" :key="bk"
            :style="{ flex: 1, background: `hwb(288 0% ${bk}%)` }"
          ></div>
        </div>
        <code style="font-size: 0.7rem; display: block; margin-top: var(--spacing-xs)">hwb(288 0% 0..90%)</code>
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
        <p><strong>Theming score: {{ format.themingScore }}/5.</strong> HWB has the same theming power as HSL (same hue wheel, same gamut) but with a more intuitive mental model. However, it shares HSL's perceptual non-uniformity. For serious theming, OKLCH is still the better choice.</p>
      </div>
    </section>
  </div>
</template>
