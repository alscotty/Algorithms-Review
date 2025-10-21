import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random
from typing import Dict, List, Any
import math

def generate_sample_json_data(num_records: int = 1000) -> List[Dict[str, Any]]:
    data = []
    categories = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing']
    statuses = ['Active', 'Inactive', 'Pending', 'Completed', 'Cancelled']
    
    for i in range(num_records):
        record = {
            'id': f'ID_{i+1:04d}',
            'name': f'Record_{i+1}',
            'category': random.choice(categories),
            'status': random.choice(statuses),
            'value': round(random.uniform(10.0, 10000.0), 2),
            'score': random.randint(1, 100),
            'created_date': (datetime.now() - timedelta(days=random.randint(0, 365))).isoformat(),
            'is_verified': random.choice([True, False]),
            'metadata': {
                'priority': random.randint(1, 5),
                'tags': random.sample(['urgent', 'normal', 'low', 'high', 'critical'], random.randint(1, 3)),
                'region': random.choice(['North', 'South', 'East', 'West', 'Central'])
            }
        }
        data.append(record)
    
    return data

def process_json_to_dataframe(json_data: List[Dict[str, Any]]) -> pd.DataFrame:
    processed_records = []
    
    for record in json_data:
        processed_record = {
            'id': record['id'],
            'name': record['name'],
            'category': record['category'],
            'status': record['status'],
            'value': record['value'],
            'score': record['score'],
            'created_date': pd.to_datetime(record['created_date']),
            'is_verified': record['is_verified'],
            'priority': record['metadata']['priority'],
            'tags': ', '.join(record['metadata']['tags']),
            'region': record['metadata']['region']
        }
        processed_records.append(processed_record)
    
    df = pd.DataFrame(processed_records)
    return df

def calculate_statistics(df: pd.DataFrame) -> Dict[str, Any]:
    stats = {}
    
    numeric_columns = df.select_dtypes(include=[np.number]).columns
    for col in numeric_columns:
        stats[f'{col}_mean'] = df[col].mean()
        stats[f'{col}_std'] = df[col].std()
        stats[f'{col}_min'] = df[col].min()
        stats[f'{col}_max'] = df[col].max()
        stats[f'{col}_median'] = df[col].median()
    
    categorical_columns = df.select_dtypes(include=['object']).columns
    for col in categorical_columns:
        if col != 'tags':
            stats[f'{col}_unique_count'] = df[col].nunique()
            stats[f'{col}_most_common'] = df[col].mode().iloc[0] if not df[col].mode().empty else None
    
    stats['total_records'] = len(df)
    stats['date_range_days'] = (df['created_date'].max() - df['created_date'].min()).days
    
    return stats

def apply_data_transformations(df: pd.DataFrame) -> pd.DataFrame:
    df['value_log'] = np.log1p(df['value'])
    df['score_normalized'] = (df['score'] - df['score'].min()) / (df['score'].max() - df['score'].min())
    df['value_category'] = pd.cut(df['value'], bins=5, labels=['Very Low', 'Low', 'Medium', 'High', 'Very High'])
    df['days_since_created'] = (datetime.now() - df['created_date']).dt.days
    df['is_high_priority'] = df['priority'] >= 4
    df['value_score_ratio'] = df['value'] / df['score']
    
    return df

def create_aggregated_views(df: pd.DataFrame) -> Dict[str, pd.DataFrame]:
    views = {}
    
    views['by_category'] = df.groupby('category').agg({
        'value': ['sum', 'mean', 'count'],
        'score': ['mean', 'std'],
        'is_verified': 'sum'
    }).round(2)
    
    views['by_status'] = df.groupby('status').agg({
        'value': ['sum', 'mean'],
        'score': ['mean', 'min', 'max'],
        'priority': 'mean'
    }).round(2)
    
    views['by_region'] = df.groupby('region').agg({
        'value': ['sum', 'mean'],
        'score': ['mean'],
        'is_verified': 'sum',
        'priority': 'mean'
    }).round(2)
    
    views['monthly_trends'] = df.set_index('created_date').resample('M').agg({
        'value': 'sum',
        'score': 'mean',
        'is_verified': 'sum'
    }).round(2)
    
    return views

def detect_outliers(df: pd.DataFrame) -> pd.DataFrame:
    outlier_columns = ['value', 'score']
    outlier_df = df.copy()
    
    for col in outlier_columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        outlier_df[f'{col}_is_outlier'] = (df[col] < lower_bound) | (df[col] > upper_bound)
    
    return outlier_df

def create_correlation_matrix(df: pd.DataFrame) -> pd.DataFrame:
    numeric_df = df.select_dtypes(include=[np.number])
    correlation_matrix = numeric_df.corr()
    return correlation_matrix

def export_processed_data(df: pd.DataFrame, filename: str = 'processed_data.csv'):
    df.to_csv(filename, index=False)
    print(f"Data exported to {filename}")

def main():
    print("Starting data processing pipeline...")
    
    json_data = generate_sample_json_data(1500)
    print(f"Generated {len(json_data)} JSON records")
    
    df = process_json_to_dataframe(json_data)
    print(f"Created DataFrame with shape: {df.shape}")
    
    df = apply_data_transformations(df)
    print("Applied data transformations")
    
    stats = calculate_statistics(df)
    print("Calculated statistics:")
    for key, value in list(stats.items())[:10]:
        print(f"  {key}: {value}")
    
    outlier_df = detect_outliers(df)
    outlier_count = outlier_df['value_is_outlier'].sum() + outlier_df['score_is_outlier'].sum()
    print(f"Detected {outlier_count} outliers")
    
    correlation_matrix = create_correlation_matrix(df)
    print("Created correlation matrix")
    
    aggregated_views = create_aggregated_views(df)
    print(f"Created {len(aggregated_views)} aggregated views")
    
    export_processed_data(df, 'processed_data_10_20_2025.csv')
    
    print("Data processing pipeline completed successfully!")

if __name__ == "__main__":
    main()
