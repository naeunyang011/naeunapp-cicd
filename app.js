const http = require('http');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'naeundbinstance.c7kokc40medh.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'naeunnaeun01!B',
  database: 'myapp'
});

const server = http.createServer((req, res) => {
    connection.query('SELECT * FROM test', (err, results) => {
        if (err) {
            res.writeHead(500);
            res.end('Database Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
      //  res.end(JSON.stringify(results));
      res.end('Hello from RDS - Version 2!');
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});
