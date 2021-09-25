$( document ).ready ( onReady );

function onReady(){
    console.log( 'I am JQuery ready!' );
    $( '#calculateAnswer' ).on ( 'click', performCalculation );
    $( '#clearValues' ).on ( 'click', clearData );
    $( '.operationType' ).on ( 'click', setOperation );
    $( '.clacButton').on ( 'click', insertNumber )
    getPastCalculations();
}

let newObjectToSend = {
    numOne: '',
    operation: '',
    numTwo: ''
    }

function clearData(){
    newObjectToSend.numOne = '';
    newObjectToSend.numTwo = '';
    operationType = '';
    let el = $('#entryField')
    el.empty()
    $( ".operationType" ).removeAttr('style') 
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
                el.append(`<li style="font-size: 16px">${response[i].numOne} 
                ${response[i].operation} 
                ${response[i].numTwo} = 
                <b>${response[i].answer}</b></li>`) 
            }; // end for loop
            $( '#calcAnswer' ).empty()
            $( '#calcAnswer' ).append(` ${response[0].numOne} 
            ${response[0].operation} 
            ${response[0].numTwo} = 
            <b>${response[0].answer}</b>`)
            let el2 = $('#entryField')
            el2.append(response[0].answer)
        }  // end if  
    }).catch( function( err ){
        alert('There was an error');
        console.log('The error was:', err );
    })
} // end getPastCalculations function

function performCalculation(){
    console.log( 'in performCalculation' );
    let el = $('#entryField')
    if (newObjectToSend.numOne.length > 0 && el[0].innerText.length > 0) {
        newObjectToSend.numTwo = el[0].innerText
        el.empty();
    }
    console.log(newObjectToSend.numOne,
                newObjectToSend.operation,
                newObjectToSend.numTwo);
    if (newObjectToSend.numOne.length < 1 || 
        newObjectToSend.operation === '' || 
        newObjectToSend.numTwo.length < 1){
            alert( "Two numbers and an operator must be selected to continue")
    } // end if
    else{
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: newObjectToSend
    }).then( function (response ) {
        console.log( 'back from POST', newObjectToSend );
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
    newObjectToSend.operation = $( this ).data( 'id' )
    $( '.operationType').removeAttr('style');
    $( this ).css ('background-color', 'rgb(111, 125, 164)');
    $( this ).css ('color', 'white');
    let el = $('#entryField')
    if (newObjectToSend.numOne === '') {
        newObjectToSend.numOne = el[0].innerText
        el.empty();
    }
    console.log(newObjectToSend.numOne,
                newObjectToSend.operation,
                newObjectToSend.numTwo);
} // end setOperation

function insertNumber() {
    let el = $('#entryField')
    let el2 = el[0].innerText
    console.log(el2);
    let dotCounter = 0;
    // loop through el.innertext to count '.' looking for <= 1
    for (let i = 0; i < el2.length; i++) {
        if(el2[i] === '.') {
            dotCounter++
        } // end if
    } // end for
    console.log(dotCounter);
    if($( this ).data( 'id' ) === '.' && dotCounter === 0 ){ 
        let nextNum = $(this).val();
        console.log( nextNum );
        el.append(nextNum)
        el2 = el[0].innerText
        console.log(el2);
    } // end if
    else if($( this ).data( 'id' ) != '.'){
        let nextNum = $(this).val();
        console.log( nextNum );
        el.append(nextNum)
        el2 = el[0].innerText
        console.log(el2);
    } // end if
} // insertNumber function