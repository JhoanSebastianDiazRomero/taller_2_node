const { default: axios } = require("axios")
const fs = require("fs")
const http = require("http")

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('./index.html', null, (err, data) => {
        res.write(data)
        res.end()
    })
}).listen(8081)


axios.all([
    axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'),
    axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')
])
.then(axios.spread((proveedores, clientes)=>{

    var arrayProveedores = proveedores.data
    var arrayClientes = clientes.data
    
    console.log("Proveedores")
    console.log("ID | Nombre Compañía | Nombre Contacto")
    for (let index = 0; index < arrayProveedores.length; index++) {
        const actual = arrayProveedores[index];
        console.log(actual.idproveedor + " | " + actual.nombrecompania + " | " + actual.nombrecontacto)
    }

    console.log(" ")

    console.log("Clientes")
    console.log("ID | Nombre Compañía | Nombre Contacto")
    for (let index = 0; index < arrayClientes.length; index++) {
        const actual = arrayClientes[index];
        console.log(actual.idCliente + " | " + actual.NombreCompania + " | " + actual.NombreContacto)
    }

}))
.catch(err => console.log(err))
