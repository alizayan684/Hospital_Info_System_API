import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';

// Load the CA certificate provided by Aiven
const caCert = fs.readFileSync("D:\\GITHUB_PROJECTS\\his-finalproject-database_sbe-_spring24_team1\\server\\utilities\\ca.pem").toString();

const dataBase = new Pool({
  user: 'avnadmin',
  host: 'cardio-dept-postgresql-cardio-dept.e.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_8BD2WGGGdZFhUzl-P3U',
  port: 14691, // Replace with your port
  ssl: {
    rejectUnauthorized: true,
    ca: caCert // Provide the CA certificate
  }
});

export default dataBase;
