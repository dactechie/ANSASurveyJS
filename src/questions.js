export default {
  title: "ANSA Initial Assessment",
  pages: [
   {
    name: "demographics",
    elements: [
     {
      type: "matrixdropdown",
      name: "clientName",
      title: "Client name",
      columns: [
       {
        name: "Firstname",
        title: "First name",
        cellType: "text",
        isRequired: true,
        width: "20",
        maxLength: 20
       },
       {
        name: "Surname",
        title: "Surname",
        cellType: "text",
        isRequired: true,
        width: "20",
        maxLength: 20
       },
       {
        name: "Gender",
        title: "Gender",
        cellType: "dropdown"
       },
       {
        name: "DOB",
        title: "Date of birth",
        validators: [
         {
          type: "regex",
          text: "Please check the date format. Correct format: d/m/yyyy.  '-' and '.' are acceptable separators",
          regex: "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"
         }
        ]
       }
      ],
      choices: [
       {
        value: "m",
        text: "Male"
       },
       {
        value: "f",
        text: "Female"
       },
       {
        value: "o",
        text: "Other"
       }
      ],
      cellType: "text",
      rows: [
       "Identity"
      ]
     },
     {
      type: "matrixdropdown",
      name: "question2",
      title: "Your Directions / Pathways Details",
      columns: [
       {
        name: "team",
        title: "Team",
        cellType: "dropdown",
        choices: [
         {
          value: "eurobodalla",
          text: "Eurobodalla"
         },
         {
          value: "monaro",
          text: "Monaro"
         },
         {
          value: "bega",
          text: "Bega"
         },
         {
          value: "tss",
          text: "TSS"
         }
        ]
       },
       {
        name: "staff",
        title: "Staff",
        cellType: "dropdown"
       }
      ],
      choices: [
       {
        value: 1,
        text: "Glenda",
        visibleIf: "{question2.r1.team} = \"eurobodalla\""
       },
       {
        value: 2,
        text: "Jacinta",
        visibleIf: "{question2.r1.team} = \"eurobodalla\""
       },
       {
        value: 3,
        text: "Vic",
        visibleIf: "{question2.r1.team} = \"eurobodalla\""
       },
       {
        value: 4,
        text: "Tracy",
        visibleIf: "{question2.r1.team} = \"eurobodalla\""
       },
       {
        value: 5,
        text: "Aaron",
        visibleIf: "{question2.r1.team} = \"monaro\""
       },
       {
        value: "6",
        text: "Belinda",
        visibleIf: "{question2.r1.team} = \"monaro\""
       },
       {
        value: "7",
        text: "Michelle",
        visibleIf: "{question2.r1.team} = \"bega\""
       },
       {
        value: "9",
        text: "Corrina",
        visibleIf: "{question2.r1.team} = \"tss\""
       },
       {
        value: "8",
        text: "MJ",
        visibleIf: "{question2.r1.team} = \"tss\""
       }
      ],
      rows: [
       {
        value: "r1",
        text: "Your contact"
       }
      ]
     }
    ],
    title: "Demographics"
   },
   {
    name: "substance_use",
    elements: [
     {
      type: "matrixdropdown",
      name: "pdcmthd",
      title: "Principal Substance of Concern and Method of Use",
      columns: [
       {
        name: "pdc",
        title: "PDC"
       },
       {
        name: "method",
        title: "Method of Use",
        choices: [
         {
          value: "ingests",
          text: "Ingests"
         },
         {
          value: "injects",
          text: "Injects"
         }
        ]
       },
       {
        name: "pdc_ndays",
        title: "How many days in the last 4 weeks",
        cellType: "text",
        requiredIf: "{pdcmthd.pdcdeets.pdc} empty",
        validators: [
         {
          type: "numeric",
          minValue: 0,
          maxValue: 28
         }
        ],
        placeHolder: "0",
        inputType: "number"
       }
      ],
      choices: [
       {
        value: 1,
        text: "Alcohol"
       },
       {
        value: 2,
        text: "Nicotine"
       },
       {
        value: 3,
        text: "Methamphetamines"
       },
       {
        value: 4,
        text: "Cocaine"
       },
       {
        value: 5,
        text: "Opoids"
       }
      ],
      rows: [
       {
        value: "pdcdeets",
        text: "Principal substance details"
       }
      ]
     },
     {
      type: "matrixdynamic",
      name: "other_drugs",
      title: "Other Substances of concern",
      columns: [
       {
        name: "odc",
        title: "Other Drug Type",
        choices: [
         {
          value: "alcohol",
          text: "Alcohol"
         },
         {
          value: "nicotine",
          text: "Nicotine"
         },
         {
          value: "mickey",
          text: "Mickey White Horse"
         }
        ]
       },
       {
        name: "odc_mthd",
        title: "Method of Use"
       },
       {
        name: "odc_ndays",
        title: "How many days in the last 4 weeks"
       }
      ],
      choices: [
       {
        value: 1,
        text: "Alcohol"
       },
       {
        value: 2,
        text: "two"
       },
       {
        value: 3,
        text: "three"
       },
       {
        value: 4,
        text: "four"
       },
       {
        value: 5,
        text: "five"
       }
      ],
      rowCount: 1
     },
     {
      type: "matrixdynamic",
      name: "aod_history",
      title: "AOD History",
      columns: [
       {
        name: "drug",
        title: "Drug Type",
        choices: [
         {
          value: "alcohol",
          text: "Alcohol"
         },
         {
          value: "nicotine",
          text: "Nicotine"
         },
         {
          value: "mickey",
          text: "Mickey White Horse"
         }
        ]
       },
       {
        name: "agefirstused",
        title: "Age of First Use",
        choices: [
         {
          value: "age9",
          text: "9"
         },
         {
          value: "age10",
          text: "10"
         },
         {
          value: "age11",
          text: "11"
         },
         {
          value: "age12",
          text: "12"
         },
         {
          value: "age13",
          text: "13"
         }
        ]
       },
       {
        name: "methd",
        title: "Method of Use",
        choices: [
         {
          value: "ingest",
          text: "Ingest"
         },
         {
          value: "smoke",
          text: "Smoke"
         },
         {
          value: "inject",
          text: "Inject"
         }
        ]
       },
       {
        name: "Units",
        title: "Units",
        choices: [
         {
          value: "std_drinks",
          text: "Standard drinks"
         },
         {
          value: "joints",
          text: "Joints"
         }
        ]
       },
       {
        name: "frequency",
        title: "How Often?",
        choices: [
         {
          value: "daily",
          text: "Daily"
         },
         {
          value: "weekly",
          text: "Weekly"
         },
         {
          value: "irregular",
          text: "Irregular Binges"
         },
         {
          value: "notusing",
          text: "Not Using Anymore"
         }
        ]
       },
       {
        name: "qtyperday",
        title: "How much per day?",
        cellType: "text",
        width: "100",
        inputType: "range"
       }
      ],
      choices: [
       1,
       2,
       3,
       4,
       5
      ],
      rowCount: 1
     }
    ],
    title: "Substance Use"
   },
   {
    name: "impact",
    elements: [
     {
      type: "checkbox",
      name: "aod_harms_risks",
      title: "AOD Harms  / Risks",
      description: "In the last 4 weeks, have you experienced any of the following risks?",
      hasOther: true,
      choices: [
       {
        value: "memloss",
        text: "Memory Loss"
       },
       {
        value: "usealone",
        text: "Using Alone"
       },
       {
        value: "morethanonedrug",
        text: "Using more than one drug at a time"
       },
       {
        value: "violence",
        text: "Violence / Assault"
       }
      ],
      otherText: "Other / Notes"
     },
     {
      type: "matrixdropdown",
      name: "addctv",
      title: "Did you engage in any other addictive behaviours in the last 4 weeks?",
      columns: [
       {
        name: "ndays",
        title: "Number of days",
        cellType: "text",
        width: "28",
        validators: [
         {
          type: "numeric",
          minValue: 0,
          maxValue: 28
         }
        ],
        placeHolder: "0",
        inputType: "range"
       }
      ],
      choices: [
       {
        value: 1,
        text: "dfg"
       },
       {
        value: 2,
        text: "555"
       },
       3,
       {
        value: 4,
        text: "gg"
       },
       {
        value: 5,
        text: "ddgfd"
       }
      ],
      columnMinWidth: "500",
      rows: [
       {
        value: "sex",
        text: "Sex"
       },
       {
        value: "internet",
        text: "Internet"
       }
      ]
     },
     {
      type: "rating",
      name: "impctdaily",
      startWithNewLine: false,
      title: "# Impact on Daily Living",
      description: "# Impact on Daily Living \nDuring the last 4 weeks, how often has your substance use (or other addictive behaviour) impacted on your work or other daily living activities (like: social, recreational. study, caring for family)?",
      rateValues: [
       {
        value: "0",
        text: "Not at all"
       },
       {
        value: "1",
        text: "Less than weekly"
       },
       {
        value: "2",
        text: "Once or twice a week"
       },
       {
        value: "3",
        text: "Three or four times a week"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ],
      rateMin: 3,
      rateMax: 4,
      minRateDescription: "Not at all",
      maxRateDescription: "Daily or almost daily"
     }
    ],
    title: "Impact of Substance Use"
   }
  ],
  showNavigationButtons: "both",
  showPageNumbers: true,
  showProgressBar: "top"
 };
