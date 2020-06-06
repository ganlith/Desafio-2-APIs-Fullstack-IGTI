const express = require("express");

module.exports = {

    async listGrades(request, response) {
        var fs = require("fs");
        var dir = './src/repositorio';
        var file = 'grades.json'


        let data = fs.readFileSync(`${dir}/${file}`, 'utf8');

        const grades = JSON.parse(data);
                
        return response.json({ grades });                
    }
}
