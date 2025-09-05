const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./router/user");
const { adminRouter } = require("./router/admin");
const { courseRouter } = require("./router/course");
const app = express();
app.use(express.json())

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://akshay:yepasshe@cluster0.th96dyz.mongodb.net/coursera-app"
  );
  app.listen(3000, () => {
    console.log("listning on port number 3000");
  });
}

main();
