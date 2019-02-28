const { io } = require('../server');
const { TicketContronl } = require('../classes/tocket-control');

const ticketContronl = new TicketContronl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        // console.log(data);

        let siguientString = ticketContronl.siguiente();

        callback(siguientString);
    });

    //Emitir 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketContronl.getUltimoTicket(),
        ultimos4: ticketContronl.getUltimo4()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario.'
            });
        }

        let atenderTicket = ticketContronl.atenderTicket(data.escritorio);

        // Notificar cambios en los ultimos 4
        client.broadcast.emit('estadoActual', {
            actual: ticketContronl.getUltimoTicket(),
            ultimos4: ticketContronl.getUltimo4()
        });

        callback(atenderTicket);
    });

});