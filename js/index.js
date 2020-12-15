//Mi idea es hacer un sitio que sirva para hacerle seguimiento a estudios y aprendizaje.
//Tendria una lista de materias, y cada una tendria temas y subtemas. 
//Cada subtema tendra un estimado de horas necesarias para estudiar, cada tema la suma de horas de sus subtemas, y cada materia la suma de horas de sus temas.
//Se calcula el porcentage de avance (cuantas horas se leyeron sobre las horas totales) y se expresa en una barra de progreso

materias = []
TotalHoras = 0
TotalHorasLeidas = 0
TotalHorasFaltantes = 0


// 01.Constructores

//Constructor de materias
function Materia(nombre, contadorMateria) {
    this.Nombre = nombre
    this.Temas = []
    this.TotalHorasMateria = 0
    this.TotalHorasLeidasMateria = 0
    this.TotalHorasFaltantesMateria = 0
    this.ContadorMateria = contadorMateria

    this.AgregarTema = function(idTema, contadorMaterias) {

        var nombre = document.getElementById("inputNombreTemas" + idTema).value
        if (nombre == "") {
            alert("El Tema debe tener un nombre válido")
            return
        }
        temaNuevo = new Tema(nombre, idTema)
        this.Temas.push(temaNuevo)

        //Agregar contador de horas del Tema en HTML
        let horasLeidasTemaEnHTML = "<span class='horasLeidasTema' id='horasLeidasTema" + idTema + "'> 0 hs. </span>"
        let horasTotalesTemaEnHTML = "<span class='horasTotalesTema' id='horasTotalesTema" + idTema + "'> 0 hs. </span>"
        $("#inputNombreTemas" + idTema).replaceWith("<h3 class='tituloTema'>" + temaNuevo.Nombre + "</h3><div class='divTituloTema'>" + horasLeidasTemaEnHTML + "<span class='horasLeidasTema'>/</span>" + horasTotalesTemaEnHTML+ "</div>")

        //Quitarle el disabled al boton para crear subtemas
        $("#botonCrearSubtema" + idTema).removeAttr("disabled")

        //quitarle el disabled al boton para crear temas
        $("#botonCrearTema" + idTema).removeAttr("disabled")

        //Eliminar boton para confirmar tema y crear cruz para eliminar tema
        $("#botonConfirmarTema" + idTema).replaceWith('<a href="#"><img src="img/iconos/cruz.png" alt="cruz" class="cruz" id="cruz' + idTema + '" onclick="materias[SeleccionarMateriaPertenecienteAEsteTema(' + contadorMaterias + ')].QuitarTema(SeleccionarTemaPertenecienteAEsteSubtema(' + contadorMaterias + ', ' + idTema + ')' + ', ' + idTema + ')"></a>')
    }

    this.QuitarTema = function(indiceDeTema, idTema) {
        this.Temas.splice(indiceDeTema, 1)
        CalcularHoras()
        $("#liTema" + idTema).remove()
    }

    this.SumarTotalHorasMateria = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        this.TotalHorasMateria = 0
        for (let indiceTemas = 0; indiceTemas < this.Temas.length; indiceTemas++) {
            if (this.Temas[indiceTemas] == null) {
                continue
            }
            this.TotalHorasMateria += this.Temas[indiceTemas].TotalHorasTema;
        }
        this.TotalHorasFaltantesMateria = this.TotalHorasMateria - this.TotalHorasLeidasMateria
    }

    this.SumarTotalHorasLeidasMateria = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        this.TotalHorasLeidasMateria = 0
        for (let indiceTemas = 0; indiceTemas < this.Temas.length; indiceTemas++) {
            if (this.Temas[indiceTemas] == null) {
                continue
            }
            this.TotalHorasLeidasMateria += this.Temas[indiceTemas].TotalHorasLeidasTema; 
        }
        this.TotalHorasFaltantesMateria = this.TotalHorasMateria - this.TotalHorasLeidasMateria
    }
}

