//Mi idea es hacer un sitio que sirva para hacerle seguimiento a estudios y aprendizaje.
//Tendria una lista de materias, y cada una tendria temas y subtemas. 
//Cada subtema tendra un estimado de horas necesarias para estudiar, cada tema la suma de horas de sus subtemas, y cada materia la suma de horas de sus temas.
//Tambien me gustaria mas adelante mostrar el avance de cada materia, tema y subtema como un porcentaje.


//Lista de Materias y funcion para agregar nuevas materias
//Cada materia tendra anidados temas que a su vez tendran anidados subtemas
materias = []
TotalHoras = 0
TotalHorasLeidas = 0
TotalHorasFaltantes = 0


// 01.Constructores

//Constructor de materias
function Materia(nombre) {
    this.Nombre = nombre
    this.Temas = []
    this.TotalHorasMateria = 0
    this.TotalHorasLeidasMateria = 0
    this.TotalHorasFaltantesMateria = 0

    this.AgregarTema = function(idTema) {




        //FALTA ALERT QUE NO PERMITA USAR ESTO SI LA MATERIA TODAVIA NO TIENE NOMBRE
        //var nombreDeLaMateriaParent = this.parentNode.parentNode.parentNode.firstChild.innerHTML
        var nombre = document.getElementById("inputNombreTemas" + idTema).value
        temaNuevo = new Tema(nombre)
        this.Temas.push(temaNuevo)

        $("#inputNombreTemas" + idTema).replaceWith("<h3>" + temaNuevo.Nombre + "</h3>")





        // FALTA VER COMO APUNTARLE A THIS>this.QuitarTema() !!!!!

        $("#botonConfirmarTema" + idTema).replaceWith('<img src="img/iconos/cruz.png" alt="cruz" id="cruz" onclick="QuitarTema()">')
    
    }

    this.QuitarTema = function(indiceDeTema) {
        this.Temas.splice(indiceDeTema,1)
    }

    this.SumarTotalHorasMateria = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        TotalHorasMateria = 0
        for (let indiceTemas = 0; indiceTemas < this.Temas.length; indiceTemas++) {
            this.TotalHorasMateria += this.Temas[indiceTemas].TotalHorasTema;
        }
        this.TotalHorasFaltantesMateria = this.TotalHorasMateria - this.TotalHorasLeidasMateria
    }

    this.SumarTotalHorasLeidasMateria = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        TotalHorasLeidasMateria = 0
        for (let indiceTemas = 0; indiceTemas < this.Temas.length; indiceTemas++) {
            this.TotalHorasLeidasMateria += this.Temas[indiceTemas].TotalHorasLeidasTema; 
        }
        this.TotalHorasFaltantesMateria = this.TotalHorasMateria - this.TotalHorasLeidasMateria
    }

}

//Constructor de Temas
function Tema(nombre) {
    this.Nombre = nombre
    this.Subtemas = []
    this.TotalHorasTema = 0
    this.TotalHorasLeidasTema = 0
    this.TotalHorasFaltantesTema = 0
    
    this.AgregarSubtema = function(idSubtema) {

        var nombre = document.getElementById("inputNombreSubtema" + idSubtema).value
        var horas = document.getElementById("inputHorasSubtema" + idSubtema).value
        subtemaNuevo = new Subtema(nombre, horas)
        this.Subtemas.push(subtemaNuevo)

        $("#inputNombreSubtema" + idSubtema).replaceWith("<h4>" + subtemaNuevo.Nombre + "</h4>")
        $("#inputHorasSubtema" + idSubtema).replaceWith("<h5>" + subtemaNuevo.Horas + " hs.</h5>")

        // FALTA VER COMO APUNTARLE A THIS>this.QuitarTema() !!!!!

        $("#botonConfirmarSubtema" + idSubtema).replaceWith('<img src="img/iconos/cruz.png" alt="cruz" id="cruz" onclick="QuitarTema()">')
    
    }
    
    this.QuitarSubtema = function(indiceDeSubtema) {
        this.Subtemas.splice(indiceDeSubtema,1)
    }

    this.SumarTotalHorasTema = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        TotalHorasTema = 0
        for (let indiceSubtemas = 0; indiceSubtemas < this.Subtemas.length; indiceSubtemas++) {
            this.TotalHorasTema += this.Subtemas[indiceSubtemas].Horas;
        }
        this.TotalHorasFaltantesTema = this.TotalHorasTema - this.TotalHorasLeidasTema
    }

    this.SumarTotalHorasLeidasTema = function() {
        //Al inciar reseteo valor de variable para no repetir sumas
        TotalHorasLeidasTema = 0
        for (let indiceSubtemas = 0; indiceSubtemas < this.Subtemas.length; indiceSubtemas++) {
            this.TotalHorasLeidasTema += this.Subtemas[indiceSubtemas].HorasLeidas; 
        }
        this.TotalHorasFaltantesTema = this.TotalHorasTema - this.TotalHorasLeidasTema
    }
}

