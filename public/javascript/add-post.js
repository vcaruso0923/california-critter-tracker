async function newFormHandler(event) {
    event.preventDefault();

    // variable to capture input from drop down
    const species = document.querySelector('select[name="type"]').value;
    const location = document.querySelector('select[name="location"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            type,
            location
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);