import { HOME } from "@/constants/routes";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const PopularSection = () => {
  return (
    <section className="max-w-7xl mx-auto space-y-8 my-8 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-dark">Popular</h1>
        <Link href={HOME} className="text-gray-400">
          View all
        </Link>
      </div>

      <div>
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Most Popular Idea */}
          {/* This is a dynamic component with api data */}
          <div className="flex-1 group relative h-[358px] rounded-md cursor-pointer overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 bg-primary w-full h-full bg-opacity-60 text-white rounded-md p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="uppercase">BY ANONYMOUS USER IN HEALTHCARE</p>
                <h1 className="text-2xl lg:text-4xl">
                  Workplace Well-Being & Mental Health Support
                </h1>
              </div>
              <div>
                <p>
                  Staff often feel overburdened with administrative tasks.
                  <br />
                  Suggestion: Implement AI and automation tools to reduce
                  repetitive work and improve efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Idea Categories */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <CategoryCard categoryName="Career Growth & Training" deptName={"Finance"}/>
            <CategoryCard categoryName="Better Communication Transparency" deptName={"PLANNING"}/>
            <CategoryCard categoryName="Career Growth & Training" deptName={"Management"}/>
            <CategoryCard categoryName="Workload Management & Efficiency" deptName={"Admin"}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
