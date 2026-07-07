// =======================================
// Krishi Sarthi
// disease.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Disease Prediction Loaded");

    const diseaseForm = document.querySelector("form[action='/disease']");

    if (!diseaseForm) return;

    // ==========================
    // Image Preview
    // ==========================

    const imageInput = document.querySelector("input[type='file']");
    const preview = document.getElementById("imagePreview");

    if (imageInput && preview) {

        imageInput.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) return;

            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";

        });

    }

    // ==========================
    // Disease Prediction
    // ==========================

    diseaseForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (!imageInput.files.length) {

            showToast("Please upload a crop image.");

            return;

        }

        showLoader();

        setTimeout(() => {

            hideLoader();

            const result = document.getElementById("diseaseResult");

            if (result) {

                result.innerHTML = `
                    <h3>Prediction Result</h3>

                    <h2>🍃 Leaf Blight</h2>

                    <p><strong>Confidence:</strong> 95%</p>

                    <p>
                        Suggested Action:
                        Apply recommended fungicide and
                        remove infected leaves.
                    </p>
                `;

            }

            showToast("Disease Prediction Completed");

        }, 2000);

    });

    // ==========================
    // Reset Form
    // ==========================

    const resetBtn = document.getElementById("resetDisease");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            diseaseForm.reset();

            if (preview) {

                preview.src = "";
                preview.style.display = "none";

            }

            const result = document.getElementById("diseaseResult");

            if (result) {

                result.innerHTML = "";

            }

            showToast("Form Reset");

        });

    }

});