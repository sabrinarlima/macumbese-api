const moment = require('moment');
const user = require('../models/user');

class UserParser {

    // Converte para o formato do banco
    toEntity(userDTO) {
        return {
            name: userDTO.name,
            email: userDTO.email,
            relationType: user['relation-type'],
            password: userDTO.password,
            dtBirth: moment(user['date-of-birth'], 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
            streetAd: user['street-address'],
            zipcode: userDTO.zipcode,
            city: userDTO.city,
            state: userDTO.state,
            phone1: userDTO.phone,
            phone2: user['phone-2'],
            dueDay: user['due-day'],
            since: moment(userDTO.since, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        };
    }

    // Converte para o formato da API
    toDto(userEntity) {
        return {
            'name': userEntity.name,
            'email': userEntity.email,
            'relation-type': userEntity.relationType,
            'password': userEntity.password,
            'date-of-birth': moment(userEntity.dtBirth, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY'),
            'street-address': userEntity.streetAd,
            'zipcode': userEntity.zipcode,
            'city': userEntity.city,
            'state': userEntity.state,
            'phone': userEntity.phone1,
            'phone-2': userEntity.phone2,
            'due-day': userEntity.dueDay,   
            since: moment(userEntity.since, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
        };
    }
}

module.exports = new UserParser();