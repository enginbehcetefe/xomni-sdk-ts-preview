/// <chutzpah_reference path="../../src/client-counters.ts" />
/// <chutzpah_reference path="../../definitions/jasmine/jasmine.d.ts" />
/// <chutzpah_reference path="../../definitions/jquery/jquery.d.ts" />
/// <chutzpah_reference path="../test-helpers.ts" />

TestHelpers.InitalizeTestContext();

describe('ClientCounterClient.getClientCounterList', () => {
    it("Should hit correct url", () => {
        TestHelpers.RequestUriTest($, "private/analytics/clientcounters");
        var testClient = new Xomni.Private.Analytics.ClientCounters.ClientCounterClient();
        testClient.getClientCounterList(suc => { }, err => { });
    });

    it("Should use correct http method", () => {
        TestHelpers.RequestHttpMethodTest($, "Get");
        var testClient = new Xomni.Private.Analytics.ClientCounters.ClientCounterClient();
        testClient.getClientCounterList(suc => { }, err => { });

    });

    it("Should use correct http headers", () => {
        TestHelpers.RequestHttpHeadersTest($);

        var testClient = new Xomni.Private.Analytics.ClientCounters.ClientCounterClient();
        testClient.getClientCounterList(suc => { }, err => { });
    });

    it("Should parse response successfully", () => {
        TestHelpers.ResponseParseTest($, {
                    "ContinuationToken": "adqweqwlkasd12312dkslk",
                    "CounterNames": [
                        "categoryClicked",
                        "itemClicked",
                        "brandClicked"
                    ]
                });
        
        var expectedSuccess = (counters: Xomni.Private.Analytics.ClientCounters.ClientCounterListContainer) => {
            expect(counters.ContinuationToken).toEqual("adqweqwlkasd12312dkslk");
            expect(counters.CounterNames.length).toEqual(3);
            expect(counters.CounterNames[0]).toEqual("categoryClicked");
            expect(counters.CounterNames[1]).toEqual("itemClicked");
            expect(counters.CounterNames[2]).toEqual("brandClicked");
        };

        var testClient = new Xomni.Private.Analytics.ClientCounters.ClientCounterClient();
        testClient.getClientCounterList(expectedSuccess, err => { });
    });
});