function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name == query.name);
    }
    return filteredResults;
}

async function searchFormHandler(event) {
    event.preventDefault();

    // variable to capture input from drop down
    const type = document.querySelector('select[name="type"]').value;
    const location = document.querySelector('select[name="location"]').value;

    let typeSearch;
    let locationSearch;

    if (type === "Choose Species") {
        typeSearch = ''
    } else {
        typeSearch = type
    }

    if (location === "Choose Location") {
        locationSearch = ''
    } else {
        locationSearch = location
    }

    const searchObject = { typeSearch, locationSearch };
    console.log(searchObject)

    let queryUrl = '/api/posts?';
    
    // formData will be passed through the Object.entries() method to create query parameters
    Object.entries(searchObject).forEach(([key, value]) => {
      queryUrl += `${key}=${value}&`;
    });

    console.log(queryUrl)

    await fetch(queryUrl, {
        method: 'GET',
        body: JSON.stringify({
            type,
            location
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // display results
            console.log(response)
        } else {
            alert(response.statusText);
        }
    })
}

document.querySelector('.search-form').addEventListener('submit', searchFormHandler);