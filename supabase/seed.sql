-- =============================================================================
-- Portfolio seed data - idempotent (safe to re-run).
--
-- Every insert upserts on a natural key (slug, key, title, ...), and the single
-- profile row is updated in place, so running this file again updates existing
-- rows instead of duplicating them. Only plain SQL is used (no psql meta
-- commands, dollar-quoting or E-prefixed strings) so it runs in the SQL Editor.
-- Media URLs point at the public `portfolio-assets` Supabase Storage bucket.
--
-- Run after the migrations in supabase/migrations, e.g. paste into the
-- Supabase SQL Editor or run `supabase db reset` locally.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- Profile (single row, enforced by site_profile_singleton_idx)
-- One statement: update the existing row if there is one, otherwise insert it.
-- -----------------------------------------------------------------------------
with src (
  full_name, professional_title, availability_text,
  hero_heading_line_1, hero_heading_line_2, hero_description,
  about_heading, about_description,
  email, phone, location,
  years_experience, projects_completed, users_reached,
  github_url, linkedin_url, resume_url,
  hero_desktop_image_url, hero_mobile_image_url, about_desktop_image_url, about_mobile_image_url
) as (
  values (
  'Muhammad Musa',
  'Mobile Application Developer',
  'Available for new opportunities',
  'Mobile Application',
  'Developer',
  'I build scalable Flutter apps, Firebase integrations, REST API based applications, POS systems, AI/ML powered features, and polished iOS & Android experiences that make an impact.',
  'Building Ideas into' || chr(10) || 'Powerful Mobile Experiences',
  'I''m Muhammad Musa, a Mobile Application Developer with 5+ years of experience building high-quality, scalable and user-friendly mobile apps. I specialize in Flutter development with strong expertise in Firebase, REST APIs, POS systems and AI/ML integrations. My focus is always on clean architecture, performance and creating real value for users.' || chr(10) || chr(10) || 'I have delivered mobile apps for 20+ clients across fintech, POS, marketplace, education and food delivery, handling everything from architecture and responsive UI to CI/CD, testing and App Store & Play Store releases.',
  'musa195420@gmail.com',
  '+92 321 8838748',
  'Lahore, Pakistan',
  5, 20, 5000,
  'https://github.com/musa195420',
  'https://www.linkedin.com/in/muhammad-musa-8ba5b6305/',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/my-images/cv/Muhammad%20Musa%20Mobile%20App%20Developer.pdf',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/my-images/portrait/hero-desktop.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/my-images/portrait/hero-mobile.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/my-images/portrait/about-desktop.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/my-images/portrait/about-mobile.png'
  )
),
updated as (
  update public.site_profile
  set
    full_name = src.full_name,
    professional_title = src.professional_title,
    availability_text = src.availability_text,
    hero_heading_line_1 = src.hero_heading_line_1,
    hero_heading_line_2 = src.hero_heading_line_2,
    hero_description = src.hero_description,
    about_heading = src.about_heading,
    about_description = src.about_description,
    email = src.email,
    phone = src.phone,
    location = src.location,
    years_experience = src.years_experience,
    projects_completed = src.projects_completed,
    users_reached = src.users_reached,
    github_url = src.github_url,
    linkedin_url = src.linkedin_url,
    resume_url = src.resume_url,
    hero_desktop_image_url = src.hero_desktop_image_url,
    hero_mobile_image_url = src.hero_mobile_image_url,
    about_desktop_image_url = src.about_desktop_image_url,
    about_mobile_image_url = src.about_mobile_image_url
  from src
  returning public.site_profile.id
)
insert into public.site_profile (
  full_name, professional_title, availability_text,
  hero_heading_line_1, hero_heading_line_2, hero_description,
  about_heading, about_description,
  email, phone, location,
  years_experience, projects_completed, users_reached,
  github_url, linkedin_url, resume_url,
  hero_desktop_image_url, hero_mobile_image_url, about_desktop_image_url, about_mobile_image_url
)
select
  full_name, professional_title, availability_text,
  hero_heading_line_1, hero_heading_line_2, hero_description,
  about_heading, about_description,
  email, phone, location,
  years_experience, projects_completed, users_reached,
  github_url, linkedin_url, resume_url,
  hero_desktop_image_url, hero_mobile_image_url, about_desktop_image_url, about_mobile_image_url
