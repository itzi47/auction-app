# Cursor AI Task Checklist: Social Auction App UI/UX & Feature Completion

> A comprehensive high-level task list for Cursor AI to follow. Each task focuses on enhancing the UI/UX dramatically, completing missing features, and integrating version control with a private GitHub repository. Mark each checkbox as tasks are completed.

---

## 1. Version Control & Repository Setup (High-Level)

- [x] **Create a Private GitHub Repository**  
  - Generate a new private repository under `https://github.com/itzi47`.  
  - Name the repository `social-auction-app-uiv2` (or similar).  
  - Add a concise description referencing this checklist.  
  - Add `README.md` with project overview and a link to this checklist file.

- [x] **Initialize Branching and Collaboration Workflow**  
  - Establish a main integration branch (e.g., `main`) and a development branch (`develop`).  
  - Define a high-level branching strategy: feature branches (`feature/<name>`), bugfix branches (`bugfix/<name>`), and merge protocols (pull request reviews).  
  - Add a placeholder for a CI/CD configuration file (e.g., GitHub Actions) to ensure future automated checks.

---

## 2. Global UI/UX Overhaul (100× Improvement)

*Goal: Transform the existing user interface into a modern, visually stunning experience. Emphasize consistency, responsiveness, accessibility, and branding.*

### 2.1 Brand & Design System

- [x] **Define a Unified Color Palette & Typography**  
  - Identify primary, secondary, accent, and neutral colors.  
  - Select two to three fonts (e.g., a headline font and a body font) and specify weights.  
  - Document color variables (hex/RGBA) and typography scales in a shared design tokens file or style guide section.

- [x] **Create a Style Guide Document**  
  - Describe spacing guidelines (padding/margin scales).  
  - Define border radii, shadow sizes, and iconography style.  
  - Outline button styles (primary, secondary, disabled) and form input styles (focus, error, disabled).  

- [ ] **Design Logo & Branding Assets**  
  - Provide a high-resolution logo (light and dark versions).  
  - Create iconography for key actions (bid, comment, wishlist, notifications).  
  - Produce brand banner imagery for homepage header.  

### 2.2 Responsive Layout & Structure

- [x] **Audit Existing Layouts for Responsiveness**  
  - Identify all breakpoints (mobile, tablet, desktop, widescreen).  
  - For each page (homepage, auction detail, profile, etc.), list current layout issues and responsiveness gaps.  

- [x] **Define Grid & Container System**  
  - Establish max-width constraints for desktop, wide, and full-width containers.  
  - Define a 12-column grid for content alignment on desktop, transitioning to fewer columns on smaller screens.  

- [x] **List All Major Pages & Their Responsive Goals**  
  - Homepage / Discover Page: Full-screen hero, stats section, search/filter bar, auctions grid.  
  - Auction Listing Page: Two-column split (image carousel + details), sticky bid panel on desktop, vertical stacking on mobile.  
  - Create Auction Flow: Multi-step wizard with progress indicator.  
  - User Profile Page: Profile header, tabs for auctions / bids / comments, responsive card layout.  
  - Watchlist Page: Grid/list view with filters, responsive to device width.  
  - Messages & Notifications: Sidebar + content area on desktop, toggleable or stacked view on mobile.  

### 2.3 Navigation & Global UI Elements

- [x] **Redesign Global Header / Navbar**  
  - Ensure a clear logo area, global search bar, and key navigation links (Browse, Sell, Watchlist).  
  - Add prominent call-to-action for "Sell" and "Sign In / Profile."  
  - Integrate a notification icon with badge and a user avatar dropdown.  
  - Outline mobile-specific navigation (hamburger menu, slide-in side drawer).

- [x] **Create a Unified Footer**  
  - Include links to About, Contact, Terms, Privacy, Social media icons.  
  - Ensure consistent styling across all pages.  

- [ ] **Establish a Global Breadcrumb Component**  
  - For pages like Auction Detail and Profile, display clickable breadcrumbs (e.g., Home > Category > Auction).  

### 2.4 Visual Components & Animation

