# Eurasian House Design System
Version: 1.0
Status: Active
Last Updated: 2026-07-23

---

# 1. Vision

The Eurasian House Design System defines the visual language, user experience, component standards, and frontend architecture used throughout the entire application.

Its purpose is to ensure that every page, component, and future feature follows one consistent design philosophy.

This document acts as the single source of truth for frontend development.

---

# 2. Design Philosophy

Our website should feel:

- Premium
- Elegant
- Timeless
- Minimal
- Spacious
- Comfortable
- Trustworthy
- Fast

The product should always remain the hero.

The interface should support the product, never compete with it.

---

# 3. Core Principles

## 3.1 Consistency

Every UI element should follow the same design language.

---

## 3.2 Reusability

Avoid duplicate styles.

Every repeated pattern should become a reusable component.

---

## 3.3 Scalability

The design system should support future expansion including:

- Blogs
- Customer Dashboard
- Admin
- AI Features
- Mobile Apps
- Future Products

without redesign.

---

## 3.4 Maintainability

Changing a design token should automatically update the entire website.

---

## 3.5 Accessibility

Every interface should remain usable for every visitor.

---

## 3.6 Performance

Beautiful UI should never compromise loading speed.

---

# 4. Theme System

Light Theme

Dark Theme

System Theme

All components must support every theme without additional styling.

---

# 5. Design Tokens

This section defines the global design variables.

Includes:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Borders
- Opacity
- Animations
- Breakpoints
- Transitions

No component should use hardcoded values.

---

# 6. Color System

# 6. Color System

## Purpose

The Color System defines every color used throughout the Eurasian House ecosystem. It ensures consistency, maintainability, accessibility, and effortless support for Light, Dark, and future themes.

No page, component, or feature may introduce its own independent color palette.

Every color must originate from the global design tokens defined in this section.

---

# Color Philosophy

The Eurasian House color palette is designed around the products rather than the interface.

Handmade rugs are rich in texture, craftsmanship, and color. The interface should remain calm, neutral, elegant, and supportive.

The website must never overpower the products.

Colors should communicate:

- Luxury through simplicity
- Warmth
- Trust
- Comfort
- Craftsmanship
- Authenticity
- Premium quality

The interface should feel timeless rather than trendy.

---

# Design Principles

The color system follows these principles.

## Neutral First

Neutral colors form the majority of the interface.

Accent colors should be used sparingly.

---

## Product First

Products should always attract the user's attention before the interface.

The UI must never become visually louder than the rugs.

---

## Consistency

The same color token should always represent the same purpose.

Example:

Primary Text

always means

Primary Text.

Never reuse a token for another purpose.

---

## Theme Independence

Components must never know whether they are in Light Mode or Dark Mode.

Components should only consume color tokens.

Themes define token values.

---

## Accessibility

Every foreground and background combination must satisfy WCAG contrast requirements.

---

# Theme Architecture

Supported themes:

- Light
- Dark
- System

Future themes may be added without modifying components.

Components should never contain theme-specific CSS.

Only design tokens change.

---

# Color Categories

The color system is divided into:

- Brand Colors
- Neutral Colors
- Background Colors
- Surface Colors
- Text Colors
- Border Colors
- Divider Colors
- Icon Colors
- Status Colors
- Overlay Colors
- Shadow Colors
- Gradient Colors

---

# Brand Colors

Brand colors represent Eurasian House.

They should be used carefully and intentionally.

Examples:

- Logo
- Important Actions
- Active States
- Selected Items
- Links
- Highlights

Brand colors should never dominate an entire page.

---

# Neutral Colors

Neutral colors build the interface.

They include:

- Whites
- Off Whites
- Light Grays
- Medium Grays
- Dark Grays
- Charcoal

Neutral colors should occupy the majority of the screen.

---

# Background Colors

Background colors define page hierarchy.

The system contains multiple background levels.

Background Primary

The main page background.

Background Secondary

Used for alternate sections.

Background Tertiary

Used only where additional separation is required.

No page should contain unnecessary background color changes.

---

# Surface Colors

Surfaces sit above backgrounds.

Examples:

- Cards
- Dropdowns
- Modals
- Drawers
- Forms
- Navigation
- Floating Elements

Each elevated layer should remain visually distinguishable while preserving a clean appearance.

---

# Text Colors

Text colors define reading hierarchy.

Levels include:

Primary

Used for headings and important content.

Secondary

Used for supporting information.

Muted

Used for metadata and helper text.

Disabled

Used only for disabled elements.

Inverse

Used on dark backgrounds.

Text colors should never be selected directly.

Always use tokens.

---

# Border Colors

Borders define boundaries.

Borders should be subtle.

Avoid strong or highly visible borders unless interaction requires emphasis.

---

# Divider Colors

Dividers exist only to separate information.

They should never become noticeable design elements.

---

# Icon Colors

Icons follow the same hierarchy as text.

Primary

Secondary

Muted

Disabled

Accent

Icons should never introduce additional colors.

---

# Status Colors

Reserved for system feedback.

Includes:

Success

Warning

Error

Information

These colors should only communicate state.

Never use them decoratively.

---

# Overlay Colors

Overlays include:

Modal Backdrop

Drawer Backdrop

Image Overlay

Loading Overlay

Overlay opacity should be standardized throughout the application.

---

# Shadow Colors

Shadows should enhance depth rather than attract attention.

Light mode and Dark mode use different shadow values.

Shadow colors should never be hardcoded.

---

# Gradient Rules

Gradients should be rare.

Allowed only when they improve visual communication.

Examples:

Hero Sections

Promotional Banners

Special Collections

Gradients should never be used on:

Buttons

Cards

Forms

Tables

Product backgrounds

unless explicitly approved.

---

# Color Usage Hierarchy

Visual emphasis should follow this order.

1. Product Images

2. Product Titles

3. Primary Actions

4. Secondary Actions

5. Supporting Information

6. Decorative Elements

The interface must never reverse this hierarchy.

---

# Theme Mapping

Every token must exist in every supported theme.

Example:

Primary Background

Light Theme

Dark Theme

System Theme

The token name remains identical.

Only its value changes.

---

# Color Token Rules

Every component must use design tokens.

Hardcoded colors are prohibited.

Example:

Correct

color: var(--text-primary);

Incorrect

color: #333333;

---

# CSS Variable Rules

All variables should be defined globally.

Naming should remain semantic.

Correct:

--bg-primary

--surface

--text-primary

--text-secondary

--border

--success

Incorrect:

--gray1

--gray2

--color7

--newColor

---

# Opacity Rules

Opacity values should be standardized.

No arbitrary opacity values should exist.

Opacity tokens should be reused consistently across the application.

---

# Accessibility Requirements

All color combinations must satisfy accessibility requirements.

Text should remain readable in every supported theme.

Interactive states must remain distinguishable without relying solely on color.

Focus indicators should always remain visible.

---

# Future Expansion

Future themes should require only updating token values.

Components should never require modification when introducing a new theme.

---

# Do's

✓ Use semantic color tokens.

✓ Keep interfaces neutral.

✓ Let products remain visually dominant.

✓ Support every theme.

✓ Maintain accessibility.

✓ Reuse existing tokens.

✓ Keep color usage consistent.

---

# Don'ts

✗ Do not hardcode colors.

✗ Do not introduce random shades.

✗ Do not use decorative colors without purpose.

✗ Do not create component-specific palettes.

✗ Do not use gradients excessively.

✗ Do not let the interface overpower product photography.

✗ Do not bypass design tokens.

---

# Approval Requirement

Any new color added to the application must first be added to the Design System before being used in production.

This document is the single source of truth for every color used throughout the Eurasian House ecosystem.

---

# 7. Typography

# 7. Typography

## Purpose

Typography defines how information is communicated throughout the Eurasian House ecosystem.

It establishes visual hierarchy, improves readability, creates consistency, and reinforces the premium identity of the brand.

Typography should guide the user's attention naturally without overwhelming the interface.

---

# Typography Philosophy

Typography should feel:

- Elegant
- Timeless
- Premium
- Comfortable
- Calm
- Professional
- Highly Readable

Typography should never exist simply for decoration.

Every font size, weight, spacing, and alignment must have a purpose.

---

# Primary Objectives

The typography system aims to:

- Improve readability
- Create clear information hierarchy
- Maintain visual consistency
- Support accessibility
- Reduce cognitive load
- Scale across all screen sizes

---

# Typography Hierarchy

Typography follows a strict hierarchy.

## Display

Used only for:

- Hero Headlines
- Landing Pages
- Promotional Sections

Should be used sparingly.

---

## Heading 1

Primary page titles.

Example:

Product Page

Blog Title

Category Title

---

## Heading 2

Major section titles.

Example:

Specifications

Related Products

Reviews

---

## Heading 3

