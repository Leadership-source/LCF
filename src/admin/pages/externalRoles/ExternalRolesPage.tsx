import { useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createExternalRole,
  deleteExternalRole,
  getExternalRoles,
  updateExternalRole,
  updateExternalRoleStatus,
  type AdminExternalRole,
} from "../../../api/services/admin/externalRoles.service";
import { externalRoleTypes, type ExternalRoleType } from "../../../api/services/public/externalRoles.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

const roleLabels: Record<ExternalRoleType, string> = {
  ADVISOR: "Advisor",
  PATRON: "Patron",
  BRAND_AMBASSADOR: "Brand Ambassador",
  HONORARY_SUPPORTER: "Honorary Supporter",
  MENTEE: "Mentee",
};

type RoleForm = { name: string; roleType: ExternalRoleType; bio: string; displayOrder: string; image: File | null };
const emptyForm: RoleForm = { name: "", roleType: "ADVISOR", bio: "", displayOrder: "0", image: null };

export default function ExternalRolesPage() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<AdminExternalRole | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: roles = [], isLoading, isError } = useQuery({ queryKey: ["admin-external-roles"], queryFn: getExternalRoles });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdminExternalRole["status"] }) => updateExternalRoleStatus(id, status),
    onSuccess: (response) => { toast.success(response.message || "Role status updated"); queryClient.invalidateQueries({ queryKey: ["admin-external-roles"] }); },
    onError: (error: unknown) => toast.error(getErrorMessage(error, "Failed to update role status")),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteExternalRole,
    onSuccess: (response) => { toast.success(response.message || "Role deleted"); queryClient.invalidateQueries({ queryKey: ["admin-external-roles"] }); },
    onError: (error: unknown) => toast.error(getErrorMessage(error, "Failed to delete role")),
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">External Roles</h1><p className="mt-1 text-sm text-gray-500">Manage advisors, patrons, ambassadors, supporters, and mentors.</p></div>
        <button type="button" onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"><Plus size={18} /> Add role</button>
      </div>
      {isLoading && <p className="py-16 text-center text-gray-500">Loading external roles...</p>}
      {isError && <p className="py-16 text-center text-red-500">Failed to load external roles.</p>}
      {!isLoading && !isError && <div className="overflow-x-auto rounded-xl bg-white shadow-sm"><table className="min-w-full"><thead className="border-b bg-gray-50"><tr><th className="px-4 py-4 text-left">Member</th><th className="px-4 py-4 text-left">Role</th><th className="px-4 py-4 text-left">Order</th><th className="px-4 py-4 text-left">Status</th><th className="px-4 py-4 text-right">Actions</th></tr></thead><tbody>{roles.map((role) => <tr key={role.id} className="border-b hover:bg-gray-50"><td className="px-4 py-4"><div className="flex items-center gap-3"><img src={role.image} alt="" className="h-12 w-12 rounded-lg object-cover" /><span className="font-semibold">{role.name}</span></div></td><td className="px-4 py-4 text-sm text-gray-600">{roleLabels[role.roleType]}</td><td className="px-4 py-4 text-sm text-gray-600">{role.displayOrder}</td><td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${role.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{role.status}</span></td><td className="px-4 py-4"><div className="flex justify-end gap-2"><button type="button" title="Edit role" onClick={() => { setEditing(role); setShowForm(true); }} className="rounded-md p-2 text-gray-600 hover:bg-gray-100"><Pencil size={16} /></button><button type="button" title="Publish or unpublish role" onClick={() => statusMutation.mutate({ id: role.id, status: role.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED" })} className="rounded-md p-2 text-orange-600 hover:bg-orange-50">{role.status === "PUBLISHED" ? <EyeOff size={16} /> : <Eye size={16} />}</button><button type="button" title="Delete role" onClick={() => { if (window.confirm(`Delete ${role.name}?`)) deleteMutation.mutate(role.id); }} className="rounded-md p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>}
      {showForm && <RoleForm role={editing} onClose={() => setShowForm(false)} />}
    </section>
  );
}

function RoleForm({ role, onClose }: { role: AdminExternalRole | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<RoleForm>(role ? { name: role.name, roleType: role.roleType, bio: role.bio || "", displayOrder: String(role.displayOrder), image: null } : emptyForm);
  const [preview, setPreview] = useState(role?.image || "");
  const mutation = useMutation({
    mutationFn: () => role ? updateExternalRole(role.id, { name: form.name.trim(), roleType: form.roleType, bio: form.bio.trim(), displayOrder: Number(form.displayOrder), image: form.image || undefined }) : createExternalRole({ name: form.name.trim(), roleType: form.roleType, bio: form.bio.trim(), displayOrder: Number(form.displayOrder), image: form.image as File }),
    onSuccess: () => { toast.success(role ? "Role updated" : "Role created"); queryClient.invalidateQueries({ queryKey: ["admin-external-roles"] }); onClose(); },
    onError: (error: unknown) => toast.error(getErrorMessage(error, "Failed to save role")),
  });
  const update = <K extends keyof RoleForm>(key: K, value: RoleForm[K]) => setForm((current) => ({ ...current, [key]: value }));
  const handleFile = (file: File | undefined) => { if (!file) return; if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { toast.error("Choose an image file smaller than 5MB"); return; } update("image", file); setPreview(URL.createObjectURL(file)); };

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-bold">{role ? "Edit external role" : "Add external role"}</h2><p className="text-sm text-gray-500">Published roles appear on the public people page.</p></div><button type="button" onClick={onClose} disabled={mutation.isPending}><X /></button></div><form onSubmit={(event) => { event.preventDefault(); if (!form.name.trim() || (!role && !form.image)) { toast.error("Name and image are required"); return; } mutation.mutate(); }} className="space-y-4"><input value={form.name} onChange={(event) => update("name", event.target.value)} minLength={2} maxLength={100} required placeholder="Full name" className="w-full rounded-lg border p-3" /><select value={form.roleType} onChange={(event) => update("roleType", event.target.value as ExternalRoleType)} className="w-full rounded-lg border p-3">{externalRoleTypes.map((type) => <option key={type} value={type}>{roleLabels[type]}</option>)}</select><textarea value={form.bio} onChange={(event) => update("bio", event.target.value)} maxLength={2000} rows={4} placeholder="Biography" className="w-full rounded-lg border p-3" /><input type="number" min={0} value={form.displayOrder} onChange={(event) => update("displayOrder", event.target.value)} className="w-full rounded-lg border p-3" /><label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-5"><Upload className="text-gray-400" />{preview ? <img src={preview} alt="Preview" className="h-28 w-28 rounded-lg object-cover" /> : <span className="text-sm text-gray-500">Choose image (max 5MB)</span>}<input type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} className="hidden" /></label><div className="flex gap-3"><button type="button" onClick={onClose} className="w-full rounded-lg border py-3">Cancel</button><button type="submit" disabled={mutation.isPending} className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white disabled:opacity-60">{mutation.isPending ? "Saving..." : "Save role"}</button></div></form></div></div>;
}