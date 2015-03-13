TestHelpers.InitalizeTestContext();
var validStoreId: number = 49720;
var validSkip: number = 0;
var validTake: number = 1000;
var validUri: string = "/management/configuration/store/" + validStoreId;
var valilUriForFetchingListStore: string = "/management/configuration/stores?skip=" + validSkip + "&take=" + validTake;

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

describe('StoreClient.delete', () => {
    it("Should hit correct url", () => {
        TestHelpers.RequestUriTest($, validUri);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.delete(validStoreId, suc => { }, err => { });
    });

    it("Should use correct http method", () => {
        TestHelpers.RequestHttpMethodTest($, "Delete");
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.delete(validStoreId, suc => { }, err => { });
    });

    it("Should use correct http headers", () => {
        TestHelpers.RequestHttpHeadersTest($);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.delete(validStoreId, suc => { }, err => { });
    });

    it("Should raise exception with invalid parameters", () => {
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();

        expect(() => { testClient.delete(-1, suc => { }, err => { }) })
            .toThrow(new Error("storeId could not be less than 0."));
    });

});

describe('StoreClient.getList', () => {

    it("Should hit correct url", () => {
        TestHelpers.RequestUriTest($, valilUriForFetchingListStore);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.getList(validSkip, validTake, suc => { }, err => { });
    });

    it("Should use correct http method", () => {
        TestHelpers.RequestHttpMethodTest($, "Get");
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.getList(validSkip, validTake, suc => { }, err => { });
    });

    it("Should use correct http headers", () => {
        TestHelpers.RequestHttpHeadersTest($);
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.getList(validSkip, validTake, suc => { }, err => { });
    });

    it("Should raise exception with invalid parameters", () => {
        var testClient = new Xomni.Management.Configuration.Store.StoreClient();

        expect(() => { testClient.getList(-5, 1, suc => { }, err => { }) })
            .toThrow(new Error("skip is greater than or equal 0."));

        expect(() => { testClient.getList(5, 0, suc => { }, err => { }) })
            .toThrow(new Error("take is greater than or equal to 1."));

    });

    it("Should parse response successfully", () => {
        TestHelpers.ResponseParseTest($,
            [
                {
                    "Results": [
                        {
                            "Id": 1004,
                            "Name": "Relationed Store",
                            "Description": "The Description",
                            "Address": "Adres",
                            "Location": {
                                "Longitude": 23.54,
                                "Latitude": 35.41
                            },
                            "Licenses": [
                                {
                                    "Id": 4,
                                    "Username": "SampleLicenceUsername",
                                    "Name": "Sample Licence",
                                    "Password": "123",
                                    "StoreId": 1004
                                }
                            ]
                        },
                        {
                            "Id": 1011,
                            "Name": "New Store",
                            "Description": "Description of New Store",
                            "Address": "Adres",
                            "Location": {
                                "Longitude": 37.65,
                                "Latitude": 23.41
                            },
                            "Licenses": []
                        }
                    ],
                    "TotalCount": 6
                }
            ]);

        var expectedSuccess = (list: Models.PaginatedContainer<Models.Management.Configuration.Store>) => {
            expect(list.Results.length).toEqual(1);
            expect(list.TotalCount).toEqual(6);
            expect(list.Results[0]).toEqual(1004);
            expect(list.Results[0].Name).toEqual("Relationed Store");
            expect(list.Results[0].Description).toEqual("The Description");
            expect(list.Results[0].Address).toEqual("Adres");
            expect(list.Results[0].Location.Longitude).toEqual(23.54);
            expect(list.Results[0].Location.Latitude).toEqual(35.41);
            expect(list.Results[0].Licenses[0].Id).toEqual(4);
            expect(list.Results[0].Licenses[0].Username).toEqual("SampleLicenceUsername");
            expect(list.Results[0].Licenses[0].Name).toEqual("Sample Licence");
            expect(list.Results[0].Licenses[0].Password).toEqual("123");
            expect(list.Results[0].Licenses[0].StoreId).toEqual(1004);
        };

        var testClient = new Xomni.Management.Configuration.Store.StoreClient();
        testClient.getList(validSkip, validTake, expectedSuccess, err => { });
    });
});