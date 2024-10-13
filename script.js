// script.js

// Data and Configuration Objects

// Mapping of countries to continents (used in the scatter plot)
const countryToContinentMap = {
  'Afghanistan': 'Asia',
  'Armenia': 'Asia',
  'Azerbaijan': 'Asia',
  'Bahrain': 'Asia',
  'Bangladesh': 'Asia',
  'Bhutan': 'Asia',
  'Brunei': 'Asia',
  'Cambodia': 'Asia',
  'China': 'Asia',
  'Cyprus': 'Asia',
  'Georgia': 'Asia',
  'India': 'Asia',
  'Indonesia': 'Asia',
  'Iran': 'Asia',
  'Iraq': 'Asia',
  'Israel': 'Asia',
  'Japan': 'Asia',
  'Jordan': 'Asia',
  'Kazakhstan': 'Asia',
  'Kuwait': 'Asia',
  'Kyrgyzstan': 'Asia',
  'Laos': 'Asia',
  'Lebanon': 'Asia',
  'Malaysia': 'Asia',
  'Maldives': 'Asia',
  'Mongolia': 'Asia',
  'Myanmar (Burma)': 'Asia',
  'Nepal': 'Asia',
  'North Korea': 'Asia',
  'Oman': 'Asia',
  'Pakistan': 'Asia',
  'Palestine': 'Asia',
  'Philippines': 'Asia',
  'Qatar': 'Asia',
  'Saudi Arabia': 'Asia',
  'Singapore': 'Asia',
  'South Korea': 'Asia',
  'Sri Lanka': 'Asia',
  'Syria': 'Asia',
  'Taiwan': 'Asia',
  'Tajikistan': 'Asia',
  'Thailand': 'Asia',
  'Timor-Leste': 'Asia',
  'Turkey': 'Asia',
  'Turkmenistan': 'Asia',
  'United Arab Emirates': 'Asia',
  'Uzbekistan': 'Asia',
  'Vietnam': 'Asia',
  'Yemen': 'Asia'
};

// Country Name Mapping
const countryNameMapping = {
  'Korea, South': 'South Korea',
  'Korea, North': 'North Korea',
  // Add other mappings if necessary
};

// List of countries to highlight and their colors
const highlightedCountries = {
  'China': '#d62728',        // Blue
  'India': '#ff7f0e',        // Orange
  'Japan': '#2ca02c',        // Green
  'South Korea': '#d4c60b', //yellow
  'Malaysia': '#9467bd',     // Purple
  'Singapore': '#8c564b',    // Brown
  'Thailand': '#e377c2'      // Pink
};


// Data for the age group chart
const ageGroupData = [
  { "id": "All Ages", "Patients": 1946133 }, // Root node without 'parent'
  { "id": "<18", "parent": "All Ages", "Patients": 289 },
  { "id": "18-19", "parent": "All Ages", "Patients": 225 },
  { "id": "20-24", "parent": "All Ages", "Patients": 1762 },
  { "id": "25-29", "parent": "All Ages", "Patients": 6977 },
  { "id": "30-34", "parent": "All Ages", "Patients": 18482 },
  { "id": "35-39", "parent": "All Ages", "Patients": 40386 },
  { "id": "40-44", "parent": "All Ages", "Patients": 68469 },
  { "id": "45-49", "parent": "All Ages", "Patients": 104111 },
  { "id": "50-54", "parent": "All Ages", "Patients": 154701 },
  { "id": "55-59", "parent": "All Ages", "Patients": 232261 },
  { "id": "60-64", "parent": "All Ages", "Patients": 296528 },
  { "id": "65-69", "parent": "All Ages", "Patients": 312533 },
  { "id": "70-74", "parent": "All Ages", "Patients": 274558 },
  { "id": "75-79", "parent": "All Ages", "Patients": 191869 },
  { "id": ">80", "parent": "All Ages", "Patients": 242982 }
];

