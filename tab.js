// localStorage.setItem('currentUser', 0);

var totalUser = [
  {
    name: "smith",
    age: 45,
  },
  {
    name: "sam",
    age: 12,
  },
  {
    name: "emma watson",
    age: 10,
  },
];

var food = [
  {
    name: "Chiken Butter Fly",
    imgUrl: "./assets/FoodItem1.png"
  },
  {
    name: "Fish kadi",
    imgUrl: "./assets/FoodItem2.png"
  },
  {
    name: "kitchen korma",
    imgUrl: "./assets/FoodItem3.png"
  }
];

var isLunchDinner = true;
let userLunch = "";
let userDinner = ""
var isAllergy = false;
var lunchIndex;
var dinnerIndex;
var allergyName;

function nextUser(event) {
  allergyName = document.getElementById("allergyName").value;
  let invalidInput = document.getElementById("inavlid-input");
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (isAllergy) {
    if (allergyName.length < 3) {
      invalidInput.innerText = "Invalid Input";
    } else {
      console.log("this is allergy section");
      // STORE ALLERGY IN LOCALSTORAGE
      localStorage.setItem(currentUser, allergyName);
      // GET LOCALSTORAGE DATA 
      var data = localStorage.getItem(currentUser);
      // console.log("total user: ");
      // console.log(currentUser);
      if (totalUser.length - 1 > currentUser) {
        let element = document.getElementById("userList");
        // element.childNodes[currentUser + 1].style.backgroundColor = "#f1f1f1";
        // element.childNodes[currentUser + 2].style.backgroundColor = "yellow";
        element.childNodes[currentUser + 1].classList.add("deactiveUser")
        element.childNodes[currentUser + 2].classList.add("activeUser")
        var index = currentUser + 1;
        document.getElementById('currentUser').innerText = totalUser[index].name;
        document.getElementById('currentCartUser').innerText = totalUser[index].name;
        localStorage.setItem('currentUser', JSON.stringify(index));
        document.getElementById('displayInput').style.display = "none";
        document.getElementById('slider').style.display = "block";
        document.getElementById('checkAllergy').checked = false;
        document.getElementById('allergyName').value = '';
        invalidInput.innerText = "";
        document.getElementById('lunch').style.color = "#FF2424";
        document.getElementById('dinner').style.color = "black";
        // console.log("lunch");
        isLunchDinner = true;
        isAllergy = false;

      } else {
        document.getElementById("confirm-lunch-data").innerText = food[lunchIndex].name;
        document.getElementById("confirm-dinner-data").innerText = food[dinnerIndex].name;
        document.getElementById("confirm-user-name").innerText = totalUser[currentUser].name;
        let element = document.getElementById("userList");
        // element.childNodes[currentUser + 1].style.backgroundColor = "#f1f1f1";
        element.childNodes[currentUser + 1].classList.add("deactiveUser")
        openPage(event, 'confirm');
      }

    }
  } else {
    console.log("this is cart section");
    if (totalUser.length - 1 > currentUser) {
      // console.log("this is else section");
      if (userLunch !== "" && userDinner !== "") {

        // var lastUser = "user" + currentUser;
        // var currentActiveUser = "user" + (currentUser + 1);
        // var lastUser = document.getElementsByClassName('user0').innerText;
        let element = document.getElementById("userList");
        // element.childNodes[currentUser + 1].style.backgroundColor = "#f1f1f1";
        // element.childNodes[currentUser + 2].style.backgroundColor = "yellow";
        element.childNodes[currentUser + 1].classList.add("deactiveUser")
        element.childNodes[currentUser + 2].classList.add("activeUser")
        // document.getElementsByClassName("user0").style.color = "red";
        // document.getElementsByClassName("user1").style.color = "red";
        document.getElementById("cart-img-url-lunch").src = "";
        document.getElementById("cart-title-lunch").innerText = "";
        document.getElementById("cart-img-url-dinner").src = "";
        document.getElementById("cart-title-dinner").innerText = "";
        document.getElementById('show-error').innerText = "";
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // STORE LUNCH AND DINNER IN LOCALSTORAGE
        localStorage.setItem(currentUser, JSON.stringify({ lunch: lunchIndex, dinner: dinnerIndex }));
        // GET LOCALSTORAGE DATA 
        var data = localStorage.getItem(currentUser);
        console.log("localstorage data: ");
        console.log(data);
        var index = currentUser + 1;
        document.getElementById('currentUser').innerText = totalUser[index].name;
        document.getElementById('currentCartUser').innerText = totalUser[index].name;
        localStorage.setItem('currentUser', JSON.stringify(index));
        document.getElementById('lunch').style.color = "#FF2424";
        document.getElementById('dinner').style.color = "black";
        console.log("lunch");
        isLunchDinner = true;

      } else {
        document.getElementById('show-error').innerText = "Please Select Lunch and Dinner";
      }

    } else {
      document.getElementById("confirm-lunch-data").innerText = food[lunchIndex].name;
      document.getElementById("confirm-dinner-data").innerText = food[dinnerIndex].name;
      document.getElementById("confirm-user-name").innerText = totalUser[currentUser].name;
      let element = document.getElementById("userList");
      // element.childNodes[currentUser + 1].style.backgroundColor = "#f1f1f1";
      element.childNodes[currentUser + 1].classList.add("deactiveUser")
      openPage(event, 'confirm');
    }

  }
}

