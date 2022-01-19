export interface Hcert {
  v: [VaccinationGroup];
  dob: string; // date of birth; ISO date string; e.g. '1985-05-16'
  nam: Name;
}

export interface VaccinationGroup {
  dt: string; // date of vaccination; ISO date string; e.g. '2021-10-19'
  mp: string; // name of product (vaccine); code of vaccine-medicinal-product.json
}

export interface Name {
  fn: string; // last name
  gn: string // first name(s)
}

/* EXAMPE STRUCTURE:
{
    "v": [{
            "ci": "urn:uvci:01:CH:8AED7719EEAD001FB3BDFBB2",
            "co": "CH",
            "dn": 2,
            "dt": "2021-10-19",
            "is": "Bundesamt für Gesundheit (BAG)",
            "ma": "ORG-100031184",
            "mp": "EU/1/20/1507",
            "sd": 2,
            "tg": "840539006",
            "vp": "1119349007"
        }
    ],
    "dob": "1985-05-16",
    "nam": {
        "fn": "Doe",
        "gn": "John Adam",
        "fnt": "DOE",
        "gnt": "John<Adam"
    },
    "ver": "1.3.0"
}
 */
