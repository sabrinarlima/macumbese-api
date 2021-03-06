const mysql = require('mysql2');



class TableCreation {
    init(connection) {
        this.connection = connection

        this.createUser();
        this.createBilling();
        this.createBillingSettings();
    }

    createUser() {
        const sql = 'CREATE TABLE user (id varchar(255) NOT NULL UNIQUE DEFAULT (UUID()),'
            + 'relationType varchar(15), email varchar(100), name varchar(50), password varchar(255),'
            + 'userToken varchar(255) DEFAULT "", dtBirth date NOT NULL, streetAd varchar(100), zipcode varchar(9),city varchar(30),'
            + 'state char(2), phone1 varchar(11), phone2 varchar(11), dueDay varchar(11),'
            + 'since date NOT NULL, userRole varchar(20), PRIMARY KEY (id))'

        this.connection.query(sql, err => {
            if (!err) {
                console.log('Table user has been created')
            }
        })

    }

    createBilling() {
        const sql = 'CREATE TABLE billing (id varchar(255) NOT NULL UNIQUE DEFAULT (UUID()), '
            + 'user_id varchar(255), pay_date date, due_date date NOT NULL, value float, PRIMARY KEY (id))';

        this.connection.query(sql, err => {
            if (!err) {
                console.log('Table billing has been created')
            }
        })
    }

    createBillingSettings() {
        const sql = `CREATE TABLE billing_settings (id varchar(255) NOT NULL UNIQUE DEFAULT (UUID()), value float, PRIMARY KEY (id))`;

        this.connection.query(sql, err => {
            if (!err) {
                console.log('Table billing_settings has been created')
            }
        })
    }
}



const createTables = () => {
    new TableCreation().init(connection);
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'macumbese',
});

const executeQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (errors, results, fields) => {
            if (errors) {
                reject(errors)
            } else {
                resolve(results)
            }

        })
    })
}



module.exports = { executeQuery, createTables }