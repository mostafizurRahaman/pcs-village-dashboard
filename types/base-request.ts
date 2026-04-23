export interface IBaseRequest {
  [key: string]: string | undefined | null
  _id: string
  name: string
  requesterName: string
  createdAt: string
  status: "Pending" | "Approved" | "Rejected"
}

//  "_id": "69cce34f62d98b33f16c121b",
//             "name": "army",
//             "slug": "army",
//             "createdAt": "2026-04-01T09:20:15.909Z",
//             "updatedAt": "2026-04-01T09:20:15.909Z"
