import { notFound } from "next/navigation";

import { saveItem } from "@/app/admin/content-actions";
import { EntityForm } from "@/components/admin/entity-form";
import { getCollection } from "@/lib/admin/registry";

export default async function NewItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { collection } = await params;
  const { error } = await searchParams;
  const def = getCollection(collection);
  if (!def) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">New {def.singular.toLowerCase()}</h1>
      <EntityForm def={def} action={saveItem.bind(null, def.key, null)} error={error} />
    </div>
  );
}