//Constructor de Temas
function Tema(nombre, contadorTema) {
    this.Nombre = nombre
    this.Subtemas = []
    this.TotalHorasTema = 0
    this.TotalHorasLeidasTema = 0
    this.TotalHorasFaltantesTema = 0
    this.ContadorTema = contadorTema
    
    this.AgregarSubtema = function(contadorMaterias, contadorTemas, idSubtema) {
        var nombre = document.getElementById("inputNombreSubtema" + idSubtema).value
        if (nombre == "") {
            alert("El subtema debe tener un nombre válido")
            return
        }

        subtemaNuevo = new Subtema(nombre, idSubtema)
        this.Subtemas.push(subtemaNuevo)

        $("#inputNombreSubtema" + idSubtema).replaceWith("<h5>" + subtemaNuevo.Nombre + "</h5>")    

        //Crear inputs para horas leidas y totales
        var liSubtema = document.getElementById("liSubtema" + idSubtema)

        let divParaInputsHorasSubtema = document.createElement("div")
        divParaInputsHorasSubtema.setAttribute("class", "divTituloSubtema")
        liSubtema.appendChild(divParaInputsHorasSubtema)

        let inputHorasLeidasSubtema = document.createElement("input")
        inputHorasLeidasSubtema.setAttribute("type", "number")
        inputHorasLeidasSubtema.setAttribute("class", "inputHorasSubtema")
        inputHorasLeidasSubtema.setAttribute("placeholder", "0")
        inputHorasLeidasSubtema.setAttribute("id", "inputHorasLeidasSubtema" + idSubtema)

        inputHorasLeidasSubtema.setAttribute("oninput", "materias[SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + ")].Temas[SeleccionarTemaPertenecienteAEsteSubtema(" + contadorMaterias + ", " + contadorTemas + ")].Subtemas[SeleccionarIndiceDeEsteSubtema(" + contadorMaterias + ", " + contadorTemas + ", " + idSubtema + ")].Lei(" + idSubtema + ", SeleccionarTemaPertenecienteAEsteSubtema(" + contadorMaterias + ", " + contadorTemas + "), SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + "))")
        divParaInputsHorasSubtema.appendChild(inputHorasLeidasSubtema)

        let barrita = document.createElement("h5")
        barrita.setAttribute("class", "barrita")
        barrita.innerHTML = "/"
        divParaInputsHorasSubtema.appendChild(barrita)

        let inputHorasTotalesSubtema = document.createElement("input")
        inputHorasTotalesSubtema.setAttribute("type", "number")
        inputHorasTotalesSubtema.setAttribute("class", "inputHorasSubtema")
        inputHorasTotalesSubtema.setAttribute("placeholder", "0")
        inputHorasTotalesSubtema.setAttribute("id", "inputHorasSubtema" + idSubtema)
        inputHorasTotalesSubtema.setAttribute("oninput", "materias[SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + ")].Temas[SeleccionarTemaPertenecienteAEsteSubtema(" + contadorMaterias + ", " + contadorTemas + ")].Subtemas[SeleccionarIndiceDeEsteSubtema(" + contadorMaterias + ", " + contadorTemas + ", " + idSubtema + ")].HorasTotales(" + idSubtema + ", SeleccionarTemaPertenecienteAEsteSubtema(" + contadorMaterias + ", " + contadorTemas + "), SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + "))")
        divParaInputsHorasSubtema.appendChild(inputHorasTotalesSubtema)

        //Eliminar boton confirmar subtema y crear cruz para borrar
        $("#botonConfirmarSubtema" + idSubtema).replaceWith('<a href="#"><img src="img/iconos/cruz.png" alt="cruz" class="cruz" onclick="materias[SeleccionarMateriaPertenecienteAEsteTema(' + contadorMaterias + ')].Temas[SeleccionarTemaPertenecienteAEsteSubtema(' + contadorMaterias + ', ' + contadorTemas + ')].QuitarSubtema(SeleccionarIndiceDeEsteSubtema(' + contadorMaterias + ', ' + contadorTemas + ', ' + idSubtema + '), ' + idSubtema + ')"></a>')
    }
    
    this.QuitarSubtema = function(indiceDeSubtema, idSubtema) {
        this.Subtemas.splice(indiceDeSubtema, 1)
        CalcularHoras()
        $("#liSubtema" + idSubtema).remove()
    }

    this.SumarTotalHorasTema = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        this.TotalHorasTema = 0
        for (let indiceSubtemas = 0; indiceSubtemas < this.Subtemas.length; indiceSubtemas++) {
            if (this.Subtemas[indiceSubtemas] == null) {
                continue
            }
            this.TotalHorasTema += this.Subtemas[indiceSubtemas].Horas;
        }
        this.TotalHorasFaltantesTema = this.TotalHorasTema - this.TotalHorasLeidasTema
    }

    this.SumarTotalHorasLeidasTema = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        this.TotalHorasLeidasTema = 0
        for (let indiceSubtemas = 0; indiceSubtemas < this.Subtemas.length; indiceSubtemas++) {
            if (this.Subtemas[indiceSubtemas] == null) {
                continue
            }
            this.TotalHorasLeidasTema += this.Subtemas[indiceSubtemas].HorasLeidas; 
        }
        this.TotalHorasFaltantesTema = this.TotalHorasTema - this.TotalHorasLeidasTema
    }
}

