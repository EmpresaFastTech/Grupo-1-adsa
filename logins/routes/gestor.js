var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Gestao = require('../models').Gestao;
var Empresa = require('../models').Empresa;

router.put('/update', function(req, res, next) {

	var idEmpresa = req.body.idEmpresa; 
	var nomeEmpresa = req.body.nomeEmpresa; 	
	var CNPJ= req.body.CNPJ; 	
	var cep = req.body.cep; 	
	var bairro = req.body.bairro; 	
	var logradouro = req.body.logradouro; 	
  	var cidade = req.body.cidade;
  	var numero = req.body.numero;
  	var complemento = req.body.complemento;
  	var loginEmpresa = req.body.loginEmpresa;
  	var senhaEmpresa = req.body.senhaEmpresa;
  	var telefone = req.body.telefone;
  	var email = req.body.email;
	let instrucaoSql;
	 
	instrucaoSql = `update [dbo].[Empresa] set loginEmpresa = '${loginEmpresa}',senhaEmpresa='${senhaEmpresa}',nomeEmpresa='${nomeEmpresa}',CNPJ='${CNPJ}',telefone='${telefone}',email='${email}',logradouro='${logradouro}',cidade='${cidade}',numero=${+(numero)},complemento='${complemento}',cep='${cep}',bairro='${bairro}' where idEmpresa = ${+(idEmpresa)}`;
	
	console.log(instrucaoSql);
	sequelize.query(instrucaoSql, {
		model: Empresa
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});
/* ROTA DELETAR */
router.delete('/delete/:idUsuario', function (req, res, next) {
    console.log('Recuperando todas as publicações');
  
    var idUsuario = req.params.idUsuario;
  
    let instrucaoSql = `DELETE FROM [dbo].[Empresa] WHERE idEmpresa = ${idUsuario}`;
  
    sequelize.query(instrucaoSql, {
        model:  Empresa,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
  });

/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function (req, res, next) {
  console.log('Recuperando todas as publicações');

  var idUsuario = req.params.idUsuario;

  let instrucaoSql = `select * from [dbo].[Empresa] inner join [dbo].[Responsavel] on idEmpresa = fkEmpresa where idEmpresa = ${idUsuario} and tipo = 'gestor'`;

  sequelize.query(instrucaoSql, {
      model: Gestao,
      mapToModel: true
  })
      .then(resultado => {
          console.log(`Encontrados: ${resultado.length}`);
          res.json(resultado);
      }).catch(erro => {
          console.error(erro);
          res.status(500).send(erro.message);
      });
});

/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/sup/:idUsuario', function (req, res, next) {

  var idUsuario = req.params.idUsuario;

  let instrucaoSql = `select * from [dbo].[Empresa] inner join [dbo].[Responsavel] on idEmpresa = fkEmpresa where idEmpresa = ${idUsuario} and tipo = 'suporte'`;

  sequelize.query(instrucaoSql, {
      model: Gestao,
      mapToModel: true
  })
      .then(resultado => {
          console.log(`Encontrados: ${resultado.length}`);
          res.json(resultado);
      }).catch(erro => {
          console.error(erro);
          res.status(500).send(erro.message);
      });
});

router.get('/empresa/:idUsuario', function (req, res, next) {

    var idUsuario = req.params.idUsuario;
  
    let instrucaoSql = `select * from [dbo].[Empresa]`;
  
    sequelize.query(instrucaoSql, {
        model: Empresa,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
  });
module.exports = router;