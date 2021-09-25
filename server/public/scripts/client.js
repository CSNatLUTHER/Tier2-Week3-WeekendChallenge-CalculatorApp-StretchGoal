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
let equalsButtonLastClick = false;
let lastAnswer = 0;

function clearData(){
    newObjectToSend.numOne = '';
    newObjectToSend.numTwo = '';
    operationType = '';
    let el = $('#entryField')
    el.empty()
    $( ".operationType" ).removeAttr('style') 
}

function getPastCalculations(){
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ) {
        console.log('Back from server with:', response );
        let el = $("#listOfPastCalculations")
        el.empty()
        if (response.length > 0){
            for (let i = 0; i < response.length; i++) {
                if( i<=10){
                    el.append(`<li style="font-size: 16px">${response[i].numOne} 
                    ${response[i].operation} 
                    ${response[i].numTwo} = 
                    <b>${response[i].answer}</b></li>`)
                }
            }; // end for loop
            $( '#calcAnswer' ).empty()
            $( '#calcAnswer' ).append(` ${response[0].numOne} 
            ${response[0].operation} 
            ${response[0].numTwo} = 
            <b>${response[0].answer}</b>`)
            let el2 = $('#entryField')
            el2.append(response[0].answer)
            lastAnswer = response[0].answer
        }  // end if  
    }).catch( function( err ){
        alert('There was an error');
        console.log('The error was:', err );
    })
} // end getPastCalculations function

function performCalculation(){
    let el = $('#entryField')
    if (newObjectToSend.numOne.length > 0 && el[0].innerText.length > 0) {
        newObjectToSend.numTwo = el[0].innerText
        el.empty();
    }
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
        equalsButtonLastClick = true;
        getPastCalculations();
    }).catch( function ( err ) {
        alert( 'There was a caluation error')
        console.log('Error with caluation:', err );
    })
    clearData();
    } // end else
}

function setOperation() {
    newObjectToSend.operation = $( this ).data( 'id' )
    $( '.operationType').removeAttr('style');
    $( this ).css ('background-color', 'rgb(111, 125, 164)');
    $( this ).css ('color', 'white');
    let el = $('#entryField')
    if (newObjectToSend.numOne === '') {
        newObjectToSend.numOne = el[0].innerText
        el.empty();
    }
} // end setOperation

function insertNumber() {
    let el = $('#entryField')
    let el2 = el[0].innerText
    let dotCounter = 0;
    for (let i = 0; i < el2.length; i++) {
        if(el2[i] === '.') {
            dotCounter++
        } // end if
    } // end for
    console.log(dotCounter);
    if(el2 == lastAnswer && equalsButtonLastClick === true){
        el.empty()
        equalsButtonLastClick = false
        if($( this ).data( 'id' ) === '.' && dotCounter === 0 ){ 
            let nextNum = $(this).val();
            el.append(nextNum)
        } // end if
        else if($( this ).data( 'id' ) != '.'){
            let nextNum = $(this).val();
            el.append(nextNum)
        } // end if
    }
    else{
        if($( this ).data( 'id' ) === '.' && dotCounter === 0 ){ 
            let nextNum = $(this).val();
            el.append(nextNum)
        } // end if
        else if($( this ).data( 'id' ) != '.'){
            let nextNum = $(this).val();
            el.append(nextNum)
        } // end if
    }
} // insertNumber function