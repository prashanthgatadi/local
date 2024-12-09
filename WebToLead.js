(function () {
    let captchachecked = false;

    // Function to handle form submission
    function beforeSubmit(event) {
        if (captchachecked) {
            let inputdate = document.querySelector(".inputdate");
            let outputdate = document.querySelector(".outputdate");

            if (inputdate && outputdate) {
                let parsedDate = new Date(inputdate.value);
                if (!isNaN(parsedDate)) {
                    outputdate.value = parsedDate.toLocaleDateString("en-US");
                } else {
                    alert("Please enter a valid date.");
                    event.preventDefault();
                }
            } else {
                console.error("Date input or output fields are missing.");
            }
        } else {
            alert("Please check the reCAPTCHA box to submit the lead.");
            event.preventDefault();
        }
    }

    // Function to refresh reCAPTCHA timestamp
    function timestamp() {
        let response = document.getElementById("g-recaptcha-response");
        if (!response || response.value.trim() === "") {
            let captchaSettings = document.getElementsByName("captcha_settings")[0];
            if (captchaSettings) {
                let elems = JSON.parse(captchaSettings.value);
                elems["ts"] = JSON.stringify(new Date().getTime());
                captchaSettings.value = JSON.stringify(elems);
            }
        }
    }

    // reCAPTCHA success callback
    function captchsuccess() {
        captchachecked = true;
    }

    // Attach the form submission handler
    document.querySelector("form").addEventListener("submit", beforeSubmit);

    // Update the reCAPTCHA timestamp periodically
    setInterval(timestamp, 2000); // Increased interval to 2 seconds

    // Expose captcha callback globally
    window.captchsuccess = captchsuccess;
})();
