/**
 * @swagger
 * components:
 *  schemas:
 *     Analysis:
 *       type: object
 *       properties:
 *         totalConsume:
 *           type: integer
 *           description: Total sugar consumption in a day
 *         userProfile:
 *           type: object
 *           description: Relation
 *         date:
 *          type: date
 *          description: date for analysis for the day
 *         createdAt:
 *           type: date
 *           description: Date created
 *         updatedAt:
 *           type: date
 *           description: Date updated
 *         
 *
 * @swagger
 *  tags:
 *    name: Analysis
 */

/**
 * @swagger
 * /api/users/current/analysis:
 * 
 *   get:
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Which page to show
 *        - in: query
 *          name: size
 *          schema:
 *            type: integer
 *          description: The numbers of items to return per page
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: Specify date to get analysis (choose either with date or daily_sugar_intake)
 *        - in: query
 *          name: daily_sugar_intake
 *          schema:
 *            type: int
 *          description: Send daily intake to ML server (choose either with date or daily_sugar_intake)
 *      security:
 *      - bearerAuth: []
 *      summary: Return all current users analysis
 *      operationId: get
 *      tags: [Analysis]
 *      responses:
 *          200:
 *              description: List of analyses
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
 *                          {
 *                            "error": false,
 *                            "message": "Analyses retrieved successfully",
 *                            "result": {
 *                              "data": [
 *                                {
 *                                  "userProfile": {
 *                                    "name": "renaldy permana"
 *                                  },
 *                                  "totalConsume": 50,
 *                                  "userId": "cm4897z3s00001lt4waq19i4q",
 *                                  "date": "2024-12-05T00:00:00.000Z"
 *                                },
 *                                {
 *                                  "userProfile": {
 *                                    "name": "renaldy permana"
 *                                  },
 *                                  "totalConsume": 100,
 *                                  "userId": "cm4897z3s00001lt4waq19i4q",
 *                                  "date": "2024-12-06T00:00:00.000Z"
 *                                },
 *                                {
 *                                  "userProfile": {
 *                                    "name": "renaldy permana"
 *                                  },
 *                                  "totalConsume": 20,
 *                                  "userId": "cm4897z3s00001lt4waq19i4q",
 *                                  "date": "2024-12-07T08:20:23.472Z"
 *                                }
 *                              ],
 *                              "paging": {
 *                                "size": 3,
 *                                "total_page": 1,
 *                                "current_page": 1
 *                              }
 *                            }
 *                          }
 *   post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create data required for analysis of current user, date is optional(default is today/now), db has composite key of (userId,date), does not accept when date has duplicate
 *      operationId: create
 *      tags: [Analysis]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      types: object
 *                      properties:
 *                          totalConsume:
 *                              type: integer
 *                          date:
 *                              type: string
 *                  examples:
 *                      First:
 *                          value:
 *                              totalConsume: 0
 *                      Second:
 *                          value:
 *                              totalConsume: 5
 *                              date: "2024-12-07"
 *      responses:
 *          200:
 *              description: Return the created data
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
 *                          {
 *                            "error": false,
 *                            "message": "Analysis created successfully",
 *                            "result": {
 *                              "userProfile": {
 *                                "name": "renaldy permana"
 *                              },
 *                              "totalConsume": 0,
 *                              "userId": "cm4897z3s00001lt4waq19i4q",
 *                              "date": "2024-12-07T08:51:51.105Z"
 *                            }
 *                          }
 * 
 *   patch:
 *      security:
 *      - bearerAuth: []
 *      summary: Update data required for analysis of current user, date is required to specify
 *      operationId: update
 *      tags: [Analysis]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      types: object
 *                      properties:
 *                          totalConsume:
 *                              type: integer
 *                          date:
 *                              type: string
 *                  examples:
 *                      First:
 *                          value:
 *                              totalConsume: 7
 *                              currentDate: "2024-12-05"
 *                              newDate: "2024-12-06"
 *                      Second:
 *                          value:
 *                              totalConsume: 2
 *      responses:
 *          200:
 *              description: Return the updated data
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
 *                          {
 *                            "error": false,
 *                            "message": "Analysis created successfully",
 *                            "result": {
 *                              "userProfile": {
 *                                "name": "renaldy permana"
 *                              },
 *                              "totalConsume": 0,
 *                              "userId": "cm4897z3s00001lt4waq19i4q",
 *                              "date": "2024-12-07T08:51:51.105Z"
 *                            }
 *                          }
 *                                  
 * 
 */

/**
 * @swagger
 * /api/users/current/analysis/{date}:
 * 
 *   delete:
 *      parameters:
 *          - in: path
 *            name: date
 *            schema:
 *              type: string
 *            required: true
 *            description: Date of analysis that needs to be deleted (example:2024-12-06)
 *      security:
 *      - bearerAuth: []
 *      summary: Delete an analysis
 *      operationId: remove
 *      tags: [Analysis]
 *      responses:
 *          200:
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
 */ 