// Metric details for the map visualization
const metricDetails = {
  "Diabetes Density (%)": {
    "title": "Diabetes Density (%) by Region",
    "description": "In Malaysia, diabetes prevalence varies significantly across regions. Perlis reports the highest rate, with over 12% of its population affected. States like Negeri Sembilan and Melaka also show concerning rates, exceeding 10%. The darker shades on the map represent areas with higher diabetes density, highlighting the need for targeted health interventions in these regions.",
    "domain": [2, 4, 6, 8, 10, 12],
    "dataURL": "https://raw.githubusercontent.com/zlim0052/project-2/main/Adjusted_Diabetes_Density_by_State.csv",
    "fields": ["Diabetes Density (%)"]
  },
  "Hypertension Prevalence (%)": {
    "title": "Hypertension Prevalence (%) by Region",
    "description": "This map shows the Hypertension Prevalence (%) by region in Malaysia. Darker colors indicate higher rates.",
    "domain": [70, 100],
    "dataURL": "https://raw.githubusercontent.com/zlim0052/project-2/main/malaysia_obesity_diabetes_data.csv",
    "fields": ["Hypertension Prevalence (%)"]
  },
  "Dyslipidemia Prevalence (%)": {
    "title": "Dyslipidemia Prevalence (%) by Region",
    "description": "This map shows the Dyslipidemia Prevalence (%) by region in Malaysia. Darker colors indicate higher rates.",
    "domain": [60, 100],
    "dataURL": "https://raw.githubusercontent.com/zlim0052/project-2/main/malaysia_obesity_diabetes_data.csv",
    "fields": ["Dyslipidemia Prevalence (%)"]
  }
};


const annotationData = [
  {
    "CountryName": "Pakistan",
    "Longitude": 69.3451,
    "Latitude": 30.3753,
    "LabelLongitude": 180,
    "LabelLatitude": 100,
    "label": "Highest Rate:\nPakistan"
  },
  {
    "CountryName": "Malaysia",
    "Longitude": 101.9758,
    "Latitude": 4.2105,
    "LabelLongitude": 100,
    "LabelLatitude": -50,
    "label": "Malaysia has one of the highest\n diabetes prevalence rates"
  }
];


const stateAnnotations = [
  {
    "State": "Perlis",
    "Longitude": 100.2263,
    "Latitude": 6.4440,
    "LabelLongitude": 101,
    "LabelLatitude": 6.5,
    "Label": "Highest Rate:\nPerlis"
  },
  {
    "State": "Negeri Sembilan",
    "Longitude": 102.2485,
    "Latitude": 2.7258,
    "LabelLongitude": 103,
    "LabelLatitude": 2.5,
    "Label": "Exceeds 10%:\nNegeri Sembilan"
  },
  {
    "State": "Melaka",
    "Longitude": 102.2501,
    "Latitude": 2.1896,
    "LabelLongitude": 103,
    "LabelLatitude": 1.8,
    "Label": "Exceeds 10%:\nMelaka"
  }
];



// Variables for Selections and Data
let selectedStates = [];
let scatterData = [];
let lineGraphData = [];

// Vega-Lite Specifications

// Global Map Specification
// Global Map Specification
const globalMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A map showing diabetes prevalence by country in 2021.",
  "width": "container",
  "height": "container",
  "projection": {
    "type": "equalEarth"
  },
  "layer": [
    // Ocean Layer
    {
      "data": {
        "url": "https://raw.githubusercontent.com/FIT3179/Vega-Lite/main/7_others/oceans.topojson",
        "format": { "type": "topojson", "feature": "oceans" }
      },
      "mark": { "type": "geoshape", "fill": "lightblue" }
    },
    // Base Map Layer
    {
      "data": {
        "url": "https://raw.githubusercontent.com/FIT3179/Vega-Lite/main/2_symbol_map/js/ne_110m_admin_0_countries.topojson",
        "format": {
          "type": "topojson",
          "feature": "ne_110m_admin_0_countries"
        }
      },
      "transform": [
        // Correct country names
        {
          "calculate": "datum.properties.NAME == 'United States of America' ? 'United States' : " +
                       "datum.properties.NAME == 'S. Sudan' || datum.properties.NAME == 'South Sudan' ? 'South Sudan' : " +
                       "datum.properties.NAME == 'Central African Rep.' ? 'Central African Republic' : " +
                       "datum.properties.NAME == 'Dem. Rep. Congo' ? 'Congo' : " +
                       "datum.properties.NAME == 'Côte d\\'Ivoire' ? 'Cote d\\'Ivoire' : " +
                       "datum.properties.NAME",
          "as": "CountryName"
        },
        {
          "lookup": "CountryName",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/diabetes-prevalence.csv"
            },
            "key": "Entity",
            "fields": ["Diabetes prevalence (% of population ages 20 to 79)"]
          }
        },
        {
          "filter": "datum['Diabetes prevalence (% of population ages 20 to 79)'] != null"
        }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "white"
      },
      "encoding": {
        "color": {
          "field": "Diabetes prevalence (% of population ages 20 to 79)",
          "type": "quantitative",
          "scale": {
            "type": "threshold",
            "domain": [2, 4, 6, 8, 10, 12.5, 15, 17.5, 20],
            "range": ["#ffffe0", "#ffeebb", "#facd75", "#fcac32", "#ff8926", "#ff4d0d", "#eb2d02", "#ba1c02", "#9e0b00", "#751202"]
          },
          "legend": {
            "title": "Diabetes Prevalence (%)",
            "orient": "right",
            "direction": "vertical",
            "gradientLength": 1000, // Adjusted length
            "labelFontSize": 12,
            "titleFontSize": 14,
            "titleAnchor": "middle" // Center the title
          }
        },
        "tooltip": [
          { "field": "properties.NAME", "type": "nominal", "title": "Country" },
          {
            "field": "Diabetes prevalence (% of population ages 20 to 79)",
            "type": "quantitative",
            "title": "Diabetes Prevalence (%)",
            "format": ".1f",
            "condition": {
              "test": "datum['Diabetes prevalence (% of population ages 20 to 79)'] == null",
              "value": "No data"
            }
          }
        ]
      }
    },
    // Leader Lines Layer
    {
      "data": {
        "values": annotationData
      },
      "mark": {
        "type": "rule",
        "stroke": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "longitude": {
          "field": "Longitude",
          "type": "quantitative"
        },
        "latitude": {
          "field": "Latitude",
          "type": "quantitative"
        },
        "longitude2": {
          "field": "LabelLongitude",
          "type": "quantitative"
        },
        "latitude2": {
          "field": "LabelLatitude",
          "type": "quantitative"
        }
      }
    },
    // Labels Layer
    {
      "data": {
        "values": annotationData
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "black",
        "align": "left",
        "baseline": "middle",
        "dx": 5,
        "dy": 0,
        "tooltip": null,
        "background": "white",
        "cornerRadius": 3,
        "padding": 2
      },
      "encoding": {
        "longitude": {
          "field": "LabelLongitude",
          "type": "quantitative"
        },
        "latitude": {
          "field": "LabelLatitude",
          "type": "quantitative"
        },
        "text": {
          "field": "label",
          "type": "nominal"
        }
      }
    }
  ]
};




