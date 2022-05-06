console.log("inicializado el documento pruebas");

const db=firebase.firestore();
/*
db.collection('correos').where("correo", "!=", false).get().then((querySnapshot) => {
    if(querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            console.log(doc.data().correo);
        })
    };
});

db.collection('correos').get().then((querySnapshot) => {
    if(querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            console.log(doc.data().correo);
        })
    };
});

var busqueda="IY8cWL7q2IxbIhB5CnBg"

var docref=db.collection("modelos").doc("prueba").collection("paginas").doc(busqueda);

docref.get().then((doc) => {
    console.log(doc.data());
})

const user = { name: "Juan", city: "Valencia", country: "Spain", valido: true }
db.collection('prueba 3').doc('1088337999').set(user);


var docref=db.collection("modelos").doc("1088337999")

docref.get().then((doc) => {
    console.log(doc.data().camsoda);
})
*/

//consulta 1, 2, 3
/*
db.collection('modelos').where("sede", "==", "piso 7").where("turno", "==", "mañana").get().then((querySnapshot) => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            console.log(doc.data().nick);
            console.log(doc.data().paginas);
            console.log(doc.data().paginas["chaturbate"].link);
            for (var llave in doc.data().paginas)
            {
                console.log(llave, ": ", doc.data().paginas[llave].link)
            }

        })
    }
})
*/
//consulta 10
//db.collection('modelos').doc('1088337998').update({"sede": "piso 7"});

//consulta 11
//db.collection('modelos').doc('1088337999').update({"paginas.camsoda.habilitada" : false})



//consulta 14
/*
db.collection('sedes').where("nombre", "==", "pinares").get().then((querySnapshot) => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            var id = doc.id
            console.log(id);
            db.collection('sedes').doc(id).update({"habitaciones.VI": false});
        })
    }
})
*/

//consulta 16
/*
var docref = db.collection('sedes').doc()
docref.set({
    nombre: "la 21",
    habitaciones: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
    }
})*/
//consulta 18
/*
db.collection('correos').doc('1088337999').set({
    correo: "prueba1234567@gmail.com",
    nombre: "Camilo Sanchez",
    permisos: {
        funcion1: true,
        funcion2: true,
        funcion3: false
    }
})
*/

//consulta 19
/*
db.collection('correos').doc('1088337999').update({
    "permisos.funcion1" : true
})
*/


//consulta 22
/*
db.collection("correos").doc("1088337999").delete().then(() => {
    console.log("documento borrado");
})
*/
//consulta 8 9
/*
db.collection("correos").where("correo", "==", "prueba1234567@gmail.com").get().then((querySnapshot) => {
    if (querySnapshot.docs.length)
    {
        querySnapshot.forEach(doc => {
            console.log("el usuario", doc.data().nombre, "tiene los siguientes permisos habilitados");
            for (var llave in doc.data().permisos){
                if (doc.data().permisos[llave] === true){
                    console.log(llave);
                }
            }
        })
    }
})
*/

//consulta 17
/*
db.collection('sedes').where("nombre", "==", "la 21").get().then((querySnapshot) => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            var id = doc.id
            console.log(id)
            db.collection("sedes").doc(id).update({"habitaciones.7": true});
        })
    }
})
*/

//consulta 20
/*
db.collection("sedes").doc("AYVZ52yW5Kp7zf89kk7A").delete().then(() =>{
    console.log("documento borrado");
} )
*/

//consulta 21
/*
var docref = db.collection('sedes').doc("AYVZ52yW5Kp7zf89kk7A")
var eliminarcampo = docref.update({
    "habitaciones.7" : firebase.firestore.FieldValue.delete()
})
*/

//consulta 7
/*
db.collection('sedes').get().then((querySnapshot => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            console.log(doc.data().nombre);
            for (var llave in doc.data().habitaciones)
            {
                if (doc.data().habitaciones[llave] === true){
                    console.log(llave);
                }
            }
        })
    }
}))
*/

/*
const modelo = { paginas: {
    camsoda: { usuario: "JuliaSmith", clave: "98765432", habilitada: true},
    chaturbate: { usuario: "JuliaSmith__", clave: "098765432", habilitada: true},
    stripchat: { usuario: "JuliaSmithX", clave: "47865", habilitada: true},
    myfreecams: { usuario: "Julia_Smith", clave: "23456", habilitada: false}

} }
db.collection("modelos").doc('1088337998').update({"paginas.camplace": { usuario: "prueba", clave: "1234"}})
*/

//consulta 5
/*
db.collection("produccion").where("idmodelo", "==", "1088337999").get().then((querySnapshot) => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            var id = doc.data().idmodelo;
            docref = db.collection("modelos").doc(id);
            docref.get().then(doc => {
                console.log(doc.data().nick);
            })
            console.log(doc.data().historico.a2021.m1.q1.camsoda);
        })
    }
})
*/

// Consulta 13
/*
db.collection("asistencia").doc("1088337999").update({
    "asistencia.a2021.m1.q1.d1" : { fecha: new Date("01/01/2021"), asiste: true, observaciones: "Turno en Piso 7"}
})
*/
/*
//consulta 
db.collection("asistencia").where("idmodelo", "!=", false).get().then((querySnapshot) => {
    if (querySnapshot.docs.length){
        querySnapshot.forEach(doc => {
            var id = doc.data().idmodelo;
            docref = db.collection("modelos").doc(id)
            docref.get().then(doc => {
                console.log(doc.data().nick);
            })
            console.log(doc.data().asistencia.a2021.m1["d1"].asiste);
        })
    }
})
*/
//consulta 12
/*
db.collection("produccion").doc("h5AU97Zz3NC2RSWZeAYs").update({
    "historico.a2021.m1.q2" : { camsoda: 11221, chaturbate: 984254, stripchat: 0, myfreecams: 85247 }
})
*/
