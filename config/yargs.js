const descripcion= {
    demand: true,
      alias: 'd',
      desc: 'Descripcion de la tarea por hacer'
} 

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado la tarea'
}


const argv = require('yargs')
.command('crear','Generar un archio con la tabla de multiplicar', 
   { descripcion
    })
.command('actualizar','Actualizar las notas',{
         descripcion,
        completado
    })
.command('borrar','Borrar una nota ',{
    descripcion

   
})
// .command('actualizar','Actualizar las notas')
.help()
.argv;

module.exports = {
    argv
}