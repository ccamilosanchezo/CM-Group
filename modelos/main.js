
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
    $("#lista").fadeOut();
    listarmodelos();
})

document.querySelector('#flistsedes').addEventListener('change', e => {
    e.preventDefault();
    $("#lista").fadeOut();
    console.log('hola')
    if (document.querySelector('#flistsedes').value === 'out' || document.querySelector('#flistsedes').value === 'sat') {
        document.getElementById('flistturnos').getElementsByTagName('option')[0].selected = 'selected'
        $('#flistturnos').prop('disabled', true);
        listarmodelos();
    }
    else {
        $('#flistturnos').prop('disabled', false);
        listarmodelos();
    }
})

document.querySelector('#elistsedes').addEventListener('change', e => {
    e.preventDefault();
    if (document.querySelector('#elistsedes').value === 'out' || document.querySelector('#elistsedes').value === 'sat') {
        document.getElementById('elistturnos').getElementsByTagName('option')[0].selected = 'selected'
        $('#elistturnos').prop('disabled', true);
    }
    else {
        $('#elistturnos').prop('disabled', false);
    }
})

const pg1 = document.querySelector('#listpaginas1');
pg1.addEventListener('change', e => {
    e.preventDefault();
    $('#listpaginas4').prop('disabled', true);
    $('#user4').prop('disabled', true);
    $('#passw4').prop('disabled', true);
    $('#cpagina4').prop('disabled', true);
    $('#listpaginas3').prop('disabled', true);
    $('#user3').prop('disabled', true);
    $('#passw3').prop('disabled', true);
    $('#cpagina3').prop('disabled', true);
    $('#listpaginas2').prop('disabled', true);
    $('#user2').prop('disabled', true);
    $('#passw2').prop('disabled', true);
    $('#cpagina2').prop('disabled', true);
    document.getElementById('listpaginas4').getElementsByTagName('option')[0].selected = 'selected'
    document.getElementById('listpaginas3').getElementsByTagName('option')[0].selected = 'selected'
    document.getElementById('listpaginas2').getElementsByTagName('option')[0].selected = 'selected'
    if (pg1.value != '0') {
        $('#user1').prop('disabled', false);
        $('#passw1').prop('disabled', false);
        $('#cpagina1').prop('disabled', false);
        $('#listpaginas2').prop('disabled', false);
        let listapaginas2 = document.querySelector('#listpaginas2');
        fs.collection('paginas').get().then((snapshot) => {
            if (snapshot.docs.length) {
                let html9 = '<option selected value=0>Seleccionar</option>';
                snapshot.forEach(doc => {
                    pagina = doc.data();
                    if (pagina.nombre === pg1.value || !pagina.habilitada) {
                        //console.log('skip');
                    }
                    else {
                        let li = `
                        <option value="${pagina.nombre}">${pagina.nombre}</option>
                        `
                        html9 += li;
                    }
                })
                listapaginas2.innerHTML = html9;
            }
        })
    }
    else {
        $('#user1').prop('disabled', true);
        $('#passw1').prop('disabled', true);
        $('#cpagina1').prop('disabled', true);
        $('#listpaginas2').prop('disabled', true);
        $('#user2').prop('disabled', true);
        $('#passw2').prop('disabled', true);
        $('#cpagina2').prop('disabled', true);
        $('#listpaginas3').prop('disabled', true);
        $('#user3').prop('disabled', true);
        $('#passw3').prop('disabled', true);
        $('#cpagina3').prop('disabled', true);
        $('#listpaginas4').prop('disabled', true);
        $('#user4').prop('disabled', true);
        $('#passw4').prop('disabled', true);
        $('#cpagina4').prop('disabled', true);
    }
})