- [x] **List Key Reusable Components to Redesign**  
  - **Button**: Primary, Secondary, Danger states; hover/focus animations.  
  - **Card**: Auction preview card, Seller card, Stats card; with shadow/hover effects.  
  - **Form Input**: Text inputs, selects, textareas; error states, validation feedback.  
  - **Modal/Dialog**: Overlay styling, animation in/out, focus trap.  
  - **Tabs**: For Profile sections, Auction details (Description, Comments, Bids).  
  - **Toast/Notification**: Consistent success, error, info alert styles.  

- [x] **Specify Animation Goals**  
  - New bid highlights animate the bid price (flash or pulse).  
  - Smooth transitions when modals open/close and when dropdowns appear.  
  - Page-level fade-in/out or slide transitions when navigating.  

---

## 3. Feature Completion & Functionality Checklist

*Goal: Identify all incomplete or missing features (Sell, Wishlist, Comments, etc.) and define tasks to ensure they are 100% functional with proper UI/UX.*

### 3.1 Sell / Create Auction Workflow

- [ ] **Audit Existing "Sell" Flow**  
  - Verify presence of form steps: Upload Images, Item Details, Auction Terms, Shipping & Payment, Preview.  
  - Identify any missing form validations or incomplete UI elements.  

- [ ] **Define Tasks to Finalize "Create Auction"**  
  - Ensure image upload UI supports preview and reordering.  
  - Ensure form fields have consistent validation styles (error messages, inline prompts).  
  - Confirm "Publish" button is styled and disabled until mandatory fields are valid.  
  - Add final Preview screen with live styling matching auction detail page.

- [ ] **Implement Auction Status Updates**  
  - Add visual cues for "Draft," "Scheduled," "Active," "Ended."  
  - Ensure the Sell flow navigates to a confirmation page after successful submission.

### 3.2 Wishlist / Watchlist Functionality

- [ ] **Audit "Watchlist" UI**  
  - Confirm presence of "Watchlist" page or modal.  
  - Identify missing UI elements (e.g., empty state, remove-from-watchlist icon).

- [ ] **Define Tasks to Complete Watchlist Feature**  
  - Add a "Watch" or "Unwatch" button/icon on each auction card.  
  - On click, visually update button state (e.g., filled/unfilled heart icon).  
  - Build a dedicated Watchlist page: grid of watched auctions with ability to remove or clear watchlist.  
  - Add an empty-state design (e.g., "You have no watched auctions yet. Browse to add some!").

### 3.3 Comments & Q&A Section

- [ ] **Audit Comments Section on Auction Detail**  
  - Verify existing UI for comment list, comment form, and pagination or "Load More."  
  - Identify styling gaps: avatar beside commenter, timestamp display, nested replies (if any).

- [ ] **Define Tasks to Finalize Comments**  
  - Style each comment: commenter avatar, username, timestamp, content container.  
  - Ensure form fields are labeled, have proper placeholder text, and show errors.  
  - Add pagination or infinite scroll if comment count exceeds a threshold.  
  - Include a "No comments yet" placeholder with a call-to-action to be the first to comment.

### 3.4 Bidding & Real-Time Updates

- [ ] **Audit Bidding Panel UI**  
  - Confirm presence of current bid, minimum bid amount, and bid input.  
  - Identify missing accessibility features (e.g., focus states, ARIA labels).

- [ ] **Define Tasks to Polish Bidding Experience**  
  - Style the bid input and "Place Bid" button to match design system.  
  - Add inline validation for bid amounts (e.g., display "Bid must be ≥ $X").  
  - Create a real-time "bid received" visual indicator (flash animation or highlight).  
  - Ensure the countdown timer is visually prominent and shows hours/minutes/seconds.  
  - Design a fallback state if WebSocket is disconnected (e.g., "Live updates unavailable").

### 3.5 User Profile & Reputation

- [ ] **Audit Profile Page Layout**  
  - Verify sections: Profile header (avatar, username, badges), Stats, Active Listings, Past Bids, Reviews.  
  - Identify missing UI elements (e.g., placeholder for missing avatar, empty-state messages).

