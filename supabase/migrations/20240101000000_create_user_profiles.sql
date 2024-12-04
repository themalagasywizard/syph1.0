-- Create user_profiles table with proper constraints
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  role text default 'user',
  avatar text,
  settings jsonb not null default '{
    "theme": "light",
    "notifications": true,
    "language": "en",
    "timezone": "UTC",
    "salesMethodology": "SPIN",
    "monthlyCallGoal": 200,
    "monthlyRevenueGoal": 100000,
    "coachingIntensity": "balanced",
    "tipFrequency": "daily",
    "enableAICoaching": true,
    "customBranding": {
      "enabled": false
    }
  }'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint valid_settings check (jsonb_typeof(settings) = 'object')
);

-- Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Create RLS policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (id, email, name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to update timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for updating timestamps
create trigger handle_updated_at
  before update on public.user_profiles
  for each row execute procedure public.handle_updated_at();