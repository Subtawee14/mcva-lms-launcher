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
            <Row className="p-3 bg-white rounded-lg shadow-lg justify-between">
              <a className="mr-5" onClick={() => onSelect(user.id)}>
                {user.mcv_person_firstname_th} - {user.roles}
              </a>
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