Subsections.

---

## Heading 4

Cards

Widgets

Small Sections

---

## Heading 5

Small content groups.

---

## Heading 6

Minor headings.

---

## Body Large

Long-form reading.

Blog content.

Product descriptions.

Policy pages.

---

## Body Regular

Default body text.

Most paragraphs throughout the website.

---

## Body Small

Supporting information.

Metadata.

Descriptions.

Hints.

---

## Caption

Image captions.

Small labels.

Supporting information.

---

## Label

Buttons

Forms

Badges

Tags

Navigation

---

## Overline

Small category identifiers.

Used sparingly.

---

# Font Family

The application should use a single primary font family throughout the interface.

Decorative fonts should only be used where explicitly approved.

Avoid mixing multiple font families unnecessarily.

---

# Font Weights

Typography should use a limited number of font weights.

Recommended hierarchy:

Light

Regular

Medium

Semi Bold

Bold

Extra Bold should be avoided except for rare marketing content.

---

# Line Height

Every text style should define its own line height.

Paragraphs should remain comfortable for long reading sessions.

Headings should remain compact while maintaining readability.

---

# Letter Spacing

Letter spacing should be used intentionally.

Large headings may require slight tightening.

Uppercase labels may require additional spacing.

Body text should remain natural.

---

# Paragraph Width

Long text should never stretch across the entire screen.

Readable content should maintain an optimal line length.

This is especially important for:

- Blogs
- Product descriptions
- Policies
- Guides

---

# Text Alignment

Default alignment:

Left

Center alignment should only be used for:

Hero Sections

Section Titles

Empty States

Marketing Content

Right alignment should remain rare.

Justified text should not be used.

---

# Text Transformation

Avoid unnecessary uppercase text.

Uppercase should only be used for:

Navigation Labels

Small Labels

Badges

Buttons (where appropriate)

Body paragraphs should never be written entirely in uppercase.

---

# Text Color Hierarchy

Typography should never define colors directly.

Every text element must consume semantic color tokens.

Examples:

Primary Text

Secondary Text

Muted Text

Disabled Text

Inverse Text

---

# Responsive Typography

Typography must scale smoothly across:

Desktop

Laptop

Tablet

Mobile

No text should become unreadable on smaller screens.

Large headings should reduce in size proportionally.

Body text should maintain readability.

---

# Reading Experience

Reading comfort takes priority over visual appearance.

Long-form content should:

- Maintain generous line height
- Use appropriate paragraph spacing
- Avoid dense text blocks
- Support effortless scanning

---

# Typography in Components

Every reusable component must follow the typography hierarchy.

Examples:

Buttons

Cards

Forms

Tables

Navigation

Badges

Modals

Product Cards

Blog Cards

No component should invent new typography styles.

---

# Typography in Blogs

Blogs require additional emphasis on readability.

Rules include:

Consistent heading hierarchy.

Comfortable paragraph spacing.

Readable lists.

Well-formatted blockquotes.

Proper table styling.

Clear code blocks (if used).

Readable captions.

---

# Typography in Product Pages

Product pages prioritize quick scanning.

Important information should appear before secondary information.

Pricing should receive stronger visual emphasis than descriptions.

Specifications should remain structured and easy to scan.

---

# Typography in Forms

Forms should clearly distinguish:

Labels

Input Text

Placeholder Text

Helper Text

Validation Messages

Error Messages

Success Messages

Typography should reinforce clarity rather than decoration.

---

# Typography in Tables

Tables should emphasize readability.

Headers should remain visually distinct.

Numeric values should align consistently.

Avoid excessive font size variation.

---

# Accessibility

Typography must satisfy accessibility standards.

Minimum readable font sizes should be maintained.

Line spacing should improve readability.

Color contrast should remain compliant.

Typography should remain readable in every supported theme.

---

# Performance

Avoid loading unnecessary font families.

Limit the number of font weights.

Use optimized font loading strategies.

Typography should never negatively impact page performance.

---

# CSS Rules

Typography must be implemented using reusable classes and design tokens.

Never hardcode:

Font Size

Font Weight

Letter Spacing

Line Height

Font Family

inside components.

---

# Naming Convention

Typography classes should remain semantic.

Examples:

.heading-xl

.heading-lg

.heading-md

.heading-sm

.body-lg

.body

.body-sm

.caption

.label

.text-muted

Avoid names based solely on pixel values.

---

# Do's

✓ Maintain consistent hierarchy.

✓ Prioritize readability.

✓ Reuse typography tokens.

✓ Keep typography responsive.

✓ Use semantic class names.

✓ Maintain accessibility.

✓ Keep reading effortless.

---

# Don'ts

✗ Do not hardcode font sizes.

✗ Do not randomly mix font weights.

✗ Do not overuse uppercase.

✗ Do not justify paragraphs.

✗ Do not create component-specific typography.

✗ Do not sacrifice readability for style.

✗ Do not introduce unnecessary font families.

---

# Approval Requirement

Any new typography style introduced into the application must first become part of this Design System before being used throughout the Eurasian House ecosystem.

---

# 8. Layout System

# 8. Layout System

## Purpose

The Layout System defines how content is organized, aligned, and spaced throughout the Eurasian House ecosystem.

Its purpose is to create predictable, consistent, and visually balanced interfaces regardless of page type or device size.

Every page should feel like it belongs to the same application.

---

# Layout Philosophy

The layout should feel:

- Spacious
- Organized
- Clean
- Premium
- Comfortable
- Structured
- Predictable

Content should breathe.

Whitespace is considered an intentional design element rather than unused space.

---

# Core Principles

## Consistency

Every page should follow the same layout structure.

Users should never need to relearn how pages are organized.

---

## Simplicity

Layouts should prioritize clarity over complexity.

Avoid unnecessary nesting and excessive visual containers.

---

## Scalability

The layout system must support:

- Ecommerce Pages
- Product Pages
- Category Pages
- Blog Pages
- Customer Dashboard
- Admin Dashboard
- Future Applications

without redesign.

---

## Responsiveness

Layouts must adapt naturally to different screen sizes.

Desktop layouts should never simply shrink onto mobile devices.

Each breakpoint should provide an optimized experience.

---

# Layout Hierarchy

Every page should follow a consistent hierarchy.

Page

↓

Container

↓

Section

↓

Content Group

↓

Component

↓

Element

Every screen should follow this hierarchy whenever possible.

---

# Page Structure

A typical page should contain:

Navigation

↓

Hero (Optional)

↓

Main Content

↓

Supporting Sections

↓

Call To Action (Optional)

↓

Footer

Pages should avoid unnecessary structural complexity.

---

# Containers

Containers define the maximum readable width of content.

Containers maintain visual consistency across the application.

Containers should:

- Center content
- Prevent excessive line lengths
- Provide horizontal breathing space
- Maintain consistent gutters

Container widths should remain standardized.

---

# Sections

Sections divide major content blocks.

Examples:

Featured Products

Categories

Collections

Reviews

Blog Content

Related Products

Every section should maintain consistent vertical spacing.

Sections should not visually compete with one another.

---

# Content Groups

Content groups organize related information.

Examples:

Product Information

Specifications

Pricing

Filters

Customer Reviews

Related Blogs

Content groups improve scanning and reduce cognitive load.

---

# Columns

Columns organize horizontal content.

Columns should collapse naturally on smaller screens.

No layout should require horizontal scrolling under normal usage.

---

# Alignment

Default alignment should remain consistent throughout the application.

Primary content should generally align left.

Center alignment should be reserved for:

Hero Sections

Marketing Messages

Empty States

Loading States

Right alignment should be used only when functionally required.

---

# Visual Balance

Every page should maintain visual balance.

Avoid:

Large empty areas.

Overcrowded layouts.

Uneven spacing.

Misaligned elements.

Layouts should feel calm and intentional.

---

# Width Management

Content should never stretch unnecessarily.

Reading content should remain comfortably readable.

Interactive elements should remain easily accessible.

Very wide layouts should still preserve readable content widths.

---

# Page Density

The interface should remain light.

Avoid placing excessive information inside a single viewport.

Information should be grouped logically.

Whitespace should improve comprehension.

---

# Sticky Elements

Sticky positioning should be used selectively.

Examples:

Navigation

Filter Sidebar

Checkout Summary

Product Actions

Sticky elements should never obstruct important content.

---

# Overflow Rules

Horizontal scrolling should be avoided.

Exceptions include:

Image Galleries

Product Carousels

Comparison Tables

Timeline Components

Large Data Tables

Overflow should always remain intentional.

---

# Layering

Visual hierarchy should be created through:

Spacing

Alignment

Typography

Elevation

Color

Not through excessive borders or decoration.

---

# Responsive Layout

Layouts should adapt across:

Desktop

Laptop

Tablet

Large Mobile

