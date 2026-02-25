DO $$ 
DECLARE
  max_user_id UUID;
BEGIN
  -- Hole die User-ID von "Max" (oder fallback auf einen anderen Nutzer, falls Max nicht existiert)
  SELECT id INTO max_user_id FROM public.profiles WHERE display_name = 'Max' LIMIT 1;
  
  IF max_user_id IS NULL THEN
    SELECT id INTO max_user_id FROM public.profiles LIMIT 1;
  END IF;

  IF max_user_id IS NULL THEN
    RAISE EXCEPTION 'No user found in profiles. Please create a user first.';
  END IF;

  -- 5 Werkzeuge
  INSERT INTO public.listings (user_id, title, description, type, category, district, status, images) VALUES
  (max_user_id, 'Schlagbohrmaschine (Makita)', 'Leistungsstarke Bohrmaschine für Beton und Mauerwerk, inkl. Koffer und Bohrerset. Perfekt für das Anbringen von Regalen.', 'verleihen', 'haus_garten', 'neustadt', 'aktiv', ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80']),
  (max_user_id, 'Akkuschrauber (Bosch Blau)', 'Zuverlässiger 18V Akkuschrauber, super für den Möbelaufbau oder kleinere Reparaturen in der Wohnung.', 'verleihen', 'haus_garten', 'gonsenheim', 'aktiv', ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80']),
  (max_user_id, 'Stichsäge (Festool)', 'Präzise Stichsäge mit Holzsägeblättern. Bitte vorsichtig behandeln und nur für Holzwerke nutzen!', 'verleihen', 'haus_garten', 'oberstadt', 'aktiv', ARRAY['https://images.unsplash.com/photo-1540314051000-85fbfd0f3a61?w=500&q=80']),
  (max_user_id, 'Werkzeugkoffer-Set (100-teilig)', 'Kompletter Werkzeugkoffer mit Schlüsseln, Zangen, Hammer und mehr. Perfekt, wenn mal was Größeres ansteht. Alles immer gut sortiert zurückgeben :)', 'verleihen', 'haus_garten', 'finthen', 'aktiv', ARRAY['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&q=80']),
  (max_user_id, 'Winkelschleifer (Flex)', 'Ideal zum Trennen von Metall oder Fliesen. Trennscheiben bitte selber mitbringen, falls Spezielles gewünscht ist.', 'verleihen', 'haus_garten', 'hechtsheim', 'aktiv', ARRAY['https://images.unsplash.com/photo-1581092334241-118e98031e67?w=500&q=80']);

  -- 5 Gartengeräte
  INSERT INTO public.listings (user_id, title, description, type, category, district, status, images) VALUES
  (max_user_id, 'Rasentrimmer (Akku)', 'Akku-Rasentrimmer, perfekt für Rasenkanten und kleine Flächen. Akku hält ca. 30 Minuten, Ladegerät gibt es dazu.', 'verleihen', 'haus_garten', 'mombach', 'aktiv', ARRAY['https://images.unsplash.com/photo-1592424001807-6bb9fdf91fcb?w=500&q=80']),
  (max_user_id, 'Heckenschere (Elektrisch)', 'Starke elektrische Heckenschere, ideal für den Rückschnitt im Frühjahr oder Herbst. Verlängerungskabel (10m) kann ich bei Bedarf dazugen.', 'verleihen', 'haus_garten', 'bretzenheim', 'aktiv', ARRAY['https://images.unsplash.com/photo-1416879598555-46ebec2aa2e2?w=500&q=80']),
  (max_user_id, 'Vertikutierer', 'Holt das Moos mühelose aus dem Rasen. Sehr effektiv! Bringt den Rasen wieder in Schuss. Starkstromanschluss nicht nötig, eine Kabeltrommel reicht.', 'verleihen', 'haus_garten', 'weisenau', 'aktiv', ARRAY['https://images.unsplash.com/photo-1595856417244-67d16b3f790c?w=500&q=80']),
  (max_user_id, 'Schubkarre (100 Liter)', 'Robuste Metall-Schubkarre mit Luftreifen. Super für Erde, Steine oder Gartenabfälle. Steht sauber im Hof.', 'verleihen', 'haus_garten', 'drais', 'aktiv', ARRAY['https://images.unsplash.com/photo-1616886475727-b5ded3d94389?w=500&q=80']),
  (max_user_id, 'Hochdruckreiniger (Kärcher K4)', 'Macht Terrassen und Gehwege wieder blitzblank. Inkl. Dreckfräse und Flächenreiniger (T-Racer). Bitte ohne starke Chemie benutzen!', 'verleihen', 'haus_garten', 'gonsenheim', 'aktiv', ARRAY['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80']);

END $$;
