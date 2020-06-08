const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');

const gradesControl = require('./controllers/gradesController');

const routes = express.Router();

routes.get("/", gradesControl.listAllGrades);

routes.post("/grade", celebrate({
    [Segments.BODY]: Joi.object().keys({
        student: Joi.string().required(),
        subject: Joi.string().required(),
        type: Joi.string().required(),
        value: Joi.number().required()
    })
}), gradesControl.createGrade);

routes.put("/grade", celebrate({
    [Segments.BODY]: Joi.object().keys({        
        id: Joi.number().required(),
        student: Joi.string().required(),
        subject: Joi.string().required(),
        type: Joi.string().required(),
        value: Joi.number().required()
    })
}), gradesControl.updateGrade);
    
routes.delete("/grade/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({        
        id: Joi.number().required()
    })
}), gradesControl.deleteGrade);

routes.get("/grade/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({        
        id: Joi.number().required()
    })
}), gradesControl.listGrade);

routes.get("/totalGrade", celebrate({
    [Segments.BODY]: Joi.object().keys({        
        student: Joi.string().required(),
        subject: Joi.string().required()
    })
}), gradesControl.totalGrade);

routes.get("/avgGrade", celebrate({
    [Segments.BODY]: Joi.object().keys({        
        subject: Joi.string().required(),
        type: Joi.string().required()
    })
}), gradesControl.avgGrade);

routes.get("/avgTopThreeGrade", celebrate({
    [Segments.BODY]: Joi.object().keys({        
        subject: Joi.string().required(),
        type: Joi.string().required()
    })
}), gradesControl.avgTopThreeGrade);

module.exports = routes;
