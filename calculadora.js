'use strict'

var params = process.argv.slice(2);



var numero1 = parseFloat(params[0]);


var numero2 = parseFloat(params[1]);


var plantilla = `
la suma es :${numero1+numero2}
la resta es :${numero1-numero2}
la multi es :${numero1*numero2}
la div es :${numero1/numero2}
`;

console.log(plantilla);

console.log('hola con nodejs');

