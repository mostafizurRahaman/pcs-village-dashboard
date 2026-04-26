
export const reportStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const



export const reportStatusValues = Object.values(reportStatus)


export type TReportStatus = keyof typeof reportStatus


export interface IReport {
  _id: string; 
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  reporterImage: string;
  reportReason: string;

  isGroup: boolean;
  status: TReportStatus

  postId: string;
  postContent: string;
  postAttachments: string[];

  authorId: string;
  authorName: string;
  authorProfileImage: string;

  reportedAt: Date;
  [key: string]: string | boolean | TReportStatus | Date | string[] 
}
