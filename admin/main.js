
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('sign out')
        location.reload()
    })
})

const editsitesbutton = document.querySelector('#editsites')
editsitesbutton.addEventListener('click', e => {
    e.preventDefault();
    listarrooms();
})

const newuserform = document.querySelector('#newuserform')
newuserform.addEventListener('submit', e => {
    e.preventDefault();
    let modalcontent = document.querySelector('#alerta')
    let alertcontent = document.querySelector('#alerta2')
    var inputcorreo = document.querySelector('#inputcorreo').value
    var inputpermiso = document.querySelector('#inputpermiso').checked
    fs.collection('correos').where("correo", "==", inputcorreo).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            alertcontent.innerHTML = `Ya existe un usuario con el correo <strong>${inputcorreo}</strong>`
            $("#alerta2").fadeTo(5000, 500).slideUp(500, function () {
                $("#alerta2").slideUp(500);
            })
        } else {
            fs.collection('correos').add({
                correo: inputcorreo,
                admin: inputpermiso,
            }).then(function () {
                modalcontent.innerHTML = `Se ha agregado el correo <strong>${inputcorreo}</strong> satisfactoriamente`
                $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
                    $("#alerta").slideUp(500);
                })
                newuserform.reset()
            })
            $("#addusermodal .close").click();
        };
    });
})

const deleteuserform = document.querySelector('#deleteuserform')
deleteuserform.addEventListener('submit', e => {
    e.preventDefault();
    let modalcontent = document.querySelector('#alerta')
    fs.collection("correos").doc(document.querySelector('#iduser').value).delete().then(() => {
        console.log("Document successfully deleted!");
        modalcontent.innerHTML = `Se ha eliminado el usuario satisfactoriamente`
        $("#deleteusermodal .close").click();
        $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
            $("#alerta").slideUp(500);
        })
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
})

const deleteroomform = document.querySelector('#deleteroomform')
deleteroomform.addEventListener('submit', e => {
    e.preventDefault();
    let alertcontent = document.querySelector('#alerta4')
    var docref = fs.collection('sedes').doc(document.getElementById('sede').value)
    habitacion = "habitaciones." + document.getElementById('room').value
    var eliminarcampo = docref.update({
        [habitacion]: firebase.firestore.FieldValue.delete()
    }).then(function () {
        alertcontent.innerHTML = `Se ha eliminado la habitación <strong>${document.getElementById('room').value}</strong> satisfactoriamente`
        $("#alerta4").fadeTo(5000, 500).slideUp(500, function () {
            $("#alerta4").slideUp(500);
        })
        deleteroomform.reset()
        listarrooms()
    })
    $("#deleteroommodal .close").click();
})

const canceledit = document.querySelector('#canceledit')
canceledit.addEventListener('click', e => {
    e.preventDefault();
    $('#nombrep').prop('disabled', false);
    document.querySelector('#editpageform').reset()
})

const pg = document.querySelector('#listpaginas');
pg.addEventListener('change', e => {
    e.preventDefault();
    if (pg.value != '0') {
        $('#nombrep').prop('disabled', true);
        var docref = fs.collection('paginas').doc(pg.value)
        var getdoc = docref.get()
            .then(doc => {
                document.getElementById('nombrep').value = doc.data().nombre
                document.getElementById('linkp').value = doc.data().link
                document.getElementById('linktemp').value = doc.data().link
                document.getElementById('valorform').value = doc.data().valor
                $('#cpagina').prop('checked', doc.data().habilitada)
            })
    }
    else {
        $('#nombrep').prop('disabled', false);
        document.getElementById('nombrep').value = ""
        document.getElementById('linkp').value = ""
        document.getElementById('linktemp').value = ""
        document.getElementById('valorform').value = ""
        $('#cpagina').prop('checked', false)
    }
})

$("#linkp").keyup(function () {
    var ta = $("#linkp");
    letras = ta.val().replace(/ /g, "");
    ta.val(letras)
});

