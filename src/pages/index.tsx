import { Link } from "react-router-dom";
import { Button } from "@heroui/react";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Link to="/page1">
          <Button className="bg-green-600 text-white">Go to Page 1</Button>
        </Link>
      </section>
    </DefaultLayout>
  );
}