// Base Map Specification
const baseMapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": "container",
  "projection": { "type": "equalEarth" },
  "data": {
    "url": "https://raw.githubusercontent.com/mptwaktusolat/jakim.geojson/master/malaysia.state.geojson",
    "format": { "type": "json", "property": "features" }
  },
  "transform": [
    {
      "lookup": "properties.name",
      "from": {
        "data": { "url": "" },
        "format": { "type": "csv" },
        "key": "State",
        "fields": []
      }
    }
  ],
  "layer": [
    // Base Map Layer
    {
      "mark": { "type": "geoshape", "fill": "lightgray", "stroke": "white" },
      "encoding": {
        "tooltip": {
          "field": "properties.name",
          "type": "nominal",
          "title": "State"
        }
      }
    },
    // Data Layer
    {
      "mark": { "type": "geoshape", "stroke": "white" },
      "encoding": {
        "color": {
          "field": "Diabetes Density (%)",
          "type": "quantitative",
          "scale": {
            "type": "threshold",
            "domain": [2, 4, 6, 8, 10, 12],
            "range": ["#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"]
          }
        },
        "tooltip": [
          { "field": "properties.name", "type": "nominal", "title": "State" },
          { "field": "Diabetes Density (%)", "type": "quantitative", "title": "Diabetes Density (%)" },
          { "field": "Hypertension Prevalence (%)", "type": "quantitative", "title": "Hypertension Prevalence (%)" },
          { "field": "Dyslipidemia Prevalence (%)", "type": "quantitative", "title": "Dyslipidemia Prevalence (%)" }
        ]
      }
    },
    // Leader Lines Layer
    {
      "data": {
        "values": stateAnnotations
      },
      "mark": {
        "type": "rule",
        "stroke": "black",
        "strokeWidth": 1
      },
      "encoding": {
        "longitude": {
          "field": "Longitude",
          "type": "quantitative"
        },
        "latitude": {
          "field": "Latitude",
          "type": "quantitative"
        },
        "longitude2": {
          "field": "LabelLongitude",
          "type": "quantitative"
        },
        "latitude2": {
          "field": "LabelLatitude",
          "type": "quantitative"
        }
      }
    },
    // Labels Layer
    {
      "data": {
        "values": stateAnnotations
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "black",
        "align": "left",
        "baseline": "middle",
        "dx": 5,
        "dy": 0,
        "tooltip": null,
        "background": "white",
        "cornerRadius": 3,
        "padding": 2
      },
      "encoding": {
        "longitude": {
          "field": "LabelLongitude",
          "type": "quantitative"
        },
        "latitude": {
          "field": "LabelLatitude",
          "type": "quantitative"
        },
        "text": {
          "field": "Label",
          "type": "nominal"
        }
      }
    }
  ]
};