from src
where not exists (select 1 from public.site_profile);

-- -----------------------------------------------------------------------------
-- Technologies
-- show_in_strip = the seven cards in "My Core Skills & Technologies".
-- -----------------------------------------------------------------------------
insert into public.technologies (slug, name, icon_url, category, sort_order, show_in_strip) values
  ('flutter',       'Flutter',          'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/flutter.png',  'Mobile',       1,  true),
  ('dart',          'Dart',             'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/dart.png',     'Language',     2,  true),
  ('firebase',      'Firebase',         'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/firebase.png', 'Backend',      3,  true),
  ('rest-apis',     'REST APIs',        null,                                'Backend',      4,  true),
  ('ios-android',   'iOS & Android',    'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/apple.png',    'Platform',     5,  true),
  ('ai-ml',         'AI/ML',            'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/ai-ml.png',    'AI',           6,  true),
  ('ci-cd',         'CI/CD',            'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/cicd.png',     'DevOps',       7,  true),
  ('ios',           'iOS',              'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/apple.png',    'Platform',     10, false),
  ('android',       'Android',          'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/android.png',  'Platform',     11, false),
  ('java',          'Java',             null,                                'Language',     12, false),
  ('node-js',       'Node.js',          null,                                'Backend',      13, false),
  ('express-js',    'Express.js',       null,                                'Backend',      14, false),
  ('hive',          'Hive',             null,                                'Storage',      15, false),
  ('rive',          'Rive',             null,                                'Animation',    16, false),
  ('flame',         'Flame',            null,                                'Game Engine',  17, false),
  ('bluetooth',     'Bluetooth',        null,                                'Hardware',     18, false),
  ('offline-sync',  'Offline Sync',     null,                                'Architecture', 19, false),
  ('pos',           'POS',              null,                                'Domain',       20, false),
  ('redis',         'Redis',            null,                                'Backend',      21, false),
  ('maps-location', 'Maps',             null,                                'Location',     22, false),
  ('pytorch-lite',  'PyTorch Lite',     null,                                'AI',           23, false),
  ('social',        'Social',           null,                                'Domain',       30, false),
  ('audio',         'Audio',            null,                                'Domain',       31, false),
  ('streaming',     'Streaming',        null,                                'Domain',       32, false),
  ('ecommerce',     'Ecommerce',        null,                                'Domain',       33, false),
  ('education',     'Education',        null,                                'Domain',       34, false),
  ('gamification',  'Gamification',     null,                                'Domain',       35, false)
on conflict (slug) do update set
  name = excluded.name,
  icon_url = excluded.icon_url,
  category = excluded.category,
  sort_order = excluded.sort_order,
  show_in_strip = excluded.show_in_strip,
  enabled = true;