const editpageform = document.querySelector('#editpageform')
editpageform.addEventListener('submit', e => {
    e.preventDefault();
    var docref = fs.collection('paginas').doc(document.querySelector('#listpaginas').value)
    let modalcontent = document.querySelector('#alerta')
    let alertcontent = document.querySelector('#alerta3')
    if (pg.value != '0') {
        docref.update({
            link: document.getElementById('linkp').value,
            habilitada: document.getElementById('cpagina').checked,
            valor: document.getElementById('valorform').value,
        }).then(function () {
            $('#nombrep').prop('disabled', false);
            modalcontent.innerHTML = `Se ha actualizado <strong>${document.getElementById('nombrep').value}</strong> satisfactoriamente`
            $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
                $("#alerta").slideUp(500);
            })
        })
        if (document.getElementById('linkp').value != document.getElementById('linktemp').value) {
            fs.collection('modelos').get().then((querySnapshot) => {
                if (querySnapshot.docs.length) {
                    let nlink = document.getElementById('linkp').value
                    querySnapshot.forEach(doc => {
                        if (doc.data().paginas[document.getElementById('nombrep').value] != undefined) {
                            let pagina = "paginas." + document.getElementById('nombrep').value
                            let user = doc.data().paginas[document.getElementById('nombrep').value].usuario
                            let pass = doc.data().paginas[document.getElementById('nombrep').value].clave
                            let habilitada = doc.data().paginas[document.getElementById('nombrep').value].habilitada
                            let newlink = nlink + doc.data().paginas[document.getElementById('nombrep').value].usuario
                            fs.collection('modelos').doc(doc.id).update({
                                [pagina]: { usuario: user, clave: pass, habilitada: habilitada, link: newlink }
                            })
                        }
                    })
                }
            })
        }
        $("#editpagesmodal .close").click();
    }
    else {
        fs.collection('paginas').where("nombre", "==", document.getElementById('nombrep').value).get().then(function (querySnapshot) {
            if (querySnapshot.docs.length) {
                alertcontent.innerHTML = `Ya existe <strong>${document.getElementById('nombrep').value}</strong> en el sistema`
                $("#alerta3").fadeTo(5000, 500).slideUp(500, function () {
                    $("#alerta3").slideUp(500);
                })
                editpageform.reset();
            }
            else {
                fs.collection('paginas').add({
                    nombre: document.getElementById('nombrep').value,
                    link: document.getElementById('linkp').value,
                    habilitada: document.getElementById('cpagina').checked,
                    valor: document.getElementById('valorform').value,
                }).then(function () {
                    modalcontent.innerHTML = `Se ha agregado <strong>${document.getElementById('nombrep').value}</strong> satisfactoriamente`
                    $("#alerta").fadeTo(5000, 500).slideUp(500, function () {
                        $("#alerta").slideUp(500);
                    })
                    editpageform.reset()
                })
                $("#editpagesmodal .close").click();
            }
        })
    }
    setTimeout('editpageform.reset()', 3000);
})

const editpagesbutton = document.querySelector('#editpages')
editpagesbutton.addEventListener('click', e => {
    e.preventDefault();
    const listapaginas = document.querySelector('#listpaginas');
    fs.collection('paginas').orderBy("nombre").get().then((snapshot) => {
        if (snapshot.docs.length) {
            let html2 = '<option selected value=0>Nuevo sitio</option>';
            snapshot.forEach(doc => {
                pagina = doc.data();
                let li2 = `<option value="${doc.id}">${pagina.nombre}</option>`
                html2 += li2;
            })
            listapaginas.innerHTML = html2;
        }
    })
})

const nuewroomform = document.querySelector('#newroomform')
nuewroomform.addEventListener('submit', e => {
    e.preventDefault();
    let alertcontent = document.querySelector('#alerta4')
    id = document.getElementById('idsede').value
    habitacion = "habitaciones." + document.getElementById('numeroroom').value
    fs.collection("sedes").doc(id).update({ [habitacion]: true }).then(function () {
        alertcontent.innerHTML = `Se ha agregado el room <strong>${document.getElementById('numeroroom').value}</strong> satisfactoriamente.`
        $("#alerta4").fadeTo(5000, 500).slideUp(500, function () {
            $("#alerta4").slideUp(500);
        })
        newroomform.reset()
        listarrooms()
    })
    $("#newroommodal .close").click();
})

