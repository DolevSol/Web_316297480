const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
let newWindow;

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);


function openNewWindow(html) {
    newWindow = window.open(html, 'newWindow', 'width=800 , height=800');

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

function showItem(id, display) {

    document.getElementById(id).style.display = display;

}

function showTeachers(id, display) {
    if (document.getElementById(id).value != "") {
        document.getElementById(id).style.display = display;
        return false;
    } else {
        return false;
    }

}

function showItemes(id1, id2) {
    showItem(id1, 'block')
    showItem(id2, 'block')

}


function phonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.value.match(phoneno)) {
        return true;
    } else {
        alert("your phone number is not valid");
        return false;
    }
}







