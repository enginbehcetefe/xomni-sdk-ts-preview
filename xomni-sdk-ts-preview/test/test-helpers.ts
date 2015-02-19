module TestHelpers {
    export function RequestUriTest($: any, expectedUrl: string) {
        spyOn($, "ajax")
            .and
            .callFake(params => {
                expect(params.url).toContain(expectedUrl);
            });
    }

    export function RequestHttpMethodTest($: any, expectedMethod: string) {
        spyOn($, "ajax")
            .and
            .callFake(params => {
                expect(params.type).toContain(expectedMethod);
            });
    }

    export function RequestHttpHeadersTest($: any, expectedHeaders: any = {
        "Authorization": "Basic " + btoa(Xomni.currentContext.username + ":" + Xomni.currentContext.password),
        "Accept": "application/vnd.xomni.api-v3_0, */*"
    }) {
        spyOn($, "ajax")
            .and
            .callFake(params => {
                expect(params.headers).toEqual(expectedHeaders);
            });
    }

    export function InitalizeTestContext() {
        Xomni.currentContext = new Xomni.ClientContext("u", "p", "s");
    }

    export function ResponseParseTest($: any, expectedResponseJson: any) {
        spyOn($, "ajax")
            .and
            .callFake(p => {
                p.success(expectedResponseJson, null, null);
            });
    }
}