const pg2 = document.querySelector('#listpaginas2');
pg2.addEventListener('change', e => {
    e.preventDefault();
    $('#listpaginas4').prop('disabled', true);
    $('#user4').prop('disabled', true);
    $('#passw4').prop('disabled', true);
    $('#cpagina4').prop('disabled', true);
    $('#listpaginas3').prop('disabled', true);
    $('#user3').prop('disabled', true);
    $('#passw3').prop('disabled', true);
    $('#cpagina3').prop('disabled', true);
    document.getElementById('listpaginas3').getElementsByTagName('option')[0].selected = 'selected'
    document.getElementById('listpaginas4').getElementsByTagName('option')[0].selected = 'selected'
    if (pg2.value != '0') {
        $('#user2').prop('disabled', false);
        $('#passw2').prop('disabled', false);
        $('#cpagina2').prop('disabled', false);
        $('#listpaginas3').prop('disabled', false);
        let listapaginas3 = document.querySelector('#listpaginas3');
        fs.collection('paginas').get().then((snapshot) => {
            if (snapshot.docs.length) {
                let html9 = '<option selected value=0>Seleccionar</option>';
                snapshot.forEach(doc => {
                    pagina = doc.data();
                    if (pagina.nombre === pg2.value || pagina.nombre === pg1.value || !pagina.habilitada) {
                        console.log('skip');
                    }
                    else {
                        let li = `
                        <option value="${pagina.nombre}">${pagina.nombre}</option>
                        `
                        html9 += li;
                    }
                })
                listapaginas3.innerHTML = html9;
            }
        })
    }
    else {
        $('#user2').prop('disabled', true);
        $('#passw2').prop('disabled', true);
        $('#cpagina2').prop('disabled', true);
        $('#listpaginas3').prop('disabled', true);
        $('#user3').prop('disabled', true);
        $('#passw3').prop('disabled', true);
        $('#cpagina3').prop('disabled', true);
        $('#listpaginas4').prop('disabled', true);
        $('#user4').prop('disabled', true);
        $('#passw4').prop('disabled', true);
        $('#cpagina4').prop('disabled', true);
    }
})

const pg3 = document.querySelector('#listpaginas3');
pg3.addEventListener('change', e => {
    e.preventDefault();
    $('#listpaginas4').prop('disabled', true);
    $('#user4').prop('disabled', true);
    $('#passw4').prop('disabled', true);
    $('#cpagina4').prop('disabled', true);
    document.getElementById('listpaginas4').getElementsByTagName('option')[0].selected = 'selected'
    if (pg3.value != '0') {
        $('#user3').prop('disabled', false);
        $('#passw3').prop('disabled', false);
        $('#cpagina3').prop('disabled', false);
        $('#listpaginas4').prop('disabled', false);
        let listapaginas4 = document.querySelector('#listpaginas4');
        fs.collection('paginas').get().then((snapshot) => {
            if (snapshot.docs.length) {
                let html9 = '<option selected value=0>Seleccionar</option>';
                snapshot.forEach(doc => {
                    pagina = doc.data();
                    if (pagina.nombre === pg3.value || pagina.nombre === pg2.value || pagina.nombre === pg1.value || !pagina.habilitada) {
                        console.log('skip');
                    }
                    else {
                        let li = `
                        <option value="${pagina.nombre}">${pagina.nombre}</option>
                        `
                        html9 += li;
                    }
                })
                listapaginas4.innerHTML = html9;
            }
        })
    }
    else {
        $('#user3').prop('disabled', true);
        $('#passw3').prop('disabled', true);
        $('#cpagina3').prop('disabled', true);
        $('#listpaginas4').prop('disabled', true);
        $('#user4').prop('disabled', true);
        $('#passw4').prop('disabled', true);
        $('#cpagina4').prop('disabled', true);
    }
})

const pg4 = document.querySelector('#listpaginas4');
pg4.addEventListener('change', e => {
    e.preventDefault();
    if (pg4.value != '0') {
        $('#user4').prop('disabled', false);
        $('#passw4').prop('disabled', false);
        $('#cpagina4').prop('disabled', false);
    }
    else {
        $('#user4').prop('disabled', true);
        $('#passw4').prop('disabled', true);
        $('#cpagina4').prop('disabled', true);
    }
})

