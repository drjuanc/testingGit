/* This is very hacky but I couldn't figure out any other way*/
function frameF3Reloaded(){
/*Inserting all the CSS and JS files needed everytime the frame changes*/
/*The files names came in a sesion var in the form of long string 
separated by coma so I made then again an array*/

arrFiles = sessionStorage.getItem("filesToAttach").split(",");

for (x in arrFiles){
    if(arrFiles[x].includes('.css')) {
        
        var cssFile = document.createElement('link'); //Custom CSS file
        cssFile.href = arrFiles[x];
        cssFile.rel = "stylesheet";
        cssFile.type = "text/css";
        frames['F3'].document.head.appendChild(cssFile);

    }
    if(arrFiles[x].includes('.js')) {
        var jsFile = document.createElement('script');
        jsFile.src = arrFiles[x];
        jsFile.type = "text/javascript";
        frames['F3'].document.head.appendChild(jsFile);
        //console.log(arrFiles[x]);
    }
}

/*Injecting all the clases needed to apply boostrap */
    var academicYear = frames['F3'].document.getElementsByName('x_cyr');
    var examYear = frames['F3'].document.getElementsByName('x_exmcyr');
    var examMonth = frames['F3'].document.getElementsByName('x_exm1');
    var examType = frames['F3'].document.getElementsByName('x_et');
    var btnSubmit = frames['F3'].document.querySelectorAll('input[type=submit]');
    var tableSubjects = frames['F3'].document.querySelectorAll('.rltable');

    //Inser the clases only if the object exist
    if (academicYear.length > 0) academicYear[0].classList.add("form-select");
    if (examYear.length > 0) examYear[0].classList.add("form-select");
    if (examMonth.length > 0) examMonth[0].classList.add("form-select");
    if (examType.length > 0) examType[0].classList.add("form-select");
    if (btnSubmit.length > 0) btnSubmit[0].classList.add("btn", "btn-primary", "btn-right");
    if (tableSubjects.length > 0) tableSubjects[0].classList.add("table", "table-striped", "table-hover");

    /*Injecting the code to control te tables*/
    //var tableCtrScript = " <script> $(function() { $('#table').bootstrapTable()})</script>"
    var script = document.createElement("script");
    console.log(console.log(window.jQuery));
   // script.textContent = "jQuery(function() { jQuery('#table').bootstrapTable()})";
    frames['F3'].document.head.appendChild(script);

}

/*window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}*/