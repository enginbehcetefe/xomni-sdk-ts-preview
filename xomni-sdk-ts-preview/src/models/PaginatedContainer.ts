module Models {
    export class PaginatedContainer<T>{
        Results: Array<T>;
        TotalCount: number;
    }
}