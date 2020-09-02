async function searchFormHandler(event) {
    event.preventDefault();

    // variable to capture input from drop down
    const type = document.querySelector('select[name="type"]').value;
    const location = document.querySelector('select[name="location"]').value;

    const searchObject = {};

    searchObject.type = type === "Choose Species" ? '' : type;
    searchObject.location = location === "Choose Location" ? '' : location;

    console.log(searchObject)

    let queryUrl = '/api/posts/?';

    // searchObject will be passed through the Object.entries() method to create query parameters
    Object.entries(searchObject).forEach(([key, value]) => {
        if (value) {
        queryUrl += `${key}=${value}&`;
        }
    });
    // removes the last element of the array, ie. the &
    queryUrl = queryUrl.slice(0, -1);
    console.log(queryUrl)

    await fetch(queryUrl, {
        method: 'GET',
        // body: JSON.stringify({
        //     type,
        //     location
        // }),
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