export abstract class Marketplace {
    abstract search(queryParams: string): Promise<any>;
}
