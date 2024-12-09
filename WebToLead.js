function beforeSubmit(){
    debugger;
    let inputdate = document.querySelector(".inputdate");
    let outputdate = document.querySelector(".outputdate");
     console.log(inputdate.value);
     let formateddata = new Date(inputdate.value).toLocaleDateString("en-US");
     console.log(formateddata);
     outputdate.value = formateddata;
}
 function timestamp() { 
     var response = document.getElementById("g-recaptcha-response"); 
     if (response == null || response.value.trim() == "") {
         var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());
         document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); 
     } 
 } 
setInterval(timestamp, 500); 
