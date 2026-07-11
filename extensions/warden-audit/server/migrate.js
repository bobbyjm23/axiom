#!/usr/bin/env node
require("./db").runMigrations().then(() => {
  console.log("Warden audit migrations applied.");
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
