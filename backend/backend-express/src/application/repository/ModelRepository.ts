import Model from "../../domain/Model";

export default interface ModelRepository{
    saveModel(model: Model): Promise<void>;
    getModel(modelId: string): Promise<Model>;
}