const pg5 = document.querySelector('#listpaginas');
pg5.addEventListener('change', e => {
    e.preventDefault();
    if (pg5.value != '0') {
        $('#user').prop('disabled', false);
        $('#passw').prop('disabled', false);
        $('#cpagina').prop('disabled', false);
        var docref = fs.collection('modelos').doc(document.querySelector('#ecodigo').value)
        var getdoc = docref.get()
            .then(doc => {
                if (doc.data().paginas[pg5.value]) {
                    document.getElementById('user').value = doc.data().paginas[pg5.value].usuario
                    document.getElementById('passw').value = doc.data().paginas[pg5.value].clave
                    $('#cpagina').prop('checked', doc.data().paginas[pg5.value].habilitada)
                }
                else {
                    document.getElementById('user').value = ""
                    document.getElementById('passw').value = ""
                    $('#cpagina').prop('checked', false)
                }
            })
    }
    else {
        $('#user').prop('disabled', true);
        $('#passw').prop('disabled', true);
        $('#cpagina').prop('disabled', true);
        document.getElementById('user').value = ""
        document.getElementById('passw').value = ""
        $('#cpagina').prop('checked', false)
    }
})

const canceledit = document.querySelector('#canceledit')
canceledit.addEventListener('click', e => {
    e.preventDefault();
    editmodelform.reset();
    $('#user').prop('disabled', true);
    $('#passw').prop('disabled', true);
    $('#cpagina').prop('disabled', true);
})

const editmodel = document.querySelector('#editmodelform')
editmodel.addEventListener('submit', e => {
    e.preventDefault();
    let modalcontent = document.querySelector('#alerta2')
    let alertcontent = document.querySelector('#alerta')
    var inputcodigo = document.querySelector('#ecodigo').value;
    var inputnombre = document.querySelector('#enombre').value;
    var inputnick = document.querySelector('#enick').value;
    var inputsede = document.querySelector('#elistsedes').value;
    var inputturno = document.querySelector('#elistturnos').value;
    if (inputturno === '0' && !document.getElementById('elistturnos').disabled) {
        modalcontent.innerHTML = `Debe seleccionar un turno.`
        $("#alerta2").fadeTo(5000, 500).slideUp(500, function () {
            $("#alerta2").slideUp(500);
        })
    }
    else {
        var docref = fs.collection('modelos').doc(inputcodigo)
        var getdoc = docref.get()
            .then(doc => {
                docref.update({
                    nombre: inputnombre,
                    nick: inputnick,
                    sede: inputsede,
                    turno: inputturno,
                })
                if (pg5.value != '0') {
                    var inputcpagina2 = document.querySelector('#cpagina').checked;
                    var inputuser2 = document.querySelector('#user').value;
                    var inputpass2 = document.querySelector('#passw').value;
                    fs.collection('paginas').where("nombre", "==", pg5.value).get().then((querySnapshot) => {
                        if (querySnapshot.docs.length) {
                            querySnapshot.forEach(doc => {
                                let linkp = doc.data().link + inputuser2;
                                let pagina = "paginas." + pg5.value;
                                docref.update({ [pagina]: { usuario: inputuser2, clave: inputpass2, habilitada: inputcpagina2, link: linkp } });
                            })
                        }
                    })
                }
                alertcontent.innerHTML = `Se ha actualizado la información de <strong>${inputnick} (${inputnombre})</strong> satisfactoriamente.`
                $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
                    $("#alerta").slideUp(500);
                })
                $("#editmodelmodal .close").click();
                $('#cpagina').prop('disabled', true)
                $('#user').prop('disabled', true)
                $('#passw').prop('disabled', true)
                $('#elistturnos').prop('disabled', false)
                setTimeout('listarmodelos()', 3000)
                setTimeout('editmodel.reset()', 3000);
            })

    }
})

