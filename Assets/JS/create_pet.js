document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createPetForm');
    const imageInput = document.getElementById('petImage');
    const imagePreview = document.getElementById('imagePreview');

    // Handle image preview
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const petData = {
            name: formData.get('petName'),
            type: formData.get('petType'),
            age: formData.get('petAge'),
            description: formData.get('petDescription'),
            traits: Array.from(formData.getAll('traits')),
            image: imagePreview.src
        };

        // Here you would typically send the data to a server
        console.log('Pet Data:', petData);
        
        // Show success message
        alert('Pet created successfully! 🎉');
        
        // Reset form
        form.reset();
        imagePreview.src = '../Assets/Images/placeholder.png';
    });
}); 