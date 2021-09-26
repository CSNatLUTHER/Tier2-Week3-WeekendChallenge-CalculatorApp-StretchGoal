$( document ).ready ( onReady );

function onReady(){
    $( '#calculateAnswer' ).on ( 'click', performCalculation );
    $( '#clearValues' ).on ( 'click', clearData );
    $( '.operationType' ).on ( 'click', setOperation );
    $( '.clacButton').on ( 'click', insertNumber );
    $( '#clearHistory' ).on ( 'click', clearHistory );
    $( '#listOfPastCalculations' ).on( 'click', '.calcResponses', rerunCalculation )
    getPastCalculations();
}

let newObjectToSend = {
    numOne: '',
    operation: '',
    numTwo: ''
    }
let equalsButtonLastClick = false;
let lastAnswer = 0;
let lastCalculation = '';

function clearData(){
    let ti = $( '#clearValues').val()
    console.log(ti);
    if(ti === 'AC'){
        newObjectToSend.numOne = '';
        newObjectToSend.numTwo = '';
        operationType = '';
        let el = $('#entryField')
        let la = $('#calcAnswer')
        el.empty()
        la.empty()
        $( ".operationType" ).removeAttr('style')
    } // end if
    else if(ti === 'C'){
        let el = $('#entryField')
        let la = $('#calcAnswer')
        la.empty();
        el.empty();
        la.append(newObjectToSend.numOne)
        la.append(' ' + newObjectToSend.operation + ' ');
        $( '#clearValues').val( 'AC' )
    }
} // end clearData function

function clearHistory(){  
    if (confirm('Are you sure you want to delete all history? This cannot be undone.', true ) ){
        $.ajax({
            method: 'DELETE',
            url: '/calculations'
        }).then( function (response){
            console.log( 'back from DELETE with:', response )
            getPastCalculations();
        }).catch( function( err ){
            alert( 'There was an error. See console for details')
            console.log('DELETE error', err );
        })
    } // end if
} // end clearHistory funciton

function getPastCalculations(){
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ) {
        console.log('Back from server with:', response );
        let el = $("#listOfPastCalculations")
        el.empty()
        let calcCounter = 0;
        if (response.length > 0){
            for (let i = 0; i < response.length; i++) {
                if( i<=10){
                    el.append(`<li style="font-size: 16px" data-id="${calcCounter}" class="calcResponses"><u>${response[i].numOne} 
                    ${response[i].operation} 
                    ${response[i].numTwo} = 
                    <b>${response[i].answer}</b></u></li>`)
                    calcCounter++
                }
            }; // end for loop
            console.log('calcCounter:', calcCounter);
            let la = $( '#calcAnswer');
            la.empty()
            $( '#calcAnswer' ).append(` ${response[0].numOne} 
            ${response[0].operation} 
            ${response[0].numTwo} = 
            <b>${response[0].answer}</b>`)
            let el2 = $('#entryField')
            el2.empty();
            el2.append(response[0].answer)
            lastAnswer = response[0].answer
            lastCalculation = (`${response[0].numOne} ${response[0].operation} ${response[0].numTwo} = ${response[0].answer}`)
        }  // end if  
    }).catch( function( err ){
        alert('There was an error');
        console.log('The error was:', err );
    })
} // end getPastCalculations function

function insertNumber() {
    console.log('lastCalculation:', lastCalculation);
    let el = $('#entryField')
    let la = $('#lastCalculation')
    let ti = $('#calcAnswer')
    console.log('Last Cal Display:', la[0].innerText);
    console.log('lastCalculation:', lastCalculation);
    let el2 = el[0].innerText
    let dotCounter = 0;
    let nextNum = $(this).val();
    if (la[0].innerText === lastCalculation){
        ti.empty();
        el.empty();
    }
    for (let i = 0; i < el2.length; i++) {
        if(el2[i] === '.') {
            dotCounter++
        } // end if
    } // end for
    if(el2 == lastAnswer && equalsButtonLastClick === true){
        el.empty()
        ti.empty()
        equalsButtonLastClick = false
        if($( this ).data( 'id' ) === '.' && dotCounter === 0 ){ 
            el.append(nextNum)
            ti.append(nextNum)
            $( '#clearValues').val( 'C' );
        } // end if
        else if($( this ).data( 'id' ) != '.'){
            el.append(nextNum)
            ti.append(nextNum)
            $( '#clearValues').val( 'C' );
        } // end if
    }
    else{
        if($( this ).data( 'id' ) === '.' && dotCounter === 0 ){ 
            el.append(nextNum)
            ti.append(nextNum)
            $( '#clearValues').val( 'C' );
        } // end if
        else if($( this ).data( 'id' ) != '.'){
            el.append(nextNum)
            ti.append(nextNum)
            $( '#clearValues').val( 'C' );
        } // end if
    }
} // end insertNumber function

function performCalculation(){
    let el = $('#entryField')
    let la = $('#calcAnswer')
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
        console.log( 'back from POST', response );
        equalsButtonLastClick = true;
        la.empty();
        resetObjectToSend();
        getPastCalculations();
        clearData();  
    }).catch( function ( err ) {
        alert( 'There was a caluation error')
        console.log('Error with caluation:', err );
    })
    } // end else
} // end performCalculation funciton

function rerunCalculation(){
    let el = {id:$( this ).data( 'id' )}
    $.ajax({
        method: 'GET',
        url: '/rerunCalculations',
        data: el
    }).then( function (response ){
        let la = $('#entryField')
        la.empty();
        getPastCalculations();
    }).catch( function (err ){
        alert( 'There was an error. See console for details' )
        console.log( 'There was a rereunCalculation error:', err );
    })
}

function resetObjectToSend(){
    newObjectToSend.numOne = '';
    newObjectToSend.operation = '';
    newObjectToSend.numTwo = '';
    $( '#clearValues').val( 'AC' )
    $( ".operationType" ).removeAttr('style')
}
function setOperation() {
    let el = $('#entryField')
    let la = $('#calcAnswer')
    let ti = $('#lastCalculation')
    if (la[0].innerText === lastCalculation){
        console.log('innerText and lastCalculation Match');
    }
    else{
        for (let i = 0; i < la[0].innerText.length - 1; i++) {
            if (la[0].innerText[i] === '+' ||
                la[0].innerText[i] === '-' ||
                la[0].innerText[i] === '*' ||
                la[0].innerText[i] === '/' ){
                    alert( 'Only one operation per calculation allowed')
                    return;
            }  // end if (looking for operation characters)  
        } // end for loop
    } // end if "inner text check"
    
    newObjectToSend.operation = $( this ).data( 'id' )
    console.log($( this ).data())
    if (newObjectToSend.numOne === '') {
        newObjectToSend.numOne = el[0].innerText
        el.empty();
        $( '#clearValues').val( 'C' );
    }
    $( '.operationType').removeAttr('style');
    $( this ).css ('background-color', 'rgb(111, 125, 164)');
    $( this ).css ('color', 'white');
    if(la[0].innerText[la[0].innerText.length-1] === '+' ||
        la[0].innerText[la[0].innerText.length-1] === '-' ||
        la[0].innerText[la[0].innerText.length-1] === '*'||
        la[0].innerText[la[0].innerText.length-1] === '/'){
            la.empty()
            la.append(newObjectToSend.numOne)
            la.append(' ' + $( this ).data( 'id' ) + ' ');
            $( '#clearValues').val( 'C' );  
    }
    else{
        la.append(' ' + $( this ).data( 'id' ) + ' ')
        $( '#clearValues').val( 'C' );
    }
    
} // end setOperation
