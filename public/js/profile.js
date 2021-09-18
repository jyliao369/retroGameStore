const newFormHandler = async (event) => {
    event.preventDefault();
<<<<<<< HEAD

    const title = document.querySelector('#title').value.trim();
    const category = document.querySelector('#category').value.trim();
    const condition = document.querySelector('#condition').value.trim();
    const price = document.querySelector('#price').value.trim();
    const description = document.querySelector('#desc').value.trim();
=======
  
    const name = document.querySelector('#project-name').value.trim();
    const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
>>>>>>> 06b753bffa0b4bfff655fbb4928ead6a9c112203
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
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
  
  const delButtonHandler = async (event) => {
    console.log("HIIIIIIIII");
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      console.log(typeof id);
      console.log(Number(id));
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.posts-list')
    .addEventListener('click', delButtonHandler);
  