-- -----------------------------------------------------------------------------
-- Projects
-- -----------------------------------------------------------------------------
insert into public.projects (
  slug, name, short_description, full_description, role, company_or_client,
  project_type, status, featured, sort_order, logo_url, banner_url,
  app_store_url, play_store_url, github_url, website_url, seo_description
) values
(
  'plate-spot',
  'Plate Spot',
  'A social platform for car enthusiasts to connect, share and discover vehicles around you.',
  'Plate Spot is a social and community app built for car enthusiasts. Owners register their cars with detailed vehicle profiles, discover other enthusiasts nearby and connect through real-time chat and notifications.' || chr(10) || chr(10) || 'The location-based "On Tour" feature lets drivers start 30-minute active tour sessions that notify nearby users in the background, while AI/ML-powered vehicle registration verification keeps profiles authentic. Private conversations and group chats are secured end to end with public/private key encryption, and a rewards system keeps the community engaged.',
  'Mobile application development across the app''s core flows — car profiles, the location-based On Tour feature with background notifications, AI/ML registration verification, rewards, and secure real-time messaging.',
  null,
  'Social / Community App',
  'Live',
  true, 1,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/plate-spot-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/plate_spot/main_banner.png',
  null, null, null, null,
  'Plate Spot — a social app for car enthusiasts with location-based tours, AI/ML vehicle verification and encrypted real-time chat.'
),
(
  'petadopt',
  'PetAdopt',
  'A pet adoption platform that connects loving homes with pets in need.',
  'PetAdopt is a cross-platform Flutter app that connects adopters with donors to make pet handovers safe and secure. It supports adopter, donor and admin roles, lets users find nearby pets by location and filter by species, breed, age and city, and save favourites.' || chr(10) || chr(10) || 'Adopters and donors communicate through Firebase Firestore chat, schedule meetups with secure location sharing, and track adoption progress and pet health. An on-device PyTorch Lite model identifies pet species from the camera, and admins verify users and approve health information through dedicated workflows. The app is multilingual and structured with an MVVM-style architecture.' || chr(10) || chr(10) || 'PetAdopt was my Final Year Project at Government College University (GCU), Lahore.',
  'Designed and built the complete app as my Final Year Project — Flutter client, MVVM structure, ML-powered species detection, chat, meetup scheduling and admin verification workflows.',
  'Final Year Project — GCU Lahore',
  'Cross-platform Mobile App',
  'Completed',
  true, 2,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/petadopt-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/petadoptionapp/banner.png',
  null, null, 'https://github.com/musa195420/PetAdoptionApp', null,
  'PetAdopt — a Flutter pet adoption app with location search, Firestore chat, secure meetups and PyTorch Lite species detection.'
),
(
  'q-music',
  'Q Music',
  'A production-grade music application for live radio, music streaming and podcasts.',
  'Q Music is a production-grade music application. I worked on Android development in Java alongside Node.js / Express backend services, integrating REST APIs and networking layers that power the listening experience.' || chr(10) || chr(10) || 'The work focused on building scalable mobile architecture, debugging and optimising performance, and testing features end to end before release.',
  'Android (Java) development with exposure to the Node.js / Express backend — REST API integration, networking, debugging, optimisation and testing.',
  null,
  'Music Streaming App',
  'Production',
  true, 3,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/qmusic-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/qmusic/banner.png',
  null, null, null, null,
  'Q Music — a production-grade Android music app built with Java, REST APIs and a Node.js / Express backend.'
),
(
  'lincsell-pos-pro',
  'LincSell POS Pro',
  'All-in-one eCommerce and retail platform with powerful POS capabilities.',
  'LincSell is a multi-channel e-commerce and retail platform. The mobile customer app offers responsive storefront views, products, categories and detail pages, a cart and checkout, and complete order workflows, all kept in sync with the store in real time.' || chr(10) || chr(10) || 'Customers benefit from wishlists, coupons, rewards and push notifications, while the POS side of the platform covers payments, inventory and order management for retailers.',
  'Team project at Zilon International — Flutter mobile development for the customer app and POS-related workflows, REST API integration and real-time store synchronisation.',
  'Zilon International, Inc.',
  'E-commerce & POS Platform',
  'Live',
  true, 4,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/lincsell-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/lincsell/banner.png',
  'https://apps.apple.com/us/app/lincsell-pos-pro/id6476977214', null, null, null,
  'LincSell POS Pro — a multi-channel retail platform with a mobile storefront, checkout, rewards and POS workflows.'
),
(
  'saasypos',
  'SaaSyPOS',
  'Complete point of sale solution for modern businesses with inventory management.',
  'SaaSyPOS is a production point-of-sale application used in retail stores across the U.S. The app integrates printer SDKs for Bluetooth printing, Brother label printers and ESC/POS thermal printers, and communicates with Android POS terminals.' || chr(10) || chr(10) || 'Background queues and services keep products and transactions synchronised offline, with Redis-based structures supporting fast lookups. Day to day, the work involved production debugging and performance tuning to keep stores running smoothly.',
  'Team project at Zilon International — Android native UI and integrations, custom Java libraries, printer SDK and terminal communication, offline sync and production debugging.',
  'Zilon International, Inc.',
  'Point of Sale System',
  'Live',
  true, 5,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/saasypos-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/saasypos/banner.png',
  'https://apps.apple.com/us/app/saasypos/id1608172361', null, null, null,
  'SaaSyPOS — a production POS app with Bluetooth, label and thermal printer integrations and offline transaction sync.'
),
(
  'shama-education',
  'Shama Education',
  'An engaging learning app for grades 2–4 with interactive content and progress tracking.',
  'Shama Education is a learning app for students in Grades 2–4. Lessons are brought to life with the Flame engine and Rive animations driven by state streams, inside an MVVM architecture.' || chr(10) || chr(10) || 'The app is offline-first: Hive stores progress and content locally, educational videos are available offline, and progress synchronises online when a connection is available. A custom H5P integration — including a custom Flutter plugin for offline H5P — delivers interactive activities without network access.',
  'Flutter development of the offline-first architecture, Flame and Rive powered lessons, progress synchronisation and the custom offline H5P plugin.',
  null,
  'Education App',
  'Live',
  true, 6,
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/project-logos/shama-logo.png',
  'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/shama/banner.png',
  null, 'https://play.google.com/store/apps/details?id=net.nrschools.shamaapp&hl=en', null, null,
  'Shama Education — an offline-first Flutter learning app for Grades 2–4 with Flame, Rive and offline H5P activities.'
)
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  role = excluded.role,
  company_or_client = excluded.company_or_client,
  project_type = excluded.project_type,
  status = excluded.status,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  logo_url = excluded.logo_url,
  banner_url = excluded.banner_url,
  app_store_url = excluded.app_store_url,
  play_store_url = excluded.play_store_url,
  github_url = excluded.github_url,
  website_url = excluded.website_url,
  seo_description = excluded.seo_description,
  published = true;

