export const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected');
    socket.on('disconnect', () => console.log('🔴 Client disconnected'));
  });
};

export const emitDisasterUpdate = (io, disasterId) => {
  io.emit('disaster_updated', { disasterId });
};
