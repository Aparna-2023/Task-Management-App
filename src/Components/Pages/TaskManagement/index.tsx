import { useState } from "react";
import { CreateTask } from "./CreateTask";
import { ReadTask } from "./ReadTask";
import { Task } from "../../Lib/Types";
import { Col, Row } from "reactstrap";
import Swal from "sweetalert2";

export const TaskIndex = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    Swal.fire({
      title: 'Success!',
      text: 'Task deleted successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };


  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    Swal.fire({
      title: 'Success!',
      text: 'Task updated successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <>
      <div className="container">
        <Row>
          <Col md={6} >
            <CreateTask addTask={addTask} />
          </Col>
          <Col md={6}>
            <ReadTask tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
          </Col>
        </Row>
      </div>
    </>
  );
};  
