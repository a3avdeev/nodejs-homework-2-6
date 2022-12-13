const app = require("./app");
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const DB_HOST =
  "mongodb+srv://avdeev:AcPc6hMXynLr5d2w@cluster0.3brvvld.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
