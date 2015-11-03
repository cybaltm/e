// This is an example file. Be sure to rename it to local.js and add valid credentials.
module.exports = {
  port: 1337,
  environment: "development",
  reddit: {
    clientID: "CLIENT ID GOES HERE",
    clientIDSecret: "SECRET ID GOES HERE",
    redirectURL: "http://localhost:1337/auth/reddit/callback",
    adminRefreshToken: "ADMIN REFRESH TOKEN GOES HERE"
  },
  connections: {
    "default": "mongo",
    mongo: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      user: '',
      password: '',
      database: 'fapp'
    }
  },
  session: {
    adapter: 'mongo',
    host: 'localhost',
    port: 27017,
    db: 'fapp',
    collection: 'sessions'
  }
};
