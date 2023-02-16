const url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/"
    : "https://" + window.location.hostname + "/api/auth/";

let usuario;
let client;

const validarJwt = async () => {
    const token = localStorage.getItem("token") || '';
    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('Token invalido');
    }
    fetch(url, {
        headers: { 'x-token': token }
    }).then((res) => res.json()).then(async ({ usuario: usuarioDB, token: tokenDB }) => {
        localStorage.setItem('token', tokenDB);
        usuario = usuarioDB;
        document.title = usuario.nombre;
        await connectSocket(token);
    }).catch(console.log);

}

const connectSocket = async (token) => {
    client = io({
        'extraHeaders': {
            'x-token': token
        }
    });

    client.on('connect', () => {
        console.log('Socket online');
    });

    client.on('disconnect', () => {
        console.log('Socket offline');
    });

    client.on('recibir-mensaje', (mensajes) => {
        // console.log(mensajes);
        let tmp = '';
        for (let m of mensajes) {
            tmp += '<li><span class="text-primary">' + m.nombre + ': </span><span class="text-muted">' + m.message + '</span></li>';
        }
        $('#ulMensajes').innerHTML = tmp;
    });

    client.on('usuarios-activos', (usuarios) => {
        let tmp = '';
        for (let u of usuarios) {
            tmp += '<li><p class="text-success">' + u.nombre + '</p><span class="text-muted">' + u.id + '</span></li>';
        }
        $('#ulUsuarios').innerHTML = tmp;
    });

    client.on('mensaje-privado', (payload) => {
        console.log(payload);
    });
}

$('#txtMensaje').keyup(function () {
    const mensaje = $('#txtMensaje').value;
    const uid = $('#txtUI').value;
    if (mensaje === 0) return;

    client.emit('enviar-mensaje', { mensaje, uid });
});

// $('#txtUI')
// 
// $('#ulMensajes')
// $('#btn-salir')
const main = async () => {
    await validarJwt();
}

main();