//Constructor de Subtemas
//Cada subtema tendria una cantidad de horas totales, horas leidas, y horas faltantes, que se iran sumando hacia arriba en los Temas y Materias
function Subtema(nombre, contadorSubtema) {
    this.Nombre = nombre
    this.Horas = 0
    this.HorasLeidas = 0
    this.HorasFaltantes = 0
    this.ContadorSubtema = contadorSubtema

    this.Lei = function(idSubtema, indexTemaParent, indexMateriaParent) {
        if (document.getElementById("inputHorasLeidasSubtema" + idSubtema) != null) {

            let horasLeidas = Number(document.getElementById("inputHorasLeidasSubtema" + idSubtema).value);
            if (horasLeidas > this.Horas || horasLeidas < 0) {
                alert("Las Horas Leidas no pueden ser mayor al total de horas. Tampoco pueden ser negativas")
                document.getElementById("inputHorasLeidasSubtema" + idSubtema).value = 0
                return
            }

            this.HorasLeidas = horasLeidas
            this.HorasFaltantes = this.Horas - this.HorasLeidas

            materias[indexMateriaParent].Temas[indexTemaParent].SumarTotalHorasLeidasTema()
            materias[indexMateriaParent].SumarTotalHorasLeidasMateria()
            SumarHorasLeidasTotales()

            // actualizar Horas Leidas de los Temas y Materias en HTML
            let idTema = materias[indexMateriaParent].Temas[indexTemaParent].ContadorTema 
            let idMateria = materias[indexMateriaParent].ContadorMateria
            document.getElementById("horasLeidasTema" + idTema).innerHTML = materias[indexMateriaParent].Temas[indexTemaParent].TotalHorasLeidasTema + "hs."
            document.getElementById("horasLeidasMateria" + idMateria).innerHTML = materias[indexMateriaParent].TotalHorasLeidasMateria + "hs."

            ActualizarHorasTotalesEnHTML()
        }
    }

    this.HorasTotales = function(idSubtema, indexTemaParent, indexMateriaParent) {

        if (document.getElementById("inputHorasSubtema" + idSubtema) != null) {
            
            let horas = Number(document.getElementById("inputHorasSubtema" + idSubtema).value)
            if (this.HorasLeidas > horas || horas < 0) {
                alert("El total de horas no puede ser menor al total de horas leídas. Tampoco pueden ser negativas")
                document.getElementById("inputHorasSubtema" + idSubtema).value = 0
                return
            }
            this.Horas = horas
            this.HorasFaltantes = this.Horas - this.HorasLeidas

            materias[indexMateriaParent].Temas[indexTemaParent].SumarTotalHorasTema()
            materias[indexMateriaParent].SumarTotalHorasMateria()
            SumarHorasTotales()

            // actualizar Horas Totales de los Temas y materias en HTML
            let idTema = materias[indexMateriaParent].Temas[indexTemaParent].ContadorTema 
            let idMateria = materias[indexMateriaParent].ContadorMateria
            document.getElementById("horasTotalesTema" + idTema).innerHTML = materias[indexMateriaParent].Temas[indexTemaParent].TotalHorasTema + "hs."
            document.getElementById("horasTotalesMateria" + idMateria).innerHTML = materias[indexMateriaParent].TotalHorasMateria + "hs."
            
            ActualizarHorasTotalesEnHTML()
        }
    } 
}