const newmodelform = document.querySelector('#newmodelform')
newmodelform.addEventListener('submit', e => {
    e.preventDefault();
    let modalcontent = document.querySelector('#alerta3')
    let alertcontent = document.querySelector('#alerta')
    var inputcodigo = document.querySelector('#codigo').value;
    var inputnombre = document.querySelector('#nombre').value;
    var inputnick = document.querySelector('#nick').value;
    var inputsede = document.querySelector('#listsedes').value;
    var inputturno = document.querySelector('#listturnos').value;
    var docref = fs.collection('modelos').doc(inputcodigo)
    var getdoc = docref.get()
        .then(doc => {
            if (!doc.exists) {
                if (inputsede === '0' || inputturno === '0') {
                    modalcontent.innerHTML = `Debe seleccionar sede y turno.`
                    $("#alerta3").fadeTo(5000, 500).slideUp(500, function () {
                        $("#alerta3").slideUp(500);
                    })
                }
                else {
                    if (pg1.value != '0') {
                        docref.set({
                            nombre: inputnombre,
                            nick: inputnick,
                            sede: inputsede,
                            turno: inputturno,
                        })
                        var inputcpagina1 = document.querySelector('#cpagina1').checked;
                        var inputuser1 = document.querySelector('#user1').value;
                        var inputpass1 = document.querySelector('#passw1').value;
                        fs.collection('paginas').where("nombre", "==", pg1.value).get().then((querySnapshot) => {
                            if (querySnapshot.docs.length) {
                                querySnapshot.forEach(doc => {
                                    let linkp = doc.data().link + inputuser1;
                                    let pagina = "paginas." + pg1.value;
                                    docref.update({ [pagina]: { usuario: inputuser1, clave: inputpass1, habilitada: inputcpagina1, link: linkp } });
                                })
                            }
                        })
                        if (pg2.value != '0') {
                            var inputcpagina2 = document.querySelector('#cpagina2').checked;
                            var inputuser2 = document.querySelector('#user2').value;
                            var inputpass2 = document.querySelector('#passw2').value;
                            fs.collection('paginas').where("nombre", "==", pg2.value).get().then((querySnapshot) => {
                                if (querySnapshot.docs.length) {
                                    querySnapshot.forEach(doc => {
                                        let linkp = doc.data().link + inputuser2;
                                        let pagina = "paginas." + pg2.value;
                                        docref.update({ [pagina]: { usuario: inputuser2, clave: inputpass2, habilitada: inputcpagina2, link: linkp } });
                                    })
                                }
                            })
                        }
                        if (pg3.value != '0') {
                            var inputcpagina3 = document.querySelector('#cpagina3').checked;
                            var inputuser3 = document.querySelector('#user3').value;
                            var inputpass3 = document.querySelector('#passw3').value;
                            fs.collection('paginas').where("nombre", "==", pg3.value).get().then((querySnapshot) => {
                                if (querySnapshot.docs.length) {
                                    querySnapshot.forEach(doc => {
                                        let linkp = doc.data().link + inputuser3;
                                        let pagina = "paginas." + pg3.value;
                                        docref.update({ [pagina]: { usuario: inputuser3, clave: inputpass3, habilitada: inputcpagina3, link: linkp } });
                                    })
                                }
                            })
                        }
                        if (pg4.value != '0') {

                            var inputcpagina4 = document.querySelector('#cpagina4').checked;
                            var inputuser4 = document.querySelector('#user4').value;
                            var inputpass4 = document.querySelector('#passw4').value;
                            fs.collection('paginas').where("nombre", "==", pg4.value).get().then((querySnapshot) => {
                                if (querySnapshot.docs.length) {
                                    querySnapshot.forEach(doc => {
                                        let linkp = doc.data().link + inputuser4;
                                        let pagina = "paginas." + pg4.value;
                                        docref.update({ [pagina]: { usuario: inputuser4, clave: inputpass4, habilitada: inputcpagina4, link: linkp } });
                                    })
                                }
                            })
                        }
                        alertcontent.innerHTML = `se ha creado a la modelo <strong>${inputnick} (${inputnombre})</strong> satisfactoriamente.`
                        $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
                            $("#alerta").slideUp(500);
                        })
                        $("#addmodelmodal .close").click();
                        setTimeout('listarmodelos()', 3000)
                        setTimeout('newmodelform.reset()', 5000);
                        $('#listpaginas4').prop('disabled', true);
                        $('#user4').prop('disabled', true);
                        $('#passw4').prop('disabled', true);
                        $('#cpagina4').prop('disabled', true);
                        $('#listpaginas3').prop('disabled', true);
                        $('#user3').prop('disabled', true);
                        $('#passw3').prop('disabled', true);
                        $('#cpagina3').prop('disabled', true);
                        $('#listpaginas2').prop('disabled', true);
                        $('#user2').prop('disabled', true);
                        $('#passw2').prop('disabled', true);
                        $('#cpagina2').prop('disabled', true);
                        $('#user1').prop('disabled', true);
                        $('#passw1').prop('disabled', true);
                        $('#cpagina1').prop('disabled', true);
                    }
                    else {
                        modalcontent.innerHTML = `Debe ingresar la información de al menos una página.`
                        $("#alerta3").fadeTo(5000, 500).slideUp(500, function () {
                            $("#alerta3").slideUp(500);
                        })
                    }
                }
            }
            else {
                modalcontent.innerHTML = `El código ingresado pertenece a la modelo <strong>${doc.data().nick} (${doc.data().nombre})</strong>`
                $("#alerta3").fadeTo(5000, 500).slideUp(500, function () {
                    $("#alerta3").slideUp(500);
                })
            }
        })
})

