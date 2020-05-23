---
id: installation
title: Installation
sidebar_label: Installation
---

## Running Learnplex locally

1. Fork the [repository](https://github.com/coderplex/learnplex)
1. Clone the forked repository
   ```sh
   git clone <your-forked-repo-url>
   ```
1. Move to the repo folder
   ```sh
   cd learnplex
   ```
1. Install dependencies
   ```sh
   yarn
   ```
1. Start the development server
   ```sh
   yarn dev
   ```
   You can view your application at [localhost:3000](http://localhost:3000) in your browser

## Running Learnplex-Backend locally

1. Fork the [repository](https://github.com/coderplex/learnplex-backend)
1. Clone the forked repository
   ```sh
   git clone <your-forked-repo-url>
   ```
1. Move to the repo folder
   ```sh
   cd learnplex-backend
   ```
1. Follow the instructions at [creating-an-oauth-app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) to create an oauth app.
    > You can set the `Application name` to anything you like - Ex: Learnplex Local
   
    > Set the `Homepage URL` to `http://localhost:4000`

    > Set the `Authorization callback URL` to `http://localhost:4000/auth/github/callback`
1. Now visit [Developer Settings](https://github.com/settings/developers) and open your newly created application in OAuth Applications.
1. Copy the `Client ID` and `Client Secret` from here and set them in your `.env` file
1. Fire up docker containers, this will start PostgreSQL db, Redis and PgAdmin
   - MacOS, Linux and Windows (with bash enabled)
     ```sh
     # If you already have postgres/redis running locally, stop them before running the below commands
     # If you have never installed postgres and redis in your system, you can run the below commands directly.
     
     # in root directory of learnplex-backend project
     bash ./docker.sh start
     # or simply you can run
     ./docker.sh start
     # you can see all available options and current running docker images by running
     ./docker.sh
     ```
   - Windows

     > Refer to this [issue](https://github.com/coderplex/learnplex-backend/issues/4)

     ```sh
     # TODO: write a script `docker.bat` equivalent to `docker.sh` for Windows
     ```
   > You can access PgAdmin at [http://localhost:5050](http://localhost:5050)
1. Install dependencies
   ```sh
   yarn
   ```
1. Start the development server
   ```sh
   yarn dev
   ```
   You can view your application at [localhost:4000](http://localhost:4000) in your browser
1. You can access Graphql Playground at [localhost:4000/graphql](http://localhost:4000/graphql) in your browser


## Notes
1. To get the `id` of a user, add the following to GraphQL playground at [localhost:4000/graphql](http://localhost:4000/graphql) 
in your browser and execute it
    ```graphql
    # Register a user locally at http://localhost:3000/register and then 
    # replace `test@test.com` and `test123` in the following with your email and password

    mutation {
      login(usernameOrEmail: "test@test.com", password: "test123") {
        user {
          id
        }
      }
    }
    ```
1. To make a user as an admin, run the following curl command in your terminal
    ```sh
    # The below command will make user with id 1 as ADMIN
    # For making different user as ADMIN, replace the userId in the below command
    
    curl --location --request POST 'localhost:4000/modify_user_roles' \
    --header 'Authorization: Bearer iew3ihfui&$2uhs<EfregrgR>rg' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "role": "ADMIN",
      "userId": 1,
      "type": "ADD"
    }'
    ```
1. To add a new topic, first make yourself an `ADMIN` by using the above two points, start frontend
and open [localhost:3000/topics/new](http://localhost:3000/topics/new) in your browser, and add a topic
