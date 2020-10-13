const express = require('express')
const fs = require('fs')
const uuid = require('uuid/v4')

const router = express.Router()

const jsonPersonas = fs.readFileSync('src/data/personas.json', 'utf-8')
let personas = JSON.parse(jsonPersonas)

router.get('/', (res, req) => {
    req.render('home', { personas })
})
router.get('/admin', (res, req) => {
    req.render('add')
})
router.get('/delete', (res, req) => {
    req.render('delete', { personas })
})
router.post('/admin', (req, res) => {
    const { nombre, apellido, edad } = req.body;
    if (!nombre || !apellido || !edad) {
        res.status(400).send('No has llenado todos los campos')
        return;
    } else {
        let newDude = {
            id: uuid(),
            nombre,
            apellido,
            edad
        }
        personas.push(newDude);
        const jsonPersonas = JSON.stringify(personas);
        fs.writeFileSync('src/data/personas.json', jsonPersonas, 'utf-8');
        res.render('ready');
    }
})
router.get('/delete/:id', (req, res) => {
    personas = personas.filter(persona => persona.id != req.params.id)
    const jsonPersonas = JSON.stringify(personas);
    fs.writeFileSync('src/data/personas.json', jsonPersonas, 'utf-8');
    res.render('ready');
})
module.exports = router;