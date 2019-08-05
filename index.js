// implement your API here
const express = require('express');

const users = require('./data/db.js');
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello Web');
})

server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});



server.get('/api/users/:id', (req, res) => {
    users.findById()
        .then(users => {
            res.status(200).json(db);
        })
        .catch(error => {
            res.status(500).json({ message: "The user with the specified ID does not exist." });
        });
});

server.post('/api/users', (req, res) => {
    const dbInformation = req.body;

    users.add(dbInformation)
        .then(users => {
            res.status(201).json(db);
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Please provide name and bio for the user." });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const dbId = req.params.id;

    db.remove(dbId)
        .then(db => {
            res.status(200).json({ message: 'database deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing the hub' })
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res, status(200).json(updated);
            } else {
                res.status(404).json({ message: 'database not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating database' });
        });
});

const port = 8500;
server.listen(port, () => console.log('\napi running\n'));