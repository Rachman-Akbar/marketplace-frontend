# Design System Document

## 1. Overview & Creative North Star: "The Curated Canvas"

This design system is built to transcend the "utility-only" feel of traditional marketplaces. While platforms like Amazon focus on density, this system prioritizes **The Curated Canvas**—a philosophy that treats every product listing as a gallery piece and every interface element as a premium architectural detail. 

We break the "template" look by utilizing **intentional asymmetry** and **tonal depth**. Instead of rigid boxes, we use expansive breathing room and overlapping elements (like product imagery breaking the bounds of their containers) to create a sense of movement. The "Modern Marketplace" is not just a list of items; it is a high-end editorial experience that builds trust through sophisticated restraint.

---

## 2. Colors & Surface Architecture

The palette is anchored in a deep, authoritative forest green (`primary`: `#006e39`) and a series of hyper-clean neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the definition needed. 

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
- **Base Layer:** `surface` (#f8fafb) for global backgrounds.
- **Mid Layer:** `surface-container-low` (#f0f4f6) for secondary content zones.
- **Top Layer:** `surface-container-lowest` (#ffffff) for primary interactive cards.
By nesting a "Lowest" (brightest) card inside a "Low" or "High" container, you create a natural "pop" without a single line of CSS border.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" appearance:
- **Glassmorphism:** Use semi-transparent versions of `surface-container-lowest` with a `24px` backdrop-blur for floating navigation bars and modals.
- **Signature Gradients:** For primary CTAs, utilize a subtle linear gradient from `primary` (#006e39) to `primary_dim` (#006031) at a 135-degree angle. This adds "soul" and weight to the click action.

---

## 3. Typography: Editorial Authority

We use a dual-font strategy to balance character with high-speed readability.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and modern "tech-premium" feel. Use `display-lg` through `headline-sm` for marketing beats and product titles to assert brand personality.
*   **Interface & Body (Inter):** The workhorse. Inter is used for all functional text (`body-md`, `label-sm`). Its high x-height ensures that price points and product specs remain legible even at the smallest scales.

**Hierarchy Tip:** Use `on-surface-variant` (#596063) for secondary metadata to create a clear visual distinction from primary product titles in `on-surface` (#2c3436).

---

## 4. Elevation & Depth: Tonal Layering

We reject the heavy, muddy shadows of the early 2010s. Depth is a whisper, not a shout.

*   **The Layering Principle:** Achieve 90% of your hierarchy through "stacking" surface tokens. A `surface-container-highest` side panel against a `surface` background creates immediate functional separation.
*   **Ambient Shadows:** When an element must float (e.g., a cart drawer or a dropdown), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(44, 52, 54, 0.06);`. The shadow is tinted with the `on-surface` color to ensure it feels like a natural part of the environment.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast modes), use `outline-variant` (#acb3b6) at **15% opacity**. Never use 100% opaque lines.
*   **Glassmorphism:** Apply a `12px` blur to any element using the `surface_container_lowest` token with an 80% alpha channel to create a "frosted glass" effect for utility overlays.

---

## 5. Components

### Buttons
- **Primary:** Rounded `md` (0.75rem), using the `primary` fill and `on-primary` text. Use the "Signature Gradient" for the default state.
- **Secondary:** Use `secondary_container` fill with `on-secondary_container` text. No border.
- **Tertiary:** Text-only in `primary`, but with a `surface-container-high` background on hover.

### Input Fields
- **Styling:** Use `surface-container-highest` as the background fill. 
- **States:** On focus, the field transitions to a `surface-container-lowest` fill with a `2px` "Ghost Border" in `primary`.

### Cards (The Marketplace Hero)
- **Rules:** Absolutely no dividers. Separate the product image, title, and price using the Spacing Scale (e.g., 16px gap).
- **Radius:** Always use `lg` (1rem) for product cards to give a soft, approachable feel.

### Interactive Chips
- **Filter Chips:** Use `surface-container-low` with `md` (0.75rem) rounding. When selected, transition to `primary_container` with `on_primary_container` text.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical padding in Hero sections (e.g., more padding on the left than the right) to create editorial interest.
- **Do** allow product images to overflow their containers slightly in featured sections.
- **Do** use `primary_fixed_dim` for subtle "Sale" or "New" badges to maintain color harmony.

### Don't
- **Don't** use black (#000000) for text. Always use `on_surface` (#2c3436) to keep the contrast sophisticated, not jarring.
- **Don't** use 1px dividers between list items. Use an 8px vertical gap and a subtle `surface-container-low` background on hover instead.
- **Don't** use sharp 0px corners. Every element, including images, must respect the rounding scale (`DEFAULT` to `xl`).

---

## 7. Responsive Philosophy: Desktop-First Premium

While the system is responsive, the "Signature" experience is optimized for desktop. 
- **The Power of White Space:** On screens wider than 1440px, increase global margins to 120px+. 
- **Layered Layouts:** Use absolute positioning to let "Limited Edition" labels or "Brand Logos" float over the corners of product imagery, utilizing the **Ambient Shadow** tokens to keep them legible.