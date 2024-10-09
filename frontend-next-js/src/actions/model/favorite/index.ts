"use server";

export const favoriteModel = async (modelId: string, userId: string, tokenUser: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${userId}/favorites/${modelId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenUser}`
            },
            body: JSON.stringify({ modelId, userId })
        })

        const responseJson = await response.json();

        if('error_code' in responseJson){
            console.log(responseJson);
            return {error: responseJson.error_description};
        }
    
        return {success: responseJson.message}; 
    } catch (error) {
        return {error: "Algo deu errado. Tente novamente."};
    }
    
}

export const unfavoriteModel = async (modelId: string, userId: string, tokenUser: string) => {
    try {
        const response = await fetch(`${process.env.API_URL}/users/${userId}/favorites/${modelId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenUser}`
            },
        })

        const responseJson = await response.json();

        if('error_code' in responseJson){
            console.log(responseJson);
            return {error: responseJson.error_description};
        }
    
        return {success: responseJson.message};
    } catch (error) {
        return {error: "Algo deu errado. Tente novamente."};
    }
    
    
}