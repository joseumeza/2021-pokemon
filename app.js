const express = require('express');
const https = require('https');
const ejs = require('ejs');
const got = require('got');
const bodyParser = require('body-parser')


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


const PokeUrl = 'https://pokeapi.co/api/v2/pokemon/';


    

app.get('/', (req, res) => {
    (async () => {
        try {

            const response = await got(PokeUrl + 25);
            pokemon = JSON.parse(response.body)
            console.log(pokemon.name)
            
            res.render('home', {pokemon: pokemon})
        } catch (error) {
            console.log(error.response.body)
        }
    })();

});

app.get('/:pokemon', (req, res) => {
    let pokemon = req.params.pokemon;

    (async () => {
    try {

        const response = await got(PokeUrl + pokemon);
        pokemon = JSON.parse(response.body)
        console.log(pokemon.name)
        res.render('home', {pokemon: pokemon})
    } catch (error) {
        console.log(error.response.body)
    }
    })();


});

app.post('/', (req, res) => {
    let pokemon = req.body.pokemon;
    if(!pokemon) {
        pokemon = Math.floor(Math.random() * 898);
    };

    res.redirect('/' + pokemon)

})

app.listen(3000, () => {
    console.log('connected to port 3000');
});




