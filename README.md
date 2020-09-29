# Code Challenge

## The Situation:
You've been hired by a new tech company HeroDB as a Full Stack Developer. For your first assignment, you've been assigned the task of making an app that highlights some fo the best heroes in the galaxy.  Unfortunately, there is no existing database (or APIs) for the hero galaxy so you must crawl a website (Marvel's) to get the information needed.

## Tasks:
1. Using Angular 9 (and any other dependencies) to create 2 pages. The first page should list all heroes with basic information and the second should take you to the details of a single hero. We want to see how you would structure your code and use the API to retrieve data. The boilerplate for the Angular app is available in the client directory in the repository.

    We're looking to gauge your Angular prowess (what code are you putting into the controller vs a services, etc), and generally how you go about writing good Typescript/JS code. Design is not critical (we don't expect a pixel perfect design), but we are looking for common sense when it comes to design and user experience (feel free to pull in any front end frameworks / tool kits that you think might be helpful with this).  

2. Using Puppeteer (or any other tools to crawl websites) get a list of at least 12 heroes with basic information about them (name, photo, bio).  Store the data locally so it can be served to your Angular application. We've provided basic boilerplate for a Puppeteer script.

3. Use Node.JS/Express along with the Serverless framework on the backend to expose a series of API's to return the data captured by your crawler in step 2. We've provided basic boilerplate for a Node app on the backend.

    Over here, we're looking to see how you would use Nodejs, Express framework to structure your server including routes, controllers and models.  We have set you up with a rough structure in this repo to help but feel free to restructure it as you see fit.

4. Bonus - since this is your first assignment at HeroDB, devise an extra killer feature that you think your supervisors at HeroDB would really enjoy.

    We're looking to see how you contribute to the team outside of just coding. We value feedback and ideas!

5. Finally, deploy your application to AWS or other PAAS (free tier).  Send us a fork of this repo and a link to your deployed application.

## Notes:
1. Ensure you have included all of your dependencies  and a script in the ```package.json```.  We should be able to clone your repo, run ```npm install```, run a script (for example ```npm run start```) and run the app locally.
