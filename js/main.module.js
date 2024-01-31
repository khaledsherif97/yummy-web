"use strict"
$('.side-nav i').click(function(){
    const left_ =$('.side-nav-inner').innerWidth();
    if($('.side-nav').css('left') == '0px' ){
        $('.side-nav').css('left',-left_)

    }else{
       $('.side-nav').css('left',0)
     
    }
   
})

//hooomee
let rowHome = document.getElementById('rowHome');
let detils = document.getElementById('detils');

async function showdata(){
  let mealsdata = await getCategories()
  
  displayMeals(mealsdata)
}

showdata()


//////////////////////////////////////Categories/////////////////////////////////////////////////
async function getCategories() {
    rowHome.innerHTML = "";
   
    $("#loading").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    //console.log(response);
    displayCategories(response.categories)
    $("#loading").fadeOut(500)
  
  }


  function displayCategories(arr) {
    let cartoona = "";
  
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div onclick="getCategoryMeals('${arr[i].strCategory}')"  class="col-lg-3 col-12 position-relative item overflow-hidden">
        <img  src="${arr[i].strCategoryThumb}" class="w-100 rounded-3 h-100 bg-black ">
        <div  class=" bg-danger-subtle h-100 rounded-3 textMeal opacity-75 " >
         <span  class="d-flex justify-content-center align-items-center text-black fs-4 fw-bold pt-2">${arr[i].strCategory}</span>
         <p class="d-flex justify-content-center align-items-center text-black fs-4 ">${arr[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
        </div>

        </div>`
    }
  
    rowHome.innerHTML = cartoona
  }


  async function getCategoryMeals(category) {
    rowHome.innerHTML = ""
    $("#loading").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    //console.log(response);
  
    displayMeals(response.meals)
    $("#loading").fadeOut(500)
  
  }

  function displayMeals(arr) {
    let cartoona = "";
  
    for (let i = 0; i < arr.length; i++) {
        cartoona += 
        `<div onclick="getMealDetails('${arr[i].idMeal}')" class="col-lg-3 col-12 position-relative item overflow-hidden">
        <img  src="${arr[i].strMealThumb}" class="w-100 rounded-3 h-100 bg-black ">
        <div  class=" bg-danger-subtle h-100 rounded-3 textMeal opacity-75 " >
         <span  class="d-flex justify-content-center align-items-center text-black fs-4 fw-bold pt-2">${arr[i].strMeal}</span>
        </div>

        </div>

        `
    }
  
    rowHome.innerHTML = cartoona
  }

  async function getMealDetails(mealID) {
   
    rowHome.innerHTML = ""
    $("#loading").fadeIn(500)
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();
    
    displayMealDetails(response.meals[0])
    $("#loading").fadeOut(500)
  
  
  }

  function displayMealDetails(meal) {
  
  let cartoona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2 class="text-white">Instructions</h2>
              <p class="text-white">${meal.strInstructions}</p>
              <h3><span class="fw-bolder text-white">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder text-white">Category : </span>${meal.strCategory}</h3>
              <h3 class="text-white">Recipes :</h3>
             

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`

  rowHome.innerHTML = cartoona
}

//////////////////////////////////////areas/////////////////////////////////////////////////

async function getArea() {
  rowHome.innerHTML = ""
  $("#loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  displayArea(response.meals)
  $("#loading").fadeOut(500)
  

}


function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center text-white cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${arr[i].strArea}</h3>
              </div>
      </div>
      `
  }

  rowHome.innerHTML = cartoona
}

async function getAreaMeals(area) {
  rowHome.innerHTML = ""
  
  $("#loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()

  displayMeals(response.meals)
  $("#loading").fadeOut(500)

}
//////////////////////////////////////Ingredients/////////////////////////////////////////////////
async function getIngredients() {
  rowHome.innerHTML = ""
  $("#loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()

  displayIngredients(response.meals)
  $("#loading").fadeOut(500)
 

}


function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center text-white pt-4  cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x "></i>
                      <h3>${arr[i].strIngredient}</h3>
                      
              </div>
      </div>
      `
  }

  rowHome.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
  rowHome.innerHTML = ""
  $("#loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()


  displayMeals(response.meals)
  $("#loading").fadeOut(500)
}
///////////////////////////////////////////search////////////////////////////////////////
let searchInput = document.getElementById('searchInput')
function showSearchInputs() {
  let searchContainer=""
  searchContainer = `
  <div class="row py-4 ">
      <div class="col-md-6  ">
          <input id="searchInput" class="form-control bg-white text-black" type="text" placeholder="Search By Name">
          <button  id="submit" class="btn-dark rounded-pill py-2 px-5 mt-3"> search</button>
      </div>
      <div class="col-md-6">
          <input  maxlength="1" class="form-control bg-white text-black" type="text" placeholder="Search By First Letter">
          <button  id="submit2" class="btn-dark rounded-pill py-2 px-5 mt-3"> search</button>
      </div>
  </div>`

  rowHome.innerHTML = searchContainer
}
async function searchByName(term) {
 
  rowHome.innerHTML = ""
  $("#loading").fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  response = await response.json()

   displayMeals(response.meals)
   $("#loading").fadeOut(500)

}

let submit = document.getElementById('submit')
 
 $('#submit').click(function(){
  searchByName(searchInput.value);
});
/////////////////////////////contact//////////////////
function showContact(){
  let cartoona=""
  document.getElementById("contact").classList.replace("d-none", "d-flex")
  
  rowHome.innerHTML = cartoona
}
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');

function validMail() {
  var x =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
  if (x.test(emailInput.value) === true) {
    return true;
  } else {
    return false;
  }
}
function valiPhone() {
  var xx =/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
  if (xx.test(phoneInput.value) === true) {
    return true;
  } else {
    return false;
  }
}

function sumbitInput(){
  if (valiPhone() === true){
    if (validMail() === true){
      showdata()
      
      }
     else{
      alert("pls enter valid email");
     
     }

    }
   else{
    alert("pls enter valid phone number");
   
   }
}

