from abc import ABC, abstractmethod
import joblib

class AbstractModel(ABC):
    def __init__(self, model_path: str):
        joblib_in = open(model_path,"rb")
        model = joblib.load(joblib_in)
        self.model = model
    
    def as_list(self):
        attributes = vars(self)
        return [attributes[key] for key in attributes.keys() if key != 'model']
    
    @abstractmethod
    def prediction(self):
        pass

    @abstractmethod
    def convertPrediction(self):
        pass