// Data and Configuration Objects
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

const ageGroupData = [
  { "Age Group": "<18", "Patients": 289, "Percentage": 0.01 },
  { "Age Group": "18-19", "Patients": 225, "Percentage": 0.01 },
  { "Age Group": "20-24", "Patients": 1762, "Percentage": 0.10 },
  { "Age Group": "25-29", "Patients": 6977, "Percentage": 0.35 },
  { "Age Group": "30-34", "Patients": 18482, "Percentage": 0.94 },
  { "Age Group": "35-39", "Patients": 40386, "Percentage": 2.07 },
  { "Age Group": "40-44", "Patients": 68469, "Percentage": 3.52 },
  { "Age Group": "45-49", "Patients": 104111, "Percentage": 5.34 },
  { "Age Group": "50-54", "Patients": 154701, "Percentage": 7.94 },
  { "Age Group": "55-59", "Patients": 232261, "Percentage": 11.93 },
  { "Age Group": "60-64", "Patients": 296528, "Percentage": 15.24 },
  { "Age Group": "65-69", "Patients": 312533, "Percentage": 16.10 },
  { "Age Group": "70-74", "Patients": 274558, "Percentage": 14.10 },
  { "Age Group": "75-79", "Patients": 191869, "Percentage": 9.85 },
  { "Age Group": ">80", "Patients": 242982, "Percentage": 12.50 }
];

const metricDetails = {
    "Diabetes Density (%)": {
        "title": "Diabetes Density (%) by Region",
        "description": "This map shows the Diabetes Density (%) by region in Malaysia. Darker colors indicate higher rates.",
        "domain": [0, 15],
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

// Variables for Selections and Data
let selectedStates = [];
let scatterData = [];
let lineGraphData = [];

// Vega-Lite Specifications
const baseMapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 600, /* Map height set to 500px */
    "projection": {"type": "equalEarth"},
    "data": {
      "url": "https://raw.githubusercontent.com/mptwaktusolat/jakim.geojson/master/malaysia.state.geojson",
      "format": {"type": "json", "property": "features"}
    },
    "transform": [
      {
        "lookup": "properties.name",
        "from": {
          "data": {"url": ""},
          "format": {"type": "csv"},
          "key": "State",
          "fields": []
        }
      }
    ],
    "layer": [
      {
        "mark": {"type": "geoshape", "fill": "lightgray", "stroke": "white"},
        "encoding": {
          "tooltip": {
            "field": "properties.name",
            "type": "nominal",
            "title": "State"
          }
        }
      },
      {
        "mark": {"type": "geoshape", "stroke": "white"},
        "encoding": {
          "color": {
            "field": "Diabetes Density (%)",
            "type": "quantitative",
            "scale": {
              "type": "linear",
              "domain": [0, 20],
              "range": ["#f7fbff", "#08306b"]
            }
          },
          "tooltip": [
            {"field": "properties.name", "type": "nominal", "title": "State"},
            {"field": "Diabetes Density (%)", "type": "quantitative", "title": "Diabetes Density (%)"},
            {"field": "Hypertension Prevalence (%)", "type": "quantitative", "title": "Hypertension Prevalence (%)"},
            {"field": "Dyslipidemia Prevalence (%)", "type": "quantitative", "title": "Dyslipidemia Prevalence (%)"}
          ]
        }
      }
    ]
  };

// Scatter plot specification
let scatterSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A scatterplot showing diabetes prevalence versus GDP per capita, with bubble size representing population for 2021.",
    "width": "container",
    "height": 600,
    "data": {"values": []},  // Will be populated dynamically
    "transform": [
        {
        "filter": "datum.Year == 2021 && datum['Diabetes prevalence (% of population ages 20 to 79)'] != null && datum['GDP per capita'] != null"
        },
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
        }
    ],
    "mark": {
        "type":"circle", 
        "opacity": 0.7
    },
    "encoding": {
        "x": {
        "field": "GDP_per_capita",
        "type": "quantitative",
        "title": "GDP per capita (constant international-$)",
        "scale": {
            "type": "log",
            "domain": [100, 900000],
            "nice": false
        },
        "axis": {
            "grid": false,
            "ticks": false,
            "labelExpr": "datum.value < 10000 ? datum.value : datum.value / 1000 + 'k'",
            "tickValues": [100, 1000, 5000, 10000, 50000, 100000, 500000, 900000],
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
            "domain": [100000, 1400000000],  // Population range
            "range": [100, 3000]  // Circle size range
        },
        "legend": {"title": "Population"}
        },
        "color": {
        "field": "Entity",
        "type": "nominal",
        "legend": {"title": "Country"}
        },
        "tooltip": [
        {"field": "Entity", "type": "nominal", "title": "Country"},
        {"field": "Diabetes_prevalence", "type": "quantitative", "title": "Diabetes Prevalence (%)"},
        {"field": "GDP_per_capita", "type": "quantitative", "title": "GDP per capita"},
        {"field": "population", "type": "quantitative", "title": "Population"}
        ]
    }
};

let lineGraphSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A line graph showing the diabetes prevalence trend for Malaysian states (2013-2023).",
    "width": "container",
    "height": 600,
    "data": {"values": []}, // Will be populated dynamically
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
        "filter": "datum.Year_num <= year"
      },
      // Filter based on selected states
      {
        "filter": {"field": "State", "oneOf": []} // Will be updated dynamically
      }
    ],
    "params": [
      {
        "name": "year",
        "value": 2013
      }
    ],
    "mark": {
      "type": "line",
      "point": true,
      "interpolate": "linear"
    },
    "encoding": {
      "x": {
        "field": "Year_num",
        "type": "quantitative",
        "title": "Year",
        "axis": {
          "grid": false,
          "ticks": false,
          "format": "d",
          "titleFontSize": 16,
          "labelFontSize": 12,
          "titleFontWeight": "bold"
        },
        "scale": {"domain": [2013, 2023]},
      },
      "y": {
        "field": "Prevalence_num",
        "type": "quantitative",
        "title": "Diabetes Prevalence (%)",
        "scale": {"domain": [0, 50]},
        "axis": {
          "grid": false, 
          "ticks": false,
          "titleFontSize": 16,
          "labelFontSize": 12,
          "titleFontWeight": "bold"
        }
      },
      "color": {
        "field": "State",
        "type": "nominal",
        "title": "State"
      },
      "tooltip": [
        {"field": "State", "type": "nominal", "title": "State"},
        {"field": "Year_num", "type": "quantitative", "title": "Year"},
        {"field": "Prevalence_num", "type": "quantitative", "title": "Diabetes Prevalence (%)"}
      ]
    },
    "config": {
      "line": {"interpolate": "monotone"},
      "animation": {"duration": 500}
    }
};

// Function to render the dot chart
const diabetesPatientsURL = 'https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/diabetes_patients_by_state_2023.csv';
const populationDataURL = 'https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/population_state.csv';

// Function to render the dot chart
function renderDotChart(data) {
  const dotSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A dot chart showing diabetes prevalence for male and female patients by state in 2023, with lines showing the difference.",
      "width": "container",
      "height": 600,
      "data": {
          "values": data
      },
      "layer": [
          {
              // Layer for the line connecting male and female points
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
                          "labelAngle": 0,
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
                      "field": "State"   // Define that the line connects within the same state
                  }
              }
          },
          {
              // Rule for hover interaction over the line to show tooltips
              "mark": {
                  "type": "rule",
                  "strokeWidth": 30,
                  "color": "transparent",  // Make the rule transparent but interactive
                  "tooltip": true
              },
              "encoding": {
                  "x": {
                      "field": "State",
                      "type": "nominal"
                  },
                  "y": {
                      "field": "Diabetes Prevalence (%)",
                      "type": "quantitative"
                  },
                  "tooltip": [
                      {"field": "State", "type": "nominal", "title": "State"},
                      {"field": "Numeric Difference", "type": "quantitative", "title": "Numeric Difference (Patients)"},
                      {"field": "Percentage Difference", "type": "quantitative", "title": "Percentage Difference (%)"}
                  ]
              }
          },
          {
              // Layer for the point marks
              "mark": {
                "type":"point",
                "size": 200,

              },
              "encoding": {
                  "x": {
                      "field": "State",
                      "type": "nominal"
                  },
                  "y": {
                      "field": "Diabetes Prevalence (%)",
                      "type": "quantitative"
                  },
                  "color": {
                      "field": "Gender",
                      "type": "nominal",
                      "legend": {"title": "Gender"}
                  },
                  "tooltip": [
                      {"field": "State", "type": "nominal", "title": "State"},
                      {"field": "Gender", "type": "nominal", "title": "Gender"},
                      {"field": "Number of patients", "type": "quantitative", "title": "Number of patients"},
                      {"field": "Diabetes Prevalence (%)", "type": "quantitative", "title": "Diabetes Prevalence (%)"},
                  ]
              }
          }
      ]
  };

  vegaEmbed("#dotchart", dotSpec).catch(console.warn);
}




