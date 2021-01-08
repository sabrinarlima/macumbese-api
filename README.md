# Macumbe-se API

## Endpoints

### POST - `/user/login`

#### Request
```json
{
    "email": "sergio_alcides13@gmail.com",
    "password": "formula1-2010"
}
```

#### Response

- Status: `200`

```json
{
    "token": "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"
}
```


### POST - `/user/sign-up`

#### Request
```json
{
    "email": "sergio_alcides13@gmail.com",
    "name": "Sidney Santos",
    "password": "formula12010",
    "date-of-birth": "30-12-1970",
    "street-address": "Rua São Miguel de Lagoinha, Bairro dos Cocais 235",
    "zipcode": "12344321",
    "city": "Marangacaíba",
    "state": "PC",
    "phone": "1199571100",
    "phone-2": "1199571102",
    "due-day": 20,
    "since": "30/10/2013"
}
```

#### Response

- Status: `204`


### PUT - `/user/profile/update`


#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"
```json
{
    "email": "sergio_alcides13@gmail.com",
    "name": "Sidney Santos",
    "date-of-birth": "30-12-1970",
    "street-address": "Rua São Miguel de Lagoinha, Bairro dos Cocais 235",
    "zipcode": "12344321",
    "city": "Marangacaíba",
    "state": "PC",
    "phone": "1199571100",
    "phone-2": "1199571102",
    "due-day": 20,
}
```

#### Response

- Status: `204`

### GET - `/user/profile`


#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"

#### Response
```json
{
    "relation_type": "ASSOCIADO",
    "email": "sergio_alcides13@gmail.com",
    "name": "Sidney Santos",
    "date-of-birth": "30-12-1970",
    "street-address": "Rua São Miguel de Lagoinha, Bairro dos Cocais",
    "zipcode": "12344321",
    "city": "Marangacaíba",
    "state": "PC",
    "phone": "1199571100",
    "phone-2": "1199571102",
    "due-day": 20,
}
```

### GET - `/user/dashboard`

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"

#### Response

- Status: `200`


```json
{
    "billings": {
        "pending": [
            {
                "value": 30,
                "due-date": "20/10/2020"
            },
            {
                "value": 30,
                "due-date": "20/11/2020"
            }
        ],
        "next-due": {
            "value": 35,
            "due-date": "30/12/2020",
        }
    }
}
```

### GET - `/user/admin/list-users`

`Query Parameters`

| Key     | Type   |
|---------|--------|
| name    | string |
| sort-by | string |
|         |        |

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"

#### Response

- Status: `200`


```json
{
    "profiles": [
        {
            "name": "Wagner Ramos",
            "relation_type": "FILIADO",
            "debts_count": 3,
        }
    ]
}
```

### GET - `/billings/settings`

#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"

#### Response

- Status: `200`


```json
{
    "value": 40
}
```

### PUT - `/billings/settings`

#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"


```json
{
    "value": 40
}
```


#### Response

- Status: `200`

### GET - `/user/:user-id/billings/`

#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"


#### Response

```json
{
    "profile": {
        "name": "João Carlos",
        "relation_type": "FILIADO",
        "billings": {
            "pending": [
                {
                    "id": "565f491c-5147-11eb-ae93-0242ac130002"
            "value": 30,
                    "due-date": "20/10/2020"
                },
                {
                    "id": "565f491c-5147-11eb-ae93-0242ac130002"
            "value": 30,
                    "due-date": "20/11/2020"
                }
            ],
            "next-due": {
                "id": "565f491c-5147-11eb-ae93-0242ac130002"
            "value": 35,
                "due-date": "30/12/2020",
            }
        }
    }
}
```

- Status: `200`

### POST - `/billings/:billing-id/settled/`

#### Request

`Headers`

- Authorization Token: "1c39c8f1-f63d-4ab4-ae22-3f042614cebd"


#### Response

- Status: `200`
