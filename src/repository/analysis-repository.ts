import { prismaClient } from "../lib/db";
import { AnalysisGetAllRequest } from "../model/analysis-model";
import request from "superagent";

export class AnalysisRepository {

    static async findAnalyses(data: AnalysisGetAllRequest, userId: string){
        const skip = (data.page - 1) * data.size;
        return await prismaClient.analysis.findMany({
            take: data.size,
            skip: skip,
            where: {
                userId,
            },
            include: {
                userProfile: {
                    select: {
                        name: true
                    },
                },
            },
        } )
    }
    
    static async countAnalyses(userId: string){
        return await prismaClient.analysis.count({
            where:{
                userId
            }
        })
    }
    
    static async findAnalysisByDate(date: string, userId: string){
        return await prismaClient.analysis.findUnique({
            where: {
                id: {
                    date,
                    userId,
                }
            },
            include: {
                userProfile: {
                    select: {
                        name: true
                    },
                },
            },
        })
    }

    static async create(totalConsume: number, userId: string, date?: string){
        return await prismaClient.analysis.create({
            data: {
                userId,
                totalConsume,
                date,
            },
            include: {
                userProfile: {
                    select: {
                        name: true
                    },
                },
            },
        });
    }

    static async update(totalConsume: number, currentDate: string, userId: string, newDate?: string){
        return await prismaClient.analysis.update({
            where: {
                id: {
                    date: currentDate,
                    userId,
                }
            },
            data: {
                totalConsume: totalConsume,
                date: newDate,
            },
            include: {
                userProfile: {
                    select: {
                        name: true
                    },
                },
            },
        });
    }

    static async delete(date: string, userId: string){
        return await prismaClient.analysis.delete({
            where: {
                id: {
                    date,
                    userId,
                }
            }
        });
    }

    static async mlAnalysis(dailySugar: number){
        try {
            const response = await request.post(`${process.env.ML_URL}/predict`)
            .send({ daily_sugar_intake: dailySugar });
            return response.body
        } catch (error) {
            console.error(error);
        }
    }
}