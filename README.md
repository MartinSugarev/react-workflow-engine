React Workflow Engine

This repository contains solutions for several React tasks using React with Webpack. Each task is developed in a separate branch to keep the solutions isolated and organized.

Project Setup:

Clone the repository: git clone https://github.com/MartinSugarev/react-workflow-engine.git and cd react-workflow-engine

Install dependencies: npm install

Start the development server: npm run dev

The project uses Webpack as the bundler. React and ReactDOM are installed for building the UI. TypeScript is used with proper typing. TailwindCSS is configured for styling with PostCSS.

Branching Strategy:
Each task is developed in its own branch:

task-list-of-claims – Practice working with a list of insurance claims, including filtering, sorting, and updating statuses.

task-use-fetch – Practice fetching data from APIs using React hooks (useEffect, useState).

task-wizard-context – Practice building a multi-step form (wizard) using React context for state management.

Tasks:

List of Claims: Display a table or card layout of insurance claims, implement filtering by claim type and status, implement sorting by claim amount and date submitted, allow status updates in the UI, show summary statistics (total claims, total amount, count per status).

useFetch: Build a reusable custom React hook called `useFetch` that handles data fetching with loading and error states. This hook should be usable across multiple components and provide a clean API for fetching data.

Wizard Context Task: Build a multi-step wizard component using React Context API with optimized rendering performance. The wizard should support dynamic navigation flows, form data persistence across steps, and validation.

Project Structure:
react-workflow-engine/
├─ public/
│  ├─ index.html        # Main HTML file
│  └─ claims.json       # Mock data for claims
├─ src/
│  ├─ components/       # Reusable React components
│  ├─ hooks/            # Custom React hooks
│  ├─ pages/            # Page-level components
│  ├─ services/         # API or data-fetching services
│  ├─ types/            # TypeScript interfaces and types
│  ├─ App.tsx           # Main React component
│  ├─ global.css        # Global CSS including Tailwind imports
│  └─ index.tsx         # Entry point
├─ package.json
├─ webpack.config.js
├─ postcss.config.js
├─ tailwind.config.js
└─ tsconfig.json

Notes:
The project is configured with Webpack 5 and Babel for transpiling modern JS, JSX, and TypeScript. Styling is done using TailwindCSS with PostCSS. Each task is self-contained in its branch so you can switch branches to see different solutions. No external state management libraries are used; React state and context are sufficient.

Running a Task:

Switch to the branch: git checkout task-list-of-claims

Start the dev server: npm run dev

Open http://localhost:3000 in your browser.

This README gives an overview of how the project is structured, how to run it, and what each branch/task does.