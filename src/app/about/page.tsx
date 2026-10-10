import type { Metadata } from "next";
export const metadata: Metadata = { title: "About this build" };
export default function About() {
  return (
    <div className="shell page-space narrow-page">
      <p className="eyebrow">JIE_BULK_ORDER · NEXT.JS BUILD 04</p>
      <h1 className="page-title">
        A working prototype.
        <br />
        <em>Not a live service.</em>
      </h1>
      <p className="page-intro">
        A learning project for ordering bulk food for homes in Lagos. This
        version migrates the working discovery, basket and test-order flow into
        React components and Next.js routes.
      </p>
      <section className="about-block">
        <h2>What you can try</h2>
        <ul>
          <li>
            Choose an example area and date, browse sample kitchens and select
            packs.
          </li>
          <li>
            Build a single-kitchen basket, with quantities and explicit
            replacement when switching kitchens.
          </li>
          <li>
            Get a server-calculated test quote and save a fictional order.
          </li>
          <li>
            Retrieve that record after refreshing. Retry an interrupted save
            without creating a duplicate.
          </li>
        </ul>
      </section>
      <section className="about-block" id="stack">
        <h2>A current, deliberate stack.</h2>
        <div className="about-stack">
          <div>
            <strong>Next.js + React + TypeScript</strong>
            <span>
              Real page routes, reusable components and server-side API
              handlers.
            </span>
          </div>
          <div>
            <strong>Tailwind CSS + shadcn/ui</strong>
            <span>
              Shared styling and selected UI primitives, with JIE_Bulk_order’s own
              visual design.
            </span>
          </div>
          <div>
            <strong>Supabase is the selected target</strong>
            <span>
              The server adapter and database migration are prepared. Your
              project must be configured before cloud storage works.
            </span>
          </div>
          <div>
            <strong>Local test mode remains available</strong>
            <span>
              A clearly labelled SQLite adapter lets the flow run without
              external credentials or subscriptions.
            </span>
          </div>
        </div>
        <p>
          Checkout reports the active storage mode. A missing or incorrect
          Supabase configuration is an error—not a reason to silently claim that
          cloud storage worked.
        </p>
      </section>
      <section className="about-block">
        <h2>Customer accounts, with clear boundaries.</h2>
        <p>
          This build includes signup, email confirmation, login/logout and
          account-owned test orders. Supabase project settings, a publishable
          key, the ownership migration and a manual email/login test are
          required before calling the account integration connected.
        </p>
        <p>
          Signed-in account orders require that account's verified session.
          Older guest records stay separate unless their key holder explicitly
          links them. Passwords are handled by Supabase Auth, not the order
          table.
        </p>
        <p>
          Use your own controlled email for an account test and fictional
          delivery details for orders. Vendor/admin tools, uploads, payments,
          real kitchen acceptance, delivery booking, password recovery, account
          deletion and refund workflows are not implemented.
        </p>
        <p>
          The default Supabase email sender is for limited project-team testing.
          General customer signup needs suitable email-delivery setup; no paid
          service was activated here. Production privacy, security, food-safety
          and commercial review is still required.
        </p>
      </section>
      <section className="about-block">
        <h2>For food makers</h2>
        <p>
          The longer-term idea includes home cooks, caterers and restaurants.
          Vendor applications are not open. We are not collecting identity
          documents, bank details or real menus through this prototype.
        </p>
      </section>
      <section className="about-block">
        <h2>Our assumptions are visible.</h2>
        <p>
          Kitchens, food prices, delivery fees, availability and menu
          descriptions are fictional. Food images are AI-generated. The 1–2 day
          lead times, 30-day window, one-kitchen basket and 99-pack cap are
          learning assumptions, not approved operating policies.
        </p>
        <p>
          No real tax or service-fee policy is implemented. Pack volume does not
          guarantee servings, and recipe/allergen information is unverified. No
          product-manager or website-manager approval is claimed.
        </p>
      </section>
    </div>
  );
}
