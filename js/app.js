document.getElementById("formulario").addEventListener("submit",cadastrarVeiculo);

function cadastrarVeiculo(e){

	var modeloCarro = document.getElementById("modeloCarro").value;
	var placaCarro = document.getElementById("placaCarro").value;
	var time = new Date();

	if (modeloCarro==""||placaCarro=="") {
		alert("Por favor, entre com carro e placa.");
		return false; 
	}

	var carro= {
		modelo:modeloCarro.toUpperCase(),
		placa:placaCarro.toUpperCase(),
		hora:time.getHours(),
		minutos:time.getMinutes()
	}
		
	if (localStorage.getItem('patio2')===null) {
		var carros = [];		
		carros.push(carro);
		localStorage.setItem('patio2', JSON.stringify(carros));
	}else{
		var carros = JSON.parse(localStorage.getItem('patio2'));
		carros.push(carro);
		localStorage.setItem('patio2', JSON.stringify(carros));	
	}	
	document.getElementById("formulario").reset();
	showVeicles();
	e.preventDefault();
}
function deletVeicle(placa){

	var veicles = JSON.parse(localStorage.getItem('patio2'));
	for(var i = 0; i < veicles.length; i++){
		if (veicles[i].placa == placa) {
			veicles.splice(i,1);
		}
		localStorage.setItem('patio2',JSON.stringify(veicles));
	}
	showVeicles();
}

function showVeicles(){

	if (localStorage.getItem('patio2')===null) {
		return false;
	}

	var veicles = JSON.parse(localStorage.getItem('patio2'));
	var result = document.getElementById('resultados'); 
	result.innerHTML = "";
	for(var i = 0 ; i < veicles.length; i++){
		var modelo = veicles[i].modelo;
		var placa = veicles[i].placa;
		var hora = veicles[i].hora;
		var minutos = veicles[i].minutos;

		result.innerHTML +='<tr><td>'+ modelo + '</td>'+
								'<td>' + placa +'</td>'+
							    '<td>' + hora + ' : ' + minutos +'</td>'+ 
				                '<td><button class="btn btn-danger"onclick="deletVeicle(\''+placa+'\')">Excluir</button></td>' +
						   '</tr>';

	}
}