// 02.Creadores



contadorParaUlTemas = 0
contadorParaIdMaterias = 0
function CrearMateria(){
        //Crear Materia con input para su nombre y boton para agregarlo
        if (materias.length == 0) {
            document.getElementById("barraProgreso").style.display = "block";
        }
        var ulMaterias = document.getElementById("materias")

        var materia = document.createElement("li")
        materia.setAttribute("id", "materia" + contadorParaIdMaterias)
        materia.setAttribute("class", "liMateria")
        ulMaterias.appendChild(materia)

        var inputNombreMateria = document.createElement("input")
        inputNombreMateria.setAttribute("type", "text")
        inputNombreMateria.setAttribute("placeholder", "Nombre de la Materia ")
        inputNombreMateria.setAttribute("id", "inputNombreMaterias" + contadorParaIdMaterias)
        materia.appendChild(inputNombreMateria)

        var botonConfirmarMateria = document.createElement("button")
        botonConfirmarMateria.innerHTML = "Confirmar Materia"
        botonConfirmarMateria.setAttribute("id", "botonConfirmarMateria" + contadorParaIdMaterias)
        botonConfirmarMateria.setAttribute("onclick", "AgregarMateria(" + contadorParaIdMaterias + ")")
        materia.appendChild(botonConfirmarMateria)

        //Creo el <ul> que va a tener los temas de esta materia
        var ulTemas = document.createElement("ul")
        ulTemas.setAttribute("id", "temas" + contadorParaUlTemas)
        ulTemas.setAttribute("class", "list-group")
        materia.appendChild(ulTemas)
    
        //Creo el boton para crear temas
        var liBotonCrearTema = document.createElement("li")
        ulTemas.appendChild(liBotonCrearTema)

        var botonCrearTema = document.createElement("button")
        botonCrearTema.setAttribute("onclick", "CrearTema(" + contadorParaUlTemas + ", " + contadorParaIdMaterias + ")")
        botonCrearTema.innerHTML = "Añadir Tema"
        botonCrearTema.setAttribute("disabled", "true")
        botonCrearTema.setAttribute("id", "botonCrearTema" + contadorParaUlTemas)

        liBotonCrearTema.appendChild(botonCrearTema)

        //Hago el boton unclickeable para que no se pueda agregar una materia sin haber confirmado la anterior
        $("#crearMateriaNueva").attr("disabled", "true")

        contadorParaUlTemas++
        contadorParaIdMaterias++
}

