import Link from "next/link";

import { Suspense } from "react";
import { getMeals } from "@/lib/meals";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid.module";

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Our team, managed{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
        Add new member to our team
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Add new member</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Getting meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
