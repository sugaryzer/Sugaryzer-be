/**
 * @swagger
 * components:
 *  schemas:
 *     Recommendations:
 *       type: object
 *       properties:
 *         product:
 *           type: object
 *           description: product that needs alternative
 *         altProduct:
 *           type: object
 *           descripton: alternative for product
 *         productId:
 *           type: integer
 *           descripton: id of product
 *         altProductId:
 *           type: integer
 *           description: id of alternative product
 *         sugarDifference:
 *           type: integer
 *           description: difference of sugar value between altProduct and product
 *         createdAt:
 *           type: date
 *           description: Date created
 *         updatedAt:
 *           type: date
 *           description: Date updated
 *
 * @swagger
 *  tags:
 *    name: Recommendations
 */

/**
 * @swagger
 * /api/products/{productBarcode}/recommendations:
 *   parameters:
 *   - in: path
 *     name: productBarcode
 *     schema:
 *       type: integer
 *     required: true
 *     description: Code of product to get its recommendations                                                              
 *   - in: query
 *     name: page
 *     schema:
 *       type: integer
 *     description: Which page to show
 *   - in: query
 *     name: size
 *     schema:
 *       type: integer
 *     description: The numbers of items to return per page
 *   get:
 *      security:
 *      - bearerAuth: []
 *      summary: Return recommendations for a product
 *      operationId: get
 *      tags: [Recommendations]
 *      responses:
 *          200:
 *              description: Return product's recommendations
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: array
 *                        items:
 *                            type: object
 *                            properties:
 *                                error:
 *                                    type: boolean
 *                                message:
 *                                    type: string
 *                                result:
 * 
 *                      example:
 *                          {
 *                            "error": false,
 *                            "message": "Recommendations retrieved successfully",
 *                            "result": {
 *                              "data": [
 *                                {
 *                                  "altProduct": {
 *                                    "id": 6,
 *                                    "code": "8997222540174",
 *                                    "name": "Toza Jus Buah Sirsak 1 ",
 *                                    "image": "asd",
 *                                    "category": "Jus & Sari Buah",
 *                                    "amountOfSugar": 5
 *                                  },
 *                                  "productId": 7,
 *                                  "altProductId": 6,
 *                                  "sugarDifference": -5
 *                                },
 *                                {
 *                                  "altProduct": {
 *                                    "id": 9,
 *                                    "code": "711844162419",
 *                                    "name": "asd",
 *                                    "image": "asd",
 *                                    "category": "asd",
 *                                    "amountOfSugar": 0
 *                                  },
 *                                  "productId": 7,
 *                                  "altProductId": 9,
 *                                  "sugarDifference": 0
 *                                },
 *                                {
 *                                  "altProduct": {
 *                                    "id": 0,
 *                                    "code": "N/A",
 *                                    "name": "N/A",
 *                                    "image": "N/A",
 *                                    "category": "N/A",
 *                                    "amountOfSugar": 0
 *                                  },
 *                                  "productId": 7,
 *                                  "altProductId": 0,
 *                                  "sugarDifference": 2
 *                                },
 *                                {
 *                                  "altProduct": {
 *                                    "id": 0,
 *                                    "code": "N/A",
 *                                    "name": "N/A",
 *                                    "image": "N/A",
 *                                    "category": "N/A",
 *                                    "amountOfSugar": 0
 *                                  },
 *                                  "productId": 7,
 *                                  "altProductId": 0,
 *                                  "sugarDifference": 3
 *                                },
 *                                {
 *                                  "altProduct": {
 *                                    "id": 0,
 *                                    "code": "N/A",
 *                                    "name": "N/A",
 *                                    "image": "N/A",
 *                                    "category": "N/A",
 *                                    "amountOfSugar": 0
 *                                  },
 *                                  "productId": 7,
 *                                  "altProductId": 0,
 *                                  "sugarDifference": 3.9000000000000004
 *                                }
 *                              ]
 *                            }
 *                          }
 *                                  
 * 
 */
