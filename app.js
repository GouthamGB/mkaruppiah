const http = require("http");
const next = require("next");

const port = process.env.PORT || 3000;

const app = next({
  dev: false,
  hostname: "127.0.0.1",
  port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(port, "127.0.0.1", () => {
      console.log(`Next.js running on port ${port}`);
    });
});
