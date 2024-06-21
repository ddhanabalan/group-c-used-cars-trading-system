from flask import request
import pandas as pd
import xgboost as xgb
import pickle

from . import generate_id, milesmartServer, mainDatabase

loaded_model = pickle.load(open("MilesmartServer/price_prediction.pickle.dat", "rb"))
enc =  pickle.load(open("MilesmartServer/encoder.pkl", "rb"))

feature_names = ["region", "year", "manufacturer", "model", "condition", "cylinders", "fuel", "odometer", "title_status", "transmission", "drive", "type", "paint_color", "state", "lat", "long"]

def predict(features):
	# Create a Pandas DataFrame to ensure correct feature order
	categorical_cols=['region','manufacturer','model','condition','cylinders','fuel','title_status','transmission','drive','type','paint_color', 'state']
	
	# Define the correct feature names (matching your training data)
	df = pd.DataFrame([features], columns=feature_names)
	df[categorical_cols] = enc.transform(df[categorical_cols])


	# from sklearn import preprocessing
	df['year'] = df['year'].astype(int)
	df['odometer'] = df['odometer'].astype(int)
	df['lat'] = df['lat'].astype(float)
	df['long'] = df['long'].astype(float)

	y_pred = loaded_model.predict(xgb.DMatrix(df))
	prediction = y_pred[0]

	prediction *= 1000
	return prediction

@milesmartServer.route('/ml/price', methods=['POST'])
def predict_price():
	if not request.is_json: return { 'error': 'BAD_REQUEST', 'message': 'Request must contain a json body' }, 400
	
	features = []

	features_dict = request.json
	for feature in feature_names:
		features.append(features_dict[feature] if feature in features_dict else None)

	predicted_price = predict(features)

	return { 'price': float(predicted_price) }
