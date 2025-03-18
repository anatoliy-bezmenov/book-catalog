# Book catalog project

## Motivation
This project allows users to see a book list. Logged-in users can add new books to the list, edit their books and delete them. Anyone can read the details about a specific book they like.

## Features
    - Features 4 dynamic pages that fetch data from the back-end server, allowing their content to change according to the application state (excluding login and register).
    - Includes pages for listing books and book details.
    - Communicate to a remote service via REST.
    - All CRUD (create, read, update, delete) operations are implemented.
    - Has 8 routers (excluding the error page).
    - Has error handling and data validation to avoid crashes.
    - Has public and private parts. The private parts can only be accessed by logged-in users.

## How to install

Open a terminal and run
```sh
git clone git@github.com:anatoliy-bezmenov/book-catalog.git
```

```sh
cd book-catalog
```

### Rest API Server
Open a terminal and run

```sh
cd books-rest-server
npm install
npm run start
```

After having successfully started the server, the server will start running on port 4000 and a database called "books" will be created, which will store 2 collections. One called "books" and another one called "users".

### Vite React Web Application
Open another terminal and run (from book-catalog folder location)

```sh
cd react-app
npm install
npm run dev
```

### Open with browser
http://localhost:5173/
