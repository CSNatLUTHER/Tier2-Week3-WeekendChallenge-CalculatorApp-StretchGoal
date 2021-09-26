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
        let la = Number(el.numOne) + Number(el.numTwo)
        el.answer = Math.round(la*100000000000000)/100000000000000
    }
    else if(el.operation === '-'){
        let la = Number(el.numOne) - Number(el.numTwo)
        el.answer = Math.round(la*100000000000000)/100000000000000
    }
    else if(el.operation === '*'){
        let la = Number(el.numOne) * Number(el.numTwo)
        el.answer = Math.round(la*100000000000000)/100000000000000
    }
    else if(el.operation === '/'){
        let la = Number(el.numOne) / Number(el.numTwo)
        el.answer = Math.round(la*100000000000000)/100000000000000
    }
    pastCalculations.unshift(el)
    res.sendStatus( 201 )
   });

app.delete( '/calculations', (req, res ) => {
    pastCalculations = []
    res.sendStatus( 200 )
})

app.get( '/rerunCalculations', (req, res ) => {
    console.log( 'Here is what we got:',req.query.id );
    let el = req.query.id
    pastCalculations.unshift(pastCalculations[el])
    res.send( pastCalculations[el] );

})