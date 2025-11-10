# Rick and Morty Character Explorer ( Elfsight Test Task )

A React application that allows users to explore characters from the Rick and Morty series with filtering and pagination capabilities.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elfsight-test-task
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:
```bash
npm start
```
The application will open in your default browser at `http://localhost:3000`.

## Features

- Character grid with detailed information
- Filter characters by:
  - Status (Alive, Dead, Unknown)
  - Gender (Male, Female, Genderless, Unknown)
  - Species
  - Name
  - Type
- Pagination support
- Responsive design
- URL state management for filters

## Project Structure

```
src/
  ├── assets/          # Static assets like images and icons
  ├── components/      # React components
  │   ├── card/       # Character card components
  │   ├── common/     # Shared components (Loader, Text)
  │   ├── filters/    # Filter components
  │   ├── header/     # Header components
  │   ├── popup/      # Popup components
  │   └── providers/  # Context providers
  ├── hooks/          # Custom React hooks
  ├── App.js          # Root component
  └── index.js        # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run lint` - Lints and formats the code

## Technologies Used

- React
- Styled Components
- Rick and Morty API
