const { io }= require('../index');
const { Bands } = require('../models/bands');
const { Band }= require("../models/band");
const bands = new Bands();

bands.addBand( new Band( 'Queen'));
bands.addBand( new Band( 'cAMILO'));
bands.addBand( new Band( 'bad Bunny'));
bands.addBand( new Band( 'eva luna'));



// Mensaje de Sockets
io.on('connection', client => {
    // console.log(bands);

    client.emit('active-bands', bands.getBands())

    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log(payload);
    //     io.emit('mensaje', {admin: 'Nuevo Mensaje'})
    // })

    // client.on('emitir-mensaje', ( payload ) => {
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', payload)
    // })
    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id);
        io.emit('active-bands', bands.getBands());
    })
    client.on('add-band', ( payload ) => {
        bands.addBand( new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    })
    client.on('delete-band', ( payload ) => {
        bands.deleteBand( payload.id);
        io.emit('active-bands', bands.getBands());
    })
});
