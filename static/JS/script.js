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


function DependentDropdown(parentId, childId) {
    const screen = window.location.pathname.split('/')[1]
    const parentSelect = document.getElementById(parentId);
    const childSelect = document.getElementById(childId);
    const departmentId = parentSelect.value;
    fetch(`/${screen}/${departmentId}`)
        .then(res => res.json())
        .then(courses => {
            childSelect.innerHTML = '<option value="111">בחר קורס</option>';
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.course_id;
                option.text = course.course_name;
                childSelect.appendChild(option);


            });
        });
}




function DependentCourseData(yearId, semesterId, avg, sd) {
    const yearSelect = document.getElementById(yearId);
    const semesterSelect = document.getElementById(semesterId);
    const avgForCourseElement = document.getElementById(avg);
    const sdForCourseElement = document.getElementById(sd);
    const year = yearSelect.value;
    const semester = semesterSelect.value
    const course_id = window.location.pathname.split('/')[2]
    console.log(course_id)
    console.log(year)
    console.log(semester)
    fetch(`/CourseData/${course_id}/${year}/${semester}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            avgForCourseElement.innerHTML =" " + data[0].average_score
            sdForCourseElement.innerHTML =" " + data[0].standard_deviation
        });
}

//
// function DependentTeacherData(department , course) {
//     const departmentSelect = document.getElementById(department);
//     const courseSelect = document.getElementById(course);
//     const departmentValue = departmentSelect.value;
//     const courseValue = courseSelect.value
//     fetch(`/SearchTeacher/${departmentValue}/${courseValue}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             avgForCourseElement.innerHTML =" " + data[0].average_score
//             sdForCourseElement.innerHTML =" " + data[0].standard_deviation
//         });
// }