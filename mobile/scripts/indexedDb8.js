	let db, dataList, inputVac, loteform;
const dbName='myDB', storeName='lote';
const allEst=document.querySelectorAll("a>title");

const deleteDb=function(event){
var req = indexedDB.deleteDatabase(dbName); 
req.onsuccess = function () { alert("Deleted database successfully"); };
 req.onerror = function () { alert("Couldn't delete database"); };
req.onblocked = function () { alert("Couldn't delete database due to the operation being blocked"); };
document.location.reload(true);
}

const addData=function(event){
 //simple comportament blocked
event.preventDefault();
if(nameEst.innerHTML!="Escolha um Estado"){
 const transactionAdd=db.transaction([storeName], 'readwrite');
 const objectStore=transactionAdd.objectStore(storeName);
 const newLote={
 	estado: nameEst.innerHTML,
  vacina: inputVac.value,
  fabricante: '',
  qtd: inputQtd.value
 }
 const request=objectStore.add(newLote);
transactionAdd.oncomplete=function(event){
alert('transaction completed', event);
}
transactionAdd.onerror=function(event){
	
	try{
		allEst.forEach(function(item, index) {
// alert(index + ": " + item.innerHTML);
 if(item.innerHTML==nameEst.innerHTML){
 	
 	
		 //Abrindo a transação com a object store "contato"
var transaction = db.transaction(storeName, "readwrite");

// Quando a transação é executada com sucesso
transaction.oncomplete = function(event) {
    alert('Transação finalizada com sucesso.');
};

// Quando ocorre algum erro na transação
transaction.onerror = function(event) {
    alert('Transação finalizada com erro. Erro: ' + event.target.error);
};

//Recuperando a object store para alterar o registro
var store = transaction.objectStore(storeName);

//Recuperando um contato pela chave primaria
var request = store.get(index+1)

//quando ocorrer um erro ao buscar o registro
request.onerror = function (event) {
    alert('Ocorreu um erro ao buscar o contato.');
};

//quando o registro for encontrado com sucesso
request.onsuccess = function (event) {
	/*var box = document.getElementById('doses'); 
	
Array.from(document.querySelector("#doses").options).forEach(function(item, index) {
	alert(item.value)
		});*/
	var contato = event.target.result;
	var box = document.getElementById('doses'); 
	switch(box.options[box.selectedIndex].value){
		case '3':
		contato.dose3 = parseInt(contato.dose3)+ parseInt(inputQtd.value);
		break;
		case '2':
		contato.dose2= parseInt(contato.dose2)+ parseInt(inputQtd.value);
		break;
		case '1':
		contato.dose1= parseInt(contato.dose1)+ parseInt(inputQtd.value);
		break;
		}
    
    contato.dtAtual=new Date();
    //Atualizando o registro no banco
    var requestUpdate = store.put(contato);

    //quando ocorrer erro ao atualizar o registro
    requestUpdate.onerror = function (event) {
        alert('Ocorreu um erro ao salvar o contato.');
    };

    //quando o registro for atualizado com sucesso
    requestUpdate.onsuccess = function (event) {
        alert('Contato salvo com sucesso.');
    };
};
throw "acho"+index;
 	}
});}catch(e){
	alert(e)
	}
		
alert('transaction failed', event);

}
}//end if
}

const displayData=function(){
	dataList.innerHTML="";
	let transactionDisplay=db.transaction([storeName], "readwrite");
	let objectStore=transactionDisplay.objectStore(storeName);
	objectStore.openCursor().onsuccess=function(event){
		const cursor = event.target.result;
		//alert(cursor);
		if(cursor){
			const listItem=document.createElement('li');
			const textItem=`estado: ${cursor.value.estado} - imunizados: ${cursor.value.qtd} - ${cursor.value.id}`;
			listItem.textContent=textItem;
			dataList.appendChild(listItem);
			cursor.continue();
			}
		}
}

const updateEstado = function(event){
	//event.preventDefault();
 const transactionAdd=db.transaction([storeName], 'readwrite');
 const objectStore=transactionAdd.objectStore(storeName);
//alert(inputVac.value);
 
		allEst.forEach(function(item, index) {
			if(index<12){
// alert(index + ": " + item.innerHTML);
 const newLote={
 	estado:item.innerHTML,
  vacina: '',
  fabricante: '',
  qtd: '0',
  popTt:'0',
  dose2:'0',
  dose1:'0',
  dtAtual:'',
  dose3:'0'
 }
 switch(item.innerHTML){
					case 'Roraima':
					newLote.popTt=66000;
					newLote.dose3=9000;
					newLote.dose2=5000;
					newLote.dose1=3000;
					break;
					}
 const request=objectStore.add(newLote);
transactionAdd.oncomplete=function(event){
alert('transaction completed', event);
}
transactionAdd.onerror=function(event){
//alert('transaction failed', event);
}
}//end if
});
}

const createDB = function(){
if(window.indexedDB){
//alert('foi');
const request=window.indexedDB.open(dbName, 1);
request.onsuccess=function(event){
//alert('sucesso', event);
db=request.result;
updateEstado();
displayData();
}
request.onerror=function(event){
alert('erro', event);
}
request.onupgradeneeded=function(event){
db=event.target.result;

const objectStore=db.createObjectStore(storeName,{
keyPath: 'id',
autoIncrement: true
});
objectStore.createIndex('estado', 'estado',{unique: true});
objectStore.createIndex('vacina', 'vacina',{unique: false});
objectStore.createIndex('fabricante', 'fabricante',{unique: false});
objectStore.createIndex('dose3', 'dose3',{unique: false});
objectStore.createIndex('dose2', 'dose2',{unique: false});
objectStore.createIndex('dtAtual', 'dtAtual',{unique: false});
objectStore.createIndex('qtd', 'qtd',{unique: false});
alert('upgrade', event);
}
}else{
alert('n foi');}
}
document.addEventListener("DOMContentLoaded", function() { 
dataList=document.getElementById('data-list');
inputVac=document.getElementById('vac');
nameEst=document.getElementById('ancora');
inputQtd=document.getElementById('qtd');
loteform=document.getElementById('loteform');
loteform.onsubmit=addData;
createDB();
 });
