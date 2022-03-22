function faz(estado){
	event.preventDefault();
	var target_offset = $("#ancora").offset();
	var target_top = target_offset.top;
	$('html, body').animate({ scrollTop: target_top }, 0);
	document.getElementById("ancora").innerHTML=estado;
	}