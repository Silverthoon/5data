FROM mongo
RUN apt-get update && apt install nodejs -y
RUN apt install npm -y

COPY ./samples/students.json /students.json
COPY ./samples/campus.json /campus.json

CMD mongoimport --host mongo --db 5data --authenticationDatabase admin --username root --password example --collection campus  --file /campus.json --jsonArray && mongoimport --host mongo --db 5data --authenticationDatabase admin --username root --password example --collection students  --file /students.json --jsonArray

