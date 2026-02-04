# Playo Premium Design System v2.0

## Overview
The Playo app uses a modern, premium design system built on **visual depth, refined typography, and consistent brand expression** using green as the primary color (#5FD382).

---

## 1. Visual Hierarchy & Depth

### Shadows Instead of Borders
- **Primary principle**: Use **shadows for elevation**, not borders
- **No colored borders** on cards unless specifically for states
- **Subtle depth**: sm/md shadows for cards, lg/xl for elevated elements

**Implementation:**
```tsx
// ❌ OLD - Flat, bordered look
borderWidth: 1,
borderColor: colors.border,

// ✅ NEW - Elevated, depth-based look
borderWidth: 0,
...Shadows.md,
```

### Shadow Hierarchy
- **Shadows.sm**: Input fields, small components (elevation: 1)
- **Shadows.md**: Regular cards, buttons (elevation: 2)
- **Shadows.lg**: Featured cards, modals (elevation: 5)
- **Shadows.xl**: Top-level overlays (elevation: 8)

---

## 2. Typography Scale & Hierarchy

### Headlines (Large, Bold)
```
- Title: 28px, weight 800, letter-spacing -0.5
- Subtitle: 16px, weight 400, opacity 0.75
```

### Action Text
```
- Button text: weight 700 (secondary), 600 (primary)
- Link text: weight 800, color primary
```

### Body Text
```
- Primary: weight 500, opacity 1
- Secondary: weight 400, opacity 0.75
```

### Implementation Pattern
```tsx
// Headers get extra visual weight
...Typography.headingLarge,
fontSize: 28,
fontWeight: '800',
letterSpacing: -0.5,

// Subtitles are lighter
...Typography.bodyLarge,
fontWeight: '400',
opacity: 0.75,
```

---

## 3. Color System & Brand Injection

### Primary Green (#5FD382)
- **Active states**: Primary button, selected items, focus states
- **Backgrounds**: Tinted at 10-20% opacity for subtle highlights
- **Text**: Primary action text, links, important labels

### Secondary Elements
```tsx
// Icon containers (sport cards, feature cards)
backgroundColor: colors.primary + '20'  // 20% opacity tint

// Info boxes
backgroundColor: colors.primary + '10'  // 10% opacity tint
borderLeftColor: colors.primary,        // Accent bar
```

### Text Hierarchy
```
- Primary text: #1F1F1F (darkNavy)
- Secondary: #6B7280 (darkGrey)
- Light: #9CA3AF (mediumGrey)
```

---

## 4. Active & Focused States

### Sports Card Active State
```tsx
// Inactive
backgroundColor: colors.card,
...Shadows.sm,

// Active
backgroundColor: colors.primary + '12',
...Shadows.lg,  // Elevated shadow
borderWidth: 0, // No border
checkmark: true, // Green checkmark indicator
```

### Input Focus State
```tsx
// Default
borderBottomWidth: 2,
borderBottomColor: colors.inputBorder,

// Focused
borderBottomColor: colors.primary,
backgroundColor: colors.primary + '08', // Subtle tint
```

### Button Secondary Variant
```tsx
// Background: tinted green
backgroundColor: colors.primary + '12',
text: colors.primary,
fontWeight: '700', // Bolder text to feel confident
...Shadows.sm,    // Subtle lift
```

---

## 5. Layout & Spacing

### Section Spacing
- **Top margin**: Spacing['2xl'] (24px) between major sections
- **Bottom margin**: Spacing['3xl'] (32px) after content sections
- **Gap between items**: Spacing.lg (16px) between cards/items

### Card Spacing
- **Padding**: Spacing.lg (16px) on sides, Spacing['2xl'] (24px) top/bottom
- **Border radius**: BorderRadius.xl (16px) for consistent roundness
- **Icons**: 24-28px for emoji, contained in 48-56px circles

### Safe Area Insets
```tsx
paddingTop: Math.max(insets.top, Spacing.lg),
paddingHorizontal: Spacing.lg,
paddingBottom: Spacing['3xl'],
```

---

## 6. Icon Containers

### Feature Cards
```tsx
// Icon background circle
width: 56,
height: 56,
borderRadius: BorderRadius.lg,
backgroundColor: colors.primary + '20', // Tinted green
justifyContent: 'center',
alignItems: 'center',

// Icon inside
fontSize: 28,
color: colors.text,
```

### Sport Cards
```tsx
// Icon container (within card)
width: 48,
height: 48,
borderRadius: BorderRadius.lg,
backgroundColor: colors.primary + '20',
marginBottom: Spacing.sm,

// Emoji inside
fontSize: 24,
```

---

## 7. Implementation Checklist

### ✅ Auth Screens (COMPLETE)
- [x] **login.tsx** - Landing page with sports grid, premium cards with shadows
- [x] **verify-otp.tsx** - OTP inputs with underline style, refined typography
- [x] **reset-password.tsx** - Password fields with focus states, shadow system

### 🚧 Tab Screens (PENDING)
- [ ] **home.tsx** - Apply shadow system, update card styling, inject green
- [ ] **profile.tsx** - Profile header with shadow, card list refinement
- [ ] **find-players.tsx** - Player cards with shadow elevation, search bar
- [ ] **messages.tsx** - Message bubbles with subtle shadows, read states
- [ ] **explore.tsx** - Explore cards with large shadows, featured section

### Components Already Updated
- [x] **Button.tsx** - Secondary variant tinted green, shadow on primary/secondary
- [x] **Input.tsx** - Bottom-border focus state, subtle green tint on focus
- [x] **Card.tsx** - Shadow variants (sm/md/lg), no borders
- [x] **Chip.tsx** - Active state with green background

---

## 8. Key Design Decisions

1. **Shadows Over Borders**: Visual depth comes from elevation, not outlines
2. **Typography Weight**: Use 800 for headers, 700 for actions, 500 for labels
3. **Green Injection**: Primary green appears in active states, focus states, and subtle backgrounds
4. **No Full Opacity Backgrounds**: Use 10-20% tinted opacity for softer appearance
5. **Icon Containment**: All icons get subtle colored backgrounds
6. **Spacing Hierarchy**: Larger gaps between sections, smaller gaps between items
7. **Active State Elevation**: Selected/focused items get `Shadows.lg` instead of `sm`

---

## 9. Color Palette Reference

```
Primary Green: #5FD382
Dark Navy (Text): #1F1F1F
Light Green (Accent): #A8D5BA

Greys:
- Medium Grey: #9CA3AF
- Dark Grey: #6B7280
- Light Grey: #F5F5F5

Semantic:
- Success: #10B981
- Error: #EF4444
- Warning: #F59E0B
```

---

## 10. Next Steps

1. Update all tab screens following this design system
2. Add subtle background gradient (white to light grey) to screens
3. Implement consistent iconography (all flat, consistent stroke)
4. Test shadow rendering on Android (elevation) vs iOS (shadow properties)
5. Create component library documentation
6. Implement dark mode shadow adjustments if needed
