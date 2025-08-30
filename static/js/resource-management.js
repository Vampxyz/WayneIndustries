document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser.role !== "admin" && loggedUser.role !== "manager") {
    window.location.href = "/dashboard";
  }
  if (!loggedUser) {
    window.location.href = "/login";
  }
});

let resources = [];
let editingResourceId = null;

const resourcesContainer = document.getElementById("resources-container");
const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");
const filterModal = document.getElementById("filterModal");
const filterCheckboxes = document.getElementById("filter-checkboxes");
const labels = document.querySelectorAll("label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("");
});

const openModal = (id) => {
  document.getElementById(id).style.display = "flex";
};

const closeModal = (id) => {
  document.getElementById(id).style.display = "none";
};

const renderCards = (filteredResources) => {
  const listToRender = filteredResources || resources;

  resourcesContainer.innerHTML = listToRender
    .map(
      (resource) => `
        <div class="resource-card">
            <div class="card-header">
                <h3>${resource.name}</h3>

                <div class="card-actions">
                    <button class="edit-btn" onclick="openEditModal('${resource.ID}')">
                        <i class="fi fi-sr-pencil"></i>
                    </button>

                    <button class="delete-btn" onclick="openDeleteModal('${resource.ID}')">
                        <i class="fi fi-sr-trash"></i>
                    </button>
                </div>
            </div>
            
            <p>${resource.description}</p>
            <small>Category: ${resource.category}</small>
            <span>Quantity: ${resource.quantity}</span>
        </div>
    `
    )
    .join("");
};

const fetchAndRenderResources = async (filters = []) => {
  try {
    let url = "http://127.0.0.1:5000/api/resources";

    if (filters.length > 0) {
      const params = filters
        .map((category) => `category=${encodeURIComponent(category)}`)
        .join("&");
      url += `?${params}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    resources = data.resources;
    renderCards();

    if (filters.length === 0) {
      populateFilterModal();
    }
  } catch (err) {
    resourcesContainer.innerHTML = "<p>Erro ao carregar recursos.</p>";
    console.error(err);
  }
};

const populateFilterModal = () => {
  const categories = [...new Set(resources.map((res) => res.category))];
  filterCheckboxes.innerHTML = categories
    .map(
      (cat) => `
        <label>
            <input type="checkbox" name="category" value="${cat}" /> ${
        cat.charAt(0).toUpperCase() + cat.slice(1)
      }
        </label>
    `
    )
    .join("");
};

const applyFilters = () => {
  const checkboxes = document.querySelectorAll(
    'input[name="category"]:checked'
  );
  const selectedCategories = Array.from(checkboxes).map((cb) => cb.value);

  fetchAndRenderResources(selectedCategories);
  closeModal("filterModal");
};

const openEditModal = (id) => {
  editingResourceId = parseInt(id);
  const resourceToEdit = resources.find((res) => res.ID === editingResourceId);

  if (resourceToEdit) {
    document.getElementById("edit-name").value = resourceToEdit.name;
    document.getElementById("edit-description").value =
      resourceToEdit.description;
    document.getElementById("edit-category").value = resourceToEdit.category;
    document.getElementById("edit-quantity").value = resourceToEdit.quantity;
    openModal("editModal");
  }
};

const openDeleteModal = async (id) => {
  if (confirm("Are you sure you want to delete this resource?")) {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/resource/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        fetchAndRenderResources();
      } else {
        alert("Error deleting resource.");
      }
    } catch (err) {
      alert("Error on request. Try again.");
      console.error(err);
    }
  }
};

const addResource = async () => {
  const newResource = {
    name: document.getElementById("add-name").value,
    description: document.getElementById("add-description").value,
    category: document.getElementById("add-category").value,
    quantity: document.getElementById("add-quantity").value,
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResource),
    });

    const data = await res.json();

    if (data.success) {
      closeModal("addModal");

      fetchAndRenderResources();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Error adding resource.");

    console.error(err);
  }
};

const editResource = async () => {
  const updatedResource = {
    name: document.getElementById("edit-name").value,
    description: document.getElementById("edit-description").value,
    category: document.getElementById("edit-category").value,
    quantity: document.getElementById("edit-quantity").value,
  };

  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/resource/${editingResourceId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedResource),
      }
    );

    const data = await res.json();

    if (data.success) {
      closeModal("editModal");

      fetchAndRenderResources();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Error editing resource.");

    console.error(err);
  }
};

fetchAndRenderResources();