from typing import Union
from fastapi import FastAPI
import joblib
from Model import Model
import uvicorn

joblib_in = open("models/model_lung.joblib","rb")
model=joblib.load(joblib_in)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/predict")
def predict_lung_cancer(data: Model):
    print(data)
    data = data.model_dump()
    gender = data['gender']
    age = data['age']
    smoker = data['smoker']
    yellow_fingers = data['yellow_fingers']
    anxiety = data['anxiety']
    peer_pressure = data['peer_pressure']
    chronic_disease = data['chronic_disease']
    fatigue = data['fatigue']
    allergy = data['allergy']
    wheezing = data['wheezing']
    alcohol_consume = data['alcohol_consume']
    coughing = data['coughing']
    shortness_of_breath = data['shortness_of_breath']
    swallowing_difficulty = data['swallowing_difficulty']
    chest_pain = data['chest_pain']
    
    
    prediction = model.predict([[gender, age, smoker, yellow_fingers, anxiety, peer_pressure, chronic_disease, fatigue, allergy, wheezing, alcohol_consume, coughing, shortness_of_breath, swallowing_difficulty, chest_pain]]) 

    predicition_value = int(prediction[0])

    return {
        "prediction": predicition_value
    }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)