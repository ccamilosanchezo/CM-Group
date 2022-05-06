const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('sign out')
        location.reload()
    })
})

const listademodelos = document.querySelector('#listamodelos');
listademodelos.addEventListener('change', e => {
    e.preventDefault()
    if (listamodelos.value != 0) {
        $('#modelassignsubmit').prop('disabled', false);
    }
    else {
        $('#modelassignsubmit').prop('disabled', true);
    }
})

const selectturno = document.querySelector('#selectturno');
selectturno.addEventListener('change', e => {
    e.preventDefault()
    buscardisponible(document.querySelector('#changefecha').value, selectturno.value, document.getElementById('changeturno').value, document.getElementById('changeid').value, document.getElementById('changesede').value)
    document.querySelector('#changefecha').value
})

const flistaños = document.querySelector('#flistaños');
flistaños.addEventListener('change', e => {
    e.preventDefault()
    if (flistaños.value != 0) {
        $('#flistmeses').prop('disabled', false);
        buscarmeses(flistaños.value)
    }
    else {
        $('#flistmeses').prop('disabled', true);
        $('#flistdias').prop('disabled', true);
    }
})

const edicion = document.querySelector('#flexSwitchCheckDefault')
edicion.addEventListener('change', e => {
    e.preventDefault()
    console.log(document.querySelector('#flexSwitchCheckDefault').checked)
    var x = document.getElementsByClassName('btn btn-outline-dark btn-sm');
    var y = document.getElementsByClassName('btn btn-outline-success btn-sm');
    if (document.querySelector('#flexSwitchCheckDefault').checked) {
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "inline-block";
        }
        for (var j = 0; j < y.length; j++) {
            y[j].disabled = false
        }
    }
    else {
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        for (var j = 0; j < y.length; j++) {
            y[j].disabled = true
        }
    }
})

const flistmeses = document.querySelector('#flistmeses');
flistmeses.addEventListener('change', e => {
    e.preventDefault()
    if (flistmeses.value != 0) {
        $('#flistdias').prop('disabled', false);
        mesaño = flistaños.value + flistmeses.value
        buscardias(mesaño)
    }
    else {
        $('#flistdias').prop('disabled', true);
    }
})

const flistdias = document.querySelector('#flistdias');
flistdias.addEventListener('change', e => {
    e.preventDefault()
    if (flistdias.value != 0) {
        mostrarhistorico(flistaños.value, flistmeses.value, flistdias.value)
    }
})

const listasedes = document.querySelector('#listasedes');
listasedes.addEventListener('change', e => {
    e.preventDefault()
    if (listasedes.value != 0) {
        $('#submitchangesede').prop('disabled', false);
    }
    else {
        $('#submitchangesede').prop('disabled', true);
    }
})

const assignmodel = document.querySelector('#modelassignform')
assignmodel.addEventListener('submit', e => {
    e.preventDefault();
    let selectmodelo = document.querySelector('#listamodelos').value
    let dir2 = document.getElementById('assignturno').value + "." + document.getElementById('assignsede').value
    fs.collection('cupos').doc(document.getElementById('assignfecha').value).update({
        [dir2]: firebase.firestore.FieldValue.arrayUnion(selectmodelo)
    }).then(function () {
        if (document.getElementById('assignturno').value === "tardenoche") {
            mostrarcupos("tarde", true)
        }
        else {
            mostrarcupos(document.getElementById('assignturno').value, true)
        }
    })
})

const changemodelform = document.querySelector('#changemodelform')
changemodelform.addEventListener('submit', e => {
    e.preventDefault();
    let dirant = document.getElementById('changeturno').value + "." + document.getElementById('changesede').value
    let dirnew = document.getElementById('selectturno').value + "." + document.getElementById('listasedes').value
    if (dirant != dirnew)
    {
        fs.collection('cupos').doc(document.getElementById('changefecha').value).update({
            [dirnew]: firebase.firestore.FieldValue.arrayUnion(document.getElementById('changeid').value)
        }).then(function () {
            fs.collection('cupos').doc(document.getElementById('changefecha').value).update({
                [dirant]: firebase.firestore.FieldValue.arrayRemove(document.getElementById('changeid').value)
            }).then(function () {
                changemodelform.reset();
                mostrarcupos("mañana", true)
                mostrarcupos("tarde", true)
                mostrarcupos("noche", true)
            })
        })
    }
})

