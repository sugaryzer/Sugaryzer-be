/**
 * @swagger
 *  tags:
 *      name: UserProfiles
 */
/**
 * @swagger
 * /api/users/current/user-profile:
 * 
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get current user profile
 *      operationId: get-current-user-profile
 *      tags: [UserProfiles]
 * 
 *      responses:
 *          200:
 *              description: Return the user on success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  name:
 *                                      type: string
 *                                      description: name of the current user
 *                                  image:
 *                                      type: string
 *                                      description: image of the current user
 *                                  height:
 *                                      type: string
 *                                      description: height of the current user
 *                                  weight:
 *                                      type: string
 *                                      description: weight of the current user
 *                                  age:
 *                                      type: string
 *                                      description: age of the current user
 *                      example:
 *                          data:
 *                              name: renaldy permana
 *                              image: http://storagebucket.com/image.jpg
 *                              height: 175
 *                              weight: 65
 *                              age: 20
 */

/**
 * @swagger
 * /api/users/current/user-profile:
 * 
 *  patch:
 *      security:
 *      - bearerAuth: []
 *      summary: Update user profile
 *      operationId: update-user-profile
 *      tags: [UserProfiles]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: new name value of the current user
 *                          image:
 *                              type: string
 *                              description: new image value of the current user
 *                          height:
 *                              type: string
 *                              description: new height value of the current user
 *                          weight:
 *                              type: string
 *                              description: new weight value of the current user
 *                          age:
 *                              type: string
 *                              description: new age value of the current user
 *                  example:
 *                      name: renaldy
 *                      image: http://storagebucket.com/image2.jpg
 *                      height: 177
 *                      weight: 63
 *                      age: 21
 *      responses:
 *          200:
 *              description: Return the user on success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  name:
 *                                      type: string
 *                                      description: updated name of the current user
 *                                  image:
 *                                      type: string
 *                                      description: updated image of the current user
 *                                  height:
 *                                      type: string
 *                                      description: updated height of the current user
 *                                  weight:
 *                                      type: string
 *                                      description: updated weight of the current user
 *                                  age:
 *                                      type: string
 *                                      description: updated age of the current user
 * 
 *                      example:
 *                          data:
 *                              name: renaldy
 *                              image: http://storagebucket.com/image2.jpg
 *                              height: 177
 *                              weight: 63
 *                              age: 21
 */