Mobile

Small Mobile

Every breakpoint should preserve usability.

---

# Mobile Layout

On mobile devices:

Content should stack naturally.

Touch interactions should remain comfortable.

Spacing should remain generous.

Important actions should remain easily reachable.

Scrolling should feel effortless.

---

# Desktop Layout

Desktop layouts should utilize available space efficiently without becoming visually crowded.

Extra screen width should improve organization rather than simply enlarging components.

---

# Sidebar Guidelines

Sidebars should remain optional.

When present they should:

Remain visually lightweight.

Collapse appropriately.

Avoid consuming unnecessary screen space.

Support responsive behavior.

---

# Grid Integration

The Layout System works together with the Grid System.

Layout defines structure.

Grid defines positioning.

These systems should remain independent.

---

# Navigation Integration

Navigation should remain outside the primary content flow.

Content should never overlap navigation elements.

Spacing between navigation and page content should remain consistent.

---

# Footer Integration

The footer should provide a clear visual conclusion to every page.

It should never appear crowded or disconnected from the rest of the layout.

---

# Empty States

Empty states should remain centered, balanced, and informative.

Large empty spaces should communicate purpose rather than absence.

---

# Loading States

Loading layouts should closely resemble the final content layout.

Avoid sudden layout shifts after loading completes.

---

# Layout Stability

Layouts should minimize visual movement.

Content should not unexpectedly shift during:

Image loading

API responses

Lazy loading

Theme switching

Animations

Maintaining layout stability improves user experience.

---

# Accessibility

Layouts should remain usable across:

Keyboard navigation

Screen readers

Touch devices

Different zoom levels

Different viewport sizes

No content should become inaccessible due to layout decisions.

---

# Performance

Layouts should avoid unnecessary DOM nesting.

Simpler layouts improve:

Rendering performance

Maintainability

Debugging

Responsiveness

---

# CSS Rules

Layouts should be built using reusable utility classes.

Avoid page-specific layout implementations whenever possible.

Spacing, alignment, width, and positioning should originate from the design system.

---

# Naming Convention

Layout classes should remain semantic.

Examples:

.page

.container

.container-fluid

.section

.section-header

.section-body

.content-group

.layout-grid

.layout-sidebar

.layout-center

.layout-stack

Avoid generic or unclear names.

---

# Do's

✓ Maintain consistent page structure.

✓ Use generous whitespace.

✓ Keep layouts predictable.

✓ Design mobile-first.

✓ Use reusable layout utilities.

✓ Preserve visual hierarchy.

✓ Optimize readability.

---

# Don'ts

✗ Do not create page-specific layout systems.

✗ Do not overuse nested containers.

✗ Do not rely on margins for structure.

✗ Do not allow horizontal scrolling.

✗ Do not overcrowd pages.

✗ Do not break layout consistency.

✗ Do not sacrifice usability for aesthetics.

---

# Approval Requirement

Any new layout pattern introduced into the application must first be documented within this Design System before being implemented across the Eurasian House ecosystem.

---

# 9. Grid System

To be defined.

---

# 10. Spacing System

# 10. Spacing System

## Purpose

The Spacing System defines the consistent use of whitespace throughout the Eurasian House ecosystem.

Spacing creates rhythm, improves readability, establishes visual hierarchy, and gives every interface a clean, premium appearance.

Whitespace is an intentional design element and should never be treated as unused space.

---

# Spacing Philosophy

The interface should feel:

- Spacious
- Calm
- Organized
- Elegant
- Balanced
- Comfortable

Good spacing makes content easier to understand.

Crowded interfaces increase cognitive load and reduce perceived quality.

---

# Design Principles

## Consistency

Similar components should always use similar spacing.

Users should subconsciously recognize consistent spacing patterns throughout the application.

---

## Hierarchy

Spacing should communicate relationships.

Elements that belong together should be placed closer together.

Unrelated content should have greater separation.

---

## Breathing Room

Every component should have sufficient space around it.

The interface should never feel cramped.

---

## Predictability

Spacing should follow predefined tokens.

Arbitrary spacing values are not allowed.

---

# Spacing Categories

The spacing system consists of predefined tokens.

Examples include:

- Extra Small
- Small
- Medium
- Large
- Extra Large
- Section
- Page

All spacing should originate from these predefined categories.

---

# Types of Spacing

## Internal Spacing

The space inside a component.

Examples:

- Card padding
- Button padding
- Form padding
- Modal padding

Internal spacing improves readability and interaction.

---

## External Spacing

The space between components.

Examples:

- Margin between cards
- Gap between sections
- Distance between buttons

External spacing defines relationships between elements.

---

## Component Spacing

Every reusable component should maintain consistent spacing.

Examples:

Cards

Buttons

Forms

Badges

Tables

Navigation

Product Cards

Blog Cards

No component should define its own spacing values.

---

## Section Spacing

Major sections should maintain generous vertical spacing.

Examples:

Hero

Featured Products

Collections

Testimonials

Blog

Footer

Consistent section spacing creates rhythm throughout the page.

---

## Page Spacing

Pages should maintain consistent padding from the viewport.

Content should never touch the edges of the screen.

Page spacing should remain responsive.

---

# Content Grouping

Spacing should visually communicate hierarchy.

Example:

Heading

↓

Small spacing

↓

Paragraph

↓

Large spacing

↓

Next Section

Spacing should naturally guide the user's eye.

---

# Grid Spacing

Columns and rows should maintain consistent gaps.

Grid spacing should remain uniform across the application.

Uneven spacing should be avoided.

---

# Card Spacing

Cards should maintain consistent:

- Internal padding
- Header spacing
- Body spacing
- Footer spacing

Information inside cards should never appear crowded.

---

# Form Spacing

Forms should clearly separate:

Labels

Inputs

Helper Text

Validation Messages

Buttons

Proper spacing improves form completion speed.

---

# Button Spacing

Buttons should maintain:

Consistent internal padding.

Consistent spacing between icon and text.

Consistent spacing between adjacent buttons.

Buttons should never appear compressed.

---

# Navigation Spacing

Navigation should maintain comfortable spacing between:

Logo

Links

Icons

Search

Profile

Menus should remain uncluttered.

---

# Table Spacing

Tables should maintain adequate:

Cell padding

Header spacing

Row spacing

Dense tables should remain readable.

---

# Product Page Spacing

Product pages should prioritize scanning.

Spacing should separate:

Images

Pricing

Specifications

Variants

Reviews

Related Products

without overwhelming the user.

---

# Blog Spacing

Blog articles require generous spacing.

Paragraphs

Headings

Lists

Images

Quotes

Tables

should remain visually separated.

Long-form reading should never feel dense.

---

# Responsive Spacing

Spacing should adapt across:

Desktop

Laptop

Tablet

Large Mobile

Mobile

Small Mobile

Smaller screens should reduce spacing proportionally while maintaining readability.

---

# Touch Devices

Touch interfaces require additional spacing.

Interactive elements should never be placed too closely together.

Adequate spacing reduces accidental touches.

---

# Visual Rhythm

Every page should establish a consistent rhythm through spacing.

Repeated spacing patterns help users understand page structure intuitively.

---

# Empty Space

Whitespace should have purpose.

Large empty areas should provide breathing room rather than appear unfinished.

Avoid excessive empty space that weakens visual hierarchy.

---

# Accessibility

Spacing should improve accessibility by:

Increasing readability.

Separating interactive elements.

Improving touch usability.

Reducing visual clutter.

Supporting zoomed interfaces.

---

# Performance

Spacing should be implemented through reusable utility classes and design tokens.

Avoid creating page-specific spacing values.

---

# CSS Rules

All spacing must use predefined spacing tokens.

Correct:

margin-bottom: var(--space-lg);

padding: var(--space-md);

Incorrect:

margin-bottom: 37px;

padding: 19px;

---

# Naming Convention

Spacing tokens should remain semantic.

Examples:

--space-xs

--space-sm

--space-md

--space-lg

--space-xl

--space-section

--space-page

Spacing utility classes should follow the same naming convention.

Examples:

.space-xs

.space-sm

.space-md

.space-lg

.space-xl

---

# Future Expansion

Future components should reuse existing spacing tokens.

Introducing new spacing values requires updating this Design System.

---

# Do's

✓ Use spacing tokens everywhere.

✓ Maintain consistent visual rhythm.

✓ Group related information closely.

✓ Separate unrelated content clearly.

✓ Design with breathing room.

✓ Keep layouts balanced.

✓ Support responsive spacing.

---

# Don'ts

✗ Do not hardcode spacing values.

✗ Do not create component-specific spacing systems.

✗ Do not crowd interfaces.

✗ Do not leave excessive empty space.

✗ Do not use inconsistent margins.

✗ Do not mix arbitrary spacing values.

