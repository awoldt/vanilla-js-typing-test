const express = require("express");
const mobile = require("is-mobile");
const app = express();
const generatedWords = require("random-word"); //word generator

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(8080, () => {
  console.log("== server is running on port 8080 ==");
});

//home page
app.get("/", (req, res) => {
  //generates 100 words
  var words = [];
  for (i = 0; i < 100; ++i) {
    words.push(generatedWords());
  }

  //mobile device
  if (mobile({ ua: req })) {
    res.render("index-m", {
      title: "Free Online Speed Typing Test",
      description:
        "Sharpen your typing skills. Compete with friends to see who can get the highest WPM score. Optimised for both desktop and mobile devices, practice typing wherever.",
      style: "styles-m.css",
      txt: words,
    });
  }
  //desktop device
  else {
    res.render("index", {
      title: "Free Online Speed Typing Test",
      description:
        "Sharpen your typing skills. Compete with friends to see who can get the highest WPM score. Optimised for both desktop and mobile devices, practice typing wherever.",
      style: "styles.css",
      txt: words,
    });
  }
});

//404
app.use((req, res) => {
  res.status(404);
  res.send('error. page not found.<br><br><a href="/">return</a>');
});
