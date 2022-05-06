const logout = document.querySelector('#logout');
var admin = false

logout.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('sign out')
        location.reload()
    })
})

document.querySelector('#flistturnos').addEventListener('change', e => {
    e.preventDefault();
    $('#tablaasistencia').fadeOut()
    listarmodelos();
})

document.querySelector('#flistsedes').addEventListener('change', e => {
    e.preventDefault();
    $('#tablaasistencia').fadeOut()
    listarmodelos();
})

document.querySelector('#settatendanceform').addEventListener('submit', e => {
    e.preventDefault();
    let directorio = document.getElementById('anoform').value + "." + document.getElementById('mesform').value + "." + document.getElementById('diaform').value
    fs.collection('asistencia').doc(document.getElementById('idform').value).update({
        [directorio]: {
            asiste: document.getElementById('valorselect').value,
            observacion: document.getElementById('observacionesform').value
        }
    }).then(function () {
        listarmodelos()
        document.querySelector('#settatendanceform').reset()
        $('#modelassignsubmit').prop('disabled', true);
    })
})

document.querySelector('#valorselect').addEventListener('change', e => {
    e.preventDefault()
    if (document.getElementById('valorselect').value != '0') {
        $('#modelassignsubmit').prop('disabled', false);
    }
    else {
        $('#modelassignsubmit').prop('disabled', true);
    }
})

const deletenetworkform = document.querySelector('#deletenetworkform')
deletenetworkform.addEventListener('submit', e => {
    e.preventDefault();
    docref = fs.collection('asistencia').doc(document.querySelector('#networkid').value)
    multa = "a" + document.querySelector('#anofine').value + ".m" + document.querySelector('#mesfine').value + "." + document.querySelector('#diafine').value + ".multa"
    docref.update({
        [multa]: firebase.firestore.FieldValue.delete()
    }).then(function () {
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'))
        bsOffcanvas.show()
        let strarr = '[' + document.querySelector('#diasfine').value + ']'
        let dias = JSON.parse(strarr);
        generarinfo(document.querySelector('#networkid').value, document.querySelector('#anofine').value, document.querySelector('#mesfine').value, dias, document.querySelector('#nombrefine').value, document.querySelector('#nickfine').value, true);
        listarmodelos()
    })
    $("#deletenetworkmodal .close").click();
})

$("#observacionesform").keyup(function () {
    if (document.getElementById('valorselect').value != '0') {
        $('#modelassignsubmit').prop('disabled', false);
    }
    else {
        $('#modelassignsubmit').prop('disabled', true);
    }
});

function deletefine(idmodelo, ano, mes, dia, dias, nombre, nick) {
    document.querySelector('#networkid').value = idmodelo
    document.querySelector('#anofine').value = ano
    document.querySelector('#mesfine').value = mes
    document.querySelector('#diafine').value = dia
    document.querySelector('#diasfine').value = dias
    console.log(document.querySelector('#diasfine').value)
    document.querySelector('#nombrefine').value = nombre
    document.querySelector('#nickfine').value = nick
}

function listarsedes() {
    const flistsedes = document.querySelector('#flistsedes');
    fs.collection('sedes').orderBy("nombre").get().then((snapshot) => {
        if (snapshot.docs.length) {
            let html3 = '<option selected value=0>Seleccionar</option>';
            snapshot.forEach(doc => {
                sede = doc.data();
                if (doc.id === 'out' || doc.id === 'sat') {
                    html3 += ``;
                }
                else {
                    html3 += `<option value="${doc.id}">${sede.nombre}</option>`
                }
            })
            flistsedes.innerHTML = html3;
        }
    })
}

document.getElementById('flistfecha').addEventListener('change', e => {
    e.preventDefault()
    $('#tablaasistencia').fadeOut()
    listarmodelos()
})

function listarfechas() {
    var fecha = new Date()
    ano = fecha.getFullYear()
    mes = fecha.getMonth()
    dia = fecha.getDate()
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let dias = []
    let html = `<option selected value=0>Actual</option>`
    let cont = 0
    if (dia > 15) {
        //cont++
        let strmes = "" + (mes + 1)
        if (mes < 9) {
            strmes = "0" + (mes + 1)
        }
        let fechafull = ano + strmes
        html += `<option value="${ano}${strmes}01">${meses[mes]} - 1</option>`
    }
    while (cont < 4) {
        cont++
        mes = mes - 1
        if (mes < 0) {
            mes = 11
            ano--
        }
        let strmes = "" + (mes + 1)
        if (mes < 9) {
            strmes = "0" + (mes + 1)
        }
        let fechafull = ano + strmes
        html += `<option value="${ano}${strmes}16">${meses[mes]} - 2</option>`
        html += `<option value="${ano}${strmes}01">${meses[mes]} - 1</option>`
    }
    document.querySelector('#flistfecha').innerHTML = html
}

