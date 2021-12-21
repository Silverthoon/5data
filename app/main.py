from pyspark.sql import SparkSession
from pyspark.sql.functions import col,date_format
from pyspark.sql import SQLContext

def init_spark():
  sql = SparkSession.builder\
    .appName("trip-app")\
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1")\
    .config("spark.mongodb.input.uri", "mongodb://root:example@localhost:27017/5data.students") \
    .config("spark.mongodb.output.uri", "mongodb://root:example@localhost:27017/5data.spark") \
    .getOrCreate()
  sc = sql.sparkContext
  return sql,sc



sql, sc = init_spark()
sqlContext = SQLContext(sc)

df = sql.read.format("com.mongodb.spark.sql.DefaultSource").option("uri","mongodb://root:example@localhost:27017/5data.students?authSource=admin").load()
df.printSchema()



df.createOrReplaceTempView("students")

result_data=sqlContext.sql("SELECT COUNT(*), admission_year from students GROUP BY admission_year")
result_data.write.format("mongo")\
  .option("uri","mongodb://root:example@localhost:27017/5data.spark?authSource=admin")\
  .mode("append").save()

