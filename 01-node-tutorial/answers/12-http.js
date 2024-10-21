import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Home Page!");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("About page!");
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