function listarmodelos() {
    $("#status").show();
    turno = document.getElementById('flistturnos').value
    sede = document.getElementById('flistsedes').value
    if (turno != '0' && sede != '0') {
        fs.collection('modelos').where("sede", "==", sede).where("turno", "==", turno).get().then((querySnapshot) => {
            tabla(querySnapshot);
        })
    }
    if (turno != '0' && sede === '0') {
        fs.collection('modelos').where("turno", "==", turno).get().then((querySnapshot) => {
            tabla(querySnapshot);
        })
    }
    if (turno === '0' && sede != '0') {
        fs.collection('modelos').where("sede", "==", sede).get().then((querySnapshot) => {
            tabla(querySnapshot);
        })
    }
    if (turno === '0' && sede === '0') {
        fs.collection('modelos').where("sede", "!=", 'out').get().then((querySnapshot) => {
            tabla(querySnapshot);
        })
    }
}

function asignarasistencia(valor, ano, mes, dia, id, obs) {
    $('#modelassignsubmit').prop('disabled', true);
    document.getElementById('idform').value = id
    document.getElementById('anoform').value = "a" + ano
    document.getElementById('mesform').value = "m" + mes
    document.getElementById('diaform').value = "d" + dia
    document.getElementById('valorselect').value = valor
    document.getElementById('observacionesform').value = obs
}

function llenarcelda(ano, mes, dia, hoy, id, elemento) {
    let button = ``
    fs.collection('asistencia').doc(id).get().then(doc => {
        let dirano = "a" + ano
        let dirmes = "m" + mes
        let dirdia = "d" + dia
        if (!doc.exists) {
            fs.collection('asistencia').doc(id).set({
                [dirano]: { [dirmes]: { [dirdia]: {} } }
            })
        }
        else {
            if (doc.data()[dirano] === undefined || doc.data()[dirano][dirmes] === undefined || doc.data()[dirano][dirmes][dirdia] === undefined || doc.data()[dirano][dirmes][dirdia].asiste === undefined) {
                if (dia < hoy) {
                    button += `<button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="asignarasistencia('0', '${ano}', '${mes}', '${dia}', '${id}', '')">?`
                }
                else {
                    button += `<button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="asignarasistencia('0', '${ano}', '${mes}', '${dia}', '${id}', '')">-`
                }
            }
            else {
                if (doc.data()[dirano][dirmes][dirdia].asiste === "D") {
                    button += `<button type="button" class="btn btn-warning btn-sm position-relative" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="asignarasistencia('D', '${ano}', '${mes}', '${dia}', '${id}', '${doc.data()[dirano][dirmes][dirdia].observacion}')">D`
                }
                if (doc.data()[dirano][dirmes][dirdia].asiste === "X") {
                    button += `<button type="button" class="btn btn-primary btn-sm position-relative" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="asignarasistencia('X', '${ano}', '${mes}', '${dia}', '${id}', '${doc.data()[dirano][dirmes][dirdia].observacion}')">X`
                }
                if (doc.data()[dirano][dirmes][dirdia].asiste === "i") {
                    button += `<button type="button" class="btn btn-success btn-sm position-relative" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="asignarasistencia('i', '${ano}', '${mes}', '${dia}', '${id}', '${doc.data()[dirano][dirmes][dirdia].observacion}')">i`
                }
                if (doc.data()[dirano][dirmes][dirdia].observacion != undefined && doc.data()[dirano][dirmes][dirdia].observacion != "") {
                    button += `<span class="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-light rounded-circle">
                    <span class="visually-hidden">New alerts</span>
                  </span>`
                }
            }
            button += `</button>`
            var celda = document.getElementById(elemento)
            celda.innerHTML = button
        }
    })
}

function calcularfaltas(ano, mes, dias, id, celdafaltas) {
    let cont = 0
    fs.collection('asistencia').doc(id).get().then(doc => {
        if (doc.exists) {
            let dirano = "a" + ano
            let dirmes = "m" + mes
            dias.forEach(element => {
                let dirdia = "d" + element
                if (doc.data()[dirano] != undefined && doc.data()[dirano][dirmes] != undefined && doc.data()[dirano][dirmes][dirdia] != undefined) {
                    if (doc.data()[dirano][dirmes][dirdia].asiste === "D") {
                        cont++
                    }
                }
            })
            var celda = document.getElementById(celdafaltas)
            celda.innerHTML = cont
        }
    })
}

