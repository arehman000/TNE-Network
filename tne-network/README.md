# The Network Effect - Marketing Website

A premium, static HTML/CSS/JS website for The Network Effect (powered by Channel Dynamics). Built to be extremely fast, robust, and handoff-friendly.

## Architecture & Structure
The website avoids frameworks like React to rely on native browser APIs, ensuring zero build steps are required.

- `/index.html` - Homepage
- `/experts.html` - For Experts
- `/clients.html` - For Clients
- `/research.html` - Research details
- `/sectors.html` - Industries covered
- `/compliance.html` - Compliance framework
- `/about.html` - Mission & background
- `/assets/css/global.css` - Single source of truth for the entire design system styling.
- `/assets/js/main.js` - Lightweight client interactions.

## How to Run Locally
Because this is a vanilla static site, there is no `npm run dev` required. 
Simply open `index.html` in your web browser, or use a local development server like Live Server (VSCode extension) or `npx http-server` for the best experience.

## Editing Content
All content is hardcoded in the respective HTML files according to the editorial structure.
- **Modifying text**: Open the relevant `.html` file and edit the text enclosed in tags (e.g. `<h2>`, `<p>`).
- **Modifying metrics**: Metrics on the Homepage are located inside `index.html` inside the "Proof / Metrics Band" section.
- **Design System changes**: Colors, typography scales, and padding can be altered globally by changing variables inside `:root` block in `global.css`.

## Future Proofing
Class names are strict and maintainable (e.g. `.section`, `.container`, `.surface`, `.btn-primary`). If you decide to migrate to React or another framework, these HTML structures can be copied directly into JSX components with minimal modifications (`class` -> `className`).
