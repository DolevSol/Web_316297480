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

            avgForCourseElement.innerHTML = " " + data[0].average_score
            sdForCourseElement.innerHTML = " " + data[0].standard_deviation
        });
}


function DependentTeacherData(department, course, privateTeacherRow) {

    const departmentSelect = document.getElementById(department);
    const courseSelect = document.getElementById(course);
    const departmentValue = departmentSelect.value;
    const courseValue = courseSelect.value
    let url
    console.log(courseValue)
    if (courseValue !== '111') {
        url = `/SearchTeacher/DependentTeacherData/${departmentValue}/${courseValue}`
    } else {
        url = `/SearchTeacher/DependentTeacherData/${departmentValue}`
    }
    fetch(url)
        .then(res => res.json())
        .then(datas => {
            console.log(datas)
            document.getElementById(privateTeacherRow).innerHTML = "";
            datas.forEach(data => {

                const newElement = document.createElement("div");
                newElement.classList.add("col-md-4");
                newElement.setAttribute("onclick", "openNewWindow('/SendEmail')");

                const aboutItem = document.createElement("div");
                aboutItem.classList.add("about-item", "text-center");

                const icon = document.createElement("i");
                icon.classList.add("fas", "fa-chalkboard-teacher");
                aboutItem.appendChild(icon);

                const h3 = document.createElement("h3");
                h3.setAttribute("id", "privateTeacherUsername");
                h3.innerHTML = " " + data.username;
                aboutItem.appendChild(h3);

                const hr = document.createElement("hr");
                aboutItem.appendChild(hr);

                const department = document.createElement("p");
                department.innerHTML = `<span>מחלקה :</span><span id="privateTeacherDepartment"> ${data.department_name}</span>`;
                aboutItem.appendChild(department);

                const course = document.createElement("p");
                course.innerHTML = `<span>קורס : </span><span id="privateTeacherCourse"> ${data.course_name}</span>`;
                aboutItem.appendChild(course);

                const experience = document.createElement("p");
                experience.innerHTML = `<span>שנות ניסיון  :</span><span id="privateTeacherExperience"> ${data.experience}</span>`;
                aboutItem.appendChild(experience);

                const phone = document.createElement("p");
                phone.innerHTML = `<span>מספר פלאפון :</span><span id="privateTeacherPhone"> ${data.phone_number}</span>`;
                aboutItem.appendChild(phone);

                newElement.appendChild(aboutItem);
                document.getElementById(privateTeacherRow).appendChild(newElement);

            });
        })
}


function DependentRecommendation(Recommendation, recommendation1, recommendation2, recommendation3, recommendation4) {
    const recommendationSelect = document.getElementById(Recommendation);
    const course1 = document.getElementById(recommendation1);
    const course2 = document.getElementById(recommendation2);
    const course3 = document.getElementById(recommendation3);
    const course4 = document.getElementById(recommendation4);
    const recommendationValue = recommendationSelect.value;
    fetch(`/Recommendation/${recommendationValue}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            course1.innerHTML = " " + data[0].course1
            course2.innerHTML = " " + data[0].course2
            course3.innerHTML = " " + data[0].course3
            course4.innerHTML = " " + data[0].course4
        });

}