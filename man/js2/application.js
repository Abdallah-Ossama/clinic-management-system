//set varibles
let named = document.getElementById("named");
let age = document.getElementById("age");
let area = document.getElementById("area");
let price = document.getElementById("price");
let numberPhone = document.getElementById("numberPhone");
let category = document.getElementById("category");
let data = document.getElementById("data");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByName = document.getElementById("searchByName");
let searchBycategory = document.getElementById("searchBycategory");
let searchMood = "name";
let test;
let countItem;
let moodBtn = "create";
//set varibles of chat 
let date = document.getElementById("dateValue");
let chatMasseges = document.getElementById("chatContainer");
let Massege ="";
let turn = "show";
let namePerson = "mohamed";
let dateArray = [];

//main code
//new array
let dataProduct;
if(localStorage.person != null){
    dataProduct=JSON.parse(localStorage.person);
}else{
    dataProduct=[];
}
//create new product or person
create.onclick = function(){
    let newProduct = {
        named:named.value.toLowerCase(),
        age:age.value,
        area:area.value,
        price:price.value,
        numberPhone:numberPhone.value,
        category:category.value.toLowerCase(),
        data:data.value,
    }
    if(moodBtn == "create"){
        if(newProduct.named != "" && newProduct.age !=""){
        dataProduct.push(newProduct);
        localStorage.setItem("person",JSON.stringify(dataProduct));
        clearInputs();
        readInputs();
        }else{
        window.alert("YOU SHOUD WRITE NAME AND AGE");
    }
    }else if(moodBtn =="update"){
        if(newProduct.named != "" && newProduct.age !=""){
            dataProduct[countItem] = newProduct;
            localStorage.setItem("person",JSON.stringify(dataProduct));
            clearInputs();
            readInputs();
            create.innerHTML = "Create";
            moodBtn = "create";
            // window.location.reload();
        }else{
        window.alert("YOU SHOUD WRITE NAME AND AGE");
        }

}
}
readInputs();
//chat massege open after relaod window

setTimeout(function(){
    if(Massege != ""){
        turn = "hidden";
        chatMasseges.innerHTML = `
        <div class="chat">
            <header>
            </header>
            <div id="container">
            ${Massege}
            </div>
        </div>
        `;
    }
},1250);

//Data alarm
dataProduct.forEach(element => {
let dateArrive = new Date(element.data).getTime();

let counter = setInterval(() => {

    let countDownDate = new Date().getTime();
    let dateDiff = Math.floor((dateArrive - countDownDate)/1000);
     if(dateDiff<1){
      clearInterval(counter);
      Massege +=`<div class="massege">
      <p>today there is a person named ${element.named}</p>
           </div>`;
      dateArray.push(Massege);
     }
     else if(countDownDate>dateArrive){
      clearInterval(counter);
     }
    let test = dateDiff;
    console.log(test);
  },1000)
});

//clear inputs
function clearInputs(){
    named.value = "";
    age.value = "";
    area.value ="";
    price.value = "";
    numberPhone.value = "";
    category.value = "";
    data.value = "";
}

//read
function readInputs(i){
    let table = "";
    for(let i = 0;dataProduct.length>i;i++){ 
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].named}</td>
                <td>${dataProduct[i].age}</td>
                <td>${dataProduct[i].area}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].numberPhone}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].data}</td>
                <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delet">Delete</button></td>
            </tr>
            ` 
    }
    document.getElementById("tbody").innerHTML = table;
}
//count products

searchBycategory.innerHTML += `(${dataProduct.length})`;
searchByName.innerHTML += `(${dataProduct.length})`;

//delete
function deleteItem(i){
    dataProduct.splice(i,1);
    localStorage.person = JSON.stringify(dataProduct);
    readInputs();
}
//search
function getSearchMood(id){
    if(id == "searchByName"){
        searchMood = "name";
    }else{
        searchMood ="category"  
    }
    search.placeholder = "Search By "+searchMood;
    search.focus();
    search.value ="";
    readInputs();
}
function searchData(value){
    let table ="";
    if(searchMood == "name"){
        for(let i = 0;dataProduct.length>i;i++){
           if(dataProduct[i].named.toLowerCase().includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].named}</td>
                <td>${dataProduct[i].age}</td>
                <td>${dataProduct[i].area}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].numberPhone}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].data}</td>
                <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delet">Delete</button></td>
            </tr>
            ` 
            }
        } 

    }
    else{
        for(let i = 0;dataProduct.length>i;i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
             table += `
             <tr>
                 <td>${i+1}</td>
                 <td>${dataProduct[i].named}</td>
                 <td>${dataProduct[i].age}</td>
                 <td>${dataProduct[i].area}</td>
                 <td>${dataProduct[i].price}</td>
                 <td>${dataProduct[i].numberPhone}</td>
                 <td>${dataProduct[i].category}</td>
                 <td>${dataProduct[i].data}</td>
                 <td><button onclick="updateDate(${i})" id="update">Update</button></td>
                 <td><button onclick="deleteItem(${i})" id="delet">Delete</button></td>
             </tr>
             ` 
             }
         } 
    }
    document.getElementById("tbody").innerHTML = table;
};

function chatImg(){
  if(turn === "show"){
  turn = "hidden";
  chatMasseges.innerHTML = `
  <div class="chat">
      <header>
      </header>
      <div id="container">
      ${Massege}
      </div>
  </div>
  `;
  }
  else{
    chatMasseges.innerHTML ="";
    turn = "show";
  }
}

//udate
function updateDate(i){
    named.value = dataProduct[i].named;
    age.value = dataProduct[i].age;
    area.value = dataProduct[i].area;
    price.value = dataProduct[i].price;
    numberPhone.value = dataProduct[i].numberPhone;
    category.value = dataProduct[i].category;
    data.value = dataProduct[i].data;
    create.innerHTML = "Update";
    moodBtn = "update";
    countItem = i;
    scroll({
        top:0,
        behavior:"smooth",
    });
    chatMasseges.innerHTML ="";
    turn = "show";
}