# Modern Web Color Formats — Comprehensive Reference (2026)

A detailed technical reference covering every CSS color format available on the modern web platform, intended for building an educational website.

---

## Table of Contents

1. [Color Format Overview & Comparison Table](#1-color-format-overview--comparison-table)
2. [Legacy Formats: HEX, RGB/RGBA, Named Colors](#2-legacy-formats)
3. [HSL/HSLA](#3-hslhsla)
4. [HWB](#4-hwb)
5. [LAB and LCH (CIE)](#5-lab-and-lch-cie)
6. [OKLAB and OKLCH](#6-oklab-and-oklch)
7. [The color() Function and Display-P3](#7-the-color-function-and-display-p3)
8. [color-mix()](#8-color-mix)
9. [Relative Color Syntax](#9-relative-color-syntax)
10. [light-dark()](#10-light-dark)
11. [System Colors and currentColor](#11-system-colors-and-currentcolor)
12. [CSS Color Level 4 vs Level 5 Feature Breakdown](#12-css-color-level-4-vs-level-5-feature-breakdown)
13. [Why OKLCH and OKLAB Are Superior for Design Systems](#13-why-oklch-and-oklab-are-superior-for-design-systems)
14. [Theming Systems: Custom Properties, Dark Mode, Design Tokens](#14-theming-systems)
15. [Practical Recommendations by Use Case](#15-practical-recommendations-by-use-case)
16. [Browser Support Summary](#16-browser-support-summary)
17. [Sources](#17-sources)

---

## 1. Color Format Overview & Comparison Table

| Format | Spec Level | Color Space | Gamut | Perceptually Uniform | Human-Readable | Best For |
|--------|-----------|-------------|-------|---------------------|----------------|----------|
| HEX | CSS 1 | sRGB | sRGB | No | No | Legacy code, copy-paste |
| `rgb()` / `rgba()` | CSS 1 / 3 | sRGB | sRGB | No | No | Programmatic manipulation |
| Named colors | CSS 2.1 / 4 | sRGB | sRGB | No | Yes (names) | Prototyping, readability |
| `hsl()` / `hsla()` | CSS 3 | sRGB | sRGB | No | Moderate | Quick hue/saturation tweaks |
| `hwb()` | CSS 4 | sRGB | sRGB | No | Moderate | Tint/shade mixing mental model |
| `lab()` | CSS 4 | CIE Lab | Full human vision | Mostly (blue hue shift) | No | Device-independent color |
| `lch()` | CSS 4 | CIE LCH | Full human vision | Mostly (blue hue shift) | Moderate | Palette generation (with caveat) |
| `oklab()` | CSS 4 | Oklab | Full human vision | Yes | No | Smooth gradients, interpolation |
| `oklch()` | CSS 4 | OKLCH | Full human vision | Yes | Yes | Design systems, palettes, theming |
| `color()` | CSS 4 | Various (P3, rec2020, etc.) | Varies by space | Depends on space | No | Wide-gamut specific colors |
| `color-mix()` | CSS 5 | Any | Any | Depends on chosen space | Yes | Theming, dynamic tints/shades |
| Relative colors | CSS 5 | Any | Any | Depends on chosen space | Yes | Dynamic color derivation |
| `light-dark()` | CSS 5 | N/A (wrapper) | N/A | N/A | Yes | Dark mode theming |
| System colors | CSS 4 | OS-defined | OS-defined | N/A | Yes (semantic names) | Forced colors / accessibility |

---

## 2. Legacy Formats

### HEX

**Syntax:**
```css
#RGB                /* Short form, 3 digits */
#RRGGBB             /* Full form, 6 digits */
#RGBA               /* Short form with alpha */
#RRGGBBAA           /* Full form with alpha */
```

**Examples:**
```css
color: #f00;             /* Red */
color: #ff0000;          /* Red */
color: #ff000080;        /* Red at 50% opacity */
```

**Characteristics:**
- Color space: sRGB
- Gamut: sRGB only (~35% of human-visible colors)
- Perceptual uniformity: None
- The most compact notation; universally understood by every tool
- Not human-readable — impossible to mentally predict what `#7B2D8E` looks like
- No built-in way to manipulate channels (must decompose and recompose)
- Alpha support via 4th/8th hex digit added in CSS Color Level 4

**Theming use:** Poor. Cannot be decomposed into channels with CSS custom properties. Cannot be used with `calc()`. Requires JavaScript or preprocessors for any manipulation.

**Browser support:** Universal — every browser since CSS 1.

---

### RGB / RGBA

**Syntax (modern, CSS Color Level 4):**
```css
/* Modern syntax — space-separated, optional alpha with / */
rgb(255 0 0)
rgb(255 0 0 / 0.5)
rgb(100% 0% 0%)
rgb(100% 0% 0% / 50%)

/* Legacy syntax — comma-separated */
rgb(255, 0, 0)
rgba(255, 0, 0, 0.5)
```

**Characteristics:**
- Color space: sRGB
- Gamut: sRGB only
- Perceptual uniformity: None
- Channel values: 0-255 (integer) or 0%-100%
- Modern syntax unifies `rgb()` and `rgba()` — the `rgba()` function is now an alias
- Good for programmatic manipulation (each channel maps directly to hardware)

**Theming use:** Limited. Individual channels can be stored in custom properties and recombined, but this is verbose:
```css
:root {
  --brand-r: 59;
  --brand-g: 130;
  --brand-b: 246;
}
.element {
  color: rgb(var(--brand-r) var(--brand-g) var(--brand-b) / 0.8);
}
```

**Browser support:** Universal. Modern space-separated syntax supported in Chrome 65+, Firefox 52+, Safari 12.1+.

---

### Named Colors

There are **148 named CSS color keywords** (including `transparent` and `rebeccapurple`), representing 142 unique colors. Defined in CSS Color Level 4.

```css
color: rebeccapurple;
color: cornflowerblue;
color: transparent;       /* Fully transparent black */
color: currentColor;      /* Inherits computed color value */
```

All named colors resolve to sRGB values. Useful for prototyping and readability but not for production design systems.

---

## 3. HSL/HSLA

**Syntax (modern, CSS Color Level 4):**
```css
/* Modern syntax */
hsl(0 100% 50%)            /* Red */
hsl(120 100% 50% / 0.5)    /* Green at 50% opacity */
hsl(240deg 100% 50%)       /* Blue — explicit deg unit */
hsl(0.5turn 100% 50%)      /* Cyan — using turn unit */

/* Legacy syntax */
hsl(0, 100%, 50%)
hsla(0, 100%, 50%, 0.5)
```

**Parameters:**
- **H (Hue):** Angle on the color wheel — `deg` (default), `rad`, `grad`, `turn`. Red=0, Green=120, Blue=240.
- **S (Saturation):** 0% (gray) to 100% (full saturation)
- **L (Lightness):** 0% (black) to 100% (white), 50% is "pure" color

**Characteristics:**
- Color space: sRGB
- Gamut: sRGB only
- Perceptual uniformity: **No** — This is HSL's critical flaw. `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) both have "50% lightness" but yellow appears dramatically brighter to human eyes. Changing hue while keeping S and L constant produces wildly different perceived brightness.
- Saturation at 100% does not mean the same thing for all hues

**Theming use:** Moderate. The hue channel is useful for theming:
```css
:root {
  --hue: 220;
}
.primary { color: hsl(var(--hue) 90% 50%); }
.accent  { color: hsl(calc(var(--hue) + 30) 80% 60%); }
```
However, perceptual non-uniformity means lightness-based scales will look inconsistent across hues.

**Browser support:** Universal since CSS 3. Modern syntax in Chrome 65+, Firefox 52+, Safari 12.1+.

---

## 4. HWB

**Syntax:**
```css
hwb(194 0% 0%)              /* Pure cyan-ish */
hwb(194 0% 0% / 0.5)        /* With alpha */
hwb(from green h w b / 0.5) /* Relative (CSS 5) */
```

**Parameters:**
- **H (Hue):** Same color wheel as HSL (0-360 degrees)
- **W (Whiteness):** 0% (no white mixed in) to 100% (pure white)
- **B (Blackness):** 0% (no black mixed in) to 100% (pure black)
- When W + B >= 100%, produces a shade of gray; values are normalized as `W/(W+B)` and `B/(W+B)`

**Characteristics:**
- Color space: sRGB
- Gamut: sRGB only
- Perceptual uniformity: No
- Mental model: "Pick a hue, then mix in white and/or black" — like mixing paint
- Designed by Alvy Ray Smith (HSV creator) in 1996 as a more intuitive alternative
- In practice, not widely adopted — `oklch()` and `color-mix()` now handle tints/shades better

**Theming use:** Limited. Same sRGB gamut constraints as HSL. The paint-mixing model is intuitive but offers no advantage over OKLCH for systematic palettes.

**Browser support:** Baseline since April 2022 — Safari 15+, Firefox 96+, Chrome 101+.

---

## 5. LAB and LCH (CIE)

### lab()

**Syntax:**
```css
lab(50% 40 59.5)
lab(50% 40 59.5 / 0.5)
lab(from var(--color) l a b)  /* Relative (CSS 5) */
```

**Parameters:**
- **L (Lightness):** 0% (black) to 100% (white) — perceptually uniform
- **a:** Green (-) to Red (+) axis, typically -125 to 125
- **b:** Blue (-) to Yellow (+) axis, typically -125 to 125

### lch()

**Syntax:**
```css
lch(50% 72.2 56.2)
lch(50% 72.2 56.2 / 0.5)
lch(from var(--color) calc(l + 10) c h)  /* Relative (CSS 5) */
```

**Parameters:**
- **L (Lightness):** 0% to 100% — perceptually uniform
- **C (Chroma):** 0 (gray) to ~150+ (most saturated). No fixed upper bound — it depends on the hue and lightness.
- **H (Hue):** 0-360 degrees, similar concept to HSL hue but on the CIE color wheel

**Characteristics (both):**
- Color space: CIE Lab / CIE LCH
- Gamut: Can represent the **entire range of human vision** — device-independent. Future-proof regardless of display hardware advances.
- Perceptual uniformity: **Mostly yes**, but with a known flaw — CIE Lab exhibits an unexpected **hue shift in the blue region** (hues ~270-330). When you change lightness or chroma for blues, the hue visibly drifts. This was the motivation for creating Oklab/OKLCH.
- LCH is the polar form of Lab (same relationship as HSL to RGB) — LCH is more intuitive because you work with Hue as an angle.
- Both support colors outside sRGB and P3 gamuts.

**Theming use:** Good for perceptually uniform lightness scales. The blue hue shift makes LCH slightly unreliable for automated palette generation without manual correction. OKLCH is preferred.

**Browser support:** Chrome 111+, Firefox 113+, Safari 15.4+, Edge 111+. Baseline widely available.

---

## 6. OKLAB and OKLCH

### oklab()

**Syntax:**
```css
oklab(0.59 0.1 0.08)
oklab(0.59 0.1 0.08 / 0.5)
oklab(from var(--base) l a b)              /* Relative */
oklab(from var(--base) calc(l - 0.1) a b)  /* Darken */
```

**Parameters:**
- **L (Lightness):** 0 (black) to 1 (white), or 0% to 100% — perceptually uniform
- **a:** Green (-) to Red (+) axis, approximately -0.4 to 0.4
- **b:** Blue (-) to Yellow (+) axis, approximately -0.4 to 0.4

### oklch()

**Syntax:**
```css
oklch(0.7 0.15 180)
oklch(70% 0.15 180)
oklch(0.7 0.15 180 / 0.5)
oklch(from var(--brand) l c h)                        /* Identity */
oklch(from var(--brand) calc(l - 0.1) c h)            /* Darken */
oklch(from var(--brand) l calc(c * 0.5) h)            /* Desaturate */
oklch(from var(--brand) l c calc(h + 180))             /* Complementary */
oklch(from var(--color-blue) calc(l / 2 + 0.2) c h)   /* Adjusted shade */
```

**Parameters:**
- **L (Lightness):** 0 to 1 (or 0% to 100%) — perceptually uniform
- **C (Chroma):** 0 (gray) to ~0.4 (most saturated). The maximum depends on the hue.
- **H (Hue):** 0-360 degrees

**Characteristics (both):**
- Color space: Oklab / OKLCH (created by Bjorn Ottosson, 2020)
- Gamut: Can represent the **entire range of human vision** — device-independent
- Perceptual uniformity: **Yes** — this is the primary advantage over CIE Lab/LCH. The blue hue shift that plagues CIE Lab/LCH is corrected in Oklab/OKLCH.
- OKLCH is the polar (cylindrical) form of Oklab — easier for humans to reason about
- Adopted by Tailwind CSS v4 for all color tokens
- Recommended by the CSS working group for color manipulation
- Out-of-gamut colors are automatically gamut-mapped by browsers

**Why OKLCH over every other format — see [Section 13](#13-why-oklch-and-oklab-are-superior-for-design-systems).**

**Theming use:** Excellent. See Section 13 and 14.

**Browser support:** Chrome 111+, Firefox 113+, Safari 15.4+, Edge 111+. Baseline widely available since 2023.

---

## 7. The color() Function and Display-P3

**Syntax:**
```css
color(<colorspace> <value> <value> <value>)
color(<colorspace> <value> <value> <value> / <alpha>)

/* Predefined color spaces */
color(srgb 1 0.5 0)
color(srgb-linear 1 0.5 0)
color(display-p3 1 0.5 0)
color(a98-rgb 1 0.5 0)
color(prophoto-rgb 1 0.5 0)
color(rec2020 1 0.5 0)
color(xyz 0.5 0.5 0.5)
color(xyz-d50 0.5 0.5 0.5)
color(xyz-d65 0.5 0.5 0.5)

/* With alpha */
color(display-p3 1 0 0 / 0.5)

/* Relative syntax (CSS 5) */
color(from var(--base) display-p3 r calc(g + 0.15) calc(b + 0.15))
```

**Available color spaces:**
| Space | Description | Gamut |
|-------|-------------|-------|
| `srgb` | Standard RGB (same gamut as `rgb()`, different encoding) | sRGB |
| `srgb-linear` | Linear-light sRGB | sRGB |
| `display-p3` | Apple/DCI P3 — ~50% larger than sRGB | P3 |
| `a98-rgb` | Adobe RGB 1998 | Adobe RGB |
| `prophoto-rgb` | ProPhoto RGB — very wide | ProPhoto |
| `rec2020` | ITU-R BT.2020 — HDR television | Rec. 2020 |
| `xyz` / `xyz-d50` / `xyz-d65` | CIE XYZ (device-independent reference) | Unbounded |

**Display-P3 specifically:**
- ~50% larger color gamut than sRGB
- Matches the gamut of modern Apple displays, many Android flagships, and high-end monitors
- Values range from 0 to 1 per channel (values outside 0-1 are out of gamut for P3)
- Colors outside sRGB but inside P3 appear noticeably more vivid — especially reds, greens, and oranges

**Fallback pattern:**
```css
.vibrant {
  /* sRGB fallback — browsers that don't support color() ignore the next line */
  background: rgb(0, 255, 0);
  /* Wide gamut P3 green */
  background: color(display-p3 0 1 0);
}
```

**Feature detection:**
```css
@supports (color: color(display-p3 1 1 1)) {
  /* Use wide-gamut colors */
}
@media (color-gamut: p3) {
  /* Hardware supports P3 */
}
```

**Important distinction:** `@supports` checks browser parsing support; `@media (color-gamut: p3)` checks whether the display hardware can actually render P3 colors. Use both for robust implementation.

**Theming use:** Useful when you need specific wide-gamut colors (e.g., a brand red that's more vivid than sRGB can produce). For general theming, OKLCH is preferred because it's more intuitive and handles gamut mapping automatically.

**Browser support:** Chrome 111+, Firefox 113+, Safari 15.4+, Edge 111+.

**Caveat:** Actual wide-gamut rendering depends on both browser and OS support. macOS renders P3 natively; Windows HDR/ACM support is still maturing (Firefox targeting H1 2026 for Windows HDR CSS rendering).

---

## 8. color-mix()

**Spec:** CSS Color Level 5

**Syntax:**
```css
color-mix(in <colorspace>, <color> [<percentage>]?, <color> [<percentage>]?)
```

**Examples:**
```css
/* Mix red and blue equally in sRGB */
color-mix(in srgb, red 50%, blue)

/* Mix brand color with white in OKLCH — create a tint */
color-mix(in oklch, var(--brand) 80%, white)

/* Mix brand color with black — create a shade */
color-mix(in oklch, var(--brand) 70%, black)

/* Mix brand with transparent — create opacity variant */
color-mix(in oklch, var(--brand), transparent)

/* Percentage rules: omitted = 50%; if both provided, they're normalized */
color-mix(in oklch, blue 30%, red 70%)
```

**How percentages work:**
- If one percentage is omitted, it's calculated as `100% - other`
- If both are omitted, both default to 50%
- If both are provided and sum to != 100%, they are normalized
- If both are 0%, the result is invalid

**Available interpolation color spaces:**
`srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `lab`, `oklab`, `xyz`, `xyz-d50`, `xyz-d65`, `hsl`, `hwb`, `lch`, `oklch`

**Why the color space matters:**
```css
/* These produce DIFFERENT results: */
color-mix(in srgb, red, blue)    /* Goes through muddy brown */
color-mix(in oklch, red, blue)   /* Goes through vibrant magenta */
```
Mixing in `oklch` or `oklab` produces perceptually better results — no muddy midpoints.

**Theming use — this is where color-mix() shines:**
```css
:root {
  --brand: oklch(0.6 0.2 250);

  /* Generate entire palette from one token */
  --brand-50:  color-mix(in oklch, var(--brand) 10%, white);
  --brand-100: color-mix(in oklch, var(--brand) 20%, white);
  --brand-200: color-mix(in oklch, var(--brand) 40%, white);
  --brand-300: color-mix(in oklch, var(--brand) 60%, white);
  --brand-400: color-mix(in oklch, var(--brand) 80%, white);
  --brand-500: var(--brand);
  --brand-600: color-mix(in oklch, var(--brand) 80%, black);
  --brand-700: color-mix(in oklch, var(--brand) 60%, black);
  --brand-800: color-mix(in oklch, var(--brand) 40%, black);
  --brand-900: color-mix(in oklch, var(--brand) 20%, black);

  /* Hover/active states */
  --brand-hover:  color-mix(in oklch, var(--brand) 85%, black);
  --brand-active: color-mix(in oklch, var(--brand) 70%, black);

  /* Transparent variants */
  --brand-ghost: color-mix(in oklch, var(--brand) 15%, transparent);
}
```

Changing `--brand` instantly regenerates the entire palette.

**Fallback:**
```css
.element {
  background: #3b82f6;                                    /* Fallback */
  background: color-mix(in oklch, var(--brand) 80%, white); /* Modern */
}
```

Or use `@supports`:
```css
@supports (color: color-mix(in srgb, red 50%, blue)) {
  /* Use color-mix() */
}
```

**Browser support:** Chrome 111+, Firefox 113+, Safari 16.2+, Edge 111+. **Baseline widely available.**

---

## 9. Relative Color Syntax

**Spec:** CSS Color Level 5

**Syntax pattern:**
```css
<color-function>(from <origin-color> <channel> <channel> <channel> [/ <alpha>])
```

The `from` keyword takes an origin color, decomposes it into the target color space's channels, and makes those channels available as keywords for use with `calc()`.

**Channel keywords per color function:**

| Function | Channel keywords |
|----------|-----------------|
| `rgb()` | `r`, `g`, `b`, `alpha` |
| `hsl()` | `h`, `s`, `l`, `alpha` |
| `hwb()` | `h`, `w`, `b`, `alpha` |
| `lab()` | `l`, `a`, `b`, `alpha` |
| `lch()` | `l`, `c`, `h`, `alpha` |
| `oklab()` | `l`, `a`, `b`, `alpha` |
| `oklch()` | `l`, `c`, `h`, `alpha` |
| `color()` | `r`, `g`, `b`, `alpha` (or equivalent per space) |

**Examples — all using oklch() for best results:**

```css
:root {
  --brand: #3b82f6;
}

/* Identity — convert hex to OKLCH (no change) */
--brand-oklch: oklch(from var(--brand) l c h);

/* Lighten */
--brand-light: oklch(from var(--brand) calc(l + 0.15) c h);

/* Darken */
--brand-dark: oklch(from var(--brand) calc(l - 0.15) c h);

/* Desaturate (reduce chroma) */
--brand-muted: oklch(from var(--brand) l calc(c * 0.5) h);

/* Fully desaturate (grayscale) */
--brand-gray: oklch(from var(--brand) l 0 h);

/* Complementary color (rotate hue 180°) */
--brand-complement: oklch(from var(--brand) l c calc(h + 180));

/* Triadic colors */
--brand-triad-1: oklch(from var(--brand) l c calc(h + 120));
--brand-triad-2: oklch(from var(--brand) l c calc(h + 240));

/* Semi-transparent */
--brand-ghost: oklch(from var(--brand) l c h / 0.15);

/* Cross-space conversion — start from any format */
--from-hsl: oklch(from hsl(220 90% 55%) l c h);
--from-named: oklch(from rebeccapurple l c h);
```

**Key behavior:** When the origin color is in a different color space, the browser automatically converts it to the target space before decomposing channels. This means you can define colors in hex and manipulate them in OKLCH seamlessly.

**Relative colors vs color-mix():**
- `color-mix()` is best for mixing two colors together (tints, shades, blending)
- Relative color syntax is best for transforming a single color (lighten, darken, desaturate, hue-shift, adjust alpha)
- They are complementary tools, not alternatives

**Theming use:** Extremely powerful for design tokens:
```css
:root {
  --hue: 250;
  --brand: oklch(0.6 0.2 var(--hue));

  /* Entire system derived from one hue value */
  --surface:    oklch(from var(--brand) 0.97 calc(c * 0.1) h);
  --surface-2:  oklch(from var(--brand) 0.93 calc(c * 0.15) h);
  --text:       oklch(from var(--brand) 0.2 calc(c * 0.3) h);
  --text-muted: oklch(from var(--brand) 0.5 calc(c * 0.1) h);
  --border:     oklch(from var(--brand) 0.8 calc(c * 0.1) h);
}
```

**Browser support:** Chrome 119+, Safari 16.4+, Firefox 128+, Edge 119+. **Baseline widely available as of 2025.**

---

## 10. light-dark()

**Spec:** CSS Color Level 5

**Syntax:**
```css
light-dark(<color-for-light-mode>, <color-for-dark-mode>)
```

**Prerequisites:** The `color-scheme` property must be set to `light dark`:
```css
:root {
  color-scheme: light dark;  /* REQUIRED for light-dark() to work */
}
```

**Examples:**
```css
:root {
  color-scheme: light dark;

  --text:       light-dark(#1a1a1a, #e5e5e5);
  --background: light-dark(#ffffff, #121212);
  --surface:    light-dark(#f5f5f5, #1e1e1e);
  --border:     light-dark(#e0e0e0, #333333);
  --brand:      light-dark(oklch(0.55 0.2 250), oklch(0.7 0.15 250));
}

body {
  color: var(--text);
  background: var(--background);
}
```

**How it chooses:**
- `light-dark()` reads the **computed `color-scheme`** of the element
- If the computed scheme is `light` → first value
- If the computed scheme is `dark` → second value
- The scheme is determined by: the `color-scheme` CSS property, the `<meta name="color-scheme">` tag, or the user's OS preference

**Toggling with JavaScript:**
```css
:root {
  color-scheme: light dark; /* Respect OS preference by default */
}
:root[data-theme="light"] {
  color-scheme: light;
}
:root[data-theme="dark"] {
  color-scheme: dark;
}
```
```js
// Toggle theme
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

**light-dark() vs prefers-color-scheme:**
- `prefers-color-scheme` is a media query — it only detects the OS preference
- `light-dark()` responds to the **computed color-scheme**, which can be set per-element
- `light-dark()` eliminates the need for duplicate `@media` blocks for every color declaration
- `prefers-color-scheme` is still needed for non-color changes (layout, images, etc.)

**Combined with color-mix() and relative colors:**
```css
:root {
  color-scheme: light dark;

  --brand: light-dark(oklch(0.55 0.2 250), oklch(0.7 0.15 250));
  --brand-hover: color-mix(in oklch, var(--brand) 85%, black);
  --brand-subtle: oklch(from var(--brand) l calc(c * 0.3) h / 0.15);
}
```

**Browser support:** Chrome 123+, Firefox 120+, Safari 17.5+, Edge 123+. **Baseline since May 2024.**

---

## 11. System Colors and currentColor

### System Colors

System colors are semantic color keywords whose actual values are determined by the browser or OS. They are particularly important for **forced colors mode** (e.g., Windows High Contrast Mode).

**Defined system colors (CSS Color Level 4):**

| Keyword | Meaning |
|---------|---------|
| `Canvas` | Background of application content |
| `CanvasText` | Text in application content |
| `LinkText` | Text of non-active, non-visited links |
| `VisitedText` | Text of visited links |
| `ActiveText` | Text of active links |
| `ButtonFace` | Background of push buttons |
| `ButtonText` | Text of push buttons |
| `ButtonBorder` | Border of push buttons |
| `Field` | Background of input fields |
| `FieldText` | Text of input fields |
| `Highlight` | Background of selected items |
| `HighlightText` | Text of selected items |
| `SelectedItem` | Background of selected items (e.g., checkbox) |
| `SelectedItemText` | Text of selected items |
| `Mark` | Background of text marked/highlighted (e.g., `<mark>`) |
| `MarkText` | Text that has been marked/highlighted |
| `GrayText` | Disabled text |
| `AccentColor` | Accent color for UI controls |
| `AccentColorText` | Text for accent-colored UI controls |

**Forced colors mode:**
```css
@media (forced-colors: active) {
  .custom-button {
    border: 2px solid ButtonText;
    background: ButtonFace;
    color: ButtonText;
  }
  .custom-focus:focus {
    outline: 2px solid Highlight;
  }
}
```

**Best practice:** Do NOT use `forced-color-adjust: none` unless absolutely necessary. Instead, use `@media (forced-colors: active)` to provide appropriate styles using system color keywords.

**Note:** The legacy `-ms-high-contrast` media query was deprecated by Microsoft and removed from Edge 138 (June 2025). Use `@media (forced-colors: active)` exclusively.

### currentColor

```css
.icon {
  fill: currentColor;       /* Inherits the element's computed `color` value */
  border: 1px solid currentColor;
}
```

- `currentColor` is the computed value of the `color` property on the element
- Extremely useful for SVGs — the icon color automatically matches the text color
- Works well in forced colors mode (automatically picks up the user's chosen text color)
- Can be used as the origin in relative color syntax: `oklch(from currentColor l c h / 0.5)`

---

## 12. CSS Color Level 4 vs Level 5 Feature Breakdown

### CSS Color Level 4 (W3C Candidate Recommendation, Feb 2026)

Features defined:
- Modern `rgb()` / `hsl()` syntax (space-separated, `/` for alpha)
- `hwb()` function
- `lab()` and `lch()` functions
- `oklab()` and `oklch()` functions
- `color()` function with predefined color spaces (srgb, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz, xyz-d50, xyz-d65)
- 8-digit and 4-digit hex notation (#RRGGBBAA, #RGBA)
- `none` keyword for missing color channels
- System color keywords (Canvas, CanvasText, etc.)
- Color interpolation rules
- Gamut mapping algorithm

### CSS Color Level 5 (W3C Working Draft, Feb 2026)

Features defined:
- **`color-mix()`** — Mix two colors in any color space
- **Relative color syntax** — `from` keyword for deriving colors
- **`light-dark()`** — Two-value function responding to color-scheme
- **`contrast-color()`** — Automatically selects a contrasting color (still experimental, limited support)
- **`device-cmyk()`** — Uncalibrated CMYK representation
- **Custom color spaces** via ICC profiles in the `color()` function
- Extension of `color()` for custom ICC profile color spaces

### On the Horizon (Level 6 and beyond)

- **`contrast-color()`** — Automatic WCAG-compliant contrast color selection
- **CSS `if()` function** — General conditional values (Chrome 137+)
- **`@property` with color-scheme** — Scheme-aware custom property registration
- **Container-query-driven theming** — Experimental

---

## 13. Why OKLCH and OKLAB Are Superior for Design Systems

### Problem 1: HSL's Lightness Is a Lie

```css
/* Both have L=50%, but yellow looks MUCH brighter than blue */
hsl(60 100% 50%)   /* Yellow — perceived as very bright */
hsl(240 100% 50%)  /* Blue — perceived as very dark */
```

In HSL, "lightness" is a mathematical midpoint of the RGB channel values, not a perceptual measure. Two colors with the same HSL lightness can look drastically different in brightness. This makes it impossible to generate consistent palettes programmatically.

### Problem 2: CIE Lab/LCH's Blue Hue Shift

CIE Lab improved on HSL by being approximately perceptually uniform. However, it has a known defect: when you change the lightness or chroma of blue colors (hue range ~270-330), the hue visibly shifts toward purple. This means automated palette generation in LCH produces unexpected results for blues.

### OKLCH Solves Both Problems

Bjorn Ottosson created Oklab in 2020 specifically to fix these issues:

1. **True perceptual uniformity:** Two colors with the same L value in OKLCH look equally bright to human eyes, regardless of hue. This is verified empirically, not just mathematically.

2. **No blue hue shift:** Changing lightness or chroma in OKLCH keeps the hue constant across the entire hue range, including blues.

3. **Predictable contrast:** Because L is perceptually linear, you can predict WCAG contrast ratios from lightness values alone. If `L=0.45` gives 4.5:1 contrast against white, that holds for every hue.

4. **Clean gradient interpolation:** Gradients in OKLCH never go through muddy or unexpected intermediate colors. Compare:
   ```css
   /* HSL gradient from blue to green goes through ugly desaturated gray */
   background: linear-gradient(in hsl, blue, green);

   /* OKLCH gradient from blue to green stays vivid */
   background: linear-gradient(in oklch, blue, green);
   ```

5. **Design token efficiency:** With OKLCH, a single base color can generate an entire palette through simple L and C adjustments:
   ```css
   --blue-100: oklch(0.95 0.03 250);  /* Light tint */
   --blue-500: oklch(0.60 0.20 250);  /* Base */
   --blue-900: oklch(0.25 0.10 250);  /* Dark shade */
   ```
   All three are guaranteed to look like "blue" (no hue drift), and the lightness progression is perceptually even.

6. **Wide gamut as default:** OKLCH can express P3 and Rec.2020 colors naturally. When a color exceeds the display's gamut, browsers automatically gamut-map it to the closest displayable color. You get wide-gamut colors on capable displays and graceful degradation everywhere else.

7. **Industry adoption:**
   - **Tailwind CSS v4** switched all color tokens from HSL to OKLCH
   - **The CSS Working Group** recommends OKLCH for color manipulation
   - **Evil Martians' OKLCH Color Picker** (oklch.com) has become a standard tool

### When to Still Use Other Formats

- **HEX:** When interfacing with legacy tools, APIs, or design files that only accept hex
- **rgb():** When you need integer channel values for canvas/WebGL operations
- **hsl():** Quick prototyping when perceptual accuracy doesn't matter
- **color(display-p3 ...):** When you need a specific P3 color by its channel values
- **lab()/lch():** Rare — OKLCH is strictly better for CSS use. Lab/LCH may still appear in scientific/print contexts

---

## 14. Theming Systems

### Design Token Architecture with Modern CSS Colors

```css
/* === Layer 1: Primitive tokens (raw OKLCH values) === */
:root {
  --hue-brand: 250;
  --hue-success: 145;
  --hue-warning: 80;
  --hue-danger: 25;
}

/* === Layer 2: Base palette (generated from primitives) === */
:root {
  --brand-base: oklch(0.6 0.2 var(--hue-brand));

  --brand-50:  color-mix(in oklch, var(--brand-base) 8%, white);
  --brand-100: color-mix(in oklch, var(--brand-base) 16%, white);
  --brand-200: color-mix(in oklch, var(--brand-base) 32%, white);
  --brand-300: color-mix(in oklch, var(--brand-base) 50%, white);
  --brand-400: color-mix(in oklch, var(--brand-base) 75%, white);
  --brand-500: var(--brand-base);
  --brand-600: color-mix(in oklch, var(--brand-base) 80%, black);
  --brand-700: color-mix(in oklch, var(--brand-base) 60%, black);
  --brand-800: color-mix(in oklch, var(--brand-base) 40%, black);
  --brand-900: color-mix(in oklch, var(--brand-base) 25%, black);
}

/* === Layer 3: Semantic tokens (intent-based) === */
:root {
  color-scheme: light dark;

  --color-text:        light-dark(var(--brand-900), var(--brand-100));
  --color-text-muted:  light-dark(var(--brand-600), var(--brand-400));
  --color-bg:          light-dark(#ffffff, var(--brand-950));
  --color-bg-surface:  light-dark(var(--brand-50), var(--brand-900));
  --color-border:      light-dark(var(--brand-200), var(--brand-700));
  --color-primary:     light-dark(var(--brand-600), var(--brand-400));
  --color-primary-hover: color-mix(in oklch, var(--color-primary) 85%, black);
}

/* === Layer 4: Component tokens === */
.btn-primary {
  background: var(--color-primary);
  color: white;
}
.btn-primary:hover {
  background: var(--color-primary-hover);
}
```

### Dark Mode with light-dark()

**The modern approach (no media queries for colors):**
```css
:root {
  color-scheme: light dark;

  --surface:   light-dark(oklch(0.98 0.005 250), oklch(0.15 0.01 250));
  --text:      light-dark(oklch(0.20 0.02 250),  oklch(0.90 0.01 250));
  --accent:    light-dark(oklch(0.55 0.20 250),  oklch(0.72 0.15 250));
}
```

**Toggling via JavaScript:**
```js
function setTheme(theme) {
  document.documentElement.style.colorScheme = theme; // 'light', 'dark', or 'light dark'
}
```

**Toggling via CSS class (for user override):**
```css
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
/* No data-theme attribute → respects OS preference via `light dark` */
```

### CSS Custom Properties Strategy

**Do:**
- Store colors as complete `oklch()` values in custom properties
- Use `color-mix()` and relative colors to derive variants
- Use semantic naming (`--color-text`, not `--blue-500`)
- Use `light-dark()` for mode-aware tokens

**Don't:**
- Store individual channels separately (fragile, verbose)
- Store hex values in custom properties (can't manipulate them)
- Hard-code light/dark variants separately when `light-dark()` works

---

## 15. Practical Recommendations by Use Case

### Programmatic Color Manipulation
**Best:** `oklch()` with relative color syntax
```css
/* Lighten, darken, saturate, desaturate, hue-shift — all trivial */
oklch(from var(--base) calc(l + 0.1) c h)
```
**Runner-up:** `color-mix()` in oklch for tint/shade operations

### Accessibility / Contrast
**Best:** `oklch()` — the L channel directly correlates with perceived lightness. You can ensure consistent contrast ratios across hues by controlling L.
**Tools:** Use APCA (Advanced Perceptual Contrast Algorithm) rather than WCAG 2.x AA for more accurate contrast measurement. OKLCH's L channel aligns well with APCA's Lc values.

### Palette Generation
**Best:** `oklch()` — set a fixed L and C, vary H for a harmonious palette where all colors are equally bright and saturated:
```css
--red:    oklch(0.65 0.2 25);
--orange: oklch(0.65 0.2 55);
--yellow: oklch(0.65 0.2 90);
--green:  oklch(0.65 0.2 145);
--blue:   oklch(0.65 0.2 250);
--purple: oklch(0.65 0.2 300);
```
All of these will appear equally bright and vivid — impossible to achieve in HSL.

### Smooth Gradients
**Best:** `oklab()` for interpolation (or specify `in oklch` in gradient functions):
```css
background: linear-gradient(in oklch, oklch(0.7 0.2 30), oklch(0.7 0.2 180));
```
No muddy gray midpoints.

### Dark Mode Theming
**Best:** `light-dark()` combined with OKLCH tokens and `color-mix()`
```css
--accent: light-dark(oklch(0.55 0.22 250), oklch(0.75 0.15 250));
```

### Wide-Gamut / Vivid Colors
**Best:** `oklch()` (automatically uses full gamut) or `color(display-p3 ...)` when you need specific P3 channel values.

### Legacy Compatibility
**Best:** HEX or `rgb()` with cascade fallbacks:
```css
color: #3b82f6;
color: oklch(0.6 0.2 250);
```

### Forced Colors / High Contrast
**Best:** System colors (`Canvas`, `CanvasText`, `ButtonFace`, etc.) within `@media (forced-colors: active)`.

---

## 16. Browser Support Summary

| Feature | Chrome | Firefox | Safari | Edge | Status |
|---------|--------|---------|--------|------|--------|
| HEX (#RRGGBBAA) | 62+ | 49+ | 10+ | 79+ | Baseline |
| `rgb()` modern syntax | 65+ | 52+ | 12.1+ | 79+ | Baseline |
| `hsl()` modern syntax | 65+ | 52+ | 12.1+ | 79+ | Baseline |
| `hwb()` | 101+ | 96+ | 15+ | 101+ | Baseline (April 2022) |
| `lab()` / `lch()` | 111+ | 113+ | 15.4+ | 111+ | Baseline |
| `oklab()` / `oklch()` | 111+ | 113+ | 15.4+ | 111+ | Baseline |
| `color()` | 111+ | 113+ | 15.4+ | 111+ | Baseline |
| `color-mix()` | 111+ | 113+ | 16.2+ | 111+ | Baseline |
| Relative color syntax | 119+ | 128+ | 16.4+ | 119+ | Baseline (2025) |
| `light-dark()` | 123+ | 120+ | 17.5+ | 123+ | Baseline (May 2024) |
| `color-scheme` property | 81+ | 96+ | 12.1+ | 81+ | Baseline |
| `forced-colors` media | 89+ | 89+ | 16+ | 79+ | Baseline |
| `contrast-color()` | No | No | No | No | Experimental |

---

## 17. Sources

- [W3C CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)
- [W3C CSS Color Module Level 5](https://www.w3.org/TR/css-color-5/)
- [MDN: CSS Colors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors)
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [MDN: light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)
- [MDN: oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch)
- [MDN: Relative Colors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors)
- [MDN: System Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color)
- [MDN: color() function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)
- [Evil Martians: OKLCH in CSS — Why We Moved from RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Josh W. Comeau: Color Formats in CSS](https://www.joshwcomeau.com/css/color-formats/)
- [Smashing Magazine: Falling For OKLCH](https://www.smashingmagazine.com/2023/08/oklch-color-spaces-gamuts-css/)
- [Smashing Magazine: A Guide to Modern CSS Colors](https://www.smashingmagazine.com/2021/11/guide-modern-css-colors/)
- [Chrome Developers: CSS Relative Color Syntax](https://developer.chrome.com/blog/css-relative-color-syntax)
- [Chrome Developers: CSS color-mix()](https://developer.chrome.com/docs/css-ui/css-color-mix)
- [Chrome Developers: High Definition CSS Color Guide](https://developer.chrome.com/docs/css-ui/high-definition-css-color-guide)
- [Lea Verou: LCH Colors in CSS](https://lea.verou.me/blog/2020/04/lch-colors-in-css-what-why-and-how/)
- [CSS-Tricks: oklch()](https://css-tricks.com/almanac/functions/o/oklch/)
- [WebKit: Wide Gamut Color in CSS with Display-P3](https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/)
- [Can I Use: color-mix()](https://caniuse.com/mdn-css_types_color_color-mix)
- [Can I Use: Relative Colors](https://caniuse.com/css-relative-colors)
- [Adrian Roselli: WHCM and System Colors](https://adrianroselli.com/2021/02/whcm-and-system-colors.html)
- [mamutlove: Theming with CSS in 2025](https://mamutlove.com/en/blog/theming-with-css-in-2025/)