-- -----------------------------------------------------------------------------
-- Project media (banner + screenshots)
-- -----------------------------------------------------------------------------
insert into public.project_media (project_id, media_type, storage_path, public_url, alt_text, width, height, sort_order)
select p.id, m.media_type, m.path, 'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/' || m.path, m.alt_text, m.width, m.height, m.sort_order
from (values
  ('plate-spot',       'banner',     'plate_spot/main_banner.png',     'Plate Spot app banner with phone screens',         1402, 1122, 0),
  ('plate-spot',       'screenshot', 'plate_spot/img1.png',            'Plate Spot app screens',                           1536, 1024, 1),
  ('plate-spot',       'screenshot', 'plate_spot/img2.png',            'More Plate Spot app screens',                      1536, 1024, 2),
  ('petadopt',         'banner',     'petadoptionapp/banner.png',      'PetAdopt app banner with phone screens',           1672,  941, 0),
  ('petadopt',         'screenshot', 'petadoptionapp/imag1.png',       'PetAdopt app screens',                             1672,  941, 1),
  ('petadopt',         'screenshot', 'petadoptionapp/img2.png',        'More PetAdopt app screens',                        1672,  941, 2),
  ('q-music',          'banner',     'qmusic/banner.png',              'Q Music app banner with phone screens',            1536, 1024, 0),
  ('q-music',          'screenshot', 'qmusic/img1.png',                'Q Music app screens',                              1536, 1024, 1),
  ('q-music',          'screenshot', 'qmusic/img2.png',                'More Q Music app screens',                         1774,  887, 2),
  ('lincsell-pos-pro', 'banner',     'lincsell/banner.png',            'LincSell POS Pro app banner with phone screens',   1448, 1086, 0),
  ('lincsell-pos-pro', 'screenshot', 'lincsell/img1.png',              'LincSell app screens',                             1672,  941, 1),
  ('lincsell-pos-pro', 'screenshot', 'lincsell/img2.png',              'More LincSell app screens',                        1448, 1086, 2),
  ('saasypos',         'banner',     'saasypos/banner.png',            'SaaSyPOS app banner with POS device and screens',  1536, 1024, 0),
  ('saasypos',         'screenshot', 'saasypos/img1.png',              'SaaSyPOS app screens',                             1536, 1024, 1),
  ('saasypos',         'screenshot', 'saasypos/img2.png',              'More SaaSyPOS app screens',                        1536, 1024, 2),
  ('shama-education',  'banner',     'shama/banner.png',               'Shama Education app banner with lesson screens',   1536, 1024, 0),
  ('shama-education',  'screenshot', 'shama/img1.png',                 'Shama Education lesson screens',                   1536, 1024, 1),
  ('shama-education',  'screenshot', 'shama/img2.png',                 'More Shama Education screens',                     1536, 1024, 2)
) as m(slug, media_type, path, alt_text, width, height, sort_order)
join public.projects p on p.slug = m.slug
on conflict (project_id, public_url) do update set
  media_type = excluded.media_type,
  storage_path = excluded.storage_path,
  alt_text = excluded.alt_text,
  width = excluded.width,
  height = excluded.height,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------------------------------
