# Animation Guide: Google Antigravity

This guide describes the motion design principles that give [antigravity.google](https://antigravity.google/) its dynamic and responsive feel.

## 1. Page Load Animations

These animations trigger immediately when the visitor lands on the site to create a sense of "liftoff."

*   **Hero Reveal:**
    *   **Elements:** Main H1 heading and CTA buttons.
    *   **Motion:** `Fade-in` + `Slide-up` (Y: 20px).
    *   **Duration/Easing:** ~0.8s with a smooth `cubic-bezier` (out-quint).
*   **Stardust Drift:**
    *   **Elements:** Blue background particles.
    *   **Motion:** Continuous, slow randomized drift along the X and Y axes.
    *   **Type:** Constant loop (Animation-fill-mode: forwards).

## 2. Scroll-Triggered Animations

Most content on the page uses "Enter" animations triggered by the user's scroll depth.

*   **Section Reveal:**
    *   **Trigger:** Intersection Observer (approx. 10% visibility).
    *   **Elements:** Feature cards, text blocks, and the IDE showcase.
    *   **Motion:** `Opacity: 0 to 1` combined with a `Slide-up` (Y: 30px to 0).
    *   **Staggering:** Items in a row (like feature icons) reveal sequentially with a `50ms-100ms` delay between them.
*   **The "Breathing" IDE:**
    *   **Elements:** The main IDE showcase interface card.
    *   **Motion:** A very subtle, slow pulse of a blue/white glow (box-shadow or radial-gradient).
    *   **Meaning:** Communicates that the tool is "alive" and processing.

## 3. Hover & Interactive States

Micro-interactions that provide instant feedback to user input.

*   **Pill Buttons:**
    *   **Trigger:** Mouse hover.
    *   **Motion:** Small background color transition (e.g., `#F8F9FA` to `#E8EAED`) and optional `scale(1.02)`.
*   **Feature Navigation:**
    *   **Trigger:** Navigation menu items.
    *   **Motion:** Text color transition and subtle underline "grow" from center (in some versions).
*   **Interactive Graphics:**
    *   **Elements:** Small UI icons or illustrative graphics.
    *   **Motion:** Rotation or slight tilt towards the mouse position.
