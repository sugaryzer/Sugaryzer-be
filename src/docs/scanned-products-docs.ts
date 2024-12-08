/**
 * @swagger
 * components:
 *  schemas:
 *     ScannedProducts:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *           description: scanned product id number
 *         user:
 *           type: type
 *           descripton: user related to this scanned product/user that scanned this product
 *           $ref: '#/components/models/product'
 *         userId:
 *           type: string
 *           descripton: id of user
 *         product:
 *           type: type
 *           description: the scanned product
 *           $ref: '#/components/models/product'
 *         productId:
 *           type: integer
 *           description: id of product
 *         createdAt:
 *           type: date
 *           description: Date created
 *         updatedAt:
 *           type: date
 *           description: Date updated
 *  models:
 *      product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 4
 *              code:
 *                  type: string
 *                  example: "8996001600146"
 *              name:
 *                  type: string
 *                  example: "Teh Pucuk Melati - mayora - 350 ml"
 *              image:
 *                  type: string
 *                  example: "https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg"
 *              category:
 *                  type: string
 *                  example: "Tea-based beverages"
 *              amountOfSugar:
 *                  type: integer
 *                  example: 18
 *         
 *
 * @swagger
 *  tags:
 *    name: ScannedProducts
 */

/**
 * @swagger
 * /api/scanned-products:
 * 
 *   get:
 *      parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Which page to show
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The numbers of items to return per page
 *      security:
 *      - bearerAuth: []
 *      summary: Return ALL scanned products
 *      operationId: getAll
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: List of scanned products
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
 *                            "message": "Scanned products history retrieved successfully",
 *                            "result": {
 *                              "data": [
 *                                {
 *                                  "id": 1,
 *                                  "userId": "cm4dzb47a0000s9hlq2r7m24z",
 *                                  "product": {
 *                                    "id": 1,
 *                                    "code": "8996001600146",
 *                                    "name": "tehPucuk Melati - mayora - 350 ml",
 *                                    "image": "https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg",
 *                                    "category": "Tea-based beverages",
 *                                    "amountOfSugar": 18
 *                                  },
 *                                  "productId": 1,
 *                                  "sugarConsume": 0,
 *                                  "createdAt": "2024-12-07T10:30:07.951Z"
 *                                }
 *                              ],
 *                              "paging": {
 *                                "size": 10,
 *                                "total_page": 1,
 *                                "current_page": 1
 *                              }
 *                            }
 *                          }
 *                                  
 * 
 */

/**
 * @swagger
 * /api/users/current/scanned-products:
 *
 *   post:
 *      summary: Create a history
 *      security:
 *      - bearerAuth: []
 *      operationId: getAllByUserId
 *      tags: [ScannedProducts]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      types: object
 *                      properties:
 *                          productId:
 *                              type: integer
 *                          sugarConsume:
 *                              type: integer
 *                  examples:
 *                      First:
 *                          value:
 *                              productId: 0
 *                              sugarConsume: 10
 *      responses:
 *          200:
 *              description: Return scanned product
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
 *                          error: false
 *                          message: History created successfully
 *                          result:
 *                              {
 *                                "error": false,
 *                                "message": "History created successfully",
 *                                "result": {
 *                                  "id": 17,
 *                                  "userId": "cm4dzb47a0000s9hlq2r7m24z",
 *                                  "product": {
 *                                    "id": 1,
 *                                    "code": "8996001600146",
 *                                    "name": "tehPucuk Melati - mayora - 350 ml",
 *                                    "image": "https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg",
 *                                    "category": "Tea-based beverages",
 *                                    "amountOfSugar": 18
 *                                  },
 *                                  "productId": 1,
 *                                  "sugarConsume": 10,
 *                                  "createdAt": "2024-12-08T13:45:05.278Z"
 *                                }
 *                              }
 *   get:
 *      parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Which page to show
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: The numbers of items to return per page
 *      security:
 *      - bearerAuth: []
 *      summary: Return all scanned products history of current user
 *      operationId: getAllByUserId
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: List of scanned products
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
 *                            "message": "Scanned products history retrieved successfully",
 *                            "result": {
 *                              "data": [
 *                                {
 *                                  "id": 1,
 *                                  "userId": "cm4dzb47a0000s9hlq2r7m24z",
 *                                  "product": {
 *                                    "id": 1,
 *                                    "code": "8996001600146",
 *                                    "name": "tehPucuk Melati - mayora - 350 ml",
 *                                    "image": "https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg",
 *                                    "category": "Tea-based beverages",
 *                                    "amountOfSugar": 18
 *                                  },
 *                                  "productId": 1,
 *                                  "sugarConsume": 0,
 *                                  "createdAt": "2024-12-07T10:30:07.951Z"
 *                                },
 *                                {
 *                                  "id": 2,
 *                                  "userId": "cm4dzb47a0000s9hlq2r7m24z",
 *                                  "product": {
 *                                    "id": 2,
 *                                    "code": "8886008101053",
 *                                    "name": "aqua btl - Danone - 600 ml",
 *                                    "image": "https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg",
 *                                    "category": "Natural mineral waters",
 *                                    "amountOfSugar": 0
 *                                  },
 *                                  "productId": 2,
 *                                  "sugarConsume": 0,
 *                                  "createdAt": "2024-12-07T10:35:39.717Z"
 *                                }
 *                              ],
 *                              "paging": {
 *                                "size": 10,
 *                                "total_page": 1,
 *                                "current_page": 1
 *                              }
 *                            }
 *                          }
 *                                      
 *                                  
 * 
 */

/**
 * @swagger
 * /api/users/current/scanned-products/{scannedProductId}:
 *   parameters:
 *   - in: path
 *     name: scannedProductId
 *     schema:
 *       type: integer
 *     required: true
 *     description: Id of a scanned product
 * 
 *   get:
 *      security:
 *      - bearerAuth: []
 *      summary: Return a specific scanned product history
 *      operationId: get
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: Return a scanned products
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
*                           {
*                             "error": false,
*                             "message": "Scanned product history retrieved successfully",
*                             "result": {
*                               "id": 1,
*                               "userId": "cm4dzb47a0000s9hlq2r7m24z",
*                               "product": {
*                                 "id": 1,
*                                 "code": "8996001600146",
*                                 "name": "tehPucuk Melati - mayora - 350 ml",
*                                 "image": "https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg",
*                                 "category": "Tea-based beverages",
*                                 "amountOfSugar": 18
*                               },
*                               "productId": 1,
*                               "sugarConsume": 0,
*                               "createdAt": "2024-12-07T10:30:07.951Z"
*                             }
*                           }
 *   delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete a specific scanned product
 *      operationId: remove
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: Return a scanned products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: object
 *                      example:
 *                          {
 *                            "error": false,
 *                            "message": "scanned product history deleted successfully"
 *                          }
 *                                      
 *                                  
 * 
 */
