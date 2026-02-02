
-- Create SiteSettings table
CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "bannerImage" TEXT,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE "SiteSettings" ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read
CREATE POLICY "Public can view settings"
ON "SiteSettings" FOR SELECT
TO public
USING (true);

-- Policy: Admins can update
CREATE POLICY "Admins can update settings"
ON "SiteSettings" FOR ALL
TO authenticated
USING (true);

-- Insert default row if not exists
INSERT INTO "SiteSettings" ("bannerImage")
SELECT '/banner.png'
WHERE NOT EXISTS (SELECT 1 FROM "SiteSettings");
