import session from "express-session";

const sessionConfig = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
})

export default sessionConfig;