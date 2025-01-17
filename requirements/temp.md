# Project: Stash Stash - Web Onboarding and Main Page Design

## Requirements
1. **Onboarding Design**
   - Create a seamless, engaging onboarding flow for new users.
   - Clearly explain the value of the platform (e.g., discover and save ideas easily).
   - Include interactive elements or animations to guide users through the key features.

2. **Main Page for Non-Logged-In Users**
   - Design a page similar to [Deepstash.com](https://deepstash.com), emphasizing:
     - A clean and modern layout.
     - Clear CTAs for sign-up and login.
     - Highlights of the platform's features (e.g., saving ideas, personal feed, sharing capabilities).
   - Use modular components for better reusability.

3. **Logged-In User Experience**
   - Redirect logged-in users to `/feed` (their personalized home page).
   - On `/feed`, show:
     - User's saved stashes in a grid or list view.
     - Recommendations for new stashes based on user preferences.

4. **Responsive Design**
   - Ensure the pages work seamlessly across devices (desktop, tablet, mobile).

## Implementation Steps


### Key Features
#### 1. Onboarding
- A modal or full-page onboarding flow:
  - Step 1: Welcome screen with a short intro to Stash Stash.
  - Step 2: Interactive guide highlighting features (e.g., save ideas, share, discover).
  - Step 3: Prompt to sign up or log in.

#### 2. Main Page (Non-Logged-In)
- Hero section with a prominent tagline (e.g., "Discover, Save, and Share Ideas").
- Sections showcasing:
  - Benefits of using Stash Stash.
  - Testimonials or user stories.
  - How it works (e.g., Create → Save → Share).
- Call-to-action buttons: "Sign Up" and "Log In."

#### 3. Logged-In Feed Page
- Header: Include a search bar, profile dropdown, and navigation links.
- Main content:
  - User's saved stashes.
  - Recommendations (e.g., "You might like these stashes").
- Footer: Quick links and contact information.

#### 4. Authentication
- Use NextAuth.js for web-based authentication.
- Redirect to `/feed` after successful login.

---

## Sample Code Outline
### OnboardingModal.tsx
```tsx
import React from 'react';

const OnboardingModal = () => {
  return (
    <div className="onboarding-modal">
      <h1>Welcome to Stash Stash!</h1>
      <p>Discover and save ideas that matter to you.</p>
      <button>Get Started</button>
    </div>
  );
};

export default OnboardingModal;
