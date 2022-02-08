const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/*", (req, res) => {
  var url = req.url;
  //   console.log(url);

  res.sendFile(__dirname + "/server.html");
});
