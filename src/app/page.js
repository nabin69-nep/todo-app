
import Form from "./component/Form";
import Task from "./component/Task";

export default function Home() {
  return (
   <div className="flex  flex-col justify-center items-center h-screen  ">
    <div className="bg-white p-14 rounded-3xl">
    <Form />
    <Task />
      
    </div>
   </div>
  );
}
