var fs = require('fs');
var csv = require('csv-string');
nome_do_arquivo = process.argv[2];
var extensao = nome_do_arquivo.split(".");

function ler_entrada(nome_do_arquivo){
	nome_do_arquivo = process.argv[2];
	var extensao = nome_do_arquivo.split(".");
	var numeros;
/*JSON?*/
	if(extensao[1]=="json"){
		numeros = './'+nome_do_arquivo;
	}
/*CSV?*/
	if(extensao[1]=="csv")
	{
		numeros = './'+nome_do_arquivo;
	}
/*XML?*/
	if(extensao[1]=="xml")
	{
		numeros = './'+nome_do_arquivo;
	}
	return numeros;
}
//INTERVALO_JSON
function criar_intervalo_json(){
	var arquivo = ler_entrada();
	numeros = JSON.parse(fs.readFileSync(arquivo));
	var intervalo = [];
	var inicio_intervalo = numeros.numeros[0];
	var fim_intervalo;
	for (var i = 0 ; i <= numeros.numeros.length; i++) {

		if(parseInt(numeros.numeros[i+1]) != parseInt(numeros.numeros[i]) + 1 && numeros.numeros[i] != undefined){
			fim_intervalo = numeros.numeros[i];
			if(fim_intervalo == inicio_intervalo)
			{
				intervalo.push ("[" + fim_intervalo + "]");
			}
			else intervalo.push ("[" + inicio_intervalo+ " - " + fim_intervalo + "]");
			if(numeros.numeros[i+1] != undefined) inicio_intervalo = numeros.numeros[i+1];
		}

	};

	for (var i = 0; i <= intervalo.length; i++) {
		if(intervalo[i] != undefined)console.log(intervalo[i]);
	};
	//salvar
	fs.writeFile("C:\ArqvJson", intervalo, function(err) {
		if(err) {
				console.log(err);
		}
		else {
				console.log("The file was saved!");
		}
	});
	//fim_salvar
}//fim json

/*INTERVALO_CSV*/
function criar_intervalo_csv(){
	var arquivo = ler_entrada();
//INTRO
	fs.readFile(arquivo, 'utf8', function(err, data) {
		numeros = csv.parse(data);
//FIM_DA_INTRO
		var intervalo = [];
		var inicio_intervalo = numeros[0][0];
		var fim_intervalo;
//INICIO_FOR
		for (var i = 0; i < numeros.length; i++) {
				if((parseInt(numeros[i+1])) != (parseInt(numeros[i]) + 1)){
				fim_intervalo = parseInt(numeros[i]);

				if(fim_intervalo == inicio_intervalo)
				{
					intervalo.push ("[" + fim_intervalo + "]");
				}
				else intervalo.push ("[" + inicio_intervalo+ " - " + fim_intervalo + "]");
				if(numeros[i+1] != undefined) inicio_intervalo = numeros[i+1];
			}

		}; //FIM_FOR
		for (var i = 0; i <= intervalo.length; i++) {
			if(intervalo[i] != undefined)console.log(intervalo[i]);
		} /*fim_for_consolelog*/
			//salvar
			fs.writeFile("C:\ArqvCSV", intervalo, function(err) {
    		if(err) {
        		console.log(err);
    		}
				else {
        		console.log("The file was saved!");
    		}
			}); /*fim_salvar*/
	});  /*FIM_FS.READ*/
}/*fim csv*/

//INTERVALO_XML
function criar_intervalo_xml(){
	/*var arquivo = ler_entrada();
	var intervalo = [];

	function lerXMLComXml2Js(arquivo, funcao) {
		var xmlParser = require('xml2js').parseString;
		fs.readFile(arquivo, function(err, data) {
		 	xmlParser(data, funcao);
		});
	}
	lerXMLComXml2Js(arquivo, function(err, result) {
		var inicio_intervalo = result.numeros.numero[0]['$'].id;
		var fim_intervalo;

		//INICIO_FOR
		for (var i = 0; i <= result.length; i++) {
		//console.log(numeros[i] +'+'+ numeros[i+1] +'='+ (parseInt(numeros[i]) + parseInt(numeros[i+1])));
						if(parseInt(result.numeros.numero[i+1]['$'].id) != (parseInt(result.numeros.numero[i]['$'].id) + 1) && parseInt(result.numeros.numero[i]['$'].id) != undefined){
						fim_intervalo = parseInt(numeros[i]);

						if(fim_intervalo == inicio_intervalo)
						{
							intervalo.push ("[" + fim_intervalo + "]");
						}
						else intervalo.push ("[" + inicio_intervalo+ " - " + fim_intervalo + "]");
						if(numeros[i+1] != undefined) inicio_intervalo = numeros[i+1];
					}

				};
				for (var i = 0; i <= intervalo.length; i++) {
					if(intervalo[i] != undefined)console.log(intervalo[i]);
				};
});

}*/ //FIM_XML

if(extensao[1] == 'json'){
		criar_intervalo_json();
}
if(extensao[1] == 'csv'){
		criar_intervalo_csv();
}
if(extensao[1] == 'xml'){
		criar_intervalo_xml();
}
