import React, { useState } from "react";
import { ReadTaskProps, Task } from "../../Lib/Types";
import { Input, Table } from "reactstrap";
import Select from "react-select";

export const ReadTask: React.FC<ReadTaskProps> = ({ tasks, deleteTask, updateTask }) => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  const options = [
    { value: "Todo", label: "Todo" },
    { value: "Doing", label: "Doing" },
    { value: "Done", label: "Done" },
  ];

  const handleEditClick = (task: Task) => {
    setEditTaskId(task.id);
    setEditedTask(task);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask(prevState => prevState ? { ...prevState, [name]: value } : null);
  };

  const handleSelectChange = (selectedOption: any) => {
    setEditedTask(prevState => prevState ? { ...prevState, status: selectedOption.value } : null);
  };

  const handleUpdateClick = () => {
    if (editedTask) {
      updateTask(editedTask);
      setEditTaskId(null);
      setEditedTask(null);
    }
  };
  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
  };
  return (
    <div>
      <h2 className="text-white">Task List</h2>
      <Table hover>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td className="w-25">
                {editTaskId === task.id ? (
                  <Input
                    type="text"
                    name="title"
                    value={editedTask?.title || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td className="w-25">
                {editTaskId === task.id ? (
                  <Input
                    type="text"
                    name="description"
                    value={editedTask?.description || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td className="w-50">
                {editTaskId === task.id ? (
                  <Select
                    options={options}
                    value={options.find(option => option.value === editedTask?.status)}
                    onChange={handleSelectChange}
                    name="status"
                    styles={customStyles}
                  />
                ) : (
                  task.status
                )}
              </td>
              <td>
                {editTaskId === task.id ? (
                  <i
                    className="bi bi-check-square"
                    onClick={handleUpdateClick}
                    style={{ cursor: "pointer", color: "green" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-pencil-square"
                    onClick={() => handleEditClick(task)}
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </td>
              <td>
                <i
                  className="bi bi-trash"
                  onClick={() => deleteTask(task.id)}
                  style={{ cursor: "pointer", color: "red" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
