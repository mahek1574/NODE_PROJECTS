const http = require("http");
const fs = require("fs")


const server = http.createServer((req, res) => {


  if (req.url === "/") {
fs.readFile("home.html",(err,data)=>{
    res.writeHead(200,{'content-type':'text/html'})
    res.write(data)
    res.end()

})
  } else if (req.url === "/about") {
    fs.readFile("about.html", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      res.end();
    });

  } else if (req.url === "/api") {
    fs.readFile("data.json",(err,data)=>{
        res.writeHead(200,{"content-type":"application/json"})
        res.end(data)
    } )


  } else {
    res.end("404 page not found");
  }
});

PORT = 3001;

server.listen(PORT, () => {
  console.log("server running on", PORT);
});
