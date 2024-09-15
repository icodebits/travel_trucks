# Travel Trucks Rental App

This project is a camper rental application where users can browse a catalog of campers, add campers to their favourites list, and manage their selections. The app is built using **React**, **Redux**, and **Redux Toolkit** for state management. Favourites are stored in `localStorage` to persist across page refreshes.

The project is built with **Vite**, a fast build tool that provides a great development experience.

## Features

- Browse a list of available campers.
- Filter campers by location.
- Filter campers by available equipment.
- Filter campers by type.
- Add and remove campers from a favourites list.
- Persist favourites list across page refreshes using `localStorage`.
- Integrated with **ReactDatePicker** for selecting booking dates.
- Utilizes **React Router** for navigation.
- Built with **Redux Toolkit** for state management.

## Prerequisites

Before you can run the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/icodebits/travel_trucks.git
```

### 2. Navigate to the Project Directory
```bash
cd travel_trucks
```

### 3. Install Dependencies
Install the required dependencies using npm:

```bash
npm install
```

### 4. Running the Application
To start the development server with Vite:

```bash
npm run dev
```
This will start the app in development mode. Open your browser and go to:

```bash
http://localhost:5173
```
The page will automatically reload if you make changes to the code.

### 5. Build for Production
To create a production build of the app, run the following command:

```bash
npm run build
```
This will generate a dist folder with optimized static files.

### 6. Preview the Production Build (Optional)
To preview the production build locally, you can run:

```bash
npm run preview
```

This will serve the files from the dist folder on a local server.

## Project Live view at Vercel

To view the project live, navigate to https://travel-trucks-olive.vercel.app/

## Technologies Used

+ **React:** JavaScript library for building user interfaces.
+ **Redux & Redux Toolkit:** State management for handling application state.
+ **React Router:** Declarative routing for React apps.
+ **ReactDatePicker:** Date picker component for React.
+ **localStorage:** To persist user favourites across sessions.
+ **Vite:** Frontend build tool providing fast development and optimized builds.

## License

This project is licensed under the MIT License.