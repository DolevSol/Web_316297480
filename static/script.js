let commentWindow;

function openAddComment() {
    commentWindow = window.open("comment.html", 'newWindow','width=600 , height=600');

}

function enableElement(id, enable) {
    document.getElementById(id).disabled = !enable;
}

function disableCourse() {
    document.getElementById('courseNumber').disabled = !document.getElementById('courseNumber').disabled;
    document.getElementById('hardness').disabled = !document.getElementById('hardness').disabled;
    document.getElementById('load').disabled = !document.getElementById('load').disabled;

}

