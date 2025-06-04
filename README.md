# Chemnitz Cultural Explorer

A full-stack MERN application that displays cultural sites in Chemnitz on an interactive map. Users can register, log in, explore locations, filter and search for sites, and manage their personal favorites.

---

## Overview

Chemnitz Cultural Explorer lets visitors discover cultural points of interest—such as museums, galleries, restaurants, and historical landmarks—by browsing a Leaflet-powered map. Registered users can log in to save their favorite locations, view only favorited sites, and search for specific places by name or address.

---

## Features

- **Interactive Map Display**  
  - Leaflet-based map showing all cultural locations (museums, galleries, restaurants, historical landmarks, etc.).  
  - Clicking a marker opens a popup with details:  
    - Name  
    - Category  
    - Address  
    - Website link (if available)  
    - Wheelchair accessibility status  

- **Filter & Search Functionality**  
  - **Category Filter**: Dropdown to select categories (e.g., museum, gallery, restaurant, hotel).  
  - **Search Bar**: Type a name or address fragment to display matching sites in real time.  

- **User Authentication (JWT)**  
  - **Registration & Login**: Create an account with email and password.  
  - **Secure API Access**: JSON Web Tokens (JWT) issued upon login, required for protected routes.  
  - **Logout Button**: Clears token and resets favorites.  

- **Favorites Management**  
  - **Add/Remove Favorites**: While logged in, click the heart icon in a marker’s popup to save or remove that site.  
  - **Persisted Favorites**: Favorited site IDs are stored in MongoDB under each user.  
  - **“Show Only Favorites” Toggle**: A checkbox filters the map to display only your favorited sites.  

- **Responsive UI with Tailwind CSS**  
  - Clean, mobile-friendly design.  
  - Tailwind utility classes used for consistent spacing, typography, and form inputs.  

## How It Works

1. **Initial Setup**  
   - On first run, the backend imports a provided `Chemnitz.geojson` file containing coordinates and properties for all cultural sites.  
   - Each site document includes name, category, address, website, wheelchair info, and a geospatial Point.  

2. **API Structure (Express + MongoDB)**  
   - **Unprotected Routes**:  
     - `GET /api/sites` — Fetch all sites, with optional `?category=` or `?search=` query parameters.  
     - `GET /api/sites?category=museum&search=park` — Combined filtering by category and search.  
   - **Authentication Routes**:  
     - `POST /api/users/register` — Register a new user (requires unique email).  
     - `POST /api/users/login` — Log in with email/password; returns `{ token }`.  
   - **Protected Favorite Routes (JWT required)**:  
     - `GET /api/users/favorites` — Return an array of full site objects that the user favorited.  
     - `POST /api/users/favorites/:siteId` — Add a site to the user’s favorites.  
     - `DELETE /api/users/favorites/:siteId` — Remove a site from the user’s favorites.  

3. **Frontend Interaction (React + React-Leaflet)**  
   - **MapContainer & Markers**: Fetches `/api/sites`, displays markers at each site’s coordinates.  
   - **Popup Content**: Each marker’s popup shows name, category, address, website link, wheelchair info, and (when logged in) a heart icon to toggle favorites.  
   - **State Management**:  
     - `sites` holds the array of all fetched site objects.  
     - `category` and `search` track filter inputs to re-fetch from the API.  
     - `token` stores the JWT from `localStorage` after login.  
     - `favorites` is an array of favorited site IDs (fetched from `/api/users/favorites`).  
     - `showOnlyFavorites` (boolean) toggles whether to display all sites or only those in favorites.  

4. **Favorites & Filtering Logic**  
   - When `favorites` is fetched on login, the frontend compares each site’s `_id` to that list.  
   - Clicking the heart icon sends a `POST` or `DELETE` to `/api/users/favorites/:siteId`, then updates `favorites` in state.  
   - The “Show Only Favorites” checkbox filters the displayed sites to only those whose `_id` is in `favorites`.  

## Installation & Usage
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
