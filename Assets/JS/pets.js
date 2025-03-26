document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const myPetsContainer = document.getElementById('myPetsContainer');
    const noPetsMessage = document.getElementById('noPetsMessage');
    const communityPetsContainer = document.getElementById('communityPetsContainer');
    const petTypeFilter = document.getElementById('petTypeFilter');
    const sortFilter = document.getElementById('sortFilter');

    // Load pets from localStorage
    function loadMyPets() {
        const myPets = JSON.parse(localStorage.getItem('myPets')) || [];
        
        if (myPets.length === 0) {
            noPetsMessage.style.display = 'block';
            return;
        }

        noPetsMessage.style.display = 'none';
        myPetsContainer.innerHTML = '';

        myPets.forEach(pet => {
            const petCard = createPetCard(pet, true);
            myPetsContainer.appendChild(petCard);
        });
    }

    // Create a pet card element
    function createPetCard(pet, isMyPet = false) {
        const card = document.createElement('div');
        card.className = 'pet-card';
        
        const link = document.createElement('a');
        link.href = `./pets/${pet.id}.html`;
        link.className = 'pet-card-link';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'pet-image';
        
        const img = document.createElement('img');
        img.src = pet.image;
        img.alt = `${pet.name} the ${pet.type}`;
        
        const title = document.createElement('h4');
        title.textContent = pet.name;
        
        const description = document.createElement('p');
        description.textContent = `${pet.type} • ${pet.age} ${pet.ageUnit}`;

        imageDiv.appendChild(img);
        link.appendChild(imageDiv);
        link.appendChild(title);
        link.appendChild(description);
        card.appendChild(link);

        return card;
    }

    // Filter and sort pets
    function filterAndSortPets(pets, typeFilter, sortBy) {
        let filteredPets = [...pets];

        // Apply type filter
        if (typeFilter !== 'all') {
            filteredPets = filteredPets.filter(pet => pet.type === typeFilter);
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filteredPets.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'oldest':
                filteredPets.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case 'name':
                filteredPets.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filteredPets;
    }

    // Update community pets display
    function updateCommunityPets() {
        const typeFilter = petTypeFilter.value;
        const sortBy = sortFilter.value;
        
        // Get community pets from localStorage (for demo purposes)
        const communityPets = JSON.parse(localStorage.getItem('communityPets')) || [];
        const filteredPets = filterAndSortPets(communityPets, typeFilter, sortBy);
        
        communityPetsContainer.innerHTML = '';
        
        if (filteredPets.length === 0) {
            communityPetsContainer.innerHTML = `
                <div class="no-pets-message">
                    <i class="fas fa-search"></i>
                    <p>No pets found matching your criteria</p>
                </div>
            `;
            return;
        }

        filteredPets.forEach(pet => {
            const petCard = createPetCard(pet);
            communityPetsContainer.appendChild(petCard);
        });
    }

    // Event listeners
    petTypeFilter.addEventListener('change', updateCommunityPets);
    sortFilter.addEventListener('change', updateCommunityPets);

    // Initial load
    loadMyPets();
    updateCommunityPets();
}); 