/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#F5F0E8',
    tint: '#D9B77A',

    // Core surfaces
    background: '#07121F',
    foreground: '#F5F0E8',

    // Cards / elevated surfaces
    card: '#102236',
    cardForeground: '#F5F0E8',

    // Primary action color (buttons, links, active states)
    primary: '#D9B77A',
    primaryForeground: '#07121F',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#162D43',
    secondaryForeground: '#F5F0E8',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#153049',
    mutedForeground: '#9AAABB',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#EBCB91',
    accentForeground: '#07121F',

    // Destructive actions (delete, error states)
    destructive: '#E66E62',
    destructiveForeground: '#FFFFFF',

    // Borders and input outlines
    border: '#26425B',
    input: '#26425B',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
