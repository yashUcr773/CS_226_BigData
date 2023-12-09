import os
import requests
from flask import Flask, jsonify, request, render_template, send_from_directory
from pyspark.sql import SparkSession
from io import BytesIO
import zipfile
from pyspark.sql import SparkSession

# # Initialize Spark session
spark = SparkSession.builder \
    .appName("AirBNB") \
    .getOrCreate()

app = Flask(__name__)


# URL to your hosted zip file
zip_file_url = "https://d1u36hdvoy9y69.cloudfront.net/cs-226-big-data/parquet_data.zip"

# Temporary directory to extract the zip file
temp_dir = "/tmp/parquet_data_temp"

# Ensure the temporary directory exists
os.makedirs(temp_dir, exist_ok=True)

print ('extracting')
# Download and extract the zip file
response = requests.get(zip_file_url)
with zipfile.ZipFile(BytesIO(response.content), 'r') as zip_ref:
    print ('extracting111')
    zip_ref.extractall(temp_dir)

# Path to the extracted Parquet data
parquet_path = os.path.join(temp_dir, "parquet_data")

# Read Parquet files into a DataFrame
parquet_data = spark.read.parquet(parquet_path)

# Create a temporary view for the DataFrame
parquet_data.createOrReplaceTempView('parquet_data_view')

# Serve Angular app
@app.route('/')
def serve_angular_app():
    return send_from_directory('dist/airbnb_final_project', 'index.html')
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('dist/airbnb_final_project', path)

@app.route('/query', methods=['POST'])
def execute_query():
    data = request.get_json()
    query = data.get('query')

    # Correct table name to use the temporary view name
    query = query.replace("parquet_data2", "parquet_data_view")

    try:
        # Execute Spark SQL query
        result = spark.sql(query)

        # Convert result to JSON
        result_json = result.toJSON().collect()

        return jsonify(result_json)

    except Exception as e:
        # Handle any exceptions and return an error message
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