function checkAllergy(cb) {
  if (cb.checked) {
    isAllergy = true;
    document.getElementById('displayInput').style.display = "block";
    document.getElementById('slider').style.display = "none";
    document.getElementById("cart-img-url-lunch").src = "";
    document.getElementById("cart-title-lunch").innerText = "";
    document.getElementById("cart-img-url-dinner").src = "";
    document.getElementById("cart-title-dinner").innerText = "";

  } else {
    isAllergy = false;
    document.getElementById('displayInput').style.display = "none";
    document.getElementById('slider').style.display = "block";
    document.getElementById("inavlid-input").innerText = "";
  }
}

function checkDisclaimer(cb) {
  if (cb.checked) {
    document.getElementById('warning').innerText = "";
  }
}

function checkAllergyDisclaimer(evt, pageName) {
  localStorage.setItem('currentUser', JSON.stringify(0));
  if (document.getElementById('disclaimer').checked) {
    document.getElementById("disclaimer").checked = false;
    document.getElementById('warning').innerText = "";
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('currentUser').innerText = totalUser[currentUser].name;
    document.getElementById('currentCartUser').innerText = totalUser[currentUser].name;
    document.getElementById('lunch').style.boxShadow = "inset -5px -5px 10px #FFFFFF, inset 5px 5px 10px rgba(0, 0, 0, 0.25)";
    // it is checked. Do something
    openPage(evt, pageName);
    displayUser();
  }
  else {
    // it isn't checked. Do something else
    document.getElementById('warning').innerText = "Please Select Checkbox";
    console.log("please check");
  }
}

function displayUser() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  for (let index = 0; index < totalUser.length; index++) {
    console.log(totalUser[index].name);
    var div = document.createElement('div');
    div.innerHTML = totalUser[index].name;
    div.className = "user" + index;
    if (currentUser == index) {
      // div.style.backgroundColor = "yellow";
      div.classList.add("activeUser");
    }
    // document.body.appendChild(div);
    document.getElementById('userList').appendChild(div);
  }
  // document.getElementById('userName').innerText = totalUser[userLength].name;
  // console.log(userLength);
}

