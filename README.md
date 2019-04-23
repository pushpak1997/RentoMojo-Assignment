# RentoMojo-Assignment
Comment Box using MEAN Stack where a user can post comments and can Upvote ,Downvote Other's Comments

## Objective 
1. To show all the comments available in the database on the homepage.
2. To Implement Register and Login services so that a user can post his own comment.
3. To Authorize User before posting a comment.
4. To Authorize User before upvoting and downvoting on comments, a user cannot do multiple upvote and downvote on comments.
5. To provde Good and responsive User interface to the user.

## How to run the program
#### To Install dependencies
 Run `npm install` to install all the dependencies of the project. 
 
#### To Run the app in the development mode.<br> 
 1. Run  `npm start` for strting backend 
 2. CD `/angular` and Run `npm start` for strting frontend
 3. Open your browser on http://localhost:4200/
 
#### To Run the production mode
 1. CD `/angular`and Run `ng build`
 2. CD `/angular/dist` and copy the static files of frontend 
 3. CD `/public` and paste the files
 4. Run `npm start` in home directory
 5. Open your browser on http://localhost:3000/
 
## Tech Used
For the Frontend Angular CLI 7 <br>
For the Backend NodeJS, MongoDB, Express and Concepts from ES6
#### Packages Used 
PassportJS JWT for authetication and authorization <br>
Mongoose as an ODM
