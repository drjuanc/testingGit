$( document ).ready(function() {

    function activateTable(){
       var $table = $('#tbSubjects');
        if ($table.length > 0) {
           $table.bootstrapTable({});

           //remove the extra classes inserted by default by the table module
           document.getElementById('tbSubjects').classList.remove('table-striped', 'table-bordered');
           document.getElementById('tbSubjects').removeEventListener('mousemove', 'olMouseMove', false);
        }
       //var $table = $('#tbSubjects');
      // $table.bootstrapTable({}); 
   }
   window.setTimeout( activateTable, 1000 ); // 1 seconds
    



    document.getElementById("tbSubjects").addEventListener("click", addClasses);

   function addClasses(){
        /*Popup with the menu*/
        var popUpDiv = document.getElementById('overDiv');

        if (popUpDiv){
            level1Table = popUpDiv.getElementsByTagName('table');
            if(level1Table && level1Table.length ==4){
                level1Table[0].classList.add("popUpLevel0");
                level1Table[1].classList.add("popUpHeader");
                level1Table[2].classList.add("popUpBody");
                level1Table[3].classList.add("popUpContent");

                //console.log(level1Table[0]);
            }
        
        }
   }

});

