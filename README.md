# HireHub
Frontend-only recruitment platform (React + React Router + Lucide, localStorage persistence).

    npm install
    npm run dev      # http://localhost:5173
    npm run build && npm run preview

Images live in src/assets/images and are wired in src/data/images.js — replace the files or imports to swap photography.
Role switching (Candidate/Recruiter) is a demo toggle, not authentication. Use "Reset demo data" in the dashboard sidebar to restore seed data.
For deployment, configure SPA fallback to index.html so direct routes work after refresh.
