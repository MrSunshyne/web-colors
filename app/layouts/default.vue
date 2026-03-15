<template>
  <div>
    <nav class="site-nav">
      <div class="container">
        <NuxtLink to="/" class="logo">Web Colors</NuxtLink>
        <NuxtLink to="/formats/hex">Hex</NuxtLink>
        <NuxtLink to="/formats/rgb">RGB</NuxtLink>
        <NuxtLink to="/formats/hsl">HSL</NuxtLink>
        <NuxtLink to="/formats/hwb">HWB</NuxtLink>
        <NuxtLink to="/formats/lab">LAB</NuxtLink>
        <NuxtLink to="/formats/lch">LCH</NuxtLink>
        <NuxtLink to="/formats/oklab">OKLAB</NuxtLink>
        <NuxtLink to="/formats/oklch">OKLCH</NuxtLink>
        <NuxtLink to="/formats/display-p3">Display P3</NuxtLink>
        <NuxtLink to="/formats/color-mix">color-mix()</NuxtLink>
        <NuxtLink to="/formats/relative-colors">Relative</NuxtLink>
        <NuxtLink to="/comparison">Compare</NuxtLink>
        <NuxtLink to="/theming">Theming</NuxtLink>
      </div>
    </nav>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>Built to explore CSS color formats. All examples use native CSS — no JavaScript color libraries needed.</p>
      </div>
    </footer>
  </div>
</template>
