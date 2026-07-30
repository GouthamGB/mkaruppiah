const http = require("http");

http.get("http://localhost:3000", (res) => {
  console.log("STATUS CODE:", res.statusCode);
  console.log("HEADERS:", res.headers);
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    console.log("HTML length:", data.length);
    console.log("HTML preview (first 500 chars):");
    console.log(data.substring(0, 500));
  });
}).on("error", (err) => {
  console.error("Error connecting to server:", err.message);
});
