import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server is listning on post ${PORT}`);
});
