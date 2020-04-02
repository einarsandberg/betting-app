# betting-app
Betting app

# Quickstart
1. Install mongo db
2. In `/server`, create env file `cp default.env .env`
3. Edit `JWT_SECRET` in .env file
4. Install dependencies 
    1. `cd server && npm i`
    2. `cd client && npm i`
5. Populate DB with matches `cd server && npm run populate`
6. Create admin user  `cd server && npm run create-admin {email} {firstName} {lastName} {password} {isAdmin}`
    1. Ex: `npm run create-admin email@email.com Jane Doe mysecretpassword true`
7. In `/server`, `npm run start:dev`
8. In `/client`, `npm start`

# DB
## Install
`brew tap mongodb/brew`
`brew install mongodb-community@4.2`

## Start
`brew services start mongodb-community@4.2`

# Run server
`cd server && npm run start:dev`

# Run client
`cd client && npm start`

# Populate db with matches
`npm run populate`

# Create admin user
`npm run create-admin {email} {firstName} {lastName} {password} {isAdmin}`

Ex: `npm run create-admin email@email.com Jane Doe mysecretpassword true`