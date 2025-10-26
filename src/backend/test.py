import pandas as pd

# Read HTML file directly
dfs = pd.read_html("https://organiser-sih-2024.github.io/dataset/cipher2.html")

# If there are multiple tables, pick the one you need
df = dfs[0]  # first table

print(df.head())

# Save to CSV for ML processing
df.to_csv("clean_dataset.csv", index=False)