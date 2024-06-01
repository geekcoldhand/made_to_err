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
//multiple items add to list



  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 200); //staggered load
  });
}

//start
populateBoxesWithDelay(dragItems);
const itemStateAndPosition = {};




/**
 * Touch Event Start
 */
dragItems.forEach((item, index) => {
  item.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: e.touches[0].clientX - item.offsetLeft,
      offsetY: e.touches[0].clientY - item.offsetTop,
    };
  });
});

/**
 * Mouse Event Start
 */
dragItems.forEach((item, index) => {
  item.addEventListener("mousedown", (e) => {
    itemStateAndPosition[index] = {
      isDragging: true,
      offsetX: e.clientX - item.offsetLeft,
      offsetY: e.clientY - item.offsetTop,
    };
  });
});

/**
 * Touch Move 
 */
document.addEventListener("touchmove", (e) => {
  // Iterate over itemStateAndPosition object and update positions if dragging
  Object.keys(itemStateAndPosition).forEach((key) => {
    const state = itemStateAndPosition[key];
    if (state.isDragging) {
      e.preventDefault(); // Prevent scrolling on touch devices
      const item = dragItems[key];
      const x = e.touches[0].clientX - state.offsetX;
      const y = e.touches[0].clientY - state.offsetY;
      const container = document.getElementById("container");

      const maxX = container.offsetWidth - item.offsetWidth;
      const maxY = container.offsetHeight - item.offsetHeight;

      item.style.left = `${Math.min(Math.max(x, 0), maxX)}px`;
      item.style.top = `${Math.min(Math.max(y, 0), maxY)}px`;
    }
  });
});

/**
 * Mouse Move
 */
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

/**
 * Mouse Up End
 */
document.addEventListener("mouseup", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

/**
 * Touch End 
 */
document.addEventListener("touchend", () => {
  // Reset dragging state for all boxes
  Object.keys(itemStateAndPosition).forEach((key) => {
    itemStateAndPosition[key].isDragging = false;
  });
});

/**
 * To handle product clicked events; Direct to detail page
 */
const handleAddMetaData = async (e) => {
  e.preventDefault();
  console.log(" /TODO if clicked not draged ");
  const productId = e.target?.id;
  const date = Date.now();
  var today = new Date(date);

  try {
    // const response = await fetch(
    //   `http://127.0.0.1:5000/products/${productId}/clicks`,
    //   {
    //     method: "PUT",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // if (response.ok) {
    //   document.location.replace("/");
    // } 
  } catch (error) {
    console.error(error);
    alert("Failed to create post:::" + response);
  }
};

imageButtonItem.forEach((itemElement, index) => {
  itemElement.addEventListener("click", handleAddMetaData);
});

