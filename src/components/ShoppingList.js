import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //update state by passing the array of items to setItems
  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((r) => r.json())
    .then((items) => setItems(items));
  }, []);

  //add this callback function
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id){
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems)
    console.log("In ShoppingCart:", updatedItem);
  }

  // add this function
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
    console.log("shoppingList", newItem);
    
  }

  function handleCategoryChange(category) {
setSelectedCategory(category);
    
}

  const itemsToDisplay = items.filter((items) => {
    if (selectedCategory === "All") return true;

    return items.category === selectedCategory;
  } );

  return (
    <div className="ShoppingList">
      {/* add the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/*pass it as a prop to item */}
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
        }

//Add useEffect hook
  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((r) => r.json())
    .then((items) => console.log(items));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

    return (

    <div className="ShoppingList">
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
                      

export default ShoppingList;
