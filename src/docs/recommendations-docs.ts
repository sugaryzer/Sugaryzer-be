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
 * 
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
 *                          error: false
 *                          message: products retrieved successfully
 *                          result:
 *                              - data:
 *                                - altProduct:
 *                                    id: 6
 *                                    code: "8886008101053"
 *                                    name: "aqua btl - Danone - 600 ml"
 *                                    image: "https://images.openfoodfacts.org/images/products/888/600/810/1053/front_en.18.400.jpg"
 *                                    category: "Natural mineral waters"
 *                                    amountOfSugar: 0
 *                                  productId: 4
 *                                  altProductId: 6
 *                                  sugarDifference: -18
 *                                - altProduct:
 *                                    id: 7
 *                                    code: "1234567890123"
 *                                    name: "example product"
 *                                    image: "https://example.com/image.jpg"
 *                                    category: "Soft drinks"
 *                                    amountOfSugar: 10
 *                                  productId: 4
 *                                  altProductId: 7
 *                                  sugarDifference: -8
 *                                paging:
 *                                    size: 10
 *                                    total_page: 1
 *                                    current_page: 1
 *                                  
 * 
 */
