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
 *         
 *  models:
 *      scannedProductResponse:
 *          type: object
 *          properties:
 *            Id:
 *              type: integer
 *              description: scanned product id number
 *              example: 3
 *            userId:
 *              type: string
 *              descripton: id of user
 *              example: abc
 *            product:
 *              type: type
 *              description: the scanned product
 *              $ref: '#/components/models/product'
 *            productId:
 *              type: integer
 *              description: id of product
 *              example: 4
 *            createdAt:
 *              type: date
 *              description: Date created
 *              example: "2024-11-24T18:48:06.379Z"
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
 * @swagger
 *  tags:
 *    name: ScannedProducts
 */

/**
 * @swagger
 * /api/scanned-products:
 * 
 *   get:
 *      summary: Return ALL scanned products
 *      operationId: getAll
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: List of scanned products
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/models/scannedProductResponse'
 *                      example:
 *                          data:
 *                              - id : 3
 *                                userId: user1
 *                                product:
 *                                  id: 4
 *                                  code: "8996001600146"
 *                                  name: Teh Pucuk Melati - mayora - 350 ml 
 *                                  image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                  category: Tea-based beverages
 *                                  amountOfSugar: 18
 *                                productId: 4
 *                                createdAt: "2024-11-24T18:48:06.379Z"
 *                              - id : 4
 *                                userId: user2
 *                                product:
 *                                  id: 6
 *                                  code: "8886008101053"
 *                                  name: aqua btl - Danone - 600 ml
 *                                  image: https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg
 *                                  category: Natural mineral waters
 *                                  amountOfSugar: 0
 *                                productId: 6
 *                                createdAt: "2024-11-24T18:48:06.379Z"
 *                              - id : 5
 *                                userId: user1
 *                                product:
 *                                  id: 4
 *                                  code: "8996001600146"
 *                                  name: Teh Pucuk Melati - mayora - 350 ml 
 *                                  image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                  category: Tea-based beverages
 *                                  amountOfSugar: 18
 *                                productId: 4
 *                                createdAt: "2024-11-24T18:48:06.379Z"
 *                                  
 * 
 */

/**
 * @swagger
 * /api/users/{userId}/scanned-products:
 *   parameters:
 *   - in: path
 *     name: userId
 *     schema:
 *       type: string
 *     required: true
 *     description: Id of user to get their history of scans
 *
 *   post:
 *      summary: Create a scanned product history
 *      operationId: getAllByUserId
 *      tags: [ScannedProducts]
 *      requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              productId:
 *                                  type: integer
 *                                  example: 4
 *      responses:
 *          200:
 *              description: Return created history
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/models/scannedProductResponse'
 * 
 *   get:
 *      summary: Return all scanned products by user id
 *      operationId: getAllByUserId
 *      tags: [ScannedProducts]
 *      responses:
 *          200:
 *              description: List of scanned products
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/models/scannedProductResponse'
 *                      example:
 *                          data:
 *                              - id : 3
 *                                userId: user1
 *                                product:
 *                                  id: 4
 *                                  code: "8996001600146"
 *                                  name: Teh Pucuk Melati - mayora - 350 ml 
 *                                  image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                  category: Tea-based beverages
 *                                  amountOfSugar: 18
 *                                productId: 4
 *                                createdAt: "2024-11-24T18:48:06.379Z"
 *                              - id : 5
 *                                userId: user1
 *                                product:
 *                                  id: 4
 *                                  code: "8996001600146"
 *                                  name: Teh Pucuk Melati - mayora - 350 ml 
 *                                  image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                  category: Tea-based beverages
 *                                  amountOfSugar: 18
 *                                productId: 4
 *                                createdAt: "2024-11-24T18:48:06.379Z"
 *                                      
 *                                  
 * 
 */

/**
 * @swagger
 * /api/users/{userId}/scanned-products/{scannedProductId}:
 *   parameters:
 *   - in: path
 *     name: userId
 *     schema:
 *       type: string
 *     required: true
 *     description: Id of user to get their history of scans
 *   - in: path
 *     name: scannedProductId
 *     schema:
 *       type: integer
 *     required: true
 *     description: Id of a scanned product
 * 
 *   get:
 *      summary: Return a specific scanned product
 *      operationId: get
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
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/models/scannedProductResponse'
 *   delete:
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
 *                          data: Scanned product deleted
 *                                      
 *                                  
 * 
 */
