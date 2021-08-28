function pensionMensual()
{
    //EDAD
    var Edad= parseInt(document.getElementById("edad").value);
    
    //SEXO 
    var indice = document.getElementById("genero").selectedIndex ;
    var valueGenero=parseInt(document.getElementById("genero").options[indice].value);
    
    //SUELDO DISPONIBLE
    var sueldoDis= parseInt(document.getElementById("sueldoDis").value);

    //AFP
    var indice = document.getElementById("AFP").selectedIndex ;
    var valueAFP=parseInt(document.getElementById("AFP").options[indice].value);

    //FONDO
    var indice = document.getElementById("fondo").selectedIndex ;
    var valueFondo=parseInt(document.getElementById("fondo").options[indice].value);

    //SUELDO IMPONIBLE
    var sueldoIMP= parseInt(document.getElementById("sueldoImp").value);

    //PENSION ESPERADA
    var pensionEsp= parseInt(document.getElementById("PensionEs").value);
    //RENTABILIDAD DEPENDIENDO DEL FONDO Y LA AFP
    //rentabilidad[fondo][afp]
    var rentabilidad=[
        [6.49,6.48,6.58,7.85,6.13,6.56,7.17],
        [5.57,5.57,5.70,3.62,5.33,5.39,3.23],
        [7.67,7.98,7.99,-2.92,7.86,7.61,-3.57],
        [4.08,4.23,4.33,-8.10,3.70,3.85,-8.61],
        [3.98,4.16,4.14,-11.22,3.44,3.69,-11.79]
    ];
    
    if( Edad <= 0 || sueldoDis <= 0 || sueldoIMP <= 0 || pensionEsp < 0){
        alert('Error: No ingrese valores negativos');
    }else if(sueldoIMP >= "2440000"){
        alert('Error: El sueldo Imponible no puede superar los 2440000 Pesos.')
    }else{
        if (valueGenero==1){
            var edadJubilacion= 60;
            var esperanzaVida=82
        }else if(valueGenero==2){
            var edadJubilacion=65;
            var esperanzaVida=77; 
        }
        var pensionMensu = calculoPension(esperanzaVida
        ,edadJubilacion,sueldoDis,sueldoIMP,Edad,rentabilidad[valueFondo-1][valueAFP-1]);

        if(pensionMensu<pensionEsp){
            var apvv=calculoAPV(pensionEsp,pensionMensu,esperanzaVida,edadJubilacion,
                rentabilidad[valueFondo-1][valueAFP-1],Edad,sueldoDis);
            document.getElementById("pension").innerHTML=pensionMensu;
            document.getElementById("apv").innerHTML=apvv;
            if(apvv >= 1495000){
                alert("El monto apv supera el limite (1495000)");
            }

        }else{
            document.getElementById("pension").innerHTML=pensionMensu;
            document.getElementById("apv").innerHTML=0;
        }       
    }

    //document.write(opcion);
    //document.getElementById("pension").innerHTML=Edad;
}
/*
ej=edad jubilacion
ev=esperanza de vida
SD=sueldo disponible
SI=sueldo imponible
EA=edad actual
RA=rentabilidadFondo
PME=pension mensual esperada
*/
function calculoPension(ev,ej,SD,SI,EA,RA){
    var total=SD +(SI*0.1*12*(ej-EA)*(100+RA)*0.01);
    var mensual=total/((ev-ej)*12);
    return mensual;
}
function calculoAPV(PME,PM,EV,EJ,RA,EA,SD){
    var apv=((PME-PM)*(EV-EJ)*((100-RA)*0.01))/(EJ-EA);

    //var pEsperada = (12*PME*(EV-EJ)-SD)/(0.1*12*(EJ-EA)*(100+RA)*0.01);
    //var apv=pEsperada-PM;
    return apv;
}