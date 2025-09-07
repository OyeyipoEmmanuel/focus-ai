# AI Assistant Application - Design System Documentation

## Table of Contents
1. [Design Overview](#design-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Responsive Design](#responsive-design)
7. [Interactive States](#interactive-states)
8. [Accessibility](#accessibility)
9. [Implementation Notes](#implementation-notes)

---

## Design Overview

### Design Philosophy
The AI Assistant application follows a modern, clean design approach with emphasis on:
- **Clarity**: Clear information hierarchy and intuitive navigation
- **Accessibility**: WCAG compliant color contrast and keyboard navigation
- **Consistency**: Unified design patterns across all components
- **Responsiveness**: Mobile-first approach with desktop enhancements

### Brand Identity
- **Primary Brand Colors**: Blue to Purple gradient (#2563eb to #7c3aed)
- **Visual Style**: Modern, rounded corners (16px radius), subtle shadows
- **Tone**: Professional yet approachable

---

## Color System

### Light Theme Palette
```css
/* Core Colors */
--background: #f9fafb          /* Page background */
--foreground: #1e293b          /* Primary text */
--card: #ffffff               /* Card backgrounds */
--card-foreground: #1e293b    /* Card text */

/* Interactive Colors */
--primary: #2563eb            /* Primary actions */
--primary-foreground: #ffffff /* Primary text on primary bg */
--secondary: #f1f5f9          /* Secondary actions */
--secondary-foreground: #1e293b

/* Utility Colors */
--muted: #f1f5f9              /* Subtle backgrounds */
--muted-foreground: #64748b   /* Secondary text */
--accent: #e2e8f0             /* Hover states */
--accent-foreground: #1e293b
--destructive: #dc2626        /* Error/delete actions */
--border: #e2e8f0             /* Borders and dividers */

/* Sidebar Specific */
--sidebar: #ffffff
--sidebar-foreground: #1e293b
--sidebar-primary: #2563eb
--sidebar-accent: #f8fafc
--sidebar-border: #e2e8f0

/* Input Fields */
--input-background: #f8fafc
--switch-background: #cbd5e1
```

### Dark Theme Palette
```css
/* Core Colors */
--background: #0f172a          /* Page background */
--foreground: #f8fafc          /* Primary text */
--card: #1e293b               /* Card backgrounds */
--card-foreground: #f8fafc    /* Card text */

/* Interactive Colors */
--primary: #3b82f6            /* Primary actions */
--primary-foreground: #ffffff
--secondary: #334155          /* Secondary actions */
--secondary-foreground: #f8fafc

/* Utility Colors */
--muted: #334155              /* Subtle backgrounds */
--muted-foreground: #94a3b8   /* Secondary text */
--accent: #475569             /* Hover states */
--accent-foreground: #f8fafc
--destructive: #ef4444        /* Error/delete actions */
--border: #334155             /* Borders and dividers */

/* Sidebar Specific */
--sidebar: #1e293b
--sidebar-foreground: #f8fafc
--sidebar-primary: #3b82f6
--sidebar-accent: #334155
--sidebar-border: #334155

/* Input Fields */
--input-background: #1e293b
```

### Chart Colors
```css
--chart-1: #2563eb / #3b82f6  /* Blue */
--chart-2: #7c3aed / #8b5cf6  /* Purple */
--chart-3: #10b981             /* Green */
--chart-4: #f59e0b             /* Orange */
--chart-5: #ef4444             /* Red */
```

---

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif

### Font Weights
- **Normal**: 400 (body text)
- **Medium**: 500 (labels, buttons)
- **Semibold**: 600 (headings)
- **Bold**: 700 (emphasis)

### Type Scale
```css
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px - Base size */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
```

### Typography Usage
- **H1**: 24px (1.5rem), Medium weight, 1.5 line-height
- **H2**: 20px (1.25rem), Medium weight, 1.5 line-height
- **H3**: 18px (1.125rem), Medium weight, 1.5 line-height
- **H4**: 16px (1rem), Medium weight, 1.5 line-height
- **Body**: 16px (1rem), Normal weight, 1.5 line-height
- **Label**: 16px (1rem), Medium weight, 1.5 line-height
- **Button**: 16px (1rem), Medium weight, 1.5 line-height
- **Small**: 14px (0.875rem), Normal weight
- **Caption**: 12px (0.75rem), Normal weight

---

## Spacing & Layout

### Border Radius
- **Base Radius**: 16px (1rem)
- **Small**: 12px (--radius-sm)
- **Medium**: 14px (--radius-md)
- **Large**: 16px (--radius-lg)
- **Extra Large**: 20px (--radius-xl)

### Spacing Scale (Tailwind)
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px

### Grid System
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
  - Large Desktop: 1280px+

### Layout Structure
```
┌─────────────────────────────────────────┐
│ TopBar (Height: 64px)                   │
├─────────────┬───────────────────────────┤
│ Sidebar     │ Main Content              │
│ Desktop:    │ Padding:                  │
│ - Expanded: │ - Mobile: 16px            │
│   256px     │ - Desktop: 24px           │
│ - Collapsed:│                           │
│   64px      │                           │
│ Mobile:     │                           │
│ - Hidden    │                           │
│   (Drawer)  │                           │
└─────────────┴───────────────────────────┘
```

---

## Component Library

### Buttons

#### Primary Button
- **Background**: Primary color gradient
- **Text**: Primary foreground
- **Padding**: 12px 16px
- **Border Radius**: 16px
- **Font Weight**: Medium
- **Hover**: Scale 1.02, opacity 0.9

#### Secondary Button
- **Background**: Secondary color
- **Text**: Secondary foreground
- **Border**: 1px solid border color
- **Padding**: 12px 16px
- **Border Radius**: 16px

#### Ghost Button
- **Background**: Transparent
- **Text**: Foreground color
- **Hover**: Accent background
- **Padding**: 12px 16px
- **Border Radius**: 16px

### Cards

#### Standard Card
- **Background**: Card color
- **Border**: 1px solid border color
- **Border Radius**: 16px
- **Padding**: 24px (desktop), 16px (mobile)
- **Shadow**: Subtle drop shadow
- **Hover**: Slight lift animation

#### Quick Action Card
- **Background**: Card color
- **Border**: 1px solid border color
- **Border Radius**: 16px
- **Padding**: 24px (desktop), 16px (mobile)
- **Icon**: 24px in colored background circle
- **Hover**: Scale 1.02, border color change

### Navigation

#### Sidebar
- **Width**: 
  - Expanded: 256px
  - Collapsed: 64px
  - Mobile: Drawer overlay
- **Background**: Sidebar color
- **Border**: 1px right border

#### Navigation Items
- **Height**: 40px
- **Padding**: 12px 16px
- **Border Radius**: 12px
- **Icon Size**: 16px
- **Active State**: Primary background with white text
- **Hover State**: Accent background

#### TopBar
- **Height**: 64px
- **Background**: Semi-transparent background with blur
- **Border**: 1px bottom border
- **Sticky**: Top positioned

### Form Elements

#### Input Fields
- **Background**: Input background color
- **Border**: None (borderless design)
- **Border Radius**: 16px
- **Padding**: 12px 16px
- **Placeholder**: Muted foreground color
- **Focus**: Ring outline in primary color

#### Search Bar
- **Background**: Input background
- **Border Radius**: 16px
- **Icon**: 16px search icon, left positioned
- **Padding**: 12px 16px 12px 40px

### Status Elements

#### Badges
- **Small Badge**: 
  - Height: 20px
  - Padding: 2px 8px
  - Border Radius: 10px
  - Font Size: 12px

#### Progress Indicators
- **Loading States**: Skeleton components
- **Progress Bars**: Primary color fill
- **Status Dots**: 8px diameter circles

---

## Responsive Design

### Breakpoint Strategy
- **Mobile First**: Base styles target mobile devices
- **Progressive Enhancement**: Desktop features added via media queries

### Mobile Adaptations (< 1024px)
- **Sidebar**: Hidden, replaced with drawer navigation
- **TopBar**: Includes hamburger menu button
- **Cards**: Reduced padding (16px vs 24px)
- **Grid Layouts**: Single column or 2-column max
- **Typography**: Slightly smaller on mobile
- **Spacing**: Reduced gaps and margins

### Desktop Enhancements (≥ 1024px)
- **Sidebar**: Persistent, collapsible
- **Multi-column Layouts**: Up to 4 columns
- **Hover States**: Enhanced hover effects
- **Larger Touch Targets**: Maintained for accessibility

### Responsive Grid Patterns
```css
/* Stats Cards */
Mobile: grid-cols-2 gap-3
Desktop: grid-cols-4 gap-6

/* Quick Actions */
Mobile: grid-cols-1
Tablet: grid-cols-2 
Desktop: grid-cols-3

/* Chat Layout */
Mobile: flex-col (stacked)
Desktop: flex-row (sidebar + content)
```

---

## Interactive States

### Button States
- **Default**: Base styling
- **Hover**: Scale 1.02, opacity 0.9
- **Focus**: Ring outline
- **Active**: Slightly pressed appearance
- **Disabled**: Reduced opacity, no pointer events

### Navigation States
- **Default**: Transparent background
- **Hover**: Accent background
- **Active**: Primary background, white text
- **Focus**: Keyboard focus ring

### Card States
- **Default**: Base card styling
- **Hover**: Lift animation, border color change
- **Focus**: Focus ring for keyboard navigation
- **Selected**: Primary border color

### Form States
- **Default**: Input background
- **Focus**: Primary color ring
- **Error**: Destructive color border
- **Disabled**: Muted appearance

---

## Accessibility

### Color Contrast
- **Normal Text**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

### Keyboard Navigation
- **Tab Order**: Logical flow through interface
- **Focus Indicators**: Visible focus rings
- **Skip Links**: For main content areas
- **Escape Key**: Closes modals and drawers

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: For complex interactions
- **Alt Text**: For all meaningful images
- **Live Regions**: For dynamic content updates

### Touch Targets
- **Minimum Size**: 44px × 44px
- **Spacing**: 8px minimum between targets
- **Mobile Optimization**: Larger touch areas on mobile

---

## Implementation Notes

### CSS Architecture
- **Tailwind v4**: Utility-first CSS framework
- **CSS Custom Properties**: For theming system
- **Layer Organization**: Base, components, utilities

### Component Structure
```
/components
├── layout/          # Navigation and structure
├── pages/           # Page-level components  
├── ui/              # Reusable UI components
└── theme-provider.tsx # Theme management
```

### State Management
- **React useState**: For component-level state
- **Context API**: For theme management
- **Local Storage**: For theme persistence

### Performance Considerations
- **Code Splitting**: Page-level component loading
- **Image Optimization**: Lazy loading and fallbacks
- **CSS Optimization**: Utility class purging

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **CSS Grid**: Full support required
- **CSS Custom Properties**: Required for theming
- **Flexbox**: Required for layouts

---

## Design Tokens Reference

### Complete Token List
```css
/* Colors */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input-background
--sidebar, --sidebar-foreground
--sidebar-primary, --sidebar-accent

/* Spacing */
--radius: 1rem (16px)
--radius-sm, --radius-md, --radius-lg, --radius-xl

/* Typography */
--font-weight-normal: 400
--font-weight-medium: 500
--font-size: 16px (base)

/* Charts */
--chart-1 through --chart-5
```

### Component Dimensions
```css
/* Layout */
Sidebar Width: 256px (expanded), 64px (collapsed)
TopBar Height: 64px
Card Padding: 24px (desktop), 16px (mobile)
Button Height: 40px
Input Height: 40px

/* Icons */
Small Icons: 16px
Medium Icons: 20px
Large Icons: 24px
```

---

*This documentation serves as a complete reference for recreating the AI Assistant application design in Figma or any other design tool. All measurements, colors, and specifications are production-ready values.*