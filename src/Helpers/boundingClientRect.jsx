
const isClickInsideRectangle = (e, element) => {
  
  const r = element.getBoundingClientRect();

  console.log('Bounding Rect:', r.left, r.right, r.top, r.bottom);
  console.log('Click Coordinates:', e.clientX, e.clientY);

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

export { isClickInsideRectangle };