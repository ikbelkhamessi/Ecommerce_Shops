import { ResourcePage } from '../../ui';
export default function AuditLog() { return <ResourcePage title="Journal d'audit" endpoint="/api/admin/audit-log" collection="logs" variant="audit" />; }
