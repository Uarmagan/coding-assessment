module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'M1 API',
    description: '',
    termsOfService: '',
    contact: {
      name: 'Ugur Armagan',
      email: 'ugurarmagan93@gmail.com',
    },
  },
  host: 'localhost:3000',
  basePath: '/',

  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],

  paths: {
    '/transactions': {
      get: {
        summary: 'Get all transactions',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Transactions',
            },
          },
        },
        parameters: [
          {
            name: 'isCredit',
            in: 'query',
            description: 'Filter by credit',
            required: false,
            schema: {
              type: 'boolean',
              enum: [true, false],
            },
          },
          {
            name: 'sortBy',
            in: 'query',
            description: 'Sort by date or amount',
            required: false,
            schema: {
              type: 'string',
              enum: ['date', 'amount'],
            },
          },
          {
            name: 'orderBy',
            in: 'query',
            description: 'Order by ascending or descending',
            required: false,
            schema: {
              type: 'string',
              enum: ['ASC', 'DESC'],
            },
          },
        ],
      },
    },
    '/transactions/{id}': {
      get: {
        summary: 'Get a transaction by its ID',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Transactions',
            },
          },
        },
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'find by ID',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
      },
    },
    '/transactions/{id}/notes': {
      patch: {
        summary: 'update the transaction notes',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Transactions',
            },
          },
        },
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'find by ID',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'body',
            in: 'body',
            description: 'transaction notes',
            required: true,
            schema: {
              type: 'object',
              properties: {
                notes: { type: 'string', example: 'write your notes here' },
              },
            },
          },
        ],
      },
    },
  },
  definitions: {
    Transactions: {
      required: ['id'],
      properties: {
        id: {
          type: 'integer',
          uniqueItems: true,
        },
        date: {
          type: 'string',
        },
        amount: {
          type: 'number',
        },
        isCredit: {
          type: 'boolean',
        },
        description: {
          type: 'string',
        },
        imageUrl: {
          type: 'string',
        },
        notes: {
          type: 'string',
        },
      },
    },
  },
};
