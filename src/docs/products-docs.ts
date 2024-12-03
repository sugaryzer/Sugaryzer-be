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
 *  examples:
 *      tehPucuk:
 *          value: 
 *              id: 4
 *              code: "8996001600146"
 *              name: tehPucuk Melati - mayora - 350 ml
 *              image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *              category: Tea-based beverages
 *              amountOfSugar: 18
 *      aqua:
 *          value:
 *              id: 3
 *              code: "8886008101053"
 *              name: aqua btl - Danone - 600 ml
 *              image: https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg
 *              category: Natural mineral waters
 *              amountOfSugar: 0
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
 *                          $ref: '#/components/schemas/Product'
 *                      examples:
 *                          tehPucuk:
 *                              $ref: '#/components/examples/tehPucuk'
 *                                  
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
 *                          $ref: '#/components/schemas/Product'
 *                      example:
 *                          id: 4
 *                          name: tehPucuk Melati - mayora - 350 ml UPDATED
 *                          image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                          category: Tea-based beverages
 *                          amountOfSugar: 18
 * 
 *   get:
 *      security:
 *      - bearerAuth: []
 *      summary: Returns all products
 *      operationId: getAll
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Return list of products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *                      example:
 *                          - id: 3
 *                            code: "8886008101053"
 *                            name: aqua btl - Danone - 600 ml
 *                            image: https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg
 *                            category: Natural mineral waters
 *                            amountOfSugar: 0
 *                          - id: 4
 *                            code: "8996001600146"
 *                            name: tehPucuk Melati - mayora - 350 ml
 *                            image: https://images.openfoodfacts.org/images/products/899/600/160/0146/front_id.21.400.jpg
 *                            category: Tea-based beverages
 *                            amountOfSugar: 18
 * 
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
 *                          $ref: '#/components/schemas/Product'
 *                      examples:
 *                          tehPucuk:
 *                              $ref: '#/components/examples/tehPucuk'
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
 *                          deleteResponse:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: string
 *                      example:
 *                          data: Product deleted
 * 
 */