(function () {
    let captchachecked = false;

    function beforeSubmit(event) {
        // Check if reCAPTCHA was verified
        if (!captchachecked) {
            alert("Please check the reCAPTCHA box to submit the lead.");
            event.preventDefault();
            return;
        }

        // Format date field
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
            console.error("Date input or output field is missing.");
            event.preventDefault();
        }
    }

    // Update reCAPTCHA timestamp periodically
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

    // Attach handlers
    document.querySelector("form").addEventListener("submit", beforeSubmit);
    setInterval(timestamp, 2000);

    // Expose captcha success callback globally
    window.captchsuccess = captchsuccess;
})();
