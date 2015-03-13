/// <reference path="location.ts" />
/// <reference path="licenses.ts" />
module Models.Management.Configuration {
    export class Store {
        Id: number;
        Name: string;
        Description: string;
        Address: string;
        Location: Location;
        Licenses: Licenses[];
    }
}