//Constructor de Subtemas
//Cada tema tema tendria una cantidad de horas totales, horas leidas, y horas faltantes, que se iran sumando hacia arriba en los Temas y Materias
function Subtema(nombre, horas) {
    this.Nombre = nombre
    this.Horas = horas
    this.HorasLeidas = 0
    this.HorasFaltantes = this.Horas - this.HorasLeidas

    this.Lei = function() {
        
        do {
            this.HorasLeidas = parseInt(prompt("Cuantas horas leiste?"));
            if (this.HorasLeidas > this.Horas || this.HorasLeidas < 0) {
                alert("Las Horas Leidas no pueden ser mayor al total de horas. Tampoco pueden ser negativas")
            }
        } 
        while (this.HorasLeidas > this.Horas || this.HorasLeidas < 0);

    }
    
}






// 02.Creadores



contadorParaUlTemas = 0
contadorParaIdMaterias = 0
function CrearMateria(){

        //Crear Materia con input para su nombre y boton para agregarlo
        var ulMaterias = document.getElementById("materias")

        var materia = document.createElement("li")
        materia.setAttribute("id", "materia" + contadorParaIdMaterias)
        ulMaterias.appendChild(materia)

        var inputNombreMateria = document.createElement("input")
        inputNombreMateria.setAttribute("type", "text")
        inputNombreMateria.setAttribute("placeholder", "Nombre de la Materia " + contadorParaIdMaterias)
        inputNombreMateria.setAttribute("id", "inputNombreMaterias" + contadorParaIdMaterias)
        materia.appendChild(inputNombreMateria)

        var botonConfirmarMateria = document.createElement("button")
        botonConfirmarMateria.innerHTML = "Confirmar Materia"
        botonConfirmarMateria.setAttribute("id", "botonConfirmarMateria" + contadorParaIdTemas)
        botonConfirmarMateria.setAttribute("onclick", "AgregarMateria(" + contadorParaIdMaterias + ")")
        materia.appendChild(botonConfirmarMateria)

        //Creo el <ul> que va a tener los temas de esta materia
        var ulTemas = document.createElement("ul")
        ulTemas.setAttribute("id", "temas" + contadorParaUlTemas)
        materia.appendChild(ulTemas)
    
        //Creo el boton para crear temas
        var liBotonCrearTema = document.createElement("li")
        ulTemas.appendChild(liBotonCrearTema)

        var botonCrearTema = document.createElement("button")
        botonCrearTema.setAttribute("onclick", "CrearTema(" + contadorParaUlTemas + ")")
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
function CrearTema(IdUlTema) {

    //Crear tema con input para su nombre y boton para agregarlo

    var ulTemas = document.getElementById("temas" + IdUlTema)

    var tema = document.createElement("li")
    ulTemas.insertBefore(tema, ulTemas.lastElementChild)

    var inputNombreTema = document.createElement("input")
    inputNombreTema.setAttribute("type", "text")
    inputNombreTema.setAttribute("placeholder", "Nombre del Tema " + contadorParaIdTemas)
    inputNombreTema.setAttribute("id", "inputNombreTemas" + contadorParaIdTemas)
    tema.appendChild(inputNombreTema)

    var botonConfirmarTema = document.createElement("button")
    botonConfirmarTema.innerHTML = "Confirmar Tema"
    botonConfirmarTema.setAttribute("id", "botonConfirmarTema" + contadorParaIdTemas)
    tema.appendChild(botonConfirmarTema)
    var nombreDeLaMateriaParent = botonConfirmarTema.parentNode.parentNode.parentNode.firstChild.innerHTML
    botonConfirmarTema.setAttribute("onclick", "materias[" + SeleccionarMateriaPertenecienteAEsteTema(nombreDeLaMateriaParent) + "].AgregarTema(" + contadorParaIdTemas + ")")


    //Crear el <ul> que va tener los subtemas de este tema
    var ulSubtemas = document.createElement("ul")
    ulSubtemas.setAttribute("id", "subtemas" + contadorParaUlSubtemas)
    tema.appendChild(ulSubtemas)
    

    //Creo el boton para crear subtemas
    var liBotonCrearSubtema = document.createElement("li")
    ulSubtemas.appendChild(liBotonCrearSubtema)

    var botonCrearSubtema = document.createElement("button")
    botonCrearSubtema.setAttribute("onclick", "CrearSubtema(" + contadorParaUlSubtemas + ")")
    botonCrearSubtema.innerHTML = "Añadir subtema"
    botonCrearSubtema.setAttribute("disabled", "true")
    botonCrearSubtema.setAttribute("id", "botonCrearSubtema" + contadorParaUlSubtemas)
    liBotonCrearSubtema.appendChild(botonCrearSubtema)

    
    contadorParaUlSubtemas++
    contadorParaIdTemas++
}

var contadorParaIDSubtemas = 0
function CrearSubtema(IdUlSubtema) {
    

    var ulSubtemas = document.getElementById("subtemas" + IdUlSubtema)  
    
    var subtema = document.createElement("li")
    ulSubtemas.insertBefore(subtema, ulSubtemas.lastElementChild)
    
    
    var inputNombreSubtema = document.createElement("input")
    inputNombreSubtema.setAttribute("type", "text")
    inputNombreSubtema.setAttribute("placeholder", "Nombre del subtema " + contadorParaIDSubtemas)
    inputNombreSubtema.setAttribute("id", "inputNombreSubtema" + contadorParaIDSubtemas)
    subtema.appendChild(inputNombreSubtema)

    var inputHorasSubtema = document.createElement("input")
    inputHorasSubtema.setAttribute("type", "number")
    inputHorasSubtema.setAttribute("placeholder", 0)
    inputHorasSubtema.setAttribute("id", "inputHorasSubtema" + contadorParaIDSubtemas)
    subtema.appendChild(inputHorasSubtema)


    var botonConfirmarSubtema = document.createElement("button")
    botonConfirmarSubtema.innerHTML = "Confirmar Subtema"
    botonConfirmarSubtema.setAttribute("id", "botonConfirmarSubtema" + contadorParaIDSubtemas)

    subtema.appendChild(botonConfirmarSubtema)
    var nombreDelTemaParent = botonConfirmarSubtema.parentNode.parentNode.parentNode.firstChild.innerHTML
    var nombreDeLaMateriaParent = botonConfirmarSubtema.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.innerHTML
    botonConfirmarSubtema.setAttribute("onclick", "materias[" + SeleccionarMateriaPertenecienteAEsteTema(nombreDeLaMateriaParent) + "].Temas[" + SeleccionarTemaPertenecienteAEsteSubtema(nombreDeLaMateriaParent, nombreDelTemaParent) + "].AgregarSubtema(" + contadorParaIDSubtemas + ")")
    

    contadorParaIDSubtemas++
}







// 03.Funciones Varias




function AgregarMateria(idMateria) {
    debugger
    var nombre = document.getElementById("inputNombreMaterias" + idMateria).value
    var materiaNueva = new Materia(nombre)
    materias.push(materiaNueva)


    $("#inputNombreMaterias" + idMateria).replaceWith("<h2>" + materiaNueva.Nombre + "</h2>")
    $("#botonConfirmarMateria" + idMateria).replaceWith('<img src="img/iconos/cruz.png" alt="cruz" id="cruz" onclick="QuitarMateria()">')

    //Reactivar el boton para crear una materia nueva despues de agregar una
    $("#crearMateriaNueva").removeAttr('disabled')
    $("#botonCrearTema" + idMateria).removeAttr('disabled')
    
}

function QuitarMateria(indiceDeMateria) {
    materias.splice(indiceDeMateria, 1)
}

function SumarHorasTotales() {
    //Al inciar reseteo valor de variable para no repetir sumas
    TotalHoras = 0
    for (let indiceMaterias = 0; indiceMaterias < materias.length; indiceMaterias++) {
        TotalHoras += materias[indiceMaterias].TotalHorasMateria;
    }
    TotalHorasFaltantes = TotalHoras - TotalHorasLeidas
}

function SumarHorasLeidasTotales() {
    //Al inciar reseteo valor de variable para no repetir sumas
    TotalHorasLeidas = 0
    for (let indiceMaterias = 0; indiceMaterias < materias.length; indiceMaterias++) {
        TotalHorasLeidas += materias[indiceMaterias].TotalHorasLeidasMateria; 
    }
    TotalHorasFaltantes = TotalHoras - TotalHorasLeidas
}


function SeleccionarMateriaPertenecienteAEsteTema(nombreDeLaMateria) {
    for (let index = 0; index < materias.length; index++) {
        if (materias[index].Nombre == nombreDeLaMateria) {
            return index
        }      
    }
}

function SeleccionarTemaPertenecienteAEsteSubtema(nombreDeLaMateria, nombreDelTema) {

    var indexMateria = SeleccionarMateriaPertenecienteAEsteTema(nombreDeLaMateria)

    for (let index = 0; index < materias[indexMateria].Temas.length; index++) {
        if (materias[indexMateria].Temas[index].Nombre == nombreDelTema) {
            return index
        }  
        console.log(index)    
    }
}






// 04.Storage



function Guardar() {
    var copiaMaterias = materias
    materiasJSON = JSON.stringify(copiaMaterias)
    sessionStorage.setItem("materias", materiasJSON) 
}

$( document ).ready(function() {
    
    var materiasJSON = sessionStorage.getItem("materias")

    if (materiasJSON != null) {
        
        materias = JSON.parse(materiasJSON)
    } 
    
})



/*
//Tests de funcionalidad
AgregarMateria("biologia")
materias[0].AgregarTema("Sistema nervioso")

materias[0].Temas[0].AgregarSubtema("Cerebro", 6)
materias[0].Temas[0].AgregarSubtema("Neuronas", 4)

materias[0].Temas[0].Subtemas[0].Lei()
console.log("Lei: " + materias[0].Temas[0].Subtemas[0].HorasLeidas + "horas")
materias[0].Temas[0].Subtemas[1].Lei()
console.log("Lei: " + materias[0].Temas[0].Subtemas[1].HorasLeidas + "horas")


materias[0].Temas[0].SumarTotalHorasTema()
console.log("El total de horas del tema es: " + materias[0].Temas[0].TotalHorasTema)


materias[0].SumarTotalHorasMateria()
console.log("El total de horas de la materia es: " + materias[0].TotalHorasMateria)

materias[0].Temas[0].SumarTotalHorasLeidasTema()
console.log("El total de horas leidas del tema es: " + materias[0].Temas[0].TotalHorasLeidasTema)

materias[0].SumarTotalHorasLeidasMateria()
console.log("El total de horas leidas de la materia es: " + materias[0].TotalHorasLeidasMateria)

console.log("El total de horas que falta leer es:" + materias[0].TotalHorasFaltantesMateria)

SumarHorasTotales()
SumarHorasLeidasTotales()

console.log("Las horas totales son: " + TotalHoras)
console.log("Las horas leidas totales son: " + TotalHorasLeidas)

console.log("Las horas totales que falta leer son: " + TotalHorasFaltantes)







// mate = new Tema("Matematicas")
// mate.AgregarSubtema("divisiones")
// mate.AgregarSubtema("Multiplicaciones", 3)

*/