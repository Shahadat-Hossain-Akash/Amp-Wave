
import CartBreadcrumbs from "@/components/Breadcrumbs/CartBreadcrumbs";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from '@/styles/profile.module.css'
export default function UserLayout({ children }) {

    return (
        <> < CartBreadcrumbs cartbreadcrumbs={
            "Admin dashboard"
        } /> <section className={styles.container}>
                <Sidebar />
                <div className={styles.header}>
                    {children}
                </div>
            </section>
        </>
    )
}