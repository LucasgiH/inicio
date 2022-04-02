function faz(estado){
	event.preventDefault();
	var target_offset = $("#ancora").offset();
	var target_top = target_offset.top;
	$('html, body').animate({ scrollTop: target_top }, 0);
	document.getElementById("ancora").innerHTML=estado;
	}
	
document.addEventListener("DOMContentLoaded", function() { 
	const alltitle=document.querySelectorAll("g>a");
	//alert(allEst[0].innerHTML)
		alltitle.forEach(function(item, index) {
			if(index<12){
// alert(index + ": " + item);
 item.addEventListener("click", function(){faz(allEst[index].innerHTML);
});
}
});
});
 
 /* let btn_element = document.getElementById("btn"); 

  

        btn_element.addEventListener("click", () => { 

            document.getElementById("text1") 

                .innerHTML = "Task 1 is performed"; 

        }) 

  

        btn_element.addEventListener("click", () => { 

            document.getElementById("text2") 

                .innerHTML = "Task 2 is performed"; 

        }); */
 