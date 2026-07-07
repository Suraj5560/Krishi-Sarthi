// =======================================
// Krishi Sarthi
// cost.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Cost Estimation Loaded");

    const costForm = document.querySelector("form[action='/cost']");

    if (!costForm) return;

    costForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Input Fields
        const seed = Number(document.querySelector("input[name='seed']").value);
        const fertilizer = Number(document.querySelector("input[name='fertilizer']").value);
        const labour = Number(document.querySelector("input[name='labour']").value);
        const irrigation = Number(document.querySelector("input[name='irrigation']").value);
        const pesticide = Number(document.querySelector("input[name='pesticide']").value);
        const other = Number(document.querySelector("input[name='other']").value);

        // Validation
        if (
            isNaN(seed) ||
            isNaN(fertilizer) ||
            isNaN(labour) ||
            isNaN(irrigation) ||
            isNaN(pesticide) ||
            isNaN(other)
        ) {

            showToast("Please enter all cost values.");

            return;

        }

        showLoader();

        setTimeout(() => {

            hideLoader();

            const total =
                seed +
                fertilizer +
                labour +
                irrigation +
                pesticide +
                other;

            const result = document.getElementById("costResult");

            if (result) {

                result.innerHTML = `
                    <h3>Estimated Cost</h3>

                    <table class="result-table">
                        <tr>
                            <td>Seed</td>
                            <td>₹${seed}</td>
                        </tr>

                        <tr>
                            <td>Fertilizer</td>
                            <td>₹${fertilizer}</td>
                        </tr>

                        <tr>
                            <td>Labour</td>
                            <td>₹${labour}</td>
                        </tr>

                        <tr>
                            <td>Irrigation</td>
                            <td>₹${irrigation}</td>
                        </tr>

                        <tr>
                            <td>Pesticide</td>
                            <td>₹${pesticide}</td>
                        </tr>

                        <tr>
                            <td>Other Expenses</td>
                            <td>₹${other}</td>
                        </tr>

                        <tr>
                            <th>Total Cost</th>
                            <th>₹${total}</th>
                        </tr>
                    </table>
                `;

            }

            showToast("Cost Estimated Successfully");

        }, 1500);

    });

    // ==========================
    // Reset Button
    // ==========================

    const resetBtn = document.getElementById("resetCost");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            costForm.reset();

            const result = document.getElementById("costResult");

            if (result) {

                result.innerHTML = "";

            }

            showToast("Form Reset");

        });

    }

});