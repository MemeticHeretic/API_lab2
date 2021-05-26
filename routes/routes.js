const pool = require('../data/config');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    //Получить все автомобили
    app.get('/cars', (request, response) => {
        pool.query('SELECT * FROM cars', (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });

    //Получить один автомобиль по id
    app.get('/cars/:id', (request, response) => {
        const id = request.params.id;
     
        pool.query('SELECT * FROM cars WHERE id = ?', id, (error, result) => {
            if (error) throw error;
     
            response.send(result);
        });
    });

    //Добавить новый автомобиль
    app.post('/cars', (request, response) => {
        pool.query('INSERT INTO cars SET ?', request.body, (error, result) => {
            if (error) throw error;
     
            response.status(201).send(`Car added with ID: ${result.insertId}`);
        });
    });

    //Изменить автомобиль
    app.put('/cars/:id', (request, response) => {
        const id = request.params.id;
     
        pool.query('UPDATE cars SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
     
            response.send('Car updated successfully.');
        });
    });

    //Удалить автомобиль
    app.delete('/cars/:id', (request, response) => {
        const id = request.params.id;
     
        pool.query('DELETE FROM cars WHERE id = ?', id, (error, result) => {
            if (error) throw error;
     
            response.send('Car deleted.');
        });
    });
}

module.exports = router;