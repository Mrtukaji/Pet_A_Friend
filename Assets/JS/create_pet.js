document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('createPetForm');
    const steps = document.querySelectorAll('.form-step');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');
    const imageInput = document.getElementById('petImage');
    const imagePreview = document.getElementById('imagePreview');

    let currentStep = 0;

    // Image preview functionality
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Navigation functions
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update navigation buttons
        prevButton.style.display = stepIndex === 0 ? 'none' : 'flex';
        nextButton.style.display = stepIndex === steps.length - 1 ? 'none' : 'flex';
        submitButton.style.display = stepIndex === steps.length - 1 ? 'flex' : 'none';
    }

    function nextStep() {
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
        }
    }

    function prevStep() {
        currentStep--;
        showStep(currentStep);
    }

    // Validation function
    function validateCurrentStep() {
        const currentStepElement = steps[currentStep];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields before proceeding.');
        }

        return isValid;
    }

    // Event listeners for navigation
    nextButton.addEventListener('click', nextStep);
    prevButton.addEventListener('click', prevStep);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateCurrentStep()) {
            // Collect form data
            const formData = new FormData(form);
            const petData = {
                name: formData.get('petName'),
                type: formData.get('petType'),
                breed: formData.get('petBreed'),
                age: formData.get('petAge'),
                ageUnit: formData.get('ageUnit'),
                description: formData.get('petDescription'),
                traits: formData.getAll('traits'),
                activities: formData.getAll('activities'),
                exerciseNeeds: formData.get('exerciseNeeds'),
                groomingNeeds: formData.get('groomingNeeds'),
                specialNotes: formData.get('specialNotes'),
                image: imagePreview.src
            };

            // Here you would typically send the data to a server
            console.log('Pet Data:', petData);
            
            // Show success message
            alert('Pet created successfully! 🎉');
            
            // Redirect to pets page
            window.location.href = './pets.html';
        }
    });

    // Add visual feedback for form fields
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}); 