function buscaraños() {
    fs.collection('cupos').get().then(Snapshot => {
        if (Snapshot.docs.length) {
            let html = `<option value="0" selected>Seleccionar</option>`
            var anioant = ""
            Snapshot.forEach(doc => {
                id = doc.id
                var anio = id[id.length - 8] + id[id.length - 7] + id[id.length - 6] + id[id.length - 5]
                if (anio != anioant) {
                    anioant = anio
                    html += `<option value="${anio}">${anio}</option>`
                }
            })
            flistaños.innerHTML = html
        }
    })
}

function buscarmeses(aniofilter) {
    nombremeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    fs.collection('cupos').get().then(Snapshot => {
        if (Snapshot.docs.length) {
            let html = `<option value="0" selected>Seleccionar</option>`
            var mesant = ""
            Snapshot.forEach(doc => {
                id = doc.id
                var anio = id[id.length - 8] + id[id.length - 7] + id[id.length - 6] + id[id.length - 5]
                if (anio === aniofilter) {
                    var mes = id[id.length - 4] + id[id.length - 3]
                    if (mes != mesant) {
                        mesant = mes
                        nombremes = parseInt(mes, 10)
                        html += `<option value="${mes}">${nombremeses[nombremes - 1]}</option>`
                    }
                }
            })
            flistmeses.innerHTML = html
        }
    })
}

function buscardias(añomes) {
    fs.collection('cupos').get().then(Snapshot => {
        if (Snapshot.docs.length) {
            let html = `<option value="0" selected>Seleccionar</option>`
            Snapshot.forEach(doc => {
                id = doc.id
                var añoymes = id[id.length - 8] + id[id.length - 7] + id[id.length - 6] + id[id.length - 5] + id[id.length - 4] + id[id.length - 3]
                if (añomes === añoymes) {
                    var dia = id[id.length - 2] + id[id.length - 1]
                    html += `<option value="${dia}">${dia}</option>`
                }
            })
            flistdias.innerHTML = html
        }
    })
}

function nombreshistorico(elemento, id) {
    fs.collection('modelos').doc(id).get().then(doc => {
        let html = `${doc.data().nick}`
        var celda = document.getElementById(elemento)
        celda.innerHTML = html
    })
}

function llenarhistorico(elemento, fecha, sede, turno) {
    let html = `<ul class="list-group list-group-flush">`
    fs.collection('cupos').doc(fecha).get().then(doc => {
        console.log()
        if (doc.data()[turno][sede].length) {
            doc.data()[turno][sede].forEach(element => {
                identificador = elemento + element
                html += `<li class="list-group-item" id="${identificador}"></li>`
                nombreshistorico(identificador, element)
            })
        }
        else {
            html += `<li class="list-group-item">Sin modelos</li>`
        }
        html += `</ul>`
        var celda = document.getElementById(elemento)
        celda.innerHTML = html
    })
}

function mostrarhistorico(año, mes, dia) {
    fechastring = año + "-" + mes + "-" + dia
    fecha = new Date(fechastring)
    fechafull = año + mes + dia
    let html = `<thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Mañana</th>
      <th scope="col">Tarde</th>`
    if (fecha.getDay() === 6) {
        html += `<th scope="col">Tarde (6-11)</th>`
    }
    html += `<th scope="col">Noche</th>
    </tr>
  </thead>
  <tbody>`
    fs.collection('sedes').where("nombre", "!=", "Out").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (doc.id != "sat") {
                let idmañana = "histmañana" + doc.id
                let idtarde = "histtarde" + doc.id
                let idnoche = "histnoche" + doc.id
                html += `<tr>
                <th scope="row">${doc.data().nombre}</th>
                <td id="${idmañana}"></td>
                <td id="${idtarde}"></td>`
                if (fecha.getDay() === 6) {
                    let idtardenoche = "histtardenoche" + doc.id
                    html += `<td id="${idtardenoche}"></td>`
                    llenarhistorico(idtardenoche, fechafull, doc.id, "tardenoche")
                }
                html += `<td id="${idnoche}"></td>
              </tr>`
                llenarhistorico(idmañana, fechafull, doc.id, "mañana")
                llenarhistorico(idtarde, fechafull, doc.id, "tarde")
                llenarhistorico(idnoche, fechafull, doc.id, "noche")
            }
        })
        html += `</tbody>
        </table>`
        var tablahistorico = document.getElementById('tablahistorico')
        tablahistorico.innerHTML = html
    })
}

function mostrardisponibles(cupos) {
    let html = `<option value="0" selected>Seleccione una sede</option>`
    var listasedes = document.getElementById('listasedes')
    fs.collection('sedes').where("nombre", "!=", "Out").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (doc.id != "sat") {
                let cont = 0
                for (var llave in doc.data().habitaciones) {
                    cont++
                }
                if (cupos[doc.id] < cont) {
                    html += `<option value="${doc.id}">${doc.data().nombre}</option>`
                }
            }
        })
        listasedes.innerHTML = html
    })
}

