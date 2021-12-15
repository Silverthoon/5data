from pyspark import SparkContext, SparkConf
from pyspark.sql import SQLContext
from pyspark.sql import SparkSession

conf = SparkConf().set("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1"). \
    setMaster("spark://localhost:7077")

sc = SparkContext(conf=conf)
sqlContext = SQLContext(sc)

spark = SparkSession.builder \
    .appName("5DATA-PROJECT") \
    .config("spark.mongodb.input.uri", "mongodb://root:example@localhost:27017/5data.students") \
    .config("spark.mongodb.output.uri", "mongodb://root:example@localhost:27017/5data.spark") \
    .getOrCreate()

df = spark.read.format("com.mongodb.spark.sql.DefaultSource").option("uri",
                                                                     "mongodb://root:example@localhost:27017/5data"
                                                                     ".students?authSource=admin").load()
# df.printSchema()


df.createOrReplaceTempView("students")

result_data = sqlContext.sql("SELECT COUNT(*), admission_year from students GROUP BY admission_year")
result_data.show()
