TestHelpers.InitalizeTestContext();
var validStoreId: number = 49720;
var validUri: string = "/management/configuration/store/" + validStoreId;

describe('StoreClient.get', () => {

    it("Should hit correct url", () => {
        TestHelpers.RequestUriTest($, validUri);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.get(validStoreId, suc => { }, err => { });
    });

    it("Should use correct http method", () => {
        TestHelpers.RequestHttpMethodTest($, "Get");
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.get(validStoreId, suc => { }, err => { });
    });

    it("Should use correct http headers", () => {
        TestHelpers.RequestHttpHeadersTest($);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.get(validStoreId, suc => { }, err => { });
    });

    it("Should raise exception with invalid parameters", () => {
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        
        expect(() => { testClient.get(-1, suc => { }, err => { }) })
            .toThrow(new Error("storeId could not be less than 0."));
    });

    it("Should parse response successfully", () => {
        TestHelpers.ResponseParseTest($,
            [
                {
                    "Id": 1004,
                    "Name": "Relationed Store",
                    "Description": "The Description",
                    "Address": "Sample Data Address",
                    "Location": {
                        "Longitude": 23.54,
                        "Latitude": 35.41
                    },
                    "Licenses": [
                        {
                            "Id": 3,
                            "Username": "DebugApiManagementTestUser",
                            "Name": "Debug Management Api User",
                            "Password": "DebugApiManagementTestPass",
                            "StoreId": 1004
                        }
                    ]
                }
            ]);

        var expectedSuccess = (fetchingStore: Models.Management.Configuration.Store[]) => {
            expect(fetchingStore.length).toEqual(1);
            expect(fetchingStore[0].Id).toEqual(1004);
            expect(fetchingStore[0].Name).toEqual("Relationed Store");
            expect(fetchingStore[0].Description).toEqual("The Description");
            expect(fetchingStore[0].Address).toEqual("Sample Data Address");
            expect(fetchingStore[0].Location.Longitude).toEqual(23.54);
            expect(fetchingStore[0].Location.Latitude).toEqual(35.41);
            expect(fetchingStore[0].Licenses[0].Id).toEqual(3);
            expect(fetchingStore[0].Licenses[0].Username).toEqual("DebugApiManagementTestUser");
            expect(fetchingStore[0].Licenses[0].Name).toEqual("Debug Management Api User");
            expect(fetchingStore[0].Licenses[0].Password).toEqual("DebugApiManagementTestPass");
            expect(fetchingStore[0].Licenses[0].StoreId).toEqual(1004);
        };

        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.get(validStoreId, expectedSuccess, err => { });
    });
});



