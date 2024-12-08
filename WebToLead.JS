function beforeSubmit(){
    debugger;
    let inputdate = document.querySelector(".inputdate");
    let outputdate = document.querySelector(".outputdate");
     console.log(inputdate.value);
     let formateddata = new Date(inputdate.value).toLocaleDateString("en-US");
     console.log(formateddata);
     outputdate.value = formateddata;
}