from pydantic import BaseModel

class Model(BaseModel):
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