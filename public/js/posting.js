const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".product").value.trim();
  const category = document.querySelector(".publisher").value.trim();
  const system = document.querySelector(".system").value.trim();
  const genre = document.querySelector(".genre").value.trim();
  const condition = document.querySelector(".condition").value.trim();
  const price = document.querySelector(".price").value.trim();
  const description = document.querySelector(".desc").value.trim();

  console.log(title);
  console.log(description);

  if (title && category && condition && price && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        system,
        genre,
        condition,
        price,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create project");
    }
  }
};

document
  .querySelector(".createPost")
  .addEventListener("submit", newPostHandler);
