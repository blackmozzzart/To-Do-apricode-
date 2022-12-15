// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    noCors: false
})

const users = [
    { id: 1, login: 'umar', password: '123' },
    { id: 2, login: 'mur', password: '456' }
];
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        if (req.url === '/api/login') {
            try {
                const { login, password } = req.body;
                console.log(login, password)
                const user = users.find(
                    u => u.login === login && u.password === password
                );

                if (!user) {
                    res.sendStatus(401); // unauthorized
                    return;
                }

                res
                    .status(200)
                    .header('Access-Control-Allow-Origin', '*')
                    .json(user);
                return;
            } catch (err) {
                console.log('error');
                res.sendStatus(401); // unauthorized
                return;
            }

        }
    }

    // Continue to JSON Server router
    next()
})

server.use(middlewares)
server.use(router)




server.listen(3010, () => {

    console.log('JSON Server is running')
})