import { UserProfile } from "@prisma/client";

export type UserProfileResponse = {
    name: string;
    image?: string | null;
    height: number;
    weight: number;
    age: number;
}

export type UpdateUserProfileRequest = {
    id: number;
    userId: string;
    name?: string;
    image?: string;
    height?: number;
    weight?: number;
    age?: number;
}

export function transformUserProfileResponse(userProfile: UserProfile): UserProfileResponse{
    return {
        name: userProfile.name,
        image: userProfile.image,
        height: userProfile.height,
        weight: userProfile.weight,
        age: userProfile.age
    }
}