✗ Do not violate established spacing hierarchy.

---

# Approval Requirement

Any new spacing token or spacing pattern must first be documented within this Design System before being implemented throughout the Eurasian House ecosystem.

This document serves as the single source of truth for all spacing decisions.

---

# 11. Border Radius

# 9. Border Radius

## Purpose

The Border Radius System defines the curvature applied to interface elements throughout the Eurasian House ecosystem.

It creates visual consistency, reinforces the brand's premium aesthetic, and ensures every component feels like part of a unified design language.

Border radius is a structural design decision—not a decorative effect.

---

# Border Radius Philosophy

The Eurasian House interface should feel:

- Soft
- Elegant
- Premium
- Modern
- Calm
- Refined

Sharp corners create a technical appearance.

Excessively rounded corners create a playful appearance.

The design system aims for a balanced middle ground that complements handcrafted luxury products.

---

# Design Principles

## Consistency

Components serving similar purposes should share the same border radius.

Users should subconsciously recognize patterns across the interface.

---

## Moderation

Border radius should remain subtle.

Rounded corners should enhance the interface rather than become visually dominant.

---

## Hierarchy

Larger surfaces may use slightly larger radii.

Smaller controls should use smaller radii.

Border radius should scale naturally with component size.

---

## Reusability

Border radius values should never be invented inside components.

Every radius must originate from reusable design tokens.

---

# Radius Categories

The system consists of predefined radius tokens.

Examples include:

- None
- Extra Small
- Small
- Medium
- Large
- Extra Large
- Full

Components should select from these predefined categories only.

---

# Component Guidelines

## Buttons

Buttons should use consistent radius values across the application.

Primary, Secondary, Outline, and Ghost buttons should follow the same radius system.

---

## Cards

Cards should use moderate corner rounding to create a premium appearance.

Cards should never appear overly rounded.

---

## Images

Product images should maintain a consistent radius.

Image galleries should preserve the same visual language throughout the website.

---

## Inputs

Input fields should use the same radius as other interactive components.

Consistency improves familiarity and usability.

---

## Dropdowns

Dropdown menus should visually align with input fields and cards.

---

## Modals

Modals may use slightly larger radii than cards to distinguish elevated surfaces.

---

## Navigation

Navigation elements should maintain subtle corner rounding where appropriate.

Navigation should prioritize clarity over decoration.

---

## Badges

Badges may use either rounded rectangles or pill shapes depending on their purpose.

The style should remain consistent across the application.

---

## Chips

Interactive chips and filters may use larger radii to improve touch interaction and visual grouping.

---

## Tables

Table containers may include rounded corners.

Individual table cells should not use independent border radius values.

---

## Tooltips

Tooltips should maintain subtle rounding while remaining visually lightweight.

---

## Toast Notifications

Toast messages should use the same radius family as cards and modals.

---

## Accordions

Accordion containers should follow the card radius system.

Expanded sections should preserve visual continuity.

---

# Circular Elements

Elements designed to be circular should use the dedicated full-radius token.

Examples include:

- Profile Images
- Status Indicators
- Color Swatches
- Notification Dots
- Icon Buttons

Circular elements should never rely on arbitrary radius values.

---

# Nested Components

Nested components should maintain visual harmony.

Child components should not visually conflict with the radius of their parent container.

Overflow behavior should preserve rounded corners where appropriate.

---

# Responsive Behavior

Border radius should remain consistent across all screen sizes.

Responsive layouts should not introduce different corner styles unless explicitly required.

---

# Theme Compatibility

Border radius is independent of themes.

Changing between Light Mode and Dark Mode must not alter component curvature.

---

# Accessibility

Border radius should never reduce usability.

Interactive elements must remain visually recognizable and maintain sufficient touch targets.

Rounded corners should not interfere with focus indicators.

---

# Performance

Border radius values should be reused through design tokens.

Avoid excessive variation that increases maintenance complexity.

---

# CSS Rules

Every border radius must originate from CSS variables.

Components must never define independent radius values.

Correct:

border-radius: var(--radius-md);

Incorrect:

border-radius: 11px;

---

# Naming Convention

Radius tokens should remain semantic.

Examples:

--radius-none

--radius-xs

--radius-sm

--radius-md

--radius-lg

--radius-xl

--radius-full

Avoid names based on pixel values.

---

# Future Expansion

Future components should reuse existing radius tokens.

Introducing a new radius token should require a documented design review.

---

# Do's

✓ Use reusable radius tokens.

✓ Maintain consistency across components.

✓ Match radius to component size.

✓ Keep the interface elegant.

✓ Preserve visual harmony.

✓ Support all themes.

---

# Don'ts

✗ Do not hardcode border radius values.

✗ Do not create component-specific radius values.

✗ Do not mix multiple radius styles on the same page.

✗ Do not overuse pill-shaped elements.

✗ Do not create visually inconsistent corners.

✗ Do not introduce new radius values without updating this design system.

---

# Approval Requirement

Any new border radius token or curvature style must first be documented within this Design System before being implemented throughout the Eurasian House ecosystem.

This document is the single source of truth for all border radius decisions.

---

# 12. Elevation (Shadows)

To be defined.

---

# 13. Images

# 11. Images

## Purpose

The Image System defines how images are displayed, processed, optimized, and managed throughout the Eurasian House ecosystem.

Images are the most important visual element of the website. Since Eurasian House sells handcrafted rugs, photography is the primary selling tool.

The interface exists to support the images—not compete with them.

---

# Image Philosophy

Every image should communicate:

- Authenticity
- Craftsmanship
- Luxury
- Quality
- Texture
- Trust

Images should feel natural rather than artificially enhanced.

Customers should feel as if they are viewing the actual product in person.

---

# Design Principles

## Product First

Product photography should always receive the highest visual priority.

No decorative element should draw more attention than the product image.

---

## Consistency

Every product should follow a consistent photography style.

Consistency builds trust and creates a premium shopping experience.

---

## Quality

Images must be sharp, well-lit, and professionally composed.

Blurry, stretched, pixelated, or poorly cropped images are unacceptable.

---

## Performance

Images should load quickly without noticeably sacrificing visual quality.

Performance and quality must remain balanced.

---

# Image Categories

The system supports:

- Product Images
- Variant Images
- Lifestyle Images
- Collection Images
- Category Images
- Hero Images
- Banner Images
- Blog Images
- Review Images
- User Uploaded Images
- Icons
- Logos
- Illustrations

Each category should follow its own usage guidelines.

---

# Product Images

Product images are the foundation of the ecommerce experience.

They should:

- Represent the actual product.
- Preserve accurate colors.
- Clearly show texture and craftsmanship.
- Maintain consistent framing.
- Avoid unnecessary editing.

Every product should include multiple viewing angles whenever possible.

---

# Variant Images

Each product variation should display its own corresponding images.

Changing a color or variation should update the displayed images immediately.

Variant images should maintain the same composition and photography style.

---

# Lifestyle Images

Lifestyle images help customers visualize products in real spaces.

They should:

- Feel natural.
- Match the Eurasian House aesthetic.
- Avoid excessive staging.
- Complement rather than distract from the product.

---

# Hero Images

Hero images introduce major collections, campaigns, or promotions.

Hero images should:

- Be high resolution.
- Include sufficient negative space for text overlays.
- Maintain readability.
- Avoid cluttered compositions.

---

# Category Images

Category images should visually represent the entire category.

They should create consistency across browsing experiences.

---

# Blog Images

Blog images should support the content rather than replace it.

Every article should include:

- Featured Image
- Inline Images (when necessary)

Images should enhance understanding.

---

# Review Images

Customers may upload images with reviews.

Review images should:

- Load efficiently.
- Display consistently.
- Respect aspect ratios.
- Support lightbox viewing when appropriate.

---

# User Uploaded Images

User-generated images should be:

- Compressed automatically.
- Optimized for web delivery.
- Stored securely.
- Displayed consistently.

---

# Image Composition

Photography should prioritize:

- Natural lighting
- Accurate colors
- Straight alignment
- Visible craftsmanship
- Balanced framing
- Minimal distractions

Backgrounds should never compete with the product.

---

# Aspect Ratios

Each image category should maintain a consistent aspect ratio.

Examples include:

Product Images

Category Images

Hero Images

Collection Images

Blog Covers

Review Images

Changing aspect ratios within the same category should be avoided.

---

# Cropping

Images should never crop important product details.

Automatic cropping should prioritize preserving the subject.

Product edges should remain visible whenever possible.

---

# Image Scaling

Images should scale proportionally.

Stretching or distortion is prohibited.

Original proportions must always be preserved.

---

# Responsive Images

Images should adapt to different screen sizes.

Only the required image size should be delivered to the client.

Large desktop images should not be unnecessarily downloaded on mobile devices.

---

# Lazy Loading

