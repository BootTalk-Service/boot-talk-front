export interface Certification {
  certificationId: number;
  userName: string;
  categoryType: string;
  fileUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}
