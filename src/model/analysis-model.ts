export type AnalysisResponse = {
    userProfile: nameonly;
    totalConsume: number;
    userId: string;
    date: Date;
}

export type AnalysisCreateRequest = {
    totalConsume: number;
    date?: Date;
}

export type AnalysisUpdateRequest = {
    totalConsume: number;
    currentDate: Date;
    date?: Date;
}

export type AnalysisGetAllRequest = {
    page: number;
    size: number;
}

type nameonly = {
    name: string;
}

type AnalysiswithName = {
    userProfile: nameonly;
    totalConsume: number;
    userId: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function transformAnalysisResponse(analysis: AnalysiswithName): AnalysisResponse{
    return {
        userProfile: analysis.userProfile,
        totalConsume: analysis.totalConsume,
        userId: analysis.userId,
        date: analysis.date,
    }
}