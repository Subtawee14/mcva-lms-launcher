import { Row } from 'antd';
import { useRecoilState } from 'recoil';
import { currentUserState, userListState } from '../recoil/atom';

const UserList = () => {
  const [users, setUsers] = useRecoilState(userListState);
  const [, setCurrentUser] = useRecoilState(currentUserState);

  const onDelete = (id: string) => {
    setUsers((users: any) => users.filter((u: any) => u.id !== id));
  };

  const onSelect = (id: string) => {
    setCurrentUser(users.find((u: any) => u.id === id));
  };

  return (
    <div>
      <h1 className="font-bold mb-5">User List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Row className="p-3 bg-white rounded-lg shadow-lg justify-between mb-1">
              <div
                onClick={() => onSelect(user.id)}
                className="cursor-pointer hover:text-blue-400"
              >
                <h1 className="font-bold">{`${user.mcv_person_firstname_th} - ${user.mcv_person_lastname_th}`}</h1>
                <h2 className="text-gray-500">
                  Student ID: {user.mcv_student_id}
                </h2>
                <h2 className="text-gray-500">
                  Course Name: {user.context_title} -{' '}
                  {`${user.mcv_course_courseno} (${user.mcv_course_year}/${user.mcv_course_semester})`}
                </h2>
                <h2 className="text-gray-500">Role: {user.roles}</h2>
              </div>
              <button
                onClick={() => onDelete(user.id)}
                className="hover:text-red-500"
              >
                Delete
              </button>
            </Row>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
