import React, { useState } from 'react';

const DemographicForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    programmingFrequency: '',
    preferredLanguage: ''
  });
  
  const [errors, setErrors] = useState({
    programmingFrequency: false,
    preferredLanguage: false
  });

  const programmingFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'few_times_a_week', label: 'A few times a week' },
    { value: 'weekly', label: 'Once a week' },
    { value: 'monthly', label: 'A few times a month' },
    { value: 'rarely', label: 'Rarely' }
  ];

  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C/C++' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    setErrors({
      ...errors,
      [name]: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      programmingFrequency: !formData.programmingFrequency,
      preferredLanguage: !formData.preferredLanguage
    };
    
    setErrors(newErrors);
    
    // If no errors, submit the form
    if (!newErrors.programmingFrequency && !newErrors.preferredLanguage) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Programming Background</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            How often do you program?
          </label>
          <div className="space-y-2">
            {programmingFrequencyOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`freq-${option.value}`}
                  name="programmingFrequency"
                  value={option.value}
                  checked={formData.programmingFrequency === option.value}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`freq-${option.value}`}
                  className="ml-3 text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.programmingFrequency && (
            <p className="mt-2 text-sm text-red-600">Please select how often you program</p>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            What is your preferred programming language?
          </label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className={`block w-full px-4 py-3 border ${
              errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
          >
            <option value="">Select a language</option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.preferredLanguage && (
            <p className="mt-2 text-sm text-red-600">Please select your preferred programming language</p>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md w-full md:w-auto"
          >
            Continue to Study
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>This information will be used only for research purposes and will not be linked to any personally identifiable information.</p>
      </div>
    </div>
  );
};

export default DemographicForm;