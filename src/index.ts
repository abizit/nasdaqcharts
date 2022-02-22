import "./styles.css";
import {NasdaqService} from "./modules/index";

const nasdaqClient = new NasdaqService()

const app = async () => {
    const data = await nasdaqClient._fetchAPI('AAPL')
    console.log(data)
}
app().then(
    () => console.log('APP LOADED')
)
