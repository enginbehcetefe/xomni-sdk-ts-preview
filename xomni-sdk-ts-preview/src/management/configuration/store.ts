/// <reference path="../../models/management/configuration/store.ts" />
/// <reference path="../../xomni.ts" />
module Xomni.Management.Configuration.Store {
    export class StoreClient extends BaseClient {
        private fetchingStoreUri: string = "/management/configuration/store/{storeId}";

        get(storeId: number, success: (result: Models.Management.Configuration.Store[]) => void, error: (error: any) => void) {
            this.ValidateParameter(storeId);
            var uri = this.PrepareUri(this.fetchingStoreUri, storeId);
            this.httpProvider.get(uri, success, error);
        }

        private ValidateParameter(storeId: number) {
            if (storeId && storeId < 0) {
                throw new Error("storeId could not be less than 0.")
            }
        }

        private PrepareUri(baseUri: string, storeId: number): string {
            var uri = baseUri.replace("{storeId}", storeId.toString());
            return uri;
        }
    }
}