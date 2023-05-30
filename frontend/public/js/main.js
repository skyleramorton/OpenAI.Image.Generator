const msgElement = document.querySelector('.msg');
const imageElement = document.querySelector('#image');
const promptElement = document.querySelector('#prompt');
const sizeElement = document.querySelector('#size');
const spinnerElement = document.querySelector('.spinner');

function onSubmit(e) {
    e.preventDefault();
    msgElement.textContent = '';
    imageElement.src = '';

    const prompt = promptElement.value;
    const size = sizeElement.value;

    if (prompt === '' || size === '') {
        alert('Please enter all fields');
        return;
    }
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();
        const response = await fetch('/openai/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, size }),
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error(`That image could not be generated`);
        }

        const data = await response.json();
        const imageUrl = data.data;
        imageElement.src = imageUrl;
    } catch (error) {
        msgElement.textContent = error;
    } finally {
        removeSpinner();
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
