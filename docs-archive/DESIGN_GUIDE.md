/**
 * 🎨 PLAYO DESIGN SYSTEM - COMPLETE GUIDE
 * 
 * This file documents the complete design system for the Playo app.
 * Reference this guide when building new screens or components.
 */

// ============================================
// COLOR PALETTE
// ============================================

/**
 * PRIMARY: GREEN (#90EE90)
 * Usage: Primary CTAs, buttons, success states, active elements
 * Psychology: Growth, action, progress, trust
 * Never use for: Decorative elements, backgrounds
 */
const PRIMARY_GREEN = '#90EE90';

/**
 * TEXT: DARK NAVY (#1F1F1F)
 * Usage: Headlines, primary text, structure
 * Psychology: Control, clarity, professionalism
 * Never use: Decorative text, hover states
 */
const TEXT_DARK = '#1F1F1F';

/**
 * BACKGROUND: WHITE (#FFFFFF)
 * Usage: Main backgrounds, card surfaces
 * Psychology: Simplicity, cleanliness, trust
 * Note: Provides breathing room and clarity
 */
const BACKGROUND = '#FFFFFF';

/**
 * SECONDARY TEXT: DARK GREY (#6B7280)
 * Usage: Body text, descriptions, secondary labels
 * Psychology: Supportive, not primary focus
 * Contrast: Still readable but less important
 */
const TEXT_SECONDARY = '#6B7280';

/**
 * BORDERS & DIVIDERS: LIGHT GREY (#E0E0E0)
 * Usage: Borders, dividers, input borders (unfocused)
 * Psychology: Subtle, non-intrusive structure
 */
const BORDER = '#E0E0E0';

/**
 * INPUT FOCUS: PRIMARY GREEN + LIGHT OVERLAY
 * Usage: When input is focused, show green border + light green background
 * Psychology: Indicates active, selected state
 */
const INPUT_FOCUS = `${PRIMARY_GREEN} + 8% opacity background`;

// ============================================
// COMPONENT RULES
// ============================================

/**
 * BUTTON COMPONENT
 * 
 * Variants:
 * - primary: Green background, white text → Main action (ONLY ONE per screen)
 * - secondary: White background, green border/text → Alternative action
 * - tertiary: Transparent, green text → Less important
 * - danger: Red background, white text → Destructive actions ONLY
 * - ghost: Transparent, grey text → Minimal action
 * 
 * Rule: If it's important → GREEN PRIMARY
 */

/**
 * INPUT COMPONENT
 * 
 * Rules:
 * - Border: 1.5px, light grey (#D9D9D9)
 * - Focused border: Green primary
 * - Background: White
 * - Label: Dark navy, bold (Typography.labelLarge)
 * - Placeholder: Light grey
 * - Error state: Red border + red error text below
 * - Border radius: BorderRadius.lg (12px)
 */

/**
 * CARD COMPONENT
 * 
 * Rules:
 * - Background: White or light grey (#F5F5F5)
 * - Border radius: BorderRadius.lg (12px)
 * - Shadow: Subtle (sm or md, never lg)
 * - Padding: Consistent (Spacing.lg)
 * - For interactive cards: Add slight opacity change on press
 */

/**
 * CHIP COMPONENT
 * 
 * States:
 * - Unselected: Light grey background, grey text
 * - Selected: Green background, white text
 * - Outlined: White background, grey border, grey text
 * - When selected: Always green
 * 
 * Usage: Sports selection, tag selection, filters
 */

// ============================================
// SPACING RULES
// ============================================

/**
 * SAFE AREA SPACING (CRITICAL FOR TOP ICONS)
 * 
 * ❌ WRONG: hardcoded paddingTop: 80px
 * ✅ CORRECT: Use useSafeAreaInsets() from react-native-safe-area-context
 * 
 * Example:
 * const insets = useSafeAreaInsets();
 * <ScrollView contentContainerStyle={{ paddingTop: Math.max(insets.top, Spacing.lg) }}>
 * 
 * Why: Adapts to device notches, home indicators, and status bars
 * Result: Icons always properly positioned, never "too high"
 */

/**
 * SPACING SCALE (Always use these values):
 * xs: 4px
 * sm: 8px
 * md: 12px
 * lg: 16px
 * xl: 20px
 * 2xl: 24px
 * 3xl: 32px
 * 4xl: 40px
 * 5xl: 48px
 * 
 * Rule: NEVER hardcode padding/margin values
 * Always use: Spacing.lg, Spacing.xl, etc.
 */

/**
 * CONTAINER MARGINS:
 * - Horizontal padding: Spacing.lg (16px)
 * - Top margin between sections: Spacing['2xl'] to Spacing['3xl']
 * - Form inputs gap: Spacing.lg
 * - Button gaps: Spacing.md to Spacing.lg
 */

// ============================================
// TYPOGRAPHY RULES
// ============================================

