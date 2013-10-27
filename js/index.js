/*
------------------------------------------------------------------------------------------------------------------
Estefania Pulgar
Maruri 2013
*/

	/*
	--------------------------------------------------------------------------------------------------------------
	consulto los eventos existentes
	--------------------------------------------------------------------------------------------------------------
	*/

	function consultar()	{  	
		var _mytipo = 1; 
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_eventos.php',
			type: "POST",
			cache: false,
			dataType: "json",
			data: "tipo="+_mytipo,
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						codigo = value.id;
						imagen = value.imagen;   
						document.getElementById('content2').innerHTML  += '<li><a href="#evento" onclick= infoEvento('+codigo+') data-transition="none" ><img src="http://198.211.103.18/miller/images/' + imagen + '" /></a></li>';
 					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});     
	}

	/*
	--------------------------------------------------------------------------------------------------------------
	muestro la info de los eventos
	--------------------------------------------------------------------------------------------------------------
	*/

	function infoEvento(datos){
		var _idEvento = datos; 
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/info_eventos.php',
			type: "POST",
			cache: false,
			dataType: "json",
			data: "evento="+_idEvento,
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						codigo = value.id;
						imagen = value.imagen;
						document.getElementById('infoEvento').innerHTML  = 
						'<div class="tituloEventoCss"><h2>' + MaysPrimera(value.nombre_evento) + '</h2></div><hr/><p>' + value.detalle_evento + '</p><hr/><p>' + value.fecha + '-' + value.hora + '</p><hr/><label for="flip-1"><span>Notificacion del evento</span></label><select name="flip-1" id="notificar" data-role="slider" data-theme ="e"><option value="no" data-theme ="e">No</option><option value="si" data-theme ="e">Si</option></select><p></p><a href="#home" data-role="button" data-inline="true" data-theme="e" id="btnXX" onclick="agregoEventoNotifica('+codigo+')" data-transition="none">Guardar</a>'; 
					});

				}              
			},
			error     : function(error){     
		      //alert(error);
		  }
		});     
	}

	/*
	--------------------------------------------------------------------------------------------------------------
	calendario
	--------------------------------------------------------------------------------------------------------------
	*/
	
	function calendario() {

		var jq = $.noConflict(); //importante
		var Event = function(text, className) {
			this.text = text;
			this.className = className;
		};

		var events = {};

		/*
		-----------------------
		TRAIGO LISTA DE EVENTOS
		-----------------------
		*/
		var _mytipo = 1; 
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_eventos.php',
			type: "POST",
			cache: false,
			dataType: "json",
			data: "tipo="+_mytipo,
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						fecha = value.fecha;   
						nombre= value.nombre_evento;

						events[new Date(fecha)] = new Event(nombre, "tintyellow");
						console.dir(events);

					});

					$("#datepicker").datepicker({
						beforeShowDay: function(date) {
							var event = events[date];
							if (event) {
								return [true, event.className, event.text];
							}
							else {
								return [true, '', ''];
							}
						}
					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});		 
	};



	/*
	--------------------------------------------------------------------------------------------------------------
	GUARDO CONFIGURACION
	--------------------------------------------------------------------------------------------------------------
	*/

	function initTodoList(){
		console.log("Entering initTodoList " + storage.length);
		for(var i = 0; i < storage.length; i++){
			var key = storage.key(i);
			var value = storage.getItem(key);
			createToDoListItem(key,value);
		}
	}  

	function createToDoListItem(key, value){
		
		if (localStorage.type) {
			$("#type").find("option[value=" + localStorage.type + "]").attr("selected", true);
		}
		if (localStorage.notificar) {
			$("#notificar").val(localStorage.notificar);
		}
		if (localStorage.ciudad) {
			$("#ciudad").val(localStorage.ciudad);
		}
		if (localStorage.sonido) {
			$("#sonido").val(localStorage.sonido);
		}
		if (localStorage.vibrar) {
			$("#vibrar").val(localStorage.vibrar);
		}
		if (localStorage.silencio) {
			$("#silencio").val(localStorage.silencio);
		}
	}

	function add_item(){
		console.log('Entering add_item');
		/*-----------------------------------------*/
		var key = 'notificar';
		var value = $('#notificar').val();
		storage.setItem(key,value);
		/*-----------------------------------------*/
		/*-----------------------------------------*/
		var key = 'ciudad';
		var value = $('#ciudad').val();
		storage.setItem(key,value);
		/*-----------------------------------------*/
		/*-----------------------------------------*/
		var key = 'sonido';
		var value = $('#sonido').val();
		storage.setItem(key,value);
		/*-----------------------------------------*/
		/*-----------------------------------------*/
		var key = 'vibrar';
		var value = $('#vibrar').val();
		storage.setItem(key,value);
		/*-----------------------------------------*/
		/*-----------------------------------------*/
		var key = 'silencio';
		var value = $('#silencio').val();
		storage.setItem(key,value);
		/*-----------------------------------------*/

		createToDoListItem(key,value);

		console.log('Exiting add_item');
	}

	function agregoEventoNotifica(datos){
		var _idEv = datos; 
				$.ajax({
					url: 'http://198.211.103.18/miller/actions/info_eventos.php',
					type: "POST",
					cache: false,
					dataType: "json",
					data: "evento="+_idEv,
					success: function(response){  
						if(response!=null && response!='' && response!='[]'){ 
							$.each(response,function(key,value){ 
								/*-----------------------------------------*/
								var key = 'evento'+value.id;
								var value = value.id;
								storage.setItem(key,value);
								/*
								//value.nombre_evento;     esto es el local
								var d = new Date(value.year, value.month, value.day, value.hour, value.minute);
								d.setMinutes(d.getMinutes()-10);  //-10 minutos de la hora

								window.plugins.localNotification.add({
								    fireDate        : Math.round(d.getTime()/1000 + 1),  //mas 1 segundo solo por gusto jajajj
								    alertBody       : value.nombre_evento,  // este se cambia por el nombre de l evento
								    action          : "View",
								    //repeatInterval  : "daily",
								    //soundName       : "beep.caf",
								    badge           : 0,
								    notificationId  : value.id,
								    foreground      : function(notificationId){ 
								        //alert("Hello World! This alert was triggered by notification " + notificationId); 
								        //alert(2);
								        goTo("#relog");
								        setTimeout(function(){
								        	goTo("#relog");
								        },1000);
								    },
								    background  : function(notificationId){
								        //alert("Hello World! This alert was triggered by notification " + notificationId);
								        //alert(1);
								        goTo("#relog");
								        setTimeout(function(){
								        	goTo("#relog");
								        },1000);
								    }           
								});
*/
								/*-----------------------------------------*/
							});
						}              
					},
					error     : function(error){     
				      //alert(error);
				  }
				});
	}

	/*
	-------------------------------------------------------------------------------------------------------------
	ciudad
	--------------------------------------------------------------------------------------------------------------
	*/

	function ciudadDropDown()	{  	
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_listaCiudades.php',
			type: "POST",
			cache: false,
			dataType: "json",
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						ciudad = value.nombre;   
						document.getElementById('ciudad').innerHTML  += '<option value='+ciudad+'>'+MaysPrimera(ciudad)+'</option>';
					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});     
	}

	/*
	-------------------------------------------------------------------------------------------------------------
	eventos
	--------------------------------------------------------------------------------------------------------------
	*/

	function eventosDropDown()	{  	
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_listaEventos.php',
			type: "POST",
			cache: false,
			dataType: "json",
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						evento = value.nombre;   
						document.getElementById('eventos').innerHTML  += '<label><input type="checkbox" name='+evento+' /> '+MaysPrimera(evento)+' </label>';
					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});     
	}


	/*
	-----------------------------------------------------------------------------------------------------------
	recursos
	-----------------------------------------------------------------------------------------------------------
	*/
	function MaysPrimera(string){ return string.charAt(0).toUpperCase() + string.slice(1); } 

	/*
	-----------------------------------------------------------------------------------------------------------
	Detectar Evento
	-----------------------------------------------------------------------------------------------------------
	*/

	function detectarEvento(){
		var data = $('#datepicker').val();
		//alert(data);
		var Event = function(text, className) {
			this.text = text;
			this.className = className;
		};

		var events = {};

		/*
		-----------------------
		TRAIGO LISTA DE EVENTOS
		-----------------------
		*/
		var _mytipo = 1; 

		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_eventos.php',
			type: "POST",
			cache: false,
			dataType: "json",
			data: "tipo="+_mytipo,
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						fecha = value.fecha;   
						nombre= value.nombre_evento;
						fecha = fecha.replace(/-/g,'/');
						if (data == fecha){
							//alert('hoy tenemos evento');
							document.getElementById('notaEvento').innerHTML  = '<div id="logoMiller"><img src="img/logo_miller.png"/></div><center><span class="tituloEventoCss">'+value.hora+'</span> - '+value.detalle_evento+'</center>';
						}
					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});
	}

	/*
	-----------------------------------------------------------------------------------------------------------
	Cronometro
	-----------------------------------------------------------------------------------------------------------
	*/
	
	var anioFinal = 2013 //año de la fecha
	var mesFinal = 12 //mes de la fecha
	var diaFinal = 25 //día de la fecha
	var mensajeInicio = "Faltan "

	mesFinal -= 1
	function faltan()
	{
		fechaFinal = new Date(anioFinal,mesFinal,diaFinal)
		fechaActual = new Date()
		diferencia = fechaFinal - fechaActual
		diferenciaSegundos = diferencia /1000
		diferenciaMinutos = diferenciaSegundos/60
		diferenciaHoras = diferenciaMinutos/60
		diferenciaDias = diferenciaHoras/24
		diferenciaHoras2 = parseInt(diferenciaHoras) - (parseInt(diferenciaDias) *24)
		diferenciaMinutos2 = parseInt(diferenciaMinutos) - (parseInt(diferenciaHoras) * 60)
		diferenciaSegundos2 = parseInt(diferenciaSegundos) - (parseInt(diferenciaMinutos) * 60)
		diferenciaDias = parseInt(diferenciaDias)
		if (diferenciaDias < 10 && diferenciaDias > -1){diferenciaDias = "0" + diferenciaDias}
			if(diferenciaHoras2 < 10 && diferenciaHoras2 > -1){diferenciaHoras2 = "0" + diferenciaHoras2}
				if(diferenciaMinutos2 < 10 && diferenciaMinutos2 > -1){diferenciaMinutos2 = "0" + diferenciaMinutos2}
					if(diferenciaSegundos2 < 10 && diferenciaSegundos2 > -1){diferenciaSegundos2 = "0" + diferenciaSegundos2}
						if(diferenciaDias <= 0 && diferenciaHoras2<= 0 && diferenciaMinutos2 <= 0 && diferenciaSegundos2 <= 0)
						{
							diferenciaDias = 0
							diferenciaHoras2 = 0
							diferenciaMinutos2 = 0
							diferenciaSegundos2 = 0
							document.getElementById('crono').innerHTML = mensajeInicio + diferenciaDias + " días, " + diferenciaHoras2 + " : " + diferenciaMinutos2 + " : " + diferenciaSegundos2  
						}
						else{
							document.getElementById('crono').innerHTML = mensajeInicio + diferenciaDias + " días, " + diferenciaHoras2 + " : " + diferenciaMinutos2 + " : " + diferenciaSegundos2  
							setTimeout('faltan()',1000)
						}
					}
	/*
	-----------------------------------------------------------------------------------------------------------
	Bares y Discotecas
	-----------------------------------------------------------------------------------------------------------
	*/					
	
	function bares()	{  	
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_listaDisco.php',
			type: "POST",
			cache: false,
			dataType: "json",
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 
						codigo = value.indice
						bar = value.nombre;   
						document.getElementById('baresDiscos').innerHTML  += '<a href="#eventos-on-discos" data-transition="none" onclick= consultaBares('+codigo+')><li>'+bar+'<span class="icoFlecha"></span></li></a>'; 

					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});     
	}

	/*
	--------------------------------------------------------------------------------------------------------------
	consulto los eventos existentes
	--------------------------------------------------------------------------------------------------------------
	*/

	function consultaBares(response){  	
		var _bares = response;
		document.getElementById('contentBares').innerHTML = '';
		$.ajax({
			url: 'http://198.211.103.18/miller/actions/m_bares.php',
			type: "POST",
			cache: false,
			dataType: "json",
			data: "bares="+_bares,
			success: function(response){  
				if(response!=null && response!='' && response!='[]'){ 
					$.each(response,function(key,value){ 	
						nombre = value.nombre_evento;
						detalle = value.detalle_evento;					
						imagen = value.imagen;   
						document.getElementById('contentBares').innerHTML += '<div><a href="#evento" data-transition="none"><img src="http://198.211.103.18/miller/images/' + imagen + '" width="85%" /></a><p>'+detalle+'<br/><span class="tituloEventoCss">'+nombre+'</span></p></div>'; 
					});
				}              
			},
			error : function(error){     
		      //alert(error);
		  }
		});     
	}

	/*
	----------------------------------------------------------------------------------------------
	RELOJ
	----------------------------------------------------------------------------------------------
	*/

