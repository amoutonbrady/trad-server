# Migration `20200817194553-slug-and-name-unique`

This migration has been generated by Alexandre at 8/17/2020, 9:45:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Language.name_unique" ON "public"."Language"("name")

CREATE UNIQUE INDEX "Language.slug_unique" ON "public"."Language"("slug")

CREATE UNIQUE INDEX "Project.name_unique" ON "public"."Project"("name")

CREATE UNIQUE INDEX "Project.slug_unique" ON "public"."Project"("slug")

CREATE UNIQUE INDEX "View.name_unique" ON "public"."View"("name")

CREATE UNIQUE INDEX "View.slug_unique" ON "public"."View"("slug")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200816184955-optional-slugs..20200817194553-slug-and-name-unique
--- datamodel.dml
+++ datamodel.dml
@@ -6,17 +6,17 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Language {
   code  String @id
   index Int    @default(autoincrement())
-  name String
-  slug String?
+  name String  @unique
+  slug String? @unique
   rtl  Boolean @default(false)
   projects     Project[]
   translations LanguagesOnTranslations[]
@@ -41,10 +41,10 @@
 model Project {
   id    Int @id @default(autoincrement())
   index Int @default(autoincrement())
-  name       String
-  slug       String?
+  name       String  @unique
+  slug       String? @unique
   screenshot String?
   users     User[]
   views     View[]
@@ -57,10 +57,10 @@
 model View {
   id    Int @default(autoincrement()) @id
   index Int @default(autoincrement())
-  name       String
-  slug       String?
+  name       String  @unique
+  slug       String? @unique
   screenshot String?
   translation Translation[]
   project     Project       @relation(fields: [projectId], references: [id])
```

