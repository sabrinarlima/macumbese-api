const moment = require('moment');

class BillingParser {

    // Converte para o formato do banco
    toEntity(billingDTO) {
        return {
            'due_date': billingDTO['due-date'],
            'value': billingDTO.value,
        };
    }

    // Converte para o formato da API
    toDto(billingEntity) {
        return {
            'due-date': moment(billingEntity.due_date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY'),
            'value': billingEntity.value,
        };
    }
}

module.exports = new BillingParser();