function drawHands(){
    var canvas = document.getElementById('world');
    var ctx = canvas.getContext('2d');
    
    var x=200;
    var y=200;
    var r=x*0.95;

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    
    ctx.clearRect(0,0,400,400);
   
    //draw background
    ctx.save();
    ctx.translate(x,y);
    var grad = ctx.createLinearGradient(-r,r,r,-r);
    grad.addColorStop(0,'rgb(140,68,0)');
    grad.addColorStop(0.5,'rgb(252,236,87)');
    grad.addColorStop(1,'rgb(140,68,0)');
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(0,0,r,0,Math.PI*2,false);
    ctx.fill();
    
    grad = ctx.createLinearGradient(-r,-r,r,r);
    grad.addColorStop(0,'rgb(252,236,87)');
    grad.addColorStop(0.5,'rgb(140,68,0)');
    grad.addColorStop(1,'rgb(252,236,87)');
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(0,0,r*0.85,0,Math.PI*2,false);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = '#4F4536';
    ctx.arc(0,0,r*0.8,0,Math.PI*2,false);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = '#3C352D';
    ctx.arc(0,0,r*0.4,0,Math.PI*2,false);
    ctx.fill();
    ctx.restore();
    
    //draw index
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = '#FFD629';
    for(var i=0;i<12;i++){
        ctx.rotate(Math.PI/6);
        ctx.fillRect(-r*0.04/2,-r*0.75,r*0.04,r*0.2);        
    }
    ctx.restore();
    
    //draw text
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = 'black';
    ctx.font = (r*0.45/5)+"px serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    //ctx.fillText('TIMEpunch',0,r*0.45);
    ctx.restore();
    
    //draw hour hand
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();
    ctx.rotate((h/12+m/12/60)*2*Math.PI);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = r*0.02;
    ctx.moveTo(0,0);
    ctx.lineTo(0,-r*0.4);
    ctx.stroke();
    ctx.restore();
    
    //draw minute hand
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(m*2*Math.PI/60);
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = r*0.02;
    ctx.moveTo(0,0);
    ctx.lineTo(0,-r*0.6);
    ctx.stroke();
    ctx.restore();
    
    //draw second hand
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();
    ctx.rotate(s*2*Math.PI/60);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = r*0.01;
    ctx.moveTo(0,r*0.1);
    ctx.lineTo(0,-r*0.7);
    ctx.stroke();
    ctx.restore();
    
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(0,0,r*0.02,0,Math.PI*2,false);
    ctx.fill();
    ctx.restore();
}


