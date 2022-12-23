(() => {

                
    let currentURl = window.location.href; //Get the page URL
    let ArrConfig; //Set the var config
   

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

        }

        if (currentURl.includes("mi_main_menu")) { //Make sure the user is in the other page
            fixWSULogo(270);
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

            document.head.appendChild(googleFont);


            /*=== link the CSS to the iframe===*/
            //Create the F1 and F3 css object
            var framef1CSS = document.createElement('link'); 
            var framef3CSS = document.createElement('link'); 
           // console.log(framef3CSS);
            framef1CSS.href = chrome.runtime.getURL('content/css/framef1.css');
            framef3CSS.href = chrome.runtime.getURL('content/css/framef3.css');
            framef1CSS.rel = "stylesheet";
            framef3CSS.rel = "stylesheet";
            framef1CSS.type = "text/css";
            framef3CSS.type = "text/css";

            //Insert the CSS's into the head of the Iframe document
            frames['F1'].document.head.appendChild(framef1CSS);
            frames['F3'].document.head.appendChild(framef3CSS);
         
        }
    });

})();




