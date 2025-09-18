# URL Shortener - Node.js

A simple URL shortener application built with Node.js, Express, and MongoDB. It allows users to sign up, log in, and create shortened URLs. The application also tracks the number of visits for each shortened link.

## Features

-   **User Authentication:** Secure user signup and login system using JSON Web Tokens (JWT).
-   **URL Shortening:** Logged-in users can convert long URLs into unique short IDs.
-   **Redirection:** Short URLs redirect to their original long URL, and visit history is recorded.
-   **Analytics:** Users can view the total number of clicks and a timestamped visit history for each of their shortened URLs.
-   **Role-Based Access Control:** Middleware to restrict access to certain routes based on user roles (e.g., `NORMAL`, `ADMIN`).
-   **Server-Side Rendering:** Uses EJS for rendering dynamic HTML pages for the frontend.

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose ODM
-   **Authentication:** JSON Web Tokens (JWT)
-   **Templating Engine:** EJS (Embedded JavaScript)
-   **ID Generation:** `shortid` for short URLs, `uuid` for user tokens.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:

-   Node.js (v14 or later recommended)
-   MongoDB (Make sure your MongoDB server is running)

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    cd "URL Shortener - Node.Js"
    ```

2.  Install the required npm packages:
    ```sh
    npm install
    ```

### Configuration

The application requires a connection to a MongoDB database. The connection string is currently located in `app.js`.

Open `d:/Projects/URL Shortener - Node.Js/app.js` and replace the placeholder URI with your own MongoDB connection string.

```javascript
// In app.js
connectToMongoDB('YOUR_MONGODB_CONNECTION_STRING_HERE')
     .then(() => console.log("MongoDB Connected!"))
     .catch((err) => console.error("MongoDB Connection Error:", err));
```

For a local MongoDB instance, your string might look like this: `mongodb://localhost:27017/url-shortener`

### Running the Application

Start the server using the following command:

```sh
node app.js
```

The application will start and be accessible at `http://localhost:3001`.

## API Endpoints & Routes

### User Routes (`/user`)
-   `POST /`: Handles new user registration.
-   `POST /login`: Handles user login and returns a JWT token.

### URL Routes (`/url`)
-   `POST /`: Creates a new short URL (requires authentication).
-   `GET /analytics/:shortId`: Retrieves analytics for a specific short URL.

### Page & Redirection Routes (`/`)
-   `GET /`: Home page. Displays a user's shortened URLs if they are logged in.
-   `GET /signup`: Renders the signup page.
-   `GET /login`: Renders the login page.
-   `GET /:shortId`: Redirects to the original URL associated with the short ID.

## Project Structure

```
.
├── controllers
│   ├── url.js
│   └── user.js
├── middlewares
│   └── auth.js
├── models
│   ├── url.js
│   └── user.js
├── routes
│   ├── staticRouter.js
│   ├── url.js
│   └── user.js
├── service
│   └── auth.js
├── views
│   ├── home.ejs
│   ├── login.ejs
│   └── signup.ejs
├── app.js
├── connect.js
└── package.json
```