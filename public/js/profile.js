const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const category = document.querySelector('#category').value.trim();
    const condition = document.querySelector('#condition').value.trim();
    const price = document.querySelector('#price').value.trim();
    const description = document.querySelector('#desc').value.trim();
  
    if (title && category && condition && price && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, category, condition, price, description }),
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
  
      const response = await fetch(`/api/posts/${id}`, {
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
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.posts-list')
    .addEventListener('click', delButtonHandler);
  