"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { useProductsFilters } from "@/modules/products/hooks/use-products-filters";


export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const [filters, setFilters] = useProductsFilters();

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((cat) => cat.slug === activeCategory);

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;
  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName = activeCategoryData?.subcategories?.find(
    (subcategory) => subcategory.slug === activeSubcategory

  )?.name || null;
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col hap-4 w-full justify-between gap-3"
      style={{ backgroundColor: activeCategoryColor }}>
      <SearchInput
        defaultValue={filters.search}
        onChange={(value) => setFilters({
          search: value,
        })}
      />

      <div className="hidden lg:block">
        <Categories data={data} />

      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategoryName}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}

      />

    </div>
  );
};

export const SearchFilterLoading = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col hap-4 w-full justify-between gap-3"
      style={{ backgroundColor: "#F5F5F5" }}>
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11"></div>

      </div>

    </div>
  );
}