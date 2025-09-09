# Dashboard Widget Management System

A React-based dashboard application for managing widgets with dynamic add/remove functionality and search capabilities.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Widget-Dash-Board
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the application
```bash
npm run dev or npm start
```

The app will open automatically at `http://localhost:5173`

## Project Structure

```
src/
  components/
    Dashboard/Dashboard.js
    Widget/Widget.js
    AddWidget/AddWidget.js
    Search/Search.js
    WidgetSidebar/WidgetSidebar.js
  context/DashboardContext.js
  data/dashboardData.json
  App.js
  index.js
  index.css
```

## How to Use

1. View widgets on the main dashboard
2. Use search bar to find specific widgets
3. Click "Manage Widgets" to open sidebar
4. Check/uncheck widgets to show/hide them
5. Click "+" to add new widgets
6. Click trash icon to delete widgets



**Installation issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Tech Stack

- React.js
- Tailwind CSS
- React Context API
