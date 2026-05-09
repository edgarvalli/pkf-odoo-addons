import { useEffect, useState } from "react";
import { useOrm } from "../hooks/use-orm";

function InvoiceForm() {
  const [users, setUsers] = useState<Record<string, any>[]>([]);

  const orm = useOrm();
  const getUsers = async () => {
    const result = await orm.searchRead(
      "res.users",
      [],
      ["id", "name", "email"],
    );
    setUsers(result);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {orm.fetching && <span>Cargando.......</span>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {users.map((user) => {
              return (
                <li className="list-group-item" key={`user_id_${user.id}`}>
                  <span>{user.name}</span>
                  <br />
                  <span className="text-muted">{user.email}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