-- Project <-> technology mappings (sort_order = chip order on cards)
-- -----------------------------------------------------------------------------
insert into public.project_technologies (project_id, technology_id, sort_order)
select p.id, t.id, m.sort_order
from (values
  ('plate-spot', 'flutter', 1), ('plate-spot', 'firebase', 2), ('plate-spot', 'social', 3),
  ('plate-spot', 'maps-location', 4), ('plate-spot', 'ai-ml', 5),

  ('petadopt', 'flutter', 1), ('petadopt', 'firebase', 2), ('petadopt', 'rest-apis', 3),
  ('petadopt', 'maps-location', 4), ('petadopt', 'pytorch-lite', 5), ('petadopt', 'ai-ml', 6),
  ('petadopt', 'node-js', 7), ('petadopt', 'express-js', 8),

  ('q-music', 'java', 1), ('q-music', 'audio', 2), ('q-music', 'streaming', 3),
  ('q-music', 'node-js', 4), ('q-music', 'express-js', 5), ('q-music', 'rest-apis', 6),
  ('q-music', 'android', 7),

  ('lincsell-pos-pro', 'flutter', 1), ('lincsell-pos-pro', 'rest-apis', 2),
  ('lincsell-pos-pro', 'pos', 3), ('lincsell-pos-pro', 'ecommerce', 4),

  ('saasypos', 'java', 1), ('saasypos', 'pos', 2), ('saasypos', 'bluetooth', 3),
  ('saasypos', 'offline-sync', 4), ('saasypos', 'redis', 5), ('saasypos', 'android', 6),

  ('shama-education', 'flutter', 1), ('shama-education', 'education', 2),
  ('shama-education', 'gamification', 3), ('shama-education', 'flame', 4),
  ('shama-education', 'rive', 5), ('shama-education', 'hive', 6),
  ('shama-education', 'offline-sync', 7)
) as m(project_slug, technology_slug, sort_order)
join public.projects p on p.slug = m.project_slug
join public.technologies t on t.slug = m.technology_slug
on conflict (project_id, technology_id) do update set sort_order = excluded.sort_order;

