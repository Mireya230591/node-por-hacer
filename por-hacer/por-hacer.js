const fs = require('fs');

//Inicializa arreglo vacio para almacenar todas las notas
let listatadoPorHacer =[];
// Funcion que permite almacenar los registros en un archivo con formato tipo json
const guardarDB =()=>{
    // JSON:stringify convierte un objeto a un Json es una funcion
    let data = JSON.stringify(listatadoPorHacer)

    return new Promise((resolve, reject)=>{
        fs.writeFile(`./db/data.json`, data, (err) => {
            if (err) 
               throw new Error ('No se pudo guardad',err);
           
          });
        });
        }
// Funcion que convierte a un JSO a un objeto
const cargaDB = ()=>{
    // Metodo para leer un archivo JSON
    // Funcion detecta que es un archivo Json lo convierte a objeto
   try{
    listatadoPorHacer = require('../db/data.json');
   } catch(error){
   
        listatadoPorHacer = [];
        
   }
}



//Funcion para crear las notas que recibe la descipcion
const crear = (descripcion)=>{
    cargaDB();
    // Se crea un objeto 
    let porHacer ={
        descripcion,
        completado:false
    };

//  Se realiza un push al arreglo del objeto
    listatadoPorHacer.push(porHacer);
    guardarDB();
    return listatadoPorHacer;
}

let getListado =()=>{
    cargaDB();
    return  listatadoPorHacer ;
}

const actualizar = (descripcion,completado = true)=>{
    cargaDB();

    // Se crea un variable que tiene un metodo para crear el indice 
    // Y se utiliza un metodo para encontrar findInde recibe un callback
    let index = listatadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion});
    
    if (index >= 0){
        listatadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }   else return false ;

    
}

const borrar =(descripcion)=>{
     cargaDB();

    //  Funcion Filter sirve para quitar algun elemento en particular
        // y regresa otro arreglo
    let nuevoListado = listatadoPorHacer.filter(tarea =>{
        
        return tarea.descripcion !== descripcion;
       
    });
    
    if( listatadoPorHacer.length === nuevoListado.length){
        
        return false ;
      }  else {
        listatadoPorHacer = nuevoListado;
                        
        guardarDB();
        return true}
    }   


module.exports ={
    crear,
    getListado,
    actualizar,
    borrar
}