"""Command line interface for the cognitive load analysis tool."""

import argparse
import sys
import os
import pandas as pd
import matplotlib.pyplot as plt
from .analyzer import analyze_cognitive_load_data, run_analysis_verification


def main():
    """Run the cognitive load analysis tool."""
    parser = argparse.ArgumentParser(
        description="Analyze cognitive load in programming constructs."
    )
    parser.add_argument(
        "--data", "-d", 
        help="Path to the CSV file containing study data"
    )
    parser.add_argument(
        "--test", "-t", 
        action="store_true",
        help="Run verification tests with synthetic data"
    )
    parser.add_argument(
        "--output", "-o",
        help="Directory to save output plots (default: ./output)",
        default="./output"
    )
    parser.add_argument(
        "--show-plots", "-s",
        action="store_true",
        help="Show plots instead of saving them"
    )
    
    args = parser.parse_args()
    
    if args.test:
        print("Running verification tests...")
        results = run_analysis_verification()
        print(f"All tests passed: {results['test_results']['all_tests_passed']}")
        print("Test details:")
        for test_name, test_details in results['test_results']['test_details'].items():
            print(f"  {test_name}: {test_details}")
        
        if args.show_plots:
            for plot_name, plot in results['diagnostic_plots'].items():
                plt.figure(plot.number)
                plt.show()
        else:
            # Create output directory if it doesn't exist
            os.makedirs(args.output, exist_ok=True)
            # Save plots
            for plot_name, plot in results['diagnostic_plots'].items():
                plt.figure(plot.number)
                plt.savefig(os.path.join(args.output, f"{plot_name}.png"))
                print(f"Saved {plot_name}.png to {args.output}")
            
        return 0
        
    elif args.data:
        if not os.path.exists(args.data):
            print(f"Error: File not found: {args.data}")
            return 1
            
        print(f"Analyzing data from {args.data}...")
        results = analyze_cognitive_load_data(args.data)
        
        # Generate and show/save all plots
        plots = {
            'complexity_vs_time': results['plot_complexity_vs_time'](),
            'complexity_vs_accuracy': results['plot_complexity_vs_accuracy'](),
            'pca': results['plot_pca']()[2],
            'svd_components': results['plot_svd_components'](),
            'fft_results': results['plot_fft_results']()
        }
        
        # Print threshold results
        print("\nCognitive Load Thresholds:")
        for construct, threshold in results['cognitive_thresholds'].items():
            print(f"  {construct.capitalize()}: {threshold}")
            
        if args.show_plots:
            for plot_name, plot in plots.items():
                plt.figure(plot.number)
                plt.show()
        else:
            # Create output directory if it doesn't exist
            os.makedirs(args.output, exist_ok=True)
            # Save plots
            for plot_name, plot in plots.items():
                plt.figure(plot.number)
                plt.savefig(os.path.join(args.output, f"{plot_name}.png"))
                print(f"Saved {plot_name}.png to {args.output}")
                
        return 0
    
    else:
        parser.print_help()
        return 0


if __name__ == "__main__":
    sys.exit(main())
