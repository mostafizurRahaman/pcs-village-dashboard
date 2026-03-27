export interface IReport {
  [key: string]: string | undefined | null
  id: string
  type: "Post" | "User" | "Spam" | "Comment"
  content: string
  reportedUser: string
  reporter: string
  createdAt: string
}
