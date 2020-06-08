const express = require("express");

module.exports = {

    //Lista todas as grades
    async listAllGrades(request, response) {
        var fs = require("fs");
        
        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const grades = JSON.parse(data);

        const listGrades = grades.grades.sort((a, b) => a.id - b.id)

        return response.json({ listGrades });
    },

    // Crie um endpoint para criar uma grade.Este endpoint deverá receber como parâmetros os campos student, 
    // subject, type e value conforme descritos acima.Essa grade deverá ser salva no arquivo json grades.json, 
    // e deverá ter um id único associado.No campo timestamp deverá ser salvo a data e hora do momento da inserção.
    // O endpoint deverá retornar o objeto da grade que foi criada.A API deverá garantir o incremento automático 
    // desse identificador, de forma que ele não se repita entre os registros.Dentro do arquivo grades.json que 
    // foi fornecido para utilização no desafio, o campo nextId já está com um valor definido.Após a inserção é 
    // preciso que esse nextId seja incrementado e salvo no próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.
    async createGrade(request, response) {
        var fs = require("fs");
        
        const { student, subject, type, value } = request.body;
        
        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const gradesAll = JSON.parse(data);
        
        let grades = gradesAll.grades;

        const newGrades = {
            id: gradesAll.nextId,
            student: student,
            subject: subject,
            type: type,
            value: value,
            timestamp: new Date()
        };

        const finalGrade = {
            nextId: gradesAll.nextId + 1,
            grades: [
              ...grades,
              newGrades
            ]
        };
        

        fs.writeFile('./src/repositorio/grades.json', JSON.stringify(finalGrade), function (err) {
            if (err) throw err;
                console.log('Updated!');
          });

        return response.json({ finalGrade });

    },

    // Crie um endpoint para atualizar uma grade.Esse endpoint deverá receber como parâmetros o id da grade a ser alterada 
    // e os campos student, subject, type e value.O endpoint deverá validar se a grade informada existe, caso não exista deverá 
    // retornar um erro.Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros no registro, e realizar 
    // sua atualização com os novos dados alterados no arquivo grades.json.
    async updateGrade(request, response) {
        const { id, student, subject, type, value } = request.body;
        var fs = require("fs");
        var error = 'Grade with id ' + id + ' not found';

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const gradesAll = JSON.parse(data);
        
        let grades = gradesAll.grades;

        const index = grades.findIndex(grade => grade.id === id);

        if (index < 0) 
            return response.json({ error });
        
        const gradesNew = grades.filter(grade => grade.id != id);

        const gradeData = {
            id: id,
            student: student,
            subject:subject,
            type: type,
            value: value,
            timestamp: new Date()
        }

        const finalGrade = {
            nextId: gradesAll.nextId,
            grades: [
              ...gradesNew,
              gradeData
            ]
        };
        
        fs.writeFileSync('./src/repositorio/grades.json', JSON.stringify(finalGrade));

        return response.json({ gradeData });

    },

    // Crie um endpoint para excluir uma grade.Esse endpoint deverá receber como parâmetro o id da grade 
    // e realizar sua exclusão do arquivo grades.json.
    async deleteGrade(request, response) {
        const { id } = request.params;
        var fs = require("fs");
        var error = 'Grade with id ' + id + ' not found';

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const gradesAll = JSON.parse(data);
        
        let grades = gradesAll.grades;

        const index = grades.findIndex(grade => grade.id === id);

        if (index < 0) 
            return response.json({ error });
        
        const gradesNew = grades.filter(grade => grade.id != id);

        const finalGrade = {
            nextId: gradesAll.nextId,
            grades: [
              ...gradesNew
            ]
        };
        
        fs.writeFileSync('./src/repositorio/grades.json', JSON.stringify(finalGrade));

        return response.status(204).send();
    },

    // Crie um endpoint para consultar uma grade em específico.Esse endpoint deverá receber como parâmetro 
    // o id da grade e retornar suas informações.
    async listGrade(request, response) {
        const { id } = request.params;

        var fs = require("fs");

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const grades = await JSON.parse(data);
                     
        const grade = grades.grades.filter(grade => grade.id === id);

        return response.json({ grade });

    },

    // Crie um endpoint para consultar a nota total de um aluno em uma disciplina.O endpoint deverá receber 
    // como parâmetro o student e o subject, e realizar a soma de todas as notas de atividades correspondentes 
    // àquele subject, para aquele student.O endpoint deverá retornar a soma da propriedade value dos registros encontrados.
    async totalGrade(request, response) {
        var fs = require("fs");
        const { student, subject } = request.body;

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const grades = JSON.parse(data);

        var notaTotal = 0

        grades.grades.forEach(grade => {
            if ((grade.student === student) && (grade.subject === subject)){
                notaTotal += grade.value
            }
        });
            
        return response.json({ notaTotal });

    },

    // Crie um endpoint para consultar a média das grades de determinado subject e type.O endpoint deverá 
    // receber como parâmetro um subject e um type, e retornar a média.A média é calculada somando o registro 
    // value de todos os registros que possuem o subject e type informados, dividindo pelo total de registros 
    // que possuem este mesmo subject e type.
    async avgGrade(request, response) {
        var fs = require("fs");
        const { subject, type } = request.body;

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const grades = JSON.parse(data);
        var total = 0
        var i = 0

        grades.grades.forEach(grade => {
            if ((grade.subject === subject) && (grade.type === type)){
                total += grade.value
                i ++;
            }
        });

        const avgSubject = total / i;
            
        return response.json({ avgSubject });
    },

    // Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type.O endpoint 
    // deve receber como parâmetro um subject e um type, e retornar um array com os três registros de maior value 
    // daquele subject e type.A ordem deve ser do maior para o menor.
    async avgTopThreeGrade(request, response) {
        var fs = require("fs");

        const { subject, type } = request.body;

        let data = fs.readFileSync('./src/repositorio/grades.json', 'utf8');

        const grades = JSON.parse(data);
        
        var gradesAvg = grades.grades
            .sort((a, b) => b.value - a.value)
            .filter(grade => (grade.subject === subject && grade.type === type))
            .slice(0, 3);

        return response.json({ gradesAvg });

    }
}