"""Tests for the cognitive load analyzer."""

import pytest
import pandas as pd
import matplotlib.pyplot as plt
from analysis.analyzer import analyze_cognitive_load_data, run_analysis_verification


def test_analyze_cognitive_load_data(sample_data_path):
    """Test the main analysis function with sample data."""
    # Run analysis on sample data
    results = analyze_cognitive_load_data(sample_data_path)
    
    # Check that the function returns expected components
    assert 'complexity_impact' in results
    assert 'single_vs_combined' in results
    assert 'cognitive_thresholds' in results
    assert 'plot_complexity_vs_time' in results
    
    # Test plot generation
    time_plot = results['plot_complexity_vs_time']()
    assert isinstance(time_plot, plt.Figure)
    plt.close(time_plot)
    
    accuracy_plot = results['plot_complexity_vs_accuracy']()
    assert isinstance(accuracy_plot, plt.Figure)
    plt.close(accuracy_plot)
    
    # Check threshold detection
    thresholds = results['cognitive_thresholds']
    assert isinstance(thresholds, dict)
    for construct in ['loop', 'branch', 'mixed']:
        assert construct in thresholds


def test_synthetic_data_verification():
    """Test the verification process with synthetic data."""
    # Run the verification tests
    results = run_analysis_verification()
    
    # Check results structure
    assert 'test_results' in results
    assert 'diagnostic_plots' in results
    
    # Verify tests passed
    assert results['test_results']['all_tests_passed'] is True
    
    # Check key test components
    test_details = results['test_results']['test_details']
    assert 'Cognitive_Load_Complexity_Correlation' in test_details
    assert 'SVD_Variance_Capture' in test_details
    assert 'Threshold_Detection' in test_details
    
    # Verify plots were generated
    for plot_name, plot in results['diagnostic_plots'].items():
        assert isinstance(plot, plt.Figure)
        plt.close(plot)