contadorParaUlSubtemas = 0
contadorParaIdTemas = 0
function CrearTema(IdUlTema, contadorMaterias) {

    //Crear tema con input para su nombre y boton para agregarlo
    var ulTemas = document.getElementById("temas" + IdUlTema)

    var tema = document.createElement("li")
    tema.setAttribute("id", "liTema" + contadorParaIdTemas)
    tema.setAttribute("class", "list-group-item")
    ulTemas.insertBefore(tema, ulTemas.lastElementChild)

    var inputNombreTema = document.createElement("input")
    inputNombreTema.setAttribute("type", "text")
    inputNombreTema.setAttribute("placeholder", "Nombre del Tema ")
    inputNombreTema.setAttribute("id", "inputNombreTemas" + contadorParaIdTemas)
    tema.appendChild(inputNombreTema)

    var botonConfirmarTema = document.createElement("button")
    botonConfirmarTema.innerHTML = "Confirmar Tema"
    botonConfirmarTema.setAttribute("id", "botonConfirmarTema" + contadorParaIdTemas)
    tema.appendChild(botonConfirmarTema)

    botonConfirmarTema.setAttribute("onclick", "materias[SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + ")].AgregarTema(" + contadorParaIdTemas + ", " + contadorMaterias + ")")

    //Crear el <ul> que va tener los subtemas de este tema
    var ulSubtemas = document.createElement("ul")
    ulSubtemas.setAttribute("id", "subtemas" + contadorParaUlSubtemas)
    tema.appendChild(ulSubtemas)
    
    //Creo el boton para crear subtemas
    var liBotonCrearSubtema = document.createElement("li")
    ulSubtemas.appendChild(liBotonCrearSubtema)

    var botonCrearSubtema = document.createElement("button")
    botonCrearSubtema.setAttribute("onclick", "CrearSubtema(" + contadorParaUlSubtemas + "," + contadorMaterias + ")")
    botonCrearSubtema.innerHTML = "Añadir subtema"
    botonCrearSubtema.setAttribute("disabled", "true")
    botonCrearSubtema.setAttribute("id", "botonCrearSubtema" + contadorParaUlSubtemas)
    liBotonCrearSubtema.appendChild(botonCrearSubtema)

    //Hago el boton unclickeable para que no se pueda agregar una materia sin haber confirmado la anterior
    $("#botonCrearTema" + contadorParaIdTemas).attr("disabled", "true")
    
    contadorParaUlSubtemas++
    contadorParaIdTemas++
}

var contadorParaIDSubtemas = 0
function CrearSubtema(IdUlSubtema, contadorMaterias) {
    
    var ulSubtemas = document.getElementById("subtemas" + IdUlSubtema)  
    
    var subtema = document.createElement("li")
    subtema.setAttribute("id", "liSubtema" + contadorParaIDSubtemas)
    ulSubtemas.insertBefore(subtema, ulSubtemas.lastElementChild)
    
    //Crear input para nombre subtema
    var inputNombreSubtema = document.createElement("input")
    inputNombreSubtema.setAttribute("type", "text")
    inputNombreSubtema.setAttribute("placeholder", "Nombre del subtema ")
    inputNombreSubtema.setAttribute("id", "inputNombreSubtema" + contadorParaIDSubtemas)
    subtema.appendChild(inputNombreSubtema)

    //crear input para horas
    var botonConfirmarSubtema = document.createElement("button")
    botonConfirmarSubtema.innerHTML = "Confirmar Subtema"
    botonConfirmarSubtema.setAttribute("id", "botonConfirmarSubtema" + contadorParaIDSubtemas)

    subtema.appendChild(botonConfirmarSubtema)
    botonConfirmarSubtema.setAttribute("onclick", "materias[SeleccionarMateriaPertenecienteAEsteTema(" + contadorMaterias + ")].Temas[SeleccionarTemaPertenecienteAEsteSubtema(" + contadorMaterias + "," + IdUlSubtema + ")].AgregarSubtema(" + contadorMaterias + "," + IdUlSubtema + ", " + contadorParaIDSubtemas + ")")
    
    contadorParaIDSubtemas++
}



// 03.Funciones Varias



function AgregarMateria(idMateria) {

    var nombre = document.getElementById("inputNombreMaterias" + idMateria).value
    if (nombre == "") {
        alert("La materia debe tener un nombre válido")
        return
    }
    var materiaNueva = new Materia(nombre, idMateria)
    materias.push(materiaNueva)

    // reemplazar input de nombre materia por nombre fijo y horas
    let horasLeidasMateriaEnHTML = "<h4 class='horasLeidasMateria' id='horasLeidasMateria" + idMateria + "'> 0 hs. </h4>"
    let horasTotalesMateriaEnHTML = "<h4 class='horasTotalesMateria' id='horasTotalesMateria" + idMateria + "'> 0 hs. </h4>"
    

    $("#inputNombreMaterias" + idMateria).replaceWith("<h2>" + materiaNueva.Nombre + "</h3><div class='divTituloMateria'>" + horasLeidasMateriaEnHTML + "<h4>/</h4>" + horasTotalesMateriaEnHTML + "</div>")
    $("#botonConfirmarMateria" + idMateria).replaceWith('<a href="#"><img src="img/iconos/cruz.png" alt="cruz" class="cruz" onclick="QuitarMateria(' + idMateria + ')"></a>')

    //Reactivar el boton para crear una materia nueva despues de agregar una
    $("#crearMateriaNueva").removeAttr('disabled')
    $("#botonCrearTema" + idMateria).removeAttr('disabled')
    
}

