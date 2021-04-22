// var array;
		// var cont=0;

		// for(var i = 0; i < localStorage.length; i++){
		// 	$scope.pets.push([localStorage.getItem(i)]);
		// }

var array = [{nome: "Ágatha", animal: "Gato", raca: "Sem raça", sexo: "Fêmea"},
			{nome: "Hulk", animal: "Cachorro", raca: "Labrador", sexo: "Macho"},
			{nome: "Hamtaro", animal: "Hamster", raca: "Sem raça", sexo: "Macho"}];
var cont = localStorage.length;
console.log(localStorage.length);

angular.module("cadastro").controller("cadastroCtrl", function($scope){
	$scope.titulo = "PET";
	$scope.pets = [
		array[0], array[1], array[2]
	];
	$scope.animais = ["Cachorro", "Coelho", "Gato", "Hamster"];

	localStorage.setItem(0, JSON.stringify(array[0]));
	localStorage.setItem(1, JSON.stringify(array[1]));
	localStorage.setItem(2, JSON.stringify(array[2]));

	$scope.isPetSelecionado = function(pets){
		return pets.some(function (pet){
			return pet.selecionado;
		});
	};
	$scope.removerPet = function(pets){
		$scope.pets = pets.filter(function (pet){
			if (pet.selecionado){
				for(var i=0; i<=localStorage.length;i++){
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
		$scope.pets.push(angular.copy(pet));
		localStorage.setItem(cont, JSON.stringify(pet));
		cont++;
		delete $scope.pet;
	};
	$scope.cancelar = function(pet){
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