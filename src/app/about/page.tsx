import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Bufer Feast" };

export default function About() {
  return (
    <main className="shell page-space narrow-page">
      <p className="eyebrow">ABOUT BUFER FEAST</p>
      <h1 className="page-title">Food for every table.</h1>
      <p className="page-intro">
        Bufer Feast is an online marketplace that connects people who need food
        in bulk with cooks who prepare it well. Whether it is a personal meal,
        wedding, naming ceremony, birthday, funeral, office lunch, or family
        gathering, we help you find the right cook, place your order, and get
        your food on the day you need it.
      </p>

      <section className="about-block">
        <h2>Why we exist</h2>
        <p>
          Ordering food for a crowd should not be a gamble. Too often, buyers
          search through chats and referrals, pay deposits to people they barely
          know, and hope the food arrives as promised. Meanwhile, talented
          cooks struggle to reach customers beyond their own circle and spend
          too much time chasing payments. We created Bufer Feast to fix both
          sides of that problem.
        </p>
      </section>

      <section className="about-block">
        <h2>What we believe</h2>
        <ul>
          <li><strong>Trust comes first.</strong> Good food and honest dealing build lasting customers.</li>
          <li><strong>Cooks deserve fair treatment.</strong> Their skill is the heart of every celebration.</li>
          <li><strong>Clear beats complicated.</strong> Prices, dates, and terms should be easy to understand.</li>
          <li><strong>Every table matters.</strong> Whether you are feeding 10 people or 100.</li>
        </ul>
      </section>

      <section className="about-block">
        <h2>How it works</h2>
        <p>
          We sit between the buyer and the cook. Buyers browse cooks by
          category, choose their quantity and date, and order in one place.
          Cooks reach more customers, receive organized orders, and get paid
          for the food they deliver. We aim to protect both sides of every
          order.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/kitchens" className="rounded-xl bg-[#FF5500] px-5 py-3 font-bold text-white">Find food</Link>
          <Link href="/signup" className="rounded-xl border border-[#444] px-5 py-3 font-bold text-white">Join as a cook</Link>
        </div>
      </section>

      <section className="about-block">
        <h2>Contact</h2>
        <p>
          Support is available every day from 8am to 9pm. Use the contact page
          to reach the Bufer Feast team while the official WhatsApp number is
          being finalized.
        </p>
        <Link href="/support" className="rounded-xl border border-[#444] px-5 py-3 font-bold text-white">Contact us</Link>
      </section>
    </main>
  );
}
