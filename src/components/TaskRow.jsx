import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const TaskRow = function ({ task }) {

  const statusClass = useMemo(() => {
    switch (task.status.toLowerCase()) {
      case "to do":
        return "bg-danger text-white px-2 py-1 rounded";
      case "doing":
        return "bg-warning text-dark px-2 py-1 rounded";
      case "done":
        return "bg-success text-white px-2 py-1 rounded";
      default:
        return "bg-secondary text-white px-2 py-1 rounded";
    }
  }, [task.status]);

  return (
    <tr>
      <td><Link to={`/Task/${task.id}`}>{task.title}</Link></td>
      <td><span className={statusClass}>{task.status}</span></td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
}

export default TaskRow;
