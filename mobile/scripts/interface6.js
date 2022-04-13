
function faz(estado, key){
	event.preventDefault();
	var target_offset = $("#ancora").offset();
	var target_top = target_offset.top;
	$('html, body').animate({ scrollTop: target_top }, 0);
	document.getElementById("ancora").innerHTML=estado;
	
	const tab=document.querySelectorAll("td>span");
	
	var transaction = db.transaction(storeName, "readwrite");
var store = transaction.objectStore(storeName);

var request = store.get(key)
request.onsuccess = function (event) {
    var inf = event.target.result;
    tab[0].innerHTML=inf.resto;
   tab[1].innerHTML=inf.popTt;
   tab[2].innerHTML=inf.qtd3;
   tab[3].innerHTML=inf.qtd2;
   tab[4].innerHTML=inf.qtd;   
   var data = new Date();

tab[5].innerHTML=data;
}
}
	
document.addEventListener("DOMContentLoaded", function() { 
	const alltitle=document.querySelectorAll("g>a");
	//alert(allEst[0].innerHTML)
		alltitle.forEach(function(item, index) {
			if(index<12){
// alert(index + ": " + item);
 item.addEventListener("click", function(){faz(allEst[index].innerHTML,index+1);
});
}
});
});
 
/* Function modified from Adrian Roselli's article, A Responsive Accessible Table, http://adrianroselli.com/2017/11/a-responsive-accessible-table.html
*/
function cellHeaders(tableId) {
  try {
    let thArray = [];
    const table = document.getElementById(tableId);
    const headers = table.getElementsByTagName('th');
    for (let i = 0; i < headers.length; i++) {
      const headingText = headers[i].innerHTML;
      thArray.push(headingText);
    }
    const styleElm = document.createElement('style');
    let styleSheet;
    document.head.appendChild(styleElm);
    styleSheet = styleElm.sheet;
    for (let i = 0; i < thArray.length; i++) {
      styleSheet.insertRule(
        '#' +
          tableId +
          ' td:nth-child(' +
          (i + 1) +
          ')::before {content:"' +
          thArray[i] +
          ': ";}',
        styleSheet.cssRules.length
      );
    }
  } catch (err) {
    console.log('cellHeaders(): ' + err);
  }
}
cellHeaders('respTable');



 
 
 /* let btn_element = document.getElementById("btn"); 

  

        btn_element.addEventListener("click", () => { 

            document.getElementById("text1") 

                .innerHTML = "Task 1 is performed"; 

        }) 

  

        btn_element.addEventListener("click", () => { 

            document.getElementById("text2") 

                .innerHTML = "Task 2 is performed"; 

        }); */
 