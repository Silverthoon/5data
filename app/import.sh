#! /bin/bash

mongoimport --db 5data --collection campus --authenticationDatabase admin --username root --password example --file /samples/campus.json --jsonArray

mongoimport --db 5data --collection students --authenticationDatabase admin --username root --password example --file /samples/students.json --jsonArray
