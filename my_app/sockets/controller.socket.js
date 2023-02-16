const { validarJWT } = require('../helpers');
const Chatmensajes = require('../models/chat-mensajes');
const chatmensajes = new Chatmensajes();

exports.socketControllers = async (client, io) => {
    const usuario = await validarJWT(client.handshake.headers['x-token']);
    if (!usuario) {
        return client.disconnect();
    }

    console.log('Se conecto', usuario.nombre);

    chatmensajes.connectarUsuario(usuario);
    io.emit('usuarios-activos', chatmensajes.usuariosArr);
    client.emit('recibir-mensaje', chatmensajes.ultimos10);

    //Connectarlo a una sala
    client.join(usuario.id);

    client.on('disconnect', () => {
        chatmensajes.desconnectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatmensajes.usuariosArr);
    });

    client.on('enviar-mensaje', ({ uid, mensaje }) => {
        // console.log(payload);
        if (uid) {
            // chatmensajes.enviarMensaje();
            client.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            chatmensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensaje', chatmensajes.ultimos10);
        }
    });

}