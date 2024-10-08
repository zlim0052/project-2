import pandas as pd

# Create the dataset
data = {
    "Age Group": ["<18", "18-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", 
                  "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", ">80"],
    "Number of Patients": [289, 225, 1762, 6977, 18482, 40386, 68469, 104111, 
                           154701, 232261, 296528, 312533, 274558, 191869, 242982],
    "Percentage": [0.01, 0.01, 0.1, 0.35, 0.94, 2.07, 3.52, 5.34, 
                   7.94, 11.93, 15.24, 16.10, 14.10, 9.85, 12.50],
    "Sex": ["Male", "Male", "Male", "Male", "Male", "Male", "Male", "Male", 
            "Male", "Male", "Male", "Male", "Male", "Male", "Male"],
    "Ethnicity": ["Malay", "Chinese", "Indian", "Others", "Malay", "Chinese", "Indian", "Others", 
                  "Malay", "Chinese", "Indian", "Others", "Malay", "Chinese", "Indian"]
}

# Convert to DataFrame
scatter_data = pd.DataFrame(data)

# Save the dataset as a CSV file
scatter_data.to_csv('diabetes_patients_scatter_data.csv', index=False)

print("CSV file 'diabetes_patients_scatter_data.csv' generated successfully!")
