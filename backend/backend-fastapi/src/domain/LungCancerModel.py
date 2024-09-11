from src.domain.AbstractModel import AbstractModel
from pydantic import BaseModel

class LungCancerModel(AbstractModel):
    def __init__(self, data: object, model_path: str):
        data = data.model_dump()
        self.gender = data['gender']
        self.age = data['age']
        self.smoker = data['smoker']
        self.yellow_fingers = data['yellow_fingers']
        self.anxiety = data['anxiety']
        self.peer_pressure = data['peer_pressure']
        self.chronic_disease = data['chronic_disease']
        self.fatigue = data['fatigue']
        self.allergy = data['allergy']
        self.wheezing = data['wheezing']
        self.alcohol_consume = data['alcohol_consume']
        self.coughing = data['coughing']
        self.shortness_of_breath = data['shortness_of_breath']
        self.swallowing_difficulty = data['swallowing_difficulty']
        self.chest_pain = data['chest_pain']
        super().__init__(model_path)

    def convertPrediction(self, int_predicition):
        map_parameters = {1: "NO", 2: "YES"}
        return map_parameters.get(int_predicition)

    def prediction(self) -> any:
        data = self.as_list()
        prediction = self.model.predict([data])
        int_prediction = int(prediction)
        converted_prediction = self.convertPrediction(int_prediction)
        return converted_prediction
        
class LungCancerDTO(BaseModel):
    gender: int
    age: int
    smoker: int
    yellow_fingers: int
    anxiety: int
    peer_pressure: int
    chronic_disease: int
    fatigue: int
    allergy: int
    wheezing: int
    alcohol_consume: int
    coughing: int
    shortness_of_breath: int
    swallowing_difficulty: int
    chest_pain: int