// Function to calculate and process data for the dot chart
function processAndRenderData(diabetesData, populationData) {
    const processedData = [];

    // Loop through diabetes data and match population data by state, sex, date, age, and ethnicity
    diabetesData.forEach(d => {
        if (d.State !== "MALAYSIA") {
            // Filter population data for the matching state, date (2023-01-01), age (overall), and ethnicity (overall)
            const matchingMalePopulation = populationData.find(p => 
                p.state === d.State &&
                p.date === "2023-01-01" &&
                p.sex === "male" &&
                p.age === "overall" &&
                p.ethnicity === "overall"
            );
            // console.log(matchingMalePopulation);

            const matchingFemalePopulation = populationData.find(p => 
                p.state === d.State &&
                p.date === "2023-01-01" &&
                p.sex === "female" &&
                p.age === "overall" &&
                p.ethnicity === "overall"
            );
            console.log(matchingFemalePopulation);

            if (matchingMalePopulation && matchingFemalePopulation) {
                const malePopulation = parseFloat(matchingMalePopulation.population.replace(/,/g, '')) || 0;
                const femalePopulation = parseFloat(matchingFemalePopulation.population.replace(/,/g, '')) || 0;
                const malePatients = parseInt(d['Male n (%)'].split(' ')[0].replace(/,/g, '')) || 0;
                const femalePatients = parseInt(d['Female n (%)'].split(' ')[0].replace(/,/g, '')) || 0;

                // Calculate the prevalence if population data is available
                if (malePopulation > 0 && femalePopulation > 0) {
                    const malePrevalence = (malePatients / (malePopulation*1000)) * 100;
                    const femalePrevalence = (femalePatients / (femalePopulation*1000)) * 100;

                    const numericDifference = Math.abs(malePatients - femalePatients);
                    const percentageDifference = Math.abs(malePrevalence - femalePrevalence);
                    console.log(numericDifference)
                    console.log(femalePopulation);
                    console.log(femalePatients);
                    console.log(femalePrevalence);

                    processedData.push({
                        "State": d.State,
                        "Gender": "Male",
                        "Number of patients": malePatients,
                        "Diabetes Prevalence (%)": malePrevalence,
                        "Numeric Difference": numericDifference,
                        "Percentage Difference": percentageDifference
                    });

                    processedData.push({
                        // the field name is matching the field name in the vega-lite specification
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

    // Render the dot chart with the processed data
    renderDotChart(processedData);
}

// Fetch both the population data and the diabetes patient data, then process and render
Promise.all([
    d3.csv(diabetesPatientsURL),
    d3.csv(populationDataURL)
]).then(([diabetesData, populationData]) => {
    processAndRenderData(diabetesData, populationData);
}).catch(console.error);



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

function renderLineGraph() {
  lineGraphSpec.transform[4].filter.oneOf = selectedStates;
  let isPlaying = false;
  let animationInterval;
  let year = 2013;

  vegaEmbed("#linegraph", lineGraphSpec, { mode: "vega-lite" }).then(result => {
    const view = result.view;

    function updateYear() {
      if (year <= 2023) {
        view.signal('year', year).run();
        year++;
      } else {
        clearInterval(animationInterval);
        isPlaying = false;
        document.getElementById('play').disabled = false;
      }
    }

    document.getElementById('play').addEventListener('click', () => {
      if (!isPlaying) {
        isPlaying = true;
        document.getElementById('play').disabled = true;
        if (year > 2023) year = 2013;
        animationInterval = setInterval(updateYear, 300);
      }
    });

    document.getElementById('pause').addEventListener('click', () => {
      if (isPlaying) {
        clearInterval(animationInterval);
        isPlaying = false;
        document.getElementById('play').disabled = false;
      }
    });

    view.signal('year', year).run();
  }).catch(console.warn);
}

function renderScatterPlot() {
  vegaEmbed("#scatterplot", scatterSpec, { mode: "vega-lite" }).catch(console.warn);
}

// Data Loading and Initialization
document.addEventListener('DOMContentLoaded', () => {


  // Scatter Plot Data Loading
  const populationURL = "https://raw.githubusercontent.com/zlim0052/project-2/refs/heads/main/export.csv";
  const diabetesDataURL = "https://raw.githubusercontent.com/zlim0052/project-2/main/diabetes%20prevalence.csv";

  Promise.all([d3.csv(populationURL), d3.csv(diabetesDataURL)])
    .then(([populationData, diabetesData]) => {
      const cleanPopulationData = populationData.map(d => ({
        name: d.name,
        population: parseInt(d.value.replace(/,/g, '')),
        region: d.region
      }));

      const asianDiabetesData = diabetesData.filter(d =>
        d.Year == 2021 &&
        d['Diabetes prevalence (% of population ages 20 to 79)'] != null &&
        d['GDP per capita'] != null &&
        countryToContinentMap[d.Entity] === 'Asia'
      );

      const mergedData = asianDiabetesData.map(diabetesEntry => {
        const populationEntry = cleanPopulationData.find(d => d.name === diabetesEntry.Entity);
        return { ...diabetesEntry, population: populationEntry ? populationEntry.population : null };
      }).filter(d => d.population != null);

      scatterSpec.data.values = mergedData;
      renderScatterPlot();
    }).catch(console.error);

  // Line Graph Data Loading
  d3.csv("https://raw.githubusercontent.com/zlim0052/project-2/main/diabetes_patients_scatter_data.csv")
    .then(data => {
      lineGraphData = data;
      lineGraphSpec.data.values = lineGraphData;

      const states = [...new Set(lineGraphData.map(d => d.State))].sort();
      const stateSelect = document.getElementById('state-select');
      states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.text = state;
        stateSelect.appendChild(option);
      });

      selectedStates = states;
      for (let i = 0; i < stateSelect.options.length; i++) {
        stateSelect.options[i].selected = true;
      }

      stateSelect.addEventListener('change', () => {
        selectedStates = Array.from(stateSelect.selectedOptions).map(option => option.value);
        renderLineGraph();
      });

      renderLineGraph();
    });

  // Map Metric Selection
  document.getElementById('metric-select').addEventListener('change', event => {
    const selectedMetric = event.target.value;
    updateMapSpec(selectedMetric);
  });

  // Initial Map Rendering
  updateMapSpec("Diabetes Density (%)");
});

// Function to render Age Group Bar Chart
function renderAgeGroupChart() {
  const ageGroupSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "Bar chart showing the number of diabetes patients by age group.",
      "width": "container",
      "height": 400,
      "data": { "values": ageGroupData },
      "mark": "bar",
      "encoding": {
          "x": {
              "field": "Age Group",
              "type": "nominal",
              "axis": { "title": "Age Group" },
              "sort": ["<18", "18-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", ">80"] 
          },
          "y": {
              "field": "Patients",
              "type": "quantitative",
              "axis": { "title": "Number of Patients" }
          },
          "tooltip": [
              { "field": "Age Group", "type": "nominal", "title": "Age Group" },
              { "field": "Patients", "type": "quantitative", "title": "Number of Patients" },
              { "field": "Percentage", "type": "quantitative", "title": "Percentage (%)" }
          ]
      },
      "selection": {
          "highlight": { "type": "single", "on": "mouseover", "empty": "none" }
      }
  };

  vegaEmbed("#ageGroupChart", ageGroupSpec).catch(console.warn);
}

// Call the function to render Age Group Bar Chart
document.addEventListener('DOMContentLoaded', () => {
  renderAgeGroupChart();
});
