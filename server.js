const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const goals = require("./routes/api/goals");

const app = express();

app.use(cors({
    origin: "https://impossible-list.onrender.com"
}));

// body-parser middleware
app.use(
    // reads and parse URLs
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(
    // parses json
    bodyParser.json()
);

// db config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose.set('strictQuery', false);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// user routes
app.use("/api/users", users);

// goals routes
app.use("/api/goals", goals);

const port = process.env.PORT || 5000;

app.listen(
    port, 
    () => console.log(`Server running on port ${port}!`)
); 