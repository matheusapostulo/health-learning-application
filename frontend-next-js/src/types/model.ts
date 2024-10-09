export enum typeParameter {
    Number = "number",
    String = "string",
    Boolean = "boolean"
}

export type Parameter = {
    name: string;
    type: typeParameter;
}

export interface Model {
    id: string;
    modelName: string;
    category: string;
    description: string;
    accuracy: number;
    parameters: Parameter[];
    favoritedBy: string[];
    favoritesCount: number;
    createdAt: Date;
    updatedAt?: Date;
}