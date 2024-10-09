"use server";

import { Model } from "@/types/model";
import { ServerActionsResponse } from "@/types/server-actions";

export const getHotModels = async (): Promise<ServerActionsResponse<Model[], string>> => {
    try {
        const response = await fetch(`${process.env.API_URL}/models/category/Pulmão`, {cache: "no-store"});
        const responseJson = await response.json();

        if("error_code" in responseJson){
            return {error: "Algo deu errado. Tente novamente."};
        }
    
        return {success: responseJson} 
    } catch (error) {
        return {error: "Algo deu errado. Tente novamente."};
    }
};