Images below the initial viewport should be lazy loaded.

Critical images above the fold should load immediately.

Lazy loading should never negatively affect user experience.

---

# Image Optimization

Every uploaded image should undergo automatic optimization.

Optimization includes:

- Compression
- Responsive sizing
- Modern image formats
- Efficient delivery

Optimization should preserve perceived image quality.

---

# Image Compression

Compression should balance:

Visual Quality

File Size

Loading Speed

Compression should never introduce visible artifacts.

---

# Cloud Storage

All production images should be stored in Cloudinary.

Cloudinary should handle:

- Delivery
- Optimization
- Responsive transformations
- Modern formats
- Compression

Local storage should never be used for production assets.

---

# File Naming

Image filenames should remain descriptive.

Names should improve organization and search engine understanding.

Random filenames should be avoided whenever possible.

---

# Alt Text

Every meaningful image must include descriptive alternative text.

Alt text should:

Describe the image.

Support accessibility.

Improve SEO.

Decorative images should use empty alt attributes where appropriate.

---

# Image Loading States

Images should display graceful loading placeholders.

Layout shifts during image loading should be minimized.

Skeleton loaders are preferred for slower connections.

---

# Lightbox

Where appropriate, images should support fullscreen viewing.

Lightbox interactions should remain smooth and intuitive.

---

# Image Borders

Images should generally avoid visible borders.

Border radius should follow the global Border Radius System.

Decorative frames should not be used.

---

# Image Shadows

Product images should not rely on heavy shadows.

Subtle elevation may be used where necessary.

Shadows should never distract from the product.

---

# Image Accessibility

Images should remain accessible to assistive technologies.

Interactive images should support keyboard navigation.

Alternative text should accurately describe meaningful content.

---

# Image Performance

Images should be optimized to minimize:

Bandwidth usage

Loading time

Layout shifts

Memory usage

Largest Contentful Paint (LCP)

Image performance directly affects SEO and user experience.

---

# CSS Rules

Images should use reusable utility classes.

Avoid inline image styling.

Object-fit behavior should remain consistent across the application.

---

# Naming Convention

Reusable image classes should remain semantic.

Examples:

.image-product

.image-hero

.image-category

.image-blog

.image-review

.image-avatar

.image-cover

.image-thumbnail

Avoid page-specific image classes.

---

# Future Expansion

Future image categories should integrate into this system rather than introducing independent standards.

The image system should remain scalable as new products, blogs, and features are added.

---

# Do's

✓ Prioritize product photography.

✓ Preserve image quality.

✓ Optimize every image.

✓ Maintain consistent aspect ratios.

✓ Use responsive images.

✓ Write descriptive alt text.

✓ Use Cloudinary for delivery.

✓ Lazy load non-critical images.

✓ Keep compositions clean and professional.

---

# Don'ts

✗ Do not stretch images.

✗ Do not distort aspect ratios.

✗ Do not upload oversized files unnecessarily.

✗ Do not use inconsistent image styles.

✗ Do not apply excessive filters.

✗ Do not use decorative borders.

✗ Do not skip image optimization.

✗ Do not omit alt text for meaningful images.

✗ Do not store production images locally.

---

# Approval Requirement

Any new image category, photography standard, optimization strategy, or display pattern must first be documented within this Design System before implementation.

This document is the single source of truth for all image-related decisions throughout the Eurasian House ecosystem.

---

# 14. Icons

# 12. Icons

## Purpose

The Icon System defines the consistent use of icons throughout the Eurasian House ecosystem.

Icons exist to improve comprehension, reduce cognitive effort, support navigation, and enhance usability without replacing text.

Icons are supporting elements—not the primary focus of the interface.

---

# Icon Philosophy

Icons should feel:

- Simple
- Elegant
- Modern
- Lightweight
- Recognizable
- Functional

Icons should communicate meaning instantly.

They should never be decorative without purpose.

---

# Design Principles

## Clarity

Every icon should clearly communicate its intended action or meaning.

Users should understand an icon without guessing.

---

## Consistency

The same icon should always represent the same action.

Example:

Search should always use the Search icon.

Shopping Cart should always use the Cart icon.

Wishlist should always use the Heart icon.

Changing icons for the same action across pages is prohibited.

---

## Simplicity

Icons should remain visually simple.

Avoid overly detailed or highly stylized icons.

The product should always remain the visual focus.

---

## Familiarity

Whenever possible, use industry-standard iconography.

Users should immediately recognize common actions.

---

# Icon Library

The application should use a single icon library throughout the project.

Mixing multiple icon libraries is discouraged.

Custom icons should only be introduced when absolutely necessary.

---

# Icon Categories

The system includes:

- Navigation Icons
- Action Icons
- Status Icons
- Communication Icons
- Product Icons
- Social Icons
- Payment Icons
- File Icons
- Media Icons
- System Icons

Each category should remain visually consistent.

---

# Navigation Icons

Navigation icons help users move through the application.

Examples include:

Home

Categories

Products

Orders

Profile

Settings

Cart

Wishlist

Search

Menu

Back

Forward

Navigation icons should remain intuitive and familiar.

---

# Action Icons

Action icons represent user interactions.

Examples:

Add

Edit

Delete

Save

Upload

Download

Share

Filter

Sort

Refresh

Copy

Print

Actions should always remain clear and unambiguous.

---

# Status Icons

Status icons communicate system feedback.

Examples:

Success

Warning

Error

Information

Pending

Completed

Cancelled

Status icons should reinforce, not replace, accompanying text.

---

# Product Icons

Product-related icons provide additional information.

Examples:

Material

Color

Size

Shape

Weight

Stock

Delivery

Warranty

Specifications

They should remain secondary to textual information.

---

# Social Icons

Social media icons should always use official brand symbols.

Do not redesign or modify official social media logos.

---

# Payment Icons

Payment provider logos should always use official brand assets.

Examples:

Visa

Mastercard

PayPal

UPI

Razorpay

Official branding guidelines should be respected.

---

# Icon Size

Icons should follow predefined size tokens.

Components should never define arbitrary icon sizes.

Larger icons should communicate importance, not decoration.

---

# Icon Alignment

Icons should align consistently with surrounding text and components.

Vertical alignment should remain visually balanced.

Icons should never appear misaligned.

---

# Icon Spacing

Icons should maintain consistent spacing from:

Text

Buttons

Inputs

Cards

Navigation

Spacing should originate from the global spacing system.

---

# Icon Colors

Icons should use semantic color tokens.

Examples:

Primary

Secondary

Muted

Disabled

Success

Warning

Error

Icons should never introduce independent colors.

---

# Interactive Icons

Clickable icons should provide clear interaction feedback.

Supported states include:

Default

Hover

Focus

Active

Disabled

Interaction feedback should remain subtle and consistent.

---

# Icon Buttons

Icons placed inside buttons should remain visually balanced.

Icons should never overpower button labels.

Spacing between icon and text should remain consistent.

---

# Accessibility

Icons must support accessibility.

Decorative icons should be hidden from assistive technologies.

Meaningful icons should include accessible labels.

Icons alone should never communicate critical information.

---

# Responsive Behavior

Icons should scale appropriately across different screen sizes.

Touch targets should remain accessible on mobile devices.

---

# Performance

Only the icons required by a page should be loaded.

Unused icons should not increase bundle size.

SVG icons are preferred whenever possible.

---

# CSS Rules

Icons should inherit styling through reusable classes.

Avoid inline icon styling.

Colors and sizing should come from design tokens.

---

# Naming Convention

Icon classes should remain semantic.

Examples:

.icon

.icon-sm

.icon-md

.icon-lg

.icon-muted

.icon-primary

Avoid names based solely on pixel values.

---

# Future Expansion

New icons should match the existing visual style.

Introducing a custom icon set requires updating this Design System.

---

# Do's

✓ Use one icon library.

✓ Keep icons simple.

✓ Use semantic colors.

✓ Maintain consistent sizing.

✓ Support accessibility.

✓ Keep icons recognizable.

✓ Use SVG icons whenever possible.

---

# Don'ts

✗ Do not mix multiple icon libraries.

✗ Do not use decorative icons excessively.

✗ Do not rely on icons without labels for important actions.

✗ Do not hardcode icon colors.

✗ Do not create inconsistent icon styles.

✗ Do not stretch or distort icons.

---

# Approval Requirement

Any new icon style, icon library, or custom icon introduced into the application must first be documented within this Design System before implementation.

This document serves as the single source of truth for all icon-related decisions throughout the Eurasian House ecosystem.

---

# 15. Buttons

# 13. Buttons

## Purpose

The Button System defines every interactive button used throughout the Eurasian House ecosystem.

Buttons represent the primary method of user interaction. They should clearly communicate actions, establish visual hierarchy, and provide immediate feedback while maintaining a consistent premium appearance.

