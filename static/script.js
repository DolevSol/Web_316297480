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

function showItem(id ,display) {

    document.getElementById(id).style.display = display;

}

function showTeachers(id ,display) {
    if (document.getElementById(id).value !="" ) {
            document.getElementById(id).style.display = display;
            console.log('checkcheck1234')
    }
   else {
     return false ;
    }

}

function showItemes(id1, id2) {
    showItem(id1,'block')
    showItem(id2,'block')

}

$("#teacher_form").submit( function(e) {
  loadAjax();
  e.returnValue = false;
});

// function showTeacher(id_check,id_show) {
//     if ( document.getElementById(id_check).value in ('361','362','363','364','365','366')) {
//         showItem(id_show)
//     } else {
//         alert("חובת בחירת מחלקה")
//     }
//
// }


///////








