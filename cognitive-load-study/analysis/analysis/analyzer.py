import numpy as np
import pandas as pd
from scipy import stats, fft
from sklearn.decomposition import PCA, TruncatedSVD
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns

def analyze_cognitive_load_data(data_path):
    """
    Comprehensive analysis of cognitive load data from programming construct study
    
    Parameters:
    data_path (str): Path to the CSV file containing aggregated study data
    
    Returns:
    dict: Dictionary containing analysis results
    """
    # Load the aggregated CSV data
    df = pd.read_csv(data_path)
    
    # 1. Basic descriptive statistics controlling for programming frequency
    # Convert programming_frequency to a numeric scale if needed
    freq_mapping = {'daily': 5, 'few_times_a_week': 4, 'weekly': 3, 'monthly': 2, 'rarely': 1}
    if df['programming_frequency'].dtype == 'object':
        df['coding_freq_numeric'] = df['programming_frequency'].map(freq_mapping)
    
    # 2. Normalize response times within participants 
    # and control for programming frequency using regression residuals
    participant_groups = df.groupby('participant_id')
    df['response_time_normalized'] = np.nan
    
    for participant_id, group in participant_groups:
        # Simple linear regression to control for frequency effect
        X = group[['coding_freq_numeric']]
        y = group['response_time_ms']
        
        # If all frequency values are the same for this participant, just standardize
        if X['coding_freq_numeric'].nunique() == 1:
            residuals = (y - y.mean()) / y.std()
        else:
            # Otherwise, get residuals from regression
            from sklearn.linear_model import LinearRegression
            model = LinearRegression().fit(X, y)
            predicted = model.predict(X)
            residuals = (y - predicted) / y.std()
            
        df.loc[group.index, 'response_time_normalized'] = residuals
    
    # 3. Analyze how cognitive load increases with complexity - using properly named columns
    # First, calculate the metrics we want
    complex_metrics = []
    for (ctype, clevel), group in df.groupby(['construct_type', 'complexity_level']):
        complex_metrics.append({
            'construct_type': ctype,
            'complexity_level': clevel,
            'rt_mean': group['response_time_normalized'].mean(),
            'rt_std': group['response_time_normalized'].std(),
            'rt_sem': group['response_time_normalized'].sem(),
            'correct_mean': group['correct'].mean(),
            'correct_std': group['correct'].std(),
            'correct_sem': group['correct'].sem()
        })
    complexity_impact = pd.DataFrame(complex_metrics)
    
    # 4. Compare single vs. combined constructs (for complexity levels 1-3)
    # Again using properly named columns
    construct_metrics = []
    for ctype, group in df[df['complexity_level'] <= 3].groupby('construct_type'):
        construct_metrics.append({
            'construct_type': ctype,
            'rt_mean': group['response_time_normalized'].mean(),
            'rt_std': group['response_time_normalized'].std(),
            'rt_sem': group['response_time_normalized'].sem(),
            'correct_mean': group['correct'].mean(),
            'correct_std': group['correct'].std(),
            'correct_sem': group['correct'].sem()
        })
    single_vs_combined = pd.DataFrame(construct_metrics)
    
    # 5. SVD Analysis - Dimensionality Reduction
    # Create a matrix where rows are participants and columns are response times for each task
    pivot_matrix = df.pivot_table(
        index='participant_id', 
        columns=['construct_type', 'complexity_level'],
        values='response_time_normalized'
    ).fillna(0)
    
    # Apply SVD
    svd = TruncatedSVD(n_components=min(10, pivot_matrix.shape[1] - 1))
    svd_result = svd.fit_transform(pivot_matrix)
    svd_components = svd.components_
    explained_variance = svd.explained_variance_ratio_
    
    # 6. Fourier Transform Analysis
    # For each participant, analyze their response time pattern across increasing complexity
    fourier_results = {}
    
    for construct in df['construct_type'].unique():
        construct_data = df[df['construct_type'] == construct]
        
        # Get average response pattern by complexity
        avg_by_complexity = construct_data.groupby('complexity_level')['response_time_normalized'].mean()
        
        # Need at least 2 points for FFT
        if len(avg_by_complexity) >= 2:
            # Pad with zeros to improve FFT resolution
            padded = np.zeros(16)
            padded[:len(avg_by_complexity)] = avg_by_complexity.values
            
            # Apply FFT
            fft_result = fft.fft(padded)
            fft_freq = fft.fftfreq(len(padded))
            
            # Store magnitudes of frequencies
            fourier_results[construct] = np.abs(fft_result)
    
    # 7. Create visualization functions - using clear column names
    def plot_complexity_vs_time():
        """Plot response time vs complexity level by construct type"""
        plt.figure(figsize=(10, 6))
        
        for construct in df['construct_type'].unique():
            construct_data = complexity_impact[complexity_impact['construct_type'] == construct]
            plt.errorbar(
                construct_data['complexity_level'], 
                construct_data['rt_mean'],
                yerr=construct_data['rt_sem'],
                marker='o', 
                label=construct.capitalize()
            )
            
        plt.xlabel('Complexity Level (Nesting Depth)')
        plt.ylabel('Normalized Response Time')
        plt.title('Cognitive Load by Construct Type and Complexity')
        plt.legend()
        plt.grid(True, linestyle='--', alpha=0.7)
        
        return plt.gcf()
    
    def plot_complexity_vs_accuracy():
        """Plot accuracy vs complexity level by construct type"""
        plt.figure(figsize=(10, 6))
        
        for construct in df['construct_type'].unique():
            construct_data = complexity_impact[complexity_impact['construct_type'] == construct]
            plt.errorbar(
                construct_data['complexity_level'], 
                construct_data['correct_mean'] * 100,  # Convert to percentage
                yerr=construct_data['correct_sem'] * 100,
                marker='o', 
                label=construct.capitalize()
            )
            
        plt.xlabel('Complexity Level (Nesting Depth)')
        plt.ylabel('Accuracy (%)')
        plt.title('Accuracy by Construct Type and Complexity')
        plt.legend()
        plt.grid(True, linestyle='--', alpha=0.7)
        
        return plt.gcf()
    
    def plot_pca(components_to_plot=(0, 1)):
        """Plot the data across any two principal components"""
        pca = PCA(n_components=min(pivot_matrix.shape[1], 10))
        pca_result = pca.fit_transform(pivot_matrix)
        
        # Create dataframe for plotting
        plot_df = pd.DataFrame({
            'PC1': pca_result[:, components_to_plot[0]],
            'PC2': pca_result[:, components_to_plot[1]],
            'participant_id': pivot_matrix.index
        })
        
        # Join with original data to get metadata for coloring
        meta_df = df.groupby('participant_id')['programming_frequency'].first().reset_index()
        plot_df = plot_df.merge(meta_df, on='participant_id')
        
        # Create the plot
        plt.figure(figsize=(10, 8))
        sns.scatterplot(data=plot_df, x='PC1', y='PC2', hue='programming_frequency')
        plt.title(f'PCA: PC{components_to_plot[0]+1} vs PC{components_to_plot[1]+1}')
        plt.xlabel(f'Principal Component {components_to_plot[0]+1} ({pca.explained_variance_ratio_[components_to_plot[0]]:.2%} variance)')
        plt.ylabel(f'Principal Component {components_to_plot[1]+1} ({pca.explained_variance_ratio_[components_to_plot[1]]:.2%} variance)')
        plt.tight_layout()
        
        return pca, pca_result, plt.gcf()
    
    def plot_svd_components():
        """Plot the SVD components to understand patterns"""
        n_components = len(svd_components)
        fig, axes = plt.subplots(n_components, 1, figsize=(12, 3*n_components))
        
        # Get column names for interpretation
        column_names = list(pivot_matrix.columns)
        
        for i, (component, ax) in enumerate(zip(svd_components, axes)):
            ax.bar(range(len(component)), component)
            ax.set_title(f'SVD Component {i+1} ({explained_variance[i]:.2%} explained variance)')
            ax.set_xticks(range(len(component)))
            ax.set_xticklabels(column_names, rotation=90)
            ax.grid(True, linestyle='--', alpha=0.7)
        
        plt.tight_layout()
        return plt.gcf()
    
    def plot_fft_results():
        """Plot FFT results to identify cyclic patterns"""
        plt.figure(figsize=(12, 6))
        
        for construct, fft_result in fourier_results.items():
            # Only plot the first half (positive frequencies)
            half_len = len(fft_result) // 2
            plt.plot(range(half_len), fft_result[:half_len], label=construct.capitalize())
            
        plt.xlabel('Frequency Component')
        plt.ylabel('Magnitude')
        plt.title('Fourier Analysis of Cognitive Load Patterns')
        plt.legend()
        plt.grid(True, linestyle='--', alpha=0.7)
        
        return plt.gcf()
    
    # Statistical testing for cognitive load thresholds
    def find_cognitive_load_thresholds():
        """Find the thresholds where cognitive load significantly increases"""
        thresholds = {}
        
        for construct in df['construct_type'].unique():
            construct_data = df[df['construct_type'] == construct]
            complexity_levels = sorted(construct_data['complexity_level'].unique())
            
            # Need at least 2 complexity levels
            if len(complexity_levels) < 2:
                continue
                
            threshold_found = False
            threshold_level = None
            
            # Compare each adjacent pair of complexity levels
            for i in range(len(complexity_levels)-1):
                level1 = complexity_levels[i]
                level2 = complexity_levels[i+1]
                
                data1 = construct_data[construct_data['complexity_level'] == level1]['response_time_normalized']
                data2 = construct_data[construct_data['complexity_level'] == level2]['response_time_normalized']
                
                # T-test to see if the difference is significant
                t_stat, p_value = stats.ttest_ind(data1, data2, equal_var=False)
                
                # If significant increase and mean is actually higher
                if p_value < 0.05 and data2.mean() > data1.mean():
                    if not threshold_found:
                        threshold_level = level2
                        threshold_found = True
            
            if threshold_found:
                thresholds[construct] = threshold_level
            else:
                thresholds[construct] = "No clear threshold found"
                
        return thresholds
    
    # Run the threshold analysis
    cognitive_thresholds = find_cognitive_load_thresholds()
    
    # Return all the analysis results
    return {
        'complexity_impact': complexity_impact,
        'single_vs_combined': single_vs_combined,
        'svd_result': svd_result,
        'svd_components': svd_components,
        'explained_variance': explained_variance,
        'fourier_results': fourier_results,
        'plot_complexity_vs_time': plot_complexity_vs_time,
        'plot_complexity_vs_accuracy': plot_complexity_vs_accuracy,
        'plot_pca': plot_pca,
        'plot_svd_components': plot_svd_components,
        'plot_fft_results': plot_fft_results,
        'cognitive_thresholds': cognitive_thresholds
    }