Every button should feel familiar regardless of where it appears.

---

# Button Philosophy

Buttons should feel:

- Clean
- Elegant
- Confident
- Modern
- Minimal
- Easy to identify
- Easy to interact with

Buttons should attract attention only when necessary.

The product should always remain the primary visual focus.

---

# Design Principles

## Clarity

Every button should communicate a single, obvious action.

Users should immediately understand what will happen after clicking.

---

## Consistency

Buttons performing similar actions should always look identical.

The same action should never have multiple visual styles.

---

## Hierarchy

The visual importance of a button should reflect the importance of its action.

Primary actions should stand out.

Secondary actions should support.

Destructive actions should be clearly distinguishable.

---

## Simplicity

Buttons should avoid unnecessary decoration.

Simple buttons appear more premium and improve readability.

---

# Button Types

The system supports the following button variants.

## Primary Button

The most important action on a page.

Examples:

- Add to Cart
- Buy Now
- Checkout
- Save Changes
- Continue

A page should rarely contain multiple competing primary buttons.

---

## Secondary Button

Supports the primary action.

Examples:

- Learn More
- View Details
- Compare
- Back

---

## Outline Button

Used for less prominent actions while maintaining visibility.

Examples:

- View Collection
- Explore
- Cancel

---

## Ghost Button

Minimal visual emphasis.

Used where visual noise should remain low.

Examples:

- Close
- Skip
- Dismiss

---

## Text Button

Used inside paragraphs or lightweight interfaces.

Should resemble links while maintaining button behavior.

---

## Destructive Button

Reserved for irreversible actions.

Examples:

- Delete
- Remove
- Cancel Order
- Permanently Delete

Destructive buttons should be used sparingly.

---

## Icon Button

Buttons containing only an icon.

Examples:

Search

Wishlist

Profile

Settings

Share

Menu

Every icon-only button must remain accessible.

---

## Floating Action Button

Used only when a single persistent action significantly improves usability.

Should remain rare.

---

# Button Sizes

Buttons should use predefined size tokens.

Supported sizes include:

- Extra Small
- Small
- Medium
- Large

Custom sizes should not be introduced.

---

# Button Shape

Button radius must follow the global Border Radius System.

Buttons should never define independent border radius values.

---

# Button Padding

Internal spacing should originate from the global Spacing System.

Padding should create comfortable click areas while maintaining visual balance.

---

# Button Width

Buttons may be:

- Content Width
- Fixed Width
- Full Width

The selected width should depend on context.

Buttons should never stretch unnecessarily.

---

# Button States

Every interactive button must support:

Default

Hover

Focus

Active

Loading

Disabled

Visited (where applicable)

State transitions should remain smooth and consistent.

---

# Hover State

Hover effects should provide subtle visual feedback.

Avoid dramatic animations.

Hover should reinforce interactivity without distracting users.

---

# Focus State

Keyboard focus indicators must remain clearly visible.

Focus styling should satisfy accessibility requirements.

Focus indicators should never be removed.

---

# Active State

Active states should communicate that interaction is occurring.

Animations should remain subtle.

---

# Disabled State

Disabled buttons should remain visually recognizable while clearly indicating that interaction is unavailable.

Disabled buttons should not appear clickable.

---

# Loading State

Buttons performing asynchronous actions should display loading indicators.

Loading buttons should prevent duplicate submissions.

Button dimensions should remain stable during loading.

---

# Icon Usage

Buttons may include icons.

Icons should support—not replace—the text.

Spacing between icons and labels should remain consistent.

Icon-only buttons should include accessible labels.

---

# Text Guidelines

Button labels should:

Be concise.

Begin with action verbs where appropriate.

Remain easy to understand.

Examples:

Add to Cart

Checkout

Continue

Save

Apply Filter

View Details

Avoid vague labels such as:

Click Here

Proceed

Submit

Go

---

# Alignment

Button text and icons should remain vertically centered.

Alignment should remain consistent across every button style.

---

# Grouped Buttons

Adjacent buttons should maintain consistent spacing.

Primary actions should appear before secondary actions whenever appropriate.

Button groups should remain visually balanced.

---

# Responsive Behavior

Buttons should remain usable across:

Desktop

Laptop

Tablet

Mobile

Touch targets should remain comfortable.

Full-width buttons may be used where they improve usability.

---

# Accessibility

Buttons must support:

Keyboard navigation.

Visible focus states.

Screen readers.

Adequate touch targets.

Proper contrast ratios.

Buttons should never rely solely on color to communicate meaning.

---

# Performance

Buttons should reuse shared styles.

Avoid creating page-specific button implementations.

Animations should remain lightweight.

---

# CSS Rules

Every button should use reusable component classes.

Avoid inline styles.

All colors, spacing, typography, borders, shadows, and transitions should originate from design tokens.

---

# Naming Convention

Button classes should remain semantic.

Examples:

.btn-primary

.btn-secondary

.btn-outline

.btn-ghost

.btn-text

.btn-danger

.btn-icon

.btn-loading

.btn-block

Avoid page-specific button names.

---

# Future Expansion

Future button variants should extend the existing system rather than introducing independent styles.

Any new button type must be reviewed before implementation.

---

# Do's

✓ Use semantic button variants.

✓ Maintain visual hierarchy.

✓ Use concise action-oriented labels.

✓ Provide interaction feedback.

✓ Keep buttons accessible.

✓ Maintain consistent spacing.

✓ Reuse existing button styles.

✓ Follow the global design tokens.

---

# Don'ts

✗ Do not hardcode button styles.

✗ Do not create page-specific button designs.

✗ Do not use multiple primary buttons unnecessarily.

✗ Do not remove focus indicators.

✗ Do not use vague button labels.

✗ Do not overcrowd interfaces with buttons.

✗ Do not introduce unnecessary animations.

✗ Do not ignore disabled or loading states.

---

# Approval Requirement

Any new button variant, interaction pattern, or visual style must first be documented within this Design System before implementation.

This document serves as the single source of truth for all button-related decisions throughout the Eurasian House ecosystem.

---

# 16. Cards

To be defined.

---

# 17. Forms

# 15. Forms

## Purpose

The Form System defines the design, behavior, validation, and interaction of every form throughout the Eurasian House ecosystem.

Forms are the primary communication interface between users and the application. They should be intuitive, consistent, accessible, and efficient to complete.

Whether a customer is placing an order, writing a review, signing in, or an administrator is managing products, every form should feel familiar.

---

# Form Philosophy

Forms should feel:

- Simple
- Clear
- Comfortable
- Organized
- Trustworthy
- Fast
- Professional

The objective of every form is to minimize user effort while maximizing accuracy.

---

# Design Principles

## Clarity

Every field should clearly communicate what information is required.

Users should never have to guess.

---

## Consistency

All forms must follow the same visual language.

Inputs, labels, spacing, validation, and interactions should remain consistent across the application.

---

## Simplicity

Forms should request only the information necessary.

Avoid unnecessary fields.

---

## Efficiency

Users should complete forms with minimal effort.

Reduce typing whenever possible through:

- Dropdowns
- Auto Complete
- Default Values
- Suggestions
- Smart Validation

---

## Accessibility

Every form should remain usable by:

- Keyboard users
- Screen readers
- Touch users
- Users with visual impairments

---

# Form Types

The system supports:

- Authentication Forms
- Checkout Forms
- Contact Forms
- Product Forms
- Admin Forms
- Search Forms
- Filter Forms
- Newsletter Forms
- Review Forms
- Address Forms
- Profile Forms
- Settings Forms

Every form should follow the same design principles.

---

# Form Structure

A standard form consists of:

Title

↓

Description (Optional)

↓

Input Groups

↓

Helper Text (Optional)

↓

Validation Messages

↓

Primary Action

↓

Secondary Action

The structure should remain predictable.

---

# Labels

Every input should include a visible label.

Labels should clearly describe the required information.

Labels should never rely solely on placeholders.

---

# Placeholder Text

Placeholders provide examples—not instructions.

Example:

"John Smith"

instead of

"Enter your name"

Placeholders should disappear once the user begins typing.

---

# Required Fields

Required fields should be clearly indicated.

Users should immediately understand which information is mandatory.

---

# Optional Fields

Optional fields should be identified appropriately.

Avoid making unnecessary information mandatory.

---

# Input Types

Supported inputs include:

- Text
- Email
- Password
- Phone
- Number
- Search
- URL
- Date
- Time
- Textarea
- Select
- Multi Select
- Checkbox
- Radio Button
- Toggle Switch
- File Upload
- Image Upload
- Color Picker
- Range Slider

Each input should maintain consistent styling.

---

# Input Appearance

Inputs should appear:

Clean

Minimal

Readable

Comfortable

Professional

Avoid excessive decoration.

