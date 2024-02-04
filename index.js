// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hellos API" });
});
function timeConverter(UNIX_timestamp) {
  const dateTimeStr = new Date(1504052527183).toLocaleString();
  const result = dateTimeStr.split(", ")[1].split(":").join("-");
  return result;
}
function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}
app.get("/api/:date", function (req, res) {
  let dateVal = isDateValid(req.params.date);
  if (dateVal) {
    res.json({
      unix: new Date(req.params.date).valueOf(),
      utc: new Date(req.params.date).toUTCString(),
    });
  } else {
    let convertedDate = timeConverter(req.params.date);
    console.log("hello", convertedDate);
    let secondChk = isDateValid(convertedDate);
    if (secondChk) {
      res.json({
        unix: new Date(req.params.date).valueOf(),
        utc: convertedDate,
      });
    } else {
      res.json({
        error: convertedDate,
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(38303, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
