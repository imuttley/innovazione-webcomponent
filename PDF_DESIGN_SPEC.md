# PDF Design Specification - form2pdf.ts

This document describes the design layout, typography, and measurements used in the PDF generation process defined in `src/component/lib/form2pdf.ts`.

## 1. General Page Settings
- **Page Size:** A4
- **Default Font:** `TitilliumWeb`
- **Page Margins:** `[5, 90, 5, 70]` (Left, Top, Right, Bottom)
- **Language:** Dynamic (`it-IT` or `en-GB`) based on input.

## 2. Typography & Styles

| Style Name | Font Size | Weight | Alignment | Margins [L, T, R, B] | Extra Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `header` | 16pt* | Bold | Center | `[20, dynamic, 20, 20]` | *Dynamic size and top margin |
| `section` | 12pt | Bold | Left | `[20, 10, 20, 5]` | Section headers |
| `sectiontrl` | 12pt | Bold | - | - | TRL specific section |
| `sectiongen` | 12pt | Bold | - | `marginTop: 10` | General section |
| `sectionupdate`| 12pt | Bold | Right | `[20, 10, 20, 5]` | - |
| `sectionlicense`| 12pt | Bold | Left | `[20, 10, 20, 5]` | - |
| `body` | 11pt | Normal | Justify | `[20, 5, 20, 5]` | Main content text |
| `footer` | 11pt | Bold | Right | - | White color |
| `contact` | 11pt | Normal | Right | - | White color |
| `simple` | 11pt | Normal | - | `marginLeft: 20` | Simple indented text |
| `chief` | 11pt | Normal | Justify | `[10, 5, 12, 5]` | Uses `TilliumWeb` specifically |
| `rightside` | 11pt | Normal | Right | `[20, 10, 20, 5]` | - |
| `leftside` | 11pt | Normal | Left | `marginLeft: 20` | - |
| `underscore` | 11pt | Normal | Left | `[20, 10, 20, 5]` | - |
| `titlebckgnd` | - | - | - | `[20, 10, 0, 0]` | Background image style |
| `image-desc` | 10pt | Normal | - | `[0, 5, 0, 0]` | Image grid captions |

### Dynamic Typography Logic
- **Header Font Size:** Calculated based on title length:
  - If length < 47 characters: **18pt**
  - Else: `18 - Math.round(length / 60)`
- **Header Top Margin:** `-calculatedHeight() + 30` (Calculated height depends on background height + font size * lines).

## 3. Visual Components

### Header
- **KEP Logo:** SVG, width 120, aligned left with 20px margin.
- **Technology Band:** SVG trapezoid with linear gradient (`#052f4a` to `#51a2ff`). 
  - Contains technology type text (Font size 20, Bold, White).
  - Aligned right.
- **Background Image:** `basebkg` image spanning 545px width with dynamic height.

### Footer
- **Background:** Solid blue rectangle (`#1b67b2`).
- **ENEA Logo:** SVG, width 150, aligned left with 20px margin.
- **Labels:**
  - "Knowledge Exchange Program" (Style: `footer`).
  - "trasferimento.tecnologico@enea.it" (Style: `contact`, clickable link).
- **Page Numbers:** Aligned center, 8pt, White color.

### Image Grid
- **Layout:** `noBorders` (No visible table lines).
- **Columns:** Dynamic (1 or 2 columns depending on content).
- **Fitting:** Photos fit within cells (`fit` attribute), descriptions follow with `image-desc` style.
- **Spacing:** Cell padding set to 2 units.

## 4. Visual Assets (Embedded Images/SVGs)
- `basebkg`: Main title background image (JPEG).
- `logokep`: Knowledge Exchange Program logo (JPEG).
- `eneavert`: ENEA vertical logo.
- `headbackground`: Header background pattern.
- `kepplogo`: SVG version of the KEP logo.
- `trlv2` & `trlarrow`: SVGs used for the TRL (Technology Readiness Level) indicator.

## 5. Colors
- **Footer Background:** `#1b67b2` (Solid blue rectangle).
- **Trapezoid Band Gradient:**
  - Start: `#052f4a` (Dark blue)
  - End: `#51a2ff` (Light blue)
- **Text Primary:** Black (`#000000`)
- **Text Secondary (Footer/Contact):** White (`#FFFFFF`)