# Test function with synthetic data to verify analysis correctness
def run_analysis_verification():
    """
    Test the analysis functions with synthetic data that has known patterns.
    This allows verification of the analysis methods before applying to real data.
    
    Returns:
    dict: Test results including pass/fail status and diagnostic information
    """
    print("Running analysis verification tests with synthetic data...")
    
    # Generate synthetic test data with known patterns
    np.random.seed(42)  # For reproducibility
    
    # Parameters for synthetic data
    num_participants = 30
    construct_types = ['loop', 'branch', 'mixed']
    complexity_levels = {
        'loop': [1, 2, 3, 4, 5],
        'branch': [1, 2, 3, 4, 5],
        'mixed': [1, 2, 3]
    }
    programming_freqs = ['daily', 'few_times_a_week', 'weekly', 'monthly', 'rarely']
    
    # Create empty dataframe
    test_data = []
    
    # Participant IDs
    participant_ids = [f'p{i+1:02d}' for i in range(num_participants)]
    
    # Generate response times with known patterns:
    # 1. Linear increase with complexity for loops
    # 2. Exponential increase for branches
    # 3. Superadditive effect for mixed
    # 4. Threshold effect at level 3 for all constructs
    
    for p_id in participant_ids:
        # Assign random programming frequency
        prog_freq = np.random.choice(programming_freqs)
        
        # Base response time for this participant (individual differences)
        base_time = np.random.normal(1000, 200)
        
        for c_type in construct_types:
            for level in complexity_levels[c_type]:
                # Different patterns by construct type
                if c_type == 'loop':
                    # Linear increase
                    mean_time = base_time + (level * 200)
                    threshold_effect = 1.0 if level < 3 else 1.5
                elif c_type == 'branch':
                    # Exponential increase
                    mean_time = base_time + (level ** 1.5 * 150)
                    threshold_effect = 1.0 if level < 3 else 1.7
                else:  # mixed
                    # Superadditive
                    mean_time = base_time + (level ** 2 * 180)
                    threshold_effect = 1.0 if level < 2 else 1.8
                
                # Apply threshold effect
                mean_time *= threshold_effect
                
                # Add noise
                response_time = np.random.normal(mean_time, mean_time * 0.15)
                
                # Determine correctness (decreases with complexity)
                p_correct = max(0.5, 0.95 - (level * 0.08))
                is_correct = np.random.random() < p_correct
                
                # Add to dataset
                test_data.append({
                    'participant_id': p_id,
                    'construct_type': c_type,
                    'complexity_level': level,
                    'programming_frequency': prog_freq,
                    'response_time_ms': response_time,
                    'correct': int(is_correct)  # Make sure correctness is 0 or 1
                })
    
    # Convert to DataFrame
    test_df = pd.DataFrame(test_data)
    
    # Save to temporary CSV
    import tempfile
    with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as temp_file:
        test_df.to_csv(temp_file.name, index=False)
        temp_path = temp_file.name
    
    # Run the analysis on synthetic data
    results = analyze_cognitive_load_data(temp_path)
    
    # Verification tests
    test_results = {
        'all_tests_passed': True,
        'test_details': {}
    }
    
    # Test 1: Verify cognitive load increases with complexity
    test_name = "Cognitive_Load_Complexity_Correlation"
    complexity_impact = results['complexity_impact']
    
    correlation_tests = {}
    for c_type in construct_types:
        construct_data = complexity_impact[complexity_impact['construct_type'] == c_type]
        if len(construct_data) >= 2:  # Need at least 2 points for correlation
            correlation, p_value = stats.pearsonr(
                construct_data['complexity_level'], 
                construct_data['rt_mean']
            )
            correlation_tests[c_type] = {
                'correlation': correlation,
                'p_value': p_value,
                'passed': correlation > 0.7 and p_value < 0.05
            }
            if not correlation_tests[c_type]['passed']:
                test_results['all_tests_passed'] = False
    
    test_results['test_details'][test_name] = correlation_tests
    
    # Test 2: Verify SVD captures variance
    test_name = "SVD_Variance_Capture"
    total_explained_variance = sum(results['explained_variance'])
    test_passed = total_explained_variance > 0.8  # Should explain at least 80% of variance
    
    test_results['test_details'][test_name] = {
        'total_explained_variance': total_explained_variance,
        'passed': test_passed
    }
    
    if not test_passed:
        test_results['all_tests_passed'] = False
    
    # Test 3: Verify threshold detection
    test_name = "Threshold_Detection"
    thresholds = results['cognitive_thresholds']
    threshold_tests = {}
    
    # We expect thresholds around level 3 for loop and branch, and level 2 for mixed
    expected_thresholds = {'loop': 3, 'branch': 3, 'mixed': 2}
    
    for c_type, expected in expected_thresholds.items():
        if c_type in thresholds:
            actual = thresholds[c_type]
            if actual == "No clear threshold found":
                passed = False
            else:
                # Allow for ±1 level tolerance
                passed = abs(actual - expected) <= 1
            
            threshold_tests[c_type] = {
                'expected': expected,
                'actual': actual,
                'passed': passed
            }
            
            if not passed:
                test_results['all_tests_passed'] = False
    
    test_results['test_details'][test_name] = threshold_tests
    
    # Test 4: Check mixed constructs show higher cognitive load than individual constructs
    test_name = "Mixed_Construct_Superadditivity"
    
    # Filter data for comparison (at levels 1-3 where all construct types exist)
    single_vs_combined = results['single_vs_combined']
    
    # Verify mixed has higher mean response time
    if 'mixed' in single_vs_combined['construct_type'].values:
        mixed_data = single_vs_combined[single_vs_combined['construct_type'] == 'mixed']
        loop_data = single_vs_combined[single_vs_combined['construct_type'] == 'loop']
        branch_data = single_vs_combined[single_vs_combined['construct_type'] == 'branch']
        
        if not mixed_data.empty and not loop_data.empty and not branch_data.empty:
            mixed_mean = mixed_data['rt_mean'].values[0]
            loop_mean = loop_data['rt_mean'].values[0]
            branch_mean = branch_data['rt_mean'].values[0]
            
            # Mixed should have higher cognitive load than either loop or branch alone
            passed = mixed_mean > loop_mean and mixed_mean > branch_mean
            
            test_results['test_details'][test_name] = {
                'mixed_mean': mixed_mean,
                'loop_mean': loop_mean,
                'branch_mean': branch_mean,
                'passed': passed
            }
            
            if not passed:
                test_results['all_tests_passed'] = False
    
    # Clean up the temporary file
    import os
    os.unlink(temp_path)
    
    # Generate diagnostic plots
    plots = {
        'complexity_vs_time': results['plot_complexity_vs_time'](),
        'complexity_vs_accuracy': results['plot_complexity_vs_accuracy'](),
        'pca': results['plot_pca']()[2],
        'svd_components': results['plot_svd_components'](),
        'fft_results': results['plot_fft_results']()
    }
    
    # Return test results and plots
    return {
        'test_results': test_results,
        'diagnostic_plots': plots
    }

# Example usage:
# results = analyze_cognitive_load_data('study_data.csv')
# time_plot = results['plot_complexity_vs_time']()
# accuracy_plot = results['plot_complexity_vs_accuracy']()
# pca, pca_result, pca_plot = results['plot_pca']()
# print(f"Cognitive load thresholds: {results['cognitive_thresholds']}")
#
# # Run verification tests
#test_results = run_analysis_verification()
# visualize the Principal component Analysis
#test_results['diagnostic_plots']['pca']
#plt.show()
#print(f"All tests passed: {test_results['test_results']['all_tests_passed']}")
#print(f"Test details: {test_results['test_results']['test_details']}")
