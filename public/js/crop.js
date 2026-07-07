// =======================================
// Krishi Sarthi
// crop.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Crop Recommendation Loaded");

    const cropForm = document.querySelector("form[action='/crop']");

    if (!cropForm) return;

    cropForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Input Fields
        const nitrogen = document.querySelector("input[name='nitrogen']");
        const phosphorus = document.querySelector("input[name='phosphorus']");
        const potassium = document.querySelector("input[name='potassium']");
        const ph = document.querySelector("input[name='ph']");
        const rainfall = document.querySelector("input[name='rainfall']");

        // Validation
        if (
            !nitrogen.value ||
            !phosphorus.value ||
            !potassium.value ||
            !ph.value ||
            !rainfall.value
        ) {

            showToast("⚠ Please fill all fields.");

            return;
        }

        showLoader();

        // Demo Recommendation
        setTimeout(() => {

            hideLoader();

            let crop = "Rice";

            if (ph.value > 7) {

                crop = "Wheat";

            } else if (rainfall.value < 100) {

                crop = "Millet";

            } else if (nitrogen.value > 100) {

                crop = "Sugarcane";

            }

            const result = document.getElementById("cropResult");

            if (result) {

                result.innerHTML = `
                    <h3>🌾 Recommended Crop</h3>

                    <h2>${crop}</h2>

                    <p>
                        This recommendation is based on
                        the entered soil values.
                    </p>
                `;

            }

            showToast("✅ Crop Recommendation Ready");

        },1500);

    });

    // Clear Result

    const resetBtn = document.getElementById("resetCrop");

    if(resetBtn){

        resetBtn.addEventListener("click",()=>{

            cropForm.reset();

            const result=document.getElementById("cropResult");

            if(result){

                result.innerHTML="";

            }

            showToast("Form Reset");

        });

    }

});