// Scatter Plot Specification
const scatterSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A scatterplot showing diabetes prevalence versus GDP per capita, with bubble size representing population for 2021.",
  "width": "container",
  "height": "container",
  "data": { "values": [] },  // Data will be assigned dynamically
  "transform": [
    {
      "calculate": "toNumber(datum['GDP per capita'])",
      "as": "GDP_per_capita"
    },
    {
      "calculate": "toNumber(datum['Diabetes prevalence (% of population ages 20 to 79)'])",
      "as": "Diabetes_prevalence"
    },
    {
      "calculate": "toNumber(datum['population'])",
      "as": "population"
    },
    {
      "filter": "datum['GDP_per_capita'] > 0 && datum['Diabetes_prevalence'] > 0"
    }
  ],
  "layer": [
    {
      // Base layer (circles)
      "mark": {
        "type": "circle",
        "opacity": 0.7
      },
      "encoding": {
        "x": {
          "field": "GDP_per_capita",
          "type": "quantitative",
          "title": "GDP per capita (constant international-$)",
          "scale": {
            "type": "log",
            "domain": [100, 900000]
          },
          "axis": {
            "tickCount": 10,
            "grid": false,
            "labelExpr": "datum.value < 1000 ? datum.value : datum.value < 10000 ? datum.value / 1000 + 'k' : datum.value < 1000000 ? datum.value / 1000 + 'k' : datum.value / 1000000 + 'M'",
            "tickValues": [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 900000],
            "labelPadding": 5,
            "titleFontSize": 16,
            "labelFontSize": 12,
            "titleFontWeight": "bold"
          }
        },
        "y": {
          "field": "Diabetes_prevalence",
          "type": "quantitative",
          "title": "Diabetes Prevalence (%)",
          "scale": {
            "domain": [0, 35],
            "nice": true
          },
          "axis": {
            "grid": false,
            "ticks": false,
            "tickCount": 7,
            "labelFormat": ".0f",
            "titleFontSize": 16,
            "labelFontSize": 12,
            "titleFontWeight": "bold"
          }
        },
        "size": {
          "field": "population",
          "type": "quantitative",
          "title": "Population",
          "scale": {
            "type": "linear",
            "domain": [100000, 1400000000],
            "range": [100, 3000]
          },
          "legend": { "title": "Population" }
        },
        "color": {
          "field": "CountryGroup",
          "type": "nominal",
          "scale": {
            "domain": [
              ...Object.keys(highlightedCountries),
              'Other Asia',
              'Other'
            ],
            "range": [
              ...Object.values(highlightedCountries),
              'steelblue',  // Other Asia
              'lightgrey'   // Other
            ]
          },
          "legend": {
            "title": "Country Group",
            "orient": "right"
          }
        },
        "tooltip": [
          { "field": "Entity", "type": "nominal", "title": "Country" },
          { "field": "Diabetes_prevalence", "type": "quantitative", "title": "Diabetes Prevalence (%)" },
          { "field": "GDP_per_capita", "type": "quantitative", "title": "GDP per capita" },
          { "field": "population", "type": "quantitative", "title": "Population" }
        ]
      }
    },
    {
      // Labels layer
      "mark": {
        "type": "text",
        "align": "left",
        "dx": 5,
        "dy": -5,
        "fontSize": 10
      },
      "transform": [
        {
          "filter": {
            "field": "Entity",
            "oneOf": Object.keys(highlightedCountries)
          }
        }
      ],
      "encoding": {
        "x": { "field": "GDP_per_capita", "type": "quantitative" },
        "y": { "field": "Diabetes_prevalence", "type": "quantitative" },
        "text": { "field": "Entity", "type": "nominal" },
        "color": { "field": "CountryGroup", "type": "nominal" }
      }
    }
  ]
};