---

# Input States

Every input should support:

Default

Hover

Focus

Filled

Disabled

Read Only

Success

Warning

Error

Loading

All states should remain visually consistent.

---

# Focus State

Focused inputs should provide clear visual feedback.

Focus indicators should remain visible and accessible.

Removing focus styles is prohibited.

---

# Validation

Validation should occur as early as possible without interrupting the user.

Validation should:

Prevent mistakes.

Explain problems.

Guide corrections.

Avoid frustration.

---

# Error Messages

Error messages should:

Be specific.

Explain the problem.

Explain how to fix it.

Avoid technical language.

Example:

Incorrect:

Invalid Input

Correct:

Please enter a valid email address.

---

# Success Messages

Successful actions should provide confirmation.

Success feedback should remain subtle.

---

# Helper Text

Helper text should provide useful guidance.

Examples:

Password requirements

Accepted image formats

Character limits

Maximum upload size

Helper text should remain secondary to labels.

---

# Form Sections

Large forms should be divided into logical sections.

Examples:

Personal Information

Shipping Address

Billing Information

Product Details

Inventory

SEO

Grouping improves usability.

---

# Buttons

Forms should contain one clear primary action.

Examples:

Save

Continue

Submit

Add Product

Update Order

Secondary actions should remain visually subordinate.

---

# File Upload

Upload components should clearly communicate:

Supported formats

Maximum file size

Upload progress

Success

Failure

Image previews should appear whenever possible.

---

# Search Forms

Search fields should remain immediately recognizable.

Search should support keyboard interaction.

Filtering should feel responsive.

---

# Filter Forms

Filters should remain lightweight.

Frequently used filters should be immediately visible.

Advanced filters may remain collapsible.

---

# Admin Forms

Administrative forms may contain many fields.

Large admin forms should use:

Sections

Cards

Tabs

Accordions

to reduce cognitive load.

---

# Checkout Forms

Checkout forms should prioritize speed.

Reduce friction by:

Auto Fill

Saved Addresses

Country Detection

Postal Lookup

Clear Validation

---

# Responsive Behavior

Forms should adapt across:

Desktop

Laptop

Tablet

Large Mobile

Mobile

Fields should stack naturally on smaller devices.

Touch interactions should remain comfortable.

---

# Accessibility

Forms must support:

Keyboard navigation.

Logical tab order.

Visible focus indicators.

Proper labels.

Screen readers.

Adequate touch targets.

Error messages should be accessible.

---

# Performance

Forms should:

Validate efficiently.

Avoid unnecessary re-renders.

Load progressively where appropriate.

Large forms should remain responsive.

---

# CSS Rules

Forms should be built using reusable components.

Avoid page-specific form styling.

Spacing, typography, borders, colors, and states should originate from global design tokens.

---

# Naming Convention

Form classes should remain semantic.

Examples:

.form-group

.form-label

.form-control

.form-select

.form-check

.form-helper

.form-error

.form-success

.form-section

.form-actions

Avoid page-specific naming.

---

# Future Expansion

Future input components should integrate into this system.

New form controls should not introduce independent styling or interaction patterns.

---

# Do's

✓ Keep forms simple.

✓ Use clear labels.

✓ Validate intelligently.

✓ Show helpful error messages.

✓ Maintain accessibility.

✓ Group related fields.

✓ Use reusable components.

✓ Keep forms responsive.

✓ Reduce user effort.

---

# Don'ts

✗ Do not rely on placeholders as labels.

✗ Do not hide validation messages.

✗ Do not use inconsistent input styles.

✗ Do not create page-specific forms.

✗ Do not remove focus indicators.

✗ Do not overwhelm users with unnecessary fields.

✗ Do not use technical error messages.

✗ Do not ignore mobile usability.

---

# Approval Requirement

Any new input component, validation pattern, interaction behavior, or form layout must first be documented within this Design System before implementation.

This document serves as the single source of truth for all form-related decisions throughout the Eurasian House ecosystem.

---

# 18. Navigation

Includes:

- Navbar
- Footer
- Sidebar
- Breadcrumb
- Pagination

---

# 19. Tables

To be defined.

---

# 20. Animations

# 16. Animations

## Purpose

The Animation System defines how motion is used throughout the Eurasian House ecosystem.

Animations should improve usability, provide feedback, reinforce hierarchy, and create a premium user experience without becoming distracting.

Motion exists to support interaction—not to entertain.

---

# Animation Philosophy

Animations should feel:

- Smooth
- Natural
- Elegant
- Responsive
- Premium
- Purposeful

Every animation should have a clear reason for existing.

If removing an animation does not reduce usability, it probably should not exist.

---

# Design Principles

## Purpose Over Decoration

Animations should communicate:

- Interaction
- Navigation
- State Changes
- Feedback
- Hierarchy

Decorative animations should be used sparingly.

---

## Speed

Animations should feel responsive.

Interfaces should never feel delayed because of animation.

Motion should enhance speed—not reduce it.

---

## Consistency

The same interaction should always produce the same animation.

Users should subconsciously learn how the interface behaves.

---

## Simplicity

Animations should remain subtle.

The interface should never feel overly animated.

---

# Animation Categories

The system includes:

- Hover Animations
- Click Animations
- Focus Animations
- Page Transitions
- Modal Animations
- Drawer Animations
- Dropdown Animations
- Toast Animations
- Loading Animations
- Skeleton Loading
- Scroll Animations
- Image Animations
- Card Animations
- Button Animations
- Form Animations

---

# Hover Animations

Hover effects indicate interactivity.

Hover animations should remain subtle.

Examples:

- Slight background transition
- Slight elevation
- Border color transition
- Shadow transition

Avoid excessive movement.

---

# Click Animations

Buttons and interactive elements should acknowledge user interaction.

Feedback should feel immediate.

Examples:

- Small press effect
- Ripple (where appropriate)
- Scale reduction
- Color transition

---

# Focus Animations

Keyboard navigation should include visible focus feedback.

Focus transitions should improve accessibility rather than distract.

---

# Page Transitions

Navigation between pages should remain fast.

Large cinematic transitions are discouraged.

The interface should feel immediate.

---

# Modal Animations

Modals should:

Fade

Scale

Appear naturally

Close smoothly

They should never abruptly appear or disappear.

---

# Drawer Animations

Side drawers should slide naturally from their designated edge.

Movement should feel lightweight.

---

# Dropdown Animations

Dropdowns should appear smoothly.

Avoid dramatic bounce effects.

Menus should feel attached to their trigger.

---

# Toast Notifications

Toast messages should:

Fade in

Slide gently

Disappear automatically

Motion should remain subtle.

---

# Loading Animations

Loading indicators reassure users that work is in progress.

Loading animations should remain simple.

Avoid distracting or playful effects.

---

# Skeleton Loading

Skeleton loaders are preferred over generic spinners whenever content structure is known.

Skeleton layouts should closely resemble final content.

---

# Scroll Animations

Scroll animations should be minimal.

Allowed examples:

Fade In

Slide Up

Scale Slightly

Excessive scroll-triggered motion should be avoided.

---

# Image Animations

Images should not animate unnecessarily.

Allowed:

Fade In

Lazy Load Transition

Lightbox Zoom

Avoid continuous image movement.

---

# Card Animations

Cards may include subtle hover feedback.

Examples:

Elevation

Border transition

Shadow transition

Cards should never bounce or rotate.

---

# Button Animations

Buttons should communicate interaction through:

Hover

Active

Loading

Disabled

Animation should reinforce usability.

---

# Form Animations

Forms should use animation for:

Validation

Error Messages

Success Messages

Field Focus

Animation should reduce cognitive load.

---

# Timing

Animation durations should remain consistent across the application.

Avoid arbitrary durations.

Animations should complete quickly.

---

# Easing

Use a limited set of easing functions.

Motion should feel smooth and predictable.

Avoid exaggerated easing curves.

---

# Performance

Animations should prioritize properties that are GPU accelerated.

Preferred properties include:

Opacity

Transform

Avoid animating properties that trigger expensive layout recalculations whenever possible.

---

# Accessibility

Animations should respect user accessibility preferences.

Users requesting reduced motion should receive minimal animations.

Motion should never trigger discomfort or interfere with usability.

---

# Responsive Behavior

Animations should remain smooth across:

Desktop

Laptop

Tablet

Mobile

Performance on lower-powered devices should remain acceptable.

---

# CSS Rules

Animations should use reusable classes and predefined variables.

Avoid page-specific animation implementations.

---

# Naming Convention

Animation classes should remain semantic.

Examples:

.fade-in

.fade-out

.slide-up

.slide-down

.scale-in

.scale-out

.hover-lift

.loading

.skeleton

Avoid descriptive names tied to individual pages.

---

# Future Expansion

