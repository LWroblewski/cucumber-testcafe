import { Market } from '../../model/market.model';

export namespace MarketActions {
    export class LoadMarkets {
        static readonly type = '[MARKET] LoadMarkets';
    }

    export class LoadMarketsSuccess {
        static readonly type = '[MARKET] LoadMarketsSuccess';
        constructor(public markets: Market[]) {}
    }

    export class LoadMarketsFailed {
        static type = '[MARKET] LoadMarketsFailed';
        constructor(public error: Error) {}
    }

    export class GetMarketDetail {
        static readonly type = '[MARKET] GetMarketDetail';
        constructor(public marketId: string) {}
    }

    export class GetMarketDetailSuccess {
        static readonly type = '[MARKET] GetMarketDetailSuccess';
        constructor(public market: Market) {}
    }

    export class GetMarketDetailFailed {
        static type = '[MARKET] GetMarketDetailFailed';
        constructor(public error: Error) {}
    }
}
