const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const category = document.querySelector('#category').value.trim();
    const system = document.querySelector('#system').value.trim();
    const condition = document.querySelector('#condition').value.trim();
    const price = document.querySelector('#price').value.trim();
    const description = document.querySelector('#desc').value.trim();
  
    if (title && category && condition && price && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, category, system, condition, price, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };

  document
    .querySelector('.posting-form')
    .addEventListener('submit', newPostHandler);