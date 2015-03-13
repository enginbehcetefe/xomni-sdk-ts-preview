module Xomni {
    export class HttpProvider {
        get<T>(uri: string, success: (result: T) => void, error: (error: any) => void) {
            this.sendHttpRequest(HttpMethod.Get, uri, success, error);
        }

        delete<T>(uri: string, success: (result: T) => void, error: (error: any) => void) {
            this.sendHttpRequest(HttpMethod.Delete, uri, success, error);
        }

        put<T>(uri: string, data: any, success: (result: T) => void, error: (error: any) => void) {
            this.sendHttpRequest(HttpMethod.Put, uri, success, error, data);
        }

        private sendHttpRequest<T>(httpMethod: HttpMethod, uri: string, success: (result: T) => void, error: (error: any) => void, data?: any) {
            var currentClientContext = this.getCurrentClientContext();
            var authorization: string = currentClientContext.username + ":" + currentClientContext.password;
            $.ajax({
                type: HttpMethod[httpMethod],
                url: currentClientContext.serviceUri + uri,
                contentType: "application/json",
                data : data,
                headers: {
                    "Authorization": "Basic " + btoa(authorization),
                    "Accept": "application/vnd.xomni.api-v3_0, */*"
                },
                success: (d, t, s) => {
                    success(<T>d);
                },
                error: (r, t, e) => {
                    error(t);
                }
            });
        }

        getCurrentClientContext(): ClientContext {
            if (currentContext == null) {
                throw new Error("Client context could not be null.");
            }
            else {
                return currentContext;
            }
        }
    }

    enum HttpMethod {
        Get,
        Post,
        Put,
        Patch,
        Delete
    }
    export class BaseClient {
        httpProvider: HttpProvider = new HttpProvider();
    }
    export class ClientContext {
        constructor(public username: string, public password: string, public serviceUri: string) {
            if (!username) {
                throw new Error("username could not be null or empty.");
            }
            if (!password) {
                throw new Error("password could not be null or empty.");
            }
            if (!serviceUri) {
                throw new Error("serviceUri could not be null or empty.");
            }
        }
    }
    export var currentContext: ClientContext;
}