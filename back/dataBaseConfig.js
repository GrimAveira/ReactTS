import mysql from 'mysql'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '305010',
  database: 'elevator_company',
})

export default db