/**
 * HIERARCHY:
 * - Screen Title: Typography.headingLarge (28px, bold)
 * - Section Title: Typography.headingSmall (20px, semi-bold)
 * - Input Label: Typography.labelLarge (14px, bold)
 * - Body Text: Typography.bodyLarge (16px, regular)
 * - Secondary Text: Typography.bodySmall (12px, regular)
 * - Error Text: Typography.bodySmall, RED color
 * 
 * Rule: Never exceed 2 font weights per screen (regular + bold)
 */

/**
 * TEXT COLOR RULES:
 * - Main titles: TEXT_DARK (#1F1F1F)
 * - Body text: TEXT_DARK or TEXT_SECONDARY
 * - Secondary info: TEXT_SECONDARY (#6B7280)
 * - Disabled text: TEXT_LIGHT + reduced opacity
 * - Error: Colors.error (#EF4444)
 * - Success: Colors.success (#10B981)
 * - Interactive: PRIMARY_GREEN
 */

// ============================================
// SHADOW RULES
// ============================================

/**
 * Shadow Usage:
 * - Subtle elevation: Shadows.sm (very light)
 * - None on inputs/minimal elements
 * - None on cards in lists (use border instead)
 * - sm on primary buttons (for depth, not overkill)
 * - NEVER use lg unless absolutely necessary
 * 
 * Philosophy: Shadows are for depth, not decoration
 */

// ============================================
// SCREEN STRUCTURE TEMPLATE
// ============================================

/**
 * Every auth screen should follow this pattern:
 * 
 * <SafeAreaView>
 *   <KeyboardAvoidingView>
 *     <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, Spacing.lg) }]}>
 *       {/* Header with icon */}
 *       <View style={styles.header}>
 *         <Text style={styles.icon}>🎾</Text>
 *         <Text style={styles.title}>Screen Title</Text>
 *         <Text style={styles.subtitle}>Descriptive text</Text>
 *       </View>
 * 
 *       {/* Main content */}
 *       <View style={styles.content}>
 *         {/* Form fields, text, etc */}
 *       </View>
 * 
 *       {/* Primary CTA (ONE ONLY) */}
 *       <Button title="Action" variant="primary" fullWidth />
 * 
 *       {/* Secondary actions */}
 *       <Button title="Alternative" variant="secondary" fullWidth />
 *     </ScrollView>
 *   </KeyboardAvoidingView>
 * </SafeAreaView>
 */

// ============================================
// DESIGN PHILOSOPHY
// ============================================

/**
 * 1. SIMPLICITY OVER DECORATION
 *    - Every element should serve a purpose
 *    - Remove what doesn't add value
 *    - Blank space is your friend
 * 
 * 2. CONSISTENCY IS TRUST
 *    - Always use the same spacing
 *    - Always use the same colors for same meaning
 *    - Predictable = trustworthy
 * 
 * 3. GREEN IS ACTION
 *    - Green ONLY for primary CTAs and success
 *    - If you're adding green elsewhere → reconsider
 *    - One primary button per screen
 * 
 * 4. DARK TEXT ON LIGHT BACKGROUND
 *    - Maximum readability
 *    - Accessibility > aesthetics
 *    - Never light text on light backgrounds
 * 
 * 5. CALM & PROFESSIONAL
 *    - This is sports/fitness, not a game
 *    - Minimal animations
 *    - Clear feedback for actions
 *    - No surprises
 */

// ============================================
// COMMON MISTAKES TO AVOID
// ============================================

/**
 * ❌ Multiple green buttons on screen
 * ✅ Only ONE primary (green) button per screen
 * 
 * ❌ Hardcoded padding values (paddingTop: 80)
 * ✅ Use useSafeAreaInsets() for adaptive spacing
 * 
 * ❌ Too many colors
 * ✅ Stick to the palette (green, grey, black, white)
 * 
 * ❌ Complex shadows
 * ✅ Use Shadows.sm or none
 * 
 * ❌ Light text on light background
 * ✅ Dark text on white (or light text on dark)
 * 
 * ❌ Inconsistent spacing
 * ✅ Always use Spacing scale values
 * 
 * ❌ Icons floating everywhere
 * ✅ Icons support text, never replace it
 */

// ============================================
// REUSABLE COMPONENTS
// ============================================

/**
 * Button - components/ui/Button.tsx
 * Import: import { Button } from '@/components/ui/Button';
 * Usage: <Button title="Login" variant="primary" size="large" fullWidth />
 * 
 * Input - components/ui/Input.tsx
 * Import: import { Input } from '@/components/ui/Input';
 * Usage: <Input label="Email" placeholder="..." value={email} onChangeText={setEmail} error={error} />
 * 
 * Card - components/ui/Card.tsx
 * Import: import { Card } from '@/components/ui/Card';
 * Usage: <Card variant="elevated"><Text>Content</Text></Card>
 * 
 * Chip - components/ui/Chip.tsx
 * Import: import { Chip } from '@/components/ui/Chip';
 * Usage: <Chip label="Football" selected={selected} onPress={toggle} />
 */

export {};
