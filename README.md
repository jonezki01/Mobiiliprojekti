# Mobiiliprojekti

A mobile application developed using React Native, integrating Firebase for backend services.
This project is a fork of [TVT23KMO-R14-MOBIILIKEHITYSPROJEKTI/Mobiiliprojekti](https://github.com/TVT23KMO-R14-MOBIILIKEHITYSPROJEKTI/Mobiiliprojekti).

## Features

* **User Authentication**: Secure login and registration using Firebase Authentication.
* **Real-time Database**: Data storage and retrieval using Firebase Firestore.
* **Modular Architecture**: Organized codebase with reusable components and hooks.
* **Custom Styling**: Consistent UI design with centralized styling.
* **CI/CD Integration**: Automated builds and deployments using Codemagic.

## Project Structure

```
assets/           # Static assets like images and fonts
components/       # Reusable UI components
firestore/        # Firebase Firestore configuration and queries
helper/           # Utility functions and helpers
hooks/            # Custom React hooks
screens/          # Application screens and navigation
styles/           # Global and component-specific styles
support-files/    # Additional support files and configurations
App.js            # Root component
app.json          # App configuration
codemagic.yaml    # CI/CD pipeline configuration
index.js          # Entry point
```

## Getting Started

### Prerequisites

* Node.js and npm
* Expo CLI or React Native CLI
* Firebase project setup

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/jonezki01/Mobiiliprojekti.git
cd Mobiiliprojekti
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Firebase:**

Set up your Firebase project and replace the configuration in `firestore/` with your project's credentials.

4. **Run the application:**

```bash
npm start
```

### 💱 Currency Converter

    Check real-time exchange rates between different countries

Currency converter demo

<img src="/assets/currency.gif" width="200" />

### 🌤️ Weather Service

    See the current weather and temperature based on your location

Weather app demo

<img src="/assets/weather.gif" width="200" />

### 🌙 Dark Mode

    Available in dark mode to reduce eye strain

Dark mode demo

<img src="/assets/darkmode.gif" width="200" />

## Technologies Used

* **React Native** – for building the mobile application
* **Firebase** – for backend services like auth and database
* **Codemagic** – for continuous integration and deployment