// Dot Chart Specification
const dotSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A dot chart showing diabetes prevalence for male and female patients by state in 2023, with lines showing the difference.",
  "width": "container",
  "height": "container",
  "data": {
    "values": []  // Will be populated dynamically
  },
  "layer": [
    {
      "mark": {
        "type": "line",
        "stroke": "grey",
        "strokeWidth": 2
      },
      "encoding": {
        "x": {
          "field": "State",
          "type": "nominal",
          "axis": {
            "title": "State",
            "labelAngle": 45,
            "titleFontSize": 16,
            "labelFontSize": 12,
            "titleFontWeight": "bold"
          }
        },
        "y": {
          "field": "Diabetes Prevalence (%)",
          "type": "quantitative",
          "axis": {
            "title": "Diabetes Prevalence (%)",
            "grid": false,
            "ticks": false,
            "titleFontSize": 16,
            "labelFontSize": 12,
            "titleFontWeight": "bold"
          }
        },
        "detail": {
          "field": "State"
        }
      }
    },
    {
      "mark": {
        "type": "rule",
        "strokeWidth": 30,
        "color": "transparent",
        "tooltip": true
      },
      "encoding": {
        "x": { "field": "State", "type": "nominal" },
        "y": { "field": "Diabetes Prevalence (%)", "type": "quantitative" },
        "tooltip": [
          { "field": "State", "type": "nominal", "title": "State" },
          { "field": "Numeric Difference", "type": "quantitative", "title": "Numeric Difference (Patients)" },
          { "field": "Percentage Difference", "type": "quantitative", "title": "Percentage Difference (%)" }
        ]
      }
    },
    {
      "mark": {
        "type": "point",
        "size": 200
      },
      "encoding": {
        "x": { "field": "State", "type": "nominal" },
        "y": { "field": "Diabetes Prevalence (%)", "type": "quantitative" },
        "shape": {
          "condition": {
            "test": "datum.Gender === 'Male'",
            "value": "diamond"  // Set male patients to diamond shape
          },
          "value": "circle"  // Default shape for female patients
        },
        "color": {
          "field": "Gender",
          "type": "nominal",
          "legend": null  // Remove the legend
        },
        "tooltip": [
          { "field": "State", "type": "nominal", "title": "State" },
          { "field": "Gender", "type": "nominal", "title": "Gender" },
          { "field": "Number of patients", "type": "quantitative", "title": "Number of patients" },
          { "field": "Diabetes Prevalence (%)", "type": "quantitative", "title": "Diabetes Prevalence (%)" }
        ]
      }
    }
  ]
};


// Age Group Bar Chart Specification
const ageGroupSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive bar chart showing the number of diabetes patients by age group.",
  "data": { "values": ageGroupData },
  "width": "container",
  "height": "container",
  "transform": [
    {
      "filter": "datum.id !== 'All Ages'"
    }
  ],
  "mark": {
    "type": "bar",
    "tooltip": true
  },
  "encoding": {
    "x": {
      "field": "id",
      "type": "nominal",
      "axis": { 
        "title": "Age Group", 
        "labelAngle": 45, 
        "labelFontSize": 12,
        "titleFontSize": 16,
        "titleFontWeight": "bold"
      },
      "sort": ["<18", "18-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", ">80"]
    },
    "y": {
      "field": "Patients",
      "type": "quantitative",
      "axis": { 
        "title": "Number of Patients",
        "labelFontSize": 12,
        "titleFontSize": 16,
        "titleFontWeight": "bold"
      }
    },
    "color": {
      "value": "#4682b4"  // This will apply the same color to all bars
    },
    "tooltip": [
      { "field": "id", "type": "nominal", "title": "Age Group" },
      { "field": "Patients", "type": "quantitative", "title": "Number of Patients" }
    ]
  },
  "selection": {
    "highlight": { "type": "single", "on": "mouseover", "empty": "none" }
  }
};


