# simplyboard-web
https://simplyleaderboards.web.app/
Simple leaderboard service Web app and API. Use it to create, update, and view leaderboards for unity games.

### Overview
- React Client app
- Nodejs Backend
- MongoDb (using monogoose for schemas)

### Running
Backend
- `npm install` and `npm start` to run the backend

Frontend
- `cd client && npm run build` to build the frontend if running the backend
- For developing the frontnend, you'll want to just `npm install` and then `npm start` inside the client folder

### Deployment to Heroku

See `"heroku-postbuild"` step in package.json
