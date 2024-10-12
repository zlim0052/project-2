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
  lineGraphSpec.transform[3].filter.oneOf = selectedStates; // Adjust index due to the removed filter
  let isPlaying = true;
  let animationInterval;
  let year = 2013;

  vegaEmbed("#linegraph", lineGraphSpec, { mode: "vega-lite" }).then(result => {
    const view = result.view;

    function updateYear() {
      if (year <= 2023) {
        view.signal('year', year).run();
        year++;
      } else {
        year = 2013; // Reset the year to 2013 when 2023 is reached
        view.signal('year', year).run(); // Reset to the beginning
      }
    }

    // Start the animation automatically
    animationInterval = setInterval(updateYear, 300);

    // Play button functionality
    document.getElementById('play').addEventListener('click', () => {
      if (!isPlaying) {
        isPlaying = true;
        document.getElementById('play').style.display = "none";  // Hide play button
        document.getElementById('pause').style.display = "inline"; // Show pause button
        animationInterval = setInterval(updateYear, 300); // Resume the animation
      }
    });

    // Pause button functionality
    document.getElementById('pause').addEventListener('click', () => {
      if (isPlaying) {
        clearInterval(animationInterval); // Stop the animation
        isPlaying = false;
        document.getElementById('play').style.display = "inline";  // Show play button
        document.getElementById('pause').style.display = "none";  // Hide pause button
      }
    });

    // Show the complete chart immediately
    document.getElementById('showFull').addEventListener('click', () => {
      clearInterval(animationInterval); // Stop the animation
      isPlaying = false;
      document.getElementById('play').style.display = "inline";  // Show play button
      document.getElementById('pause').style.display = "none";  // Hide pause button
      year = 2023; // Set to the last year
      view.signal('year', 2023).run(); // Display all data
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
    "description": "Interactive treemap showing the number of diabetes patients by age group.",
    "data": { "values": ageGroupData },
    "width": "container", 
    "height": 600,
    "transform": [
      {
        "type": "filter",
        "expr": "datum.parent !== 'All Ages'"
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
        "axis": { "title": "Age Group", "labelAngle": 0 }
      },
      "y": {
        "field": "Patients",
        "type": "quantitative",
        "axis": { "title": "Number of Patients" }
      },
      "color": {
        "field": "id",
        "type": "nominal",
        "legend": null
      },
      "tooltip": [
        { "field": "id", "type": "nominal", "title": "Age Group" },
        { "field": "Patients", "type": "quantitative", "title": "Patients" }
      ]
    },
    "selection": {
      "highlight": { "type": "single", "empty": "none", "on": "mouseover" }
    }
  };
  
  vegaEmbed("#ageGroupChart", ageGroupSpec).catch(console.warn);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAgeGroupChart();
});

