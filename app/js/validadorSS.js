function validarFormularioSS(event) {
    event.preventDefault();
    const errores = [];
    const form = document.getElementById("formSS");
    const valBox = document.getElementById("val-box");
    const valList = document.getElementById("val-list");

    valList.innerHTML = "";
    valBox.hidden = true;

    // Obtener todos los campos con el atributo 'required'
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
        if (input.type === 'select-one' || input.tagName === 'SELECT') {
            if (input.value === "") {
                agregarError(`Por favor, seleccione una opción para ${input.previousElementSibling.textContent}`, errores);
            }
        } else if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
            if (input.value.trim() === "") {
                agregarError(`El campo ${input.previousElementSibling.textContent} es obligatorio`, errores);
            }
        }
    });

    const region = document.getElementById("select-region");
    if (region.value === "") agregarError("Por favor, seleccione una región", errores);

    const comuna = document.getElementById("select-comuna");
    if (comuna.value === "") agregarError("Por favor, seleccione una comuna", errores);

    const contacto = document.getElementById("select-contacto");
    if (contacto.value === "") agregarError("Por favor, seleccione un medio de contacto", errores);

    const nombreInput = document.getElementById("nombre");
    if (nombreInput.value.trim() !== "" && !validarTexto(3, 200, nombreInput)) {
        agregarError("El nombre debe tener entre 3 y 200 caracteres", errores);
    }

    const emailInput = document.getElementById("email");
    if (emailInput.value.trim() !== "") {
        if (!emailInput.value.includes("@")) {
            agregarError("El email debe ser valido", errores);
        }
        if (emailInput.value.length > 100) {
            agregarError("Email debe tener menos de 100 caracteres", errores);
        }
    }

    const telefonoInput = document.getElementById("telefono");
    if (telefonoInput.value.trim() !== "" && !validarTexto(7, 15, telefonoInput)) {
        agregarError("El numero de celular debe tener entre 7 y 15 caracteres", errores);
    }

    const redSocialDiv = document.getElementById("red-social");
    if (redSocialDiv.style.display !== "none") {
        const redSocialInput = document.getElementById("red-s");
        if (redSocialInput.value.trim() !== "" && !validarTexto(4, 50, redSocialInput)) {
            agregarError("Tu usuario debe tener entre 4 y 50 caracteres", errores);
        }
        if (redSocialInput.value.trim() === "") agregarError("El usuario de Red Social es obligatorio", errores);
    }

    const otroContacto = document.getElementById("otro-contacto");
    if (otroContacto.style.display !== "none") {
        const plataformaInput = document.getElementById("otro-c");
        
        if (plataformaInput.value.trim() !== "" && !validarTexto(4, 50, plataformaInput)) {
            agregarError("La plataforma debe tener entre 4 y 50 caracteres", errores);
        }

        const usuarioInput = document.getElementById("otro-c2");
        if (usuarioInput.value.trim() !== "" && !validarTexto(4, 50, usuarioInput)) {
            agregarError("Tu usuario debe tener entre 4 y 50 caracteres", errores);
        }
    }

    // Campos condicionales para tallas
    const talla1Div = document.getElementById("talla1");
    if (talla1Div.style.display !== "none") {
        const tallaSelect = document.getElementById("select-talla");
        if (tallaSelect.value === "") {
            agregarError("Por favor, seleccione una talla de sombrero", errores);
        }
    }
    const talla2Div = document.getElementById("talla2");
    if (talla2Div.style.display !== "none") {
        const modeloInput = document.getElementById("select-estilo2");
        const tallaInput = document.getElementById("select-talla2");
        if (modeloInput.value.trim() === "") {
            agregarError("El campo Modelo del sombrero es obligatorio", errores);
        }
        if (tallaInput.value === "") {
            agregarError("El campo Talla del sombrero es obligatorio", errores);
        }
    }

    if (errores.length > 0) {
        errores.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            valList.appendChild(li);
        });
        valBox.hidden = false;
        return false;
    }

    if (confirmarEnvio()) {
        enviarFormularioSS();
    }
}

function validarFormularioAS(event) {
    event.preventDefault();
    const errores = [];
    const form = document.getElementById("formAS");
    const valBox = document.getElementById("val-box2");
    const valList = document.getElementById("val-list2");

    valList.innerHTML = "";
    valBox.hidden = true;

    // Obtener todos los campos con el atributo 'required'
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
        if (input.type === 'file') {
            // Se valida el input de tipo file por separado
            return;
        }
        if (input.value.trim() === "") {
            agregarError(`El campo ${input.previousElementSibling.textContent} es obligatorio`, errores);
        }
    });

    const modeloInput = document.getElementById("modelo-disp");
    if (modeloInput.value.trim() !== "" && !validarTexto(1, 100, modeloInput)) {
        agregarError("El modelo debe tener entre 1 y 100 caracteres", errores);
    }

    const colorInput = document.getElementById("color-disp");
    if (colorInput.value.trim() !== "" && !validarTexto(1, 50, colorInput)) {
        agregarError("El color debe tener entre 1 y 50 caracteres", errores);
    }

    const adornoInput = document.getElementById("adorno");
    if (adornoInput.value.trim() !== "" && !validarTexto(1, 100, adornoInput)) {
        agregarError("El adorno debe tener entre 1 y 100 caracteres", errores);
    }

    const precioInput = document.getElementById("precio");
    if (precioInput.value !== "" && !validarNumero(20000, 1000000, precioInput)) {
        agregarError("Revisa el precio y vuelve a escribirlo", errores);
    }

    const tallasInput = document.getElementById("tallas-disp");
    if (tallasInput.value.trim() !== "" && !validarTexto(1, 200, tallasInput)) {
        agregarError("Las tallas deben tener entre 1 y 200 caracteres", errores);
    }

    const fotoInput = document.getElementById("foto-sombrero");
    const MIN_FOTOS = 1;
    const MAX_FOTOS = 3;
    if (fotoInput) {
        if (!fotoInput.files || fotoInput.files.length === 0) {
            agregarError(`Debes subir al menos ${MIN_FOTOS} foto`, errores);
        } else if (fotoInput.files.length > MAX_FOTOS) {
            agregarError(`Máximo puedes subir ${MAX_FOTOS} fotos`, errores);
        }
    }

    if (errores.length > 0) {
        errores.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            valList.appendChild(li);
        });
        valBox.hidden = false;
        return false;
    }

    if (confirmarEnvio()) {
        enviarFormularioAS();
    }
}

function validarNumero(min,max,numero){
    if (numero.value < min || numero.value > max)
        return false;
    return true;
}

function validarTexto(min,max,c) {
    if (c.value.length < min || c.value.length > max)
        return false;
    return true;
}

function agregarError(mensaje, errores) {
    errores.push(mensaje);
}

function confirmarEnvio(){
    return confirm("¿Estás seguro de que quieres enviar el formulario, revise que todos los datos sean correctos")
}

function enviarFormularioSS() {
    const form = document.getElementById("formSS");
    alert('¡Formulario enviado con éxito!');
    form.reset();
    closeModal();
}
function enviarFormularioAS() {
    const form = document.getElementById("formAS");
    alert('¡Formulario enviado con éxito!');
    form.reset();
    closeModal();
}