const deleteemailform = document.querySelector('#deleteemailform')
deleteemailform.addEventListener('submit', e => {
    e.preventDefault();
    docref = fs.collection('modelos').doc(document.querySelector('#idmodel').value)
    getdoc = docref.get()
        .then(doc => {
            let emails = doc.data().correos;
            var index = emails.findIndex(correo => correo === document.querySelector('#emailmodel').value);
            emails.splice(index, 1)
            docref.update({
                correos: emails
            }).then(function () {
                var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'))
                bsOffcanvas.show()
                generarinfo(document.querySelector('#idmodel').value, true);
            })
            $("#deleteemailmodal .close").click();
        })
})

const deletenetworkform = document.querySelector('#deletenetworkform')
deletenetworkform.addEventListener('submit', e => {
    e.preventDefault();
    docref = fs.collection('modelos').doc(document.querySelector('#networkid').value)
    red = "redes." + document.querySelector('#usernetwork').value
    docref.update({
        [red]: firebase.firestore.FieldValue.delete()
    }).then(function () {
        var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'))
        bsOffcanvas.show()
        generarinfo(document.querySelector('#networkid').value, true);
    })
    $("#deletenetworkmodal .close").click();
})

$("#user1").keyup(function () {
    var ta = $("#user1");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});
$("#user2").keyup(function () {
    var ta = $("#user2");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});
$("#user3").keyup(function () {
    var ta = $("#user3");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});
$("#user4").keyup(function () {
    var ta = $("#user4");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});
$("#user").keyup(function () {
    var ta = $("#user");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});

//correos
function buscacorreos3(str1) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            $("#contenido").fadeIn();
            listarmodelos();
            listarsedes();
            user = firebase.auth().currentUser;
            var nombrecortado = user.displayName.split(" ");
            var primernombre = nombrecortado[0];
            document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
        } else {
            console.log('Usuario no encontrado')
            user = firebase.auth().currentUser;
            user.delete()
            console.log('Cerrando sesión')
            $('#deniedmodal').modal('show')
            window.location = "../index.html";
        };
    });
}

function editarmodelo(idmodelo) {
    document.getElementById('ecodigo').value = idmodelo
    var docref = fs.collection('modelos').doc(idmodelo)
    var getdoc = docref.get()
        .then(doc => {
            document.getElementById('enombre').value = doc.data().nombre
            document.getElementById('enick').value = doc.data().nick
            document.getElementById('elistturnos').value = doc.data().turno
            document.getElementById('elistsedes').value = doc.data().sede
            if (doc.data().sede === 'sat' || doc.data().sede === 'out') {
                $('#elistturnos').prop('disabled', true)
            }
            else {
                $('#elistturnos').prop('disabled', false)
            }
        })
}

function copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", id_elemento);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    $("#alerta4").fadeTo(1500, 5000).fadeOut(500, function () {
        $("#alerta4").slideUp(500);
    })
}

function deleteemail(idmodelo, email) {
    document.querySelector('#idmodel').value = idmodelo
    document.querySelector('#emailmodel').value = email
}

function deletenetwork(idmodelo, network) {
    document.querySelector('#networkid').value = idmodelo
    document.querySelector('#usernetwork').value = network
}

function mostrarcampo(idmodelo) {
    $("#newemailform").show();
    $("#addemailbutton").hide();
    let temp = []
    const newemailform = document.querySelector('#newemailform')
    newemailform.addEventListener('submit', e => {
        e.preventDefault();
        docref = fs.collection('modelos').doc(idmodelo)
        getdoc = docref.get()
            .then(doc => {
                if (doc.data().correos != undefined) {
                    temp = doc.data().correos;
                    temp.push(document.querySelector('#inputemailmodel').value)
                }
                else {
                    temp.push(document.querySelector('#inputemailmodel').value)
                }
                docref.update({
                    correos: temp
                }).then(function () {
                    generarinfo(idmodelo, true);
                })
            })
        $("#newemailform").hide();
    })
}

function mostrarcampo2(idmodelo) {
    $("#newnetworkform").show();
    $("#addnetworkbutton").hide();
    const newnetworkform = document.querySelector('#newnetworkform')
    newnetworkform.addEventListener('submit', e => {
        e.preventDefault();
        red = "redes." + document.querySelector('#inputnetworkmodel').value
        reduser = document.querySelector('#inputusermodel').value
        docref = fs.collection('modelos').doc(idmodelo)
        docref.update({
            [red]: reduser
        }).then(function () {
            generarinfo(idmodelo, true);
        })
        $("#newnetworkform").hide();
    })
}

function mostrarcampo3(idmodelo) {
    $("#editinfoform").show();
    $("#info").hide();
    var docref = fs.collection('modelos').doc(idmodelo)
    var getdoc = docref.get()
        .then(doc => {
            if (doc.data().info != undefined) {
                document.getElementById('inputinfo').value = doc.data().info
            }
        })
    const editinfoform = document.querySelector('#editinfoform')
    editinfoform.addEventListener('submit', e => {
        e.preventDefault()
        docref.update({
            info: document.querySelector('#inputinfo').value
        }).then(function () {
            generarinfo(idmodelo, true);
        })
        $("#editinfoform").hide();
    })
}