function buscardisponible(fecha, turno, turno2, id, sede) {
    let cupos = {};
    var listaturnos = document.getElementById('selectturno')
    let html = `<option value="mañana">Mañana</option>
    <option value="tarde">Tarde</option>
    <option value="noche">Noche</option>`
    var dia = fecha[fecha.length - 2] + fecha[fecha.length - 1]
    var mes = fecha[fecha.length - 4] + fecha[fecha.length - 3]
    var anio = fecha[fecha.length - 8] + fecha[fecha.length - 7] + fecha[fecha.length - 6] + fecha[fecha.length - 5]
    let nuevafecha = anio + "-" + mes + "-" + dia
    console.log(nuevafecha)
    var fechita = new Date(nuevafecha)
    if (fechita.getDay() === 6) {
        html += `<option value="tardenoche">Tarde-Noche</option>`
    }
    listaturnos.innerHTML = html
    $('#submitchangesede').prop('disabled', true);
    document.getElementById('changefecha').value = fecha
    document.getElementById('selectturno').value = turno
    document.getElementById('changeturno').value = turno2
    document.getElementById('changesede').value = sede
    document.getElementById('changeid').value = id
    fs.collection('cupos').doc(fecha).get().then(doc => {
        for (var llave in doc.data()[turno]) {
            let cont = 0
            doc.data()[turno][llave].forEach(element => {
                cont++
            })
            cupos[llave] = cont
        }
        mostrardisponibles(cupos)
    })
}

function deletemodel(fecha, sede, turno, id) {
    let dir = turno + "." + sede
    fs.collection('cupos').doc(fecha).update({
        [dir]: firebase.firestore.FieldValue.arrayRemove(id)
    }).then(function () {
        if (turno === "tardenoche") {
            mostrarcupos("tarde", true)
        }
        else {
            mostrarcupos(turno, true)
        }
    })
}

function listarmodelossincupo(lista) {
    const listamodelos = document.getElementById("listamodelos");
    $('#modelassignsubmit').prop('disabled', true);
    let htmllista = `<option value="0" selected>Seleccione una modelo</option>`
    fs.collection('modelos').where("sede", "!=", "out").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (doc.data().sede != "sat") {
                if (!lista.includes(doc.id)) {
                    htmllista += `<option value="${doc.id}">${doc.data().nick}</option>`
                }
            }
        })
        listamodelos.innerHTML = htmllista
    })
}

function asignmodel(fecha, sede, turno) {
    let lista = []
    fs.collection('cupos').doc(fecha).get().then(doc => {
        for (var llave in doc.data().mañana) {
            doc.data().mañana[llave].forEach(element => {
                lista.push(element)
            })
        }
        for (var llave in doc.data().tarde) {
            doc.data().tarde[llave].forEach(element => {
                lista.push(element)
            })
        }
        for (var llave in doc.data().noche) {
            doc.data().noche[llave].forEach(element => {
                lista.push(element)
            })
        }
        for (var llave in doc.data().tardenoche) {
            doc.data().tardenoche[llave].forEach(element => {
                lista.push(element)
            })
        }
        listarmodelossincupo(lista)
        document.getElementById('assignturno').value = turno
        document.getElementById('assignsede').value = sede
        document.getElementById('assignfecha').value = fecha
    })

}

function obtenernombre(elemento, id, turno, fecha, sede, admin) {
    let html3 = ``
    let display = ``
    if (!edicion.checked) {
        display += `style="display: none;"`
    }
    fs.collection('modelos').doc(id).get().then(doc => {
        html3 += `<FONT SIZE=2>
        <button type="button" class="btn btn-outline-dark btn-sm" onclick="deletemodel('${fecha}','${sede}','${turno}','${id}')" ${display}>
        <img src="x-lg.svg" alt="" width="10" height="10">
        </button>
        <button type="button" class="btn btn-outline-dark btn-sm" onclick="buscardisponible('${fecha}', '${turno}', '${turno}', '${id}','${sede}')" data-bs-toggle="modal" data-bs-target="#changemodelmodal" ${display}>
        <img src="arrow-down-up.svg" alt="" width="15" height="15">
        </button> ${doc.data().nick}</font>`
        let listgroup = document.getElementById(elemento);
        listgroup.innerHTML = html3
    })
}

