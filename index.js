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
function timeConverter(UNIX_timestamp, res) {
  try {
    const dateTimeStr = new Date(parseInt(UNIX_timestamp)).toLocaleString();
    const result = dateTimeStr.split(",")[0].split("/");
    let day = result[1];
    let month = result[0];
    let year = result[2];
    return year + "-" + month + "-" + day;
  } catch {
    res.json({
      error: "Invalid Date",
    });
  }
}
function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}
app.get("/api/:date?", function (req, res) {
  var dateVal = isDateValid(req.params.date);
  var convertedDate = timeConverter(req.params.date, res);
  console.log("test", convertedDate);
  var secondChk = isDateValid(convertedDate);
  if (req.params.date === undefined) {
    res.json({
      unix: new Date().valueOf(),
      utc: new Date().toUTCString(),
    });
  }
  if (dateVal) {
    res.json({
      unix: new Date(req.params.date).valueOf(),
      utc: new Date(req.params.date).toUTCString(),
    });
  }
  if (secondChk) {
    res.json({
      unix: parseInt(req.params.date),
      utc: new Date(convertedDate).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(38303, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
