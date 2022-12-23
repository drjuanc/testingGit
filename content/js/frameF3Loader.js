/* This is very hacky but I couldn't figure out any other way
So I inject this into the top HTML and call this function  from inline JS frame onload*/
function frameF3Reloaded(cssPath, boostrapPath){
    //Inserting all the css needed   
    var framef3CSS = document.createElement('link'); 
    var boosTrapCSS = document.createElement('link'); 
    
    framef3CSS.href = cssPath;
    boosTrapCSS.href = boostrapPath;

    framef3CSS.rel = "stylesheet";
    boosTrapCSS.rel = "stylesheet";

    framef3CSS.type = "text/css";
    boosTrapCSS.type = "text/css";

    //Insert the CSS's into the head of the Iframe document
    frames['F3'].document.head.appendChild(framef3CSS);
    frames['F3'].document.head.appendChild(boosTrapCSS);

   // Now adding the clases needed for boostrap appearance
    var academicYear = frames['F3'].document.getElementsByName('x_cyr');
    var examYear = frames['F3'].document.getElementsByName('x_exmcyr');
    var examMonth = frames['F3'].document.getElementsByName('x_exm1');
    var examType = frames['F3'].document.getElementsByName('x_et');
    var btnSubmit = frames['F3'].document.querySelectorAll('input[type=submit]')

    if (academicYear.length > 0) academicYear[0].classList.add("form-select");
    if (examYear.length > 0) examYear[0].classList.add("form-select");
    if (examMonth.length > 0) examMonth[0].classList.add("form-select");
    if (examType.length > 0) examType[0].classList.add("form-select");
    if (btnSubmit.length > 0) btnSubmit[0].classList.add("btn", "btn-primary", "btn-right");
   // if (btnSubmit.length > 0) btnSubmit[0].classList.add("btn-primary");


    }