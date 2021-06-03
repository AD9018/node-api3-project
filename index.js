// require your server and launch it
const server = require("./api/server");

server.listen(4000, () => {
  console.log("\n* Server is running on https://localhost:4000 *\n");
});
