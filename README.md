# React Native Restaurant Finder App

This project is a **React Native App** built using **Expo**. It uses **Firebase Authentication** for user authentication and the **Google Maps API** to locate restaurants near the user's current location.

## Features
- **Firebase Authentication**: Secure user signup, login, and logout.
- **Google Maps Integration**: Displays nearby restaurants based on the user's location.
- **Expo Location Services**: Utilizes the phone's GPS to determine the user's position.

---

## Getting Started

### Prerequisites
- Node.js installed on your system.
- Firebase account for authentication setup.
- Google Maps API Key for location services.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
2. Install Dependencies:
   ```bash
   npm install
3. Add your Google Maps API Key:
    > Open the HomeScreen.js file.
    > Replace '' with your Google API key:
    ```bash
      const GOOGLE_API_KEY = '<your-google-maps-api-key>';
4. Configure Firebase:
    > Open the firebase.config.js file.
    > Add your Firebase configuration:
    ```bash
    const firebaseConfig = {
    apiKey: "<your-api-key>",
    authDomain: "<your-auth-domain>",
    projectId: "<your-project-id>",
    storageBucket: "<your-storage-bucket>",
    messagingSenderId: "<your-messaging-sender-id>",
    appId: "<your-app-id>"
    };
5. Start the Expo server:
   ```bash
   npx expo start


## Dependencies
- - **Expo**
- - **React Native**
- - **Firebase**
- - **React Native Maps**
- - **Firebase Authentication**


