const bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
const path = require("path");
var database = require("./config/Database");
const app = express();
const port = process.env.PORT || 8081;

/**
 * Mongoose config
 */
var connect = function () {
  var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  console.log(database.url);
  mongoose.connect(database.url, options).then(
    (response) => {
      console.log(response);
    },
    (err) => {
      console.log(err);
    }
  );
};
connect();
mongoose.connection.on("error", console.log);
mongoose.connection.on("disconnected", connect);
require("fs")
  .readdirSync(__dirname + "/models")
  .forEach(function (file) {
    if (~file.indexOf(".js")) require(__dirname + "/models/" + file);
  });
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});

app.use("/api", require("./routes/routes"));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Node backend listening at http://%s:%s", host, port);
});
