'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//cinfigurar midleware
var mutipart = require('connect-multiparty');
var multipartMiddleware = mutipart({uploadDir:'./uploads'});


router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);

router.post('/save-project',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getProjects);
router.put('/project/:id',ProjectController.updateProject);
router.delete('/project/:id',ProjectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware,ProjectController.uploadImage);
router.get('/get-image/:imagen',ProjectController.getImageFile);



//--------------------------------------------------------

//ruta para guardar nuevas referencias
router.get('/save-ref',ProjectController.saveRef);
//rura para buscar referencia del cliente en especifico 
router.get('/client/:cliente?',ProjectController.getProjectByCliente);
//ruta para obtener todas la referencias 
router.get('/Refs',ProjectController.getRefs);






module.exports = router;