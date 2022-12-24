# REST API Example

- Home page:

  ```
  /api/
  ```
- Elements page:

  ```
  /api/clothes/
  ```
  You have to be logged in to get access to this page. Use post request to
  
  ```
  /api/auth/login
  ```
  Or register using post request to 
  
  ```
  /api/auth/register/
  ```
  Use data payload in this format:
  ```
  {
    "username": "your username",
    "password": "your pasword"
  }

- Create and Delete Element:
  
  To create element use post request to
  
  ```
  /api/clothes/create/
  ```
  
  To delete element use post request to
  
  ```
  /api/clothes/delete/
  ```
  This functions you must use with data payload in this format:
  
  ```
  {
    "title": "title of elemnt"
  }
  ```
