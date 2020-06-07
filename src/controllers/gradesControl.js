const express = require("express");

module.exports = {

    //Lista todas as grades
    async listAllGrades(request, response) {
        var fs = require("fs");
        var dir = './src/repositorio';
        var file = 'grades.json'


        let data = fs.readFileSync(`${dir}/${file}`, 'utf8');

        const grades = JSON.parse(data);

        return response.json({ grades });
    },

    // Crie um endpoint para criar uma grade.Este endpoint deverá receber como parâmetros os campos student, 
    // subject, type e value conforme descritos acima.Essa grade deverá ser salva no arquivo json grades.json, 
    // e deverá ter um id único associado.No campo timestamp deverá ser salvo a data e hora do momento da inserção.
    // O endpoint deverá retornar o objeto da grade que foi criada.A API deverá garantir o incremento automático 
    // desse identificador, de forma que ele não se repita entre os registros.Dentro do arquivo grades.json que 
    // foi fornecido para utilização no desafio, o campo nextId já está com um valor definido.Após a inserção é 
    // preciso que esse nextId seja incrementado e salvo no próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.
    async createGrade(request, response) {
        const { student, subject, type, value } = request.body;

        return response.json({ student });

    },

    // Crie um endpoint para atualizar uma grade.Esse endpoint deverá receber como parâmetros o id da grade a ser alterada 
    // e os campos student, subject, type e value.O endpoint deverá validar se a grade informada existe, caso não exista deverá 
    // retornar um erro.Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros no registro, e realizar 
    // sua atualização com os novos dados alterados no arquivo grades.json.
    async updateGrade(request, response) {
        const { id, student, subject, type, value } = request.body;

        return response.json({ student });

    },

    // Crie um endpoint para excluir uma grade.Esse endpoint deverá receber como parâmetro o id da grade 
    // e realizar sua exclusão do arquivo grades.json.
    async deleteGrade(request, response) {
        const { id } = request.params;
        console.log("Deletando id " + `${id}`)
        // if (incidents.ong_id != ong_id) {
        //     return response.status(401).json({ error: 'Opration not permitted.' });
        // }

        return response.status(204).send();
    },

    // Crie um endpoint para consultar uma grade em específico.Esse endpoint deverá receber como parâmetro 
    // o id da grade e retornar suas informações.
    async listGrade(request, response) {
        const { id } = request.params;

        return response.json({ id });

    },

    // Crie um endpoint para consultar a nota total de um aluno em uma disciplina.O endpoint deverá receber 
    // como parâmetro o student e o subject, e realizar a soma de todas as notas de atividades correspondentes 
    // àquele subject, para aquele student.O endpoint deverá retornar a soma da propriedade value dos registros encontrados.
    async totalGrade(request, response) {
        const { student, subject } = request.body;

        return response.json({ student });

    },

    // Crie um endpoint para consultar a média das grades de determinado subject e type.O endpoint deverá 
    // receber como parâmetro um subject e um type, e retornar a média.A média é calculada somando o registro 
    // value de todos os registros que possuem o subject e type informados, dividindo pelo total de registros 
    // que possuem este mesmo subject e type.
    async avgGrade(request, response) {
        const { subject, type } = request.body;

        return response.json({ subject });

    },

    // Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type.O endpoint 
    // deve receber como parâmetro um subject e um type, e retornar um array com os três registros de maior value 
    // daquele subject e type.A ordem deve ser do maior para o menor.
    async avgTopThreeGrade(request, response) {
        const { subject, type } = request.body;

        return response.json({ subject });

    }
}

// {
//     "nextId": 49,
//     "grades": [
//       {
//         "id": 1,
//         "student": "Loiane Groner",
//         "subject": "01 - JavaScript",
//         "type": "Fórum",
//         "value": 15,
//         "timestamp": "2020-05-19T18:21:24.958Z"
// }
