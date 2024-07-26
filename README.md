# Perfect Gift Web App 🎁

## Overview

The Perfect Gift web application is designed to help users find the perfect gift by taking a short personality quiz and providing a unique list of curated gift ideas. The application is built using React for the frontend and Node.js for the backend, with Firebase for authentication and Firestore for the database.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Features](#features)
- [Acknowledgements](#Acknowledgements)
- [Useful Links](#Useful-Links)

## Getting Started

To get started with the Perfect Gift web app, clone the repository and follow the steps below.

### Prerequisites

- Node.js and npm installed on your local machine.
- Firebase account for authentication and database.
- MongoDB account for backend database.
- Google Generative AI API key for gift recommendations.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/perfect-gift.git
   cd perfect-gift
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd Frontend/my-app
   npm install
   cd ../../Backend
   npm install
   ```

## Available Scripts

### Backend

In the `Backend` directory, you can run:

#### `npm start`

Runs the backend server in the development mode. Open [http://localhost:5001](http://localhost:5001) to view it in your browser.

#### `npm test`

Launches the test runner for backend tests.

### Frontend

In the `Frontend/my-app` directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`

Launches the test runner for frontend tests.

#### `npm run build`

Builds the app for production to the `build` folder.

## Project Structure

### Backend

```
Backend/
|-- config/
|   |-- firebaseAdmin.js
|-- routes/
|   |-- giftsRoute.js
|-- .env
|-- server.js
|-- package.json
|-- ...
```

### Frontend

```
Frontend/my-app/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- NavBar.js
|   |   |-- FavoritesGrid.js
|   |   |-- ...
|   |-- pages/
|   |   |-- HomePage.js
|   |   |-- LoginSignup.js
|   |   |-- Dashboard.js
|   |-- config/
|   |   |-- firebaseConfig.js
|   |-- App.js
|   |-- index.js
|   |-- ...
|-- public/
|-- .env
|-- package.json
|-- ...
```

## Backend Setup

1. Create a `.env` file in the `Backend` directory and add your environment variables:

   ```env
   PORT=5001
   MONGO_URI=your-mongodb-uri
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   GEMINI_API_KEY=your-google-generative-ai-api-key
   ```

2. Start the backend server:

   ```bash
   cd Backend
   npm start
   ```

## Frontend Setup

1. Create a `.env` file in the `Frontend/my-app` directory and add your environment variables:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
   ```

2. Start the frontend development server:

   ```bash
   cd Frontend/my-app
   npm start
   ```

## Deployment

### Backend

To deploy the backend server, you can use services like Heroku, AWS, or Google Cloud.

### Frontend

To deploy the frontend application, you can use services like Vercel, Netlify, or GitHub Pages.

## Screenshots
![Screenshot 2024-07-25 205125](https://github.com/user-attachments/assets/c65b4d9b-cd06-4aca-b016-c7e4b79fbb5a)
![Screenshot 2024-07-25 205133](https://github.com/user-attachments/assets/e267196f-ca31-46d2-b62f-38dc985006fe)
![Screenshot 2024-07-25 205202](https://github.com/user-attachments/assets/8a1fa9ba-1207-40a0-a862-6c5c8b555ded)
![Screenshot 2024-07-25 205214](https://github.com/user-attachments/assets/03888e82-d622-4fd1-9935-e7a4d10d5417)
![Screenshot 2024-07-25 205223](https://github.com/user-attachments/assets/da8a72dc-cbf2-48df-93d0-c7ecaffa0d80)

## Features

- **User Authentication**: Secure user registration and login using Firebase Authentication.
- **Personalized Gift Recommendations**: Tailored gift suggestions based on user inputs and preferences.
- **Favorites Management**: Users can save their favorite gifts and view them on their dashboard.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Interactive UI**: Smooth animations and transitions for a seamless user experience.

## Acknowledgments

- **React**: [React Documentation](https://reactjs.org/)
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **MongoDB**: [MongoDB Documentation](https://docs.mongodb.com/)
- **Google Generative AI**: [Google AI Documentation](https://developers.google.com/ai)

### Useful Links

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---
