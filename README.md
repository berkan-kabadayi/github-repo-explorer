## 🚀 GitHub Repo Explorer

A modern, responsive React application that allows users to search for GitHub profiles and explore their public repositories. This project demonstrates clean coding practices using TypeScript, React Context API, and Bootstrap.

## ✨ Features

- 🔍 **User Search with Autocomplete**: Real-time search suggestions using the GitHub Search API as you type.
- 📄 **Pagination**: Efficiently browse through repositories with "Next" and "Previous" navigation (6 items per page).
- 🌗 **Dark/Light Mode**: A global theme toggle managed via React Context API and integrated with Bootstrap 5's color modes.
- ⚡ **Performance Optimized**: Implements Debouncing and AbortController to prevent unnecessary API calls and race conditions.
- 📱 **Fully Responsive**: Built with react-bootstrap to ensure a seamless experience across mobile, tablet, and desktop.

## 🛠️ Tech Stack

| Category             | Tools           | Description                                                          |
| -------------------- | --------------- | -------------------------------------------------------------------- |
| **Core Framework**   | React 18        | Functional components with Hooks for a declarative UI.               |
| **Language**         | TypeScript      | Strict type-checking for better developer experience and fewer bugs. |
| **Styling**          | React Bootstrap | Pre-built UI components with Bootstrap 5 styling.                    |
| **State Management** | Context API     | Used for global theme management (Dark/Light mode).                  |
| **Build Tool**       | Vite            | Fast Next-generation frontend tooling for development.               |
| **API**              | GitHub REST API | Fetching real-time user and repository data.                         |

## 📁 Project Structure
```
src/
├── components/     # UI Components (SearchBar, RepoList, RepoItem, Card, ThemeToggle)
├── context/        # ThemeContext and ThemeProvider for global state
├── App.tsx         # Main application logic and data fetching
├── main.tsx        # Entry point
└── App.css         # Custom application styles
```

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
```bash
   git clone https://github.com/berkan-kabadayi/github-repo-explorer.git
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Run the development server:**
```bash
   npm run dev
```