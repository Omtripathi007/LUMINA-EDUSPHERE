# Student Learning Dashboard

A modern student learning dashboard built with Next.js 15 App Router. This project serves as a practical showcase of balancing highly interactive frontend elements with server-side data fetching and rendering.

## Architecture Choices

### Next.js App Router
I chose the Next.js App Router to take full advantage of React Server Components (RSC). This architecture allows us to keep the heavy lifting (like data fetching and database connections) securely on the server, while shipping significantly less JavaScript to the client. 

### Server vs. Client Component Split
One of the primary goals during development was finding the right balance and clean boundaries between Server and Client Components:
- **Server Components (Default):** Pages like the main dashboard (`app/(dashboard)/dashboard/page.tsx`) and data fetchers (`courses-grid.tsx`) are strictly Server Components. They directly query the database via Supabase, bypassing the need for a separate API layer or client-side `useEffect` fetch calls. This results in faster initial loads and a much simpler mental model for data flow.
- **Client Components (`'use client'`):** I pushed the `'use client'` directives as far down the component tree as possible. Interactive pieces like the `CourseCard` (which relies on Framer Motion for complex hover animations), the `ActivityTile` (for mouse-tracking tooltips), and the `Sidebar` (for active route highlighting based on the current pathname) are Client Components. This ensures the interactivity is isolated and doesn't force the whole page to become a client component.
- **Suspense & Streaming:** To improve perceived performance, the dashboard wraps the `CoursesGrid` in a React `<Suspense>` boundary. The static shell of the dashboard (the hero and activity tiles) renders instantly, while the courses stream in asynchronously once the database query resolves.

### Data Layer
I'm using Supabase for the backend. I centralized the mock data and data-fetching logic so that during local development without environment variables, the app gracefully falls back to mock data instead of throwing errors or crashing. This makes cloning and running the project locally completely frictionless.

## Challenges Faced

1. **Hydration Mismatches with Dates:** Handling dynamic dates in the `ActivityTile` (for the GitHub-style contribution graph) initially caused hydration warnings because the server-rendered dates and the client-rendered dates didn't perfectly align. Moving the mock data generation out of the component and strictly controlling the generation logic in a centralized utility file helped stabilize this.
2. **Framer Motion and RSC boundaries:** Framer Motion strictly requires Client Components for layout animations and gestures. Initially, there was a temptation to make entire pages Client Components to easily animate them. I had to refactor the structure to isolate the animations into smaller, dedicated client wrapper components (e.g., `courses-list.tsx` wrapping the mapped cards) so the parent layout could remain a Server Component.
3. **Mock Data Leakage:** Earlier iterations of the codebase had mock data heavily coupled with the component logic and server fetches, making the files bloated and hard to read. Extracting this into a dedicated `lib/mock-data.ts` file significantly cleaned up the UI components and established a much cleaner boundary between the view layer and the data models.

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env.local` and add your Supabase keys.
   *(Note: If you don't add keys, the app will automatically simulate network latency and fall back to mock data, so you can still run and develop it locally without a DB).*

3. **Run the dev server:**
   ```bash
   npm run dev
   ```
