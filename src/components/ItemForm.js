import React, { useState } from "react";

// destructure the onAddItem prop
function ItemForm( {onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  // Add function to handle submissions
  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isIncart: false,
    };
    fetch("http://localhost:4000/items", { 
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(itemData),
  })

  // call the onAddItem prop with newItem
  .then((r) => r.json())
  .then((newItem) => console.log(newItem));
    console.log(itemData);
    console.log("name:", name);
    console.log("category:", category);
  }
     
  return (
    //set up the form to call handleSubmit when the form is submitted
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
