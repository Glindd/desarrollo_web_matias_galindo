const filas = document.querySelectorAll("#lista-sombreros tr:not(:first-child)");
const detalle = document.getElementById("detalle");
const tabla = document.getElementById("lista-sombreros");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");

filas.forEach(fila => {
    fila.addEventListener("click", () => {
        const celdas = fila.querySelectorAll("td");
        detalle.innerHTML = `
            <h3>${celdas[0].innerText}</h3>
            <p><strong>Color:</strong> ${celdas[1].innerText}</p>
            <p><strong>Adorno:</strong> ${celdas[2].innerText}</p>
            <p><strong>Precio:</strong> ${celdas[3].innerText}</p>
            <p><strong>Tallas Disponibles:</strong> ${celdas[4].innerText}</p>
            <div class="image-container" style="width:320px; height:240px;">
                <img src="${celdas[5].querySelector("img").src}" alt="${celdas[5].querySelector("img").alt}">
            </div>
            <button class="btn-volver" onclick="volverListado()">Volver al listado</button>
            <a href="../html/index.html"><button class="btn-volver">Volver a la portada</button></a>
        `;
        tabla.style.display = "none";
        detalle.style.display = "block";

        // Click en la imagen para abrir modal
        const imgDetalle = detalle.querySelector("img");
        imgDetalle.addEventListener("click", () => {
            modalImg.src = imgDetalle.src;
            modal.style.display = "flex";
        });
    });
});

function volverListado() {
    detalle.style.display = "none";
    tabla.style.display = "table";
}

function cerrarModal() {
    modal.style.display = "none";
}