// Animated Bar Chart Race Specification
const barChartRaceSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "An animated bar chart race showing diabetes prevalence by state over time.",
  "width": "container",
  "height": "container",
  "padding": 5,
  "data": { "values": [] }, // Data will be loaded dynamically
  "transform": [
    {
      "fold": ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      "as": ["Year", "Prevalence"]
    },
    {
      "calculate": "toNumber(datum.Year)",
      "as": "Year_num"
    },
    {
      "calculate": "toNumber(datum.Prevalence)",
      "as": "Prevalence_num"
    },
    {
      "filter": "datum.Year_num == year"
    },
    {
      "window": [{ "op": "rank", "as": "Rank" }],
      "sort": [{ "field": "Prevalence_num", "order": "descending" }]
    },
    {
      "calculate": "datum.State == 'Malaysia' ? 999 : datum.Rank",
      "as": "Order"
    },
    {
      "filter": "(datum.Rank <= 15) || (datum.State == 'Malaysia')"
    }
  ],
  "params": [
    {
      "name": "year",
      "value": 2013
      // Remove the bind property
    }
  ],
  "layer": [
    {
      "mark": {
        "type": "bar",
        "tooltip": true
      },
      "encoding": {
        "y": {
          "field": "State",
          "type": "nominal",
          "sort": { "field": "Order", "order": "ascending" },
          "axis": {
            "title": null
          }
        },
        "x": {
          "field": "Prevalence_num",
          "type": "quantitative",
          "axis": {
            "title": "Proportion of Patients Achieving HbA1c ≤6.5% (%)",
            "labelFontSize": 12,
            "titleFontSize": 16,
            "titleFontWeight": "bold"
          },
          "scale": {
            "domain": [0, 50] // Keep x-axis constant
          }
        },
        "color": {
          "field": "State",
          "type": "nominal",
          "scale": {
            "domain": [
              "Johor", "Kedah", "Kelantan", "Melaka", "N. Sembilan",
              "Pahang", "Perak", "Perlis", "P. Pinang", "Sabah",
              "Sarawak", "Selangor", "Terengganu", "WP. Kuala Lumpur",
              "WP. Labuan", "WP. Putrajaya", "Malaysia"
            ],
            "range": [
              "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
              "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
              "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5",
              "#c49c94", "#000000" // Assign black color to Malaysia
            ]
          },
          "legend": null
        },
        "key": { "field": "State" },
        "tooltip": [
          { "field": "State", "type": "nominal", "title": "State" },
          { "field": "Year_num", "type": "quantitative", "title": "Year" },
          { "field": "Prevalence_num", "type": "quantitative", "title": "Diabetes Prevalence (%)" }
        ]
      }
    },
    // Layer for Year Label
    {
      "data": {
        "values": [{}]
      },
      "transform": [
        {
          "calculate": "year",
          "as": "Year_num"
        }
      ],
      "mark": {
        "type": "text",
        "align": "center",
        "fontSize": 100,
        "color": "#cccccc",
        "opacity": 0.4
      },
      "encoding": {
        "x": { "signal": "width / 2" },
        "y": { "signal": "height / 2" },
        "text": { "field": "Year_num", "type": "nominal" }
      }
    }
  ],
  "config": {
    "bar": {
      "discreteBandSize": 25
    },
    "axis": {
      "labelFontSize": 12,
      "titleFontSize": 14
    },
    "view": {
      "stroke": null
    },
    "animation": {
      "duration": 1000,
      "easing": "linear"
    }
  }
};

// Function to render the global map
function renderGlobalMap() {
  vegaEmbed('#globalMap', globalMapSpec).catch(console.error);
}



// Data URLs
const diabetesPatientsURL = 'https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/diabetes_patients_by_state_2023.csv';
const populationDataURL = 'https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/population_state.csv';

// Function to calculate and process data for the dot chart
function processAndRenderData(diabetesData, populationData) {
  const processedData = [];

  diabetesData.forEach(d => {
    if (d.State !== "MALAYSIA") {
      const matchingMalePopulation = populationData.find(p =>
        p.state === d.State &&
        p.date === "2023-01-01" &&
        p.sex === "male" &&
        p.age === "overall" &&
        p.ethnicity === "overall"
      );

      const matchingFemalePopulation = populationData.find(p =>
        p.state === d.State &&
        p.date === "2023-01-01" &&
        p.sex === "female" &&
        p.age === "overall" &&
        p.ethnicity === "overall"
      );

      if (matchingMalePopulation && matchingFemalePopulation) {
        const malePopulation = parseFloat(matchingMalePopulation.population.replace(/,/g, '')) || 0;
        const femalePopulation = parseFloat(matchingFemalePopulation.population.replace(/,/g, '')) || 0;
        const malePatients = parseInt(d['Male n (%)'].split(' ')[0].replace(/,/g, '')) || 0;
        const femalePatients = parseInt(d['Female n (%)'].split(' ')[0].replace(/,/g, '')) || 0;

        if (malePopulation > 0 && femalePopulation > 0) {
          const malePrevalence = (malePatients / (malePopulation * 1000)) * 100;
          const femalePrevalence = (femalePatients / (femalePopulation * 1000)) * 100;

          const numericDifference = Math.abs(malePatients - femalePatients);
          const percentageDifference = Math.abs(malePrevalence - femalePrevalence);

          processedData.push({
            "State": d.State,
            "Gender": "Male",
            "Number of patients": malePatients,
            "Diabetes Prevalence (%)": malePrevalence,
            "Numeric Difference": numericDifference,
            "Percentage Difference": percentageDifference
          });

          processedData.push({
            "State": d.State,
            "Gender": "Female",
            "Number of patients": femalePatients,
            "Diabetes Prevalence (%)": femalePrevalence,
            "Numeric Difference": numericDifference,
            "Percentage Difference": percentageDifference
          });
        }
      }
    }
  });

  renderDotChart(processedData);
}

