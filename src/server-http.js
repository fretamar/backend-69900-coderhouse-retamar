import http from 'http';
import { stringify } from 'querystring';

const server = http.createServer((req, res) => {
    if (req.url === './products') {
        res.end(JSON.stringify(products))
    } 
    if (req.url === '/home') {
        console.log("Welcome")
    }
});

server.listen(8500, () => console.log("Servidor ok en puerto 8500"));
