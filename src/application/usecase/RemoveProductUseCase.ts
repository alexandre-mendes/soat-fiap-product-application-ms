export interface RemoveProductUseCase {
    execute(id: string): Promise<void>;
}