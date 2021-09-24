// REQUIRES
    let express = require ( 'express' );
    let app = express();

    let bodyParser = require ( 'body-parser' );

// USES
    app.use ( express.static( 'server/public' ) );
    app.use (bodyParser.urlencoded( { extended: true } ) );

// GLOBAL VIARIABLES
    const port = 5000;
    let pastCalculations = [];

// SPIN UP SERVER
    app.listen( port, () => {
        console.log( 'server is up on:', port );
    })
// ROUTES
app.get('/calculations', (req, res ) => {
 console.log( 'hit on GET /calculations');
 res.send( pastCalculations );
});

app.post('/calculations', (req, res ) => {
    console.log( 'hit on POST /calculations:', req.body );
    let el = req.body
    if(el.operation === '+'){
        el.answer = Number(el.numOne) + Number(el.numTwo)
    }
    else if(el.operation === '-'){
        el.answer = Number(el.numOne) - Number(el.numTwo)
    }
    else if(el.operation === '*'){
        el.answer = Number(el.numOne) * Number(el.numTwo)
    }
    else if(el.operation === '/'){
        el.answer = Number(el.numOne) / Number(el.numTwo)
    }
    pastCalculations.unshift(el)
    res.sendStatus( 201 )
   });