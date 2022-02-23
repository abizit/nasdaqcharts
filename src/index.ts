import "./styles.css";
import {NasdaqService} from "./modules/index";
import {Chart, registerables} from "chart.js";
import {ChartData, Dataset, DatasetData} from "./interfaces/interfaces";

Chart.register(...registerables);


class NasDaqCharts {
    nasdaqService: NasdaqService;
    inputBox: HTMLFormElement;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    dataset: DatasetData
    chartData: ChartData[] = [];
    scripChart: Chart;

    constructor() {
        this.nasdaqService = new NasdaqService();
        this.inputBox = document.getElementById('scrip') as HTMLFormElement;
        this.canvas = document.getElementById('myChart') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

    }

    async searchScrip() {
        const data = await this.getData(this.inputBox.value)
        this.dataset = data.dataset_data;
        this.formatData()
    }

    async getData(scrip: string): Promise<Dataset> {
        return await this.nasdaqService._fetchAPI(scrip)
    }

    private formatData() {
        for (const data of this.dataset.data) {
            let dayData: ChartData = {
                date: data[0],
                open: data[1],
                high: data[2],
                low: data[3],
                close: data[4]
            }
            this.chartData = [...this.chartData, dayData]
        }
        this.renderChart();
    }

    private renderChart() {
        let columns: string[] = [],
            daydata: number[] = [];
        for (const day of this.chartData) {
            columns = [...columns, day.date];
            daydata = [...daydata, day.close]
        }
        if (this.scripChart) {
            this.scripChart.destroy()
        }
        this.scripChart = new Chart(this.context, {
            type: 'line',
            data: {
                labels: columns,
                datasets: [{
                    label: 'Close Price $',
                    data: daydata
                }]
            }
        })
    }

}

const nasdaqcharts = new NasDaqCharts()
const form = document.getElementById('scripSearch');
const searchSubmit = (event: Event) => {
    event.preventDefault();
    nasdaqcharts.searchScrip().then()
}
form.addEventListener('submit', searchSubmit);

