const app = require("./app");

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});