import mySql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mySql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "vue-express-db",
  port: 3306,
});

export default pool.promise();
