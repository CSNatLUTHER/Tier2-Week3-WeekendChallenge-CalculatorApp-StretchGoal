# Project Name

Tier2-Week3-WeekendChallenge-CalculatorApp

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).


Phase 0:
===

 - create server file directories
     - Server Folder (server.js, and Public Folder )
     - Public Folder (index.html, vendors, scripts, styles )
     - create client.js in scripts folder
     - create styles.css in styles folder
 - update index.html
     - link jquery, client.js and styles.css files
     - provide title and created header message
 - validate client.js and styles.css
     - link jquery and log in browser console
     - apply style in css and validate on DOM
 - update server.js file
     - REQUIRES, USES, GLOBAL VARIABLES, SPIN UP SERVER, ROUTES
 - Install Node/Express server
     - npm init
        - --y for default values
     - npm install express
     - update package.json file with "start" script
         - "start" : "node server/server.js"
 - Spin Up Server
     - npm start
     - validate server is up
 - Git Commit


Phase 1:

===

 - create layout, fields and buttons on index.html file [x]
     - add proper id's and classes where needed [x]
 - create array to hold objects of calculations on server.js [x]
 - create app.get function to send array of historical calculations on server.js [x]
 - create getPastCalculations fucntion using $.ajax GET call to request list of calculations [x]
 - display calucluations in a list on DOM [x]
 - add dummy data to array on server.js to test GET call [x]

Phase 2:
===

- create setOperation funciton to capture operation and update button css [x]
- create performCalculation function to capture inputs and send in object to server via Ajax [x]
- great app.put function on server.js to:
    - perform calculation [x]
    - push calculation and answer into pastCalculations array [x]
- update the getPastCalculations [x]
- create clearData funciton to empty inputs and reset global variables [x]
- clear the inputs and reset global variables [x]
- add error handling for operations and input values [x]

Phase 3: Stretch Goals
===

- create html layout and style to create look and feel of calculator
    - table to hold buttons for numeric digits, operators and clear (and all clear?) button [x]
    - long row in table to show active calculation inputs and display answer [x]
    - long row in table to show progress of calculation [x]
    - a styled repository to show past calculations [x]
- move operation button funcitons to new calculator layout [x]
- move clear button to calculator layout [x]
- move calculate (equals) button to calculator layout [x]
- target number buttons and make them populate the display in the #entryField <td> 
    - populate first number and then capture in object at time of operation selection [x]
        - clear #entryField when operation is selected [x]
        - update 'LastAnswer' with first number and operation
    - populate second number and then capture in object at time of calculation [x]






