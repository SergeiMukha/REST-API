# REST API Example

- Home page

  ```
  /api/
  ```
- Elements page

  ```
  /api/clothes/
  ```
  You have to be logged in to get access to this page. Use post request to
  
  ```
  /api/auth/login
  ```
  With data formatted such as
  ```
  {
    "username": "your username",
    "password": "your pasword"
  }
