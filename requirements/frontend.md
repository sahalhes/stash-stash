# Stash Stash Frontend Development (Web - Next.js)

## Project Overview
Stash Stash is a platform designed to store and share personal content, inspired by Deepstash. The web version is built using **Next.js**, providing a clean and responsive design for the user interface. The MVP will include user authentication, content creation, and social features, with a focus on usability and cross-device compatibility.

## Feature Requirements
- We will use nextjs , shadcn , supabase , lucid, clerk
### Core Features:
1. **User Authentication**  
   - Sign-up and login flow.  
   - Profile management.

2. **Content Creation & Management**  
   - Users can create, edit, and delete content (stashes).  
   - Support for rich-text editor or markdown input.

3. **Search & Filters**  
   - Search functionality for stashes.  
   - Filters based on categories or tags.

4. **Social Features**  
   - Users can like, bookmark, and share stashes.  
   - Collaboration features (e.g., commenting or shared stashes).

5. **Responsive UI**  
   - Cross-platform compatibility (Mobile + Web).  
   - Clean and minimal design with a focus on user experience.

## Relevant Documentation

### Web (Next.js) Documentation:
- [Next.js Documentation](https://nextjs.org/docs): Comprehensive docs for setting up, routing, and deploying Next.js apps.  
- [ShadCN Components](https://github.com/shadcn): Styling and component library used in the project for consistent UI elements.

### Authentication & Backend:
- [NextAuth.js Documentation](https://next-auth.js.org/): For handling authentication on the web platform.

## Current File Structure
STASH-STASH/
├── .next/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/
│       ├── ui/
│       │   ├── alert.tsx
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   ├── dialog.tsx
│       │   ├── dropdown-menu.tsx
│       │   ├── form.tsx
│       │   ├── input.tsx
│       │   ├── label.tsx
│       │   ├── tabs.tsx
│       │   ├── textarea.tsx
│       │   └── tooltip.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
├── node_modules/
├── public/
├── requirements/
│   └── frontend.md
├── .env.local
├── .gitignore
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md

# Rules
- All new components should be added to the components folder and named like example-component.tsx unless otherwise specified
- All new pages should be added to the app folder that is /app