function calcularmultas(ano, mes, dias, id, celdamultas, nombre, nick) {
    let cont = 0
    let html = `<button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onclick="generarinfo('${id}', '${ano}', '${mes}', [${dias}], '${nombre}', '${nick}')" class="btn btn-sm btn-`
    fs.collection('asistencia').doc(id).get().then(doc => {
        if (doc.exists) {
            let dirano = "a" + ano
            let dirmes = "m" + mes
            dias.forEach(element => {
                let dirdia = "d" + element
                if (doc.data()[dirano] != undefined && doc.data()[dirano][dirmes] != undefined && doc.data()[dirano][dirmes][dirdia] != undefined) {
                    if (doc.data()[dirano][dirmes][dirdia].multa != undefined) {
                        cont++
                    }
                }
            })
            if (cont > 0) {
                html += `danger">${cont}</button>`
            }
            else {
                html += `light">${cont}</button>`
            }
            var celda = document.getElementById(celdamultas)
            celda.innerHTML = html
        }
    })
}

function llenardias(idmodelo, ano, mes, dias) {
    var selectday = document.querySelector('#inputday');
    let html = `<option value="0" selected>Seleccionar día</option>`
    fs.collection('asistencia').doc(idmodelo).get().then(doc => {
        let dirano = "a" + ano
        let dirmes = "m" + mes
        dias.forEach(element => {
            let dirdia = "d" + element
            if (doc.data()[dirano] != undefined && doc.data()[dirano][dirmes] != undefined && doc.data()[dirano][dirmes][dirdia] != undefined && doc.data()[dirano][dirmes][dirdia].asiste != undefined) {
                if (doc.data()[dirano][dirmes][dirdia].multa == undefined) {
                    html += `<option value="${element}">${element}</option>`
                }
            }
        })
        selectday.innerHTML = html
    })
}

function mostrarcampo2(idmodelo, ano, mes, dias, nombre, nick) {
    $("#newnetworkform").show();
    $("#addnetworkbutton").hide();
    llenardias(idmodelo, ano, mes, dias)
    const inputday = document.querySelector('#inputday')
    inputday.addEventListener('change', e => {
        if (inputday.value != '0') {
            $('#finesubmit').prop('disabled', false);
        }
        else {
            $('#finesubmit').prop('disabled', true);
        }
    })
    const newnetworkform = document.querySelector('#newnetworkform')
    newnetworkform.addEventListener('submit', e => {
        e.preventDefault();
        let dirano = "a" + ano
        let dirmes = "m" + mes
        dia = "d" + document.querySelector('#inputday').value
        valor = document.querySelector('#inputnetworkmodel').value
        concepto = document.querySelector('#inputusermodel').value
        docref = fs.collection('asistencia').doc(idmodelo)
        let dir = dirano + "." + dirmes + "." + dia + ".multa"
        docref.update({
            [dir]: { valor: valor, concepto: concepto }
        }).then(function () {
            generarinfo(idmodelo, ano, mes, dias, nombre, nick);
            listarmodelos()
        })
        $("#newnetworkform").hide();
    })
}

function generarinfo(idmodelo, ano, mes, dias, nombre, nick) {
    var offcanvasbody = document.querySelector('#offcanvasbody');
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    docref = fs.collection('asistencia').doc(idmodelo)
    offcanvasbody.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`
    getdoc = docref.get()
        .then(doc => {
            let html = `<h4>${nick}</h4>
            <h5>(${nombre})</h5>
            <br>
            <h6>Multas:</h6>
            <ul class="list-group list-group-flush">`
            let dirano = "a" + ano
            let dirmes = "m" + mes
            dias.forEach(element => {
                let dirdia = "d" + element
                if (doc.data()[dirano] != undefined && doc.data()[dirano][dirmes] != undefined && doc.data()[dirano][dirmes][dirdia] != undefined && doc.data()[dirano][dirmes][dirdia].multa != undefined) {
                    html += `<li class="list-group-item">`
                    if (admin) {
                        html += `<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deletenetworkmodal" onclick="deletefine('${idmodelo}', '${ano}', '${mes}', '${dirdia}', [${dias}], '${nombre}', '${nick}')" data-bs-dismiss="offcanvas"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></button> `
                    }
                    html += `<b>${meses[mes]} ${element} - (${doc.data()[dirano][dirmes][dirdia].multa.valor})</b> ${doc.data()[dirano][dirmes][dirdia].multa.concepto}</li>`
                }
            })
            html += `<li class="list-group-item"><button type="button" class="btn btn-outline-dark btn-sm" onclick="mostrarcampo2('${idmodelo}', '${ano}', '${mes}', [${dias}], '${nombre}', '${nick}')" id="addnetworkbutton">Nueva Multa</button></li>`
            html += `
            </ul>

            <form class="row g-3" id="newnetworkform" style="display: none;">
            <div class="col-auto">
            <select class="form-select" aria-label="Default select example" id="inputday">
                <option selected>Seleccionar día</option>
          </select>
            </div>
            <div class="col-auto">
                <input type="number" min="10000" max="100000" step="10000" class="form-control" id="inputnetworkmodel" placeholder="Valor" required>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" id="inputusermodel" placeholder="Concepto" required>
            </div>
            <div class="col-auto">
                <button type="submit" id="finesubmit" class="btn btn-primary mb-3" disabled>Guardar</button>
            </div>
            </form>`
            offcanvasbody.innerHTML = html
        })

}

