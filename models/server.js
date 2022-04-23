const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        };

        // Conectar a base de datos

        this.conectarDB();

        //Middlewares

        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        // Ruta autenticación
        this.app.use( this.paths.auth, require('../routes/auth') );
        // Ruta usuarios
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
        // Ruta categorias
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        // Ruta productos
        this.app.use( this.paths.productos, require('../routes/productos') );
        // Buscar
        this.app.use( this.paths.buscar, require('../routes/buscar') );
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('listening on port '+this.port);
        });
    }
}

module.exports = Server;