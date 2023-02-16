class Message {
    constructor(uid, nombre, message) {
        this.uid = uid;
        this.nombre = nombre;
        this.message = message;
    }
}
class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }
    get usuariosArr() {
        return Object.values(this.usuarios);
    }

    enviarMensaje(uid, nombre, mensaje) {
        this.mensajes.unshift(new Message(uid, nombre, mensaje));
    }

    connectarUsuario(usuario) {
        this.usuarios[usuario.id] = usuario;
    }

    desconnectarUsuario(id) {
        delete this.usuarios[id];
    }
}

module.exports = ChatMensajes;