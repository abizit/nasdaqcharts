import "./styles.css";
import {NasdaqService} from "./modules/index";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);


class NasDaqCharts {
    nasdaqService: NasdaqService;
    inputBox: HTMLFormElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.nasdaqService = new NasdaqService();
        this.inputBox = document.getElementById('scrip') as HTMLFormElement;
        this.canvas = document.getElementById('myChart') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
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

