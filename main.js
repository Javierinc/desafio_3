const {connect} = require('./server.js')

const PORT = 8080;
async function main(){
    try{
        const serv = await connect(PORT);
        console.log(`Conectado al puerto ${serv.address().port} 👀`)
    } catch(error){
        console.log(`Ups! algo falló 😥: ${error}`)
    }
}

main()