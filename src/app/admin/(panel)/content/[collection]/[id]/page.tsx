import { notFound } from "next/navigation";

import { saveItem } from "@/app/admin/content-actions";
import { EntityForm } from "@/components/admin/entity-form";
import { getDb } from "@/db/client";
import { getCollection } from "@/lib/admin/registry";

export default async function EditItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { collection, id } = await params;
  const { error } = await searchParams;
  const def = getCollection(collection);
  const numericId = Number(id);
  if (!def || !Number.isInteger(numericId)) notFound();

  const db = getDb();
  if (!db) notFound();
  const item = await def.get(db, numericId);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Edit {def.singular.toLowerCase()}</h1>
      <EntityForm
        def={def}
        item={item}
        action={saveItem.bind(null, def.key, numericId)}
        error={error}
      />
    </div>
  );
}