function generarinfo(idmodelo, admin) {
    var offcanvasbody = document.querySelector('#offcanvasbody');
    docref = fs.collection('modelos').doc(idmodelo)
    offcanvasbody.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"></div>`
    getdoc = docref.get()
        .then(doc => {
            let html = `<h4>${doc.data().nick}</h4>
            <h5>(${doc.data().nombre})</h5>
            <br>
            <h6>Correos:</h6>
            <ul class="list-group list-group-flush">`
            if (doc.data().correos != undefined) {
                doc.data().correos.forEach(correo => {
                    html += `<li class="list-group-item">`
                    if (admin) {
                        html += `<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteemailmodal" onclick="deleteemail('${idmodelo}','${correo}')" data-bs-dismiss="offcanvas"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg></button> `
                    }
                    html += `${correo}</li>`
                });
            }
            if (admin) {
                html += `<li class="list-group-item"><button type="button" class="btn btn-outline-dark btn-sm" onclick="mostrarcampo('${idmodelo}')" id="addemailbutton">Agregar Correo</button></li>`
            }
            html += `
            </ul>

            <form class="row g-3" id="newemailform" style="display: none;">
            <div class="col-auto">
                <input type="email" class="form-control" id="inputemailmodel" placeholder="Correo" required>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Guardar</button>
            </div>
            </form>
            <br>
            <h6>Redes:</h6>
            <ul class="list-group list-group-flush">`
            if (doc.data().redes != undefined) {
                for (var llave in doc.data().redes) {
                    html += `<li class="list-group-item">`
                    if (admin) {
                        html += `<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deletenetworkmodal" onclick="deletenetwork('${idmodelo}', '${llave}')" data-bs-dismiss="offcanvas"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></button> `
                    }
                    html += `<b>${llave}:</b> ${doc.data().redes[llave]}</li>`
                }
            }
            if (admin) {
                html += `<li class="list-group-item"><button type="button" class="btn btn-outline-dark btn-sm" onclick="mostrarcampo2('${idmodelo}')" id="addnetworkbutton">Agregar red social</button></li>`
            }
            html += `
            </ul>

            <form class="row g-3" id="newnetworkform" style="display: none;">
            <div class="col-auto">
                <input type="text" class="form-control" id="inputnetworkmodel" placeholder="Red Social" required>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control" id="inputusermodel" placeholder="Usuario" required>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Guardar</button>
            </div>
            </form>
            <br>
            <h6>Información adicional:</h6>
            <ul class="list-group list-group-flush" id="info">`
            if (doc.data().info != undefined) {
                html += `<li class="list-group-item"><pre>${doc.data().info}</pre></li>`
            }
            if (admin) {
                html += `<li class="list-group-item">
                <button type="button" class="btn btn-outline-dark btn-sm" onclick="mostrarcampo3('${idmodelo}')">Editar</button>
                </li>`
            }
            html += `
            </ul>
            <form class="row g-3" id="editinfoform" style="display: none;">
            <div class="col-auto">
                <textarea class="form-control" id="inputinfo" rows="4"></textarea>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary mb-3">Guardar</button>
            </div>
            </form>
            `
            offcanvasbody.innerHTML = html
        })

}

function generarlista(consulta) {
    let admin = false;
    fs.collection('correos').where("correo", "==", firebase.auth().currentUser.email).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
            admin = doc.data().admin
            if (admin) {
                $("#addmodel").show();
            }
        })
    })
    const user = firebase.auth().currentUser
    let html = `<thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Nick</th>`;
    var lista = [];
    fs.collection('paginas').where("habilitada", "==", true).get().then((querySnapshot) => {
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
                lista.push(doc.data().nombre)
            })
        }
        lista.sort();
        lista.forEach(element => {
            html += `<th scope="col">${element}</th>`
        })
        html += `<th scope="col"></th>
        </tr>
        </thead>
        <tbody>`
        var modeloslista = document.querySelector('#lista');
        if (consulta.docs.length) {
            consulta.forEach(doc => {
                modelo = doc.data()
                let li = `
                <tr>
                        <td>${modelo.nombre}</td>
                        <td>${modelo.nick}</td>
                `;
                lista.forEach(element => {
                    let habilitada = 'disabled'
                    if (modelo.paginas[element] === undefined) {
                        const lip = `
                        <td>
                        
                        </td>
                        `
                        li += lip;
                    }
                    else {
                        if (modelo.paginas[element].habilitada) {
                            habilitada = '';
                            const lip = `
                            <td>
                            <button class="btn btn-outline-dark btn-sm" onclick="copiarAlPortapapeles('${modelo.paginas[element].usuario}')" ${habilitada}>${modelo.paginas[element].usuario}</button>
                            <br>
                            <button class="btn btn-outline-warning btn-sm" onclick="copiarAlPortapapeles('${modelo.paginas[element].clave}')" ${habilitada}><img src="key.svg" alt="" width="20" height="20"></button> 
                            <a href="${modelo.paginas[element].link}" class="link-dark" target="_blank" ${habilitada}><img src="link-45deg.svg" alt="" width="25" height="25"></a>
                            </td>
                            `
                            li += lip;
                        }
                        else {
                            const lip = `
                        <td>
                        <button class="btn btn-outline-dark btn-sm" ${habilitada}>${modelo.paginas[element].usuario}</button>
                        </td>
                        `
                            li += lip;
                        }
                    }
                }
                )
                li += `<td>
                <button class="btn btn-outline-info btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onclick="generarinfo('${doc.id}', ${admin})"><img src="info-circle.svg" alt="" width="15" height="15" class="d-inline-block align-text-top"></button>`
                if (admin) {
                    li += `<br>
                    <button class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#editmodelmodal" onclick="editarmodelo('${doc.id}')"><img src="pen.svg" alt="" width="15" height="15" class="d-inline-block align-text-top"></button>`;
                }
                li += `</td></tr>`;
                html += li;
            })
        }
        html += `</tbody>`
        $("#status").hide();
        modeloslista.innerHTML = html;
        $("#lista").fadeIn();
    })

}

