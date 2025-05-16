from setuptools import setup, find_packages

setup(
    name="cognitive-load-analysis",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "numpy>=1.20.0",
        "pandas>=1.3.0",
        "scipy>=1.7.0",
        "scikit-learn>=1.0.0",
        "matplotlib>=3.4.0",
        "seaborn>=0.11.0",
    ],
    entry_points={
        "console_scripts": [
            "analyze-load=analysis.cli:main",
        ],
    },
)
