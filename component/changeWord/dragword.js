import { DragCard } from "./DragCard";

const Data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  export function DragFile() {
    return (
      <div className="my-8 mx-8 rounded-xl border w-fit">
        <div className="my-4">
          <div style={{display:"flex", justifyContent:"center"}}>
          {Data.map((v,i) => (
            <div
            style={{display:"flex"}}
              key={i}
              className="border w-fit my-2 p-2 mx-16 rounded bg-indigo-400 text-white font-bold cursor-pointer"
            >
              <DragCard draggable name={v} />
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  }
  export default DragFile;