# React Theme Switcher and Task Manager

This project is a guided React learning activity demonstrating:

- `useContext` for global light/dark theme state.
- `useReducer` for adding and removing tasks.
- TypeScript with React and Vite.

## Requirements

- Node.js and npm
- React
- TypeScript
- Vite

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in a browser.

The project also includes these validation commands:

```bash
npm run build
npm run lint
```

## Project Structure

```text
src/
  App.tsx                         App shell and ThemeProvider wiring
  main.tsx                        React entry point
  constants/theme.ts              Light and dark theme constants
  context/ThemeContext.tsx        ThemeProvider and useTheme hook
  components/Navbar.tsx           Theme toggle navigation
  components/Navbar.module.css    Navbar styles
  components/TaskManager.tsx      Task input, list, and remove actions
  components/TaskManager.module.css
                                  Task manager theme styles
  reducers/taskReducer.ts         Add and remove task state transitions
```

## How It Works

`ThemeProvider` wraps the application in `App.tsx`. `Navbar` calls `useTheme()` to
toggle the shared theme, while `TaskManager` reads the same theme to update its
appearance.

`TaskManager` stores its task list with `useReducer`. Adding a task dispatches an
`add` action, and removing a task dispatches a `remove` action. Empty or
whitespace-only tasks cannot be added.

## Color Palette

| Theme | Background | Text | Button |
| --- | --- | --- | --- |
| Light | `#FFFFFF` | `#000000` | `#1E90FF` |
| Dark | `#242629` | `#FFFFFF` | `#85D1B0` |

The palette is applied in the active CSS files and is controlled by the theme
context rather than the operating system color preference.