- [ ] **Define Tasks to Complete Profile Features**  
  - Ensure the user header matches branding (avatar circle with border, username typography).  
  - Add badge icons (e.g., Verified Seller, Top Contributor) next to username.  
  - Style the stats row (Auctions Sold, Bids Placed, Reputation Score) with icons and numbers.  
  - Finalize "Reviews" section: star rating display, reviewer avatar, comment text.  
  - Create an empty-state UI if there are no auctions or bids.  

### 3.6 Search & Filtering

- [ ] **Audit Search Bar & Filters**  
  - Confirm presence of search input, category dropdown, and filter button.  
  - Identify any missing filter options (e.g., price range, time remaining).

- [ ] **Define Tasks to Complete Search UI**  
  - Style the search input with placeholder text and a search icon.  
  - Add clear button ("×") inside the search field to reset input.  
  - Style category dropdown to match design system (rounded corners, hover states).  
  - Create filter modal or dropdown that overlays results: price slider, auction status, seller location.  
  - Add a "Clear Filters" link/button to reset all filters.

### 3.7 Notifications & Messaging

- [ ] **Audit Notifications Dropdown & Page**  
  - Verify presence of bell icon in header, and a dropdown or dedicated page for notifications.  
  - Identify missing visual cues for unread vs. read notifications.

- [ ] **Define Tasks to Finalize Notifications**  
  - Style notification items: icon, title, brief description, timestamp.  
  - Ensure the unread count badge appears over the bell icon.  
  - Create a "Mark All as Read" button, styled per design system.  
  - Add an empty-state UI for no notifications (e.g., "You have no new notifications!").

- [ ] **Audit Messages / Chat UI**  
  - Confirm presence of Messages page or modal with thread list.  
  - Identify missing UI elements: unread badge, input box styling, message bubbles.

- [ ] **Define Tasks to Complete Messaging**  
  - Style message thread list with user avatar, username, and snippet of last message.  
  - For the chat view, style incoming vs. outgoing message bubbles, add timestamp, handle long text.  
  - Ensure the send button is visible and disabled when input is empty.  
  - Add a "New Message" or "Start Conversation" CTA when no threads exist.

---

## 4. Visual Enhancements & Accessibility

*Goal: Improve overall visual polish, animations, accessibility, and consistency across the application.*

### 4.1 Color & Contrast Review

- [ ] **Audit All Text/Background Combinations**  
  - Identify any low-contrast areas (e.g., light gray text on white background).  
  - Create a list of problematic elements and specify updated color pairings.

- [ ] **Define Accessible Color Roles**  
  - Primary buttons/text, Secondary buttons/text, Disabled states, Error states, Informational states.  
  - Document updated hex values in the style guide.

### 4.2 Typography & Spacing Consistency

- [ ] **Audit All Heading & Paragraph Sizes**  
  - Ensure H1, H2, H3, H4, body text, captions have consistent font sizes and line-heights.  
  - List any mismatches (e.g., H2 on Auction Detail is the same size as H3 on Profile).

- [ ] **Create a Spacing Map**  
  - Document standardized spacing: `4px`, `8px`, `16px`, `24px`, `32px` for margins/padding.  
  - Identify areas where custom spacing deviates from this scale.

### 4.3 Iconography & Imagery

- [ ] **Inventory All Icons Used Across the App**  
  - List all icons (search, notifications, user, bid, wishlist, comment).  
  - Identify any missing icons or inconsistent styles (e.g., outlined vs. filled).  

- [ ] **Define Icon Style & Library**  
  - Decide on a single icon set (e.g., Heroicons, FontAwesome) and ensure consistency.  
  - Replace any mismatched/custom PNG icons with SVG from the chosen library.

- [ ] **Image Placeholders & Loading States**  
  - Create a consistent placeholder style for auction images (e.g., blurred gradient or neutral gray).  
  - Add a loading spinner or skeleton placeholder when image assets are loading.

### 4.4 Accessibility Improvements

