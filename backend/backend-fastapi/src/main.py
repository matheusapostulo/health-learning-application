from fastapi import FastAPI
from src.domain.LungCancerModel import LungCancerModel
from src.domain.LungCancerModel import LungCancerDTO
import uvicorn

app = FastAPI()

@app.get("/")
def hello():
    return {"Hello": "World"}   

@app.post("/predict/lung-cancer")
def predict_lung_cancer(data: LungCancerDTO):
    lung_cancer_model = LungCancerModel(data, "src/ml_models/lung_cancer.joblib")
    predicition = lung_cancer_model.prediction()

    return {
        "prediction": predicition
    }

# if __name__ == '__main__':
#     uvicorn.run(app, host='127.0.0.1', port=4000)