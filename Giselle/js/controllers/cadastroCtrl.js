var array = [];
var elementos;

for(var i = 0; i < localStorage.length; i++){
	elementos = localStorage.key(i);
}

for(var i = 0; i <= elementos; i++){
	if(localStorage.getItem(i)!=null) array.push(JSON.parse(localStorage.getItem(i)));
}

angular.module("cadastro").controller("cadastroCtrl", function($scope){
	$scope.titulo = "PET";
	$scope.pets = array;
	$scope.animais = ["Cachorro", "Coelho", "Gato", "Hamster"];

	$scope.isPetSelecionado = function(pets){
		return pets.some(function (pet){
			return pet.selecionado;
		});
	};
	$scope.removerPet = function(pets){
		$scope.pets = pets.filter(function (pet){
			if (pet.selecionado){
				for(var i = 0; i <= elementos; i++){
					var petString = '{"nome":"' + pet.nome + '","animal":"' + pet.animal + '","raca":"' + pet.raca + '","sexo":"' + pet.sexo + '"}';
	
					if(petString == localStorage.getItem(i)){
						localStorage.removeItem(i);
					}
				}
			}

			if (!pet.selecionado){
				return pet;
			}
		});
	};
	$scope.adicionarPet = function(pet){
		elementos++;
		$scope.pets.push(angular.copy(pet));
		localStorage.setItem(elementos, JSON.stringify(pet));
		delete $scope.pet;
	};
	$scope.cancelar = function(pet){
		//tentei essa alteração conforme orientação, mas diz que a propriedade nome não está definida
		//tentei mandar pets ao invés de pet. aí vem definido, pelo menos. mas 'nome' continua não definido.
		//pet.nome = "";
		console.log(pet);
		document.getElementById("idNome").value = " ";
		document.getElementById("idAnimal").selectedIndex = 0;
		document.getElementById("idRaca").value = " ";
		document.getElementById("macho").checked = false;
		document.getElementById("femea").checked = false;
		delete $scope.pet;
	};
	$scope.editarPet = function(pets){
		pets.find(function (pet){
			if (pet.selecionado){
				document.getElementById("idNome").value = pet.nome;

				for(var i = 0; i <= $scope.animais.length; i++){
					if($scope.animais[i] == (pet.animal)){
						document.getElementById("idAnimal").selectedIndex = (i+1);
					}
				}

				document.getElementById("idRaca").value = pet.raca;

				if(pet.sexo == "Macho") document.getElementById("macho").checked = true;
				if(pet.sexo == "Fêmea") document.getElementById("femea").checked = true;

				return pet;
			}
		});
	};
});
