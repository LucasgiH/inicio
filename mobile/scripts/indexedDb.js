	let db, dataList, inputVac, loteform;
const dbName='myDB', storeName='lote';

const deleteDb=function(event){
var req = indexedDB.deleteDatabase(dbName); 
req.onsuccess = function () { alert("Deleted database successfully"); };
 req.onerror = function () { alert("Couldn't delete database"); };
req.onblocked = function () { alert("Couldn't delete database due to the operation being blocked"); };
}

const addData=function(event){
 //simple comportament blocked
event.preventDefault();
 const transactionAdd=db.transaction([storeName], 'readwrite');
 const objectStore=transactionAdd.objectStore(storeName);
alert(inputVac.value);
 const newLote={
  vacina: inputVac.value,
  fabricante: '',
  qtd: ''
 }
 const request=objectStore.add(newLote);
transactionAdd.oncomplete=function(event){
alert('transaction completed', event);
}
transactionAdd.onerror=function(event){
alert('transaction failed', event);
}
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
 const newLote={
 	estado:'rr',
  vacina: '',
  fabricante: '',
  qtd: '1000'
 }
 const request=objectStore.add(newLote);
transactionAdd.oncomplete=function(event){
alert('transaction completed', event);
}
transactionAdd.onerror=function(event){
alert('transaction failed', event);
}}

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
objectStore.createIndex('qtd', 'qtd',{unique: false});
alert('upgrade', event);
}
}else{
alert('n foi');}
}
document.addEventListener("DOMContentLoaded", function() { 
dataList=document.getElementById('data-list');
inputVac=document.getElementById('vac');
loteform=document.getElementById('loteform');
loteform.onsubmit=addData;
createDB();
 });

