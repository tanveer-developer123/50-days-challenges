# Working with Postman

## 🔹 What is Postman?

Postman is a popular tool used by developers and testers to **send HTTP
requests** to APIs and check their responses.\
It helps in understanding how an API works and is very useful during
backend/frontend development.

------------------------------------------------------------------------

## 🔹 Why use Postman?

-   Test REST APIs (GET, POST, PUT, DELETE, PATCH)
-   Debug and analyze API responses
-   Save requests into collections for reuse
-   Automate testing of APIs
-   No need to write code just to test endpoints

------------------------------------------------------------------------

## 🔹 Basic HTTP Methods in Postman

### 1. GET (Retrieve Data)

-   Used to **fetch data** from a server.

-   Example:\
    **Request:**

    ``` http
    GET https://jsonplaceholder.typicode.com/posts/1
    ```

    **Response:**

    ``` json
    {
      "userId": 1,
      "id": 1,
      "title": "Sample title",
      "body": "Sample body content"
    }
    ```

------------------------------------------------------------------------

### 2. POST (Create Data)

-   Used to **create new data** on the server.

-   Example:\
    **Request:**

    ``` http
    POST https://jsonplaceholder.typicode.com/posts
    ```

    **Body (raw JSON):**

    ``` json
    {
      "title": "Hello World",
      "body": "This is a test post",
      "userId": 1
    }
    ```

    **Response:**

    ``` json
    {
      "id": 101,
      "title": "Hello World",
      "body": "This is a test post",
      "userId": 1
    }
    ```

------------------------------------------------------------------------

### 3. PUT (Update Data)

-   Used to **update/replace existing data**.

-   Example:\
    **Request:**

    ``` http
    PUT https://jsonplaceholder.typicode.com/posts/1
    ```

    **Body (raw JSON):**

    ``` json
    {
      "id": 1,
      "title": "Updated Title",
      "body": "This content has been updated",
      "userId": 1
    }
    ```

    **Response:**

    ``` json
    {
      "id": 1,
      "title": "Updated Title",
      "body": "This content has been updated",
      "userId": 1
    }
    ```

------------------------------------------------------------------------

### 4. DELETE (Remove Data)

-   Used to **delete existing data**.

-   Example:\
    **Request:**

    ``` http
    DELETE https://jsonplaceholder.typicode.com/posts/1
    ```

    **Response:**

    ``` json
    {}
    ```

------------------------------------------------------------------------

## 🔹 Collections in Postman

-   A **collection** is a group of saved requests.
-   You can organize your API testing into folders and share it with
    your team.

------------------------------------------------------------------------

## 🔹 Environment Variables

-   Postman allows using variables like `{{baseUrl}}` to avoid writing
    the same URL multiple times.

------------------------------------------------------------------------

## ✅ Summary

-   **GET** → Read data\
-   **POST** → Create new data\
-   **PUT** → Update/replace data\
-   **DELETE** → Remove data

Postman makes it very easy to work with these requests and see responses
in real-time.
