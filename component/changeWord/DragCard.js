import { useDrag } from "react-dnd";

export const DragCard = ({ name }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "language",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div >
      <button  style={{fontSize:"22px"}}  ref={dragRef}>
        {name}
        {isDragging && "📂"}
      </button>
    </div>
  );
};