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

function actual(arrivalProm, admissionYear, actualYear) {
  return;
}
function generate_identity(max) {
  let firstName,
    lastName,
    email,
    number,
    emails = [],
    numbers = [],
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
    actualYear = 2021,
    person = [],
    i = 0;
  console.log(dropRate);
  while (i < max) {
    console.log(i);
    // if zero in bracket, gonna provide male name faker.name.some_methode()
    firstName = faker.name.firstName(0);
    lastName = faker.name.lastName();
    email = faker.internet
      .email(firstName, lastName, "supinfo.com")
      .toLowerCase();
    possible_numbers = [
      faker.phone.phoneNumber("06 ## ## ## ##"),
      faker.phone.phoneNumber("07 ## ## ## ##"),
    ];
    number =
      possible_numbers[Math.floor(Math.random() * possible_numbers.length)];
    birthYear = randomIntFromInterval(1980, 2003);
    admissionYear = randomIntFromInterval(birthYear + 17, 2021);

    arrivalProm = arrival(birthYear, admissionYear);
    graduationYear = 6 - arrivalProm + admissionYear;
    dropped = abandon < dropRate ? true : false;
    graduated = !dropped && 2022 > graduationYear ? true : false;
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

    if (emails.includes(email) == false && numbers.includes(number) == false) {
      emails.push(email);
      person.push({
        id: i,
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
        country: countries[Math.floor(Math.random() * countries.length)],
        birth_year: birthYear,
        admission_year: admissionYear,
        arrival_prom: arrivalProm,
        graduation_year: graduationYear,
        dropped: dropped,
        dropped_prom: droppedProm,
        graduated: graduated, //add smtg about droped
        actual_prom: actualProm,
        attendances: randomIntFromInterval(50, 100),
      });
      abandon++;
      i++;
    }
  }
  return person;
}

let data = generate_identity(100);
//console.log(data);

fs.writeFile("./data.json", data, (err) => {
  if (err) throw err;
});

console.dir(data, { maxArrayLength: null });

//console.log(generate_identity(process.argv[2]), { maxArrayLength: null });
//console.log("end");
//console.log(generate_identity(process.argv[2]), { maxArrayLength: null });