function dias(fecha, sede, elemento, rooms, turno, admin) {
    let html2 = `<ul class="list-group list-group-flush">`
    fs.collection('cupos').doc(fecha).get().then(doc => {
        let contador = 0
        if (doc.data()[turno][sede] != undefined) {
            doc.data()[turno][sede].forEach(element => {
                contador++
                if (contador <= rooms) {
                    html2 += `<li class="list-group-item" id="${elemento}${element}"></li>`
                }
                else {
                    html2 += `<li class="list-group-item list-group-item-dark" id="${elemento}${element}"></li>`
                }
                identificador2 = elemento + element
                obtenernombre(identificador2, element, turno, fecha, sede, admin)
            })
        }
        let disabled = ``
        if (!edicion.checked) {
            disabled += `disabled`
        }
        while (contador < rooms) {
            html2 += `<li class="list-group-item"><button type="button" class="btn btn-outline-success btn-sm" onclick="asignmodel('${fecha}','${sede}','${turno}')" data-bs-toggle="modal" data-bs-target="#modelassignmodal" ${disabled}>Disponible</button></li>`
            contador++
        }
        html2 += `</ul>`
        let celda = document.getElementById(elemento);
        celda.innerHTML = html2
    })
}

function mostrarcupos(turno, admin) {
    var fecha1 = new Date()
    let semana1 = fecha1.getDay()
    if (semana1 === 0) {
        semana1 = 7
    }
    var fecha2 = new Date(fecha1.getTime() - ((1000 * 60 * 60 * 24) * (semana1 - 1)))
    let idtabla = "tabla" + turno
    const tabla = document.getElementById(idtabla);
    var diassemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    let html = `<thead>
    <tr>
      <th scope="col"></th>`
    for (let j = 0; j < 7; j++) {
        html += `<th scope="col"`
        if (fecha1.getDate() === (new Date(fecha2.getTime() + (1000 * 60 * 60 * 24 * j))).getDate()) {
            html += ` class="table-primary"`
        }
        html += `>${diassemana[j]} (${(new Date(fecha2.getTime() + (1000 * 60 * 60 * 24 * j))).getDate()})</th>`
        if (j === 6 && turno === "tarde") {
            html += `<th scope="col"`
            if (fecha1.getDate() === (new Date(fecha2.getTime() + (1000 * 60 * 60 * 24 * j))).getDate()) {
                html += ` class="table-primary"`
            }
            html += `>${diassemana[j]} (6-11)</th>`
        }
    }
    html += `</tr>
    </thead>
    <tbody>`
    fs.collection('sedes').where("nombre", "!=", "Out").get().then(querySnapshot => {
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
                if (doc.id != "sat") {
                    html += `<tr>
                        <th scope="row">${doc.data().nombre}</th>`
                    let rooms = 0
                    for (var llave in doc.data().habitaciones) {
                        if (doc.data().habitaciones[llave] === true) {
                            rooms++
                        }
                    }
                    for (let i = 0; i < 7; i++) {

                        let identificador = turno + doc.id + i
                        var fecha = new Date(fecha2.getTime() + (1000 * 60 * 60 * 24 * i))
                        let ano = fecha.getFullYear()
                        let mes = fecha.getMonth() + 1
                        let dia = fecha.getDate()
                        if (dia === fecha1.getDate()) {
                            html += `<td class="table-primary" id="${turno}${doc.id}${i}">`
                        }
                        else {
                            html += `<td id="${turno}${doc.id}${i}">`
                        }
                        let fechafull = ""
                        fechafull += ano
                        if (mes < 10) {
                            fechafull += "0"
                        }
                        fechafull += mes
                        if (dia < 10) {
                            fechafull += "0"
                        }
                        fechafull += dia
                        dias(fechafull, doc.id, identificador, rooms, turno, admin);
                        html += `</td>`
                        if (i === 6 && turno === "tarde") {
                            let identiftd = "tardenoche" + doc.id + i
                            if (dia === fecha1.getDate()) {
                                html += `<td class="table-primary" id="tardenoche${doc.id}${i}">`
                            }
                            else {
                                html += `<td id="tardenoche${doc.id}${i}">`
                            }
                            dias(fechafull, doc.id, identiftd, rooms, "tardenoche", admin);
                        }
                    }
                    html += `</tr>`
                }
            })
            html += `</tbody>`
            tabla.innerHTML = html
            $("#status").hide()
        }
    })
}

function llenar(dia) {
    fs.collection('modelos').get().then(querySnapshot => {
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
                if (doc.data().turno != undefined) {
                    turno = doc.data().turno + "." + doc.data().sede
                    fs.collection("cupos").doc(dia).update({
                        [turno]: firebase.firestore.FieldValue.arrayUnion(doc.id)
                    })
                }
            })
        }
    })
}

