# Premium Design Migration Guide

## Quick Reference: What Changed

### ✅ COMPLETED - Auth Screens
- **login.tsx**: Landing page now features premium card design with shadows, icon containers, refined typography
- **verify-otp.tsx**: OTP inputs converted to underline-only style, enhanced typography scale
- **reset-password.tsx**: Password fields with green focus states, premium spacing

### 🔧 TO DO - Update Remaining Screens

---

## Pattern 1: Sport Cards (already in login.tsx)

### Key Changes:
1. **Remove borders** - use shadows instead
2. **Add icon containers** with 20% green background
3. **Add checkmark indicator** on selected state
4. **Increase shadow on active** - sm → lg

### Code Example:
```tsx
<TouchableOpacity
  style={[
    styles.sportItem,
    {
      backgroundColor: isSelected ? colors.primary + '12' : colors.card,
      borderWidth: 0, // ← REMOVE BORDER
    },
    isSelected ? styles.sportItemActive : styles.sportItemInactive,
  ]}
>
  {/* Icon Container */}
  <View style={[
    styles.sportIconContainer,
    { backgroundColor: isSelected ? colors.primary + '20' : colors.background }
  ]}>
    <Text style={styles.sportEmoji}>{sport.emoji}</Text>
  </View>
  
  {/* Label */}
  <Text style={[styles.sportName, { color: colors.text }]}>
    {sport.name}
  </Text>
  
  {/* Active Indicator */}
  {isSelected && (
    <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
  )}
</TouchableOpacity>
```

### Stylesheet:
```tsx
sportItem: {
  width: '31%',
  aspectRatio: 1,
  borderRadius: BorderRadius.xl,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
sportItemInactive: {
  ...Shadows.sm,
},
sportItemActive: {
  ...Shadows.lg, // ← BIGGER SHADOW WHEN SELECTED
},
sportIconContainer: {
  width: 48,
  height: 48,
  borderRadius: BorderRadius.lg,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: Spacing.sm,
},
sportEmoji: {
  fontSize: 24,
},
sportName: {
  fontWeight: '700',
  fontSize: 12,
  textAlign: 'center',
},
checkmark: {
  position: 'absolute',
  top: -6,
  right: -6,
  width: 20,
  height: 20,
  borderRadius: 10,
},
```

---

## Pattern 2: Feature/Info Cards

### Key Changes:
1. **Remove borders** - use shadows
2. **Add icon backgrounds** (56x56 with 20% green)
3. **Increase padding** for breathing room
4. **Add top padding** to icon for visual balance

### Code Example:
```tsx
<View
  style={[
    styles.featureCard,
    { backgroundColor: colors.card },
    Shadows.md, // ← USE SHADOW, NO BORDER
  ]}
>
  <View style={[
    styles.iconContainer,
    { backgroundColor: colors.primary + '20' } // ← TINTED GREEN
  ]}>
    <Text style={styles.featureIcon}>{icon}</Text>
  </View>
  
  <View style={styles.featureContent}>
    <Text style={[styles.featureTitle, { color: colors.text }]}>
      {title}
    </Text>
    <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
      {description}
    </Text>
  </View>
</View>
```

### Stylesheet:
```tsx
featureCard: {
  flexDirection: 'row',
  borderRadius: BorderRadius.xl,
  padding: Spacing.lg,
  paddingVertical: Spacing['2xl'], // ← MORE VERTICAL SPACE
  alignItems: 'flex-start',
  gap: Spacing.lg,
  borderWidth: 0, // ← NO BORDER
},
iconContainer: {
  width: 56,
  height: 56,
  borderRadius: BorderRadius.lg,
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
},
featureIcon: {
  fontSize: 28,
},
featureContent: {
  flex: 1,
},
featureTitle: {
  fontWeight: '700',
  fontSize: 15,
  marginBottom: Spacing.xs,
},
featureDesc: {
  fontWeight: '500',
  opacity: 0.8,
  lineHeight: 19,
},
```

---

## Pattern 3: Input Fields with Focus State

### Key Changes:
1. **Change border style** - from border to bottom-border only
2. **Add green tint on focus** - 8% opacity green background
3. **Bold label text** - weight 700
4. **Increase label spacing** - margin-bottom: lg

### Code Example:
```tsx
const inputContainerStyles: ViewStyle = {
  borderWidth: 0,
  borderBottomWidth: 2,
  borderBottomColor: error
    ? colors.error
    : focused
    ? colors.primary
    : colors.inputBorder,
  borderRadius: 0,
  backgroundColor: focused 
    ? colors.primary + '08' // ← GREEN TINT ON FOCUS
    : colors.inputBackground,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: Spacing.lg,
  opacity: disabled ? 0.6 : 1,
};

const labelStyles: TextStyle = {
  ...Typography.labelLarge,
  color: error ? colors.error : colors.text,
  marginBottom: Spacing.md, // ← MORE SPACE
  fontWeight: '700', // ← BOLDER
  fontSize: 13,
};
```

---

## Pattern 4: Button Styling

### Key Changes:
1. **Secondary button**: tinted green background + shadow
2. **Button text**: weight 700 for secondary, 600 for primary
3. **Shadow hierarchy**: primary uses md, secondary uses sm

