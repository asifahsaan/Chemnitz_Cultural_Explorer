# Chemnitz Cultural Explorer

A full-stack MERN application that displays cultural sites in Chemnitz on an interactive map. Users can register, log in, explore locations, filter and search for sites, and manage their personal favorites.

---

## Overview

Chemnitz Cultural Explorer lets visitors discover cultural points of interest—such as museums, galleries, restaurants, and historical landmarks—by browsing a Leaflet-powered map. Registered users can log in to save their favorite locations, view only favorited sites, and search for specific places by name or address.

---

## Features

### Interactive Map
- Markers show cultural sites with details (name, category, address, website link, wheelchair access).  
- Clicking a marker displays full information in a popup.

### Filter & Search
- Dropdown filter by category (e.g., museum, gallery, restaurant).  
- Search bar to find sites by name or address.

### User Authentication
- Registration and login using email and password.  
- JSON Web Tokens (JWT) for secure API access.

### Favorites Management
- Logged-in users can “heart” or “unheart” any site.  
- Favorites are stored in the database and persist across sessions.  
- A toggle option shows only favorite sites on the map.

### Responsive Design
- Styled with Tailwind CSS for a clean, mobile-friendly interface.

---

## Technology Stack

- **Frontend**: React, React-Leaflet, Tailwind CSS  
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt  
- **Map Tiles**: OpenStreetMap via Leaflet  
- **Deployment**: Backend on Render, Frontend on Netlify

---

## Folder Structure

mapProject/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── scripts/
│ ├── server.js
│ └── .env.example
├── frontend/
│ ├── public/
│ └── src/
│ ├── App.js
│ ├── index.js
│ └── index.css
└── README.md


**backend/**  
- Contains Express server code, API routes, controllers, data models, and import scripts.  
- Includes `.env.example` configuration for MongoDB connection and JWT secret.

**frontend/**  
- Contains React app code with components, styles, and configuration.  
- Includes map integration, login/register forms, and favorite-management logic.

---

## Setup Instructions

1. **Clone the Repository**  
   - Copy the project from GitHub to your local machine.

2. **Backend Configuration**  
   - Navigate into the `backend/` folder.  
   - Install dependencies: `npm install`  
   - Create a `.env` file based on the provided example (`.env.example`), filling in your MongoDB connection string and JWT secret.  
   - Run the import script to load GeoJSON data of cultural sites into MongoDB:  
     ```
     node scripts/importGeoJSON.js
     ```  
   - Start the Express server:  
     ```
     npm start
     ```

3. **Frontend Configuration**  
   - Switch to the `frontend/` folder.  
   - Install dependencies: `npm install`  
   - Start the React development server: `npm start`  
   - Open a browser at `http://localhost:3000` to view the app.

4. **Register & Login**  
   - Create a new user account via the registration form.  
   - Log in to begin saving favorite sites and using the full functionality of the map.

5. **Using the Map**  
   - Filter by category using the dropdown at the top.  
   - Search by name or address in the search field.  
   - Click any marker to view detailed information about that site.  
   - When logged in, click the heart icon in the popup to add or remove a site from your favorites.  
   - Toggle “Show Only Favorites” to display only the sites you’ve favorited.

---

## API Overview

- **Fetch All Sites**  
  Retrieve a list of all cultural sites, with optional `category` or `search` query parameters.

- **User Registration**  
  Create a new user account using email and password.

- **User Login**  
  Authenticate and receive a JWT for secured routes.

- **Get Favorites** (Protected)  
  Retrieve the current user’s favorite sites.

- **Add to Favorites** (Protected)  
  Mark a site as favorite.

- **Remove from Favorites** (Protected)  
  Unmark a site as favorite.

---

## Deployment

### Backend (Express & MongoDB)
- Deploy on Render by connecting your GitHub repository.  
- Configure build and start commands, and set environment variables (`MONGO_URI`, `JWT_SECRET`).  
- Once deployed, the Express API will be accessible via a Render URL.

### Frontend (React & Tailwind)
- Deploy on Netlify by linking the frontend folder to your GitHub repository.  
- Configure the build command and set the publish directory to the build output.  
- Optionally set an environment variable (`REACT_APP_API_URL`) so the React app calls your Render backend.

---

## Contribution Guidelines

Contributions are welcome! To contribute:
1. Fork the repository.  
2. Create a feature branch (e.g., `feature/new-feature`).  
3. Commit your changes with clear messages.  
4. Push to your fork and open a pull request.

Please follow the existing code style and ensure any new functionality is well documented.

---

## License

This project is licensed under the MIT License.