function QuitarMateria(contadorMateria) {
    let indiceDeMateria = SeleccionarMateriaPertenecienteAEsteTema(contadorMateria)
    materias.splice(indiceDeMateria, 1)
    if (materias.length == 0) {
        document.getElementById("barraProgreso").style.display = "none";  
    }
    CalcularHoras()
    $("#materia" + contadorMateria).remove()
}

function SumarHorasTotales() {
    //Al inciar reseteo valor de variable para no repetir sumas
    TotalHoras = 0
    for (let indiceMaterias = 0; indiceMaterias < materias.length; indiceMaterias++) {
        if(materias[indiceMaterias]==null){
            continue
        }
        TotalHoras += materias[indiceMaterias].TotalHorasMateria;
    }
    TotalHorasFaltantes = TotalHoras - TotalHorasLeidas
    ActualizarBarraDeProgreso()
}

function SumarHorasLeidasTotales() {
    //Al inciar reseteo valor de variable para no repetir sumas
    TotalHorasLeidas = 0
    for (let indiceMaterias = 0; indiceMaterias < materias.length; indiceMaterias++) {
        if(materias[indiceMaterias]==null){
            continue
        }
        TotalHorasLeidas += materias[indiceMaterias].TotalHorasLeidasMateria; 
    }
    TotalHorasFaltantes = TotalHoras - TotalHorasLeidas
    ActualizarBarraDeProgreso()
}


function SeleccionarMateriaPertenecienteAEsteTema(contadorMateria) {
    for (let index = 0; index < materias.length; index++) {
        if (materias[index] == null) {
            continue
        }
        if (materias[index].ContadorMateria == contadorMateria) {
            return index
        }      
    }
}

function SeleccionarTemaPertenecienteAEsteSubtema(contadorMateria, contadorTema) {

    var indexMateria = SeleccionarMateriaPertenecienteAEsteTema(contadorMateria)
    for (let index = 0; index < materias[indexMateria].Temas.length; index++) {
        if (materias[indexMateria].Temas[index] == null){
            continue
        }
        if (materias[indexMateria].Temas[index].ContadorTema == contadorTema) {
            return index
        }    
    }
}

function SeleccionarIndiceDeEsteSubtema(contadorMateria, contadorTema, contadorSubtema) {
    var indexMateria = SeleccionarMateriaPertenecienteAEsteTema(contadorMateria)
    var indexTema = SeleccionarTemaPertenecienteAEsteSubtema(contadorMateria, contadorTema)
    for (let index = 0; index < materias[indexMateria].Temas[indexTema].Subtemas.length; index++) {
        if (materias[indexMateria].Temas[indexTema].Subtemas[index] == null){
            continue
        }
        if (materias[indexMateria].Temas[indexTema].Subtemas[index].ContadorSubtema == contadorSubtema) {
            return index
        }    
    }
}

// Conteo de horas

