const faker = require("faker");
const fs = require("fs");
faker.locale = "fr";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arrival(birthYear, admissionYear) {
  if (admissionYear - birthYear > 23) {
    return randomIntFromInterval(4, 5);
  } else if (admissionYear - birthYear > 18) {
    return 3;
  } else {
    return 1;
  }
}

//id count
let count = 1;

// create identity records
function generate_identity(max, gender) {
  let firstName,
    lastName,
    email,
    number,
    emails = [],
    countries = [
      "France",
      "Allemagne",
      "Belgique",
      "Italie",
      "Espagne",
      "Portugal",
      "Benin",
      "Togo",
      "Côte d'Ivoire",
      "Senegal",
      "Mali",
      "Niger",
      "Burkina Faso",
      "Cameroun",
      "Guinée",
      "Tchad",
      "Algerie",
      "Maroc",
      "Tunisie",
    ],
    fields = [
      "Cloud",
      "Network",
      "IT Support",
      "Data",
      "IT Analyst",
      "Leadership",
      "Security",
      "Development",
    ],
    birthYear,
    admissionYear,
    arrivalProm,
    actualProm, //0 if dropped , 1-5 if still at school, 6 if graduated
    graduationYear,
    abandon = 0,
    dropRate = max * (randomIntFromInterval(1, 4) / 10),
    dropped,
    droppedProm,
    graduated,
    internship,
    successfullness,
    hired,
    field,
    monthsBfrJob,
    campus,
    actualYear = 2021,
    person = [],
    i = 0;

  //print how many dropped per gender
  while (i < max) {
    console.log(count);
    // if zero in bracket, gonna provide male name faker.name.some_methode()
    firstName = faker.name.firstName(gender);
    lastName = faker.name.lastName();

    // generate fake and unique mail adresses using supinfo domain name
    do {
      email = faker.internet
        .email(firstName, lastName, "supinfo.com")
        .toLowerCase();
    } while (emails.includes(email));

    //records of all emails
    emails.push(email);
    // generate two phone numbers 06 and 07
    possible_numbers = [
      faker.phone.phoneNumber("06 ## ## ## ##"),
      faker.phone.phoneNumber("07 ## ## ## ##"),
    ];

    // choose randomly between 06 and 07
    number =
      possible_numbers[Math.floor(Math.random() * possible_numbers.length)];

    birthYear = randomIntFromInterval(1980, 2003);
    admissionYear = randomIntFromInterval(birthYear + 17, 2021);

    arrivalProm = arrival(birthYear, admissionYear);
    graduationYear = 6 - arrivalProm + admissionYear;
    dropped = abandon < dropRate;
    graduated = !dropped && 2022 > graduationYear;
    actualProm = dropped
      ? null
      : !graduated
      ? arrivalProm + (actualYear - admissionYear)
      : null;
    droppedProm = dropped
      ? faker.datatype.number({
          min: arrivalProm,
          max: graduationYear - admissionYear + arrivalProm - 1,
        })
      : null;
    internship = dropped
      ? droppedProm - arrivalProm
      : graduated
      ? graduationYear - admissionYear
      : actualProm - arrivalProm;
    successfullness =
      dropped || graduated
        ? null
        : randomIntFromInterval(60, 70) * (actualProm - 1) +
          randomIntFromInterval(0, 60);

    hired = graduated && randomIntFromInterval(0, 1, 2) != 0;
    field = hired ? fields[Math.floor(Math.random() * fields.length)] : null;
    monthsBfrJob = hired ? randomIntFromInterval(0, 24) : null;

    //we check first if emails are unique
    if (true) {
      emails.push(email);
      person.push({
        id: count,
        firstName: firstName,
        lastName: lastName,
        gender: gender ? "Female" : "Male",
        email: email,
        number: number,
        country: countries[Math.floor(Math.random() * countries.length)],
        birth_year: birthYear,
        admission_year: admissionYear,
        campus: randomIntFromInterval(1, 16),
        arrival_prom: arrivalProm,
        graduation_year: graduationYear,
        dropped: dropped,
        dropped_prom: droppedProm,
        graduated: graduated, //add smtg about droped
        actual_prom: actualProm,
        internship: internship,
        successfullness: successfullness,
        attendances: randomIntFromInterval(50, 100),
        status: {
          hired: hired,
          field: field,
          monthsBfrJob: monthsBfrJob,
        },
      });
      abandon++;
      i++;
    }
    count++;
  }
  //monitoring dropRate
  /*
  console.log(
    !gender
      ? Math.floor(dropRate + 1) + " male(s) dropped school over " + max
      : Math.floor(dropRate + 1) + " female(s) dropped school over " + max
  );
  */
  return person;
}

let quantity = process.argv[2]; // how many unique person do you want ?
let male_students = JSON.stringify(
  generate_identity(quantity * 0.8, 0),
  undefined,
  2 // pretty print
);
let female_students = JSON.stringify(
  generate_identity(quantity * 0.2, 1),
  undefined,
  2 // pretty print
);

// concat males and females data
let data = male_students.concat(female_students);

// write person' data into a json file
fs.writeFile("./students.json", data, "utf8", (err) => {
  if (err) throw err;
});
/*
//uncomment the following lines to generate campus dict


//create campus records
function generate_campus() {
  let towns = [
      "Dakar",
      "Casablanca",
      "Tours",
      "Lille",
      "Nantes",
      "Angers",
      "Paris",
      "Marseille",
      "Bruxelles",
      "Londres",
      "Caen",
      "Metz",
      "Clermont-Ferrand",
      "Rouen",
      "Strasbourg",
      "Lyon",
    ],
    campus = [];

  for (let i = 0; i < towns.length; i++) {
    campus.push({
      id: i + 1,
      title: towns[i],
      facilities: randomIntFromInterval(5, 10),
    });
  }
  return campus;
}

campus = JSON.stringify(generate_campus(), undefined, 2);

//write dict containing campus in a json file
fs.writeFile("./campus.json", campus, "utf8", (err) => {
  if (err) throw err;
});

*/
