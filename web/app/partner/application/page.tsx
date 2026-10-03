import { PartnerForm, ResourcePage } from '../../ui';
export default function PartnerApplication() { return <><h1>Demande de boutique</h1><ResourcePage title="Statut actuel" endpoint="/api/partner/application" collection="shop" variant="application" /><PartnerForm /></>; }