function CalcularHoras() {
    //Al inciar reseteo valor de variable para no repetir sumas
    TotalHoras = 0
    TotalHorasLeidas = 0
    TotalHorasFaltantes = 0
    for (let indexMaterias = 0; indexMaterias < materias.length; indexMaterias++) {
        const mat = materias[indexMaterias];
        mat.TotalHorasMateria = 0
        mat.TotalHorasLeidasMateria = 0
        mat.TotalHorasFaltantesMateria = 0
        if (mat == null) {
            continue
        }
        for (let indexTemas = 0; indexTemas < mat.Temas.length; indexTemas++) {
            const tem = mat.Temas[indexTemas];
            tem.TotalHorasTema = 0
            tem.TotalHorasLeidasTema = 0
            tem.TotalHorasFaltantesTema = 0
            if (tem == null) {
                continue
            }
            for (let indexSubtemas = 0; indexSubtemas < tem.Subtemas.length; indexSubtemas++) {
                const subtem = tem.Subtemas[indexSubtemas];
                if (subtem == null) {
                    continue
                }

                subtem.Lei(indexSubtemas, indexTemas, indexMaterias)
                subtem.HorasTotales(indexSubtemas, indexTemas, indexMaterias)
  
            }
            tem.SumarTotalHorasTema()
            tem.SumarTotalHorasLeidasTema()
            let idTema = tem.ContadorTema
            document.getElementById("horasTotalesTema" + idTema).innerHTML = tem.TotalHorasTema + "hs."
            document.getElementById("horasLeidasTema" + idTema).innerHTML = tem.TotalHorasLeidasTema + "hs."

        }
        mat.SumarTotalHorasMateria()
        mat.SumarTotalHorasLeidasMateria()
        let idMateria = mat.ContadorMateria 
        document.getElementById("horasTotalesMateria" + idMateria).innerHTML = mat.TotalHorasMateria + "hs."
        document.getElementById("horasLeidasMateria" + idMateria).innerHTML = mat.TotalHorasLeidasMateria + "hs."
    }
    SumarHorasTotales()
    SumarHorasLeidasTotales()
    // console.log("El total de horas es: " + TotalHoras)
    // console.log("El total de horas leidas es: " + TotalHorasLeidas)
    // console.log("El total de horas faltantes es: " + TotalHorasFaltantes)

    ActualizarHorasTotalesEnHTML()
}

function ActualizarHorasTotalesEnHTML() {
    $("#horasTotales").html("Horas Totales: " + TotalHoras)
    $("#horasLeidasTotales").html("Horas Leídas: " + TotalHorasLeidas)
    $("#horasFaltantesTotales").html("Horas Faltantes: " + TotalHorasFaltantes)
}

function ActualizarBarraDeProgreso() {
    let porcentaje
    if (TotalHoras == 0) {
        porcentaje = 0
    }
    else {
        porcentaje = parseInt(TotalHorasLeidas * 100 / TotalHoras)
    }
    document.getElementById("progressBar").style = "width: " + porcentaje + "%"
    document.getElementById("progressBar").innerHTML = porcentaje + "%"
}

// Usar Api para citas que motivan

function RecibirInspiracion(){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://type.fit/api/quotes",
        "method": "GET"
      }

      var numeroRandom = Math.floor(Math.random() * 1643) + 1; // returns a random integer from 1 to 100

      $.ajax(settings).done(function (response) {
        const data = JSON.parse(response);
        alert(data[numeroRandom].text + " " + data[numeroRandom].author);
      }); 
}



// 04.Storage



function Guardar() {
    //Guardar array de materias
    var copiaMaterias = materias
    materiasJSON = JSON.stringify(copiaMaterias)
    localStorage.setItem("materias", materiasJSON) 

    //guardar elementos HTML
    var body = document.body.innerHTML
    localStorage.setItem("content", body)

    //guardar variables de contadores
    localTotalHoras = TotalHoras
    localTotalHorasLeidas = TotalHorasLeidas
    localTotalHorasFaltantes = TotalHorasFaltantes
    localContadorParaUlTemas = contadorParaUlTemas
    localContadorParaIdMaterias = contadorParaIdMaterias
    localContadorParaUlSubtemas = contadorParaUlSubtemas
    localContadorParaIdTemas = contadorParaIdTemas
    localContadorParaIDSubtemas = contadorParaIDSubtemas

    localStorage.setItem("TotalHoras", localTotalHoras)
    localStorage.setItem("TotalHorasLeidas", localTotalHorasLeidas)
    localStorage.setItem("TotalHorasFaltantes", localTotalHorasFaltantes)
    localStorage.setItem("contadorParaUlTemas", localContadorParaUlTemas)
    localStorage.setItem("contadorParaIdMaterias", localContadorParaIdMaterias)
    localStorage.setItem("contadorParaUlSubtemas", localContadorParaUlSubtemas)
    localStorage.setItem("contadorParaIdTemas", localContadorParaIdTemas)
    localStorage.setItem("contadorParaIDSubtemas", localContadorParaIDSubtemas)
}

