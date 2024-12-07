import { prismaClient } from "../lib/db";
import { AnalysisCreateRequest, AnalysisGetAllRequest, AnalysisUpdateRequest } from "../model/analysis-model";

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
    
    static async countAnalyses(){
        return await prismaClient.analysis.count()
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

    static async create(totalConsume: number, userId: string, date: string){
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

    static async update(request: AnalysisUpdateRequest, userId: string){
        return await prismaClient.analysis.update({
            where: {
                id: {
                    date: request.currentDate,
                    userId,
                }
            },
            data: {
                totalConsume: request.totalConsume,
                date: request.date,
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
}