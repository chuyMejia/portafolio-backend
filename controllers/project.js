'use strict'

var Project = require('../models/project');

var fs = require('fs');

var path = require('path');


var controller ={

	home:function(req,res){

		return res.status(200).send({message:'soy la home desde controller'});

	},
	test:function(req,res){

		return res.status(200).send({message:'soy la test desde controller'});
	},
	saveProject:function(req,res){

		var project = new Project();

		var params = req.body;
//chuy git
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.lags = params.lags;
		project.year = params.year;
		project.image = null;

		project.validate()
		.then(() => {
		    // Validación exitosa, continuar con el guardado
		    return project.save();
		  })
		 .then(projectStored => {
		    console.log('Documento guardado:', projectStored);
		    return res.status(200).send({project:projectStored});
		  })
		  .catch(error => {
		    console.error('Error al guardar el documento:', error);
		    if(error) res.status(500).send({
		    	error:error,
		    	message:'Error en la peticion '});
		  });

	/*	project.save((err,projectStored)=>{

			if(err) res.status(500).send({message:'Error en la peticion '});

			if(!projectStored) res.status(404).send({message:'no se pudo guardar el projecto'});


			return res.status(200).send({project:projectStored});



		});*/


	},
	getProject:function(req,res){

		var projectId = req.params.id;

		//return res.status(200).send({menssage:projectId});

		if(projectId == null) res.status(404).send({message:'no se pudo obtener'});

		Project.findById(projectId)
		  .then(foundDoc => {
		    if (foundDoc) {
		      console.log('Documento encontrado:', foundDoc);
		      return res.status(200).send({project:foundDoc});
		    } else {
		      console.log('No se encontró ningún documento con el ID proporcionado.');
		    }
		  })
		  .catch(error => {
		    console.error('Error al buscar el documento:', error);
		    return status(500).send({error:error});
		  });

		/*Project.findById(projectId,(err,project)=>{

			if(err) res.status(500).send({message:'Error en la peticion '});

			if(!project) res.status(404).send({message:'no se pudo obtener'});


			return res.status(200).send({project:project});


			
		});*/


		
	},
	getProjects:function(req,res){	
		//Project.find({year:2023}).exec()
	Project.find({}).sort('+year').exec()
		.then((allobjects)=>{
			console.log(allobjects);
			return res.status(200).send({allobjects:allobjects});

		}).catch(err=>{
			console.log(err);
			return res.status(500).send({message:err});

		});


/*		Project.find({}).exec((err,projects)=>{

			if(err) return res.status(500).send({message:'error al devolver los datos'});
			if(!projects) return res.status(404).send({message:'no hay projectos'});

			return res.status(200).send({projects:projects})

		});*/

	},
	updateProject:function(req,res){

		var projectId = req.params.id;
		var update = req.body;


		Project.findByIdAndUpdate(projectId, update, { new: true })
		    .then(updatedDocument => {
		      console.log("Updated document:", updatedDocument);
		      return res.status(200).send({
				project:updatedDocument
			});
		      // Handle the updated document or any other post-update logic here
		    })
		    .catch(error => {
		      console.error("Error updating document:", error);
		      return res.status(404).send({message:'no existe el project a actalizar'});
		      // Handle the error
		    });

	/*	Project.findByIdAndUpdate(projectId,update,(err,projectUpdated)=>{

		if(err) return res.status(500).send({message:err});


		if(!projectUpdated) return res.status(404).send({message:'no existe el project a actalizar'});

			return res.status(200).send({
				project:projectUpdated
			});

		});*/
	},
	deleteProject:function(req,res){
		var projectId = req.params.id;


		 Project.findByIdAndRemove(projectId)
		    .then(removedDocument => {
		      console.log("Removed document:", removedDocument);
		      return res.status(200).send({
				project:removedDocument	
			});
		      // Handle the removed document or any other post-removal logic here
		    })
		    .catch(error => {
		      console.error("Error removing document:", error);
		       return res.status(404).send({message:'no existe el id'});
		      // Handle the error
		    });


/*
		Project.findByIdAndRemove(projectId,(err,projectRemove)=>{

			if(err) return res.status(500).send({message:err});
			if(!projectRemove) return res.status(404).send({message:'no se pudo remover el project'});

			return res.status(200).send({
				project:projectRemove	
			});


		});*/



//LHERNANDEZ  1179    PRUEBA 3ARCHIVOS

	},
	uploadImage:function(req,res){

		var projectId = req.params.id;

		var fileName = 'Imagen no subida';

		if(req.files){

		var filePath = req.files.image.path;
		var fileSplit =  filePath.split('/');
		var fileName = fileSplit[1];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];

		if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

			Project.findByIdAndUpdate(projectId,{image:fileName},{new:true})

			.then(updatedDocument => {
		      console.log("Updated document:", updatedDocument);
		      return res.status(200).send({
					project:updatedDocument
			});	
		     
		    })
		    .catch(error => {
		      console.error("Error updating document:", error);
		      return status(500).send({menssage:'image no se subio'});
		      // Handle the error
		    });

		}else{
			fs.unlink(filePath,(err)=>{

				return res.status(200).send({menssage:'extension de archivo no valida'})
			});

		}


		



/*
		Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,projectUpdate)=>{


			if(err) return status(500).send({menssage:'image no se subio'});

			if(!projectUpdate) return status(500).send({menssage:'projecto no existe'});

			console.log(req.files);
			return res.status(200).send({
					project:projectUpdate
			});	


		});*/

		
		}else{
			return res.status(500).send({
				message:fileName
		});
		}



	},
	getImageFile:function(req,res){
		var file = req.params.imagen;
		var path_file = './uploads/'+file;


		fs.exists(path_file,(exists) =>{
			if(exists){
				return res.sendFile(path.resolve(path_file));

			}else{
				return res.status(200).send({
					message:"No existe la imagen...."
				});
			}


		})



	}


};


/*
	name:String,
	description:String,
	category:String,
	lags:String,
	//lags:[String]
	year:Number



*/



module.exports = controller;