$( document ).ready(function() {
    
    var materiasJSON = localStorage.getItem("materias")
    if (materiasJSON != null) {
        //Cargar materias
        materiasCargadas = JSON.parse(materiasJSON)

        //Cargar body en HTML
        document.body.innerHTML = localStorage.getItem("content")

        //Cargar valores de variables de contadores
        TotalHoras = localStorage.getItem("TotalHoras")
        TotalHorasLeidas = localStorage.getItem("TotalHorasLeidas")
        TotalHorasFaltantes = localStorage.getItem("TotalHorasFaltantes")
        contadorParaUlTemas = localStorage.getItem("contadorParaUlTemas")
        contadorParaIdMaterias = localStorage.getItem("contadorParaIdMaterias")
        contadorParaUlSubtemas = localStorage.getItem("contadorParaUlSubtemas")
        contadorParaIdTemas = localStorage.getItem("contadorParaIdTemas")
        contadorParaIDSubtemas = localStorage.getItem("contadorParaIDSubtemas")

        // Inicializar los objetos guardados en el array materias
        for (let indexMaterias = 0; indexMaterias < materiasCargadas.length; indexMaterias++) {
            const mat = materiasCargadas[indexMaterias]
    
            var materiaNueva = new Materia(mat.Nombre, mat.ContadorMateria)
            materiaNueva.TotalHorasMateria = mat.TotalHorasMateria
            materiaNueva.TotalHorasLeidasMateria = mat.TotalHorasLeidasMateria
            materiaNueva.TotalHorasFaltantesMateria = mat.TotalHorasFaltantesMateria
            materias.push(materiaNueva)

            for (let indexTemas = 0; indexTemas < mat.Temas.length; indexTemas++) {
                const tem = mat.Temas[indexTemas];
                const temas = materias[indexMaterias].Temas;

                temaNuevo = new Tema(tem.Nombre, tem.ContadorTema)
                temaNuevo.TotalHorasTema = tem.TotalHorasTema
                temaNuevo.TotalHorasLeidasTema = tem.TotalHorasLeidasTema
                temaNuevo.TotalHorasFaltantesTema = tem.TotalHorasFaltantesTema
                temas.push(temaNuevo)

                for (let indexSubtemas = 0; indexSubtemas < tem.Subtemas.length; indexSubtemas++) {
                    const subtem = tem.Subtemas[indexSubtemas];

                    const subtemas = materias[indexMaterias].Temas[indexTemas].Subtemas;

                    subtemaNuevo = new Subtema(subtem.Nombre, subtem.ContadorSubtema)
                    subtemaNuevo.Horas = subtem.Horas
                    subtemaNuevo.HorasLeidas = subtem.HorasLeidas
                    subtemaNuevo.HorasFaltantes = subtem.HorasFaltantes
                    subtemas.push(subtemaNuevo)
                }
    
            }
        }

        //Mostrar la barra de progreso con el valor correcto
        if (materias.length == 0) {
            document.getElementById("barraProgreso").style.display = "none";
        }
        if (materias.length != 0) {
            document.getElementById("barraProgreso").style.display = "block";  
        }
        ActualizarBarraDeProgreso()

        //cargar los inputs de horas de subtemas que corresponden
        for (let indexMaterias = 0; indexMaterias < materias.length; indexMaterias++) {
            const mat = materias[indexMaterias];
            for (let indexTemas = 0; indexTemas < mat.Temas.length; indexTemas++) {
                const tem = mat.Temas[indexTemas];
                for (let indexSubtemas = 0; indexSubtemas < tem.Subtemas.length; indexSubtemas++) {
                    const subtem = tem.Subtemas[indexSubtemas];
                    idSubtema = subtem.ContadorSubtema
                    inputHorasSubtema = subtem.Horas
                    inputHorasLeidasSubtema = subtem.HorasLeidas
    
                    document.getElementById("inputHorasSubtema" + idSubtema).value = inputHorasSubtema
                    document.getElementById("inputHorasLeidasSubtema" + idSubtema).value = inputHorasLeidasSubtema
                }
            }
        }
    } 
})