const newplaceform = document.querySelector('#newplaceform')
newplaceform.addEventListener('submit', e => {
    e.preventDefault();
    let alertcontent = document.querySelector('#alerta4')
    sede = document.getElementById('newplace').value
    fs.collection('sedes').add({
        nombre: sede,
    }).then(function () {
        alertcontent.innerHTML = `Se ha agregado la sede <strong>${sede}</strong> satisfactoriamente.`
        $("#alerta4").fadeTo(5000, 500).slideUp(500, function () {
            $("#alerta4").slideUp(500);
        })
        newplaceform.reset()
        listarrooms()
    })
    $("#newplacemodal .close").click();
})

const deleteplaceform = document.querySelector('#deleteplaceform')
deleteplaceform.addEventListener('submit', e => {
    e.preventDefault();
    let alertcontent = document.querySelector('#alerta4')
    let alertcontent2 = document.querySelector('#alerta5')
    fs.collection("modelos").where("sede", "==", document.querySelector('#deletesede').value).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            alertcontent2.innerHTML = `No puede eliminar una sede que tenga modelos asignadas.`
            $("#deleteplacemodal .close").click();
            $("#alerta5").fadeTo(5000, 500).slideUp(500, function () {
                $("#alerta5").slideUp(500);
            })
            deleteplaceform.reset()
        }
        else {
            fs.collection("sedes").doc(document.querySelector('#deletesede').value).delete().then(() => {
                console.log("Document successfully deleted!");
                alertcontent.innerHTML = `Se ha eliminado la sede satisfactoriamente.`
                $("#deleteplacemodal .close").click();
                $("#alerta4").fadeTo(5000, 500).slideUp(500, function () {
                    $("#alerta4").slideUp(500);
                })
                deleteplaceform.reset()
                listarrooms()
            })
        }
    })
})

function deleteroom(sede, room) {
    document.getElementById('sede').value = sede
    document.getElementById('room').value = room
}

function deleteplace(sede) {
    document.getElementById('deletesede').value = sede
}

function actualizarestado(sede, room) {
    var docref = fs.collection('sedes').doc(sede)
    var getdoc = docref.get()
        .then(doc => {
            var estado = doc.data().habitaciones[room];
            habitacion = "habitaciones." + room
            docref.update({
                [habitacion]: !estado,
            })
            listarrooms();
        })
}

function nuevoroom(sede) {
    docref = fs.collection('sedes').doc(sede)
    document.getElementById('idsede').value = sede
    document.getElementById('numeroroom').value = ""
    var getdoc = docref.get()
        .then(doc => {
            document.getElementById('nombresede').value = doc.data().nombre
        })
}

function listarrooms() {
    var sites = document.querySelector('#sitesmodalbody')
    let html = `<div class="row">
    <div class="col-4">
      <div class="list-group" id="list-tab" role="tablist">`
    let html2 = ``
    fs.collection('sedes').orderBy("nombre").get().then(snapshot => {
        if (snapshot.docs.length) {
            snapshot.forEach(doc => {
                if (doc.id != 'sat' && doc.id != 'out') {
                    html += `<a class="list-group-item list-group-item-action" id="list-${doc.id}-list" data-bs-toggle="list" href="#list-${doc.id}" role="tab" aria-controls="list-${doc.id}">${doc.data().nombre}</a>`
                    html2 += `<div class="tab-pane fade show" id="list-${doc.id}" role="tabpanel" aria-labelledby="list-${doc.id}-list"><button class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteplacemodal" onclick="deleteplace('${doc.id}')">Eliminar sede</button> <button type="button" class="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#newroommodal" onclick="nuevoroom('${doc.id}')">Nuevo room</button><ul class="list-group">`
                    for (var llave in doc.data().habitaciones) {
                        if (doc.data().habitaciones[llave] === true) {
                            html2 += `<li class="list-group-item">${llave} <button type="button" class="btn btn-outline-dark btn-sm" onclick="actualizarestado('${doc.id}', '${llave}')">Inhabilitar</button>`;
                        }
                        else {
                            html2 += `<li class="list-group-item list-group-item-secondary">${llave} <button type="button" class="btn btn-outline-dark btn-sm" onclick="actualizarestado('${doc.id}', '${llave}')">Habilitar</button>`;
                        }
                        html2 += `   <button class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteroommodal" onclick="deleteroom('${doc.id}', '${llave}')"><img src="trash.svg" alt="" width="15" height="15" class="d-inline-block align-text-top"></button></li>`
                    }
                    html2 += `</ul></div>`
                }
            })
            html += `</div>
            <button type="button" class="btn btn-outline-dark btn-sm" data-toggle="modal" data-target="#newplacemodal" onclick="">Nueva sede</button>
                </div>
                <div class="col-8">
                <div class="tab-content" id="nav-tabContent">`
            html += html2
            html += `</div>
                </div>
                </div>`
            sites.innerHTML = html
        }
    })

}

