import ContactData from "@/components/admin/contact-data";
import { getContactsService } from "@/server/service/contactService";
import { requireSession } from "@/lib/session";

export default async function ContactPage() {
    const session = await requireSession();
    const contacts = await getContactsService();
    return (
        <ContactData initialData={contacts} />
    )
}