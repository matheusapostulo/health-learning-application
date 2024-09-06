import ModelPredictionStrategy from "./ModelPredictionStrategy";
import axios from 'axios';
export default class LungCancerModelPredictionStrategy implements ModelPredictionStrategy {
    constructor(readonly modelAPIUrl: string){}
    
    async predict(): Promise<any> {
        // const data = {
        //     gender: 2,
        //     age: 69,
        //     smoker: 1,
        //     yellow_fingers: 2,
        //     anxiety: 2,
        //     peer_pressure: 1,
        //     chronic_disease: 1,
        //     fatigue: 2,
        //     allergy: 1,
        //     wheezing: 2,
        //     alcohol_consume: 2,
        //     coughing: 2,
        //     shortness_of_breath: 2,
        //     swallowing_difficulty: 2,
        //     chest_pain: 2
        // };
        // await axios.post("http://localhost:4000/predict/lung-cancer", data)
        // .then((res) => {
        //     return res.data;
        // });
        return 'Result';
    }
}