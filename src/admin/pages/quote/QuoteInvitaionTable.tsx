import {
  Clock,
  Mail,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trash2,
} from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getQuoteInvitations,
  resendQuoteInvitation,
  deleteQuoteInvitation,
  type AdminQuoteInvitation,
} from "../../../api/services/admin/quoteInvitation.service";

import { getErrorMessage } from "../../../lib/getErrorMessage";

export function QuoteInvitationTable() {
  const queryClient = useQueryClient();

  const {
    data: invitations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quote-invitations"],
    queryFn: getQuoteInvitations,
  });

  const resendMutation = useMutation({
    mutationFn: (id: string) => resendQuoteInvitation(id),

    onSuccess: (response) => {
      toast.success(
        response?.message || "Quote invitation resent successfully",
      );

      queryClient.invalidateQueries({
        queryKey: ["quote-invitations"],
      });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to resend quote invitation"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteQuoteInvitation(id),

    onSuccess: (response) => {
      toast.success(
        response?.message || "Quote invitation deleted successfully",
      );

      queryClient.invalidateQueries({
        queryKey: ["quote-invitations"],
      });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete quote invitation"));
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-sm text-gray-500">Loading invitations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="text-sm text-red-500">Failed to load invitations.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">Quote Invitations</h2>

        <p className="mt-1 text-sm text-gray-500">
          Track invitations sent to leaders and resend invitations when
          necessary.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold">
                Leader Email
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Sent
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Expires
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((invitation) => (
              <InvitationRow
                key={invitation.id}
                invitation={invitation}
                onResend={() => resendMutation.mutate(invitation.id)}
                onDelete={() => deleteMutation.mutate(invitation.id)}
                isResending={
                  resendMutation.isPending &&
                  resendMutation.variables === invitation.id
                }
                isDeleting={
                  deleteMutation.isPending &&
                  deleteMutation.variables === invitation.id
                }
              />
            ))}

            {invitations.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No quote invitations have been sent.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type InvitationRowProps = {
  invitation: AdminQuoteInvitation;
  onResend: () => void;
  onDelete: () => void;
  isResending: boolean;
  isDeleting: boolean;
};

function InvitationRow({
  invitation,
  onResend,
  onDelete,
  isResending,
  isDeleting,
}: InvitationRowProps) {
  const statusConfig = {
    PENDING: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-700",
      icon: <Clock size={14} />,
    },

    USED: {
      label: "Used",
      className: "bg-green-100 text-green-700",
      icon: <CheckCircle2 size={14} />,
    },

    EXPIRED: {
      label: "Expired",
      className: "bg-red-100 text-red-700",
      icon: <XCircle size={14} />,
    },

    CANCELLED: {
      label: "Cancelled",
      className: "bg-gray-100 text-gray-600",
      icon: <XCircle size={14} />,
    },
  };

  const config = statusConfig[invitation.status];

  const canResend = invitation.status !== "USED";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* Email */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-orange-50 p-2">
            <Mail size={16} className="text-orange-600" />
          </div>

          <span className="text-sm font-medium">{invitation.email}</span>
        </div>
      </td>

      {/* Sent */}
      <td className="px-4 py-4 text-sm text-gray-600">
        {new Date(invitation.createdAt).toLocaleString()}
      </td>

      {/* Expires */}
      <td className="px-4 py-4 text-sm text-gray-600">
        {new Date(invitation.expiresAt).toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-4 py-4 text-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
        >
          {config.icon}
          {config.label}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* Resend */}
          {canResend && (
            <button
              type="button"
              onClick={onResend}
              disabled={isResending || isDeleting}
              className="inline-flex items-center gap-1.5 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-600 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
              title="Resend invitation"
            >
              <RotateCcw
                size={14}
                className={isResending ? "animate-spin" : ""}
              />

              {isResending ? "Resending..." : "Resend"}
            </button>
          )}

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            disabled={isResending || isDeleting}
            className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete invitation"
          >
            <Trash2 size={14} />

            {/* {isDeleting ? "Deleting..." : "Delete"} */}
          </button>
        </div>
      </td>
    </tr>
  );
}
