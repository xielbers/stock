// notificaciones.js

if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            // Aquí puedes enviar la notificación cuando el permiso esté concedido
            new Notification('Título de la notificación', {
                body: 'Contenido del mensaje'
            });
        }
    });
}