### Code Example:
```tsx
const getVariantStyles = (): { bg: string; text: string } => {
  switch (variant) {
    case 'primary':
      return {
        bg: colors.primary,
        text: '#FFFFFF',
      };
    case 'secondary':
      return {
        bg: colors.primary + '12', // ← TINTED GREEN
        text: colors.primary,
      };
    // ... other variants
  }
};

const buttonStyles: ViewStyle = {
  backgroundColor: variantStyles.bg,
  borderWidth: 0, // ← NO BORDER
  borderRadius: BorderRadius.lg,
  paddingVertical: sizeStyles.paddingVertical,
  paddingHorizontal: sizeStyles.paddingHorizontal,
  minHeight: sizeStyles.minHeight,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: disabled ? 0.6 : 1,
  ...(variant === 'primary' && !disabled && Shadows.md),
  ...(variant === 'secondary' && !disabled && Shadows.sm),
};

const textStyles: TextStyle = {
  color: variantStyles.text,
  fontSize: sizeStyles.fontSize,
  fontWeight: variant === 'secondary' ? '700' : '600', // ← SECONDARY BOLDER
};
```

---

## Pattern 5: Typography Hierarchy in Headers

### Key Changes:
1. **Main title**: 28px, weight 800, letter-spacing -0.5
2. **Subtitle**: weight 400, opacity 0.75
3. **Labels**: weight 700-800 for action items

### Code Example:
```tsx
authTitle: {
  ...Typography.headingLarge,
  fontSize: 28,
  marginBottom: Spacing.sm,
  fontWeight: '800',
  letterSpacing: -0.5, // ← TIGHT SPACING FOR BOLD LOOK
},
authSubtitle: {
  ...Typography.bodyLarge,
  marginBottom: Spacing['2xl'],
  lineHeight: 24,
  fontWeight: '400',
  opacity: 0.75, // ← LIGHTER, LESS PROMINENT
},
```

---

## Pattern 6: Info Boxes

### Key Changes:
1. **Add left border** - 4px primary color
2. **Use 10% green background** - not full color
3. **Add shadow** for elevation
4. **Increase padding** for breathing room

### Code Example:
```tsx
infoBox: {
  backgroundColor: colors.primary + '10', // ← 10% TINT
  borderRadius: BorderRadius.lg,
  padding: Spacing.lg,
  marginTop: Spacing['2xl'],
  borderLeftWidth: 4,
  borderLeftColor: colors.primary,
  ...Shadows.sm, // ← ADD SHADOW
},
infoText: {
  ...Typography.bodySmall,
  color: colors.text,
  textAlign: 'center',
  lineHeight: 20,
  fontWeight: '500',
},
```

---

## Step-by-Step Migration Checklist

For each screen (home.tsx, profile.tsx, etc.):

### Phase 1: Imports & Setup
- [ ] Import `Shadows` from theme if not already imported
- [ ] Add `Shadows` to any cards/containers

### Phase 2: Card Styling
- [ ] Remove all `borderWidth` from cards
- [ ] Remove `borderColor` from cards
- [ ] Add `...Shadows.sm` or `Shadows.md` to card styles
- [ ] Update card background colors if using borders for distinction

### Phase 3: Icon Styling
- [ ] Add icon containers (48-56px) with `colors.primary + '20'` background
- [ ] Update emoji/icon sizes (24-28px)
- [ ] Center icons in containers

### Phase 4: Typography
- [ ] Update header fontWeight to 700-800
- [ ] Update subtitle fontWeight to 400 with 0.75 opacity
- [ ] Update label fontWeight to 700
- [ ] Update body fontWeight to 500

### Phase 5: Spacing
- [ ] Increase gap between sections to `Spacing['2xl']` or `Spacing['3xl']`
- [ ] Increase gap between items to `Spacing.lg`
- [ ] Add padding top/bottom to cards

### Phase 6: Active States
- [ ] Add selected state styling (shadow lg, green tint)
- [ ] Add focus state styling (green tint background)
- [ ] Add hover/press effects

### Phase 7: Testing
- [ ] [ ] Verify shadows render correctly
- [ ] [ ] Test on both light and dark modes
- [ ] [ ] Verify spacing on different screen sizes
- [ ] [ ] Test interactive states (press, focus, etc.)

---

## Common Mistakes to Avoid

❌ **DON'T**
```tsx
// Using borders for elevation
borderWidth: 1,
borderColor: colors.border,

// Weak button text
fontWeight: '500',

// Dark/opaque backgrounds
backgroundColor: colors.primary,

// Tight spacing
gap: Spacing.xs,

// Small typography
fontSize: 12,
fontWeight: '400',
```

✅ **DO**
```tsx
// Using shadows for elevation
...Shadows.md,

// Bold button/action text
fontWeight: '700',

// Tinted/transparent backgrounds
backgroundColor: colors.primary + '12',

// Generous spacing
gap: Spacing.lg,

// Clear typography hierarchy
fontSize: 16,
fontWeight: '700',
```

---

## Questions?

Refer to:
- `DESIGN_SYSTEM.md` for complete design system documentation
- `app/login.tsx` for premium pattern examples
- `components/ui/Button.tsx` and `Input.tsx` for updated components
