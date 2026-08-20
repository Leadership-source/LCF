import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  approveTestimonial,
  deleteTestimonial,
  getTestimonials,
  rejectTestimonial,
} from "../../../api/services/admin/testimonial.service";
import TestimonialSkeleton from "./TestimonialSkeleton";
import TestimonialStats from "./TestimonialStats";
import TestimonialTable from "./TestimonialTable";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(
    null,
  );

  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: getTestimonials,
  });

  const approveMutation = useMutation({
    mutationFn: approveTestimonial,

    onSuccess: () => {
      toast.success("Testimonial approved");

      queryClient.invalidateQueries({
        queryKey: ["admin-testimonials"],
      });

      queryClient.invalidateQueries({
        queryKey: ["public-testimonials"],
      });
    },

    onError: () => {
      toast.error("Failed to approve testimonial");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectTestimonial,

    onSuccess: () => {
      toast.success("Testimonial rejected");

      queryClient.invalidateQueries({
        queryKey: ["admin-testimonials"],
      });
    },

    onError: () => {
      toast.error("Failed to reject testimonial");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,

    onSuccess: () => {
      toast.success("Testimonial deleted");

      setTestimonialToDelete(null);

      queryClient.invalidateQueries({
        queryKey: ["admin-testimonials"],
      });

      queryClient.invalidateQueries({
        queryKey: ["public-testimonials"],
      });
    },

    onError: () => {
      toast.error("Failed to delete testimonial");
    },
  });
  const pendingTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "PENDING",
  );

  const approvedTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "APPROVED",
  );

  const rejectedTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "REJECTED",
  );

  const isProcessing =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    deleteMutation.isPending;

  if (isLoading) {
    return <TestimonialSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-500">
        Failed to load testimonials.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage testimonials submitted by visitors.
        </p>
      </div>

      {/* Statistics */}
      <TestimonialStats
        pending={pendingTestimonials.length}
        approved={approvedTestimonials.length}
        rejected={rejectedTestimonials.length}
      />

      {/* Testimonials */}
      <TestimonialTable
        testimonials={testimonials}
        onApprove={(id) => approveMutation.mutate(id)}
        onReject={(id) => rejectMutation.mutate(id)}
        onDelete={(id) => setTestimonialToDelete(id)}
        isProcessing={isProcessing}
      />

      <DeleteConfirmationModal
        isOpen={testimonialToDelete !== null}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setTestimonialToDelete(null)}
        onConfirm={() => {
          if (testimonialToDelete) {
            deleteMutation.mutate(testimonialToDelete);
          }
        }}
      />
    </div>
  );
}
