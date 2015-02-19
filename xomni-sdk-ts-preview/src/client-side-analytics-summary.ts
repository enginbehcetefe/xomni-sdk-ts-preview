/// <reference path="core.ts" />
module Xomni.Private.Analytics.ClientSideAnalyticsSummary {
    export class ClientSideAnalyticsLogSummaryClient extends BaseClient {
        private weeklyLogSummaryUri: string = '/private/analytics/clientcounters/{counterName}/summary/weekly?';
        private dailyLogSummaryUri: string = '/private/analytics/clientcounters/{counterName}/summary/daily?';
        private monthlyLogSummaryUri: string = '/private/analytics/clientcounters/{counterName}/summary/monthly?';
        private yearlyLogSummaryUri: string = '/private/analytics/clientcounters/{counterName}/summary/yearly?';

        getDailyLogs(counterName: string, startOADate: number, endOADate: number, success: (result: DailyCountSummary[]) => void, error: (error: any) => void) {
            this.ValidateParameters(counterName, startOADate, endOADate);
            var uri = this.PrepareUri(this.dailyLogSummaryUri, counterName, startOADate, endOADate);
            this.httpProvider.get(uri, success, error);
        }

        getWeeklyLogs(counterName: string, startOADate: number, endOADate: number, success: (result: WeeklyCountSummary[]) => void, error: (error: any) => void) {
            this.ValidateParameters(counterName, startOADate, endOADate);
            var uri = this.PrepareUri(this.weeklyLogSummaryUri, counterName, startOADate, endOADate);
            this.httpProvider.get(uri, success, error);
        }

        getMonthlyLogs(counterName: string, startOADate: number, endOADate: number, success: (result: MonthlyCountSummary[]) => void, error: (error: any) => void) {
            this.ValidateParameters(counterName, startOADate, endOADate);
            var uri = this.PrepareUri(this.monthlyLogSummaryUri, counterName, startOADate, endOADate);
            this.httpProvider.get(uri, success, error);
        }

        getYearlyLogs(counterName: string, startOADate: number, endOADate: number, success: (result: YearlyCountSummary[]) => void, error: (error: any) => void) {
            this.ValidateParameters(counterName, startOADate, endOADate);
            var uri = this.PrepareUri(this.yearlyLogSummaryUri, counterName, startOADate, endOADate);
            this.httpProvider.get(uri, success, error);
        }

        private PrepareUri(baseUri: string, counterName: string, startOADate: number, endOADate: number): string {
            var uri = baseUri.replace("{counterName}", counterName);
            return uri + "startOADate=" + startOADate + "&endOADate=" + endOADate;
        }

        private ValidateParameters(counterName: string, startOADate: number, endOADate: number) : void {
            if (!counterName) {
                throw new Error("counterName could not be null or empty");
            }

            if (startOADate < 1 ) {
                throw new Error("startOADate could not be less than 1");
            }

            if (endOADate < 1) {
                throw new Error("endOADate could not be less than 1");
            }

            if (endOADate < startOADate) {
                throw new Error("startOADate could not be greater than endOADate");
            }
        }
    }

    export interface BaseAnalyticsCountSummary {
        TotalCount: number;
    }

    export interface YearlyCountSummary extends BaseAnalyticsCountSummary {
        Year: number;
    }

    export interface MonthlyCountSummary extends YearlyCountSummary {
        Month: number;
    }

    export interface WeeklyCountSummary extends MonthlyCountSummary {
        WeekOfYear: number;
    }

    export interface DailyCountSummary extends WeeklyCountSummary {
        Day: number;
    }
}
