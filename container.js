const fs = require('fs')

class ContenedorArchivo {
    #container
    #path
    constructor (path){
        this.#container = []  
        this.#path = path
    }
    //Guarda productos
    async save(product){
        this.#container.push(product)
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#container))
    }
    //Busca productos por Id
    async getById(id){
        try {
            this.#container = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
            let search = this.#container.find(e => e.id === id)
            return search === undefined ? null : search
        } catch (error) {
            throw error
        }
    }
    
    //Muestra todos los productos 
    async getAll(){
        try {
            this.#container =  JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
            return this.#container.map(e => e,[])
            
        } catch (error){
            throw error
        }
    
    }
    //Elimina el producto por su Id
   async deleteById(id){
        try {
            this.#container = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).filter(e => e.id != id)
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#container))

        } catch (error) {
            throw error
        }
    
    }
    // Elimina todos los productos del contenedor
    async deleteAll(){
        try {
            this.#container = []
            await fs.promises.writeFile(this.#path, '[]')
        } catch (error) {
            throw error
        }
    }
}


module.exports = {ContenedorArchivo}
