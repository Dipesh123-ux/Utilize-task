require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI).then(() => {
  console.log("connected to db");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
const orderRoutes = require("./routes/order");
app.use(orderRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
