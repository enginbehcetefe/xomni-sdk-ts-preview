/// <reference path="../../models/management/configuration/store.ts" />
/// <reference path="../../xomni.ts" />
module Xomni.Management.Configuration.Store {
    export class StoreClient extends BaseClient {
        private fetchingStoreUri: string = "/management/configuration/store/{storeId}";
        private deletingStoreUri: string = "/management/configuration/store/{storeId}";
        private fetchingListUri: string = "/management/configuration/stores?skip={skip}&take={take}";

        get(storeId: number, success: (result: Models.Management.Configuration.Store[]) => void, error: (error: any) => void) {
            this.ValidateParameter(storeId);
            var uri = this.PrepareUri(this.fetchingStoreUri, storeId);
            this.httpProvider.get(uri, success, error);
        }

        delete(storeId: number, success: (result: Models.Management.Configuration.Store[]) => void, error: (error: any) => void) {
            this.ValidateParameter(storeId);
            var uri = this.PrepareUri(this.deletingStoreUri, storeId);
            this.httpProvider.delete(uri, success, error);
        }

        getList(skip: number, take: number, success: (result: Models.PaginatedContainer<Models.Management.Configuration.Store>) => void, error: (error: any) => void) {
            this.ValidateParameters(skip, take);
            var uri = this.PrepareSecondUri(this.fetchingListUri, skip, take);
        }

        private ValidateParameter(storeId: number) {
            if (storeId && storeId < 0) {
                throw new Error("storeId could not be less than 0.")
            }
        }

        private ValidateParameters(skip?: number, take?: number): void {
            if (!skip) {
                throw new Error("skip could not be null or empty.");
            }
            if (skip < 0)
            {
                throw new Error("skip is greater than or equal 0.");
            }

            if (!take)
            {
                throw new Error("take could not be null or empty.");
            }
            if (take < 0) {
                throw new Error("take is greater than or equal 0.");
            }
        }

        private PrepareUri(baseUri: string, storeId: number): string {
            var uri = baseUri.replace("{storeId}", storeId.toString());
            return uri;
        }

        private PrepareSecondUri(baseUri: string, skip: number, take: number): string {
            var uri = baseUri.replace("{skip}", skip.toString());
            var uri = baseUri.replace("{take}", take.toString());
            return uri;
        }
    }
}