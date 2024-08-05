export default interface DatabaseConnection{
    create(entity: any): Promise<any>;
    findUnique(paramToFind: string, entity: string): Promise<any>;
    findModelByCategory(category: string): Promise<any>;
    close(): Promise<void>;
}
