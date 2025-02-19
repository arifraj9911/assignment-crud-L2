import app from "./app";
import config from "./config";
import mongoose from "mongoose";

const dbURL = new URL(config.database_url as string);

async function main() {
  await mongoose.connect(config.database_url as string);
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log(`Database connected successfully to host: ${dbURL.host}`);
  });
}

main();
