import { useState } from "react";
import { Mail, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createQuoteInvitation } from "../../../api/services/admin/quoteInvitation.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

export function InviteLeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const invitationMutation = useMutation({
    mutationFn: createQuoteInvitation,

    onSuccess: (response) => {
      toast.success(response.message || "Invitation sent successfully");

      setEmail("");
      setIsOpen(false);
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to send invitation"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter the leader's email address.");
      return;
    }

    invitationMutation.mutate({
      email: email.trim(),
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border text-orange-500 border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <Mail size={17} />
        Invite Leader
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}

            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">Invite a Leader</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Send a secure link to a leader so they can submit their quote.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={invitationMutation.isPending}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Leader's Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="leader@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
                The invitation link will expire after <strong>12 hours</strong>.
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={invitationMutation.isPending}
                  className="rounded-lg border text-orange-500 border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={invitationMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Mail size={16} />

                  {invitationMutation.isPending
                    ? "Sending..."
                    : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
