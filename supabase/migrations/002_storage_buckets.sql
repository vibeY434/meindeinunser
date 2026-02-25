-- Storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload listing images"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'listing-images' AND auth.role() = 'authenticated'
  );

-- Public read access for listing images
CREATE POLICY "Public read access for listing images"
  ON storage.objects FOR SELECT USING (bucket_id = 'listing-images');

-- Users can delete their own images (images stored under user_id folder)
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );
