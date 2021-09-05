export class CreatePictureDto {}

/* 
model Picture {
  id          String   @id @default(uuid())
  title       String
  description String?
  url         String
  profile     Profile  @relation(fields: [profileId], references: [id])
  profileId   String   @map(name: "profile_id")
  createdAt   DateTime @default(now()) @map(name: "created_at")
  updatedAt   DateTime @default(now()) @map(name: "updated_at")
  albums      Album[]

  @@map(name: "pictures")
}
*/
