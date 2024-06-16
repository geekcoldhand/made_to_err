//GWACH //Horatious Harris
const dragItems = document.querySelectorAll(".box");
const imageButtonItem = document.querySelectorAll(".img-button");
const container = document.getElementById("container");

function addDragEvents() {
  for (let i = 0; i < dragItems.length; i++) {
    dragItems[i].addEventListener("mousedown", handleMouseDown);
    dragItems[i].addEventListener("mousemove", handleMouseMove);
    dragItems[i].addEventListener("mouseup", handleMouseUp);
  }
}

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

function populateBoxesWithDelay() {
  //multiple items add to list
  const numCopies = 3;
  var index = Math.floor(Math.random() * 2);
  for (let i = 0; i < numCopies; i++) {
    const clone = dragItems[3].cloneNode(true);
    clone.addEventListener("mousedown", handleMouseDown);
    clone.addEventListener("mousemove", handleMouseMove);
    clone.addEventListener("mouseup", handleMouseUp);
    clone.classList.add('draggable');
    clone.classList.add('draggable');
    clone.classList.add('draggable');

    clone.draggable = true;
    container.appendChild(clone);
  }
  addDragEvents();

  var items = dragItems;

  items.forEach((item, index) => {
    setTimeout(() => {
      randomizeDragItemPosition(item);
    }, index * 100); //staggered load
  });
}

//start
populateBoxesWithDelay(dragItems);
const itemStateAndPosition = {};

/**
 * Touch Event Start
 */
const handleTouchStart = dragItems.forEach((item, index) => {
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
function handleMouseDown(item, index) {
  dragItems.forEach((item, index) => {
    item.addEventListener("mousedown", (e) => {
      itemStateAndPosition[index] = {
        isDragging: true,
        offsetX: e.clientX - item.offsetLeft,
        offsetY: e.clientY - item.offsetTop,
      };
    });
  });
}
/**
 * Touch Move
 */
const handleTouchMove = document.addEventListener("touchmove", (e) => {
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
function handleMouseMove(e) {
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
}

/**
 * Mouse Up End
 */
function handleMouseUp() {
  document.addEventListener("mouseup", () => {
    // Reset dragging state for all boxes
    Object.keys(itemStateAndPosition).forEach((key) => {
      itemStateAndPosition[key].isDragging = false;
    });
  });
}

/**
 * Touch End
 */
const handleTouchEnd = document.addEventListener("touchend", () => {
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
