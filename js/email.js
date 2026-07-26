// ============================================================
// EmailJS Integration for Contact Form
// ============================================================

(function () {
    // 4. Initialize EmailJS using placeholder: YOUR_PUBLIC_KEY
    if (typeof emailjs !== 'undefined') {
        emailjs.init("XiTjnIBC3xyBCJVBP");
    }

    function initEmailJS() {
        // Ensure emailjs is initialized if SDK loaded late
        if (typeof emailjs !== 'undefined') {
            emailjs.init("XiTjnIBC3xyBCJVBP");
        }

        // 5. Detect existing contact form and intercept its submit event
        const form = document.querySelector("#contact form") || document.querySelector("form");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            // 9. During submission: prevent default form action
            e.preventDefault();

            // Detect Alpine.js component data if active on form container
            const alpineData = window.Alpine && window.Alpine.$data ? window.Alpine.$data(form) : null;

            // DOM elements
            const submitBtn = form.querySelector('button[type="submit"]');
            const nameInput = document.getElementById("contact-name");
            const emailInput = document.getElementById("contact-email");
            const phoneInput = document.getElementById("contact-phone");
            const serviceInput = document.getElementById("contact-service");
            const subjectInput = document.getElementById("contact-subject");
            const messageInput = document.getElementById("contact-message");

            // 9. During submission: disable submit button & show "Sending..."
            if (alpineData) {
                alpineData.submitting = true;
                alpineData.submitted = false;
                alpineData.errorMessage = "";
            } else if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalHtml = submitBtn.innerHTML;
                submitBtn.innerText = "SENDING...";
            }

            // 6. Collect the values from the existing input fields
            const templateParams = {
                name: nameInput ? nameInput.value : "",
                email: emailInput ? emailInput.value : "",
                phone: phoneInput ? phoneInput.value : "",
                service: serviceInput ? serviceInput.value : "",
                subject: subjectInput ? subjectInput.value : "",
                message: messageInput ? messageInput.value : "",
                from_name: nameInput ? nameInput.value : "",
                from_email: emailInput ? emailInput.value : "",
                phone_number: phoneInput ? phoneInput.value : ""
            };

            // 7. Send using emailjs.send
            emailjs.send(
                "service_zujyvtt",
                "template_tef284i",
                templateParams
            )
            .then(function (response) {
                // 10. On success: restore button, clear form, show a success message
                if (alpineData) {
                    alpineData.submitting = false;
                    alpineData.submitted = true;
                    alpineData.errorMessage = "";
                    alpineData.formData = {
                        name: "",
                        email: "",
                        phone: "",
                        service: "",
                        subject: "",
                        message: ""
                    };
                } else {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        if (submitBtn.dataset.originalHtml) {
                            submitBtn.innerHTML = submitBtn.dataset.originalHtml;
                        }
                    }
                    form.reset();
                }
            })
            .catch(function (error) {
                // 11. On failure: restore button, show an error message, console.log(error)
                console.log(error);

                if (alpineData) {
                    alpineData.submitting = false;
                    alpineData.submitted = false;
                    alpineData.errorMessage = "Submission failed. Please try again.";
                } else {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        if (submitBtn.dataset.originalHtml) {
                            submitBtn.innerHTML = submitBtn.dataset.originalHtml;
                        }
                    }
                }
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initEmailJS);
    } else {
        initEmailJS();
    }
})();
