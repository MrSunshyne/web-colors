export interface ColorFormat {
  id: string
  name: string
  slug: string
  spec: string
  syntax: string
  year: number
  description: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  gamut: 'srgb' | 'p3' | 'any'
  perceptuallyUniform: boolean
  humanReadable: 'low' | 'medium' | 'high'
  browserSupport: 'universal' | 'modern' | 'cutting-edge'
  themingScore: 1 | 2 | 3 | 4 | 5
}

export const useColorFormats = () => {
  const formats: ColorFormat[] = [
    {
      id: 'hex',
      name: 'Hex',
      slug: 'hex',
      spec: 'CSS Color Level 1',
      syntax: '#RRGGBB / #RGB / #RRGGBBAA',
      year: 1996,
      description: 'The original web color format. A compact hexadecimal representation of RGB values.',
      pros: [
        'Universal browser support since the earliest days of CSS',
        'Extremely compact notation — 4 or 7 characters',
        'Easy to copy/paste from design tools',
        'Every developer recognizes hex codes instantly'
      ],
      cons: [
        'Completely unreadable — #7B2D8E tells you nothing about the color',
        'Cannot adjust a single channel without converting to another format',
        'Limited to sRGB gamut',
        'No native way to add transparency (until #RRGGBBAA was added later)'
      ],
      bestFor: ['Brand color definitions', 'Quick prototyping', 'Design tool interop'],
      gamut: 'srgb',
      perceptuallyUniform: false,
      humanReadable: 'low',
      browserSupport: 'universal',
      themingScore: 1
    },
    {
      id: 'rgb',
      name: 'RGB / RGBA',
      slug: 'rgb',
      spec: 'CSS Color Level 3',
      syntax: 'rgb(R G B) / rgb(R G B / alpha)',
      year: 2003,
      description: 'Functional notation for the red-green-blue color model. The same model as hex but more readable and with native alpha support.',
      pros: [
        'Clear channel separation — easy to see red, green, blue values',
        'Native alpha channel support',
        'Works with CSS custom properties for individual channel manipulation',
        'Universal browser support'
      ],
      cons: [
        'Hard to predict what color rgb(147, 45, 142) will produce',
        'Adjusting "brightness" or "saturation" requires changing multiple channels',
        'Limited to sRGB gamut',
        'Not perceptually uniform — equal numeric changes don\'t look equal'
      ],
      bestFor: ['Programmatic color manipulation', 'Alpha transparency effects', 'JavaScript interop'],
      gamut: 'srgb',
      perceptuallyUniform: false,
      humanReadable: 'low',
      browserSupport: 'universal',
      themingScore: 2
    },
    {
      id: 'hsl',
      name: 'HSL / HSLA',
      slug: 'hsl',
      spec: 'CSS Color Level 3',
      syntax: 'hsl(H S L) / hsl(H S L / alpha)',
      year: 2003,
      description: 'Hue-Saturation-Lightness. The first human-friendly color model in CSS, mapping to how we naturally think about color.',
      pros: [
        'Intuitive — "rotate the hue, adjust saturation, change lightness"',
        'Easy to create color palettes by varying one channel',
        'Great for theming — change the hue to re-theme entirely',
        'Well-understood model with wide adoption'
      ],
      cons: [
        'Not perceptually uniform — hsl(60, 100%, 50%) looks far brighter than hsl(240, 100%, 50%)',
        'Lightness is mathematically calculated, not perceptual — colors at "the same lightness" look different',
        'Limited to sRGB gamut',
        'Saturation behaves inconsistently across different lightness levels'
      ],
      bestFor: ['Quick palette generation', 'Simple theming systems', 'Learning color theory'],
      gamut: 'srgb',
      perceptuallyUniform: false,
      humanReadable: 'high',
      browserSupport: 'universal',
      themingScore: 3
    },
    {
      id: 'hwb',
      name: 'HWB',
      slug: 'hwb',
      spec: 'CSS Color Level 4',
      syntax: 'hwb(H W B) / hwb(H W B / alpha)',
      year: 2022,
      description: 'Hue-Whiteness-Blackness. Designed to be even more intuitive than HSL — like mixing paint with white and black.',
      pros: [
        'Very intuitive — "start with a hue, add white or black"',
        'Maps to how artists think about tinting and shading',
        'Same hue wheel as HSL, easy to transition',
        'Simpler mental model than saturation + lightness'
      ],
      cons: [
        'Not perceptually uniform (same issue as HSL)',
        'Limited to sRGB gamut',
        'Less widely known and used than HSL',
        'Not as useful for programmatic palette generation as OKLCH'
      ],
      bestFor: ['Intuitive tint/shade creation', 'Design exploration', 'Artists and painters moving to digital'],
      gamut: 'srgb',
      perceptuallyUniform: false,
      humanReadable: 'high',
      browserSupport: 'modern',
      themingScore: 3
    },
    {
      id: 'lab',
      name: 'LAB (CIE Lab)',
      slug: 'lab',
      spec: 'CSS Color Level 4',
      syntax: 'lab(L a b) / lab(L a b / alpha)',
      year: 2022,
      description: 'The CIE Lab color space — device-independent and designed to approximate human vision. L is lightness, a is green-red, b is blue-yellow.',
      pros: [
        'Perceptually uniform — equal numeric changes produce equal perceived changes',
        'Device-independent color representation',
        'Much wider gamut than sRGB',
        'Industry standard in print and photography'
      ],
      cons: [
        'The a and b axes are unintuitive (green-red? blue-yellow?)',
        'Hue shifts can occur when interpolating between colors',
        'Not as perceptually uniform as initially thought (OKLAB improves on this)',
        'Harder to reason about than HSL-style models'
      ],
      bestFor: ['Color science applications', 'Cross-media color matching', 'Accessibility analysis'],
      gamut: 'any',
      perceptuallyUniform: true,
      humanReadable: 'low',
      browserSupport: 'modern',
      themingScore: 2
    },
    {
      id: 'lch',
      name: 'LCH (CIE LCH)',
      slug: 'lch',
      spec: 'CSS Color Level 4',
      syntax: 'lch(L C H) / lch(L C H / alpha)',
      year: 2022,
      description: 'The polar form of LAB — Lightness, Chroma, Hue. Combines the perceptual uniformity of Lab with the intuitiveness of a hue angle.',
      pros: [
        'Perceptually uniform lightness',
        'Hue angle makes it intuitive like HSL but perceptually accurate',
        'Wide gamut — can represent colors beyond sRGB',
        'Chroma (colorfulness) is more useful than saturation for design'
      ],
      cons: [
        'Has known hue shift issues (particularly in blues)',
        'OKLCH resolves the hue shift problems, making LCH somewhat superseded',
        'Chroma scale is open-ended, not 0-100%',
        'Browser support more recent than sRGB formats'
      ],
      bestFor: ['Wide-gamut color specification', 'Perceptually even palettes', 'Advanced design systems'],
      gamut: 'any',
      perceptuallyUniform: true,
      humanReadable: 'medium',
      browserSupport: 'modern',
      themingScore: 4
    },
    {
      id: 'oklab',
      name: 'OKLAB',
      slug: 'oklab',
      spec: 'CSS Color Level 4',
      syntax: 'oklab(L a b) / oklab(L a b / alpha)',
      year: 2022,
      description: 'An improved perceptually uniform color space created by Björn Ottosson in 2020. Fixes the hue shift and uniformity issues of CIE Lab.',
      pros: [
        'Truly perceptually uniform — the best we have',
        'No hue shifts during interpolation (unlike Lab/LCH)',
        'Gradients look naturally smooth',
        'The foundation of OKLCH — the recommended format for modern CSS'
      ],
      cons: [
        'The a/b axes are still unintuitive (use OKLCH for the polar form instead)',
        'Relatively new — documentation and tooling still catching up',
        'Not human-readable for direct authoring',
        'Browsers gamut-map to sRGB on non-wide-gamut displays'
      ],
      bestFor: ['Color interpolation and gradients', 'Programmatic color blending', 'Color science'],
      gamut: 'any',
      perceptuallyUniform: true,
      humanReadable: 'low',
      browserSupport: 'modern',
      themingScore: 3
    },
    {
      id: 'oklch',
      name: 'OKLCH',
      slug: 'oklch',
      spec: 'CSS Color Level 4',
      syntax: 'oklch(L C H) / oklch(L C H / alpha)',
      year: 2022,
      description: 'The polar form of OKLAB — the recommended color format for modern CSS. Combines true perceptual uniformity with the human-friendly hue/chroma/lightness model.',
      pros: [
        'Truly perceptually uniform — colors at the same L value look equally bright',
        'Intuitive: Lightness (0-1), Chroma (colorfulness), Hue (angle)',
        'No hue shifts during interpolation',
        'Wide gamut — can represent P3 and Rec. 2020 colors',
        'Ideal for design systems — predictable, manipulable, consistent'
      ],
      cons: [
        'Chroma values differ per hue — no single "max chroma" value',
        'Need to understand gamut clipping for sRGB fallbacks',
        'Not all design tools output OKLCH natively yet',
        'Relatively new format'
      ],
      bestFor: ['Design systems and theming', 'Palette generation', 'Dark mode', 'Accessible color systems', 'Modern CSS development'],
      gamut: 'any',
      perceptuallyUniform: true,
      humanReadable: 'high',
      browserSupport: 'modern',
      themingScore: 5
    },
    {
      id: 'display-p3',
      name: 'Display P3',
      slug: 'display-p3',
      spec: 'CSS Color Level 4',
      syntax: 'color(display-p3 R G B / alpha)',
      year: 2022,
      description: 'Access to the Display P3 gamut via the color() function. ~50% more colors than sRGB, supported by most modern screens.',
      pros: [
        'Access to vibrant, saturated colors impossible in sRGB',
        'Most modern phones and laptops support P3',
        'Uses the familiar R G B channel model',
        'Can create colors that literally "pop" compared to sRGB'
      ],
      cons: [
        'Values are 0-1, not 0-255 — different from traditional RGB',
        'Not perceptually uniform',
        'Need @supports or @media (color-gamut: p3) for fallbacks',
        'Hard to predict what a color looks like from the numbers'
      ],
      bestFor: ['Vibrant brand colors', 'HDR-ready content', 'Photography and media-rich sites'],
      gamut: 'p3',
      perceptuallyUniform: false,
      humanReadable: 'low',
      browserSupport: 'modern',
      themingScore: 2
    },
    {
      id: 'color-mix',
      name: 'color-mix()',
      slug: 'color-mix',
      spec: 'CSS Color Level 5',
      syntax: 'color-mix(in oklch, color1 %, color2 %)',
      year: 2023,
      description: 'A CSS function that mixes two colors in any color space. The Swiss Army knife of CSS color manipulation — create tints, shades, and blends without preprocessors.',
      pros: [
        'Mix any two colors in any color space, right in CSS',
        'Replace Sass lighten()/darken() with native CSS',
        'Works beautifully with CSS custom properties for theming',
        'Choose the interpolation space (use oklch for best results)'
      ],
      cons: [
        'Can produce unexpected results in sRGB interpolation space',
        'Computed values are hard to inspect in DevTools',
        'Two-color limit per function call (can be nested though)',
        'Requires understanding which color space to interpolate in'
      ],
      bestFor: ['Dynamic theming', 'Hover/active state generation', 'Tint and shade scales', 'Reducing color token count'],
      gamut: 'any',
      perceptuallyUniform: false,
      humanReadable: 'high',
      browserSupport: 'modern',
      themingScore: 5
    },
    {
      id: 'relative-colors',
      name: 'Relative Color Syntax',
      slug: 'relative-colors',
      spec: 'CSS Color Level 5',
      syntax: 'oklch(from var(--base) calc(l + 0.1) c h)',
      year: 2024,
      description: 'Derive new colors from existing ones by modifying individual channels. The most powerful CSS color feature for building theming systems.',
      pros: [
        'Modify any channel of any color — lightness, hue, chroma, alpha',
        'Use calc() for mathematical transformations',
        'Build entire palettes from a single base color with CSS custom properties',
        'No JavaScript needed for complex color manipulation'
      ],
      cons: [
        'Complex syntax — steep learning curve',
        'Browser support still rolling out (Chrome 119+, Safari 16.4+, Firefox 128+)',
        'Debugging computed values can be challenging',
        'Easy to produce out-of-gamut colors accidentally'
      ],
      bestFor: ['Advanced theming systems', 'Single-token palette generation', 'Dynamic color schemes', 'Accessible contrast generation'],
      gamut: 'any',
      perceptuallyUniform: false,
      humanReadable: 'medium',
      browserSupport: 'cutting-edge',
      themingScore: 5
    }
  ]

  return { formats }
}
