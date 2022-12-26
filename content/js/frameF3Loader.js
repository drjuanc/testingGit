/* This is very hacky but I couldn't figure out any other way*/
function frameF3Reloaded(tableLoader){
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
            //console.log(jQuery);
            frames['F3'].document.body.appendChild(jsFile);
            //console.log(arrFiles[x]);
        }
    }

    /* ==== Injecting all the clases needed to apply boostrap and custom styles === */
    /*Forms styles*/
    var academicYear = frames['F3'].document.getElementsByName('x_cyr');
    var examYear = frames['F3'].document.getElementsByName('x_exmcyr');
    var examMonth = frames['F3'].document.getElementsByName('x_exm1');
    var examType = frames['F3'].document.getElementsByName('x_et');
    var btnSubmit = frames['F3'].document.querySelectorAll('input[type=submit]');

    //Inser the clases only if the object exist
    if (academicYear.length > 0) academicYear[0].classList.add("form-select");
    if (examYear.length > 0) examYear[0].classList.add("form-select");
    if (examMonth.length > 0) examMonth[0].classList.add("form-select");
    if (examType.length > 0) examType[0].classList.add("form-select");
    if (btnSubmit.length > 0) btnSubmit[0].classList.add("btn", "btn-primary", "btn-right");

    /*Notice box*/
    var errorDiv = frames['F3'].document.getElementById('ErrorDiv'); 
    if (errorDiv) { //if the box exist
        errorDiv.nextElementSibling.classList.add("noticeBox");//Adding class to the table with the notetext
    }


    //Table with the list of subjects
    var tableSubjects = frames['F3'].document.querySelectorAll('.rltable');
    
    if (tableSubjects.length > 0) { // If the table is exist        
        tableSubjects[0].setAttribute("id", "tbSubjects");
        tableSubjects[0].setAttribute("data-toggle", "tbSubjects");
        tableSubjects[0].classList.add("table", "table-striped");

        /*The filter function need a Thead section otherwise It won't work
        The table DO NOT INCLUDE A THEAD, the header are declared in the tbody 
        with a header class in the first row, GOD HELP ME*/
        addThead(tableSubjects[0]); //Call de function that make a Thead

        //After a few miliseconds I insert the table loader file, because inline JS is not allowed in the extensions
        window.setTimeout( addTableLoader(tableLoader), 100 ); // 0.1 seconds


        window.overlib=function(){};
        function addTableLoader(tableLoader){
            //Finally I initialize the table
            var fileTableLoader = document.createElement('script');
            fileTableLoader.src = tableLoader;
            fileTableLoader.type = "text/javascript";
            frames['F3'].document.body.appendChild(fileTableLoader);
        }
    }

   
}

function addThead(onTable){

    fakeHeader = onTable.getElementsByClassName("rlheader")[0];//Get the fake header
    var realHeader = [];

    for (var i = 0, cell; cell = fakeHeader.cells[i]; i++) {
        realHeader.push(cell.innerHTML);
   }

    //Add the real Theader
    var thead = document.createElement('thead');
    //onTable.appendChild(thead);
    onTable.prepend(thead);
    var tr = thead.appendChild(document.createElement("tr"));
    for (var i=0; i<realHeader.length; i++) {
        tr.appendChild(document.createElement("th")).
              appendChild(document.createTextNode(realHeader[i]));
    }
  
    //Remove the fake header
    //console.log("1");
    fakeHeader.remove();
}

/*Remove some old JS*/
/*function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    
    var frameSuspects=frames['F3'].document.getElementsByTagName(targetelement);

    var frameSuspects1=Array.prototype.slice.call(frames['F3'].document.getElementsByTagName(targetelement),0);
    var pageSuspects1=Array.prototype.slice.call(document.getElementsByTagName(targetelement),0);

    var pageSuspects=document.getElementsByTagName(targetelement);

    var AllSuspects = frameSuspects1.concat(pageSuspects1);
    //console.log(typeof AllSuspects + " ----" + typeof frameSuspects);
    //console.log(AllSuspects);

    for (var i=AllSuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (AllSuspects[i] && AllSuspects[i].getAttribute(targetattr)!=null && AllSuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
    AllSuspects[i].parentNode.removeChild(AllSuspects[i]) //remove element by calling parentNode.removeChild()
    }



}*/
 