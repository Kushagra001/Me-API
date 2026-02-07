
# Me-API Playground

This is a personal API playground and portfolio dashboard built with Node.js, Express, SQLite, and Vanilla JS. It extracts data from a live portfolio and serves it via a REST API.

## Features

- **Profile API**: Get user details, bio, and social links.
- **Projects API**: Fetch project list with tags and links.
- **Skills API**: Retrieve skills and expertise.
- **Search**: Filter projects and skills.
- **Dashboard**: A modern, responsive frontend to view the data.

## Getting Started

### Prerequisites

- Node.js installed.

### Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Initialize Database:**
    ```bash
    node init_db.js
    ```

3.  **Seed Database:**
    ```bash
    node seed_db.js
    ```

4.  **Start Server:**
    ```bash
    node server.js
    ```

5.  **View Dashboard:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /health` - Health check.
- `GET /api/profile` - User profile data.
- `GET /api/projects` - List of projects.
- `GET /api/skills` - List of skills.
- `GET /api/search?q=query` - Search projects and skills.

## Architecture

- **Backend**: Express.js server serving REST endpoints.
- **Database**: SQLite (`database.sqlite`) for persistent storage.
## Deployment

### Deploy to Render (Recommended)

1.  **Push to GitHub**: Ensure your latest changes are pushed.
2.  **Create Web Service**: Go to [Render Dashboard](https://dashboard.render.com/) -> New -> Web Service.
3.  **Connect Repo**: Select your `Me-API` repository.
4.  **Configure**:
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Deploy**: Click "Create Web Service".

*Note: Since this app uses SQLite, the database is stored in `database.sqlite`. For production persistence beyond deployments on platforms like Heroku/Render (free tier), consider using a persistent volume or migrating to PostgreSQL. However, for this portfolio, the database is committed to the repo, so it will work fine as a read-only source.*