-- -----------------------------------------------------------------------------
-- Project highlights (detail page feature bullets)
-- -----------------------------------------------------------------------------
insert into public.project_highlights (project_id, heading, description, sort_order)
select p.id, h.heading, h.description, h.sort_order
from (values
  ('plate-spot', 'Car profiles', 'Register cars with detailed vehicle profiles and showcase them to the community.', 1),
  ('plate-spot', 'On Tour', 'Location-based 30-minute active tour sessions that let nearby enthusiasts know you are out driving.', 2),
  ('plate-spot', 'Background location alerts', 'Background location notifications surface nearby tours and enthusiasts.', 3),
  ('plate-spot', 'AI/ML verification', 'AI/ML-powered vehicle registration verification keeps car profiles authentic.', 4),
  ('plate-spot', 'Rewards', 'A rewards system that keeps members engaged with the community.', 5),
  ('plate-spot', 'Secure messaging', 'Real-time private and group chat secured with public/private key encryption, plus push notifications.', 6),

  ('petadopt', 'Three roles', 'Dedicated experiences for adopters, donors and admins.', 1),
  ('petadopt', 'Nearby pets', 'Find pets near you and filter by species, breed, age and city, with favourites.', 2),
  ('petadopt', 'Firestore chat', 'Real-time chat between adopters and donors built on Firebase Firestore.', 3),
  ('petadopt', 'Secure meetups', 'Meetup scheduling with secure location sharing for safe handovers.', 4),
  ('petadopt', 'Adoption & health tracking', 'Track adoption progress and admin-approved pet health information.', 5),
  ('petadopt', 'On-device species detection', 'A PyTorch Lite model identifies pet species straight from the camera.', 6),
  ('petadopt', 'Admin verification', 'Admin workflows verify users and approve health cards.', 7),
  ('petadopt', 'Multilingual', 'Multilingual support with an MVVM-style project structure.', 8),

  ('q-music', 'Android in Java', 'Native Android development in Java for a production music app.', 1),
  ('q-music', 'Backend exposure', 'Worked with Node.js / Express backend services behind the app.', 2),
  ('q-music', 'REST & networking', 'REST API integration and networking for content and playback.', 3),
  ('q-music', 'Quality & performance', 'Debugging, optimisation and testing across releases.', 4),
  ('q-music', 'Scalable architecture', 'A scalable mobile architecture designed to grow with the product.', 5),

  ('lincsell-pos-pro', 'Responsive storefront', 'Products, categories and detail views that adapt to every screen.', 1),
  ('lincsell-pos-pro', 'Cart & checkout', 'Cart, checkout and complete order workflows.', 2),
  ('lincsell-pos-pro', 'Real-time sync', 'Real-time synchronisation with the store and its inventory.', 3),
  ('lincsell-pos-pro', 'Engagement', 'Wishlist, coupons, rewards and push notifications.', 4),
  ('lincsell-pos-pro', 'POS workflows', 'POS-related workflows covering payments, inventory and orders.', 5),
  ('lincsell-pos-pro', 'Multi-channel retail', 'One platform for online and in-store retail.', 6),

  ('saasypos', 'Printer integrations', 'Printer SDK integrations for Bluetooth printing, Brother label printers and ESC/POS thermal printers.', 1),
  ('saasypos', 'POS terminals', 'Communication with Android POS terminals.', 2),
  ('saasypos', 'Background processing', 'Background queues and services for reliable processing.', 3),
  ('saasypos', 'Offline-first', 'Offline product sync and offline transaction handling.', 4),
  ('saasypos', 'Fast data structures', 'Redis-based structures supporting fast lookups.', 5),
  ('saasypos', 'Production support', 'Production debugging and performance work for stores across the U.S.', 6),

  ('shama-education', 'Built for Grades 2–4', 'Age-appropriate interactive lessons for young learners.', 1),
  ('shama-education', 'Flame & Rive', 'Game-like lessons with the Flame engine and Rive animations driven by state streams.', 2),
  ('shama-education', 'Offline-first', 'Hive-based offline-first architecture with online progress synchronisation.', 3),
  ('shama-education', 'Offline videos', 'Educational videos available without a connection.', 4),
  ('shama-education', 'Custom H5P', 'Custom H5P integration, including a custom Flutter plugin for offline H5P.', 5),
  ('shama-education', 'MVVM', 'A clean MVVM architecture throughout the app.', 6)
) as h(slug, heading, description, sort_order)
join public.projects p on p.slug = h.slug
on conflict (project_id, sort_order) do update set
  heading = excluded.heading,
  description = excluded.description;