function listarmodelos() {
    $("#status").show();
    turno = document.getElementById('flistturnos').value
    sede = document.getElementById('flistsedes').value
    if (turno != '0' && sede != '0') {
        fs.collection('modelos').where("sede", "==", sede).where("turno", "==", turno).get().then((querySnapshot) => {
            generarlista(querySnapshot);
        })
    }
    if (turno != '0' && sede === '0') {
        fs.collection('modelos').where("turno", "==", turno).get().then((querySnapshot) => {
            generarlista(querySnapshot);
        })
    }
    if (turno === '0' && sede != '0') {
        fs.collection('modelos').where("sede", "==", sede).get().then((querySnapshot) => {
            generarlista(querySnapshot);
        })
    }
    if (turno === '0' && sede === '0') {
        fs.collection('modelos').where("sede", "!=", 'out').get().then((querySnapshot) => {
            generarlista(querySnapshot);
        })
    }
}

function listarpaginas() {
    const listapaginas1 = document.querySelector('#listpaginas1');
    const listapaginas = document.querySelector('#listpaginas');
    fs.collection('paginas').orderBy("nombre").get().then((snapshot) => {
        if (snapshot.docs.length) {
            let html2 = '<option selected value=0>Seleccionar</option>';
            snapshot.forEach(doc => {
                pagina = doc.data();
                if (pagina.habilitada) {
                    let li2 = `
                    <option value="${pagina.nombre}">${pagina.nombre}</option>
                    `
                    html2 += li2;
                }

            })
            listapaginas1.innerHTML = html2;
            listapaginas.innerHTML = html2;
        }
    })
}

function listarsedes() {
    const flistsedes = document.querySelector('#flistsedes');
    const listasedes = document.querySelector('#listsedes');
    const elistasedes = document.querySelector('#elistsedes');
    fs.collection('sedes').orderBy("nombre").get().then((snapshot) => {
        if (snapshot.docs.length) {
            let html1 = '<option selected value=0>Seleccionar</option>';
            let html2 = '';
            let html3 = '<option selected value=0>Seleccionar</option>';
            snapshot.forEach(doc => {
                sede = doc.data();
                let li3 = `
                <option value="${doc.id}">${sede.nombre}</option>
                `
                if (doc.id === 'out' || doc.id === 'sat') {
                    html1 += ``;
                }
                else {
                    html1 += `<option value="${doc.id}">${sede.nombre}</option>`
                }
                html2 += li3
                html3 += li3;
            })
            listasedes.innerHTML = html1;
            elistasedes.innerHTML = html2;
            flistsedes.innerHTML = html3;
        }
    })
}

//eventos
//listar los datos para los usuarios autenticados
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('verificando permisos del usuario')
        const email = user.email
        buscacorreos3(email)
        $("#logoutbutton").show();
        listarpaginas();
    } else {
        console.log('no está conectado')
        $("#logoutbutton").hide();
        $("#addmodel").hide();
        $("#contenido").hide();
        window.location = "../index.html";
    }
})