function openPage(evt, pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";

  if (pageName == "allergy") {
    document.getElementById("defaultOpen").style.backgroundColor = "#f1f1f1";
    document.getElementById("allergy-page").style.backgroundColor = "red";
    document.getElementById("defaultOpen").style.color = "black";
    document.getElementById("allergy-page").style.color = "#FFFFFF";

  } else if (pageName == "menu") {
    document.getElementById("allergy-page").style.backgroundColor = "#f1f1f1";
    document.getElementById("menu-page").style.backgroundColor = "red";
    document.getElementById("menu-page").style.color = "#FFFFFF";
    document.getElementById("allergy-page").style.color = "black";
  } else if (pageName == "confirm") {
    document.getElementById("menu-page").style.backgroundColor = "#f1f1f1";
    document.getElementById("confirm-page").style.backgroundColor = "red";
    document.getElementById("confirm-page").style.color = "#FFFFFF";
    document.getElementById("menu-page").style.color = "black";
  }
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();




// Menu Page product slider

"use strict";

productScroll();

function productScroll() {
  let slider = document.getElementById("slider");
  let next = document.getElementsByClassName("pro-next");
  let prev = document.getElementsByClassName("pro-prev");
  let slide = document.getElementById("slide");
  let item = document.getElementById("slide");

  for (let i = 0; i < next.length; i++) {
    //refer elements by class name
    let position = 0; //slider postion

    prev[i].addEventListener("click", function () {
      //click previos button
      if (position > 0) {
        //avoid slide left beyond the first item
        position -= 1;
        translateX(position); //translate items
      }
    });

    next[i].addEventListener("click", function () {
      if (position >= 0 && position < hiddenItems()) {
        //avoid slide right beyond the last item
        position += 1;
        translateX(position); //translate items
      }
    });
  }

  function hiddenItems() {
    //get hidden items
    let items = getCount(item, false);
    let visibleItems = slider.offsetWidth / 210;
    return items - Math.ceil(visibleItems);
  }
}

function translateX(position) {
  //translate items
  slide.style.left = position * -210 + "px";
}

function getCount(parent, getChildrensChildren) {
  //count no of items
  let relevantChildren = 0;
  let children = parent.childNodes.length;
  for (let i = 0; i < children; i++) {
    if (parent.childNodes[i].nodeType != 3) {
      if (getChildrensChildren)
        relevantChildren += getCount(parent.childNodes[i], true);
      relevantChildren++;
    }
  }
  return relevantChildren;
}


function Buttontoggle() {
  var t = document.getElementById("myButton");
  if (t.value == "YES") {
    t.value = "NO";
  }
  else if (t.value == "NO") {
    t.value = "YES";
  }
}

function changeToggle(no) {
  if (no == 0) {
    document.getElementById('lunch').style.color = "#FF2424";
    document.getElementById('dinner').style.color = "black";
    document.getElementById('lunch').style.boxShadow = "inset -5px -5px 10px #FFFFFF, inset 5px 5px 10px rgba(0, 0, 0, 0.25)";
    document.getElementById('dinner').style.boxShadow = "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(0, 0, 0, 0.18)";
    console.log("lunch");
    isLunchDinner = true;
  } else {
    console.log("dinner");
    document.getElementById('dinner').style.color = "#FF2424";
    document.getElementById('lunch').style.color = "black";
    document.getElementById('dinner').style.boxShadow = "inset -5px -5px 10px #FFFFFF, inset 5px 5px 10px rgba(0, 0, 0, 0.25)";
    document.getElementById('lunch').style.boxShadow = "-5px -5px 10px #FFFFFF, 5px 5px 10px rgba(0, 0, 0, 0.18)";
    isLunchDinner = false;
  }
}

function addToCart(index) {
  if (isLunchDinner) {
    userLunch = food[index].name;
    lunchIndex = index;
    document.getElementById("cart-img-url-lunch").src = food[index].imgUrl;
    document.getElementById("cart-title-lunch").innerText = food[index].name;
  } else {
    userDinner = food[index].name;
    dinnerIndex = index;
    document.getElementById("cart-img-url-dinner").src = food[index].imgUrl;
    document.getElementById("cart-title-dinner").innerText = food[index].name;
  }
}


// Date code

function displayDate() {
  const d = new Date();
  var currentDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  console.log("display current date: " + currentDate);
  document.getElementById("wel-date").innerText = currentDate;
  document.getElementById("alle-date").innerText = currentDate;
  document.getElementById("menu-date").innerText = currentDate;
  document.getElementById("defaultOpen").style.backgroundColor = "red";
  document.getElementById("defaultOpen").style.color = "#FFFFFF";


}

displayDate();

