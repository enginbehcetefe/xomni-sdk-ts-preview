/// <chutzpah_reference path="../../src/client-counters.ts" />
/// <chutzpah_reference path="../../definitions/jasmine/jasmine.d.ts" />
/// <chutzpah_reference path="../../definitions/jquery/jquery.d.ts" />
/// <chutzpah_reference path="../test-helpers.ts" />

describe('ClientContext fixture', () => {
    it("Should raise exception with invalid parameters. - username", () => {
        expect(() => {
            new Xomni.ClientContext(null, "p", "s")
            })
            .toThrow(new Error("username could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext("", "p", "s")
            })
            .toThrow(new Error("username could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext(undefined, "p", "s")
            })
            .toThrow(new Error("username could not be null or empty."));
    });

    it("Should raise exception with invalid parameters. - password", () => {
        expect(() => {
            new Xomni.ClientContext("u", null, "s")
            })
            .toThrow(new Error("password could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext("u", "", "s")
            })
            .toThrow(new Error("password could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext("u", undefined, "s")
            })
            .toThrow(new Error("password could not be null or empty."));
    });

    it("Should raise exception with invalid parameters. - serviceUri", () => {
        expect(() => {
            new Xomni.ClientContext("u", "p", null)
            })
            .toThrow(new Error("serviceUri could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext("u", "p", "")
            })
            .toThrow(new Error("serviceUri could not be null or empty."));

        expect(() => {
            new Xomni.ClientContext("u", "p", undefined)
            })
            .toThrow(new Error("serviceUri could not be null or empty."));
    });

    it("Should intialize correctly with valid parameters.", () => {
        var testContext = new Xomni.ClientContext("u", "p", "s");
        expect(testContext.username).toBe("u");
        expect(testContext.password).toBe("p");
        expect(testContext.serviceUri).toBe("s");
    });
});

describe('currenctContext fixture', () => {
    it("Should intialize correctly with valid parameters.", () => {
        TestHelpers.InitalizeTestContext();
        expect(Xomni.currentContext.username).toBe("u");
        expect(Xomni.currentContext.password).toBe("p");
        expect(Xomni.currentContext.serviceUri).toBe("s");
    });
});

describe('HttpProvider fixture', () => {
    it("Should initalize correctly with correct parameters", () => {
        var httpProvider = new Xomni.HttpProvider();
        TestHelpers.InitalizeTestContext();
        var returnedCurrentContext = httpProvider.getCurrentClientContext();

        expect(Xomni.currentContext.username).toEqual(returnedCurrentContext.username);
        expect(Xomni.currentContext.password).toEqual(returnedCurrentContext.password);
        expect(Xomni.currentContext.serviceUri).toEqual(returnedCurrentContext.serviceUri);
    });
});


describe('HttpProvider.get fixture', () => {
    it("Should hit correct url", () => {
        TestHelpers.InitalizeTestContext();
        var httpProvider = new Xomni.HttpProvider();
        TestHelpers.RequestUriTest($, "test");
        httpProvider.get("test", suc => { }, err => { });
    });

    it("Should use correct http method", () => {
        TestHelpers.InitalizeTestContext();
        var httpProvider = new Xomni.HttpProvider();
        TestHelpers.RequestHttpMethodTest($, "Get");
        httpProvider.get("", suc => { }, err => { });
    });

    it("Should use correct http headers", () => {
        TestHelpers.InitalizeTestContext();
        var httpProvider = new Xomni.HttpProvider();
        TestHelpers.RequestHttpHeadersTest($);
        httpProvider.get("", suc => { }, err => { });
    });
});