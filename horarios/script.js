document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];
    var addGastoBtn = document.getElementById("addGasto");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    addGastoBtn.onclick = function() {
        var gasto = document.getElementById("gasto").value;
        var cantidad = document.getElementById("cantidad").value;

        if (gasto && cantidad) {
            addGastoToJSON(gasto, cantidad);
            modal.style.display = "none";
        } else {
            alert("Por favor, rellena ambos campos.");
        }
    }

    function addGastoToJSON(gasto, cantidad) {
        fetch('/update_gastos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gasto: gasto, cantidad: cantidad })
        })
        .then(response => response.text())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
