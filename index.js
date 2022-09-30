var http = require("http");
var hostName = "127.0.0.1";
var port = 8070;

const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-type": "application/json" });
      const products = JSON.stringify([
        {
          name: "CUP",
          price: "400$",
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("Created!");
    }
  }
  res.end("Bye Client!");
});

server.listen(port, hostName);

console.log("grab market server on!");

// test2
