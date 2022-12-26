(() => {



    //end test
    let currentURl = window.location.href; //Get the page URL
    let arrConfig; //Set the var config


   //I read all settings and stored in a abject containing an array of propertyes
    chrome.storage.sync.get(function (result) {

        arrConfig = result.config;
        /*==Now I read every individual configation and act accordingly==*/
        //Custom theme

        if (arrConfig[0][0] = 'customTheme' && !currentURl.includes('mi_login')) {
            if (arrConfig[0][1]) {
                //Activate the custo Theme adding a class to the body
                var docBody = document.body;
                docBody.classList.add("customTheme");
            } else {
                //no need to deactivate the custom theme
                //
            }

        }

        //Custom login, if i'm in the login page
        if (currentURl.includes('mi_login')) {
            let docBody = document.body;
            //Activate the custom login adding a class to the body
            if (arrConfig[3][0] = 'customLogin' && arrConfig[3][1]) docBody.classList.add("customLogin");

            //Activate the custom login colors adding a class to the body
            if (arrConfig[4][0] = 'customLogin' && arrConfig[4][1]) docBody.classList.add("customLoginColors");

            //Fix WSU logo. If the option is active I call the function
            if ((arrConfig[5][0] = 'fixWSULogo' && arrConfig[5][1]) && (arrConfig[3][1])) fixWSULogo(500);

            //Select personnel as default option
            if ((arrConfig[6][0] = 'personnelDef' && arrConfig[6][1]) && (arrConfig[3][1])) document.getElementsByName('numtype')[1].checked = true;;

            //CleanLogin
            if ((arrConfig[7][0] = 'cleanLogin' && arrConfig[7][1]) && (arrConfig[3][1])) docBody.classList.add("cleanLogin");

            //Remove the margin of the main div
            document.getElementsByClassName('w3-main')[0].removeAttribute('style');
        }

        if (currentURl.includes("mi_main_menu")) { //Make sure the user is in the other page
            //Fix wsu logo, still need the condition in case te option is active
            fixWSULogo(270);

            //var iframeF3 = document.
            //onload="myonloadscript()
        }


    });


    //Fixing the low-res WSU logo'
    function fixWSULogo(logoWidth) {

        var wsuLogo = document.getElementsByTagName("img")[0];
        wsuLogo.width = logoWidth;

        if (currentURl.includes("mi_login")) { //Make sure the user is in login page
            wsuLogo.src = chrome.runtime.getURL('assets/pics/wsulogo.jpg');
        }


        if (currentURl.includes("mi_main_menu")) { //Make sure the user is in the other page
            wsuLogo.src = chrome.runtime.getURL('assets/pics/wsuinv.png');

        }

    }

    document.addEventListener('readystatechange', event => {

        //When the document is loaded and  I'm not in the login

        if (event.target.readyState === "complete" && currentURl.includes("mi_main_menu")) {

            /*=== Add the google forms to the file ===*/
            var googleFont = document.createElement('link');
            googleFont.href = chrome.runtime.getURL('assets/fonts/RobotoCondensed-Regular.ttf');
            googleFont.rel = "stylesheet";

            /*=== link the CSS to the iframe===*/
            //Create the F1 and F3 css object
            var framef1CSS = document.createElement('link');
            var framef3CSS = document.createElement('link');
            var framef3JS = document.createElement('script');

            //Insert the css and JS needed
            framef1CSS.href = chrome.runtime.getURL('content/css/framef1.css');
            framef3CSS.href = chrome.runtime.getURL('content/css/framef3.css');
            framef3JS.src = chrome.runtime.getURL('content/js/frameF3Loader.js');

            framef1CSS.rel = "stylesheet";
            framef3CSS.rel = "stylesheet";

            framef1CSS.type = "text/css";
            framef3CSS.type = "text/css";
            framef3JS.type = "text/javascript";

            //Insert the CSS's into the head of the Iframe document
            frames['F1'].document.head.appendChild(framef1CSS);
            frames['F3'].document.head.appendChild(framef3CSS);

            document.head.appendChild(framef3JS);
           // var files = "'"+framef3CSS.href + "', '" + bootStrapCSS+"'";

            /*I'm not happy with this, too hacky: I add made an array with all the files I need to insert in the iFrame3
            Then store the array in a session var, that made a long sting separated by comas*/

            //Here I create an array of files I need to attach to the frame #3
            var jQueryJS = chrome.runtime.getURL('lib/js/jquery.min.js');
            var bstBundle = chrome.runtime.getURL('lib/js/bootstrap.bundle.min.js');
            var tableLoader = chrome.runtime.getURL('content/js/tableLoader.js');
            
            var bstCSS = chrome.runtime.getURL('lib/css/bootstrap.min.css');
            var bstTableCSS = chrome.runtime.getURL('lib/css/bootstrap-table.min.css');
            var bstTableJS = chrome.runtime.getURL('lib/js/bootstrap-table.min.js');
            var bstFilterJS = chrome.runtime.getURL('lib/js/bootstrap-table-filter-control.min.js');

            var attfiles = [ framef3CSS.href, bstCSS, bstTableCSS, jQueryJS, bstBundle, bstTableJS ];
            //console.log(jQueryJS);
            sessionStorage.setItem("filesToAttach", attfiles); //Store them in a session var
            
           document.getElementById("F3").setAttribute("onLoad", "frameF3Reloaded('"+tableLoader+"');");

        }
    });

})();