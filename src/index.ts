import "./styles.css";
import {NasdaqService} from "./modules/index";


class NasDaqCharts {
    nasdaqService: NasdaqService;
    inputBox: HTMLFormElement;

    constructor() {
        this.nasdaqService = new NasdaqService();
        this.inputBox = document.getElementById('scrip') as HTMLFormElement;
    }

    async searchScrip() {
        const data = await this.getData(this.inputBox.value)
        console.log(data)
    }

    async getData(scrip: string) {
        return await this.nasdaqService._fetchAPI(scrip)
    }

}

const nasdaqcharts = new NasDaqCharts()
const form = document.getElementById('scripSearch');
const searchSubmit = (event: Event) => {
    event.preventDefault();
    nasdaqcharts.searchScrip().then()
}
form.addEventListener('submit', searchSubmit);

