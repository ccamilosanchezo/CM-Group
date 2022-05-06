const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('sign out')
        location.reload()
    })
})

document.querySelector('#flistturnos').addEventListener('change', e => {
    e.preventDefault();
    listarmodelos()
})

document.querySelector('#flistsedes').addEventListener('change', e => {
    e.preventDefault();
    listarmodelos()
})

document.querySelector('#settatendanceform').addEventListener('submit', e => {
    e.preventDefault();
    let dir = document.getElementById('anoform').value + "." + document.getElementById('mesform').value + "." + document.getElementById('quincenaform').value + "." + document.getElementById('pageform').value
    let tokens = document.getElementById('tokensform').value
    fs.collection('produccion').doc(document.getElementById('idform').value).update({
        [dir]: tokens,
    }).then(function () {
        listarmodelos()
        $('#setattendancemodal').modal('hide')
    })
})

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
        html += `<option value="${ano}${strmes}1">${meses[mes]} - 1</option>`
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
        html += `<option value="${ano}${strmes}2">${meses[mes]} - 2</option>`
        html += `<option value="${ano}${strmes}1">${meses[mes]} - 1</option>`
    }
    document.querySelector('#flistfecha').innerHTML = html
}

function listarmodelos() {
    $("#status").show();
    $('#tablaproduccion').fadeOut();
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

function setearings(idmodelo, pagina, nick, ano, mes, quincena, tokens) {
    document.getElementById('staticBackdropLabel').innerHTML = `${nick} - ${pagina}`
    document.getElementById('idform').value = idmodelo
    document.getElementById('anoform').value = ano
    document.getElementById('mesform').value = mes
    document.getElementById('quincenaform').value = quincena
    document.getElementById('pageform').value = pagina
    document.getElementById('tokensform').value = tokens
}

function calculardolar(documento) {
    let conteo = 0
    let dirano = "a"
    let dirmes = "m"
    let dirquincena = "q"
    if (document.querySelector('#flistfecha').value === "0") {
        var fecha = new Date()
        ano = fecha.getFullYear()
        mes = fecha.getMonth() + 1
        dia = fecha.getDate()
        dirano += ano
        dirmes += mes
        if (dia <= 15) {
            dirquincena += "1"
        }
        else {
            dirquincena += "2"
        }
    }
    else {
        let fechavalue = document.getElementById('flistfecha').value
        dirquincena += fechavalue[fechavalue.length - 1]
        mes = fechavalue[fechavalue.length - 3] + fechavalue[fechavalue.length - 2]
        dirmes += parseInt(mes, 10);
        dirano += fechavalue[fechavalue.length - 7] + fechavalue[fechavalue.length - 6] + fechavalue[fechavalue.length - 5] + fechavalue[fechavalue.length - 4]
        console.log(dirmes, dirquincena)
        //parseInt(string, base);
    }
    if (documento.exists) {
        for (var llave in documento.data()[dirano][dirmes][dirquincena]) {

        }
        fs.collection('paginas').where("habilitada", "==", true).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                if (documento.data()[dirano][dirmes][dirquincena][doc.data().nombre] != undefined) {
                    conteo += (parseFloat(documento.data()[dirano][dirmes][dirquincena][doc.data().nombre]) * parseFloat(doc.data().valor))
                }
            })
            let elemento = documento.id + "dol"
            var conteo2 = conteo / 2
            document.getElementById(elemento).innerHTML = `$ ${conteo2.toFixed(2)}`
        })
    }
}

function consultartokens(idmodelo, pagina, elemento, nick) {
    let button = ``
    let dirano = "a"
    let dirmes = "m"
    let dirquincena = "q"
    if (document.querySelector('#flistfecha').value === "0") {
        var fecha = new Date()
        ano = fecha.getFullYear()
        mes = fecha.getMonth() + 1
        dia = fecha.getDate()
        dirano += ano
        dirmes += mes
        if (dia <= 15) {
            dirquincena += "1"
        }
        else {
            dirquincena += "2"
        }
    }
    else {
        let fechavalue = document.getElementById('flistfecha').value
        dirquincena += fechavalue[fechavalue.length - 1]
        mes = fechavalue[fechavalue.length - 3] + fechavalue[fechavalue.length - 2]
        dirmes += parseInt(mes, 10);
        dirano += fechavalue[fechavalue.length - 7] + fechavalue[fechavalue.length - 6] + fechavalue[fechavalue.length - 5] + fechavalue[fechavalue.length - 4]
        //parseInt(string, base);
    }
    fs.collection('produccion').doc(idmodelo).get().then(doc => {
        if (!doc.exists) {
            fs.collection('produccion').doc(idmodelo).set({
                [dirano]: { [dirmes]: { [dirquincena]: {} } }
            })
        }
        else {
            if (doc.data()[dirano] === undefined || doc.data()[dirano][dirmes] === undefined || doc.data()[dirano][dirmes][dirquincena] === undefined || doc.data()[dirano][dirmes][dirquincena][pagina] === undefined) {
                button += `<button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="setearings('${idmodelo}', '${pagina}', '${nick}', '${dirano}', '${dirmes}', '${dirquincena}', '')">0</button>`
            }
            else {
                button += `<button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#setattendancemodal" onclick="setearings('${idmodelo}', '${pagina}', '${nick}', '${dirano}', '${dirmes}', '${dirquincena}', '${doc.data()[dirano][dirmes][dirquincena][pagina]}')">${doc.data()[dirano][dirmes][dirquincena][pagina]}</button>`
            }
            document.getElementById(elemento).innerHTML = button
        }
    })
}

function tabla(consulta) {
    let html = `<thead>
    <tr>
      <th scope="col">Modelo</th>`
    let paginas = []
    fs.collection('paginas').where("habilitada", "==", true).get().then(querySnapshot => {
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
                //html += `<th scope="col">${doc.data().nombre}</th>`
                paginas.push(doc.data().nombre)
            })
        }
        paginas.sort()
        paginas.forEach(element => {
            html += `<th scope="col">${element}</th>`
        })
        html += `<th scope="col">Dólares</th>`
        if (consulta.docs.length) {
            html += `<tbody>`
            consulta.forEach(doc => {
                if (doc.data().sede != "sat") {
                    html += ` <tr>
                    <th scope="row">${doc.data().nick}</th>`
                    paginas.forEach(element => {
                        if (doc.data().paginas[element] != undefined && doc.data().paginas[element].habilitada) {
                            let idelemento = "" + doc.id + element
                            html += `<td id="${idelemento}"><div class="spinner-grow text-light spinner-grow-sm" role="status"></td>`
                            consultartokens(doc.id, element, idelemento, doc.data().nick)
                        }
                        else {
                            html += `<td class="table-secondary"></td>`
                        }
                    })
                    html += `<td id="${doc.id}dol"></td></tr>`
                    fs.collection('produccion').doc(doc.id).get().then(doc2 => {
                        calculardolar(doc2)
                    })
                }
            })
        }
        html += `</tbody>`
        var tablaasistencia = document.getElementById('tablaproduccion')
        tablaasistencia.innerHTML = html
        $('#tablaproduccion').fadeIn();
        $("#status").hide();
    })
}

function buscacorreos3(str1) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            $("#logoutbutton").show();
            $("#contenido").fadeIn();
            listarmodelos()
            listarsedes()
            listarfechas()
            querySnapshot.forEach(doc => {
                user = firebase.auth().currentUser;
                var nombrecortado = user.displayName.split(" ");
                var primernombre = nombrecortado[0];
                document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
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