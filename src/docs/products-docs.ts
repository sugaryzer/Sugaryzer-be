/**
 * @swagger
 * components:
 *  schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the product
 *         code:
 *           type: string
 *           descripton: Code from the barcode of the product
 *         name:
 *           type: string
 *           descripton: Product name
 *         image:
 *           type: string
 *           description: Link to product's image
 *         category:
 *           type: string
 *           description: Product's category
 *         amountOfSugar:
 *           type: integer
 *           description: Drink's sugars content
 *         createdAt:
 *           type: date
 *           description: Date created
 *         updatedAt:
 *           type: date
 *           description: Date updated
 *         
 * @swagger
 *  tags:
 *    name: Products
 */

/**
 * @swagger
 * /api/products:
 * 
 *   post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a product
 *      operationId: create
 *      tags: [Products]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *                  examples:
 *                      tehPucuk:
 *                          value: 
 *                              code: "8996001600146"
 *                              name: tehPucuk Melati - mayora - 350 ml
 *                              image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                              category: Tea-based beverages
 *                              amountOfSugar: 18
 *                      aqua:
 *                          value:
 *                              code: "8886008101053"
 *                              name: aqua btl - Danone - 600 ml
 *                              image: https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg
 *                              category: Natural mineral waters
 *                              amountOfSugar: 0
 *      responses:
 *          200:
 *              description: Return the product on success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: boolean
 *                                  message:
 *                                      type: string
 *                                  result:
 * 
 *                      example:
 *                          error: false
 *                          message: product created successfully
 *                          result:
 *                              - data:
 *                                  tehPucuk:
 *                                      value: 
 *                                          code: "8996001600146"
 *                                          name: tehPucuk Melati - mayora - 350 ml
 *                                          image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                          category: Tea-based beverages
 *                                          amountOfSugar: 18
 *                                      
 *   patch:
 *      security:
 *      - bearerAuth: []
 *      summary: Update a product
 *      operationId: update
 *      tags: [Products]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *                  example:
 *                      id: 4
 *                      name: tehPucuk Melati - mayora - 350 ml UPDATED
 *                      image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                      category: Tea-based beverages
 *                      amountOfSugar: 18
 *      responses:
 *          200:
 *              description: Return the updated product on success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: boolean
 *                                  message:
 *                                      type: string
 *                                  result:
 * 
 *                      example:
 *                          error: false
 *                          message: product updated successfully
 *                          result:
 *                              - data:
 *                                  tehPucuk:
 *                                      value: 
 *                                          code: "8996001600146"
 *                                          name: tehPucuk Melati - mayora - 350 ml UPDATED
 *                                          image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                                          category: Tea-based beverages
 *                                          amountOfSugar: 18
 * 
 */

/**
 * @swagger
 * /api/products/scan:
*   post:
*      security:
*      - bearerAuth: []
*      summary: Scan a product and return its information
*      operationId: scan
*      tags: [Products]
*      requestBody:
*          required: true
*          content:
*            multipart/form-data:
*              schema:
*                type: object
*                properties:
*                  file:
*                    type: string
*                    format: binary
*      responses:
*          200:
*              description: Return product information on success
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
*                          message: Scan success
*                          result:
*                              {
*                                  "id": 43,
*                                  "userId": "cm4897z3s00001lt4waq19i4q",
*                                  "product": {
*                                    "id": 12,
*                                    "code": "6957303864508",
*                                    "name": "Supa Jelly",
*                                    "image": "https://images.openfoodfacts.org/images/products/899/600/160/0146/SUPAJELLY.jpg",
*                                    "category": "Cincau Xtra",
*                                    "amountOfSugar": 5
*                                  },
*                                  "productId": 12,
*                                  "createdAt": "2024-12-07T07:49:45.395Z"
*                              }
*/

/**
 * @swagger
 * /api/products/{productId}:
 *   parameters:
 *   - in: path
 *     name: productId
 *     schema:
 *       type: integer
 *     required: true
 *     description: Id of product to get
 * 
 *   get:
 *      security:
 *      - bearerAuth: []
 *      summary: Returns a product by its id
 *      operationId: get
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Return specified products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: boolean
 *                                  message:
 *                                      type: string
 *                                  result:
 *                      example:
 *                          error: false
 *                          message: product retrieved successfully
 *                          result:
 *                              - data:
 *                                  id: 3
 *                                  code: "8886008101053"
 *                                  name: aqua btl - Danone - 600 ml
 *                                  image: https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg
 *                                  category: Natural mineral waters
 *                                  amountOfSugar: 0
 * 
 *   delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Delete a product by its id
 *      operationId: remove
 *      tags: [Products]
 *      responses:
 *          200:
 *              description:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: boolean
 *                                  message:
 *                                      type: string
 *                                  result:
 *                      example:
 *                          error: false
 *                          message: product deleted successfully
 * 
 */