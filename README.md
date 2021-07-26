<p align="center">
<a href="https://laravel.com" target="_blank">
<img src="https://i.imgur.com/Ls4Npc0.png" width="400"></a></p>

## Overview of Bookworm

Bookworm or you can call it Mọt Sách is an assignment from Nashtech. This assignment required the participant to execute this individually with technology such as the core framework Laravel, database as PostgreSQL and using React.js and Bootstrap to build a dynamic webpage for the customers.

## Configuration

If you would like to run the project with your local machine. You can first download the code and then run this command. This will install of the required dependencies for Laravel:

    composer install

Remember we are using React.js so install NPM dependencies as well:

    npm install

Replace `.env.example` file with your own `.env` file. You can config the following details in order to gain access to your local database:

    DB_CONNECTION=pgsql
    DB_DATABASE=bookworm_app_db
    DB_HOST=127.0.0.1 (localhost)
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=your-password

Run migrations to create database tables and seed dummy data if you want:

    php artisan migrate:fresh --seed

Run the API development environment:

    npm run dev-api

Run the API and compile the React application:

    npm run dev-full

    