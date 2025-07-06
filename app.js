const http = require('http');
const mysql = require('mysql2');
const { parse } = require('querystring');

const connection = mysql.createConnection({
  host: 'naeundbinstance.c7kokc40medh.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'naeunnaeun01!B',
  database: 'myapp'
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/save-metadata') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            let data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
                return;
            }

            const { user_id, filename, s3_url, size } = data;

            const sql = `
                INSERT INTO uploads (user_id, filename, s3_url, size)
                VALUES (?, ?, ?, ?)
            `;

            connection.query(sql, [user_id, filename, s3_url, size], (err, result) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end('Database Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Saved!' }));
            });
        });

    } else {
        connection.query('SELECT * FROM test', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end('Database Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('Hello from RDS - Version 2!');
        });
    }
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});
