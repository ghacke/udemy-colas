// Comando para establecer la conexion.
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Se conecto al servidor.');
});

socket.on('disconnect', function() {
    console.log('Me desconecte del servidor.');
});

socket.on('estadoActual', function(data) {
    label.text(data.actual);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);
    });

});