# Chemnitz Cultural Explorer

A full-stack MERN application that displays cultural sites in Chemnitz on an interactive map. Users can register, log in, explore locations, filter and search for sites, and manage their personal favorites.

![image](https://github.com/user-attachments/assets/57198143-e4c1-40e9-8d77-b1be80ec0148)

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
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/chemnitz-cultural-explorer.git
   cd chemnitz-cultural-explorer
   ```
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
  
- Configure Environment Variables.

  Copy `.env.example` to `.env` and fill in your own values:
   ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

- Import GeoJSON Data

  Run the import script to load Chemnitz.geojson into MongoDB:
  ```bash
  node scripts/importGeoJSON.js
  ``` 
- Start the Server

   ```bash
    npm start 
   ```

The Express server will run on port 5000 (or the port specified in `.env`). Backend endpoints are now available at `http://localhost:5000/api/...`.

3. Frontend Setup
   ```bash
   cd ../frontend
   npm install

- Configure API URL (Optional)

By default, the React app calls http://localhost:5000/api/. To override in production, set an environment variable (e.g., in Netlify):
    ```bash
        REACT_APP_API_URL=https://your-render-backend-url <br>




- Configure API URL (Optional)

By default, the React app calls `http://localhost:5000/api/`. To override in production, set an environment variable (e.g., in Netlify):

Start the React App
   ```bash
      npm start
```

Open your browser at `http://localhost:3000`.

4. Register & Login

Click “Register” to create a new user (email + password).

Log in immediately to store your JWT in `localStorage`.

## Deployment
1. **Backend (Render)**

   - Push your backend/ folder to GitHub.

   - In Render:

      - Create a New Web Service.

      - Connect to your GitHub repo.

      - Build Command: npm install

      - Start Command: node server.js

      - Add Environment Variables in Render settings:

        - MONGO_URI

        - JWT_SECRET

     - Deploy. Once live, the backend API will be accessible (e.g., https://chemnitz-backend.onrender.com).

2. **Frontend (Netlify)**

    - Push your frontend/ folder to GitHub.

    - In Netlify:

       - Create a New Site from Git.

       - Set Base directory to frontend (if repository root).

       - Build Command: npm run build

       - Publish Directory: build

       - (Optional) Add REACT_APP_API_URL=https://chemnitz-backend.onrender.com to Environment Variables.

   - Deploy. The React app will be served (e.g., https://chemnitz-frontend.netlify.app).

### Contribution Guidelines
Contributions are welcome!

1. Fork the repository.

2. Create a feature branch:

   ```bash
   git checkout -b feature/new-feature 
   ```
3. Commit your changes with clear, descriptive messages.

4. Push to your fork and open a Pull Request.

5. Ensure your code follows the existing style and includes necessary documentation.

**License**

This project is licensed under the MIT License. See the LICENSE file for details.