// Function to render the dot chart
function renderDotChart(data) {
  dotSpec.data.values = data;
  vegaEmbed("#dotchart", dotSpec).catch(console.warn);
}

// Function to render the scatter plot
function renderScatterPlot() {
  vegaEmbed("#scatterplot", scatterSpec, { mode: "vega-lite" }).catch(console.warn);
}

// Function to render the Age Group Bar Chart
function renderAgeGroupChart() {
  vegaEmbed("#ageGroupChart", ageGroupSpec).catch(console.warn);
}

// Function to render the animated bar chart race
function renderBarChartRace() {
  barChartRaceSpec.data.values = lineGraphData; // Assign the data

  // Remove the bind property from params
  barChartRaceSpec.params[0].bind = undefined;

  vegaEmbed("#barChartRace", barChartRaceSpec, { mode: "vega-lite" }).then(result => {
    const view = result.view;

    let isPlaying = false;
    let animationInterval;
    let year = 2013;

    // Function to update the year and re-render the chart
    function updateYear() {
      if (year <= 2023) {
        view.signal('year', year).runAsync();
        updateTimestampDescription(year);
        highlightYearButton(year);
        year++;
      } else {
        clearInterval(animationInterval);
        isPlaying = false;
        document.getElementById('playBarChart').style.display = 'inline';
        document.getElementById('pauseBarChart').style.display = 'none';
        year = 2013; // Reset to first year
      }
    }

    // Play button event listener
    document.getElementById('playBarChart').addEventListener('click', () => {
      if (!isPlaying) {
        isPlaying = true;
        document.getElementById('playBarChart').style.display = 'none';
        document.getElementById('pauseBarChart').style.display = 'inline';
        animationInterval = setInterval(updateYear, 1000); // Adjust the interval as needed
      }
    });

    // Pause button event listener
    document.getElementById('pauseBarChart').addEventListener('click', () => {
      if (isPlaying) {
        clearInterval(animationInterval);
        isPlaying = false;
        document.getElementById('playBarChart').style.display = 'inline';
        document.getElementById('pauseBarChart').style.display = 'none';
      }
    });

    // Initialize the chart with the first year
    view.signal('year', year).runAsync();

    // Generate the timestamp control
    createTimestampControl(view);

  }).catch(console.error);
}

// Function to create the timestamp control
function createTimestampControl(view) {
  const timestampYearsContainer = document.getElementById('timestamp-years');
  const timestampDescription = document.getElementById('timestamp-description');

  const years = [];
  for (let y = 2013; y <= 2023; y++) {
    years.push(y);
  }

  years.forEach(y => {
    const yearButton = document.createElement('button');
    yearButton.textContent = y;
    yearButton.classList.add('timestamp-year');
    yearButton.dataset.year = y;
    timestampYearsContainer.appendChild(yearButton);

    // Add event listener to each year button
    yearButton.addEventListener('click', () => {
      // Update the chart to the selected year
      view.signal('year', y).runAsync();

      // Update the description
      updateTimestampDescription(y);

      // Update the global year variable
      year = y;

      // Scroll to the corresponding chart (optional)
      // document.getElementById('barChartRace').scrollIntoView({ behavior: 'smooth' });

      // Highlight the selected year
      highlightYearButton(y);
    });
  });

  // Optionally, highlight the initial year
  highlightYearButton(year);
}

// Function to update the description based on the selected year
function updateTimestampDescription(year) {
  const descriptions = {
    2013: 'In 2013, the diabetes prevalence was starting to rise...',
    2014: 'By 2014, certain states saw significant changes...',
    2015: 'The year 2015 marked a notable shift...',
    2016: 'In 2016, more data became available...',
    2017: '2017 showed continued trends...',
    2018: 'In 2018, the prevalence rates...',
    2019: 'By 2019, new patterns emerged...',
    2020: 'The year 2020 was affected by global events...',
    2021: 'In 2021, the data reflects...',
    2022: 'By 2022, significant developments occurred...',
    2023: 'In 2023, the latest data shows...'
  };

  const timestampDescription = document.getElementById('timestamp-description');
  timestampDescription.textContent = descriptions[year] || `You are viewing data for the year ${year}.`;
}

// Function to highlight the selected year button
function highlightYearButton(year) {
  document.querySelectorAll('.timestamp-year').forEach(btn => {
    btn.classList.remove('active-year');
    if (parseInt(btn.dataset.year) === year) {
      btn.classList.add('active-year');
    }
  });
}

