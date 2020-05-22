export const verifycationDUI = (DUI) => {
    if(DUI){
        const regex = /(^\d{8})-(\d$)/;
        const splitDUI = DUI.match(regex);
  
        if(splitDUI !== null) {
            const objDUI = {
            digits: splitDUI[1],
            check_digit: parseInt(splitDUI[2])
            };
    
            let sum = 0;
    
            for(let i = 0; i < objDUI.digits.length; i++){
            let curatedDigits = parseInt(objDUI.digits[i], 10);
            sum += (( 9 - i ) * curatedDigits);
            }
    
            const division = ( sum % 10 );
            const subtraction = 10 - division;
    
            if(objDUI.check_digit === (subtraction % 10)){
                return true;
            } else{
                return false;
            }
        } else {
          return false;
        }
      } else {
        return false;
      }
};

export const verifycationNIT = (cadena) => {
    if(cadena){
        let calculo = 0;//Variable para llevar el control de la suma del algoritmo
        let digitos = (cadena.substring(12, 15));//Tomamos los digitos que estan entre la posicion 12 y 15
        let resultado;
        
        if ( digitos <= 100 ) {//Verificamos que estos digitos sean menores o iguales a 100
            
            for ( let posicion = 0; posicion <= 14; posicion++ ) {//Ciclo que nos ayuda a ir aumentando la posicion que se utiliza posteriormente en el algoritmo
                
                if ( !( posicion === 4 || posicion === 11 ) ){
                    
                    calculo += ( 14 * parseInt( parseInt( cadena.charAt( posicion ), 36 ) ) );
                
                }//Si la posicion no es 4 ni 11 (que son los guiones) se ejecuta esta operacion
                
                calculo = calculo % 11;//Al calculo se le va sacando el modular de 11
            
            }
            
        } else {
            
            let n = 1;//Variable contadora
            
            for ( let posicion = 0; posicion <= 14; posicion++ ){//Ciclo que nos ayuda a ir aumentando la posicion que se utiliza posteriormente en el algoritmo
                
                if ( !( posicion === 4 || posicion === 11 ) ){
                    
                    calculo =  parseInt( calculo + ( ( parseInt( cadena.charAt( posicion ), 36 ) ) * ( ( 3 + 6 * Math.floor( Math.abs( ( n + 4) / 6 ) ) ) - n ) ) );
                    n++;
                
                }//Si la posicion no es 4 ni 11 (que son los guiones) se ejecuta esta operacion
            
            }
            
            calculo = calculo % 11;//sacamos el modular 11 de calculo
            
            if ( calculo > 1 ){
            
                calculo = 11 - calculo;//Si el resultado nos da mayor a uno se le resta a 11 esta respuesta
            
            } else {
                
                calculo = 0;//Sino el calculo lo hacemos 0
            
            }
        }
        
        resultado = (calculo ===  parseInt( parseInt( cadena.charAt( 16 ) , 36 ) ) ); //Verificamos si el calculo es direfente del resultado de nuestro algoritmo, si lo es entonces es falso

        if(resultado) { //enviamos el resultado
            return true;
        } else {
            return false;
        }
      } else {
        return false;
      }
};
  