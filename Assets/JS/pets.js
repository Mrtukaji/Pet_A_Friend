document.addEventListener('DOMContentLoaded', function() {
    // Sample user-created pets data (in a real app, this would come from a server)
    const userPets = [
        {
            id: 1,
            name: "Luna",
            type: "cat",
            description: "Playful and curious",
            image: "../Assets/Images/zeus.jpg",
            age: 2,
            traits: ["friendly", "playful"],
            createdAt: "2024-03-20"
        },
        {
            id: 2,
            name: "Max",
            type: "dog",
            description: "Loyal and energetic",
            image: "../Assets/Images/buddy.jpg",
            age: 3,
            traits: ["friendly", "energetic"],
            createdAt: "2024-03-19"
        }
        // Add more pets as needed
    ];

    const userPetsContainer = document.getElementById('userPetsContainer');
    const petTypeFilter = document.getElementById('petTypeFilter');
    const sortFilter = document.getElementById('sortFilter');

    // Function to create a pet card
    function createPetCard(pet) {
        return `
            <a href="./pets/${pet.id}.html" class="pet-card-link">
                <div class="pet-card">
                    <div class="pet-image">
                        <img src="${pet.image}" alt="${pet.name}">
                    </div>
                    <h4>${pet.name}</h4>
                    <p>${pet.description}</p>
                    <div class="pet-details">
                        <span class="pet-type">${pet.type}</span>
                        <span class="pet-age">${pet.age} years</span>
                    </div>
                </div>
            </a>
        `;
    }

    // Function to filter and sort pets
    function updatePetDisplay() {
        let filteredPets = [...userPets];
        
        // Filter by type
        const selectedType = petTypeFilter.value;
        if (selectedType !== 'all') {
            filteredPets = filteredPets.filter(pet => pet.type === selectedType);
        }
        
        // Sort pets
        const sortBy = sortFilter.value;
        switch(sortBy) {
            case 'newest':
                filteredPets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                filteredPets.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'name':
                filteredPets.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        // Update display
        userPetsContainer.innerHTML = filteredPets.map(createPetCard).join('');
    }

    // Add event listeners for filters
    petTypeFilter.addEventListener('change', updatePetDisplay);
    sortFilter.addEventListener('change', updatePetDisplay);

    // Initial display
    updatePetDisplay();
}); 