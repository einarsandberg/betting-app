# betting-app
Betting app



# DB
## Install
`brew tap mongodb/brew`
`brew install mongodb-community@4.2`

## Start
`brew services start mongodb-community@4.2`

# Run server
`npm run start:dev`

# Run client
`npm start`

# Populate db with matches
`npm run populate`

# Create admin user
`npm run create-admin {email} {firstName} {lastName} {password} {isAdmin}`
Ex: `npm run create-admin email@email.com Jane Doe mysecretpassword true`