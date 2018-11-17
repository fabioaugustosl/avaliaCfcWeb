
apoioApp.controller('AlunoPesquisarController', 
	function ($scope, $rootScope, $routeParams, $sessionStorage,$location, notify, moment, alunoService, aulaService, cfcService, dashboardService, simuladoService){
		
		console.log("chegou no controller de aluno pesquisar");
		var alunoCtrl = this;

		var idAluno = $routeParams.idAluno;
		console.log("  >>> id ALUNO ", idAluno);

		$scope.$emit("tituloPagina", "Desempenho do aluno");


		alunoCtrl.processando = false;

		alunoCtrl.codigoAlunoInformado = null;
		alunoCtrl.aluno;
		alunoCtrl.cfc = $sessionStorage.usuarioLogado;

		alunoCtrl.msgErro = null;


		// relatorio aulas
		alunoCtrl.aulas = {};
		alunoCtrl.todasAulas = null ;
		alunoCtrl.exercicios = [];
		alunoCtrl.dash = {};
		alunoCtrl.graficoMediaPorExercicio = null;



		var notificarErro = function(msg){
			notify({ message: msg, 
					classes: 'alert-danger', position: 'right', duration: 3000 });
		};

		var notificarSucesso = function(msg){
			notify({ message: msg, 
					classes: 'alert-success', position: 'right', duration: 3000 });
		};
		


		//callback dash
		var callbackRecuperarCfc =  function(cfcRetorno){
			console.log('callback da recuperação da cfc: ',cfcRetorno);
			alunoCtrl.cfc  = cfcRetorno;
			for(var f = 0; f < cfcRetorno.exercicios.length; f++){
				var exe = cfcRetorno.exercicios[f];
				alunoCtrl.exercicios[exe._id] = exe.nome;
			}

			console.log('VAI CHAMAR 2 DASHS ');

			// dados graficos avaliações
			dashboardService.listarMediaNotasPorExercicio(alunoCtrl.aluno.cfc, alunoCtrl.aluno.login, callbackListarDashExercicios);
			dashboardService.listarMediaNotasPorAula(alunoCtrl.aluno.cfc, alunoCtrl.aluno.login, callbackListarDashAula);
		};

		var callbackListarDashExercicios= function(resultado){
			console.log("call back  callbackListarDashExercicios", resultado);

			alunoCtrl.graficoMediaPorExercicio = {};
			alunoCtrl.graficoMediaPorExercicio.labels = [];
			alunoCtrl.graficoMediaPorExercicio.series = ['Aproveitamento em % '];
			alunoCtrl.graficoMediaPorExercicio.data = [ ];

			var dados = []; 
			for(var i=0; i<resultado.length ;i++){
				var d = resultado[i];
				alunoCtrl.graficoMediaPorExercicio.labels.push(alunoCtrl.exercicios[d._id.exercicio]);
				dados.push((d.nota * 100) / 5);
			}
			alunoCtrl.graficoMediaPorExercicio.data[0] = dados;
			console.log('alunoCtrl.graficoMediaPorExercicio : ',alunoCtrl.graficoMediaPorExercicio);

			// fazer uma media geral de desempenho
			var totalDesempenho = 0;
			for(var j=0; j < dados.length; j++ ){
				totalDesempenho += dados[j];
			}
			alunoCtrl.dash.desempenhoGeral = totalDesempenho/dados.length;
			
		};

		var callbackListarDashAula= function(resultado){
			console.log("call back  callbackListarDashAula", resultado);

			//DASH  1
			//grafico media aproveitamento por aula
			alunoCtrl.graficoMediaPorAula = {};
			alunoCtrl.graficoMediaPorAula.labels = [];
			alunoCtrl.graficoMediaPorAula.series = ['Aproveitamento em % '];
			alunoCtrl.graficoMediaPorAula.data = [ ];

			var dados = []; 
			for(var i=0; i<resultado.length ;i++){
				var d = resultado[i];
				var aulaCompleta = alunoCtrl.aulas.aulas[d._id.aula];
				console.log('aulaCompleta ::: ',aulaCompleta);
				if(aulaCompleta){
					alunoCtrl.graficoMediaPorAula.labels.push(moment(aulaCompleta.data).format("DD/MM/YYYY"));
					dados.push((d.nota * 100) / 5);
				}
			}

			alunoCtrl.graficoMediaPorAula.data[0] = dados;
			console.log('alunoCtrl.graficoMediaPorAula: ',alunoCtrl.graficoMediaPorAula);
			
			//DASH 2
			// grafico periodo das aulas
			alunoCtrl.graficoPeriodoAulas = {};
			alunoCtrl.graficoPeriodoAulas.labels = [];
			alunoCtrl.graficoPeriodoAulas.data = [];

			console.log('vai agrupar as aulas por periodo ',alunoCtrl.aulas.aulas);
			var periodoAula = [];
			for(var i=0; i<alunoCtrl.todasAulas.length ;i++){
				var a = alunoCtrl.todasAulas[i];
				var p = periodoAula[a.periodo];
				if(!p){ p = 0;}
				p++;
				periodoAula[a.periodo] = p;
			}
		
			for (var key in periodoAula) {
			  	alunoCtrl.graficoPeriodoAulas.labels.push(key);
				alunoCtrl.graficoPeriodoAulas.data.push(periodoAula[key]);
			}
			console.log('alunoCtrl.graficoPeriodoAulas : ',alunoCtrl.graficoPeriodoAulas);

		};



		//callback recuperar aulas 
		var callbackListarAulas = function(resultado){
			console.log("call back listar aulas", resultado);
			alunoCtrl.todasAulas = resultado;
			alunoCtrl.aulas.totalAulas = 0;
			if(resultado){
				alunoCtrl.aulas.aulas = [];
				for(var a =0; a < resultado.length; a++){
					var aula = resultado[a];
					//console.log(aula);
					alunoCtrl.aulas.aulas[aula._id] = aula;	
				}
				console.log('aulas tratadas: ',alunoCtrl.aulas.aulas);
				 
				alunoCtrl.aulas.totalAulas = resultado.length;
			}
			
			console.log('Agora vai buscar a cfc do aluno ');
			// recupera a cfc do aluno para depois buscar os dashboards.
			cfcService.recuperarCfcPorId(alunoCtrl.aluno.cfc, callbackRecuperarCfc);

		};


		//calbacks recuperar aluno
		var callbackListarErro= function(resultado){
			alunoCtrl.processando  = false;
			alunoCtrl.msgErro = 'Ocorreu um erro ao recuperar as informações das aulas do aluno.';
			notificarErro(alunoCtrl.msgErro);
		};


		var callbackListar = function(resultado){
			console.log("call back listar aluno: ", resultado);
			if(resultado && resultado.length > 0){
				

				alunoCtrl.aluno = resultado[0];	

				alunoCtrl.buscarSimulados(alunoCtrl.aluno._id);

				console.log("agora vai buscar as aulas do aluno: ",alunoCtrl.aluno);
				
				// dados aulas 
				// OBS: após recuperar as aulas ele busca as notas
				aulaService.listar("?aluno="+alunoCtrl.aluno._id, callbackListarAulas);

			} else {
				alunoCtrl.msgErro = 'Aluno não encontrado';
			}

			alunoCtrl.processando  = false;
		};


		alunoCtrl.voltarTelaAluno = function(){
			$location.replace();
			$location.url('/cadAluno');
		};


		alunoCtrl.buscarAluno = function(){
			alunoCtrl.aulas = {};

			alunoCtrl.msgErro = null;
			alunoCtrl.processando = true;
			alunoService.listar("?login="+alunoCtrl.codigoAlunoInformado, callbackListar, callbackListarErro);		
		};


		
		// SIMULADOS

		var callbackSimulado = function(resultado){
			console.log("callback buscar simulados: ", resultado);
			alunoCtrl.simulados = resultado;
		};


		alunoCtrl.buscarSimulados  = function(aluno){
			console.log('VAi buscar simulados');
			simuladoService.listarTodosPorAluno(aluno, callbackSimulado);
		};



		if(idAluno){
			alunoCtrl.pesquisaAtiva = false;
			alunoCtrl.codigoAlunoInformado = idAluno;
			alunoCtrl.buscarAluno();
		} else {
			alunoCtrl.pesquisaAtiva = true;
		}
	              

	}
	
);