function actualizarsedes(dia, i) {
    fs.collection('sedes').get().then(Snapshot => {
        if (Snapshot.docs.length) {
            Snapshot.forEach(documento => {
                if (documento.data().habitaciones != undefined) {
                    let key = "mañana." + documento.id
                    let key2 = "tarde." + documento.id
                    let key3 = "noche." + documento.id
                    if (i === 6) {
                        let key4 = "tardenoche." + documento.id
                        fs.collection('cupos').doc(dia).update({
                            [key4]: []
                        })
                    }
                    fs.collection('cupos').doc(dia).update({
                        [key]: [],
                        [key2]: [],
                        [key3]: []
                    })
                    /*
                    for (var llave in documento.data().habitaciones)
                    {
                        let key = "mañana." + documento.data().nombre + "." + llave
                        fs.collection('cupos').doc(fecha).update({
                            [key]: "Disponible"
                        })
                    }*/
                }
            })
        }
        if (i < 5) {
            llenar(dia)
        }
    })
}

function escribirenlabd(semana, admin) {
    var fecha1 = new Date()
    var fecha2 = new Date(fecha1.getTime() - ((1000 * 60 * 60 * 24) * (semana - 1)))
    for (let i = 0; i < 7; i++) {
        var fecha = new Date(fecha2.getTime() + (1000 * 60 * 60 * 24 * i))
        ano = fecha.getFullYear()
        mes = fecha.getMonth() + 1
        dia = fecha.getDate()
        //semana = fecha.getDay()
        fechafull = ""
        fechafull += ano
        if (mes < 10) {
            fechafull += "0"
        }
        fechafull += mes
        if (dia < 10) {
            fechafull += "0"
        }
        fechafull += dia
        fs.collection('cupos').doc(fechafull).set({
            mañana: {},
            tarde: {},
            noche: {}
        })
        if (i === 6) {
            fs.collection('cupos').doc(fechafull).update({
                tardenoche: {},
            })
        }
        actualizarsedes(fechafull, i)
        if (i === 6) {
            mostrarcupos("mañana", admin)
            mostrarcupos("tarde", admin)
            mostrarcupos("noche", admin)
        }
    }

}

function generarcupos3(admin) {
    $("#status").show()
    var fecha = new Date()
    //const fecha = new Date(fecha1.getTime()+(1000*60*60*24*30))
    ano = fecha.getFullYear()
    mes = fecha.getMonth() + 1
    dia = fecha.getDate()
    semana = fecha.getDay()
    if (semana === 0) {
        semana = 7
    }
    fechafull = ""
    fechafull += ano
    if (mes < 10) {
        fechafull += "0"
    }
    fechafull += mes
    if (dia < 10) {
        fechafull += "0"
    }
    fechafull += dia
    fs.collection('cupos').doc(fechafull).get().then(doc => {
        if (!doc.exists) {
            escribirenlabd(semana, admin)
        }
        else {
            mostrarcupos("mañana", admin)
            mostrarcupos("tarde", admin)
            mostrarcupos("noche", admin)
        }
    })
}
/*
function generarcupos2()
{
    const fecha1 = new Date()
    var fecha = new Date(fecha1.getTime()+(1000*60*60*24*30))
    ano = fecha.getFullYear()
    mes = fecha.getMonth()+1
    dia = fecha.getDate()
    semana = fecha.getDay()
    fechafull = ""
    fechafull += ano
    if (mes < 10)
    {
        fechafull += "0"
    }
    fechafull += mes
    if (dia < 10)
    {
        fechafull += "0"
    }
    fechafull += dia
    console.log(fechafull)
    fechaint = parseInt(fechafull, 10)
    console.log(fechaint)
    console.log(fechaint.toString())
}*/

function buscacorreos3(str1) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            $("#logoutbutton").show();
            querySnapshot.forEach(doc => {
                user = firebase.auth().currentUser;
                var nombrecortado = user.displayName.split(" ");
                $("#pills-tab").fadeIn()
                var primernombre = nombrecortado[0];
                document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
                var fecha = new Date()
                semana = fecha.getDay()
                if (semana >= 6 || semana === 0) {
                    generarcupos3(false)
                    $("#editcheck").hide();
                }
                else {
                    if (doc.data().admin) {
                        $("#editcheck").fadeIn()
                    }
                    generarcupos3(doc.data().admin)
                }
                buscaraños()
            })
        } else {
            window.location = "../index.html";
        };
    });
}

//eventos
//listar los datos para los usuarios autenticados
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('verificando permisos del usuario')
        buscacorreos3(user.email)
    } else {
        console.log('no está conectado')
        $("#logoutbutton").hide();
        window.location = "../index.html";
    }
})