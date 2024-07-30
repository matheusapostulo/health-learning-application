import Model from "../../domain/Model";

export default interface DatabaseConnection{
    create(model: Model): Promise<any>;
    close(): Promise<void>;
    findUnique(modelId: string): Promise<any>;
    findByCategory(category: string): Promise<any>;
}
