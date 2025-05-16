"""Pytest configuration for cognitive load analysis tests."""

import pytest
import pandas as pd
import numpy as np
import os
import tempfile


@pytest.fixture
def sample_data_path():
    """Create a temporary CSV file with sample data for testing."""
    # Create test data
    np.random.seed(42)
    
    # Parameters
    num_participants = 5
    construct_types = ['loop', 'branch', 'mixed']
    complexity_levels = {
        'loop': [1, 2, 3],
        'branch': [1, 2, 3],
        'mixed': [1, 2, 3]
    }
    programming_freqs = ['daily', 'weekly']
    
    # Create data
    test_data = []
    participant_ids = [f'p{i+1:02d}' for i in range(num_participants)]
    
    for p_id in participant_ids:
        prog_freq = np.random.choice(programming_freqs)
        base_time = np.random.normal(1000, 200)
        
        for c_type in construct_types:
            for level in complexity_levels[c_type]:
                # Simple increase pattern
                mean_time = base_time + (level * 200)
                response_time = np.random.normal(mean_time, mean_time * 0.15)
                
                # Correctness decreases with complexity
                p_correct = max(0.5, 0.95 - (level * 0.08))
                is_correct = 1 if np.random.random() < p_correct else 0
                
                test_data.append({
                    'participant_id': p_id,
                    'construct_type': c_type,
                    'complexity_level': level,
                    'programming_frequency': prog_freq,
                    'response_time_ms': response_time,
                    'correct': is_correct
                })
    
    # Create DataFrame and save to temp file
    test_df = pd.DataFrame(test_data)
    
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as temp_file:
        test_df.to_csv(temp_file.name, index=False)
        temp_path = temp_file.name
    
    yield temp_path
    
    # Clean up
    os.unlink(temp_path)

