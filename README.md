<img width="1076" height="261" alt="banner" src="https://github.com/user-attachments/assets/d452963a-4f86-4a61-b3d7-76cd213b80b3" />


# Tokoku

Easy way to track sales, orders, and items
for F&B or event merch booths.

Laravel Inertia + React


## Prerequisites
Must have this installed:
- Composer
- PHP
- npm
- MySQL

## Installation

### Clone this repository
```bash
  git clone https://github.com/hanz-fr/tokoku-inertia.git
```

### Install tokoku-inertia with composer and npm

```bash
  cd tokoku-inertia

  composer install

  npm install
```

### Generate App Key and Migrate Database (MySQL)
Turn on your favorite web server. Create **.env** file and copy paste contents from **env.example.** Adjust the DB Connection with your own credentials. Manually create database/schema in RDBMS (DB_DATABASE value must match).

Generate the app key
```bash
php artisan key:generate
```
Migrate the database 
```bash
php artisan migrate
```

### Run the project

```bash
php artisan serve

npm run dev
```


## Credits

- Phone Icon https://icons8.com/icon/3biC8eqE8hzv/smartphone
- Blobcat https://github.com/DuckOfDisorder/BlobCats