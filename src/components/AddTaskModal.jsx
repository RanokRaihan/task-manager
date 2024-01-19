import { useState } from "react";
import { ImCross } from "react-icons/im";

const AddTaskModal = ({ onModalClose, setTasks, toEditTask, tasks }) => {
  const [taskInput, setTaskInput] = useState({
    title: toEditTask?.title || "",
    description: toEditTask?.description || "",
    tags: toEditTask?.tags ? toEditTask.tags.join(",") : "",
    priority: toEditTask?.priority || "",
  });

  //   define input change function
  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value,
    });
  };

  //   add or edit task to state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (toEditTask) {
      console.log("Editing");
      const currentTasks = [...tasks];

      currentTasks.splice(
        currentTasks.findIndex((t) => t.id === toEditTask.id),
        1,
        {
          ...toEditTask,
          ...taskInput,
          tags: taskInput.tags.split(","),
        }
      );
      setTasks(currentTasks);
    } else {
      console.log("Adding");
      setTasks((t) => [
        ...t,
        {
          id: crypto.randomUUID(),
          ...taskInput,
          tags: taskInput.tags.split(","),
          isFavorite: false,
        },
      ]);
    }

    onModalClose();
  };
  return (
    <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 relative"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {toEditTask ? "Edit The Task" : "Add New Task"}
        </h2>
        <button
          type="button"
          className="absolute right-10 top-10"
          onClick={onModalClose}
        >
          <ImCross color="red" />
        </button>
        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              required
              value={taskInput.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              required
              value={taskInput.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                required
                value={taskInput.tags}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                required
                value={taskInput.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {toEditTask ? "Edit Task" : "Create new Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