- [ ] **Keyboard Navigation Audit**  
  - Identify all interactive elements (buttons, links, form fields) and ensure they are focusable (`tabindex`).  
  - List any missing ARIA labels or roles for screen-reader compatibility.  

- [ ] **Contrast & Screen Reader Testing**  
  - Document elements failing WCAG AA contrast ratio.  
  - List tasks to add `aria-label`, `aria-describedby`, and `role` attributes where needed.  
  - Identify complex UI patterns (e.g., modals, custom dropdowns) and ensure proper focus management.

---

## 5. User Experience & Flow Refinements

*Goal: Streamline user journeys, remove friction, and ensure intuitive flows for all core use cases.*

### 5.1 Homepage / Discover Flow

- [ ] **Audit Top Section ("Hero")**  
  - Ensure the banner headline and subtext are impactful and legible.  
  - Confirm that key metrics (Active Users, Live Auctions, Total Bids, Total Value) are updated and visually prioritized.  
  - Identify any misaligned elements or overlapping text on different screen sizes.

- [ ] **Search & Filter Flow**  
  - Document expected behaviors (search suggestions, filter interactions).  
  - Identify missing UX hints, such as placeholder text, input icons, tooltip for filter options.  

- [ ] **Auction Grid Behavior**  
  - Audit hover states, clickable card areas (e.g., entire card navigates to detail).  
  - Confirm that images, titles, bid amounts, and countdowns are visible and hierarchized visually.  

### 5.2 Auction Detail Flow

- [ ] **Audit Bidding Interaction**  
  - List any missing confirmation steps (e.g., "Are you sure you want to place this bid?").  
  - Identify places to add contextual help or tooltips (e.g., what happens when your bid wins).  

- [ ] **Audit Image Carousel Experience**  
  - Verify that touch/swipe gestures (or arrows) allow users to navigate images.  
  - Identify opportunity to add zoom-on-hover or fullscreen image view.

- [ ] **Audit Related Items / Recommendations**  
  - If present, ensure recommendations are visually consistent with auction cards.  
  - If missing, document it as a potential future enhancement (e.g., "Customers also liked…").

### 5.3 Profile & Social Engagement Flow

- [ ] **Audit Follow / Unfollow Interaction**  
  - Verify the follow button changes state and provides feedback (e.g., "Following" vs. "Follow").  
  - Identify missing confirmation or notification to the profile owner when someone follows.

- [ ] **Audit Review & Feedback Flow**  
  - Confirm that users can leave a rating and review after winning an auction.  
  - Identify UI gaps: star rating input, review text area, "Submit" button disabled state if empty.

### 5.4 Sell Flow & Confirmation

- [ ] **Audit "Create Auction" Flow End-to-End**  
  - List any missing steps or unclear labels that could confuse a first-time seller.  
  - Identify missing confirmation screens or success states after auction creation.

- [ ] **Audit Seller Dashboard**  
  - Confirm that sellers can see their active, scheduled, and completed auctions.  
  - Identify missing UI for editing or canceling a listing.

---

## 6. Project & Task Documentation

*Ensure that Cursor AI has a clear reference at every step. Provide context without implementation specifics.*

### 6.1 Checklist Integration & Tracking

- [ ] **Integrate This Checklist into Project Documentation**  
  - Add a direct link to this `UI_UX_Checklist.md` in the repository README.  
  - Encourage each task to be checked off in pull requests and commits.  

- [ ] **Create a High-Level Roadmap**  
  - Summarize major milestones:  
    1. Version Control Setup  
    2. Global Design System & Branding  
    3. Responsive Layout Implementation  
    4. UI Component Redesign  
    5. Feature Completion (Sell, Watchlist, Comments)  
    6. Visual Polish & Accessibility  
    7. User Journey Refinements  

- [ ] **Define Review & Approval Process**  
  - For each completed feature or UI enhancement, include a screenshot or video demo.  
  - Establish criteria for "UI Complete" (e.g., passes responsive QA, accessibility checks, visual consistency).  

---

> **End of Checklist**  
