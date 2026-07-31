# Rick and Morty Character Explorer

A small, responsive React app for searching [Rick and Morty](https://rickandmortyapi.com/)
characters, viewing their details and episode list, and saving favourites —
built with Vite and the public Rick and Morty API.

## Features

- **Search** characters by name (live results from the API, 3+ characters).
- **Character detail** panel with status, species, last known location, and
  the episodes they appear in (sortable earliest/latest).
- **Favourites** list, persisted in `localStorage`, with a dedicated modal.
- **Light/dark theme**, following your OS preference by default and
  remembering your choice once you toggle it manually.
- **Mobile-first & responsive**: on small screens the character list and
  detail panel are separate views you navigate between; from tablet width up
  they're shown side by side.
- **Accessible**: every icon-only control has an accessible name, the
  favourites dialog supports Escape-to-close and focus management, and all
  interactive elements have a visible keyboard focus ring.

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) for API requests
- [MUI](https://mui.com/) (`CircularProgress`) and
  [Heroicons](https://heroicons.com/) for a couple of UI primitives/icons
- [react-hot-toast](https://react-hot-toast.com/) for error toasts
- Plain CSS with theme-aware custom properties (no CSS framework)
- [ESLint](https://eslint.org/) for linting

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173).

## Available scripts

| Command            | Description                           |
| ------------------ | -------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload   |
| `npm run build`     | Build a production bundle into `dist/` |
| `npm run preview`   | Serve the production build locally     |
| `npm run lint`      | Run ESLint (zero warnings allowed)     |


## Data source

Character, episode, and location data comes live from the free
[Rick and Morty API](https://rickandmortyapi.com/) — no API key required, no
data is stored server-side. Favourites are stored only in your browser's
`localStorage`.

## License

This project is for personal/educational use. Rick and Morty character data
and imagery are property of their respective owners; this app is an unofficial
fan project and is not affiliated with or endorsed by Adult Swim.
