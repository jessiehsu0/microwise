# This file is meant to take user-entered data and store it in a .py file to be used as input in Logistic Regression model
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.json
    process_data(data)
    return jsonify({"message": "Data received successfully"})

def process_data(data):
    age = data['age']
    income = data['income']
    savings = data['savings']
    expenses = data['expenses']


if __name__ == '__main__':
    app.run(debug=True)