function tabla(consulta) {
    let html = `<thead>
    <tr>
      <th scope="col">Modelo</th>`
    var fecha = new Date()
    if (document.getElementById('flistfecha').value != "0") {
        let fechavalue = document.getElementById('flistfecha').value
        var fechastring = fechavalue[fechavalue.length - 8] + fechavalue[fechavalue.length - 7] + fechavalue[fechavalue.length - 6] + fechavalue[fechavalue.length - 5] + "-" + fechavalue[fechavalue.length - 4] + fechavalue[fechavalue.length - 3] + "-" + fechavalue[fechavalue.length - 2] + fechavalue[fechavalue.length - 1]
        fecha = new Date(fechastring)
        fecha = new Date(fecha.getTime() + (1000 * 60 * 60 * 24))
    }
    ano = fecha.getFullYear()
    mes = fecha.getMonth() + 1
    dia = fecha.getDate()
    let dias = []
    if (dia <= 15) {
        var fecha2 = new Date(fecha.getTime() - ((1000 * 60 * 60 * 24) * (dia - 1)))
        while (fecha2.getDate() <= 15) {
            html += `<th scope="col">${fecha2.getDate()}</th>`
            dias.push(fecha2.getDate())
            fecha2 = new Date(fecha2.getTime() + ((1000 * 60 * 60 * 24)))
        }
    }
    else {
        var fecha2 = new Date(fecha.getTime() - ((1000 * 60 * 60 * 24) * (dia - 16)))
        while (fecha2.getMonth() === fecha.getMonth()) {
            html += `<th scope="col">${fecha2.getDate()}</th>`
            dias.push(fecha2.getDate())
            fecha2 = new Date(fecha2.getTime() + ((1000 * 60 * 60 * 24)))
        }
    }
    html += `<th scope="col">Descansos</th><th scope="col">Multas</th></tr></thead>`
    if (consulta.docs.length) {
        html += `<tbody>`
        consulta.forEach(doc => {
            if (doc.data().sede != "sat") {
                html += ` <tr>
                    <th scope="row">${doc.data().nick}</th>`
                dias.forEach(element => {
                    let celda = "" + ano + mes + element + doc.id
                    if (element === dia) {
                        html += `<td class="table-primary" id="${celda}">`
                    }
                    else {
                        html += `<td id="${celda}">`
                    }
                    html += `<div class="spinner-grow text-light spinner-grow-sm" role="status">
                      </div></td>`
                    llenarcelda(ano, mes, element, dia, doc.id, celda)
                })
                let celdafaltas = "f" + doc.id
                let celdamultas = "m" + doc.id
                html += `<td id="${celdafaltas}"></td><td id="${celdamultas}"></td></tr>`
                calcularfaltas(ano, mes, dias, doc.id, celdafaltas)
                calcularmultas(ano, mes, dias, doc.id, celdamultas, doc.data().nombre, doc.data().nick)
            }
        })
    }
    html += `</tbody>`
    var tablaasistencia = document.getElementById('tablaasistencia')
    tablaasistencia.innerHTML = html
    $("#tablaasistencia").fadeIn()
    $("#status").hide();
}

function buscacorreos3(str1) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            $("#logoutbutton").show();
            $("#contenido").fadeIn();
            querySnapshot.forEach(doc => {
                user = firebase.auth().currentUser;
                var nombrecortado = user.displayName.split(" ");
                var primernombre = nombrecortado[0];
                document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
                if (doc.data().admin) {
                    admin = true
                }
                else {
                    admin = false
                }
                listarmodelos()
                listarsedes()
                listarfechas()
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
        $("#contenido").hide();
        window.location = "../index.html";
    }
})