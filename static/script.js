
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');


// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);




let commentWindow;

function openAddComment() {
    commentWindow = window.open("comment.html", 'newWindow', 'width=600 , height=600');

}

function enableElement(id, enable) {
    document.getElementById(id).disabled = !enable;
}

function disableCourse() {
    if (document.getElementById('courseNumber').disabled == true) {
        document.getElementById('hardness').disabled = !document.getElementById('hardness').disabled;
        document.getElementById('load').disabled = !document.getElementById('load').disabled;
        is_used = false;
    } else {
        document.getElementById('courseNumber').disabled = !document.getElementById('courseNumber').disabled;
        document.getElementById('hardness').disabled = !document.getElementById('hardness').disabled;
        document.getElementById('load').disabled = !document.getElementById('load').disabled;

    }

}

let is_used = false;

function selectElement(id, valueToSelect) {
    if (!is_used) {
        console.log(is_used)
        document.getElementById(id).disabled = !document.getElementById(id).disabled;
        let element = document.getElementById(id);
        element.value = valueToSelect;
        is_used = true;
    } else {
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }
}
function ShowTeacher(id) {

    document.getElementById(id).style.display='block' ;

}



///////

var trip = Array("טיול טרקטורונים", "קיר טיפוס", "שייט קיאקים", "שייט בסירת פדלים", "צניחה חופשית", "פיינטבול");

function randomSong() {
  var randomTrip = trip[Math.floor(Math.random() * trip.length)];
  document.getElementById('randomTrip').value = randomTrip;
}







