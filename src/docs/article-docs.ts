/**
 * @swagger
 *  tags:
 *      name: Articles
 */

/**
 * @swagger
 * /api/articles/:
 * 
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get articles
 *      operationId: get-articles
 *      tags: [Articles]
 *      responses:
 *          200:
 *              description: Return the user on success
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
 *                                      id:
 *                                          type: integer
 *                                          description: id of the article
 *                                      title:
 *                                          type: string
 *                                          description: title of the article
 *                                      description:
 *                                          type: string
 *                                          description: description of the article
 *                                      image:
 *                                          type: string
 *                                          description: image of the article
 *                                      source:
 *                                          type: string
 *                                          description: source of the article
 * 
 *                      example:
 *                          error: false
 *                          message: get all articles successfully
 *                          result:
 *                          - id: 1
 *                            title: Konsumsi Gula Berlebih, Waspadai Risikonya
 *                            description: Direktur Jenderal Pencegahan dan Pengendalian Penyakit, Kemenkes dr. Maxi Rein Rondonuwu mengatakan konsumsi gula berlebih, baik dari makanan atau minuman berisiko tinggi menyebabkan masalah kesehatan seperti gula darah tinggi, obesitas, dan diabetes melitus
 *                            image: http://sehatnegeriku.kemkes.go.id/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-27-at-12.58.03.jpeg
 *                            source: https://kemkes.go.id/id/rilis-kesehatan/konsumsi-gula-berlebih-waspadai-risikonya#:~:text=Direktur%20Jenderal%20Pencegahan%20dan%20Pengendalian%20Penyakit%2C%20Kemenkes%20dr.,seperti%20gula%20darah%20tinggi%2C%20obesitas%2C%20dan%20diabetes%20melitus.
 *
 */
/**
 * @swagger
 * /api/articles/{articleId}:
 *  parameters:
 *  - in: path
 *    name: articleId
 *    type: integer
 *    required: true
 * 
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get an article
 *      operationId: get-an-article
 *      tags: [Articles]
 *      responses:
 *          200:
 *              description: Return the user on success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: boolean
 *                              messaage:
 *                                  type: string
 *                              result:
 *                                  id:
 *                                      type: integer
 *                                      description: id of the article
 *                                  title:
 *                                      type: string
 *                                      description: title of the article
 *                                  description:
 *                                      type: string
 *                                      description: description of the article
 *                                  image:
 *                                      type: string
 *                                      description: image of the article
 *                                  source:
 *                                      type: string
 *                                      description: source of the article
 * 
 *                      example:
 *                          error: false
 *                          message: get an article successfully
 *                          data:
 *                              id: 1
 *                              title: Konsumsi Gula Berlebih, Waspadai Risikonya
 *                              description: Direktur Jenderal Pencegahan dan Pengendalian Penyakit, Kemenkes dr. Maxi Rein Rondonuwu mengatakan konsumsi gula berlebih, baik dari makanan atau minuman berisiko tinggi menyebabkan masalah kesehatan seperti gula darah tinggi, obesitas, dan diabetes melitus
 *                              image: http://sehatnegeriku.kemkes.go.id/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-27-at-12.58.03.jpeg
 *                              source: https://kemkes.go.id/id/rilis-kesehatan/konsumsi-gula-berlebih-waspadai-risikonya#:~:text=Direktur%20Jenderal%20Pencegahan%20dan%20Pengendalian%20Penyakit%2C%20Kemenkes%20dr.,seperti%20gula%20darah%20tinggi%2C%20obesitas%2C%20dan%20diabetes%20melitus.
 *
 */