function eliminarusuario(id) {
    //$('#deleteusermodal').modal('show')
    document.getElementById('iduser').value = id
}

//correos
function buscacorreos3(str1) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(doc => {
                user = firebase.auth().currentUser;
                var nombrecortado = user.displayName.split(" ");
                var primernombre = nombrecortado[0];
                document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
                if (doc.data().admin) {
                    $("#addmodel").fadeIn();
                    $("#editsites").fadeIn();
                    $("#editpages").fadeIn();
                    console.log('usuario administrativo')
                    fs.collection("correos").orderBy("correo")
                        .onSnapshot((snapshot) => {
                            snapshot.docChanges().forEach((change) => {
                                if (change.type === "added") {
                                    generarlista(snapshot)
                                }
                                if (change.type === "modified") {
                                    generarlista(snapshot)
                                    console.log("Modified user: ", change.doc.data());
                                }
                                if (change.type === "removed") {
                                    generarlista(snapshot)
                                    console.log("Removed user: ", change.doc.data());
                                }
                            });
                        });
                }
                else {
                    console.log('usuario comun')
                    window.location = "../index.html";
                }
            });
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

function actualizarpermiso(iduser) {
    var docref = fs.collection('correos').doc(iduser)
    var getdoc = docref.get()
        .then(doc => {
            var estado = doc.data().admin;
            if (estado) {
                console.log('el usuario es administrativo y será usuario básico')
                docref.update({
                    admin: !estado,
                })
            }
            else {
                console.log('el usuario es básico y será administrativo')
                docref.update({
                    admin: !estado,
                })
            }
        })
}

function generarlista(instantanea) {
    let html = `<thead>
    <tr>
      <th scope="col">Correo</th>
      <th scope="col">Nombre</th>
      <th scope="col">Permisos admin.</th>
      <th scope="col"></th>
        </tr>
        </thead>
        <tbody>`;
    var usuarioslista = document.querySelector('#lista');
    if (instantanea.docs.length) {
        instantanea.forEach(doc => {
            usuario = doc.data()
            let li = `
                <tr>
                        <td>${usuario.correo}</td>
                `;
            if (usuario.nombre === undefined) {
                const lip = `
                        <td>
                        ...
                        </td>
                        `
                li += lip;
            }
            else {
                const lip = `
                        <td>
                        ${usuario.nombre}
                        </td>
                        `
                li += lip;
            }
            if (usuario.admin) {
                li += `<td><button type="button" class="btn btn-success btn-sm" onclick="actualizarpermiso('${doc.id}')">Sí</button></td>`
            }
            else {
                li += `<td><button type="button" class="btn btn-secondary btn-sm" onclick="actualizarpermiso('${doc.id}')">No</button></td>`
            }
            li += `<td><button class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#deleteusermodal" onclick="eliminarusuario('${doc.id}')"><img src="trash.svg" alt="" width="15" height="15" class="d-inline-block align-text-top"></button></td>`
            html += li;
        })
    }
    html += `</tbody>`
    usuarioslista.innerHTML = html;
    $("#lista").fadeIn();

}

//eventos
//listar los datos para los usuarios autenticados
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('verificando permisos del usuario')
        const email = user.email
        console.log(email)
        buscacorreos3(email)
        $("#logoutbutton").show();
    } else {
        console.log('no está conectado')
        $("#logoutbutton").hide();
        window.location = "../index.html";
    }
})