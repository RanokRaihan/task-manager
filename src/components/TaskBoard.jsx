import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchResultHeading from "./SearchResultHeading";
import TaskAction from "./TaskAction";
import TaskSearch from "./TaskSearch";
import TaskTable from "./TaskTable";

const TaskBoard = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [toEditTask, setToEditTask] = useState(null);
  const [searchString, setSearchString] = useState("");

  // update local storage

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // delete a task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // add task button click handler
  const onAddClick = () => {
    setToEditTask(null);
    setShowModal(true);
  };

  // edit task button click handler
  const onEditClick = (id) => {
    setShowModal(true);
    setToEditTask({ ...tasks.filter((task) => task.id === id)[0] });
  };

  // handle toggle favorite
  const handleFavorite = (id) => {
    const currentTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isFavorite: !task.isFavorite,
        };
      } else {
        return task;
      }
    });
    setTasks(currentTasks);
  };
  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal
          onModalClose={() => setShowModal(false)}
          tasks={tasks}
          setTasks={setTasks}
          toEditTask={toEditTask}
        />
      )}
      <div className="container">
        <TaskSearch setSearchString={setSearchString} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={onAddClick}
            onDeleteAllClick={() => setTasks([])}
          />
          {searchString !== "" && (
            <SearchResultHeading
              searchString={searchString}
              setSearchString={setSearchString}
            />
          )}

          {tasks.length > 0 ? (
            <TaskTable
              tasks={tasks}
              onDelete={handleDeleteTask}
              onEditClick={onEditClick}
              onFavoriteClick={handleFavorite}
              searchString={searchString}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