-- -----------------------------------------------------------------------------
-- Skills (from the CV "Core Skills" section)
-- -----------------------------------------------------------------------------
insert into public.skills (name, category, featured, sort_order) values
  ('Flutter',             'Mobile',           true,  1),
  ('Dart',                'Mobile',           true,  2),
  ('Android (Java)',      'Mobile',           true,  3),
  ('Kotlin',              'Mobile',           false, 4),
  ('Swift (basics)',      'Mobile',           false, 5),
  ('Platform Channels',   'Mobile',           false, 6),
  ('SDK Integration',     'Mobile',           false, 7),
  ('Clean Architecture',  'Architecture',     true,  10),
  ('MVVM',                'Architecture',     true,  11),
  ('MVC',                 'Architecture',     false, 12),
  ('MVP',                 'Architecture',     false, 13),
  ('Bloc',                'Architecture',     true,  14),
  ('Riverpod',            'Architecture',     true,  15),
  ('Provider',            'Architecture',     false, 16),
  ('GetIt',               'Architecture',     false, 17),
  ('REST APIs',           'Backend & APIs',   true,  20),
  ('GraphQL',             'Backend & APIs',   false, 21),
  ('Firebase',            'Backend & APIs',   true,  22),
  ('Cloud Functions',     'Backend & APIs',   false, 23),
  ('Node.js',             'Backend & APIs',   false, 24),
  ('Express.js',          'Backend & APIs',   false, 25),
  ('WebSockets',          'Backend & APIs',   false, 26),
  ('Supabase',            'Backend & APIs',   false, 27),
  ('Crashlytics',         'Testing & Release', false, 30),
  ('JUnit',               'Testing & Release', false, 31),
  ('GitHub Actions',      'Testing & Release', true,  32),
  ('Xcode Cloud',         'Testing & Release', false, 33),
  ('Play Console',        'Testing & Release', false, 34),
  ('App Store Connect',   'Testing & Release', false, 35),
  ('Android Studio',      'Tools',            false, 40),
  ('Xcode',               'Tools',            false, 41),
  ('VS Code',             'Tools',            false, 42),
  ('Postman',             'Tools',            false, 43),
  ('Jira',                'Tools',            false, 44),
  ('Git',                 'Tools',            false, 45)
on conflict (name) do update set
  category = excluded.category,
  featured = excluded.featured,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------------------------------
-- Experience (from the CV "Professional Experience" section)
-- -----------------------------------------------------------------------------
insert into public.experiences (company, position, location, start_date, end_date, is_current, description, sort_order) values
  ('Auto Smart Tech', 'Flutter Developer', null, '2025-10-01', null, true,
   'Leading Flutter development for Android and iOS applications with a focus on scalable architecture, performance and production readiness.', 1),
  ('Wayout Labs', 'Mobile Application Developer', null, '2025-02-01', '2025-09-30', false,
   'Led Flutter app development and architecture for cross-platform Android and iOS products in Agile/Scrum delivery environments.', 2),
  ('Zilon International, Inc.', 'Junior Mobile App Developer', null, '2024-01-01', '2025-01-31', false,
   'Developed, maintained, debugged and tested Flutter and Android applications used in business and POS environments.', 3),
  ('Tech Swivel', 'Full Stack Mobile App Intern', null, '2023-09-01', '2023-12-31', false,
   'Built Android (Java) features and backend services using Node.js and Express.js while gaining hands-on production experience.', 4)
on conflict (company, position) do update set
  location = excluded.location,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  is_current = excluded.is_current,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into public.experience_highlights (experience_id, description, sort_order)