// Function to update the map spec based on selected metric
function updateMapSpec(selectedMetric) {
  // Update Title and Description
  document.getElementById('map-title').innerText = metricDetails[selectedMetric].title;
  document.getElementById('map-description').innerText = metricDetails[selectedMetric].description;

  // Update Vega-Lite Specification
  let updatedSpec = { ...baseMapSpec };
  updatedSpec.transform[0].from.data.url = metricDetails[selectedMetric].dataURL;
  updatedSpec.transform[0].from.fields = metricDetails[selectedMetric].fields;
  updatedSpec.layer[1].encoding.color.field = selectedMetric;
  updatedSpec.layer[1].encoding.color.scale.domain = metricDetails[selectedMetric].domain;
  updatedSpec.layer[1].encoding.tooltip[1].field = selectedMetric;
  updatedSpec.layer[1].encoding.tooltip[1].title = selectedMetric;

  // Render Map
  vegaEmbed("#map", updatedSpec, { mode: "vega-lite" }).catch(console.warn);
}

// Data Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and process data for dot chart
  Promise.all([
    d3.csv(diabetesPatientsURL),
    d3.csv(populationDataURL)
  ]).then(([diabetesData, populationData]) => {
    processAndRenderData(diabetesData, populationData);
  }).catch(console.error);

  // Scatter Plot Data Loading
  // Remove the filter that limits data to Asia
  const populationURL = "https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/export.csv";
  const diabetesDataURL = "https://raw.githubusercontent.com/zlim0052/project-2/main/diabetes%20prevalence.csv";

  Promise.all([d3.csv(populationURL), d3.csv(diabetesDataURL)])
    .then(([populationData, diabetesData]) => {
      // Country Name Mapping
      const countryNameMapping = {
        'Korea, South': 'South Korea',
        'Korea, North': 'North Korea',
        'United States of America': 'United States',
        'Russian Federation': 'Russia',
        // Add other mappings if necessary
      };

      // List of countries to highlight and their colors
      const highlightedCountries = {
        'China': '#1f77b4',        // Blue
        'India': '#ff7f0e',        // Orange
        'Japan': '#2ca02c',        // Green
        'South Korea': '#d62728',  // Red
        'Malaysia': '#9467bd',     // Purple
        'Singapore': '#8c564b',    // Brown
        'Thailand': '#e377c2'      // Pink
      };

      // Clean and standardize population data
      const cleanPopulationData = populationData.map(d => ({
        name: countryNameMapping[d.name] || d.name,
        population: parseInt(d.value.replace(/,/g, '')),
        region: d.region
      }));

      // Standardize diabetes data
      const standardizedDiabetesData = diabetesData.map(d => ({
        ...d,
        Entity: countryNameMapping[d.Entity] || d.Entity
      }));

      // Merge data without filtering to Asia
      const mergedData = standardizedDiabetesData
        .filter(d =>
          d.Year == 2021 &&
          d['Diabetes prevalence (% of population ages 20 to 79)'] != null &&
          d['GDP per capita'] != null
        )
        .map(diabetesEntry => {
          const populationEntry = cleanPopulationData.find(d => d.name === diabetesEntry.Entity);
          const continent = countryToContinentMap[diabetesEntry.Entity];
          let countryGroup;
          if (highlightedCountries.hasOwnProperty(diabetesEntry.Entity)) {
            countryGroup = diabetesEntry.Entity;
          } else if (continent === 'Asia') {
            countryGroup = 'Other Asia';
          } else {
            countryGroup = 'Other';
          }
          return {
            ...diabetesEntry,
            population: populationEntry ? populationEntry.population : null,
            CountryGroup: countryGroup
          };
        })
        .filter(d => d.population != null);

      // Proceed to set the data for the scatter plot
      scatterSpec.data.values = mergedData;
      renderScatterPlot();
    })
    .catch(console.error);

  // Load data for the animated bar chart race
  d3.csv("https://raw.githubusercontent.com/zlim0052/project-2/main/diabetes_patients_scatter_data.csv")
    .then(data => {
      lineGraphData = data;
      renderBarChartRace();
    })
    .catch(console.error);

  // Map Metric Selection
  document.getElementById('metric-select').addEventListener('change', event => {
    const selectedMetric = event.target.value;
    updateMapSpec(selectedMetric);
  });

  // Initial Map Rendering
  updateMapSpec("Diabetes Density (%)");

  // Render Global Map
  renderGlobalMap();

  // Render Age Group Chart
  renderAgeGroupChart();
});
