const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10, // Max connections
  host: "localhost", // Your MySQL host (usually localhost)
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "notes_db", // The database we created
});

// Export the pool so it can be used in server.js
module.exports = pool;
