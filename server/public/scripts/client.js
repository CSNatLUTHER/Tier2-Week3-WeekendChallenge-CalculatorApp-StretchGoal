$( document ).ready ( onReady );

function onReady(){
    console.log( 'I am JQuery ready!' );
    $( '#calculateAnswer' ).on ( 'click', performCalculation );
    $( '#clearValues' ).on ( 'click', clearData );
    $( '.operationType' ).on ( 'click', setOperation );
    getPastCalculations();
}

let operationType = '';

function clearData(){
    $( "#numOneIn" ).val('')
    $( "#numTwoIn" ).val('')
    $( ".operationType" ).removeAttr('style')
    operationType = '';
}
function getPastCalculations(){
    console.log('in getPastCalculations');
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ) {
        console.log('Back from server with:', response );
        let el = $("#listOfPastCalculations")
        el.empty()
        if (response.length > 0){
            for (let i = 0; i < response.length; i++) {
                el.append(`<li>${response[i].numOne} 
                ${response[i].operation} 
                ${response[i].numTwo} = 
                <b>${response[i].answer}</b></li>`) 
            }; // end for loop
            $( '#calcAnswer' ).empty()
            $( '#calcAnswer' ).append(` ${response[0].numOne} 
            ${response[0].operation} 
            ${response[0].numTwo} = 
            <b>${response[0].answer}</b>`)
        }  // end if  
    }).catch( function( err ){
        alert('There was an error');
        console.log('The error was:', err );
    })
} // end getPastCalculations function

function performCalculation(){
    console.log( 'in performCalculation' );
    console.log($( "#numOneIn" ).val().length);
    if ($( "#numOneIn" ).val().length <1 || 
        operationType === '' || 
        $( "#numTwoIn" ).val().length <1){
            alert( "Two numbers and an operator must be selected to continue")
    } // end if
    else{
    let objectToSend = {
        numOne: $( "#numOneIn" ).val(),
        operation: operationType,
        numTwo: $( "#numTwoIn" ).val(),
    }
    console.log( objectToSend );
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: objectToSend
    }).then( function (response ) {
        console.log( 'back from POST', objectToSend );
        getPastCalculations();
    }).catch( function ( err ) {
        alert( 'There was a caluation error')
        console.log('Error with caluation:', err );
    })
    clearData();
    } // end else
}

function setOperation() {
    console.log( 'in setOperation with operation type:', $( this ).data( 'id' ) );
    operationType = $( this ).data( 'id' )
    $( '.operationType').removeAttr('style');
    $( this ).css ('background-color', 'blue');
    $( this ).css ('color', 'white');
    console.log('operation is set to:', operationType );
} // end setOperation