select e.id, h.description, h.sort_order
from (values
  ('Auto Smart Tech', 'Integrated in-app purchases using custom flows and RevenueCat, supporting subscription lifecycle handling and release requirements.', 1),
  ('Auto Smart Tech', 'Delivered custom SDK and native integrations including Zoom, Twilio, Bluetooth, AI assistance, real-time voice chat, background services and headless execution.', 2),
  ('Auto Smart Tech', 'Established CI/CD workflows using Xcode Cloud and GitHub Actions to improve release speed and build consistency.', 3),
  ('Auto Smart Tech', 'Reduced app size and improved performance by approximately 40% through optimisation, dependency cleanup and architecture improvements.', 4),

  ('Wayout Labs', 'Integrated Firebase Cloud Functions, Crashlytics, push notifications, REST APIs, backend services and automated deployment pipelines.', 1),
  ('Wayout Labs', 'Used Bloc and Riverpod to build scalable state management patterns for maintainable, production-grade applications.', 2),
  ('Wayout Labs', 'Managed App Store and Play Store uploads, build automation, release testing and client-facing delivery communication.', 3),
  ('Wayout Labs', 'Built Node.js and Express.js backend services, integrated AI/ML models using TFLite, MobileNetV2 and PyTorch, and mentored junior developers through code reviews.', 4),

  ('Zilon International, Inc.', 'Integrated REST APIs, GraphQL, Firebase, WebSockets, Google Maps, printing SDKs, Supabase, MongoDB and Firebase databases.', 1),
  ('Zilon International, Inc.', 'Implemented clean architecture patterns including MVC, MVVM and MVP, with Provider, GetIt and Riverpod for state management.', 2),
  ('Zilon International, Inc.', 'Collaborated with designers and developers to convert user flows and process flows into reliable mobile features.', 3),

  ('Tech Swivel', 'Assisted with app testing, implementation, bug fixing, performance optimisation, Git collaboration, networking and third-party library integrations.', 1),
  ('Tech Swivel', 'Gained experience in scalable mobile architectures, responsive UI development, REST API integration and backend communication.', 2)
) as h(company, description, sort_order)
join public.experiences e on e.company = h.company
on conflict (experience_id, sort_order) do update set description = excluded.description;

-- -----------------------------------------------------------------------------
-- Social links
-- -----------------------------------------------------------------------------
insert into public.social_links (platform, url, icon_key, sort_order) values
  ('GitHub',   'https://github.com/musa195420',                          'github',   1),
  ('LinkedIn', 'https://www.linkedin.com/in/muhammad-musa-8ba5b6305/',   'linkedin', 2),
  ('Email',    'mailto:musa195420@gmail.com',                            'email',    3),
  ('Phone',    'tel:+923218838748',                                      'phone',    4)
on conflict (platform) do update set
  url = excluded.url,
  icon_key = excluded.icon_key,
  sort_order = excluded.sort_order,
  enabled = true;

-- -----------------------------------------------------------------------------
-- Service / quality cards (About section)
-- Icon files are mapped by their artwork: layers, rocket, gauge, shield.
-- -----------------------------------------------------------------------------
insert into public.service_features (title, description, icon_url, sort_order) values
  ('Clean Architecture',   'Scalable, maintainable and well-structured code.',      'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/app-store.png',          1),
  ('App Store Deployment', 'Complete deployment on Play Store & App Store.',        'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/production-ready.png',   2),
  ('Performance Focus',    'Optimized, smooth and reliable applications.',          'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/performance.png',        3),
  ('Production Ready',     'Real-world solutions that scale with your business.',   'https://rmnzqinspzgmvgxistyi.supabase.co/storage/v1/object/public/portfolio-assets/icons/clean-architecture.png', 4)
on conflict (title) do update set
  description = excluded.description,
  icon_url = excluded.icon_url,
  sort_order = excluded.sort_order,
  enabled = true;

-- -----------------------------------------------------------------------------
-- Site settings
-- -----------------------------------------------------------------------------
insert into public.site_settings (key, value, json_value) values
  ('footer_tagline',
   'Building scalable, production-ready mobile apps with Flutter, Firebase and clean architecture.', null),
  ('technologies_tagline', null, '["Modern Tools", "Real Solutions", "Better Experiences"]'::jsonb),
  ('hero_highlights', null, '["Flutter", "Firebase", "REST API", "POS systems", "AI/ML", "iOS & Android"]'::jsonb),
  ('hero_platform_technologies', null, '["ios", "android", "flutter"]'::jsonb)
on conflict (key) do update set
  value = excluded.value,
  json_value = excluded.json_value;

commit;
