import Model from "../../domain/Model";

export default interface ModelRepository{
    saveModel(model: Model): Promise<void>;
    getModel(id: string): Promise<Model>;
}
