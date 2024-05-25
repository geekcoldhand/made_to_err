//GWACH //Horatious Harris
const dragItems = document.querySelectorAll(".box");
const imageButtonItem = document.querySelectorAll(".img-button");

function randomizeDragItemPosition(items) {
  const container = document.getElementById("container");
  const containerBoundsRect = container.getBoundingClientRect();

  const maxX = containerBoundsRect.width - items.offsetWidth;
  const maxY = containerBoundsRect.height - items.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  items.style.left = `${randomX}px`;
  items.style.top = `${randomY}px`;
}

function populateBoxesWithDelay(items) {
  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 200); //lazy load
  });
}

populateBoxesWithDelay(dragItems);

const itemStateAndPosition = {};
dragItems.forEach((item, index) => {
  item.addEventListener("touchstart", (e) => {
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: e.clientX - item.offsetLeft,
      offsetY: e.clientY - item.offsetTop,
    };
  });
});

dragItems.forEach((item, index) => {
  item.addEventListener("mousedown", (e) => {
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: e.clientX - item.offsetLeft,
      offsetY: e.clientY - item.offsetTop,
    };
  });
});

// Add event listener for mousemove on the document
document.addEventListener("mousemove", (e) => {
  e.preventDefault();

  // Iterate over boxState object and update positions if dragging
  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    if (state.isDragging) {
      const item = dragItems[key];
      const x = e.clientX - state.offsetX;
      const y = e.clientY - state.offsetY;
      const container = document.getElementById("container");

      const maxX = container.offsetWidth - item.offsetWidth;
      const maxY = container.offsetHeight - item.offsetHeight;

      item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
      item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
    }
  });
});

document.addEventListener("mousemove", (e) => {
  e.preventDefault();

  // Iterate over boxState object and update positions if dragging
  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    if (state.isDragging) {
      const item = dragItems[key];
      const x = e.clientX - state.offsetX;
      const y = e.clientY - state.offsetY;
      const container = document.getElementById("container");

      const maxX = container.offsetWidth - item.offsetWidth;
      const maxY = container.offsetHeight - item.offsetHeight;

      item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
      item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
    }
  });
});
document.addEventListener("touchmove", (e) => {
  e.preventDefault();

  // Iterate over boxState object and update positions if dragging
  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    if (state.isDragging) {
      const item = dragItems[key];
      const x = e.clientX - state.offsetX;
      const y = e.clientY - state.offsetY;
      const container = document.getElementById("container");

      const maxX = container.offsetWidth - item.offsetWidth;
      const maxY = container.offsetHeight - item.offsetHeight;

      item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
      item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
    }
  });
});

// Add event listener for mouseup on the document
document.addEventListener("mouseup", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

document.addEventListener("touchend", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

const handleAddMetaData = async (e) => {
  e.preventDefault();

  const productId = e.target?.id;
  const date = Date.now();
  var today = new Date(date);

  const response = await fetch(
    `http://127.0.0.1:5000/products/${productId}/clicks`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    //document.location.replace("/");
  } else {
    alert("Failed to create post:::" + response.statusText);
  }
};

const handleShopProduct = (e) => {
  console.log("double clicked ");
};

imageButtonItem.forEach((itemElement) => {
  itemElement.addEventListener("click", handleAddMetaData);
  itemElement.addEventListener("dbclick", handleShopProduct);
});
