# DART Bus Ticket App

A modern bus ticket application for Detroit Area Regional Transportation (DART). This app allows users to purchase and activate 24-hour transit passes.

## Features

- **24-Hour Pass**: Valid for 24 hours from activation
- **Real-time Countdown**: Shows remaining time on activated tickets
- **Modern UI**: Clean, mobile-friendly interface with Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React 18**: Modern React with TypeScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Date-fns**: Modern date utility library

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bus-ticket-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Activate Ticket**: Click the "Activate Ticket" button to start your 24-hour pass
2. **View Status**: See if your ticket is active or expired
3. **Time Remaining**: Monitor how much time is left on your ticket
4. **Reset**: Use the reset button to deactivate and reset the ticket

## App Structure

```
src/
├── components/
│   └── TicketDisplay.tsx    # Main ticket component
├── App.tsx                  # Main app component
├── App.css                  # App-specific styles
├── index.css                # Global styles and Tailwind imports
└── main.tsx                 # App entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).