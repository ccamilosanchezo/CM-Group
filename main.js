//registrar

const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    const signupemail = document.querySelector('#signup-email').value;
    const signuppassword = document.querySelector('#signup-password').value;

    auth
        .createUserWithEmailAndPassword(signupemail, signuppassword)
        .then(userCredential => {
            //limpiar el formulario
            signupform.reset();
            // cerrar la ventana
            $('#signupmodal').modal('hide')

            console.log('sign up')
        })
})

//ingresar
const loginform = document.querySelector('#login-form');

loginform.addEventListener('submit', e => {
    e.preventDefault();
    const signupemail = document.querySelector('#login-email').value;
    const signuppassword = document.querySelector('#login-password').value;
    auth
        .signInWithEmailAndPassword(signupemail, signuppassword)
        .then(userCredential => {
            //limpiar el formulario
            signupform.reset();
            // cerrar la ventana
            $('#loginmodal').modal('hide')

            console.log('sign up')
        })
})

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('sign out')
        location.reload()
    })
})

//google login
const googlebutton = document.querySelector('#googlelogin')
googlebutton.addEventListener('click', e => {
    //$('#googlelogin').prop('disabled', true);
    $("#googlespinner").show();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('Sesión iniciada con Google')
        })
        .catch(err => {
            console.log(err)
        })
})

//verifica si dos cadenas son iguales
function esigual(str1, str2) {
    return str1.toUpperCase() === str2.toUpperCase()
}

//correos
/*
function buscacorreos(str1)
{
    var rest=0;
    fs.collection('correos').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const correo = doc.data().correo
            console.log(correo)
            if (esigual(correo,str1)){
                console.log('correo encontrado')
                rest=1;
            }
        });
    });
    return rest
}

function buscacorreos2(str1)
{
    fs.collection('correos').where("correo", "==", str1).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const correo = doc.data().correo
            return esigual(correo,str1)
        });
    });
}*/

function buscacorreos3(str1, foto) {
    fs.collection('correos').where("correo", "==", str1).get().then(function (querySnapshot) {
        if (querySnapshot.docs.length) {
            $("#logoutbutton").fadeIn();
            $("#googlelogin").hide();
            querySnapshot.forEach(doc => {
                user = firebase.auth().currentUser;
                email = user.email;
                var hoy = new Date()
                var dia = hoy.getDate()
                document.querySelector('#botones').innerHTML = `<div class="col" align="center"><a href="modelos" class="link-dark nounderline"><div><img src="menu/modelos.png" alt="" width="150" height="150" class="d-inline-block align-text-top shadowbutton"></div><br><p class="fs-5 fw-light">Base de ingresos</p></a></div>
                <div class="col" align="center"><a href="asistencia" class="link-dark nounderline"><div><img src="menu/asistencia.png" alt="" width="150" height="150" class="d-inline-block align-text-top shadowbutton"></div><br><p class="fs-5 fw-light">Asistencia</p></a></div>
                <div class="col" align="center"><a href="cupos" class="link-dark nounderline"><div><img src="menu/${dia}.png" alt="" width="150" height="150" class="d-inline-block align-text-top shadowbutton"></div><br><p class="fs-5 fw-light">Cupos disponibles</p></a></div>
                <div class="col" align="center"><a href="produccion" class="link-dark nounderline"><div><img src="menu/produccion.png" alt="" width="150" height="150" class="d-inline-block align-text-top shadowbutton"></div><br><p class="fs-5 fw-light">Producción</p></a></div>
                <div class="col" align="center" id="boton2"><a href="admin" class="link-dark nounderline"><div id="boton2"><img src="menu/admin.png" alt="" width="150" height="150" class="d-inline-block align-text-top shadowbutton"></div><br><p class="fs-5 fw-light">Administrativos</p></a></div>`
                construirmenu(doc.data().admin);
                fs.collection('correos').doc(doc.id).update({ nombre: user.displayName })
                var hora = hoy.getHours()
                var html = ``
                if (hora < 12 && hora >= 4) {
                    html += `Buenos días, `
                }
                else {
                    if (hora <= 19 && hora >= 12) {
                        html += `Buenas tardes, `
                    }
                    else {
                        html += `Buenas noches, `
                    }
                }
                var nombrecortado = user.displayName.split(" ");
                var primernombre = nombrecortado[0];
                html += `${primernombre}`
                var saludo = document.querySelector('#saludo')
                var imagen = document.querySelector('#foto')
                document.querySelector('#navbarDropdownMenuLink').innerHTML = `${primernombre}`
                imagen.innerHTML = `<img class="circular--square" src="${foto}" />`
                saludo.innerHTML = html;
                $("#foto").slideDown();
                $("#saludo").slideDown();
            });
        } else {
            console.log('Usuario no encontrado')
            user = firebase.auth().currentUser;
            user.delete()
            console.log('Cerrando sesión')
            //$('#deniedmodal').modal('show')
            $("#alert").fadeTo(5000, 500).slideUp(500, function () {
                $("#alert").slideUp(500);
            })
            auth.signOut().then(() => {
                console.log('sign out')
                //location.reload()
                setTimeout('location.reload()', 1500)
            })
        };
    });
}

function construirmenu(admin) {

    if (admin) {
        //$('#botones').fadeIn()
        //document.getElementById("botones").style.display="flex"
        document.getElementById("botones").style.animation = "bluroff 2s"
        document.getElementById("botones").style.filter = "blur(0)"
    }
    else {
        //$('#botones').fadeIn()
        //$("#boton2").fadeOut();
        document.getElementById("boton2").style.animation = "fadeout 1s"
        document.getElementById("boton2").style.opacity = "0"
        setTimeout(function () {
            //$("#botones").animate({width: $("#botones").width() + 300});
            $("#boton2").hide()
            //$("#botones").width("auto")
            document.getElementById("botones").style.animation = "bluroff 2s"
            document.getElementById("botones").style.filter = "blur(0)"
        }, 1000)
        //$("#boton2").animate({width:'toggle'});
        //document.getElementById("botones").style.display="flex"
        //document.getElementById("botones").style.animation="bluroff 2s"
        //document.getElementById("botones").style.filter="blur(0)"
    }

}


//eventos
//listar los datos para los usuarios autenticados
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('verificando permisos del usuario')
        buscacorreos3(user.email, user.photoURL)
    } else {
        console.log('no está conectado')
        $("#logoutbutton").hide();
        $("#googlelogin").show();
        //$("#saludo").hide();
        //location.reload()
        //setupposts([])
    }
})