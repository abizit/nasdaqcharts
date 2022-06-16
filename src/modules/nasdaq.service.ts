interface Options {
    baseURL: string;
}

export class NasdaqService {
    private _baseURL: string = "https://data.nasdaq.com/api/v3/datasets/WIKI/";

    constructor() {
    }

    async _fetchAPI(endpoint: string) {
        const res = await fetch(this._baseURL + endpoint + '/data.json?api_key=-vvbvunv-Nvs3zq8PctX');
        if (!res.ok) throw new Error(res.statusText);

        if (res.status !== 204) return res.json();
    }

}
