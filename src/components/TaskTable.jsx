import TaskRow from "./TaskRow";

const TaskTable = ({
  tasks,
  onDelete,
  onEditClick,
  onFavoriteClick,
  searchString,
}) => {
  const regex = new RegExp(searchString, "gi");
  return (
    <div className="overflow-auto">
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
              Title
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
              Description
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
              Tags
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Priority
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => regex.test(task.title))
            .map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                onDelete={onDelete}
                onEditClick={onEditClick}
                onFavoriteClick={onFavoriteClick}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
