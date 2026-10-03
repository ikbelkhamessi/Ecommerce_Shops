import { ResourcePage } from '../../ui';
export default function AdminUsers() { return <ResourcePage title="Utilisateurs" endpoint="/api/admin/users" collection="users" variant="user" />; }
