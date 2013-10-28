


var distanciaBetwen=getPXbyPercentage(80)/5;

var rango1=distanciaBetwen*1;
var rango2=distanciaBetwen*2;
var rango3=distanciaBetwen*3;
var rango4=distanciaBetwen*4;


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#dbbd7a";
ctx.fill();

var ctx2 = canvas.getContext("2d");
ctx2.fillStyle = "#dbbd7a";
ctx2.fill();

var ctx3 = canvas.getContext("2d");
ctx3.fillStyle = "#dbbd7a";
ctx3.fill();

var ctx4 = canvas.getContext("2d");
ctx4.fillStyle = "#dbbd7a";
ctx4.fill();

var fps = 60;
var n = 1;
var n2 = 1;
var n3 = 1;
var n4 = 1;

var cnt=0;

var data1=Array();
var data2=Array();
var data3=Array();
var data4=Array();


var pico1=30;
var pico2=20;

//var rango1=300;

for(var i=0;i<700;i++){
	cnt++;
	if(cnt<=50){
		data1.push(rango1);
		data2.push(rango2);
		data3.push(rango3);
		data4.push(rango4);
	}
	if(cnt>50){
		data1.push(getRandomArbitrary(rango1-pico1,rango1+pico2));
		data2.push(getRandomArbitrary(rango2-pico1,rango2+pico2));
		data3.push(getRandomArbitrary(rango3-pico1,rango3+pico2));
		data4.push(getRandomArbitrary(rango4-pico1,rango4+pico2));
	}
	if(cnt==60){
		cnt=0;
	}
}

//rojo amarillo verde celeste


function drawWave() {
    setTimeout(function() {
        requestAnimationFrame(drawWave);
        

        
        // Drawing code goes here
        n += 1;
        n2+=1;
        n3+=1;
        n4+=1;
        if (n >= data1.length) {
            n = 1;
            n2=1;
            n3=1;
            n4=1;
        }

        ctx.lineWidth = "2";
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(n - 1, data1[n - 1]);
        ctx.lineTo(n, data1[n]);
        ctx.stroke();
        ctx.clearRect(n+1, 0, 10, canvas.height);


        ctx2.lineWidth = "2";
        ctx2.strokeStyle = 'yellow';
        ctx2.beginPath();
        ctx2.moveTo(n2 - 1, data2[n2 - 1]);
        ctx2.lineTo(n2, data2[n2]);
        ctx2.stroke();
        ctx2.clearRect(n+1, 0, 10, canvas.height);

        ctx3.lineWidth = "2";
        ctx3.strokeStyle = 'green';
        ctx3.beginPath();
        ctx3.moveTo(n3 - 1, data3[n3 - 1]);
        ctx3.lineTo(n3, data3[n3]);
        ctx3.stroke();
        ctx3.clearRect(n+1, 0, 10, canvas.height);

        ctx4.lineWidth = "2";
        ctx4.strokeStyle = 'blue';
        ctx4.beginPath();
        ctx4.moveTo(n4 - 1, data4[n4 - 1]);
        ctx4.lineTo(n4, data4[n4]);
        ctx4.stroke();
        ctx4.clearRect(n+1, 0, 10, canvas.height);

    }, 1000 / fps);






}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



function getPXbyPercentage(_percent){
	return (_percent*$(window).height())/100;
}



function gotoPage2(){
	$('.formulario').hide();
	$('.console').show();
	//drawWave();

	$('#snombre').html($('#nombre').val());
	$('#sedad').html($('#edad').val());
	$('#ssexo').html($('#sexo').val());
	$('#spresion').html($('#presion').val());
}

function gotoPage1(){
	$('.formulario').show();
	$('.console').hide();

	$('#nombre').val('');
	$('#edad').val('');
	$('#sexo').val('');
	$('#presion').val('');
}



$(document).ready(function(){
	//$('#canvas').width($(window).width()-($(window).width()/4));
	//$('#canvas').height($(window).height());

	$('#canvas').attr('width',$(window).width()-($(window).width()/4));
	$('#canvas').attr('height',getPXbyPercentage(80));
	
	$('.caption1').css('top',(rango1-18)+'px');
	$('.caption2').css('top',(rango2-18)+'px');
	$('.caption3').css('top',(rango3-18)+'px');
	$('.caption4').css('top',(rango4-18)+'px');

	


});











