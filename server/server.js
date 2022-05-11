// HINT
// Add computer vision to analize cannabis deficiencies?
// const cv2 = require("opencv4nodejs");
var express = require("express");
var path = require("path");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3001;

let users = 0;
io.on("connection", function (socket) {
  users += 1;
  console.log(`CONECTED ${users}`);
  socket.on("stream", function (image) {
    console.log("STREAM", image);
    // uploadImage(image);
    socket.broadcast.emit("stream", image);
  });
});

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_duyLzlycKbBAFhuX3nXhwzIjlko=",
  privateKey: "private_WFL84bPwu6xvOYx+xayo+sRnh7U=",
  urlEndpoint: "https://ik.imagekit.io/ro48hkvo8/",
});

function uploadImage(image) {
  // Using Callback Function

  imagekit.upload(
    {
      file: image, //required
      fileName: `${new Date().toString()}.jpg`, //required
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
}

// app.use(express.static(path.resolve(__dirname, "../public")));

// app.get("/", function (req, res) {
//   res.redirect("index.html"); //para archivos estaticos
// });

http.listen(port, function () {
  console.info("listening on %s", port);
});
