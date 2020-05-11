const helpTicket= require('../db/helpTicket');

module.exports.onconnection=(socket,io)=>{
    console.log("connection created succesfully");

    socket.on('join',(data)=>{
        socket.join(data.room);
        console.log('new user joined the room '+data.room);
    })

    socket.on('leave',(data)=>{
        console.log('user left the room '+data.room);
        socket.leave(data.room);
    })

    socket.on('message',(data)=>{
        console.log(' message: '+data.message);
        helpTicket.findOneAndUpdate({_id:data.room},{$push:{messages:{sender:data.user,message:data.message}}},(err,doc)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(doc);
            }
        })
        io.in(data.room).emit('new message',{user:data.user,message:data.message});
    })
}