Future animations should extend the existing motion language rather than introducing unrelated styles.

All new animations should support performance and accessibility requirements.

---

# Do's

✓ Animate with purpose.

✓ Keep motion subtle.

✓ Prioritize usability.

✓ Maintain consistency.

✓ Respect reduced-motion preferences.

✓ Optimize animation performance.

✓ Use reusable animation classes.

✓ Keep transitions smooth.

---

# Don'ts

✗ Do not animate everything.

✗ Do not use unnecessary bounce effects.

✗ Do not delay user interaction.

✗ Do not create page-specific animations.

✗ Do not animate expensive layout properties unnecessarily.

✗ Do not overwhelm users with motion.

✗ Do not sacrifice performance for visual effects.

---

# Approval Requirement

Any new animation pattern, transition, motion effect, or interaction behavior must first be documented within this Design System before implementation.

This document serves as the single source of truth for all motion and animation decisions throughout the Eurasian House ecosystem.

---

# 21. Mobile Design

# 17. Mobile Design

## Purpose

The Mobile Design System defines how the Eurasian House ecosystem adapts to smartphones and small-screen devices.

Mobile users should receive an experience specifically designed for touch interaction rather than a scaled-down desktop interface.

Every mobile screen should feel fast, intuitive, comfortable, and premium.

---

# Mobile Philosophy

The mobile experience should feel:

- Fast
- Comfortable
- Effortless
- Spacious
- Intuitive
- Premium

Mobile is not a secondary platform.

Every feature available on desktop should remain usable on mobile unless there is a compelling usability reason otherwise.

---

# Design Principles

## Mobile First

Every new feature should be designed for mobile before desktop.

Desktop layouts should extend the mobile experience rather than replace it.

---

## Simplicity

Small screens demand simplicity.

Remove unnecessary complexity instead of shrinking it.

---

## Thumb-Friendly Design

Important interactions should be easily reachable using one hand.

Primary actions should remain within comfortable thumb reach whenever possible.

---

## Performance

Mobile users often experience slower networks and less powerful devices.

Performance should always take priority over visual effects.

---

# Responsive Philosophy

Responsive design is not simply resizing components.

Layouts should intelligently reorganize content based on available screen space.

Each breakpoint should provide the best possible experience.

---

# Layout

Mobile layouts should use a single-column structure whenever practical.

Content should stack naturally.

Avoid horizontal scrolling.

---

# Navigation

Navigation should remain simple and accessible.

Navigation should:

- Minimize clutter
- Prioritize important destinations
- Support quick access
- Remain easy to understand

Complex navigation structures should collapse appropriately.

---

# Header

Headers should remain compact.

Only essential actions should remain visible.

Secondary actions may move into menus.

---

# Footer

The footer should remain lightweight.

Large desktop footer layouts should simplify on mobile.

---

# Touch Targets

Every interactive element must remain comfortable to tap.

Touch targets should never feel crowded.

Accidental touches should be minimized through adequate spacing.

---

# Buttons

Buttons should remain easy to tap.

Primary actions may expand to full width where appropriate.

Button labels should remain readable.

---

# Forms

Forms should prioritize quick completion.

Input fields should span available width.

Keyboards should match input type.

Large forms should be divided into logical sections.

---

# Typography

Typography should remain readable on small screens.

Large headings should scale appropriately.

Paragraphs should maintain comfortable reading lengths.

Avoid excessively small text.

---

# Images

Images should remain responsive.

Product images should preserve quality while minimizing download size.

Images should never overflow their containers.

---

# Product Cards

Product cards should prioritize:

Product Image

Title

Price

Rating

Primary Action

Secondary information should remain concise.

---

# Product Pages

Product pages should emphasize:

Images

Price

Variants

Add to Cart

Important information should appear before secondary details.

Long descriptions should remain collapsible where appropriate.

---

# Filters

Filters should remain easy to access.

Filter panels should avoid permanently consuming screen space.

Temporary drawers or bottom sheets are preferred.

---

# Tables

Large tables should adapt gracefully.

Strategies include:

Horizontal scrolling

Stacked layouts

Cards

Collapsible rows

Choose the most usable approach for the content.

---

# Modals

Modals should occupy an appropriate portion of the screen.

Large desktop dialogs should adapt into mobile-friendly layouts.

Users should never feel trapped.

---

# Bottom Sheets

Bottom sheets are preferred for temporary mobile interactions such as:

Filters

Sorting

Sharing

Quick Actions

Selection Lists

Bottom sheets should remain lightweight.

---

# Search

Search should remain immediately accessible.

Suggestions should appear quickly.

Search interactions should require minimal typing.

---

# Checkout

Checkout should minimize user effort.

Support:

Auto Fill

Saved Addresses

Clear Progress

Visible Pricing

Simple Navigation

---

# Loading Experience

Loading should feel responsive.

Skeleton loaders are preferred whenever content structure is known.

Avoid long blank screens.

---

# Gestures

Gestures should complement—not replace—visible controls.

Every gesture should have a discoverable alternative.

Examples:

Swipe

Pull to Refresh

Pinch to Zoom

Drag

Gestures should never hide essential functionality.

---

# Performance

Mobile performance should prioritize:

Fast loading

Low memory usage

Efficient rendering

Optimized images

Minimal JavaScript

Smooth scrolling

Performance is a feature.

---

# Offline Considerations

Where practical, the application should gracefully handle poor or unavailable network connections.

Loading failures should communicate clearly.

---

# Accessibility

Mobile interfaces should support:

Screen readers

Large text settings

Keyboard navigation (where applicable)

Touch accessibility

Visible focus states

Adequate contrast

---

# Animations

Animations should remain subtle.

Reduce motion on lower-powered devices where appropriate.

Animations should never reduce perceived responsiveness.

---

# Battery Efficiency

Avoid unnecessary background processing.

Limit expensive animations.

Reduce excessive rendering.

Efficient applications provide a better mobile experience.

---

# Responsive Breakpoints

The application should support:

- Small Mobile
- Mobile
- Large Mobile
- Tablet
- Laptop
- Desktop
- Large Desktop

Every breakpoint should receive intentional layout adjustments.

---

# Testing Requirements

Every new feature should be tested on:

Portrait Orientation

Landscape Orientation

Small Screens

Large Phones

Tablets

Touch Interaction

Slow Networks

Real devices should be prioritized whenever possible.

---

# CSS Rules

Responsive behavior should rely on reusable utility classes.

Avoid page-specific media queries whenever possible.

Layouts should adapt through the global design system.

---

# Naming Convention

Responsive classes should remain semantic.

Examples:

.mobile-only

.desktop-only

.hide-mobile

.show-mobile

.stack-mobile

.center-mobile

Avoid page-specific responsive classes.

---

# Future Expansion

Future devices including foldables, tablets, and larger mobile displays should integrate into this responsive system without requiring major architectural changes.

---

# Do's

✓ Design mobile-first.

✓ Prioritize touch interaction.

✓ Keep layouts simple.

✓ Optimize performance.

✓ Use responsive images.

✓ Maintain readable typography.

✓ Test on real devices.

✓ Keep primary actions easily accessible.

✓ Support accessibility.

---

# Don'ts

✗ Do not shrink desktop layouts onto mobile.

✗ Do not overcrowd small screens.

✗ Do not rely only on gestures.

✗ Do not use tiny touch targets.

✗ Do not allow horizontal scrolling unnecessarily.

✗ Do not sacrifice performance for animations.

✗ Do not hide essential functionality.

✗ Do not ignore slow network conditions.

---

# Approval Requirement

Any new mobile interaction pattern, responsive layout strategy, gesture, or device-specific behavior must first be documented within this Design System before implementation.

This document serves as the single source of truth for all mobile design decisions throughout the Eurasian House ecosystem.

---

# 22. Accessibility

To be defined.

---

# 23. Performance Guidelines

To be defined.

---

# 24. Coding Standards

General frontend coding standards.

---

# 25. Do's

To be defined.

---

# 26. Don'ts

To be defined.

---

# 27. Future Expansion

Reserved for future additions.

---

# Changelog

Version history of the design system.

# Folder Structure for Styling

src/styles/
│
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── radius.css
│   ├── shadows.css
│   ├── animation.css
│   ├── breakpoints.css
│   └── z-index.css

themes/
├── light.css
├── dark.css
└── system.css

base/
├── reset.css
├── base.css
├── utilities.css
└── globals.css

components/
├── buttons.css
├── cards.css
├── forms.css
├── navbar.css
├── footer.css
├── product-card.css
├── modal.css
├── table.css
├── badge.css
├── chips.css
├── pagination.css
├── breadcrumb.css
└── ...

layout/
├── container.css
├── grid.css
├── sections.css
├── responsive.css
└── page.css

pages/
├── home.css
├── product.css
├── admin.css
└── ...